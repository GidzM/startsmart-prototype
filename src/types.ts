
export interface Course {
  id: string;
  title: string;
  category: 'Commercial' | 'Residential' | 'Management' | 'Strategy';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessonCount: number;
  description: string;
  imageUrl: string;
  tag?: string;
  progress?: number;
  rating?: number;
  reviewCount?: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  moduleName: string;
  lessonNumber: number;
  totalLessons: number;
  duration: string;
  videoUrl: string;
  summary: string;
  resources: Array<{ name: string; size: string; type: string }>;
}

export interface InvestmentTrack {
  id: string;
  title: string;
  category: string;
  duration: string;
  modulesCount: number;
  description: string;
  progress: number;
  icon: string;
  steps: RoadmapStep[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  imageUrl?: string;
  timeRemaining?: string;
}
