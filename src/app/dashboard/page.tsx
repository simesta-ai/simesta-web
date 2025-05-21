"use client";

import Chatbox from "@/components/ui/ChatBox";
import "@/styles/pages/home.css";
import "@/styles/pages/dashboard.css";
import CourseCard from "@/components/ui/CourseCard";
import { CourseAbridged } from "@/lib/types";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const [isLoadingUserCourses] = useState(false);
  const [isLoadingCommunityCourses] = useState(false);

  const recommendations = [
    "Data analysis with Python",
    "Quantum Mechanics",
    "Introduction to cloud computing with AWS",
  ];

  const courses: CourseAbridged[] = [
    {
      id: "gshag-usnund",
      title: "Data analysis with Python",
      created_at: new Date(),
      level: "Beginner",
      duration: 3893733,
      updated_at: new Date(),
      description: "Learn data analysis using Python and its libraries.",
      image:
        "https://res.cloudinary.com/di1uklizr/image/upload/v1734444678/course-images/hw10xtqbkepxcqn120vn.png",
    },

    {
      id: "gshag-usnund",
      title: "Data analysis with Python",
      created_at: new Date(),
      level: "Beginner",
      duration: 3893733,
      updated_at: new Date(),
      description: "Learn data analysis using Python and its libraries.",
      image:
        "https://res.cloudinary.com/di1uklizr/image/upload/v1734444678/course-images/hw10xtqbkepxcqn120vn.png",
    },
    {
      id: "gshag-usnund",
      title: "Data analysis with Python",
      level: "Beginner",
      duration: 3893733,
      updated_at: new Date(),
      created_at: new Date(),
      description: "Learn data analysis using Python and its libraries.",
      image:
        "https://res.cloudinary.com/di1uklizr/image/upload/v1734444678/course-images/hw10xtqbkepxcqn120vn.png",
    },
  ];

  const communityCourses: CourseAbridged[] = [
    {
      id: "gshag-usnund",
      title: "Data analysis with Python",
      level: "Beginner",
      duration: 3893733,
      updated_at: new Date(),
      created_at: new Date(),
      description: "Learn data analysis using Python and its libraries.",
      image:
        "https://res.cloudinary.com/di1uklizr/image/upload/v1734444678/course-images/hw10xtqbkepxcqn120vn.png",
    },
    {
      id: "gshag-uusbud",
      level: "Beginner",
      duration: 3893733,
      updated_at: new Date(),
      created_at: new Date(),
      title: "Data analysis with Python",
      description: "Learn data analysis using Python and its libraries.",
      image:
        "https://res.cloudinary.com/di1uklizr/image/upload/v1734444678/course-images/hw10xtqbkepxcqn120vn.png",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero items-center flex flex-col">
        <h3 className="hero-text">
          Create a course and{" "}
          <span className="text-primary-600">start learning.</span>
        </h3>
        <p className="text-md subtext">
          Learn anything you want, at your own pace.
        </p>
        <Chatbox />
        <div className="flex gap-4 flex-wrap justify-center items-center padding-4">
          {recommendations.map((r, i) => {
            return (
              <button key={i} type="button" className="recommendation-btn">
                {r}
              </button>
            );
          })}
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses-section gap-2">
        <h3 className="hero-text mt-12">Your Courses</h3>
        <p className="text-md subtext">Continue learning with your courses.</p>
        <div className="flex flex-wrap items-center gap-8 padding-4">
          <button onClick={scrollToTop} className="create-course-big-btn">
            <Plus /> &nbsp; Create course
          </button>
          {isLoadingUserCourses ? (
            <>
              <div className="skeleton course-card-skeleton" />
              <div className="skeleton course-card-skeleton" />
              <div className="skeleton course-card-skeleton" />
            </>
          ) : courses.length > 0 ? (
            courses.map((course) => {
              return <CourseCard key={course.id} course={course} />;
            })
          ) : null}
        </div>
        <h3 className="hero-text mt-12">From The Community</h3>
        <p className="text-md subtext">Continue learning with your courses.</p>
        <div
          className={`flex flex-wrap gap-8 ${
            isLoadingCommunityCourses ? "justify-center items-center" : ""
          } padding-4`}
        >
          {isLoadingCommunityCourses ? (
            <div className="flex justify-center items-center gap-8">
              <div className="skeleton course-card-skeleton" />
              <div className="skeleton course-card-skeleton" />
              <div className="skeleton course-card-skeleton" />
              <div className="skeleton course-card-skeleton" />
            </div>
          ) : (
            communityCourses.map((course) => {
              return <CourseCard key={course.id} course={course} />;
            })
          )}
        </div>
      </section>
    </>
  );
}
