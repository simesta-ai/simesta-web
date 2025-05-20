"use client";

import { useState } from "react";

import "@/styles/pages/create-course.css";
import CheckIcon from "@/components/ui/Check";
import Loader from "@/components/ui/Loader";
import { Box } from "lucide-react";

const CreateCoursePage = () => {
  const [stages, setStages] = useState({
    firstStage: {
      title: "Scaffolding course context",
      isCompleted: true,
      isCurrent: false,
      isError: false,
      isLoading: false,
      subprocesses: [
        "Generating course context...",
        "Generating course title...",
        "Generating course description...",
      ],
    },
    secondStage: {
      title: "Generating course content",
      isCompleted: false,
      isCurrent: true,
      isError: false,
      isLoading: true,
      subprocesses: [
        "Generating course outline...",
        "Generating course modules...",
        "Generating course lessons...",
      ],
    },
    thirdStage: {
      title: "Generating course assets",
      isCompleted: false,
      isCurrent: false,
      isError: false,
      isLoading: false,
      subprocesses: [
        "Generating course images...",
        "Generating course videos...",
        "Generating course quizzes...",
      ],
    },
    fourthStage: {
      title: "Finalizing course",
      isCompleted: false,
      isCurrent: false,
      isError: false,
      isLoading: false,
      subprocesses: [
        "Generating course summary...",
        "Generating course feedback...",
        "Generating course completion certificate...",
      ],
    },
  });
  return (
    <div className="create-course-container w-full">
      <div className="flex items-center w-full justify-center flex-col">
        <div className="flex flex-col gap-4 padding-8 items-center justify-center w-full">
          <h3 className="create-course-title">Creating your course...</h3>
          <p className="onboard-subtext">Ready, get set, learn..</p>
        </div>

        <div className="flex flex-col w-full gap-4 items-center justify-center">
          {Object.entries(stages).map(([key, stage], index) => (
            <div
              key={index}
              className={`stage-container ${
                stage.isCurrent ? "current-stage" : ""
              } ${stage.isCompleted ? "completed-stage" : ""} ${
                stage.isError ? "error-stage" : ""
              }`}
            >
              <div className="flex items-center  gap-6">
                {stage.isLoading ? (
                  <Loader size={20} />
                ) : stage.isCompleted ? (
                  <CheckIcon size={15} />
                ) : (
                  <Box size={20} className="stage-icon" />
                )}
                <h4 className="stage-title text-md font-bold">{stage.title}</h4>
              </div>

              {stage.isLoading ? (
                <div className="subprocesses-container">
                  {stage.subprocesses.map((subprocess, index) => (
                    <p key={index} className="subprocess-text">
                      {subprocess}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
