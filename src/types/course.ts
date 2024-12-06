export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  timeLimit?: number; // in minutes
  passingScore: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  modules: {
    id: string;
    title: string;
    content: string;
    videoUrl?: string;
    quiz?: Quiz;
  }[];
  enrolledUsers: string[];
  progress: {
    [userId: string]: {
      completedModules: string[];
      quizScores: {
        [quizId: string]: number;
      };
    };
  };
}