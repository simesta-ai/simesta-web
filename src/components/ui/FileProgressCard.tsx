/* eslint-disable @typescript-eslint/no-explicit-any */
import { Paperclip, Check, X } from "lucide-react";
import React from "react";
import "@/styles/components/fileprogress.css"

const FileProgressCard = ({
  file,
  onRemove,
}: {
  file: any;
  onRemove: (id: string) => void;
}) => {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(file.progress, 0), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const truncatedName = file.name.length > 10
    ? file.name.slice(0, 10) + "..."
    : file.name;

  const fileType = file.name.includes(".")
    ? file.name.split(".").pop()
    : "file";

  const FileIcon = () => {
    if (file.status === "error") {
      return <X size={12} style={{ color: "red" }} />;
    }
    if (file.status === "complete") {
      return <Check size={12} className="fp-icon-success" />;
    }
    return <Paperclip size={12} className="fp-icon-default" />;
  };

  return (
    <div className="fp-card">
      <div className="fp-file-info">
        <div className="fp-progress-circle">
          {file.status === "uploading" ? (
            <svg className="fp-progress-svg" viewBox="0 0 32 32">
              <circle
                className="fp-progress-bg"
                strokeWidth="2"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="16"
                cy="16"
              />
              <circle
                className="fp-progress-bar"
                strokeWidth="2"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="16"
                cy="16"
              />
            </svg>
          ) : (
            <FileIcon />
          )}

          {/* <span className="fp-progress-text">
            {file.status === "uploading" ? `${Math.floor(progress)}%` : ""}
          </span> */}
        </div>

        <div className="fp-file-labels">
          <span className="fp-file-name" title={file.name}>
            {truncatedName}
          </span>
          <div className="fp-file-meta">
            <span>{fileType.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onRemove(file.id)}
        className="fp-remove-btn"
        aria-label={`Remove file ${file.name}`}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default FileProgressCard;