import React from 'react';
import {
  BookOpen,
  Target,
  Calendar,
  TrendingUp,
  Award,
  Brain,
  CheckCircle,
  Clock,
  Flame
} from 'lucide-react';
import { Student, DailyNotecard } from '../types/ngss';

interface StudentDashboardProps {
  student: Student;
  notecards: DailyNotecard[];
  onStartNotecard: () => void;
  onSelectProject: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  notecards,
  onStartNotecard,
  onSelectProject
}) => {
  const today = new Date().toDateString();
  const todayNotecard = notecards.find(
    nc => new Date(nc.date).toDateString() === today
  );

  const streak = calculateStreak(notecards);
  const thisWeekCount = notecards.filter(nc => {
    const ncDate = new Date(nc.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return ncDate >= weekAgo;
  }).length;

  const needsReview = notecards.filter(nc =>
    nc.nextReviewDate && new Date(nc.nextReviewDate) <= new Date()
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Header */}
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {student.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Let's make today's scientific discovery
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm">Notecard Streak</p>
              <p className="text-3xl font-bold mt-1">{streak} days</p>
            </div>
            <Flame className="w-12 h-12 text-primary-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-science-biology to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">This Week</p>
              <p className="text-3xl font-bold mt-1">{thisWeekCount} cards</p>
            </div>
            <Calendar className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-science-chemistry to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Mastered Standards</p>
              <p className="text-3xl font-bold mt-1">{student.masteredStandards.length}</p>
            </div>
            <Award className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-science-earth to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Need Review</p>
              <p className="text-3xl font-bold mt-1">{needsReview.length}</p>
            </div>
            <Brain className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Today's Notecard */}
      <div className="card border-2 border-primary-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CheckCircle className={`w-8 h-8 ${todayNotecard?.status === 'submitted' ? 'text-green-500' : 'text-gray-300'}`} />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Today's Notecard</h2>
              <p className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          {todayNotecard?.status === 'submitted' ? (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Submitted!
            </div>
          ) : todayNotecard?.status === 'draft' ? (
            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Draft Saved
            </div>
          ) : (
            <button onClick={onStartNotecard} className="btn-primary px-6 py-3 text-lg">
              Create Today's Notecard
            </button>
          )}
        </div>

        {todayNotecard && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Front Side Preview</p>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {todayNotecard.frontSide.content || 'No content yet'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Back Side Preview</p>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {todayNotecard.backSide.content || 'No content yet'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Project */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-600" />
            Current Project
          </h2>
          {student.currentProject ? (
            <div className="space-y-3">
              <div className="p-4 bg-primary-50 rounded-lg">
                <h3 className="font-semibold text-primary-900">
                  {student.currentProject}
                </h3>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary-700">Progress</span>
                    <span className="text-primary-700 font-medium">65%</span>
                  </div>
                  <div className="w-full bg-primary-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
              <button className="w-full btn-secondary">Continue Project</button>
              <button onClick={onSelectProject} className="w-full text-primary-600 hover:text-primary-700 text-sm">
                Change Project
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You're not currently working on a project</p>
              <button onClick={onSelectProject} className="btn-primary">
                Choose a Project
              </button>
            </div>
          )}
        </div>

        {/* Learning Path */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary-600" />
            Your Learning Path
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Current Unit</h3>
              <div className="p-3 bg-blue-50 rounded-lg text-blue-900">
                {student.learningPath.currentUnit || 'Getting Started'}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-2">Personal Goals</h3>
              <ul className="space-y-2">
                {student.learningPath.personalizedGoals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-2">Up Next</h3>
              <div className="space-y-2">
                {student.learningPath.nextStandards.slice(0, 3).map((standard, idx) => (
                  <div key={idx} className="text-sm p-2 bg-gray-50 rounded">
                    {standard}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Notecards */}
      {needsReview.length > 0 && (
        <div className="card border-2 border-orange-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Brain className="w-6 h-6 text-orange-600" />
                Notecards Ready for Review
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Review these to strengthen your memory!
              </p>
            </div>
            <button className="btn-primary">Start Review Session</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {needsReview.slice(0, 6).map(notecard => (
              <div key={notecard.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm font-medium text-orange-900">
                  {new Date(notecard.date).toLocaleDateString()}
                </p>
                <p className="text-xs text-orange-700 mt-1 line-clamp-2">
                  {notecard.frontSide.content}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 bg-orange-200 rounded-full h-1.5">
                    <div
                      className="bg-orange-600 h-1.5 rounded-full"
                      style={{ width: `${(notecard.masteryLevel / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-orange-600 font-medium">
                    {notecard.masteryLevel}/5
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Chart */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary-600" />
          Your Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Standards in Progress</h3>
            <div className="space-y-2">
              {student.inProgressStandards.map((standard, idx) => (
                <div key={idx} className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">{standard}</p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Recently Mastered</h3>
            <div className="space-y-2">
              {student.masteredStandards.slice(-5).map((standard, idx) => (
                <div key={idx} className="p-3 bg-green-50 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-medium text-green-900">{standard}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate streak
function calculateStreak(notecards: DailyNotecard[]): number {
  if (notecards.length === 0) return 0;

  const sortedCards = [...notecards]
    .filter(nc => nc.status === 'submitted')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const card of sortedCards) {
    const cardDate = new Date(card.date);
    cardDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (currentDate.getTime() - cardDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === streak) {
      streak++;
    } else if (diffDays > streak) {
      break;
    }
  }

  return streak;
}

export default StudentDashboard;
