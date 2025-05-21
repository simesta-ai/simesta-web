"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import parse from "html-react-parser";
import katex from "katex";
import "katex/dist/katex.min.css";
import { md } from "@/lib/workers";

type Props = {
  content: string;
};

const renderMath = (latex: string, displayMode = false) => {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode,
    });
  } catch (err) {
    return `<span style="color:red;">[Invalid math]</span>`;
  }
};

const AIMessageRenderer = ({ content }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hljs.highlightAll();

    const listener = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        ".copy-btn"
      ) as HTMLElement | null;
      if (!target) return;

      const codeElement = target.previousElementSibling;
      if (codeElement && codeElement.textContent) {
        navigator.clipboard.writeText(codeElement.textContent.trim());
        target.style.opacity = "0.5"
        // disable button and set cursor to not-allowed
        target.style.pointerEvents = "none";
        target.style.cursor = "not-allowed";
        setTimeout(() => {
          target.style.opacity = "1.0";
          target.style.pointerEvents = "auto";
          target.style.cursor = "pointer";
        }, 2000);
      }
    };

    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [content]);

  const rawHtml = md.render(content);

  // Replace math inline ($...$) and block ($$...$$) manually
  const parsed = parse(rawHtml, {
    replace: (domNode: any) => {
      if (
        domNode.type === "text" &&
        typeof domNode.data === "string" &&
        (domNode.data.includes("$$") || domNode.data.includes("$"))
      ) {
        let text = domNode.data;

        // Replace block math
        text = text.replace(/\$\$([^$]+)\$\$/g, (_, math) =>
          renderMath(math, true)
        );

        // Replace inline math
        text = text.replace(/\$([^$\n]+)\$/g, (_, math) =>
          renderMath(math, false)
        );

        return <span dangerouslySetInnerHTML={{ __html: text }} />;
      }
      return undefined;
    },
  });

  return (
    <div className="markdown-body" ref={containerRef}>
      {parsed}
    </div>
  );
};

export default AIMessageRenderer;
