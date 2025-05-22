"use client";

import "@/styles/components/chatbox.css";
import { useState, useRef, useEffect } from "react";
import { ArrowUp, Paperclip, Pencil, Mic, Check, X } from "lucide-react";
import Button from "./Button";
import OptionButton from "./OptionButton";
import Loader from "./Loader";

export default function Chatbox({ type, handleSubmit, loading }: { type?: string, handleSubmit: (prompt: string) => void, loading: boolean }) {
  const [prompt, setPrompt] = useState("");
  const [abilities, setAbilities] = useState({
    editing: false,
  });
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const [stream, setStream] = useState<MediaStream | null>(null);

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
      onClick: () => console.log("Attach Files"),
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
    <div className={`chatbox ${type == "chat" ? "on-chat" : ""} relative flex flex-col gap-4 padding-3`}>
      {!isRecording ? (
        <textarea
          className={`${type == "chat" ? "on-chat-section" : ""} chat-input`}
          placeholder={type == "chat" ? "Say something..." : placeholder}
          value={prompt}
          onChange={handlePromptChange}
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
                variant="round-secondary"
                size="sm"
                onClick={() => handleSubmit(prompt)}
                disabled={prompt.length > 0 && !loading ? false : true}
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
