"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/Loader";
import { Gauge, Timer, Languages } from "lucide-react";
import Image from "next/image";

import "@/styles/pages/maincourse.css";
import CourseNavigataion from "@/components/layout/CourseNavigataion";
import Button from "@/components/ui/Button";
import Overview from "@/containers/course-overview/Overview";
import Modules from "@/containers/course-overview/Modules";
import Notes from "@/containers/course-overview/Notes";
import { Course } from "@/lib/types";
import { getTimeDescription } from "@/lib/workers";
import { courseData, userProgressData } from "@/data/courseData";

const CoursePage = () => {
  const { id } = useParams();
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "modules" | "notes">(
    "overview"
  );
  const handleTabChange = (tab: "overview" | "modules" | "notes") => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setTimeout(() => {
      setCourse(courseData);
      setIsLoadingCourse(false);
    }, 2000);
  });
  return (
    <div className="main-course-container">
      {isLoadingCourse || !course ? (
        <div className="flex flex-col gap-4">
          <Loader size={20} />
          <p>Getting course...</p>
        </div>
      ) : (
        <div className="course-page-container">
          <CourseNavigataion />

          {/* Hero Section */}
          <div className="course-hero-section">
            <div className="flex flex-col gap-4">
              <h1 className="course-title">{course.title}</h1>
              <p className="course-description">
                {course.subtitle}
              </p>

              <h5 className="course-subheader">Contributors:</h5>
              <div className="contibutors-container flex gap-2 items-center">
                {course.contributors
                  .sort((a, b) => {
                    if (a.role === "owner" && b.role !== "owner") return -1;
                    if (a.role !== "owner" && b.role === "owner") return 1;
                    return 0;
                  })
                  .slice(0, 3)
                  .map((contributor, index) => (
                    <div key={index} className="contributor">
                      <Image
                        className="contributor-image"
                        src={contributor.avatar}
                        alt={contributor.name}
                        width={50}
                        height={50}
                      />
                    </div>
                  ))}
                <div className="contributor-info">
                  <p>
                    <span className="font-bold">{course.contributors[0].name}</span>
                    {course.contributors.length > 1
                      ? ` +${course.contributors.length - 1} others`
                      : ``}
                  </p>
                </div>
              </div>
            </div>
            <div className="go-to-course-container">
              <Button
                variant="primary"
                size="md"
                fullWidth
                className="go-to-course-button"
              >
                Start learning
              </Button>
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <Gauge className="gtc-info-icon" />
                  <p className="font-bold gtc-info-key">Experience level</p>
                </div>
                <p className="gtc-info-value">{course.level}</p>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <Timer className="gtc-info-icon" />
                  <p className="font-bold gtc-info-key">Estimated duration</p>
                </div>
                <p className="gtc-info-value">{getTimeDescription(course.duration)}</p>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <Languages className="gtc-info-icon" />
                  <p className="font-bold gtc-info-key">Language</p>
                </div>
                <p className="gtc-info-value">{course.language}</p>
              </div>
            </div>
          </div>

          {/* Course Main Section */}
          <div className="course-main-section">
            <div className="course-main-section-nav">
              <div
                className={`course-main-section-nav-item ${
                  activeTab === "overview" ? "active" : ""
                }`}
              >
                <button
                  onClick={() => handleTabChange("overview")}
                  className="course-main-section-nav-item-button"
                >
                  Overview
                </button>
              </div>
              <div
                className={`course-main-section-nav-item ${
                  activeTab === "modules" ? "active" : ""
                }`}
              >
                <button
                  onClick={() => handleTabChange("modules")}
                  className="course-main-section-nav-item-button"
                >
                  Modules
                </button>
              </div>
              <div
                className={`course-main-section-nav-item ${
                  activeTab === "notes" ? "active" : ""
                }`}
              >
                <button
                  onClick={() => handleTabChange("notes")}
                  className="course-main-section-nav-item-button"
                >
                  Notes
                </button>
              </div>
            </div>
            <div className="course-main-section-content">
              {activeTab === "overview" && <Overview course={course} />}
              {activeTab === "modules" && <Modules modules={course.modules} />}
              {activeTab === "notes" && <Notes userCourseProgress={userProgressData} course={course} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
