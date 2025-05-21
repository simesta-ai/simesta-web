"use client";

import { useRef, useState, useEffect } from "react";

import Chatbox from "@/components/ui/ChatBox";
import { ArrowDown } from "lucide-react";
import { useSelector } from "react-redux";
import AIMessageRenderer from "@/components/ui/AIMessageRenderer";
import Image from "next/image";
import { IMAGES } from "@/lib/constants";
import { RootState } from "@/lib/redux/store";

const ChatSection = ({ chat_id }: { chat_id: string }) => {
  const { theme } = useSelector((state: RootState) => state.ui);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const dummyAIMessage = `
Machine Learning (ML) is a subset of artificial intelligence that enables systems to learn from data and improve over time without being explicitly programmed.

## 📊 Types of Machine Learning

| Type            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| Supervised      | Learns from labeled data                                                    |
| Unsupervised    | Identifies patterns in unlabeled data                                       |
| Semi-supervised | Combines a small amount of labeled data with a large amount of unlabeled data |
| Reinforcement   | Learns by interacting with an environment to maximize reward                |

## 🧠 Example: Linear Regression

Linear regression attempts to model the relationship between a scalar dependent variable $\\( y \\)$ and one or more explanatory variables $\\( x \\)$.

The equation is:

$$
y = \\beta_0 + \\beta_1 x + \\epsilon
$$

Where:

- $\\( \\beta_0 \\)$ represents the Intercept  
- $\\( \\beta_1 \\)$ represents the Slope  
- $\\( \\epsilon \\)$ represents the Error term


## 💻 Sample Code (Python)

\`\`\`python
from sklearn.linear_model import LinearRegression
import numpy as np

# Data
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 3, 4, 5])

# Model
model = LinearRegression()
model.fit(X, y)

# Prediction
prediction = model.predict([[5]])
print("Predicted value for x=5:", prediction[0])
\`\`\`
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
