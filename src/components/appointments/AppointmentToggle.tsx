'use client';
import { useEffect, useRef, useState } from 'react';

export function AppointmentsToggle({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const appContent = document.getElementById('app-content');
    if (!appContent) return;

    if (open) {
      appContent.setAttribute('inert', 'true');
      drawerRef.current?.focus();
    } else {
      appContent.removeAttribute('inert');
      triggerRef.current?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      appContent.removeAttribute('inert');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        className={`border-2 border-white border-opacity-50 fixed bottom-4 right-4 px-5 py-3 rounded-full 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-on-primary
          transition-transform
          bg-gradient-to-r from-blue-600 to-blue-400
          hover:from-blue-700 hover:to-blue-500
          text-white shadow-lg
          transform hover:scale-105 z-50 cursor-pointer`}
        aria-expanded={open}
        aria-controls="appointments-section"
        aria-label={open ? 'Close appointments' : 'Open appointments'}
      >
        🗓 {open ? 'Close' : 'My Appointments'}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-oxford/50 backdrop-blur-md z-40 transition-opacity duration-300"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        id="appointments-section"
        role="dialog"
        aria-label="Appointments panel"
        aria-modal="true"
        ref={drawerRef}
        className={`bg-gradient-to-b from-blue-50 to-white dark:from-oxford-light dark:to-oxford
          fixed top-0 left-0 h-screen w-full md:w-96 
          text-oxford dark:text-paper shadow-xl 
          z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out 
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
        tabIndex={-1}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-blue-800">
              My Appointments
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 
                text-white transition-colors duration-200 
                focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              aria-label="Close appointments panel"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-4">{children}</div>
        </div>
      </div>
    </>
  );
}

export default AppointmentsToggle;
