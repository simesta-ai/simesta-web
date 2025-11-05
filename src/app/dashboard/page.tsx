"use client";

import Chatbox from "@/components/ui/ChatBox";
import "@/styles/pages/home.css";
import "@/styles/pages/dashboard.css";
import CourseCard from "@/components/ui/CourseCard";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useCourse } from "@/lib/hooks/useCourse";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  sendMessage,
  connectChat,
  addLocalMessage,
} from "@/lib/redux/slices/chatSlice";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { loadCourses, userCourses, isLoadingUserCourses } = useCourse();
  const { isConnected, chatId } = useSelector(
    (state: RootState) => state.nonPersisted.chat
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const recommendations = [
    "Data analysis with Python",
    "Quantum Mechanics",
    "Introduction to cloud computing with AWS",
  ];

  useEffect(() => {
    loadCourses();

    // ✅ Auto-connect WebSocket when dashboard loads (if not already connected)
    if (!isConnected) {
      dispatch(connectChat({ chatId }));
    }
  }, [loadCourses, isConnected, chatId]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDashboardSubmit = async (prompt: string) => {
    if (!prompt.trim()) return;

    dispatch(
      addLocalMessage({ role: "user", content: prompt, timestamp: Date.now() })
    );

    if (!isConnected) {
      const connectResult = await dispatch(connectChat({ chatId: chatId }));

      if (connectResult.meta.requestStatus === "rejected") {
        console.error("Failed to connect WebSocket. Cannot send message.");
        return;
      }
    }

    sendMessage(prompt);
    const targetChatPath = chatId
      ? `/course/create?chat_id=${chatId}`
      : "/course/create?chat_id=new";
    router.push(targetChatPath);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero items-center flex flex-col">
        <h3 className="hero-text">
          Create a course and{" "}
          <span className="text-primary-600 ai-gradient-text">
            start learning.
          </span>
        </h3>
        <p className="text-md subtext">
          Learn anything you want, at your own pace.
        </p>
        <Chatbox
          type="dashboard"
          loading={false}
          onSubmit={handleDashboardSubmit}
        />
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
          ) : userCourses.length > 0 ? (
            userCourses.map((course) => {
              return <CourseCard key={course.id} course={course} />;
            })
          ) : null}
        </div>
        {/* <h3 className="hero-text mt-12">From The Community</h3>
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
        </div> */}
      </section>
    </>
  );
}
