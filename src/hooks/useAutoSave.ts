import { useEffect, useRef, useState } from 'react';

interface UseAutoSaveOptions {
  onSave: (data: any) => void;
  delay?: number; // milliseconds
}

export const useAutoSave = <T,>(data: T, options: UseAutoSaveOptions) => {
  const { onSave, delay = 2000 } = options;
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const previousDataRef = useRef<T>(data);

  useEffect(() => {
    // Only auto-save if data actually changed
    if (JSON.stringify(data) === JSON.stringify(previousDataRef.current)) {
      return;
    }

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set up new timer
    timerRef.current = setTimeout(() => {
      setIsSaving(true);

      try {
        onSave(data);
        setLastSaved(new Date());
        previousDataRef.current = data;
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setIsSaving(false);
      }
    }, delay);

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [data, delay, onSave]);

  return { isSaving, lastSaved };
};

// Save status indicator component
export const AutoSaveIndicator = ({
  isSaving,
  lastSaved
}: {
  isSaving: boolean;
  lastSaved: Date | null;
}) => {
  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 10) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return date.toLocaleTimeString();
  };

  if (isSaving) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
        <span>Saving...</span>
      </div>
    );
  }

  if (lastSaved) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <span>Saved {getTimeAgo(lastSaved)}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="w-2 h-2 bg-gray-300 rounded-full" />
      <span>Not saved yet</span>
    </div>
  );
};
