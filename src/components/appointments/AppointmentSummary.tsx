'use client';

import Image from 'next/image';
import { useAppointmentsStore } from '../../stores/appointmentsStore';

export function AppointmentSummary() {
  const appointments = useAppointmentsStore((state) => state.appointments);
  const cancelAppointment = useAppointmentsStore(
    (state) => state.cancelAppointment,
  );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {appointments.length === 0 ? (
        <p
          aria-label="No appointments booked"
          className="text-secondary dark:text-secondary-light"
        >
          No appointments booked.
        </p>
      ) : (
        <ul className="divide-y divide-gray-700">
          {appointments.map((appt, i) => (
            <li
              key={i}
              className="py-4 first:pt-0 last:pb-0 bg-primary-dark flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center relative"
              role="group"
              aria-labelledby={`appt-${i}-name`}
              aria-describedby={`appt-${i}-desc`}
            >
              <Image
                src={appt.doctorPhoto}
                alt={appt.doctorName}
                width={48}
                height={48}
                className="rounded-full border-2 border-primary"
              />
              <div className="flex-1">
                <h3
                  id={`appt-${i}-name`}
                  className="font-semibold text-primary-dark dark:text-primary-light"
                >
                  {appt.doctorName}
                </h3>
                <p
                  id={`appt-${i}-desc`}
                  className="text-sm text-secondary dark:text-secondary-light"
                >
                  {appt.specialty} · {appt.location}
                </p>
                <p className="text-sm text-accent dark:text-accent-light">
                  📅 {appt.dateTime}
                </p>
              </div>
              <button
                onClick={() => cancelAppointment(appt)}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-blue-700 
                        rounded-full transition-colors cursor-pointer"
                aria-label={`Cancel appointment with ${appt.doctorName}`}
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AppointmentSummary;
