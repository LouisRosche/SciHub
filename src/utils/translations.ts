// Translation system for multilingual support
// Starting with Spanish, expandable to other languages

export type Language = 'en' | 'es';

export interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.dashboard': {
    en: 'Dashboard',
    es: 'Panel de control'
  },
  'nav.createNotecard': {
    en: 'Create Notecard',
    es: 'Crear tarjeta'
  },
  'nav.review': {
    en: 'Review',
    es: 'Repasar'
  },
  'nav.projects': {
    en: 'Projects',
    es: 'Proyectos'
  },
  'nav.help': {
    en: 'Help',
    es: 'Ayuda'
  },

  // Dashboard
  'dashboard.welcome': {
    en: 'Welcome back',
    es: 'Bienvenido de nuevo'
  },
  'dashboard.streak': {
    en: 'Notecard Streak',
    es: 'Racha de tarjetas'
  },
  'dashboard.thisWeek': {
    en: 'This Week',
    es: 'Esta semana'
  },
  'dashboard.mastered': {
    en: 'Mastered Standards',
    es: 'Estándares dominados'
  },
  'dashboard.needsReview': {
    en: 'Need Review',
    es: 'Necesitan repaso'
  },

  // Notecard
  'notecard.front': {
    en: 'Front Side (Visual)',
    es: 'Lado frontal (Visual)'
  },
  'notecard.back': {
    en: 'Back Side (Written)',
    es: 'Lado posterior (Escrito)'
  },
  'notecard.todaysPrompt': {
    en: "Today's Prompt",
    es: 'Pregunta de hoy'
  },
  'notecard.submit': {
    en: 'Submit Notecard',
    es: 'Enviar tarjeta'
  },
  'notecard.saveDraft': {
    en: 'Save Draft',
    es: 'Guardar borrador'
  },
  'notecard.showHelp': {
    en: 'Show Help',
    es: 'Mostrar ayuda'
  },

  // Projects
  'projects.choose': {
    en: 'Choose Your Project',
    es: 'Elige tu proyecto'
  },
  'projects.drivingQuestion': {
    en: 'Driving Question',
    es: 'Pregunta guía'
  },
  'projects.duration': {
    en: 'Duration',
    es: 'Duración'
  },
  'projects.makeItYours': {
    en: 'Make It Your Own',
    es: 'Hazlo tuyo'
  },

  // Review
  'review.flipCard': {
    en: 'Click to flip',
    es: 'Haz clic para voltear'
  },
  'review.howWell': {
    en: 'How well did you remember this?',
    es: '¿Qué tan bien lo recordaste?'
  },
  'review.easy': {
    en: 'Easy',
    es: 'Fácil'
  },
  'review.medium': {
    en: 'Medium',
    es: 'Medio'
  },
  'review.hard': {
    en: 'Hard',
    es: 'Difícil'
  },

  // Encouragement
  'encourage.greatStart': {
    en: 'Great start! Your thinking is showing through.',
    es: '¡Gran comienzo! Se nota tu pensamiento.'
  },
  'encourage.keepGoing': {
    en: 'Keep going! You\'re doing great!',
    es: '¡Sigue así! ¡Lo estás haciendo genial!'
  },
  'encourage.youGotThis': {
    en: 'You\'ve got this!',
    es: '¡Tú puedes!'
  },

  // NGSS Terms (these are often kept in English or adapted)
  'ngss.disciplinaryCoreIdeas': {
    en: 'Disciplinary Core Ideas',
    es: 'Ideas Fundamentales Disciplinarias'
  },
  'ngss.crosscuttingConcepts': {
    en: 'Crosscutting Concepts',
    es: 'Conceptos Transversales'
  },
  'ngss.sciencePractices': {
    en: 'Science & Engineering Practices',
    es: 'Prácticas de Ciencia e Ingeniería'
  },

  // CCC translations
  'ccc.patterns': {
    en: 'Patterns',
    es: 'Patrones'
  },
  'ccc.causeEffect': {
    en: 'Cause and Effect',
    es: 'Causa y Efecto'
  },
  'ccc.scale': {
    en: 'Scale, Proportion, and Quantity',
    es: 'Escala, Proporción y Cantidad'
  },
  'ccc.systems': {
    en: 'Systems and System Models',
    es: 'Sistemas y Modelos de Sistemas'
  },
  'ccc.energy': {
    en: 'Energy and Matter',
    es: 'Energía y Materia'
  },
  'ccc.structure': {
    en: 'Structure and Function',
    es: 'Estructura y Función'
  },
  'ccc.stability': {
    en: 'Stability and Change',
    es: 'Estabilidad y Cambio'
  },

  // Common actions
  'action.start': {
    en: 'Start',
    es: 'Comenzar'
  },
  'action.continue': {
    en: 'Continue',
    es: 'Continuar'
  },
  'action.close': {
    en: 'Close',
    es: 'Cerrar'
  },
  'action.save': {
    en: 'Save',
    es: 'Guardar'
  },
  'action.cancel': {
    en: 'Cancel',
    es: 'Cancelar'
  },
  'action.next': {
    en: 'Next',
    es: 'Siguiente'
  },
  'action.previous': {
    en: 'Previous',
    es: 'Anterior'
  },

  // Time
  'time.days': {
    en: 'days',
    es: 'días'
  },
  'time.weeks': {
    en: 'weeks',
    es: 'semanas'
  },
  'time.today': {
    en: 'Today',
    es: 'Hoy'
  }
};

// Get translation
export const t = (key: string, language: Language = 'en'): string => {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translation[language] || translation.en;
};

// Language context for React
import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const translate = (key: string) => t(key, language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language selector component
export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded ${
          language === 'en'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1 rounded ${
          language === 'es'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Español
      </button>
    </div>
  );
};
