/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/lib/redux/slices/chatSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  updateCreationProgress,
  setFinalCourseId,
  StageKey,
  startCourseCreation,
} from "./courseCreationSlice";

// --- Types ---
type MessageRole = "user" | "assistant";

interface ChatMessage {
  role: MessageRole;
  content: string;
  timestamp: number;
  // File attachments are handled as metadata
  attachment?: {
    filename: string;
    url: string;
    mimeType: string;
  };
}

interface FilePayload {
    file_uuid: string;
    filename: string;
    content_b64: string; // Base64 content for initial upload
}

interface FileProgress {
  file_uuid: string; // Used to identify the file being tracked (we'll use filename for simplicity in this example)
  filename: string;
  progress: number; // 0 to 100
  status: string; // e.g., "Uploading to S3...", "Starting chunking..."
  is_complete: boolean;
  error: string | null;
}

interface ChatState {
  chatId: string | null; // Stores the active chat ID (either existing or newly created)
  messages: ChatMessage[];
  isConnected: boolean;
  error: string | null;
  isLoading: boolean; // Used for both connection and waiting for assistant response
  streamingMessage: string;
  fileProgressMap: Record<string, FileProgress>;
}

const initialState: ChatState = {
  chatId: null,
  messages: [],
  isConnected: false,
  error: null,
  isLoading: false,
  streamingMessage: "",
  fileProgressMap: {},
};

// --- Global Socket Instance ---
const WS_BASE_URL = "ws://localhost:8000/ws/chat";
let chatSocket: WebSocket | null = null;
let cleanupFn: (() => void) | null = null;

// --- Thunks & Logic ---
export const connectChat = createAsyncThunk<
  (() => void) | void,
  { chatId: string | null }, // Can be null (for new chat) or an ID
  { state: RootState; dispatch: any }
>(
  "chat/connect",
  async ({ chatId }, { dispatch, getState, rejectWithValue }) => {
    const authState = getState().persisted.auth;
    const userId = authState.user?.id;

    if (!userId) {
      return rejectWithValue("User ID not found in state for connection.");
    }

    if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const targetChatId = chatId || "new";
      const fullWsUrl = `${WS_BASE_URL}?user_id=${userId}&chat_id=${targetChatId}`;

      chatSocket = new WebSocket(fullWsUrl);

      // --- Event Handlers ---
      chatSocket.onopen = () => {
        dispatch(chatSlice.actions.setConnectionStatus(true));
      };

      chatSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "server_init") {
          dispatch(chatSlice.actions.setChatId(data.chat_id));
        } else if (data.type === "file_progress") {
          dispatch(chatSlice.actions.updateFileProgress(data as FileProgress));
        } else if (data.type === "creation_progress") {
          const info = data.info;
          dispatch(
            updateCreationProgress({
              stage_number: info.stage_number as StageKey,
              is_loading: info.is_loading,
              is_completed: info.is_completed,
              is_error: info.is_error,
            })
          );
        } else if (data.type === "action") {
          if (data.action === "go_to_course") {
            dispatch(setFinalCourseId(data.course_id));
            // The component will handle the navigation based on this state change
          }
        } else if (data.type === "token") {
          dispatch(chatSlice.actions.appendStreamingChunk(data.text_chunk));
        } else if (data.type === "done") {
          dispatch(chatSlice.actions.commitStreamingMessage());
        }
        // ... (other message types) ...
      };

      chatSocket.onclose = () => {
        dispatch(chatSlice.actions.setConnectionStatus(false));
      };

      chatSocket.onerror = (error) => {
        console.error("WebSocket Error:", error);
        dispatch(chatSlice.actions.setError("WebSocket connection error"));
        chatSocket?.close();
      };

      // --- Cleanup Function ---
      cleanupFn = () => {
        if (
          (chatSocket && chatSocket.readyState === WebSocket.OPEN) ||
          chatSocket!.readyState === WebSocket.CONNECTING
        ) {
          chatSocket!.close(1000, "Client closed connection");
          chatSocket = null;
        }
      };
      return cleanupFn;
    } catch (error) {
      return rejectWithValue(`Failed to establish WS connection: ${error}`);
    }
  }
);

export const sendMessage = (
  message: string,
  attachment?: ChatMessage["attachment"]
) => {
  if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
    const payload = {
      message: message,
      files: attachment ? [attachment] : [], // Send files as metadata array
    };
    chatSocket.send(JSON.stringify(payload));
    return true;
  } else {
    console.error("WebSocket not open. Cannot send message.");
    return false;
  }
};

export const sendFiles = (files: FilePayload[]) => {
  if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
    const payload = {
      files: files,
    };
    chatSocket.send(JSON.stringify(payload));
    return true;
  } else {
    console.error("WebSocket not open. Cannot send files.");
    return false;
  }
};

// --- Slice Definition ---
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
      state.isLoading = !action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addLocalMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
      state.isLoading = true; // Waiting for assistant response
    },
    appendStreamingChunk: (state, action: PayloadAction<string>) => {
      state.streamingMessage += action.payload;
    },
    commitStreamingMessage: (state) => {
      if (state.streamingMessage.length > 0) {
        state.messages.push({
          role: "assistant",
          content: state.streamingMessage,
          timestamp: Date.now(),
        });
        state.streamingMessage = "";
      }
      state.isLoading = false;
    },
    // Used by ChatSection to load existing messages
    setInitialMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
    updateFileProgress: (state, action: PayloadAction<FileProgress>) => {
      state.fileProgressMap[action.payload.file_uuid] = {
        ...state.fileProgressMap[action.payload.filename], // Merge existing data
        ...action.payload, // Overwrite with new progress data
        file_uuid: action.payload.file_uuid, // Ensure ID is present
      };

      if (action.payload.is_complete || action.payload.error) {
        // You might keep it for a few seconds or until the chat is submitted/cleared
      }
    },
    clearFileProgress: (state) => {
      state.fileProgressMap = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectChat.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(connectChat.fulfilled, (state) => {
        // Loading state managed by onopen/setConnectionStatus
      })
      .addCase(connectChat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Connection failed.";
      });
  },
});

export const {
  setChatId,
  setConnectionStatus,
  addLocalMessage,
  appendStreamingChunk,
  commitStreamingMessage,
  setInitialMessages,
  updateFileProgress,
  clearFileProgress,
} = chatSlice.actions;

export default chatSlice.reducer;
