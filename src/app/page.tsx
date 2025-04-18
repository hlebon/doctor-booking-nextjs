'use client';
import { Suspense, useState } from 'react';
import DoctorFilters from '../components/doctors/DoctorFilters';
import { useDoctors } from '../hooks/useDoctors';
import { Doctor } from '../types';
import dynamic from 'next/dynamic';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { DoctorGrid } from '../components/doctors/DoctorGrid';

const AppointmentSummary = dynamic(
  () => import('../components/appointments/AppointmentSummary'),
  {
    ssr: false,
    loading: () => <LoadingSkeleton />,
  },
);

const AppointmentsToggle = dynamic(
  () => import('../components/appointments/AppointmentToggle'),
  {
    ssr: false,
  },
);

const AppointmentModal = dynamic(
  () => import('../components/appointments/AppointmentModal'),
  {
    ssr: false,
  },
);

export default function DoctorDirectory() {
  const [openModal, setOpenModal] = useState(false);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [filters, setFilters] = useState({ specialty: '', availability: '' });

  const { data: doctors = [], isPending, isError } = useDoctors(filters);

  const handleSetFilters = (filters: {
    specialty?: string;
    availability?: string;
  }) => {
    setFilters((prev) => ({ ...prev, ...filters }));
  };

  const handleBookAppointment = () => {
    setOpenModal(true);
  };

  return (
    <div className="relative min-h-screen bg-paper text-primary-dark dark:bg-oxford dark:text-paper transition-colors duration-300">
      <div id="app-content" className="container m-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Doctor Directory</h1>

        <DoctorFilters filters={filters} setFilters={handleSetFilters} />

        {isPending && <LoadingSkeleton />}
        {isError && <p className="text-red-500">Failed to load doctors.</p>}

        <Suspense fallback={null}>
          <DoctorGrid
            doctors={doctors}
            onBookAppointment={(doc) => {
              handleBookAppointment();
              setDoctor(doc);
            }}
          />
        </Suspense>

        <Suspense fallback={null}>
          {openModal && doctor && (
            <AppointmentModal
              doctor={doctor}
              onClose={() => setOpenModal(false)}
            />
          )}
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <AppointmentsToggle>
          <AppointmentSummary />
        </AppointmentsToggle>
      </Suspense>
    </div>
  );
}
