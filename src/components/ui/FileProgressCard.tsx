/* eslint-disable @typescript-eslint/no-explicit-any */
import { Paperclip, Check, X } from "lucide-react";
import React from "react";

const FileProgressCard = ({
  file,
  onRemove,
}: {
  file: any;
  onRemove: (id: string) => void;
}) => {
  const radius = 14; // Smaller radius for better fit
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(file.progress, 0), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const FileIcon = () => {
    if (file.status === "error") {
      return <X size={20} className="text-red-500" />;
    }
    if (file.status === "complete") {
      return <Check size={20} className="text-green-500" />;
    }
    return <Paperclip size={20} className="text-gray-500" />;
  };

  return (
    <div className="flex items-center justify-between p-2 pr-3 bg-white border border-gray-200 rounded-xl transition-all duration-300 shadow-sm min-w-48 max-w-[200px] overflow-hidden">
      <div className="flex items-center space-x-2 truncate">
        <div className="relative w-8 h-8 flex items-center justify-center">
          {file.status === "uploading" ? (
            <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
              <circle
                className="text-gray-200"
                strokeWidth="2"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="16"
                cy="16"
              />
              <circle
                className="text-indigo-500 transition-all duration-300"
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

          <span className="absolute text-[10px] font-semibold text-gray-700">
            {file.status === "uploading" ? `${Math.floor(progress)}%` : ""}
          </span>
        </div>
        <span
          className="text-sm font-medium text-gray-800 truncate"
          title={file.name}
        >
          {file.name}
        </span>
      </div>

      <button
        onClick={() => onRemove(file.id)}
        className="ml-2 p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label={`Remove file ${file.name}`}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default FileProgressCard;
