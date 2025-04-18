import { useEffect } from 'react';

type ToastProps = {
  message: string;
  duration?: number;
  onClose: () => void;
};

export function Toast({ message, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      role="alert"
      className="fixed bottom-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg 
                 transform transition-transform duration-300 ease-in-out animate-fade-in"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <span>✅</span>
        {message}
      </div>
    </div>
  );
}
