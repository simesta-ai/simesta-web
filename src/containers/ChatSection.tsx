"use client";

import { useRef, useState, useEffect } from "react";

import Chatbox from "@/components/ui/ChatBox";
import { ArrowDown } from "lucide-react";
import { useSelector } from "react-redux";
import AIMessageRenderer from "@/components/ui/AIMessageRenderer";
import Image from "next/image";
import { IMAGES } from "@/lib/constants";

const ChatSection = ({ chat_id }: { chat_id: string }) => {
  const { theme } = useSelector((state: any) => state.ui);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const dummyAIMessage = `
**🎉 Welcome to Simesta AI!**

We’re thrilled to have you here. Get ready to learn, explore, and grow with the power of AI by your side. Let’s build something amazing together! 🚀
`;

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

  const scrollChatToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="chat-body" ref={chatBodyRef}>
        {/* <div className="user-message-container">
          <div className="attached-doc-container"></div>
          <div className="attached-img-container"></div>
          <div className="user-message">
            <p className="text-sm">This is a sample user message This is a sample user message This is a sample user message This is a sample user message This is a sample user message This is a sample user message</p>
          </div>
        </div> */}
        <div className="simesta-message-container">
          <div className="flex items-center gap-2">
            <Image
              src={theme == "light" ? IMAGES.LOGO.BLACK : IMAGES.LOGO.WHITE}
              alt="logo"
              className="w-6 h-6 chat-logo-img"
              width={30}
              height={30}
            />
            <span className="simesta-name">Simesta</span>
          </div>
          <AIMessageRenderer content={dummyAIMessage} />
        </div>
      </div>
      <div className="chat-input-container">
        {showScrollBtn ? (
          <div className="chat-bottom-container">
            <button onClick={scrollChatToBottom} className="chat-bottom-btn">
              <ArrowDown size={16} className="arrow-down" />
            </button>
          </div>
        ) : null}
        <Chatbox type={"chat"} />
      </div>
    </div>
  );
};

export default ChatSection;
