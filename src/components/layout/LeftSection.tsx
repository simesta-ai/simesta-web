"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import Loader from "../ui/Loader";
import ChatSection from "@/containers/ChatSection";
import HistorySection from "@/containers/HistorySection";
import SearchSection from "@/containers/SearchSection";
import "@/styles/components/chatbox.css";

const LeftSection = () => {
  const { sideSectionType } = useSelector((state: RootState) => state.ui);
  const [isLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {isLoading ? (
        <Loader size={20} />
      ) : sideSectionType ? (
        <>
          {sideSectionType === "chat" && <ChatSection chat_id="usia" />}
          {sideSectionType === "history" && <HistorySection />}
          {sideSectionType === "search" && <SearchSection />}
        </>
      ) : (
        <p className="text-sm text-bold">No content available.</p>
      )}
    </div>
  );
};

export default LeftSection;
