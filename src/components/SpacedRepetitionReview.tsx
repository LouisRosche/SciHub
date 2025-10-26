import React, { useState } from 'react';
import { Brain, ChevronRight, CheckCircle, XCircle, RotateCcw, TrendingUp } from 'lucide-react';
import { DailyNotecard } from '../types/ngss';

interface SpacedRepetitionReviewProps {
  notecards: DailyNotecard[];
  onUpdateMastery: (notecardId: string, newMastery: number, nextReview: Date) => void;
}

const SpacedRepetitionReview: React.FC<SpacedRepetitionReviewProps> = ({
  notecards,
  onUpdateMastery
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const reviewQueue = notecards.filter(nc =>
    nc.nextReviewDate && new Date(nc.nextReviewDate) <= new Date()
  );

  if (reviewQueue.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="card text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">All Caught Up!</h2>
          <p className="text-gray-600 mb-6">
            You don't have any notecards ready for review right now.
          </p>
          <p className="text-sm text-gray-500">
            Keep creating daily notecards to build your knowledge!
          </p>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="card text-center py-12">
          <Brain className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Session Complete!</h2>
          <p className="text-gray-600 mb-6">
            You reviewed {reviewedCount} notecards
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setSessionComplete(false);
                setCurrentIndex(0);
                setShowBack(false);
                setReviewedCount(0);
              }}
              className="btn-primary flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Review Again
            </button>
            <button className="btn-secondary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = reviewQueue[currentIndex];

  const calculateNextReview = (difficulty: 'easy' | 'medium' | 'hard'): Date => {
    const nextReview = new Date();
    const currentMastery = currentCard.masteryLevel;

    // Spaced repetition intervals (in days)
    const intervals = {
      easy: [1, 3, 7, 14, 30, 60],
      medium: [1, 2, 4, 8, 16, 32],
      hard: [1, 1, 2, 3, 5, 8]
    };

    const days = intervals[difficulty][Math.min(currentMastery, 5)] || 1;
    nextReview.setDate(nextReview.getDate() + days);

    return nextReview;
  };

  const handleResponse = (difficulty: 'easy' | 'medium' | 'hard') => {
    let newMastery = currentCard.masteryLevel;

    if (difficulty === 'easy') newMastery = Math.min(5, newMastery + 1);
    else if (difficulty === 'hard') newMastery = Math.max(0, newMastery - 1);

    const nextReview = calculateNextReview(difficulty);
    onUpdateMastery(currentCard.id, newMastery, nextReview);

    setReviewedCount(prev => prev + 1);

    if (currentIndex < reviewQueue.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowBack(false);
    } else {
      setSessionComplete(true);
    }
  };

  const progress = ((currentIndex + 1) / reviewQueue.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Brain className="w-7 h-7 text-primary-600" />
              Spaced Repetition Review
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Review your past notecards to strengthen your memory
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Progress</p>
            <p className="text-2xl font-bold text-primary-600">
              {currentIndex + 1} / {reviewQueue.length}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Notecard Display */}
      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              From: {new Date(currentCard.date).toLocaleDateString()}
            </p>
            {currentCard.projectId && (
              <p className="text-xs text-gray-500">Project: {currentCard.projectId}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Mastery:</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5].map(level => (
                <div
                  key={level}
                  className={`w-2 h-8 rounded-sm ${
                    level < currentCard.masteryLevel
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Notecard */}
        <div
          className="notecard min-h-[400px] cursor-pointer relative overflow-hidden"
          onClick={() => setShowBack(!showBack)}
        >
          <div
            className={`absolute inset-0 p-6 transition-opacity duration-300 ${
              showBack ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                Front Side (Visual)
              </span>
            </div>
            <div className="text-gray-900 whitespace-pre-wrap">
              {currentCard.frontSide.content}
            </div>
          </div>

          <div
            className={`absolute inset-0 p-6 transition-opacity duration-300 notecard-lined ${
              showBack ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Back Side (Written)
              </span>
            </div>
            <div className="text-gray-900 whitespace-pre-wrap" style={{ lineHeight: '1.5rem' }}>
              {currentCard.backSide.content}
            </div>
          </div>

          {/* Flip Indicator */}
          {!showBack && (
            <div className="absolute bottom-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
              Click to flip
            </div>
          )}
        </div>

        {/* NGSS Tags */}
        {(currentCard.ccc || currentCard.sep) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {currentCard.ccc?.map(ccc => (
              <span key={ccc} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                CCC: {ccc}
              </span>
            ))}
            {currentCard.sep?.map(sep => (
              <span key={sep} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                SEP: {sep}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Response Buttons (only show after flipping) */}
      {showBack && (
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">
            How well did you remember this?
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleResponse('hard')}
              className="p-6 rounded-lg border-2 border-red-300 hover:bg-red-50 transition-colors group"
            >
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="font-semibold text-red-900">Hard</p>
              <p className="text-xs text-red-700 mt-1">Didn't remember well</p>
              <p className="text-xs text-red-600 mt-2">Review in 1 day</p>
            </button>

            <button
              onClick={() => handleResponse('medium')}
              className="p-6 rounded-lg border-2 border-yellow-300 hover:bg-yellow-50 transition-colors group"
            >
              <RotateCcw className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="font-semibold text-yellow-900">Medium</p>
              <p className="text-xs text-yellow-700 mt-1">Took some time</p>
              <p className="text-xs text-yellow-600 mt-2">Review in 2-4 days</p>
            </button>

            <button
              onClick={() => handleResponse('easy')}
              className="p-6 rounded-lg border-2 border-green-300 hover:bg-green-50 transition-colors group"
            >
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-900">Easy</p>
              <p className="text-xs text-green-700 mt-1">Remembered easily!</p>
              <p className="text-xs text-green-600 mt-2">Review in 3-7 days</p>
            </button>
          </div>
        </div>
      )}

      {/* Help Text */}
      {!showBack && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Click the notecard to see the answer, then rate how well you remembered it
          </p>
        </div>
      )}
    </div>
  );
};

export default SpacedRepetitionReview;
