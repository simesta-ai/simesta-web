"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { toggleTheme } from "@/lib/redux/slices/uiSlice";
import Image from "next/image";
import { IMAGES } from "@/lib/constants";
import Button from "../ui/Button";
import {
  ChevronDown,
  Moon,
  Sun,
  History,
  MessageCircle,
  RefreshCw,
  Search,
  Download,
  Share,
} from "lucide-react";
import "@/styles/components/header.css";

const CourseHeader = () => {
  const dispatch = useDispatch();
  const { courseHeaderTitle, theme } = useSelector(
    (state: RootState) => state.persisted.ui
  );

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <header
      className={`fixed w-full z-50 flex items-center justify-between transition-all duration-300 course-header`}
    >
      <div className="flex items-center gap-4">
        <button className="course-logo-btn flex items-center justify-center gap-2">
          <Image
            src={theme === "dark" ? IMAGES.LOGO.WHITE : IMAGES.LOGO.BLACK}
            alt="logo"
            width={20}
            height={20}
            className=""
          />
          <ChevronDown className="neutral-icon" size={16} />
        </button>
        <div className="mobile-none">
          <button
            className="course-icon-btn flex items-center justify-center gap-2"
            title="History"
          >
            <History className="neutral-icon" size={16} />
          </button>
        </div>
        <div  className="mobile-none">
          <button
            className="course-icon-btn flex items-center justify-center gap-2"
            title="Refresh"
          >
            <RefreshCw className="neutral-icon" size={16} />
          </button>
        </div>
        <div  className="mobile-none">
          <button
            className="course-icon-btn flex items-center justify-center gap-2"
            title="Search"
          >
            <Search className="neutral-icon" size={16} />
          </button>
        </div>
        <div  className="mobile-none">
          <button
            className="course-icon-btn flex items-center justify-center gap-2"
            title="Chat"
          >
            <MessageCircle className="neutral-icon" size={16} />
          </button>
        </div>
      </div>
      <div>
        <h6 className="course-title-block text-sm">{courseHeaderTitle}</h6>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="theme-toggle"
          onClick={handleToggleTheme}
          aria-label={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <div>
          <Button variant="secondary" size="xs">
            <div className="flex items-center justify-center gap-2 px-1">
              <Download size={14} />
              <span className="mobile-none">Download</span>
            </div>
          </Button>
        </div>
        <div>
          <Button variant="primary" size="xs">
            <div className="flex items-center justify-center gap-2 px-1">
              <Share size={14} />
              <span className="mobile-none">Share</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default CourseHeader;
