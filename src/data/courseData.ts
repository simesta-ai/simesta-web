import { CourseWithProgress, UserCourseProgress } from "@/lib/types";

export const courseData: CourseWithProgress = {
  id: "machine-learning",
  title: "Supervised Machine Learning: Regression and Classification",
  subtitle:
    "Learn the fundamentals of machine learning for regression and classification problems",
  image:
    "https://res.cloudinary.com/di1uklizr/image/upload/v1734444678/course-images/hw10xtqbkepxcqn120vn.png",
  description:
    "In this course, you will learn about the most widely used machine learning techniques and how to implement them using Python and popular libraries like NumPy and scikit-learn. You will gain hands-on experience with regression and classification algorithms, and learn how to evaluate and improve model performance.",
  level: "Beginner",
  duration: 3893733,
  language: "English",
  learning_outcomes: [
    "Build machine learning models in Python using popular machine learning libraries NumPy & scikit-learn",
    "Build & train supervised machine learning models for prediction & binary classification tasks, including linear regression & logistic regression",
    "Understand the difference between supervised and unsupervised learning",
    "Apply machine learning algorithms to real-world data sets",
  ],
  contributors: [
    {
      id: "contributor-1",
      name: "John Doe",
      role: "owner",
      avatar:
        "https://res.cloudinary.com/di1uklizr/image/upload/v1747772285/team-5_nle4gt.jpg",
    },
    {
      id: "contributor-2",
      name: "Jane Smith",
      role: "contributor",
      avatar:
        "https://res.cloudinary.com/di1uklizr/image/upload/v1747772285/team-5_nle4gt.jpg",
    },
    {
      id: "contributor-3",
      name: "Alice Johnson",
      role: "contributor",
      avatar:
        "https://res.cloudinary.com/di1uklizr/image/upload/v1747772285/team-5_nle4gt.jpg",
    },
  ],
  modules: [
    {
      id: "module-1",
      title: "Introduction to Machine Learning",
      position: 1,
      description:
        "Welcome to the Machine Learning Specialization! You're joining millions of others who have taken either this or the original course, which led to the founding of Coursera, and has helped millions of other learners, like you, take a look at the exciting world of machine learning!",
      duration: 7,
      weekly_lectures: [
        {
          id: "week-1",
          week_number: 1,
          title: "Week 1: Introduction to Machine Learning",
          description:
            "In this week, you will learn about the basics of machine learning, including supervised and unsupervised learning, and the different types of algorithms used in machine learning.",
          duration: 54654,
          lectures: [
            {
              id: "lecture-1-1",
              title: "Welcome to Machine Learning",
              type: "text",
              position: 1,
              duration: 10,
              content: [
                {
                  id: "content-1-1-1",
                  type: "markdown",
                  position: 1,
                  content:
                    "# Welcome to Machine Learning\n\nIn this course, you will learn about supervised machine learning, which is the type of machine learning that's most commonly used today. You will learn about both regression as well as classification algorithms.\n\nBefore we dive in, let's start with an explanation of what machine learning is and why it's so important today.",
                },
                {
                  id: "content-1-1-2",
                  type: "image",
                  position: 2,
                  content:
                    "https://res.cloudinary.com/di1uklizr/image/upload/v1747791124/Machine-learning-def-_bm1bhs.png",
                },
                {
                  id: "content-1-1-3",
                  type: "markdown",
                  position: 3,
                  content:
                    "Machine learning is the science of getting computers to learn without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, practical speech recognition, effective web search, and a vastly improved understanding of the human genome.",
                },
              ],
            },
          ],
        },
        {
          id: "week-2",
          week_number: 1,
          title: "Week 2: Supervised Learning",
          description:
            "In this week, you will learn about supervised learning algorithms, including linear regression and logistic regression. You will also learn how to evaluate the performance of your models.",
          duration: 54654,
          lectures: [
            {
              id: "lecture-1-1",
              title: "Welcome to Machine Learning",
              type: "text",
              position: 1,
              duration: 10,
              content: [
                {
                  id: "content-1-1-1",
                  type: "markdown",
                  position: 1,
                  content:
                    "# Welcome to Machine Learning\n\nIn this course, you will learn about supervised machine learning, which is the type of machine learning that's most commonly used today. You will learn about both regression as well as classification algorithms.\n\nBefore we dive in, let's start with an explanation of what machine learning is and why it's so important today.",
                },
                {
                  id: "content-1-1-2",
                  type: "image",
                  position: 2,
                  content:
                    "https://res.cloudinary.com/di1uklizr/image/upload/v1747791124/Machine-learning-def-_bm1bhs.png",
                },
                {
                  id: "content-1-1-3",
                  type: "markdown",
                  position: 3,
                  content:
                    "Machine learning is the science of getting computers to learn without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, practical speech recognition, effective web search, and a vastly improved understanding of the human genome.",
                },
              ],
            },
          ],
        },
      ],
      learning_outcomes: [
        "Understand the basics of machine learning",
        "Learn about supervised and unsupervised learning",
        "Familiarize yourself with different types of algorithms used in machine learning",
      ],
    },
    {
      id: "module-2",
      title: "Introduction to Machine Learning",
      description:
        "Welcome to the Machine Learning Specialization! You're joining millions of others who have taken either this or the original course, which led to the founding of Coursera, and has helped millions of other learners, like you, take a look at the exciting world of machine learning!",
      duration: 7,
      position: 2,
      weekly_lectures: [
        {
          id: "week-1",
          week_number: 1,
          title: "Week 2: Supervised Learning",
          description:
            "In this week, you will learn about supervised learning algorithms, including linear regression and logistic regression. You will also learn how to evaluate the performance of your models.",
          duration: 54654,
          lectures: [
            {
              id: "lecture-1-1",
              title: "Welcome to Machine Learning",
              type: "text",
              position: 1,
              duration: 10,
              content: [
                {
                  id: "content-1-1-1",
                  type: "markdown",
                  position: 1,
                  content:
                    "# Welcome to Machine Learning\n\nIn this course, you will learn about supervised machine learning, which is the type of machine learning that's most commonly used today. You will learn about both regression as well as classification algorithms.\n\nBefore we dive in, let's start with an explanation of what machine learning is and why it's so important today.",
                },
                {
                  id: "content-1-1-2",
                  type: "image",
                  position: 2,
                  content:
                    "https://res.cloudinary.com/di1uklizr/image/upload/v1747791124/Machine-learning-def-_bm1bhs.png",
                },
                {
                  id: "content-1-1-3",
                  type: "markdown",
                  position: 3,
                  content:
                    "Machine learning is the science of getting computers to learn without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, practical speech recognition, effective web search, and a vastly improved understanding of the human genome.",
                },
              ],
            },
          ],
        },
        {
          id: "week-2",
          week_number: 1,
          title: "Week 2: Supervised Learning",
          description:
            "In this week, you will learn about supervised learning algorithms, including linear regression and logistic regression. You will also learn how to evaluate the performance of your models.",
          duration: 54654,
          lectures: [
            {
              id: "lecture-1-1",
              title: "Welcome to Machine Learning",
              type: "text",
              position: 1,
              duration: 10,
              content: [
                {
                  id: "content-1-1-1",
                  type: "markdown",
                  position: 1,
                  content:
                    "# Welcome to Machine Learning\n\nIn this course, you will learn about supervised machine learning, which is the type of machine learning that's most commonly used today. You will learn about both regression as well as classification algorithms.\n\nBefore we dive in, let's start with an explanation of what machine learning is and why it's so important today.",
                },
                {
                  id: "content-1-1-2",
                  type: "image",
                  position: 2,
                  content:
                    "https://res.cloudinary.com/di1uklizr/image/upload/v1747791124/Machine-learning-def-_bm1bhs.png",
                },
                {
                  id: "content-1-1-3",
                  type: "markdown",
                  position: 3,
                  content:
                    "Machine learning is the science of getting computers to learn without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, practical speech recognition, effective web search, and a vastly improved understanding of the human genome.",
                },
              ],
            },
          ],
        },
      ],
      learning_outcomes: [
        "Understand the basics of machine learning",
        "Learn about supervised and unsupervised learning",
        "Familiarize yourself with different types of algorithms used in machine learning",
      ],
    },
  ],
  notes: "This is a sample note for the course.",
  created_at: new Date(),
  updated_at: new Date(),
};

