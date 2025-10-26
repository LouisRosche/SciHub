import { DCI, CCC, SEP, PerformanceExpectation, DCIDomain, CCCType, SEPType } from '../types/ngss';

// ===== CROSSCUTTING CONCEPTS (CCC) =====
// These are the 7 big ideas that span all science disciplines

export const crosscuttingConcepts: Record<CCCType, CCC> = {
  'patterns': {
    id: 'patterns',
    title: 'Patterns',
    description: 'Observed patterns of forms and events guide organization and classification, and they prompt questions about relationships and the factors that influence them.',
    studentFriendly: 'Looking for things that repeat, happen again and again, or are similar in nature',
    questions: [
      'What patterns do you notice?',
      'What is similar and different?',
      'Does this pattern repeat?',
      'What does this pattern tell us?'
    ],
    notecardPrompts: [
      'Draw the pattern you observed today and explain what it means',
      'Compare two patterns and explain how they are similar or different',
      'Predict what will happen next based on the pattern you see'
    ]
  },
  'cause-effect': {
    id: 'cause-effect',
    title: 'Cause and Effect',
    description: 'Events have causes, sometimes simple, sometimes multifaceted. A major activity of science is investigating and explaining causal relationships.',
    studentFriendly: 'Understanding that things happen for reasons - every effect has a cause',
    questions: [
      'What caused this to happen?',
      'What will happen if...?',
      'What is the relationship between these two things?',
      'What factors affect this outcome?'
    ],
    notecardPrompts: [
      'Explain what caused the phenomenon you observed and why',
      'Draw a cause-and-effect diagram for today\'s investigation',
      'Describe what would happen if you changed one variable'
    ]
  },
  'scale-proportion-quantity': {
    id: 'scale-proportion-quantity',
    title: 'Scale, Proportion, and Quantity',
    description: 'In considering phenomena, it is critical to recognize what is relevant at different measures of size, time, and energy.',
    studentFriendly: 'Thinking about size, amount, and how big or small things are compared to each other',
    questions: [
      'How big or small is this?',
      'What happens at different scales?',
      'What are the proportions?',
      'How much is there?'
    ],
    notecardPrompts: [
      'Draw a scale comparison of what you learned today',
      'Explain how size affects what you observed',
      'Use numbers to describe the quantities involved'
    ]
  },
  'systems-models': {
    id: 'systems-models',
    title: 'Systems and System Models',
    description: 'Defining the system under study and making a model of it are tools for developing understanding.',
    studentFriendly: 'Looking at how parts work together and creating models to understand complex things',
    questions: [
      'What are the parts of this system?',
      'How do the parts interact?',
      'What are the boundaries of this system?',
      'How can we model this?'
    ],
    notecardPrompts: [
      'Draw a diagram of the system you studied with all its parts labeled',
      'Explain how one part affects another part of the system',
      'Create a simple model that represents what you learned'
    ]
  },
  'energy-matter': {
    id: 'energy-matter',
    title: 'Energy and Matter',
    description: 'Tracking fluxes of energy and matter into, out of, and within systems helps one understand the systems\' possibilities and limitations.',
    studentFriendly: 'Following where energy and materials come from, where they go, and how they change',
    questions: [
      'Where does the energy come from?',
      'Where does the matter go?',
      'How is energy transferred?',
      'What changes form?'
    ],
    notecardPrompts: [
      'Draw the flow of energy or matter through the system',
      'Explain where energy came from and where it went',
      'Describe how matter changed during your investigation'
    ]
  },
  'structure-function': {
    id: 'structure-function',
    title: 'Structure and Function',
    description: 'The way in which an object or living thing is shaped and its substructure determine many of its properties and functions.',
    studentFriendly: 'How the shape and parts of something determine what it can do',
    questions: [
      'How is this shaped?',
      'Why is it shaped this way?',
      'How does the structure help it do its job?',
      'What would happen if the shape changed?'
    ],
    notecardPrompts: [
      'Draw the structure and label how each part helps it function',
      'Explain the connection between shape and purpose',
      'Compare two structures and their different functions'
    ]
  },
  'stability-change': {
    id: 'stability-change',
    title: 'Stability and Change',
    description: 'For natural and built systems alike, conditions of stability and determinants of rates of change are critical elements of study.',
    studentFriendly: 'Understanding what stays the same, what changes, and how fast changes happen',
    questions: [
      'What stays the same?',
      'What changes?',
      'How fast does it change?',
      'What keeps it stable?'
    ],
    notecardPrompts: [
      'Describe what changed and what stayed the same in your investigation',
      'Explain what keeps this system stable',
      'Predict how this might change over time'
    ]
  }
};

