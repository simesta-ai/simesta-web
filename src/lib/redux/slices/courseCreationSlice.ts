/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// --- Types ---
export type StageKey = 'stage1' | 'stage2' | 'stage3';

export type CourseCreationStage = {
  title: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isError: boolean;
  isLoading: boolean;
  subprocesses: string[];
};

export type CourseCreationState = {
  stages: Record<StageKey, CourseCreationStage>;
  courseId: string | null;
  status: 'idle' | 'in_progress' | 'completed' | 'error';
};

const initialState: CourseCreationState = {
  courseId: null,
  status: 'idle',
  stages: {
    stage1: {
      title: "Scaffolding course context",
      isCompleted: false,
      isCurrent: false,
      isError: false,
      isLoading: false,
      subprocesses: [
        "Generating course modules...",
        "Generating course weeks...",
        "Generating course lectures...",
      ],
    },
    stage2: {
      title: "Generating course visuals and initial lecture",
      isCompleted: false,
      isCurrent: false,
      isError: false,
      isLoading: false,
      subprocesses: [
        "Generating course videos...",
        "Generating course first lecture...",
      ],
    },
    stage3: {
      title: "Saving course content",
      isCompleted: false,
      isCurrent: false,
      isError: false,
      isLoading: false,
      subprocesses: [
        "Saving course modules...",
        "Saving course lessons...",
        "Saving course quizzes...",
        "Saving course videos...",
      ],
    },
  },
};

// --- Slice Definition ---
const courseCreationSlice = createSlice({
  name: "courseCreation",
  initialState,
  reducers: {
    // Action to set the initial state when the process begins
    startCourseCreation: (state) => {
        state.status = 'in_progress';
        // Reset stages to the initial definition, setting stage1 to current/loading
        state.stages = {
             ...initialState.stages,
             stage1: { ...initialState.stages.stage1, isCurrent: true, isLoading: true }
        };
        state.courseId = null;
    },
    
    // Action dispatched from the chatSlice Thunk when a progress message is received
    updateCreationProgress: (state, action: PayloadAction<{
        stage_number: StageKey;
        is_loading: boolean;
        is_completed: boolean;
        is_error: boolean;
    }>) => {
        const { stage_number, is_loading, is_completed, is_error } = action.payload;
        
        const stage = state.stages[stage_number];
        if (stage) {
            stage.isLoading = is_loading;
            stage.isCompleted = is_completed;
            stage.isError = is_error;
            stage.isCurrent = is_loading || (!is_completed && !is_error);
        }
        
        // Update overall status
        if (is_completed && stage_number === 'stage3') {
            state.status = 'completed';
        } else if (is_error) {
            state.status = 'error';
        }
    },

    // Action dispatched for the final action message
    setFinalCourseId: (state, action: PayloadAction<string>) => {
        state.courseId = action.payload;
        state.status = 'completed';
    },

    resetCreationState: (state) => {
        return initialState;
    }
  },
});

export const { 
    startCourseCreation, 
    updateCreationProgress, 
    setFinalCourseId,
    resetCreationState
} = courseCreationSlice.actions;

export default courseCreationSlice.reducer;