// create dummy user progress data
export const userProgressData: UserCourseProgress = {
  userId: "user-1",
  courseId: "machine-learning",
  startedAt: new Date("2023-01-01"),
  completedAt: new Date("2023-01-10"),
  progress: 80,
  currentModuleId: "module-1",
  moduleProgress: [
    {
      moduleId: "module-1",
      completed: true,
      progress: 100,
      completedAt: new Date("2023-01-05"),
      lessonProgress: [
        {
          lessonId: "lecture-1-1",
          completed: true,
          completedAt: new Date("2023-01-02"),
          timeSpent: 1200,
        },
        {
          lessonId: "lecture-1-2",
          completed: true,
          completedAt: new Date("2023-01-03"),
          timeSpent: 1500,
        },
        {
          lessonId: "lecture-1-3",
          completed: false,
          completedAt: undefined,
          timeSpent: 0,
        },
      ],
    },
    {
      moduleId: "module-2",
      completed: false,
      progress: 50,
      completedAt: undefined,
      lessonProgress: [
        {
          lessonId: "lecture-2-1",
          completed: false,
          completedAt: undefined,
          timeSpent: 0,
        },
        {
          lessonId: "lecture-2-2",
          completed: false,
          completedAt: undefined,
          timeSpent: 0,
        },
      ],
    },
  ],
  bookmarked: true,
  notes: "This is a sample note for the course.",
};
