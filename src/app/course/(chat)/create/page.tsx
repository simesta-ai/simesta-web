/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "@/styles/pages/create-course.css";
import CheckIcon from "@/components/ui/Check";
import Loader from "@/components/ui/Loader";
import { Box } from "lucide-react";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/lib/redux/store";
import {
  startCourseCreation,
  resetCreationState,
} from "@/lib/redux/slices/courseCreationSlice";

const CreateCoursePage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { stages, courseId, status } = useSelector(
    (state: RootState) => state.nonPersisted.courseCreation
  );

  useEffect(() => {
    // If the status is not already in progress (e.g., if navigated directly here), start it.
    if (status === "idle") {
      dispatch(startCourseCreation());
    }

    // Cleanup: Reset the state when the user leaves this page
    return () => {
      dispatch(resetCreationState());
    };
  }, [dispatch, status]);

  useEffect(() => {
    if (status === "completed" && courseId) {
      router.push(`/course/${courseId}`);
    } else if (status === "error") {
      console.error("Course creation failed.");
      // Optional: Display error message or navigate to an error page
    }
  }, [status, courseId, router]);

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
