import { ProjectTemplate } from '../types/ngss';

export const projectTemplates: ProjectTemplate[] = [
  {
    id: 'water-quality-detective',
    title: 'Water Quality Detective',
    description: 'Investigate water quality in your community and design solutions to improve it. Students personalize by choosing their water source and testing methods.',
    gradeLevel: ['6', '7', '8', 'MS'],
    duration: '3 weeks',
    dci: ['MS-ESS3-1', 'MS-ESS2-1', 'MS-ETS1-1'],
    ccc: ['systems-models', 'cause-effect', 'stability-change'],
    sep: ['asking-questions', 'planning-investigations', 'analyzing-data', 'constructing-explanations'],
    drivingQuestion: 'How can we ensure our community has access to clean water?',
    studentChoices: [
      'Choose water source to study (tap, stream, pond, etc.)',
      'Select which tests to perform',
      'Design type of filtration system',
      'Choose presentation format'
    ],
    dailyNotecardPrompts: [
      'Day 1: Sketch the water source you chose and why it matters to you',
      'Day 2: Draw and label your water testing setup',
      'Day 3: Record water test results in a data table with observations',
      'Day 4: Create a diagram showing what contaminants you found',
      'Day 5: Explain cause-and-effect: what causes water pollution in your source?',
      'Day 6: Draw your filtration system design with labels',
      'Day 7: Sketch the water cycle and mark where your source fits',
      'Day 8: Test results: create a before/after comparison chart',
      'Day 9: Explain how one part of your filter works (structure-function)',
      'Day 10: Reflect: What surprised you most about your investigation?',
      'Day 11: Model: Draw how pollution moves through water systems',
      'Day 12: Design improvement: sketch your filter version 2.0',
      'Day 13: Compare your results to classmate data - what patterns?',
      'Day 14: Create an infographic about water quality for your community',
      'Day 15: Final reflection: How did your thinking about water change?'
    ],
    assessmentCriteria: [
      'Daily notecard quality and NGSS alignment',
      'Use of all three NGSS dimensions',
      'Quality of investigation and data collection',
      'Effectiveness of designed solution',
      'Communication of findings'
    ],
    materials: [
      'Water testing kits or homemade indicators',
      'Filtration materials (sand, gravel, charcoal, coffee filters)',
      'Sample collection containers',
      'Chromebook for research and documentation'
    ],
    chromebookActivities: [
      'Research local water sources and issues',
      'Use online water quality databases',
      'Document findings with photos/videos',
      'Create digital presentations',
      'Collaborate on shared data analysis'
    ],
    notecardActivities: [
      'Sketch observation diagrams',
      'Record daily data and measurements',
      'Draw system models and designs',
      'Write explanations using evidence',
      'Create visual comparisons'
    ]
  },
  {
    id: 'ecosystem-engineer',
    title: 'Ecosystem Engineer',
    description: 'Design and build a functioning ecosystem in a bottle. Students personalize by choosing their ecosystem type and organisms.',
    gradeLevel: ['6', '7', '8', 'MS'],
    duration: '4 weeks',
    dci: ['MS-LS2-1', 'MS-LS1-2', 'MS-ETS1-1'],
    ccc: ['systems-models', 'energy-matter', 'stability-change'],
    sep: ['developing-models', 'planning-investigations', 'analyzing-data', 'constructing-explanations'],
    drivingQuestion: 'What does an ecosystem need to survive and thrive?',
    studentChoices: [
      'Choose ecosystem type (aquatic, terrestrial, combination)',
      'Select organisms to include',
      'Design size and structure',
      'Decide on variables to track'
    ],
    dailyNotecardPrompts: [
      'Day 1: Sketch your ecosystem plan with all components labeled',
      'Day 2: Draw a food web for your planned ecosystem',
      'Day 3: Explain why you chose each organism (structure-function)',
      'Day 4: Create an energy flow diagram for your system',
      'Day 5: Record Day 1 observations after building',
      'Day 6: Sketch what changed in 24 hours and explain why',
      'Day 7: Draw the water cycle happening in your bottle',
      'Day 8: Population count: make a data table of organisms',
      'Day 9: Explain a cause-effect relationship you observed',
      'Day 10: What patterns do you notice after one week?',
      'Day 11: Draw organism interactions you\'ve observed',
      'Day 12: Model: How is matter cycling in your ecosystem?',
      'Day 13: What\'s stable? What\'s changing? Why?',
      'Day 14: Compare your ecosystem to a classmate\'s',
      'Day 15: Problem-solve: What would you change and why?',
      'Day 16: Predict what will happen in the next week',
      'Day 17: Test your prediction - were you right?',
      'Day 18: Sketch the limiting factors in your system',
      'Day 19: Design an improvement to increase stability',
      'Day 20: Final diagram: Map all connections in your ecosystem'
    ],
    assessmentCriteria: [
      'Daily notecard documentation',
      'Ecosystem functionality and survival',
      'Understanding of energy flow and matter cycling',
      'Application of systems thinking',
      'Ability to explain changes over time'
    ],
    materials: [
      'Large clear bottles or jars',
      'Soil, sand, rocks',
      'Plants (seeds or small plants)',
      'Small organisms (isopods, worms, etc.)',
      'Water',
      'Chromebook for research and photo documentation'
    ],
    chromebookActivities: [
      'Research ecosystem requirements',
      'Time-lapse photo documentation',
      'Digital population tracking',
      'Collaborative data sharing',
      'Create ecosystem guides'
    ],
    notecardActivities: [
      'Daily observation sketches',
      'Food web and energy diagrams',
      'Data tables and graphs',
      'Explanation writing',
      'Design iterations'
    ]
  },
  {
    id: 'chemistry-kitchen',
    title: 'Chemistry in the Kitchen',
    description: 'Investigate chemical reactions using kitchen ingredients, then design your own reactions. Students choose which reactions to explore.',
    gradeLevel: ['7', '8', 'MS'],
    duration: '2 weeks',
    dci: ['MS-PS1-2', 'MS-PS1-1', 'MS-ETS1-1'],
    ccc: ['patterns', 'cause-effect', 'energy-matter'],
    sep: ['planning-investigations', 'analyzing-data', 'constructing-explanations'],
    drivingQuestion: 'How can we use chemistry to create something new and useful?',
    studentChoices: [
      'Choose reactions to investigate',
      'Select final product to create',
      'Design own investigation',
      'Choose how to present findings'
    ],
    dailyNotecardPrompts: [
      'Day 1: List questions you have about chemical reactions',
      'Day 2: Draw before/after molecular models for a reaction',
      'Day 3: Record observations: what evidence of chemical change?',
      'Day 4: Create a data table comparing different reaction rates',
      'Day 5: Explain what causes the reaction you observed',
      'Day 6: Sketch your experimental setup with variables labeled',
      'Day 7: Graph your reaction rate data and explain the pattern',
      'Day 8: Design your own chemical reaction investigation',
      'Day 9: Record detailed observations with drawings',
      'Day 10: Explain energy changes in your reaction (endo/exothermic)',
      'Day 11: Compare two reactions - similarities and differences',
      'Day 12: Design a useful product using chemical reactions',
      'Day 13: Sketch your product design with ingredients labeled',
      'Day 14: Test results and improvements for next iteration',
      'Day 15: Final recipe card with science explanations'
    ],
    assessmentCriteria: [
      'Quality of daily documentation',
      'Understanding of chemical reactions',
      'Controlled experimentation',
      'Evidence-based explanations',
      'Creative application of concepts'
    ],
    materials: [
      'Kitchen ingredients (baking soda, vinegar, yeast, etc.)',
      'Measuring tools',
      'Containers and mixing tools',
      'Thermometers',
      'Chromebook for research and documentation'
    ],
    chromebookActivities: [
      'Research chemical reactions',
      'Find reaction recipes online',
      'Document experiments with photos',
      'Create how-to videos',
      'Share findings with class database'
    ],
    notecardActivities: [
      'Molecular diagrams',
      'Observation records',
      'Data tables and graphs',
      'Recipe cards with explanations',
      'Before/after sketches'
    ]
  },
  {
    id: 'renewable-energy-challenge',
    title: 'Renewable Energy Challenge',
    description: 'Design and build a device that captures renewable energy. Students choose their energy source and design.',
    gradeLevel: ['6', '7', '8', 'MS'],
    duration: '3 weeks',
    dci: ['MS-PS3-1', 'MS-ESS3-1', 'MS-ETS1-1'],
    ccc: ['energy-matter', 'systems-models', 'cause-effect'],
    sep: ['asking-questions', 'developing-models', 'constructing-explanations'],
    drivingQuestion: 'How can we harness renewable energy to solve a real problem?',
    studentChoices: [
      'Choose energy source (solar, wind, water, etc.)',
      'Select problem to solve',
      'Design own device',
      'Choose testing methods'
    ],
    dailyNotecardPrompts: [
      'Day 1: What energy problem will you solve? Why does it matter?',
      'Day 2: Draw energy transformations in your chosen source',
      'Day 3: Research notes: How does your energy source work?',
      'Day 4: Sketch initial design ideas (at least 3)',
      'Day 5: Label your chosen design with all parts and functions',
      'Day 6: Explain how energy transforms in your device',
      'Day 7: Materials list with justification for each choice',
      'Day 8: Day 1 build progress with photos/sketches',
      'Day 9: Problem encountered and how you solved it',
      'Day 10: Testing setup diagram with measurement plan',
      'Day 11: Data table from first tests',
      'Day 12: Graph energy output over time or conditions',
      'Day 13: Explain cause-effect: what affects energy output?',
      'Day 14: Design modifications based on data',
      'Day 15: Compare efficiency to other energy sources',
      'Day 16: System diagram showing energy inputs and outputs',
      'Day 17: Calculate: How much energy did you capture?',
      'Day 18: Real-world application: How could this be scaled up?',
      'Day 19: Evaluate: Pros and cons of your energy solution',
      'Day 20: Final blueprint with all improvements noted'
    ],
    assessmentCriteria: [
      'Daily notecard progression',
      'Device functionality',
      'Understanding of energy concepts',
      'Use of data to improve design',
      'Real-world applicability'
    ],
    materials: [
      'Solar cells or materials for wind/water turbines',
      'Motors, LEDs, or other outputs',
      'Building materials (cardboard, wood, etc.)',
      'Multimeters or measurement tools',
      'Chromebook for research and CAD'
    ],
    chromebookActivities: [
      'Research renewable energy technologies',
      'Use online calculators for energy',
      'CAD or digital design tools',
      'Document testing with videos',
      'Create infographics about findings'
    ],
    notecardActivities: [
      'Design sketches and blueprints',
      'Energy transformation diagrams',
      'Test data and graphs',
      'Problem-solving documentation',
      'Comparison charts'
    ]
  },
  {
    id: 'genetic-traits-explorer',
    title: 'Genetic Traits Explorer',
    description: 'Investigate heredity by tracking traits in fast-growing organisms and your own family. Students personalize by choosing traits to study.',
    gradeLevel: ['7', '8', 'MS'],
    duration: '4 weeks',
    dci: ['MS-LS3-1', 'MS-LS4-1'],
    ccc: ['patterns', 'cause-effect', 'scale-proportion-quantity'],
    sep: ['analyzing-data', 'using-mathematics', 'constructing-explanations'],
    drivingQuestion: 'How do traits pass from parents to offspring, and why is there variation?',
    studentChoices: [
      'Choose traits to investigate',
      'Select organism to study (fast plants, fruit flies, etc.)',
      'Design family tree format',
      'Choose data visualization method'
    ],
    dailyNotecardPrompts: [
      'Day 1: List traits you share with family members',
      'Day 2: Create your family pedigree for one trait',
      'Day 3: Sketch the organism you\'ll study and highlight traits',
      'Day 4: Draw a model showing how traits are inherited',
      'Day 5: Set up Punnett square for your cross',
      'Day 6: Predict offspring ratios and explain your reasoning',
      'Day 7: First observations - record all trait variations seen',
      'Day 8: Count and categorize offspring - data table',
      'Day 9: Calculate actual ratios and compare to predictions',
      'Day 10: Explain why results might differ from predictions',
      'Day 11: Pattern analysis: What do you notice in the data?',
      'Day 12: Draw chromosomes showing gene locations',
      'Day 13: Second generation observations begin',
      'Day 14: Compare F1 and F2 generations with diagrams',
      'Day 15: Create a graph showing trait distribution',
      'Day 16: Explain genetic variation in your population',
      'Day 17: Connect to evolution: How could these variations matter?',
      'Day 18: Research a genetic condition and create an infographic',
      'Day 19: Design a breeding plan for desired traits',
      'Day 20: Final conclusion: Answer the driving question with evidence'
    ],
    assessmentCriteria: [
      'Accuracy of genetic predictions',
      'Quality of data collection',
      'Mathematical analysis of ratios',
      'Understanding of inheritance patterns',
      'Connection to broader concepts'
    ],
    materials: [
      'Fast-growing organisms (plants, Drosophila, etc.)',
      'Hand lenses or microscopes',
      'Counting tools',
      'Chromebook for research and data analysis'
    ],
    chromebookActivities: [
      'Online Punnett square simulators',
      'Research genetic conditions',
      'Digital data analysis and graphing',
      'Create family tree diagrams',
      'Collaborate on class data pool'
    ],
    notecardActivities: [
      'Punnett squares and predictions',
      'Observation sketches',
      'Data tables and ratios',
      'Pedigree charts',
      'Genetic diagrams'
    ]
  },
  {
    id: 'force-motion-sports',
    title: 'Force and Motion in Sports',
    description: 'Analyze forces and motion in your favorite sport, then design equipment or techniques to improve performance.',
    gradeLevel: ['6', '7', '8', 'MS'],
    duration: '2 weeks',
    dci: ['MS-PS2-1', 'MS-ETS1-1'],
    ccc: ['systems-models', 'cause-effect', 'stability-change'],
    sep: ['developing-models', 'using-mathematics', 'constructing-explanations'],
    drivingQuestion: 'How do forces affect performance in sports, and how can we use this knowledge to improve?',
    studentChoices: [
      'Choose sport or physical activity',
      'Select specific motion to analyze',
      'Design improvement project',
      'Choose measurement methods'
    ],
    dailyNotecardPrompts: [
      'Day 1: Sketch your chosen sport action in 3-5 steps',
      'Day 2: Draw force diagrams for each step (arrows showing forces)',
      'Day 3: Identify action-reaction pairs in your motion',
      'Day 4: Measure and record data from trials',
      'Day 5: Create graphs of your motion data',
      'Day 6: Calculate forces involved using mass and acceleration',
      'Day 7: Explain cause-effect: How do forces create the motion?',
      'Day 8: Compare two techniques - which is more effective? Why?',
      'Day 9: Design an improvement (equipment or technique)',
      'Day 10: Sketch your design with force diagrams',
      'Day 11: Test your improvement - record data',
      'Day 12: Before/after comparison chart',
      'Day 13: Explain the physics behind your improvement',
      'Day 14: Calculate percent improvement with math',
      'Day 15: Final poster: Teach others about forces in your sport'
    ],
    assessmentCriteria: [
      'Accurate force diagrams',
      'Mathematical calculations',
      'Understanding of Newton\'s laws',
      'Design based on scientific principles',
      'Clear communication of concepts'
    ],
    materials: [
      'Sports equipment',
      'Measuring tools (timers, distance measures, scales)',
      'Video recording capability',
      'Chromebook for analysis'
    ],
    chromebookActivities: [
      'Video analysis of motion',
      'Online physics simulators',
      'Graphing and calculation tools',
      'Research sports science',
      'Create instructional videos'
    ],
    notecardActivities: [
      'Force diagrams',
      'Motion sketches',
      'Data tables and graphs',
      'Design blueprints',
      'Calculation work'
    ]
  },
  {
    id: 'cell-city-model',
    title: 'Cell City: Structure and Function',
    description: 'Design a city where each part represents a cell organelle. Students choose their city type and creative representation.',
    gradeLevel: ['6', '7', 'MS'],
    duration: '2 weeks',
    dci: ['MS-LS1-1'],
    ccc: ['structure-function', 'systems-models'],
    sep: ['developing-models', 'constructing-explanations', 'obtaining-information'],
    drivingQuestion: 'How do the parts of a cell work together like parts of a city?',
    studentChoices: [
      'Choose city type (modern, fantasy, historical, etc.)',
      'Select plant or animal cell',
      'Choose medium (drawing, 3D model, digital, etc.)',
      'Design unique analogies for each organelle'
    ],
    dailyNotecardPrompts: [
      'Day 1: Sketch a real city and label important parts',
      'Day 2: Draw a cell and label all organelles',
      'Day 3: Match city parts to organelles - create analogy list',
      'Day 4: Explain structure-function for nucleus/city hall',
      'Day 5: Draw mitochondria and power plant comparison',
      'Day 6: Sketch cell membrane as city border - how does it control?',
      'Day 7: Create endoplasmic reticulum and transport system analogy',
      'Day 8: Draw Golgi apparatus and packaging center comparison',
      'Day 9: Explain chloroplast/solar farm (if plant cell)',
      'Day 10: Map out your complete Cell City design',
      'Day 11: Build progress - photograph and annotate',
      'Day 12: Explain how two organelles work together',
      'Day 13: What happens if one organelle fails? Draw consequences',
      'Day 14: Compare your city to a classmate\'s - creative differences',
      'Day 15: Final annotated diagram or model photos with explanations'
    ],
    assessmentCriteria: [
      'Accuracy of organelle functions',
      'Quality of analogies',
      'Creativity of representation',
      'Understanding of how parts work together',
      'Clear communication'
    ],
    materials: [
      'Art supplies (paper, markers, clay, recyclables, etc.)',
      'Chromebook for research and digital creation',
      'Reference materials'
    ],
    chromebookActivities: [
      'Research cell organelles',
      'Use digital design tools',
      'Find images and videos of cells',
      'Create virtual tours of Cell City',
      'Make comparison presentations'
    ],
    notecardActivities: [
      'Organelle diagrams',
      'Analogy maps',
      'Structure-function charts',
      'City blueprints',
      'Comparison tables'
    ]
  },
  {
    id: 'moon-phases-tracker',
    title: 'Moon Phase Tracker and Predictor',
    description: 'Track moon phases over time and create models to predict future phases. Students personalize observation methods and creative models.',
    gradeLevel: ['6', '7', 'MS'],
    duration: '4 weeks (ongoing observation)',
    dci: ['MS-ESS1-1'],
    ccc: ['patterns', 'scale-proportion-quantity', 'systems-models'],
    sep: ['developing-models', 'analyzing-data', 'using-mathematics'],
    drivingQuestion: 'Can we predict what the moon will look like weeks or months from now?',
    studentChoices: [
      'Choose observation time and method',
      'Select model type (physical, digital, drawing)',
      'Design data recording format',
      'Choose additional phenomena to track (tides, etc.)'
    ],
    dailyNotecardPrompts: [
      'Day 1: Draw tonight\'s moon and describe what you see',
      'Day 2: Sketch the Earth-Moon-Sun system',
      'Day 3: Draw your observation plan - when/where/how',
      'Day 4: Moon observation #2 with date, time, location',
      'Day 5: Compare Days 1 and 4 - what changed?',
      'Day 7: Moon observation #3 - sketch and describe',
      'Day 8: Pattern analysis - what do you predict for tomorrow?',
      'Day 10: Moon observation #4 - was your prediction correct?',
      'Day 11: Create a moon phase diagram showing all 8 phases',
      'Day 14: Moon observation #5 - what phase is it?',
      'Day 15: Calculate how many days between observations',
      'Day 17: Draw a model explaining why phases happen',
      'Day 21: Moon observation #6 - sketch current phase',
      'Day 22: Graph moon illumination over time',
      'Day 24: Predict the next full moon - show your math',
      'Day 28: Moon observation #7 - test your prediction',
      'Day 29: Compare your observations to online moon calendar',
      'Day 30: Create a moon phase calendar for next month',
      'Day 31: Explain how you could predict moon phases a year from now',
      'Day 32: Final reflection: What surprised you about moon patterns?'
    ],
    assessmentCriteria: [
      'Consistency of observations',
      'Pattern identification',
      'Accuracy of predictions',
      'Quality of models',
      'Mathematical reasoning'
    ],
    materials: [
      'Observation log (notecards!)',
      'Optional: telescope or binoculars',
      'Chromebook for research and tools'
    ],
    chromebookActivities: [
      'Use moon phase apps and websites',
      'Research lunar cycles',
      'Create digital models or animations',
      'Access astronomical databases',
      'Photograph the moon (if possible)'
    ],
    notecardActivities: [
      'Daily moon sketches',
      'Phase diagrams',
      'Data tables and graphs',
      'Model drawings',
      'Prediction calculations'
    ]
  }
];

// Notecard prompts that can be used across projects
export const universalNotecardPrompts = {
  observation: [
    'Sketch what you observed today with detailed labels',
    'Record data from your investigation in a table',
    'Draw before and after diagrams',
    'Photograph and annotate your work'
  ],
  explanation: [
    'Explain why this happened using scientific evidence',
    'Connect today\'s learning to a real-world example',
    'Describe the cause and effect relationship',
    'Write a claim and support it with evidence'
  ],
  question: [
    'Write 3 questions you have after today\'s lesson',
    'What would you like to investigate further?',
    'What confused you? What clarity did you gain?',
    'Generate a testable question for future investigation'
  ],
  connection: [
    'Connect today\'s concept to something in your life',
    'How does this relate to what we learned before?',
    'Draw connections between 2-3 different ideas',
    'Explain this concept to a family member - how would you do it?'
  ],
  reflection: [
    'What surprised you today?',
    'How has your thinking changed?',
    'What are you most proud of from today?',
    'What would you do differently next time?'
  ],
  design: [
    'Sketch an improved version of your design',
    'Draw your solution with all parts labeled',
    'Create a blueprint for your invention',
    'Show your design thinking process'
  ]
};
