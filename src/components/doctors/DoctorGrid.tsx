import { Doctor } from '../../types';
import DoctorCard from './DoctorCard';

export function DoctorGrid({
  doctors,
  onBookAppointment,
}: {
  doctors: Doctor[];
  onBookAppointment: (doctor: Doctor) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {doctors.map((doc, idx) => (
        <DoctorCard
          key={idx}
          doctor={doc}
          priority={idx < 3}
          onBookAppointment={() => onBookAppointment(doc)}
        />
      ))}
    </div>
  );
}
