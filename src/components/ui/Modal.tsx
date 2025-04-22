'use client';

import { useEffect, useRef } from 'react';

type Props = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ title, onClose, children }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appContent = document.getElementById('app-content');
    if (!appContent) return;

    appContent.setAttribute('inert', 'true');
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      appContent.removeAttribute('inert');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      className="fixed inset-0 z-50 overflow-y-auto"
      tabIndex={-1}
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
          onClick={onClose}
        />

        <div className="relative bg-blue-950 rounded-xl shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 id="modal-title" className="text-xl font-semibold text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close modal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
