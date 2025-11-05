"use client";

import "@/styles/components/chatbox.css";
import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowUp, Paperclip, Pencil, Mic, Check, X } from "lucide-react";
import Button from "./Button";
import OptionButton from "./OptionButton";
import Loader from "./Loader";
import FileProgressCard from "./FileProgressCard";
import { sendFiles } from "@/lib/redux/slices/chatSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

export default function Chatbox({
  type,
  loading,
  onSubmit,
}: {
  type?: string;
  loading: boolean;
  onSubmit: (prompt: string) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [abilities, setAbilities] = useState({
    editing: false,
  });
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<
    {
      id: string;
      name: string;
      progress: number;
      status: "uploading" | "complete" | "error";
    }[]
  >([]);
  const { fileProgressMap } = useSelector(
    (state: RootState) => state.nonPersisted.chat
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleSubmit = (promptText: string) => {
    if (
      promptText.trim() ||
      attachedFiles.some((f) => f.status === "complete")
    ) {
      // Here I would typically process the prompt and files
      const fileNames = attachedFiles
        .filter((f) => f.status === "complete")
        .map((f) => f.name)
        .join(", ");
      const fullPrompt = fileNames
        ? `${promptText} (Files attached: ${fileNames})`
        : promptText;
      onSubmit(fullPrompt);
      setAttachedFiles([]);
    }
  };

  const handleAttachClick = () => {
    // Check for files still uploading
    const uploading = attachedFiles.some((f) => f.status === "uploading");
    if (uploading) {
      console.warn("Please wait for current uploads to finish or cancel them.");
      return;
    }
    fileInputRef.current?.click();
  };

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const fileId = crypto.randomUUID();
        const newFile = {
          id: fileId,
          name: file.name,
          progress: 0,
          status: "uploading" as const,
        };

        setAttachedFiles((prev) => [...prev, newFile]);

        // Dispatch the sendFiles action
        const reader = new FileReader();
        reader.onload = () => {
          const contentB64 = (reader.result as string).split(",")[1]; // Get base64 content
          const success = sendFiles([
            {
              file_uuid: fileId,
              filename: file.name,
              content_b64: contentB64,
            },
          ]);
          if (!success) {
            // Update file status to error
            setAttachedFiles((prev) =>
              prev.map((f) =>
                f.id === fileId ? { ...f, status: "error", progress: 0 } : f
              )
            );
          }
        };
        reader.readAsDataURL(file);
      });

      // Clear the input value so the same file can be selected again
      e.target.value = "";
    }
  };

  // Use effect to monitor file progress from Redux store
  // ✅ handle updating file progress in a stable callback
  const updateFileProgress = useCallback(() => {
    setAttachedFiles((prev) =>
      prev.map((file) => {
        const progressData = fileProgressMap[file.id];
        if (!progressData) return file;

        const newStatus = progressData.error
          ? "error"
          : progressData.is_complete
          ? "complete"
          : "uploading";

        // ✅ Only update if something actually changed
        if (
          file.progress === progressData.progress &&
          file.status === newStatus
        ) {
          return file;
        }

        return {
          ...file,
          progress: progressData.progress,
          status: newStatus,
        };
      })
    );
  }, [fileProgressMap]);

  useEffect(() => {
    updateFileProgress();
  }, [fileProgressMap, updateFileProgress]);

  useEffect(() => {
    const startRecording = async () => {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setStream(newStream);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    if (isRecording) {
      startRecording();
    } else {
      stream?.getTracks().forEach((track) => track.stop());
    }

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [isRecording, stream]);

  const submitAudioForTranscription = async () => {
    if (stream) {
      setIsTranscribing(true);
      // Simulate audio transcription
      setTimeout(() => {
        setIsTranscribing(false);
        setPrompt("Transcribed audio text");
        setIsRecording(false);
        setStream(null);
      }, 2000);
    }
  };

  const cancelRecording = () => {
    setIsRecording(false);
    setStream(null);
  };

  const toggleEditing = () => {
    setAbilities((prev) => ({
      ...prev,
      editing: !prev.editing,
    }));
  };

  const options = [
    {
      name: "Attach Files",
      icon: <Paperclip size={"1em"} />,
      onClick: () => handleAttachClick(),
    },
    {
      name: "Edit",
      icon: <Pencil size={"1em"} />,
      onClick: () => toggleEditing(),
      type: `${abilities.editing ? "ability-active" : "ability"}` as
        | "ability-active"
        | "ability"
        | undefined,
    },
  ];

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handlePromptKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(prompt);
      setPrompt("");
    }
  };

  const placeholders = [
    "What do you want to learn today?",
    "Explain quantum physics in original context...",
    "What is the meaning of life?",
    "How do I start a business online?",
  ];
  const [placeholder, setPlaceholder] = useState("");
  const currentIndex = useRef(0);
  const charIndex = useRef(0);
  const direction = useRef("forward");

  useEffect(() => {
    const type = () => {
      const currentText = placeholders[currentIndex.current];

      if (direction.current === "forward") {
        if (charIndex.current < currentText.length) {
          setPlaceholder(currentText.slice(0, charIndex.current + 1));
          charIndex.current += 1;
        } else {
          direction.current = "pause";
          setTimeout(() => (direction.current = "backspace"), 2000);
        }
      } else if (direction.current === "backspace") {
        if (charIndex.current > 0) {
          setPlaceholder(currentText.slice(0, charIndex.current - 1));
          charIndex.current -= 1;
        } else {
          direction.current = "forward";
          currentIndex.current =
            (currentIndex.current + 1) % placeholders.length;
        }
      }
    };

    const interval = setInterval(() => {
      if (direction.current !== "pause") {
        type();
      }
    }, 30); // typing speed

    return () => clearInterval(interval);
  }, []);

  const isUploading = attachedFiles.some((f) => f.status === "uploading");
  // Check if there's text OR at least one completed file
  const canSend =
    (prompt.length > 0 && !loading) ||
    attachedFiles.some((f) => f.status === "complete");

  return (
    <div
      className={`chatbox ${
        type == "chat" ? "on-chat" : ""
      } relative flex flex-col gap-4 padding-3`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        className="hidden"
        disabled={isUploading}
      />

      {attachedFiles.length > 0 && (
        <div className="uploaded-files-container">
          {attachedFiles.map((file) => (
            <FileProgressCard key={file.id} file={file} onRemove={removeFile} />
          ))}
        </div>
      )}

      {!isRecording ? (
        <textarea
          className={`${type == "chat" ? "on-chat-section" : ""} chat-input`}
          placeholder={type == "chat" ? "Say something..." : placeholder}
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={handlePromptKeyDown}
        />
      ) : (
        <div className="audio-visualizer">
          {[...Array(60)].map((_, i) => (
            <span
              key={i}
              className="bar"
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
      )}
      <div className="actions flex justify-between items-center gap-4">
        {!isRecording ? (
          <div className="options gap-2 flex">
            {options.map((option) => (
              <OptionButton
                key={option.name}
                text={option.name}
                icon={option.icon}
                onClick={option.onClick}
                type={option.type}
              />
            ))}
          </div>
        ) : (
          <span></span>
        )}
        <div className="flex gap-2 justify-center items-center">
          {!isRecording ? (
            <>
              <button
                onClick={() => setIsRecording(true)}
                className="recording-btn"
              >
                <Mic size={"1.5em"} />
              </button>
              <Button
                variant="chat-send-btn"
                size="sm"
                onClick={() => {
                  handleSubmit(prompt);
                  setPrompt("");
                }}
                disabled={
                  prompt.length > 0 && !loading && !isUploading && canSend
                    ? false
                    : true
                }
              >
                {!loading ? (
                  <ArrowUp size={"2em"} />
                ) : (
                  <div className="loading-chat-square" />
                )}
              </Button>
            </>
          ) : (
            <>
              {!isTranscribing ? (
                <>
                  <button
                    onClick={submitAudioForTranscription}
                    className="recording-btn"
                  >
                    <Check size={"1.5em"} />
                  </button>
                  <button onClick={cancelRecording} className="recording-btn">
                    <X size={"1.5em"} />
                  </button>
                </>
              ) : (
                <button className="recording-btn disabled">
                  <Loader size={24} />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
