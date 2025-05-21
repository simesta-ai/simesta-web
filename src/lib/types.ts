export interface Contributor {
  id: string;
  name: string;
  role: "owner" | "contributor" | "learner";
  avatar: string;
}

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

export interface OnechoiceQuiz {
  id: string;
  question: string;
  answer: string;
  explanation?: string;
}

export interface LectureContent {
  id: string;
  position: number;
  type: "markdown" | "image" | "mcq" | "onechoice-quiz";
  content: string | string[] | MCQ | OnechoiceQuiz | MCQ[] | OnechoiceQuiz[];
}

export interface Lecture {
  id: string;
  title: string;
  position: number;
  type: "text" | "quiz" | "code-lab";
  duration: number; // in seconds
  content: LectureContent[];
  videos?: string[];
}

export interface Week {
  id: string;
  week_number: number;
  title: string;
  description: string;
  duration: number; // in seconds
  lectures: Lecture[];
}

export interface Module {
  id: string;
  title: string;
  position: number;
  description: string;
  duration: number; // in seconds
  weekly_lectures: Week[];
  learning_outcomes: string[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: number; // in seconds
  language: string;
  learning_outcomes: string[];
  contributors: Contributor[];
  modules: Module[];
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CourseAbridged {
    id: string;
    title: string;
    image: string;
    description: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    duration: number; // in seconds
    created_at: Date;
    updated_at: Date;
}

export interface UserCourseProgress {
  userId: string;
  courseId: string;
  startedAt: Date;
  completedAt?: Date;
  progress: number; // percentage 0 - 100
  currentModuleId?: string;
  moduleProgress: ModuleProgress[];
  bookmarked: boolean;
  notes?: string;
}

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  progress: number; // 0 - 100
  completedAt?: Date;
  lessonProgress: LessonProgress[];
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: Date;
  timeSpent: number; // in seconds
}

export type CourseWithProgress = Course & {
  userProgress?: UserCourseProgress;
};
