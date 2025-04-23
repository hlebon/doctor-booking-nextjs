import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ title, onClose, children }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstFocusable = focusableElements?.[0] as HTMLElement;
    const lastFocusable = focusableElements?.[
      focusableElements.length - 1
    ] as HTMLElement;

    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Tab') {
        if (!focusableElements) return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className="bg-blue-950 relative w-full max-w-md transform rounded-xl bg-oxford p-6 shadow-xl transition-all
                   sm:max-w-lg md:max-w-xl lg:max-w-2xl"
        role="document"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="modal-title" className="text-xl font-semibold text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:text-white transition-colors
                     hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
            aria-label="Close modal"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
