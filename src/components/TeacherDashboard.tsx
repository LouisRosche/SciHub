import React, { useState } from 'react';
import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Star,
  MessageSquare,
  Filter,
  Download,
  TrendingUp,
  Award,
  AlertCircle
} from 'lucide-react';
import { DailyNotecard, Student } from '../types/ngss';

interface TeacherDashboardProps {
  students: Student[];
  allNotecards: DailyNotecard[];
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  students,
  allNotecards
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'submitted' | 'pending' | 'reviewed'>('all');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const today = new Date().toDateString();
  const todayNotecards = allNotecards.filter(
    nc => new Date(nc.date).toDateString() === today
  );

  const submittedToday = todayNotecards.filter(nc => nc.status === 'submitted');
  const reviewedToday = todayNotecards.filter(nc => nc.status === 'reviewed');
  const pendingReview = submittedToday.filter(nc => !nc.teacherFeedback);

  const filteredNotecards = todayNotecards.filter(nc => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'submitted') return nc.status === 'submitted';
    if (filterStatus === 'pending') return nc.status === 'submitted' && !nc.teacherFeedback;
    if (filterStatus === 'reviewed') return nc.teacherFeedback;
    return true;
  });

  const handleProvideFeedback = (notecardId: string) => {
    // In real app, this would update the notecard with feedback
    console.log('Providing feedback for notecard:', notecardId, feedbackText);
    setFeedbackText('');
    setSelectedStudent(null);
  };

  const handleStarNotecard = (notecardId: string) => {
    // Toggle starred status
    console.log('Starring notecard:', notecardId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Review daily notecards and track student progress
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm">Total Students</p>
              <p className="text-3xl font-bold mt-1">{students.length}</p>
            </div>
            <Users className="w-12 h-12 text-primary-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Submitted Today</p>
              <p className="text-3xl font-bold mt-1">{submittedToday.length}</p>
              <p className="text-green-100 text-xs mt-1">
                {Math.round((submittedToday.length / students.length) * 100)}% of class
              </p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Pending Review</p>
              <p className="text-3xl font-bold mt-1">{pendingReview.length}</p>
            </div>
            <Clock className="w-12 h-12 text-orange-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Reviewed Today</p>
              <p className="text-3xl font-bold mt-1">{reviewedToday.length}</p>
            </div>
            <Star className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="input-field"
              >
                <option value="all">All Notecards</option>
                <option value="submitted">Submitted</option>
                <option value="pending">Pending Review</option>
                <option value="reviewed">Reviewed</option>
              </select>
            </div>
          </div>

          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Notecard Review Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Daily Notecards - {new Date(selectedDate).toLocaleDateString()}
          </h2>
          <span className="text-sm text-gray-600">
            {filteredNotecards.length} notecards
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNotecards.map((notecard) => {
            const student = students.find(s => s.id === notecard.studentId);
            return (
              <div key={notecard.id} className="card border-2 hover:border-primary-300 transition-colors">
                {/* Student Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-700 font-semibold">
                        {student?.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{student?.name}</h3>
                      <p className="text-xs text-gray-600">Grade {student?.gradeLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {notecard.teacherFeedback && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Reviewed
                      </span>
                    )}
                    <button
                      onClick={() => handleStarNotecard(notecard.id)}
                      className={`${notecard.status === 'starred' ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
                    >
                      <Star className="w-5 h-5" fill={notecard.status === 'starred' ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                {/* NGSS Alignment */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {notecard.ccc?.map(ccc => (
                    <span key={ccc} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      CCC: {ccc}
                    </span>
                  ))}
                  {notecard.sep?.map(sep => (
                    <span key={sep} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      SEP: {sep}
                    </span>
                  ))}
                </div>

                {/* Notecard Content */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Front (Visual)</p>
                    <p className="text-sm text-gray-900 line-clamp-4">
                      {notecard.frontSide.content}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Back (Written)</p>
                    <p className="text-sm text-gray-900 line-clamp-4">
                      {notecard.backSide.content}
                    </p>
                  </div>
                </div>

                {/* Self-Assessment */}
                {notecard.selfAssessment && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs font-medium text-blue-900 mb-1">Student Self-Assessment</p>
                    <p className="text-sm text-blue-800">{notecard.selfAssessment}</p>
                  </div>
                )}

                {/* Teacher Feedback */}
                {notecard.teacherFeedback ? (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs font-medium text-green-900 mb-1">Your Feedback</p>
                    <p className="text-sm text-green-800">{notecard.teacherFeedback}</p>
                  </div>
                ) : (
                  <div>
                    {selectedStudent === notecard.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="Provide constructive feedback..."
                          className="input-field h-24 resize-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleProvideFeedback(notecard.id)}
                            className="btn-primary flex-1"
                          >
                            Submit Feedback
                          </button>
                          <button
                            onClick={() => setSelectedStudent(null)}
                            className="btn-secondary"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedStudent(notecard.id)}
                        className="w-full btn-secondary flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Add Feedback
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredNotecards.length === 0 && (
          <div className="card text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notecards found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later
            </p>
          </div>
        )}
      </div>

      {/* Student Progress Summary */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary-600" />
          Class Progress Summary
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Student</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Streak</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">This Week</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Mastered</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Current Project</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => {
                const studentCards = allNotecards.filter(nc => nc.studentId === student.id);
                const thisWeek = studentCards.filter(nc => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(nc.date) >= weekAgo;
                });

                return (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-700 font-semibold text-sm">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        5 days
                      </span>
                    </td>
                    <td className="text-center py-3 px-4 text-gray-900">{thisWeek.length}</td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <Award className="w-4 h-4 text-green-600" />
                        <span className="text-gray-900">{student.masteredStandards.length}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4 text-sm text-gray-600">
                      {student.currentProject || 'None'}
                    </td>
                    <td className="text-center py-3 px-4">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
