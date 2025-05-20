"use client";

import CourseHeader from "@/components/layout/CourseHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import LeftSection from "@/components/layout/LeftSection";
import "@/styles/pages/course.css";

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isSideSectionOpen } = useSelector((state: RootState) => state.ui);

  return (
    <main className="relative main-body">
      <CourseHeader />
      <div
        className={`layout-container ${!isSideSectionOpen ? "collapsed" : ""}`}
      >
        <div className="left-side">
          <LeftSection />
        </div>
        <div className="right-side">
          <div className="right-container">{children}</div>
        </div>
      </div>
    </main>
  );
}
