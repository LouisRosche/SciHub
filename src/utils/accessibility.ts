// Accessibility utilities and constants

export const ARIA_LABELS = {
  // Navigation
  mainNav: 'Main navigation',
  studentPortal: 'Student portal navigation',
  teacherPortal: 'Teacher portal navigation',

  // Dashboard
  dashboard: 'Student dashboard showing progress and activities',
  streak: 'Current notecard submission streak',
  weeklyProgress: 'Weekly notecard count',
  masteredStandards: 'Number of mastered science standards',
  needsReview: 'Notecards needing review',

  // Notecard
  notecardCreator: 'Daily notecard creation form',
  frontSide: 'Front side of notecard for visual content',
  backSide: 'Back side of notecard for written explanation',
  ngssAlignment: 'NGSS science standards alignment selection',
  submitNotecard: 'Submit completed notecard',

  // Projects
  projectSelector: 'Choose a science project',
  projectCard: 'Project information card',

  // Review
  reviewSession: 'Spaced repetition review session',
  flipCard: 'Flip notecard to see answer',
};

export const KEYBOARD_SHORTCUTS = {
  'Escape': 'Close modal or cancel action',
  'Enter': 'Submit form or select item',
  'Space': 'Toggle selection',
  'Tab': 'Move to next field',
  'Shift+Tab': 'Move to previous field',
  'Ctrl+S': 'Save draft (Mac: Cmd+S)',
  'Ctrl+Enter': 'Submit notecard (Mac: Cmd+Enter)',
  '?': 'Show keyboard shortcuts',
};

// Focus trap for modals
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  firstElement?.focus();

  return () => element.removeEventListener('keydown', handleTabKey);
};

// Announce to screen readers
export const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Check for reduced motion preference
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// High contrast mode detection
export const isHighContrastMode = () => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

// Text-to-speech support (if available)
export const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }
};

// Skip to main content link
export const SkipToMain = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
    >
      Skip to main content
    </a>
  );
};
