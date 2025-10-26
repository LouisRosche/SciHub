// NGSS Three-Dimensional Learning Framework Types

export type GradeLevel = '6' | '7' | '8' | 'MS'; // MS = Middle School (6-8)

export type DCIDomain = 'PS' | 'LS' | 'ESS' | 'ETS';
// PS = Physical Sciences
// LS = Life Sciences
// ESS = Earth and Space Sciences
// ETS = Engineering, Technology, and Applications of Science

export type CCCType =
  | 'patterns'
  | 'cause-effect'
  | 'scale-proportion-quantity'
  | 'systems-models'
  | 'energy-matter'
  | 'structure-function'
  | 'stability-change';

export type SEPType =
  | 'asking-questions'
  | 'developing-models'
  | 'planning-investigations'
  | 'analyzing-data'
  | 'using-mathematics'
  | 'constructing-explanations'
  | 'engaging-argument'
  | 'obtaining-information';

export interface DCI {
  id: string;
  code: string; // e.g., "MS-PS1-1"
  domain: DCIDomain;
  title: string;
  description: string;
  gradeLevel: GradeLevel;
  relatedCCC: CCCType[];
  relatedSEP: SEPType[];
  studentFriendly: string; // Kid-friendly explanation
  realWorldConnections: string[];
  projectIdeas: string[];
}

export interface CCC {
  id: CCCType;
  title: string;
  description: string;
  studentFriendly: string;
  questions: string[]; // Questions students should ask
  notecardPrompts: string[];
}

export interface SEP {
  id: SEPType;
  title: string;
  description: string;
  studentFriendly: string;
  actions: string[]; // What students actually DO
  notecardPrompts: string[];
}

export interface PerformanceExpectation {
  code: string;
  dciId: string;
  ccc: CCCType[];
  sep: SEPType[];
  statement: string;
  clarification: string;
  assessment: string;
}

export interface ProjectTemplate {
  id: string;
  title: string;
  description: string;
  gradeLevel: GradeLevel[];
  duration: string; // e.g., "2 weeks"
  dci: string[]; // DCI IDs
  ccc: CCCType[];
  sep: SEPType[];
  drivingQuestion: string;
  studentChoices: string[]; // Areas where students can personalize
  dailyNotecardPrompts: string[];
  assessmentCriteria: string[];
  materials: string[];
  chromebookActivities: string[];
  notecardActivities: string[];
}

export interface DailyNotecard {
  id: string;
  studentId: string;
  date: Date;
  projectId?: string;

  // NGSS Alignment
  dci?: string[];
  ccc?: CCCType[];
  sep?: SEPType[];

  // Notecard Content
  frontSide: {
    type: 'text' | 'image' | 'both';
    content: string;
    imageUrl?: string;
  };
  backSide: {
    type: 'text' | 'image' | 'both';
    content: string;
    imageUrl?: string;
  };

  // Metadata
  prompt?: string;
  selfAssessment?: string;
  teacherFeedback?: string;
  tags: string[];
  status: 'draft' | 'submitted' | 'reviewed' | 'starred';

  // Spaced Repetition
  nextReviewDate?: Date;
  reviewCount: number;
  masteryLevel: 0 | 1 | 2 | 3 | 4 | 5;
}

export interface Student {
  id: string;
  name: string;
  gradeLevel: GradeLevel;
  interests: string[];
  currentProject?: string;
  learningPath: LearningPath;
  notecards: DailyNotecard[];
  masteredStandards: string[];
  inProgressStandards: string[];
}

export interface LearningPath {
  currentUnit: string;
  completedUnits: string[];
  personalizedGoals: string[];
  nextStandards: string[];
  recommendedProjects: string[];
}

export interface NotecardPrompt {
  id: string;
  text: string;
  type: 'observation' | 'explanation' | 'question' | 'connection' | 'reflection' | 'design';
  ngssAlignment: {
    dci?: string[];
    ccc?: CCCType[];
    sep?: SEPType[];
  };
  scaffold: {
    sentence_starters?: string[];
    thinking_prompts?: string[];
    visual_suggestions?: string[];
  };
}
