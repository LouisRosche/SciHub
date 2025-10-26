import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Book,
  FileText,
  Target,
  Brain,
  Heart,
  Sparkles
} from 'lucide-react';

interface OnboardingTutorialProps {
  userType: 'student' | 'teacher';
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({
  userType,
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const studentSteps = [
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: 'Welcome to SciHub!',
      description: 'A place where YOUR science thinking matters every single day.',
      details: [
        'You\'ll create one notecard per day',
        'Choose projects that interest YOU',
        'Learn at your own pace',
        'See your progress grow over time'
      ],
      encouragement: 'We believe in you! 🌟'
    },
    {
      icon: <FileText className="w-12 h-12 text-primary-600" />,
      title: 'Your Daily Notecard',
      description: 'Every day, you\'ll create ONE meaningful notecard.',
      details: [
        'Front side: Draw, sketch, or create visuals',
        'Back side: Write your explanation',
        'Takes about 10 minutes',
        'Shows YOUR scientific thinking'
      ],
      encouragement: 'This is YOUR science story!'
    },
    {
      icon: <Book className="w-12 h-12 text-green-600" />,
      title: 'Choose Your Project',
      description: 'Pick projects that connect to YOUR interests.',
      details: [
        '8 different projects to choose from',
        'Real-world problems to solve',
        'Make choices within each project',
        'Switch projects when you finish'
      ],
      encouragement: 'Your curiosity leads the way!'
    },
    {
      icon: <Target className="w-12 h-12 text-orange-600" />,
      title: 'Track Your Progress',
      description: 'Watch yourself grow as a scientist!',
      details: [
        'Build daily streaks',
        'Master science standards',
        'See what you\'ve learned',
        'Earn achievements'
      ],
      encouragement: 'Every card makes you stronger! 💪'
    },
    {
      icon: <Brain className="w-12 h-12 text-purple-600" />,
      title: 'Review & Remember',
      description: 'The app helps you remember what you learn.',
      details: [
        'Review old cards to strengthen memory',
        'The app reminds you when to review',
        'Get better at recalling information',
        'Build long-term understanding'
      ],
      encouragement: 'You\'re training your science brain!'
    },
    {
      icon: <Sparkles className="w-12 h-12 text-yellow-600" />,
      title: 'You\'re Ready!',
      description: 'Time to start your science journey.',
      details: [
        'Be yourself - there\'s no "perfect" notecard',
        'Ask for help when you need it',
        'Celebrate your progress',
        'Enjoy discovering science!'
      ],
      encouragement: 'We can\'t wait to see what you create! 🚀'
    }
  ];

  const teacherSteps = [
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: 'Welcome to SciHub!',
      description: 'A system that puts student thinking at the center.',
      details: [
        'Daily notecard submissions',
        'NGSS-aligned projects',
        'Streamlined feedback workflow',
        'Real-time progress tracking'
      ],
      encouragement: 'Transform your classroom! 🌟'
    },
    {
      icon: <FileText className="w-12 h-12 text-primary-600" />,
      title: 'Daily Notecard System',
      description: 'Students create one meaningful notecard per day.',
      details: [
        'Front: Visual thinking (diagrams, data, sketches)',
        'Back: Written explanation with evidence',
        'NGSS 3D alignment built in',
        'Physical card + digital entry'
      ],
      encouragement: 'Authentic formative assessment!'
    },
    {
      icon: <Book className="w-12 h-12 text-green-600" />,
      title: 'Project-Based Learning',
      description: '8 comprehensive projects with student choice.',
      details: [
        'Driving questions and real-world context',
        'Daily prompts aligned to project days',
        'Student personalization options',
        '2-4 week durations'
      ],
      encouragement: 'Engagement through relevance!'
    },
    {
      icon: <Target className="w-12 h-12 text-orange-600" />,
      title: 'Your Review Workflow',
      description: 'Streamlined feedback without overwhelming you.',
      details: [
        'You DON\'T have to review all 30 cards deeply daily',
        'Focus on 5-7 students per day for detailed feedback',
        'Quick scan all cards for completion',
        'Dashboard highlights who needs support'
      ],
      encouragement: 'Sustainable teaching! 💚'
    },
    {
      icon: <Brain className="w-12 h-12 text-purple-600" />,
      title: 'Progress Tracking',
      description: 'See growth across individuals and the class.',
      details: [
        'NGSS standards mastery tracking',
        'Streak and engagement metrics',
        'Identify students needing support',
        'Export data for grading'
      ],
      encouragement: 'Data-informed teaching!'
    },
    {
      icon: <Sparkles className="w-12 h-12 text-yellow-600" />,
      title: 'You\'re Ready!',
      description: 'Start with Week 1 in the Teacher Guide.',
      details: [
        'Print notecard templates',
        'Introduce system to students',
        'Launch first project',
        'Build the daily routine'
      ],
      encouragement: 'You\'ve got this! 🚀'
    }
  ];

  const steps = userType === 'student' ? studentSteps : teacherSteps;
  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-labelledby="onboarding-title"
      aria-describedby="onboarding-description"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl">
        {/* Skip button */}
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Skip tutorial"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress indicator */}
        <div className="flex gap-2 mb-6">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-2 rounded-full transition-colors ${
                idx <= currentStep ? 'bg-primary-600' : 'bg-gray-200'
              }`}
              role="progressbar"
              aria-valuenow={((currentStep + 1) / steps.length) * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          {step.icon}
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 id="onboarding-title" className="text-3xl font-bold text-gray-900 mb-3">
            {step.title}
          </h2>
          <p id="onboarding-description" className="text-lg text-gray-700 mb-4">
            {step.description}
          </p>
        </div>

        {/* Details */}
        <ul className="space-y-3 mb-6">
          {step.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-700">
              <span className="text-primary-600 font-bold text-xl">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        {/* Encouragement */}
        <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg p-4 mb-6 text-center">
          <p className="text-lg font-semibold text-gray-900">
            {step.encouragement}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label="Previous step"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <span className="text-sm text-gray-600">
            {currentStep + 1} of {steps.length}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 btn-primary"
            aria-label={currentStep === steps.length - 1 ? 'Complete tutorial' : 'Next step'}
          >
            {currentStep === steps.length - 1 ? "Let's Go!" : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Keyboard hint */}
        <p className="text-xs text-center text-gray-500 mt-4">
          Tip: Use arrow keys to navigate, Escape to skip
        </p>
      </div>
    </div>
  );
};

export default OnboardingTutorial;
