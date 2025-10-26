import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  Book,
  FileText,
  Target,
  Brain,
  Settings,
  ChevronDown,
  ChevronUp,
  Search
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'getting-started' | 'notecards' | 'projects' | 'review' | 'technical';
}

const faqs: FAQItem[] = [
  // Getting Started
  {
    category: 'getting-started',
    question: 'How do I create my first notecard?',
    answer: 'Click "Create Today\'s Notecard" on your dashboard. You\'ll see a prompt to guide you. Draw or write on the front side (visual), then flip to the back side (written explanation). Don\'t worry about being perfect - just show your thinking!'
  },
  {
    category: 'getting-started',
    question: 'Do I need to create a notecard every single day?',
    answer: 'Yes, on days when you have science class. This daily practice builds your understanding and memory. Each notecard is like a building block in your science knowledge!'
  },
  {
    category: 'getting-started',
    question: 'What if I don\'t understand the prompt?',
    answer: 'Click the "Show Help" button to see sentence starters and hints. You can also ask your teacher or look at example notecards in the gallery. Remember: asking questions is part of being a scientist!'
  },

  // Notecards
  {
    category: 'notecards',
    question: 'What should I put on the front vs. back of my notecard?',
    answer: 'Front (blank side): Visuals like diagrams, sketches, graphs, data tables, or models. Back (lined side): Written explanations, reasoning, evidence, or reflections. Think of front as "show" and back as "explain."'
  },
  {
    category: 'notecards',
    question: 'How long should my notecard take?',
    answer: 'About 10 minutes. Don\'t overthink it! Your notecard should capture what you learned today. It\'s better to create a thoughtful card in 10 minutes than a rushed one or one that takes an hour.'
  },
  {
    category: 'notecards',
    question: 'Can I use my phone to take pictures for my notecard?',
    answer: 'Yes! You can photograph your experiments, observations, or even hand-drawn diagrams and include them on the front side of your digital notecard. Just make sure to add labels and explanations.'
  },
  {
    category: 'notecards',
    question: 'What if I make a mistake?',
    answer: 'Mistakes are part of learning! You can save your notecard as a draft and come back to it. Or, cross out and correct on your physical card. Scientists revise their thinking all the time!'
  },
  {
    category: 'notecards',
    question: 'What are the NGSS tags (CCC and SEP)?',
    answer: 'CCC = Crosscutting Concepts (big ideas that connect all of science, like patterns or cause-effect). SEP = Science & Engineering Practices (what scientists DO, like analyzing data or making models). Click on tags to see friendly explanations!'
  },

  // Projects
  {
    category: 'projects',
    question: 'How do I choose a project?',
    answer: 'Browse the project gallery and read the driving questions. Pick one that interests YOU! You can consider: What problems excite you? What do you want to learn more about? What connects to your life?'
  },
  {
    category: 'projects',
    question: 'Can I switch projects if I don\'t like mine?',
    answer: 'Talk to your teacher first. Usually it\'s best to finish what you started, but if you\'re really struggling or not engaged, your teacher may let you switch. Finishing projects builds important skills!'
  },
  {
    category: 'projects',
    question: 'What if I finish my project early?',
    answer: 'Great! You can: 1) Go deeper with extension activities, 2) Help classmates, 3) Start a new project, or 4) Create your own investigation. Ask your teacher what they recommend.'
  },
  {
    category: 'projects',
    question: 'Where do I find materials for my project?',
    answer: 'Check the materials list for your project. Most use everyday items or things your teacher provides. If you need something special, ask your teacher - they may have alternatives or can help you find it.'
  },

  // Review
  {
    category: 'review',
    question: 'What is spaced repetition review?',
    answer: 'It\'s a smart way to strengthen your memory! The app reminds you to review old notecards at the perfect time - not too soon, not too late. Each time you review, your brain makes the memory stronger.'
  },
  {
    category: 'review',
    question: 'How do I rate my recall (Easy/Medium/Hard)?',
    answer: 'Be honest! Easy = remembered right away. Medium = took some thinking but got it. Hard = struggled or didn\'t remember well. This helps the app schedule your next review at the right time.'
  },
  {
    category: 'review',
    question: 'Do I have to review all my old notecards?',
    answer: 'No! The app only shows you cards that are due for review - usually 5-10 at a time. It\'s quick! Regular short reviews are better than one long cramming session.'
  },

  // Technical
  {
    category: 'technical',
    question: 'Can I use this on my phone?',
    answer: 'Yes! SciHub works on phones, tablets, and Chromebooks. The layout adjusts to your screen size. For the best experience creating notecards, we recommend a tablet or Chromebook.'
  },
  {
    category: 'technical',
    question: 'What if I lose my physical notecard?',
    answer: 'That\'s why we enter notecards digitally too! Your digital copy is saved. But try to keep your physical cards safe - they\'re helpful for studying and reviewing.'
  },
  {
    category: 'technical',
    question: 'Does this work without internet?',
    answer: 'The app works best with internet, but once loaded, you can create and save notecards offline. They\'ll sync when you\'re back online. Note: Some features need internet (like loading new projects).'
  },
  {
    category: 'technical',
    question: 'How do I save my work?',
    answer: 'The app auto-saves your work every few seconds! You\'ll see a small "Saved" indicator. You can also click "Save Draft" to save and come back later, or "Submit" when finished.'
  },
  {
    category: 'technical',
    question: 'I found a bug or something isn\'t working. What do I do?',
    answer: 'Tell your teacher! They can report technical issues. Try refreshing the page first - that fixes many problems. Make sure you\'re using an updated browser (Chrome works best on Chromebooks).'
  }
];

const categories = [
  { id: 'getting-started', label: 'Getting Started', icon: <Book className="w-4 h-4" /> },
  { id: 'notecards', label: 'Notecards', icon: <FileText className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects', icon: <Target className="w-4 h-4" /> },
  { id: 'review', label: 'Review', icon: <Brain className="w-4 h-4" /> },
  { id: 'technical', label: 'Technical', icon: <Settings className="w-4 h-4" /> }
];

interface HelpSystemProps {
  onClose: () => void;
}

const HelpSystem: React.FC<HelpSystemProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    const matchesSearch = !searchTerm ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      role="dialog"
      aria-labelledby="help-title"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full p-8 my-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pb-4 border-b">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-primary-600" />
            <div>
              <h2 id="help-title" className="text-2xl font-bold text-gray-900">
                Help & Support
              </h2>
              <p className="text-sm text-gray-600">
                Find answers to common questions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close help"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Topics
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No results found. Try different keywords!</p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 py-3 bg-white text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still need help */}
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Still need help?</h3>
          <p className="text-sm text-gray-700 mb-4">
            Talk to your teacher - they're here to support you!
          </p>
          <p className="text-xs text-gray-600">
            Remember: Asking questions is what scientists do! 🔬
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpSystem;
