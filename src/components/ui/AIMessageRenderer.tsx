import { useEffect } from "react";
import hljs from "highlight.js";
import { md } from "@/lib/workers";

type Props = {
  content: string;
};

const AIMessageRenderer = ({ content }: Props) => {
  useEffect(() => {
    hljs.highlightAll();

    const listener = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("copy-btn")) {
        const code = target.previousElementSibling?.textContent;
        if (code) {
          navigator.clipboard.writeText(code);
          target.textContent = "Copied!";
          setTimeout(() => {
            target.innerHTML = `<svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>Copy`;
          }, 1500);
        }
      }
    };

    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [content]);
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: md.render(content) }}
    />
  );
};

export default AIMessageRenderer;
