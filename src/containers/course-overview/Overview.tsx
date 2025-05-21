import { Course } from "@/lib/types";
import React from "react";
import { CircleCheckBig } from "lucide-react";

const Overview = ({ course }: { course: Course }) => {
  return (
    <div className="overview-con flex flex-col gap-6">
      <h4 className="text-2xl font-bold">About this Course</h4>
      <p className="course-desc-text text-md">{course.description}</p>
      {/* Learning outcomes, 2 per line */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xl font-bold">What you will learn</h4>
        <div className="outcome-wrapper">
          {course.learning_outcomes.map((lo, index) => (
            <div key={index} className="outcome-container flex gap-4">
              <CircleCheckBig className="learning-outcome-check" />
              <p className="course-desc-text lo-text">{lo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
