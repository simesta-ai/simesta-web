"use client";

import "@/styles/components/chatbox.css";
import { useState, useRef, useEffect } from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import Button from "./Button";
import OptionButton from "./OptionButton";

export default function Chatbox({ type }: { type: string }) {
  const [prompt, setPrompt] = useState("");
  const options = [
    {
      name: "Attach Files",
      icon: <Paperclip size={"1em"} />,
      onClick: () => console.log("Attach Files"),
    },
  ];

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
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
  return (
    <div className={`chatbox flex flex-col gap-4 padding-3`}>
      <textarea className={`${type == 'chat'? 'on-chat-section' : ''} chat-input`} placeholder={type == 'chat' ? "Say something..." : placeholder}
        value={prompt}
        onChange={handlePromptChange}
      />
      <div className="actions flex justify-between items-center gap-4">
        <div className="options">
          {options.map((option) => (
            <OptionButton
              key={option.name}
              text={option.name}
              icon={option.icon}
              onClick={option.onClick}
            />
          ))}
        </div>
        <Button variant="round-secondary" size="sm" disabled={prompt.length > 0 ? false : true}>
          <ArrowUp size={"2em"} />
        </Button>
      </div>
    </div>
  );
}