// ===== SCIENCE AND ENGINEERING PRACTICES (SEP) =====
// What scientists and engineers actually DO

export const scienceEngineeringPractices: Record<SEPType, SEP> = {
  'asking-questions': {
    id: 'asking-questions',
    title: 'Asking Questions and Defining Problems',
    description: 'A practice of science is to ask questions that can be investigated empirically. Engineering begins with defining a problem.',
    studentFriendly: 'Coming up with questions that can be tested or problems that can be solved',
    actions: [
      'Ask questions about what you observe',
      'Turn observations into testable questions',
      'Define problems clearly',
      'Identify what you need to know'
    ],
    notecardPrompts: [
      'Write your scientific question and explain why it matters',
      'List 3 questions you have after today\'s lesson',
      'Define a problem you could solve with what you learned'
    ]
  },
  'developing-models': {
    id: 'developing-models',
    title: 'Developing and Using Models',
    description: 'Models are useful tools for representing ideas and explanations. They can be used to test ideas and predictions.',
    studentFriendly: 'Creating diagrams, drawings, or simulations to represent how things work',
    actions: [
      'Draw diagrams of systems',
      'Create physical or digital models',
      'Use models to make predictions',
      'Test and revise models'
    ],
    notecardPrompts: [
      'Draw a labeled model of what you learned today',
      'Create a model showing how the process works step-by-step',
      'Sketch a before-and-after model of the change you observed'
    ]
  },
  'planning-investigations': {
    id: 'planning-investigations',
    title: 'Planning and Carrying Out Investigations',
    description: 'Scientists plan and conduct investigations systematically to test hypotheses and answer questions.',
    studentFriendly: 'Designing experiments and collecting data carefully',
    actions: [
      'Plan what data to collect',
      'Identify variables to test',
      'Conduct fair tests',
      'Make careful observations'
    ],
    notecardPrompts: [
      'Sketch your experimental setup with labels',
      'List the steps of your investigation',
      'Record your observations with detailed notes or drawings'
    ]
  },
  'analyzing-data': {
    id: 'analyzing-data',
    title: 'Analyzing and Interpreting Data',
    description: 'Scientific investigations produce data that must be analyzed in order to derive meaning.',
    studentFriendly: 'Looking at data to find patterns and figure out what it means',
    actions: [
      'Organize data in tables or graphs',
      'Look for patterns in data',
      'Calculate averages or trends',
      'Identify outliers or anomalies'
    ],
    notecardPrompts: [
      'Create a graph or chart of your data',
      'Explain what pattern you found in the data',
      'Compare data from different trials and explain what you notice'
    ]
  },
  'using-mathematics': {
    id: 'using-mathematics',
    title: 'Using Mathematics and Computational Thinking',
    description: 'Mathematics and computation are fundamental tools for representing and analyzing scientific data.',
    studentFriendly: 'Using math and calculations to understand science better',
    actions: [
      'Use formulas and equations',
      'Calculate and measure precisely',
      'Use ratios and proportions',
      'Create computational models'
    ],
    notecardPrompts: [
      'Show your mathematical calculations and what they mean',
      'Use numbers to describe what you observed',
      'Solve a problem using math from today\'s lesson'
    ]
  },
  'constructing-explanations': {
    id: 'constructing-explanations',
    title: 'Constructing Explanations and Designing Solutions',
    description: 'The goal of science is to construct explanations for natural phenomena. Engineering aims to design solutions to problems.',
    studentFriendly: 'Explaining why things happen using evidence, or designing something to solve a problem',
    actions: [
      'Use evidence to support claims',
      'Explain the "why" behind observations',
      'Design solutions to problems',
      'Connect evidence to scientific ideas'
    ],
    notecardPrompts: [
      'Explain what happened and why, using evidence',
      'Design a solution to a problem and sketch it',
      'Write a claim and support it with your evidence'
    ]
  },
  'engaging-argument': {
    id: 'engaging-argument',
    title: 'Engaging in Argument from Evidence',
    description: 'Argumentation is the process by which evidence-based conclusions are defended and refined.',
    studentFriendly: 'Using evidence to support your ideas and respectfully critique others\' ideas',
    actions: [
      'Make claims based on evidence',
      'Defend your reasoning',
      'Evaluate others\' arguments',
      'Revise explanations based on new evidence'
    ],
    notecardPrompts: [
      'State your claim and list evidence that supports it',
      'Explain why your evidence is strong',
      'Compare two different explanations and which is better supported'
    ]
  },
  'obtaining-information': {
    id: 'obtaining-information',
    title: 'Obtaining, Evaluating, and Communicating Information',
    description: 'Scientists must be able to communicate clearly and evaluate information from diverse sources.',
    studentFriendly: 'Finding good information, checking if it\'s trustworthy, and sharing what you learn',
    actions: [
      'Research from reliable sources',
      'Evaluate credibility of information',
      'Communicate findings clearly',
      'Use scientific vocabulary'
    ],
    notecardPrompts: [
      'Summarize what you learned from research today',
      'Draw a diagram that explains your findings to someone else',
      'List key vocabulary words and their definitions with examples'
    ]
  }
};

