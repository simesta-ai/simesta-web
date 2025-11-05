/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import CourseHeader from "@/components/layout/CourseHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import LeftSection from "@/components/layout/LeftSection";
import "@/styles/pages/course.css";
import { useRef, useState, useEffect } from "react";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSideSectionOpen } = useSelector((state: RootState) => state.persisted.ui);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [leftWidth, setLeftWidth] = useState(0); // % value

  const handleMouseDown = () => {
    isDragging.current = true;
    document.body.classList.add("resizing");
  };
  
  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.classList.remove("resizing");
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const offset =
      e.clientX - containerRef.current.getBoundingClientRect().left;
    let newLeft = (offset / containerWidth) * 100;

    if (newLeft < 18) {
      newLeft = 0;
    }

    if (newLeft > 30) newLeft = 30;

    setLeftWidth(newLeft);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <main className="relative main-body">
      <CourseHeader />
      <div
        ref={containerRef}
        className={`layout-container ${leftWidth === 0 ? "collapsed" : ""}`}
      >
        <div className="left-side" style={{ width: `${leftWidth}%` }}>
          <LeftSection />
        </div>

        <div className="right-side relative">
          {/* Divider is now part of right section */}
          {(
            <div className="resize-divider" onMouseDown={handleMouseDown} />
          )}
          <div className="right-container">{children}</div>
        </div>
      </div>
    </main>
  );
}
