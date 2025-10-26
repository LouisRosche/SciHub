import React, { useState } from 'react';
import { X, Lightbulb, Award, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react';

interface ExampleNotecard {
  id: string;
  studentName: string; // Anonymized
  gradeLevel: string;
  project: string;
  frontDescription: string;
  backDescription: string;
  whatMakesItGood: string[];
  level: 'developing' | 'proficient' | 'excellent';
}

const exampleNotecards: ExampleNotecard[] = [
  {
    id: 'ex1',
    studentName: 'Student A (Grade 7)',
    gradeLevel: '7',
    project: 'Water Quality Detective',
    frontDescription: 'Detailed diagram of water testing setup with all equipment labeled. Color-coded arrows show the testing process steps. Small data table in corner shows pH, turbidity, and dissolved oxygen measurements.',
    backDescription: 'Explanation reads: "I tested the water for three things: pH (how acidic), turbidity (how cloudy), and dissolved oxygen (how much air is in it). The pond water had pH 7.2 (neutral), high turbidity from algae, and low oxygen (only 4 mg/L). This is important because fish need at least 5 mg/L to survive. The algae bloom is using up oxygen, which could harm the ecosystem."',
    whatMakesItGood: [
      'Clear, labeled diagram on front',
      'Specific data included',
      'Back explains WHY measurements matter',
      'Connects to real-world impact (fish survival)',
      'Uses scientific vocabulary correctly'
    ],
    level: 'excellent'
  },
  {
    id: 'ex2',
    studentName: 'Student B (Grade 6)',
    gradeLevel: '6',
    project: 'Cell City',
    frontDescription: 'Drawing of a city with buildings, roads, and power plant. Each part is labeled with both city name and cell organelle (e.g., "Power Plant = Mitochondria"). Uses simple sketches but all parts are there.',
    backDescription: 'Explanation reads: "The mitochondria is like a power plant because it makes energy (ATP) for the cell. The cell membrane is like city borders because it controls what goes in and out. The nucleus is like city hall because it has all the instructions (DNA) and controls everything."',
    whatMakesItGood: [
      'Clear analogies between city and cell',
      'Explains function, not just labels',
      'Structure-function connections',
      'Easy to understand',
      'All major organelles included'
    ],
    level: 'proficient'
  },
  {
    id: 'ex3',
    studentName: 'Student C (Grade 8)',
    gradeLevel: '8',
    project: 'Chemistry in the Kitchen',
    frontDescription: 'Before and after molecular diagrams showing baking soda (NaHCO₃) and vinegar (CH₃COOH) reacting. Arrows show atoms rearranging. Bubbles labeled "CO₂ gas".',
    backDescription: 'Explanation reads: "When I mixed baking soda and vinegar, I observed fizzing and the beaker got slightly cold (endothermic). The chemical equation is: NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂. The carbon dioxide gas caused the bubbles. This is a chemical change because new substances formed and you can\'t easily reverse it. I know it\'s chemical because there was gas production, temperature change, and the products are different from reactants."',
    whatMakesItGood: [
      'Molecular models show what happened',
      'Chemical equation included',
      'Multiple types of evidence for chemical change',
      'Explains observation AND reasoning',
      'Uses scientific vocabulary (endothermic, products, reactants)'
    ],
    level: 'excellent'
  },
  {
    id: 'ex4',
    studentName: 'Student D (Grade 6)',
    gradeLevel: '6',
    project: 'Force and Motion in Sports',
    frontDescription: 'Stick figure drawing of basketball shot in 3 stages: before shot, during shot, after release. Force arrows drawn and labeled (push up, gravity down, forward momentum).',
    backDescription: 'Explanation reads: "When I shoot a basketball, I push up and forward. Gravity pulls down the whole time. The ball keeps moving forward (inertia) until it goes in or hits something. The harder I push, the farther it goes. Action-reaction: I push on ball, ball pushes back on my hands."',
    whatMakesItGood: [
      'Shows motion in stages',
      'Force arrows labeled',
      'Identifies multiple forces',
      'Connects to Newton\'s laws (inertia, action-reaction)',
      'Based on personal observation'
    ],
    level: 'proficient'
  },
  {
    id: 'ex5',
    studentName: 'Student E (Grade 7)',
    gradeLevel: '7',
    project: 'Ecosystem Engineer',
    frontDescription: 'Food web diagram with arrows showing energy flow. Includes sun → grass → cricket → spider → bird. Also shows decomposers (bacteria) connected to all levels. Numbers show energy loss (100%, 10%, 1%, 0.1%).',
    backDescription: 'Explanation reads: "Energy flows through my ecosystem starting with the sun. Plants capture 100% as the base. Only about 10% of energy transfers to each next level because organisms use most energy for life processes (moving, growing, staying warm). That\'s why there are fewer predators than prey - not enough energy to support more. Decomposers are important because they recycle nutrients back to soil for plants."',
    whatMakesItGood: [
      'Complete food web with all trophic levels',
      'Energy values quantified',
      'Explains energy loss with reasoning',
      'Includes decomposers (often forgotten)',
      'Connects structure to ecosystem stability'
    ],
    level: 'excellent'
  }
];

interface ExampleGalleryProps {
  onClose: () => void;
}

const ExampleGallery: React.FC<ExampleGalleryProps> = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const example = exampleNotecards[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % exampleNotecards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + exampleNotecards.length) % exampleNotecards.length);
  };

  const levelColors = {
    developing: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    proficient: 'bg-blue-100 text-blue-800 border-blue-300',
    excellent: 'bg-green-100 text-green-800 border-green-300'
  };

  const levelIcons = {
    developing: <Lightbulb className="w-5 h-5" />,
    proficient: <ThumbsUp className="w-5 h-5" />,
    excellent: <Award className="w-5 h-5" />
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      role="dialog"
      aria-labelledby="gallery-title"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full p-8 my-8 relative shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 id="gallery-title" className="text-2xl font-bold text-gray-900">
              Example Notecards
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              See what makes a strong notecard
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Level badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`px-3 py-1 rounded-full border-2 flex items-center gap-2 ${levelColors[example.level]}`}>
            {levelIcons[example.level]}
            <span className="font-semibold capitalize">{example.level}</span>
          </div>
          <span className="text-sm text-gray-600">
            {example.studentName} • {example.project}
          </span>
        </div>

        {/* Notecard simulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Front */}
          <div className="notecard p-6 bg-white">
            <div className="text-center mb-3">
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                Front (Visual)
              </span>
            </div>
            <div className="text-sm text-gray-700 italic bg-gray-50 p-4 rounded">
              {example.frontDescription}
            </div>
          </div>

          {/* Back */}
          <div className="notecard notecard-lined p-6 bg-white">
            <div className="text-center mb-3">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Back (Written)
              </span>
            </div>
            <div className="text-sm text-gray-700 italic bg-gray-50 p-4 rounded">
              "{example.backDescription}"
            </div>
          </div>
        </div>

        {/* What makes it good */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-green-600" />
            What Makes This Notecard Strong:
          </h3>
          <ul className="space-y-2">
            {example.whatMakesItGood.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-600 font-bold">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 btn-secondary"
            aria-label="Previous example"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <span className="text-sm text-gray-600">
            {currentIndex + 1} of {exampleNotecards.length}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 btn-secondary"
            aria-label="Next example"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Encouragement */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            💡 <strong>Remember:</strong> These are just examples. Your notecard should reflect YOUR thinking and YOUR learning. Be yourself!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExampleGallery;