// ===== DISCIPLINARY CORE IDEAS (DCI) - MIDDLE SCHOOL =====

export const disciplinaryCoreIdeas: DCI[] = [
  // ========== PHYSICAL SCIENCES (PS) ==========
  {
    id: 'MS-PS1-1',
    code: 'MS-PS1-1',
    domain: 'PS',
    title: 'Structure and Properties of Matter',
    description: 'Substances are made from different types of atoms, which combine with one another in various ways. Atoms form molecules that range in size from two to thousands of atoms.',
    gradeLevel: 'MS',
    relatedCCC: ['scale-proportion-quantity', 'structure-function'],
    relatedSEP: ['developing-models', 'analyzing-data'],
    studentFriendly: 'Everything is made of tiny particles called atoms. Different atoms combine to make all the materials around us.',
    realWorldConnections: [
      'Understanding ingredients in food and medicine',
      'How cleaning products work',
      'Why materials have different properties (hard, soft, clear, opaque)',
      'Creating new materials like plastics'
    ],
    projectIdeas: [
      'Design a water filtration system',
      'Investigate properties of different materials for a specific use',
      'Create a model of molecular structures',
      'Test and compare household substances'
    ]
  },
  {
    id: 'MS-PS1-2',
    code: 'MS-PS1-2',
    domain: 'PS',
    title: 'Chemical Reactions',
    description: 'Substances react chemically in characteristic ways. In a chemical process, atoms are reorganized into different molecules.',
    gradeLevel: 'MS',
    relatedCCC: ['patterns', 'energy-matter'],
    relatedSEP: ['planning-investigations', 'analyzing-data'],
    studentFriendly: 'When substances react, atoms rearrange into new substances. You can observe signs of chemical changes.',
    realWorldConnections: [
      'Cooking and baking',
      'Rust and corrosion',
      'Batteries and energy',
      'Fireworks and combustion'
    ],
    projectIdeas: [
      'Test factors that affect reaction rates',
      'Design indicators to detect chemical changes',
      'Investigate acid-base reactions in everyday life',
      'Create a battery from household materials'
    ]
  },
  {
    id: 'MS-PS2-1',
    code: 'MS-PS2-1',
    domain: 'PS',
    title: 'Forces and Motion',
    description: 'For any pair of interacting objects, the force exerted by the first object on the second is equal in strength to the force the second exerts on the first, but in the opposite direction.',
    gradeLevel: 'MS',
    relatedCCC: ['systems-models', 'stability-change'],
    relatedSEP: ['developing-models', 'using-mathematics'],
    studentFriendly: 'Forces always come in pairs. When you push on something, it pushes back on you equally.',
    realWorldConnections: [
      'Sports and athletics',
      'Vehicle safety and collisions',
      'Rocket launches',
      'Walking and running'
    ],
    projectIdeas: [
      'Design a collision safety system',
      'Investigate friction in different scenarios',
      'Build and test different types of rockets',
      'Analyze motion in sports'
    ]
  },
  {
    id: 'MS-PS3-1',
    code: 'MS-PS3-1',
    domain: 'PS',
    title: 'Energy',
    description: 'Motion energy is properly called kinetic energy. Energy can be converted from one form to another.',
    gradeLevel: 'MS',
    relatedCCC: ['energy-matter', 'systems-models'],
    relatedSEP: ['developing-models', 'constructing-explanations'],
    studentFriendly: 'Energy exists in many forms and can change from one form to another, but it never disappears.',
    realWorldConnections: [
      'Electricity generation',
      'Renewable energy sources',
      'Food as energy',
      'Heat and cooling systems'
    ],
    projectIdeas: [
      'Design a Rube Goldberg machine showing energy transformations',
      'Compare energy efficiency of different devices',
      'Build a solar oven',
      'Investigate energy in food chains'
    ]
  },
  {
    id: 'MS-PS4-1',
    code: 'MS-PS4-1',
    domain: 'PS',
    title: 'Waves and Information Transfer',
    description: 'Waves are regular patterns of motion that can be used to transfer information and energy.',
    gradeLevel: 'MS',
    relatedCCC: ['patterns', 'structure-function'],
    relatedSEP: ['developing-models', 'obtaining-information'],
    studentFriendly: 'Waves carry energy and information. Sound, light, and water all move in wave patterns.',
    realWorldConnections: [
      'Cell phones and WiFi',
      'Musical instruments',
      'Medical imaging',
      'Earthquakes and seismology'
    ],
    projectIdeas: [
      'Design a musical instrument',
      'Investigate how sound travels through different materials',
      'Build a communication device',
      'Model how information is transmitted wirelessly'
    ]
  },

  // ========== LIFE SCIENCES (LS) ==========
  {
    id: 'MS-LS1-1',
    code: 'MS-LS1-1',
    domain: 'LS',
    title: 'Structure and Function in Living Things',
    description: 'All living things are made of cells. In organisms, specialized structures work together to carry out essential functions of life.',
    gradeLevel: 'MS',
    relatedCCC: ['structure-function', 'scale-proportion-quantity'],
    relatedSEP: ['developing-models', 'constructing-explanations'],
    studentFriendly: 'Living things are made of cells that have special parts. Each part has a job that helps the organism survive.',
    realWorldConnections: [
      'Human body systems and health',
      'Disease and medicine',
      'Organ transplants',
      'Microscopy and medical diagnosis'
    ],
    projectIdeas: [
      'Build a 3D model of a cell',
      'Investigate how different organ systems work together',
      'Design an experiment with microorganisms',
      'Compare plant and animal cell structures'
    ]
  },
  {
    id: 'MS-LS1-2',
    code: 'MS-LS1-2',
    domain: 'LS',
    title: 'Matter and Energy in Organisms',
    description: 'Food provides molecules that serve as fuel and building material. Plants use energy from light to make sugars.',
    gradeLevel: 'MS',
    relatedCCC: ['energy-matter', 'systems-models'],
    relatedSEP: ['developing-models', 'analyzing-data'],
    studentFriendly: 'Living things need food for energy and building blocks. Plants make their own food using sunlight.',
    realWorldConnections: [
      'Nutrition and healthy eating',
      'Photosynthesis and oxygen production',
      'Food production and agriculture',
      'Digestion and metabolism'
    ],
    projectIdeas: [
      'Investigate factors affecting photosynthesis',
      'Design an optimal diet for different activities',
      'Model energy flow through food webs',
      'Test how plants respond to different light conditions'
    ]
  },
  {
    id: 'MS-LS2-1',
    code: 'MS-LS2-1',
    domain: 'LS',
    title: 'Ecosystems: Interactions and Energy',
    description: 'Organisms and populations are interdependent. Resources limit population growth.',
    gradeLevel: 'MS',
    relatedCCC: ['cause-effect', 'systems-models', 'stability-change'],
    relatedSEP: ['analyzing-data', 'constructing-explanations'],
    studentFriendly: 'Living things depend on each other and their environment. Populations change based on available resources.',
    realWorldConnections: [
      'Conservation and endangered species',
      'Invasive species problems',
      'Sustainable fishing and hunting',
      'Urban ecology and city planning'
    ],
    projectIdeas: [
      'Study a local ecosystem and its interactions',
      'Model population changes over time',
      'Design a sustainable habitat',
      'Investigate impact of invasive species'
    ]
  },
  {
    id: 'MS-LS3-1',
    code: 'MS-LS3-1',
    domain: 'LS',
    title: 'Heredity and Variation',
    description: 'Genes are located on chromosomes. Organisms inherit traits from parents through genes.',
    gradeLevel: 'MS',
    relatedCCC: ['cause-effect', 'structure-function'],
    relatedSEP: ['analyzing-data', 'using-mathematics'],
    studentFriendly: 'Traits pass from parents to offspring through genes. That\'s why you might look like your parents!',
    realWorldConnections: [
      'Family resemblances',
      'Dog and plant breeding',
      'Genetic diseases',
      'DNA testing and forensics'
    ],
    projectIdeas: [
      'Trace inherited traits in your family',
      'Model how traits are passed on',
      'Investigate variation in a population',
      'Breed plants with specific traits'
    ]
  },
  {
    id: 'MS-LS4-1',
    code: 'MS-LS4-1',
    domain: 'LS',
    title: 'Evolution and Natural Selection',
    description: 'Fossil evidence documents the existence of species over time. Anatomical similarities and differences provide evidence for evolution.',
    gradeLevel: 'MS',
    relatedCCC: ['patterns', 'cause-effect', 'scale-proportion-quantity'],
    relatedSEP: ['analyzing-data', 'constructing-explanations'],
    studentFriendly: 'Species change over very long periods of time. We can see evidence of this in fossils and how organisms are similar.',
    realWorldConnections: [
      'Antibiotic resistance',
      'Fossil discoveries',
      'Comparative anatomy',
      'Adaptation to climate change'
    ],
    projectIdeas: [
      'Analyze fossil evidence for evolution',
      'Model natural selection with simulations',
      'Compare anatomical structures across species',
      'Investigate adaptations in local organisms'
    ]
  },

  // ========== EARTH AND SPACE SCIENCES (ESS) ==========
  {
    id: 'MS-ESS1-1',
    code: 'MS-ESS1-1',
    domain: 'ESS',
    title: 'Earth\'s Place in the Universe',
    description: 'Patterns of movement of the sun, moon, and stars can be observed, described, and predicted.',
    gradeLevel: 'MS',
    relatedCCC: ['patterns', 'scale-proportion-quantity'],
    relatedSEP: ['developing-models', 'analyzing-data'],
    studentFriendly: 'Objects in space move in predictable patterns. These patterns cause day/night, seasons, and moon phases.',
    realWorldConnections: [
      'Calendars and timekeeping',
      'Space exploration',
      'Tides and ocean patterns',
      'Solar and lunar eclipses'
    ],
    projectIdeas: [
      'Model the Earth-Moon-Sun system',
      'Track and predict moon phases',
      'Design a calendar for another planet',
      'Investigate how seasons differ around Earth'
    ]
  },
  {
    id: 'MS-ESS2-1',
    code: 'MS-ESS2-1',
    domain: 'ESS',
    title: 'Earth\'s Systems',
    description: 'Water continually cycles among land, ocean, and atmosphere. Complex interactions determine local weather patterns.',
    gradeLevel: 'MS',
    relatedCCC: ['systems-models', 'energy-matter'],
    relatedSEP: ['developing-models', 'analyzing-data'],
    studentFriendly: 'Earth has interconnected systems (water, air, land, life) that constantly interact and change.',
    realWorldConnections: [
      'Weather prediction',
      'Water conservation',
      'Climate and agriculture',
      'Natural disasters'
    ],
    projectIdeas: [
      'Model the water cycle in action',
      'Track local weather patterns',
      'Investigate how land use affects water systems',
      'Design a water conservation system'
    ]
  },
  {
    id: 'MS-ESS3-1',
    code: 'MS-ESS3-1',
    domain: 'ESS',
    title: 'Earth and Human Activity',
    description: 'Human activities have altered the biosphere, sometimes damaging it. Changes to Earth\'s systems can have various causes and impacts.',
    gradeLevel: 'MS',
    relatedCCC: ['cause-effect', 'systems-models', 'stability-change'],
    relatedSEP: ['asking-questions', 'constructing-explanations', 'engaging-argument'],
    studentFriendly: 'Humans affect Earth\'s systems in many ways. Understanding these impacts helps us make better decisions.',
    realWorldConnections: [
      'Climate change',
      'Pollution and waste',
      'Renewable energy',
      'Conservation efforts'
    ],
    projectIdeas: [
      'Analyze local environmental issues',
      'Design solutions to reduce carbon footprint',
      'Investigate renewable energy options',
      'Create a conservation action plan'
    ]
  },

  // ========== ENGINEERING, TECHNOLOGY, AND APPLICATIONS (ETS) ==========
  {
    id: 'MS-ETS1-1',
    code: 'MS-ETS1-1',
    domain: 'ETS',
    title: 'Engineering Design Process',
    description: 'The engineering design process involves defining problems, developing and testing solutions, and optimizing designs.',
    gradeLevel: 'MS',
    relatedCCC: ['systems-models', 'structure-function'],
    relatedSEP: ['asking-questions', 'constructing-explanations', 'developing-models'],
    studentFriendly: 'Engineers follow a process to solve problems: define the problem, design solutions, test them, and make improvements.',
    realWorldConnections: [
      'Product design and development',
      'App and software creation',
      'Architecture and construction',
      'Medical devices'
    ],
    projectIdeas: [
      'Design and build a solution to a classroom problem',
      'Create a prototype and test it',
      'Optimize a design through multiple iterations',
      'Research and present on an engineering innovation'
    ]
  }
];
