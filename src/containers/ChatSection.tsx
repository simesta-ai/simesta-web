/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRef, useState, useEffect } from "react";

import Chatbox from "@/components/ui/ChatBox";
import { ArrowDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AIMessageRenderer from "@/components/ui/AIMessageRenderer";
import Image from "next/image";
import { IMAGES } from "@/lib/constants";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import {
  connectChat,
  sendMessage,
  addLocalMessage,
} from "@/lib/redux/slices/chatSlice";

const ChatSection = ({
  chat_id: initial_chat_id,
}: {
  chat_id: string | null;
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useSelector((state: RootState) => state.persisted.ui);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const { messages, streamingMessage, isLoading, isConnected, chatId } =
    useSelector((state: RootState) => state.nonPersisted.chat);

  useEffect(() => {
    const el = chatBodyRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const el = chatBodyRef.current;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 20;
    setShowScrollBtn(!isAtBottom);
  };

  useEffect(() => {
    const idToConnect = initial_chat_id || null;

    const connectionPromise = dispatch(connectChat({ chatId: idToConnect }));

    // Cleanup function runs on unmount
    return () => {
      connectionPromise.then((result) => {
        if (typeof result.payload === "function") {
          result.payload(); // Execute the socket closing function
        }
      });
    };
    // Re-connect only if dispatch or the initial_chat_id changes.
  }, [dispatch, initial_chat_id]);

  const handleSubmit = (prompt: string) => {
    if (!prompt.trim() || !isConnected) return;

    dispatch(
      addLocalMessage({ role: "user", content: prompt, timestamp: Date.now() })
    );

    sendMessage(prompt);

    scrollChatToBottom();
  };

  const scrollChatToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const displayMessages = [...messages];
  if (streamingMessage.length > 0) {
    // Append the currently streaming message for immediate visual feedback
    displayMessages.push({
      role: "assistant",
      content: streamingMessage,
      timestamp: Date.now(),
    } as any);
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="chat-body" ref={chatBodyRef}>
        {/* display the messages appropraitely */}
        {displayMessages.map((message, index) => (
          <div
            key={index}
            className={`message-container ${
              message.role === "user"
                ? "user-message-container"
                : "simesta-message-container"
            }`}
          >
            {message.role === "user" ? (
              <div className="user-message-container">
                <div className="attached-doc-container"></div>
                <div className="attached-img-container"></div>
                <div className="user-message">
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ) : (
              <div className="simesta-message-container">
                <div className="flex items-center gap-2">
                  <Image
                    src={
                      theme == "light" ? IMAGES.LOGO.BLACK : IMAGES.LOGO.WHITE
                    }
                    alt="logo"
                    className="w-6 h-6 chat-logo-img"
                    width={30}
                    height={30}
                  />
                  <span className="simesta-name">Simesta</span>
                </div>
                <AIMessageRenderer content={message.content} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        {showScrollBtn ? (
          <div className="chat-bottom-container">
            <button onClick={scrollChatToBottom} className="chat-bottom-btn">
              <ArrowDown size={16} className="arrow-down" />
            </button>
          </div>
        ) : null}
        <Chatbox loading={isLoading} type={"chat"} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ChatSection;
