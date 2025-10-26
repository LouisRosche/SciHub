import React, { useState } from 'react';
import { GraduationCap, BookOpen, Brain, LogOut } from 'lucide-react';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import NotecardCreator from './components/NotecardCreator';
import ProjectSelector from './components/ProjectSelector';
import SpacedRepetitionReview from './components/SpacedRepetitionReview';
import { Student, DailyNotecard, NotecardPrompt } from './types/ngss';

type UserRole = 'student' | 'teacher';
type StudentView = 'dashboard' | 'create-notecard' | 'select-project' | 'review';

// Mock data for demonstration
const mockStudent: Student = {
  id: '1',
  name: 'Alex Johnson',
  gradeLevel: '7',
  interests: ['biology', 'environmental science', 'robotics'],
  currentProject: 'Water Quality Detective',
  learningPath: {
    currentUnit: 'Ecosystems and Interactions',
    completedUnits: ['Cell Structure', 'Matter and Energy'],
    personalizedGoals: [
      'Master ecosystem interactions',
      'Design a working water filter',
      'Present findings to the class'
    ],
    nextStandards: ['MS-LS2-1', 'MS-ESS3-1', 'MS-ETS1-1'],
    recommendedProjects: ['Ecosystem Engineer', 'Renewable Energy Challenge']
  },
  notecards: [],
  masteredStandards: ['MS-LS1-1', 'MS-PS1-1'],
  inProgressStandards: ['MS-LS2-1', 'MS-ESS3-1']
};

const mockNotecardPrompt: NotecardPrompt = {
  id: 'prompt-1',
  text: 'Sketch the water testing setup you used today and explain what each test measures. On the back, explain why water quality matters to living things.',
  type: 'observation',
  ngssAlignment: {
    dci: ['MS-ESS3-1', 'MS-ESS2-1'],
    ccc: ['systems-models', 'cause-effect'],
    sep: ['planning-investigations', 'analyzing-data']
  },
  scaffold: {
    sentence_starters: [
      'I tested the water for...',
      'The results showed that...',
      'This is important because...'
    ],
    thinking_prompts: [
      'What did each test reveal about the water?',
      'How do these measurements affect living things?',
      'What patterns did you notice?'
    ],
    visual_suggestions: [
      'Label all parts of your testing equipment',
      'Use arrows to show the testing process',
      'Include your data measurements'
    ]
  }
};

function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [studentView, setStudentView] = useState<StudentView>('dashboard');
  const [student, setStudent] = useState<Student>(mockStudent);
  const [allNotecards, setAllNotecards] = useState<DailyNotecard[]>([]);

  // Role Selection Screen
  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 via-science-biology to-science-chemistry flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              🧪 Welcome to SciHub
            </h1>
            <p className="text-xl text-white/90">
              NGSS-Aligned Science Learning • Project-Based • Personalized
            </p>
            <p className="text-white/80 mt-2">
              Daily notecards + Chromebooks = Science mastery!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setUserRole('student')}
              className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 group"
            >
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <GraduationCap className="w-10 h-10 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">I'm a Student</h2>
              <p className="text-gray-600">
                Create daily notecards, work on projects, and master science standards
              </p>
            </button>

            <button
              onClick={() => setUserRole('teacher')}
              className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 group"
            >
              <div className="w-20 h-20 bg-science-biology/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-science-biology/30 transition-colors">
                <BookOpen className="w-10 h-10 text-science-biology" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">I'm a Teacher</h2>
              <p className="text-gray-600">
                Review daily notecards, track progress, and guide student learning
              </p>
            </button>
          </div>

          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">What makes SciHub special?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>✓ Daily Notecard System</strong>
                <p className="text-white/80">One meaningful artifact every day</p>
              </div>
              <div>
                <strong>✓ NGSS 3D Learning</strong>
                <p className="text-white/80">DCI + CCC + SEP integrated</p>
              </div>
              <div>
                <strong>✓ Project-Based</strong>
                <p className="text-white/80">Real problems, student choice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Teacher Dashboard
  if (userRole === 'teacher') {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SciHub</h1>
                <p className="text-xs text-gray-600">Teacher Portal</p>
              </div>
            </div>
            <button
              onClick={() => setUserRole(null)}
              className="btn-secondary flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Switch User
            </button>
          </div>
        </nav>

        <TeacherDashboard
          students={[mockStudent]}
          allNotecards={allNotecards}
        />
      </div>
    );
  }

  // Student Interface
  const handleSaveNotecard = (notecard: Partial<DailyNotecard>) => {
    const fullNotecard: DailyNotecard = {
      id: `nc-${Date.now()}`,
      studentId: student.id,
      ...notecard,
      date: notecard.date || new Date(),
      frontSide: notecard.frontSide || { type: 'text', content: '' },
      backSide: notecard.backSide || { type: 'text', content: '' },
      tags: notecard.tags || [],
      status: notecard.status || 'submitted',
      reviewCount: 0,
      masteryLevel: 0
    };

    setAllNotecards(prev => [...prev, fullNotecard]);
    setStudentView('dashboard');
  };

  const handleUpdateMastery = (notecardId: string, newMastery: number, nextReview: Date) => {
    setAllNotecards(prev =>
      prev.map(nc =>
        nc.id === notecardId
          ? { ...nc, masteryLevel: newMastery, nextReviewDate: nextReview, reviewCount: nc.reviewCount + 1 }
          : nc
      )
    );
  };

  const handleSelectProject = (projectId: string) => {
    setStudent(prev => ({ ...prev, currentProject: projectId }));
    setStudentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SciHub</h1>
                <p className="text-xs text-gray-600">Student Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setStudentView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  studentView === 'dashboard'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setStudentView('review')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  studentView === 'review'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Brain className="w-4 h-4" />
                Review
              </button>
              <button
                onClick={() => setUserRole(null)}
                className="btn-secondary flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Exit
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {studentView === 'dashboard' && (
        <StudentDashboard
          student={student}
          notecards={allNotecards.filter(nc => nc.studentId === student.id)}
          onStartNotecard={() => setStudentView('create-notecard')}
          onSelectProject={() => setStudentView('select-project')}
        />
      )}

      {studentView === 'create-notecard' && (
        <NotecardCreator
          currentProject={student.currentProject}
          suggestedPrompt={mockNotecardPrompt}
          onSave={handleSaveNotecard}
          onDraft={handleSaveNotecard}
        />
      )}

      {studentView === 'select-project' && (
        <ProjectSelector
          studentInterests={student.interests}
          onSelectProject={handleSelectProject}
        />
      )}

      {studentView === 'review' && (
        <SpacedRepetitionReview
          notecards={allNotecards.filter(nc => nc.studentId === student.id)}
          onUpdateMastery={handleUpdateMastery}
        />
      )}
    </div>
  );
}

export default App;
