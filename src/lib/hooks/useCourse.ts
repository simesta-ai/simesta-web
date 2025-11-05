"use client";

import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUserCourses } from "../redux/slices/courseSlice";

export const useCourse = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const { userCourses, isLoadingUserCourses, error } = useSelector(
    (state: RootState) => state.nonPersisted.course
  );

  const loadCourses = useCallback(async () => {
    const resultAction =  await dispatch(fetchUserCourses());
    // Handle any post-fetch logic if needed
    return resultAction;
  }, [dispatch]);

  useEffect(() => {
    // Fetch user courses on mount
    loadCourses();
  }, [loadCourses]);

  return {
    userCourses,
    isLoadingUserCourses,
    error,
    loadCourses,
  };
};
