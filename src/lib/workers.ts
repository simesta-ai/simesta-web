// utils/markdownParser.ts
import MarkdownIt from "markdown-it";
import hljs from "highlight.js"; // Make sure to import the KaTeX CSS

export const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(str, { language: lang }).value;
        return `<pre class="code-block"><code class="hljs">${highlighted}</code><button class="copy-btn">
        <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg></button></pre>`;
      } catch (_) {}
    }
    return `<pre class="code-block"><code class="hljs">${md.utils.escapeHtml(
      str
    )}</code><button class="copy-btn">Copy</button></pre>`;
  },
});

// 👇 Enable math rendering

export const getDateDescription = (date: Date): string => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  } else {
    return `${diffInYears} years ago`;
  }
};

export const getTimeDescription = (time: number): string => {
  // Convert time in seconds to a human-readable format in either months, weeks, days, hours, minutes, or seconds
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor((time / 60) % 60);
  const hours = Math.floor((time / 3600) % 24);
  const days = Math.floor((time / 86400) % 30);
  const weeks = Math.floor((time / 604800) % 52);
  const months = Math.floor((time / 2592000) % 12);
  const years = Math.floor(time / 31536000);
  let timeDescription = "";
  if (years > 0) {
    timeDescription = `${years} year${years > 1 ? "s" : ""} ${months} month${
      months > 1 ? "s" : ""
    }`;
  } else if (months > 0) {
    timeDescription = `${months} month${months > 1 ? "s" : ""} ${weeks} week${
      weeks > 1 ? "s" : ""
    }`;
  } else if (weeks > 0) {
    timeDescription = `${weeks} week${weeks > 1 ? "s" : ""} ${days} day${
      days > 1 ? "s" : ""
    }`;
  } else if (days > 0) {
    timeDescription = `${days} day${days > 1 ? "s" : ""} ${hours} hour${
      hours > 1 ? "s" : ""
    }`;
  } else if (hours > 0) {
    timeDescription = `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${
      minutes > 1 ? "s" : ""
    }`;
  } else if (minutes > 0) {
    timeDescription = `${minutes} minute${
      minutes > 1 ? "s" : ""
    } ${seconds} second${seconds > 1 ? "s" : ""}`;
  } else if (seconds > 0) {
    timeDescription = `${seconds} second${seconds > 1 ? "s" : ""} `;
  }
  return timeDescription.trim();
};
