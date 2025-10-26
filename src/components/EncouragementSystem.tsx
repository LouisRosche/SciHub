import React, { useEffect, useState } from 'react';
import { Sparkles, Award, Flame, TrendingUp, Heart, Star, Zap } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  message: string;
  icon: React.ReactNode;
  color: string;
}

const achievements: Record<string, Achievement> = {
  firstCard: {
    id: 'firstCard',
    title: 'First Steps!',
    message: 'You created your first notecard! Every scientist starts somewhere. Keep going!',
    icon: <Sparkles className="w-12 h-12" />,
    color: 'from-blue-400 to-blue-600'
  },
  streak5: {
    id: 'streak5',
    title: '5-Day Streak!',
    message: 'You\'ve submitted notecards for 5 days in a row. Consistency builds mastery!',
    icon: <Flame className="w-12 h-12" />,
    color: 'from-orange-400 to-red-600'
  },
  streak10: {
    id: 'streak10',
    title: '10-Day Streak!',
    message: 'Double digits! Your dedication to daily practice is paying off!',
    icon: <Flame className="w-12 h-12" />,
    color: 'from-orange-500 to-red-700'
  },
  streak20: {
    id: 'streak20',
    title: '20-Day Streak!',
    message: 'Incredible! You\'ve built a powerful learning habit. You\'re unstoppable!',
    icon: <Flame className="w-12 h-12" />,
    color: 'from-red-500 to-pink-700'
  },
  firstStandard: {
    id: 'firstStandard',
    title: 'Standard Mastered!',
    message: 'You\'ve mastered your first NGSS standard! Your understanding is growing!',
    icon: <Award className="w-12 h-12" />,
    color: 'from-green-400 to-green-600'
  },
  projectComplete: {
    id: 'projectComplete',
    title: 'Project Complete!',
    message: 'You finished an entire project! That takes dedication and scientific thinking!',
    icon: <Award className="w-12 h-12" />,
    color: 'from-purple-400 to-purple-600'
  },
  review10: {
    id: 'review10',
    title: 'Review Champion!',
    message: 'You\'ve reviewed 10 notecards! You\'re building long-term memory like a pro!',
    icon: <Brain className="w-12 h-12" />,
    color: 'from-indigo-400 to-indigo-600'
  },
  allCCC: {
    id: 'allCCC',
    title: 'CCC Explorer!',
    message: 'You\'ve used all 7 Crosscutting Concepts! You see science connections everywhere!',
    icon: <Star className="w-12 h-12" />,
    color: 'from-yellow-400 to-yellow-600'
  },
  allSEP: {
    id: 'allSEP',
    title: 'Science Practices Master!',
    message: 'You\'ve practiced all 8 Science & Engineering Practices! You think like a scientist!',
    icon: <Zap className="w-12 h-12" />,
    color: 'from-cyan-400 to-cyan-600'
  },
  growthMindset: {
    id: 'growthMindset',
    title: 'Growth Mindset!',
    message: 'You improved a notecard after feedback. That\'s how scientists learn and grow!',
    icon: <TrendingUp className="w-12 h-12" />,
    color: 'from-teal-400 to-teal-600'
  }
};

interface EncouragementSystemProps {
  achievementId: string;
  onClose: () => void;
}

const EncouragementSystem: React.FC<EncouragementSystemProps> = ({
  achievementId,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const achievement = achievements[achievementId];

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 100);

    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!achievement) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
      <div
        className={`transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        } pointer-events-auto`}
      >
        <div className={`bg-gradient-to-br ${achievement.color} text-white rounded-2xl p-8 shadow-2xl max-w-md relative`}>
          {/* Confetti effect */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="mb-4 animate-bounce">
              {achievement.icon}
            </div>

            <h2 className="text-3xl font-bold mb-3">
              {achievement.title}
            </h2>

            <p className="text-lg mb-6 text-white/90">
              {achievement.message}
            </p>

            <button
              onClick={handleClose}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Keep Going!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Encouragement messages for various contexts
export const encouragementMessages = {
  cardCreation: [
    'Great start! Your thinking is showing through.',
    'Nice work documenting your learning today!',
    'You\'re building your science story, one card at a time!',
    'Love seeing your scientific thinking in action!',
    'This is exactly what scientists do - record and reflect!'
  ],
  reviewCorrect: [
    'Yes! Your memory is getting stronger!',
    'You remembered! Your brain is building connections!',
    'Perfect recall! Spaced repetition is working!',
    'That\'s it! You\'ve got this concept down!',
    'Excellent! This knowledge is sticking with you!'
  ],
  reviewStruggle: [
    'It\'s okay! This is how learning works - keep reviewing!',
    'Struggle is part of the process. You\'re building understanding!',
    'No worries! Reviewing again will strengthen this memory!',
    'That\'s why we review - to turn hard things into easy things!',
    'Each review makes it easier. You\'ve got this!'
  ],
  projectStart: [
    'Excited to see where this project takes you!',
    'Great choice! Let your curiosity guide you!',
    'This project is going to be amazing!',
    'Ready to discover something new? Let\'s go!',
    'Your science journey starts here!'
  ],
  comeback: [
    'Welcome back! Ready to learn today?',
    'Good to see you! Let\'s make today count!',
    'You\'re here - that\'s what matters!',
    'Another day, another chance to grow!',
    'Let\'s discover something awesome today!'
  ]
};

export const getRandomEncouragement = (category: keyof typeof encouragementMessages): string => {
  const messages = encouragementMessages[category];
  return messages[Math.floor(Math.random() * messages.length)];
};

// Component for inline encouragement
export const InlineEncouragement: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
      <Heart className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-gray-700 font-medium">{message}</p>
    </div>
  );
};

export default EncouragementSystem;
