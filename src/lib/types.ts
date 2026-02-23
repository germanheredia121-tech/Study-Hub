
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Module {
  id: string;
  title: string;
  slug: string;
  quiz: QuizQuestion[];
}

export type StudyPath = 'dsa' | 'flutter';
