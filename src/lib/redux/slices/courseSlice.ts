/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  API_ENDPOINTS,
  ENVIRONMENT_VARIABLES,
  STORAGE_KEYS,
} from "../../constants";
import { Course } from "@/lib/types";

type CourseState = {
  userCourses: Course[];
  isLoadingUserCourses: boolean;
  error: string | null;
  activeCourse: Course | null;
  isLoadingActiveCourse: boolean;
};

const initialState: CourseState = {
  userCourses: [],
  isLoadingUserCourses: false,
  error: null,
  activeCourse: null,
  isLoadingActiveCourse: false,
};

export const fetchUserCourses = createAsyncThunk(
  "courses/fetchUserCourses",
  async (_, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)!);
      if (!user.id) {
        return rejectWithValue("User ID not found");
      }
      if (!authToken) {
        return rejectWithValue("No auth token found");
      }
      const response = await axios.get(
        `${ENVIRONMENT_VARIABLES.API.BASE_URL}${API_ENDPOINTS.COURSES.USER_COURSES}/${user.id}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return response.data.data as Course[];
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.error || "Failed to fetch user courses"
      );
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setActiveCourse: (state, action) => {
      state.activeCourse = action.payload;
    },
    clearActiveCourse: (state) => {
      state.activeCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCourses.pending, (state) => {
        state.isLoadingUserCourses = true;
        state.error = null;
      })
      .addCase(fetchUserCourses.fulfilled, (state, action) => {
        state.isLoadingUserCourses = false;
        state.userCourses = action.payload;
      })
      .addCase(fetchUserCourses.rejected, (state, action) => {
        state.isLoadingUserCourses = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveCourse, clearActiveCourse } = courseSlice.actions;

export default courseSlice.reducer;
