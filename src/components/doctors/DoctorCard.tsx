'use client';

import Image from 'next/image';
import { Doctor } from '../../types';

type Props = {
  doctor: Doctor;
  priority?: boolean;
  onBookAppointment: () => void;
};

export default function DoctorCard({
  doctor,
  priority,
  onBookAppointment,
}: Props) {
  return (
    <div className="bg-blue-950 rounded-2xl shadow-md p-4 md:p-6 transition-colors">
      <div className="flex items-center gap-4">
        <Image
          src={doctor.photo}
          alt={doctor.name}
          width={100}
          height={100}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          className="rounded-full object-cover border-2 border-blue-500"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
          quality={75}
        />
        <div>
          <h3 className="text-2xl font-semibold text-white">{doctor.name}</h3>
          <p className="text-blue-100">{doctor.specialty}</p>
          <p className="text-sm text-blue-100">{doctor.location}</p>
        </div>
      </div>

      <div className="mt-4 md:mt-6 flex items-center justify-between">
        <span className="text-sm text-blue-100">
          Available: <strong>{doctor.availability}</strong>
        </span>
        <button
          onClick={onBookAppointment}
          aria-label="Book Appointment"
          className="px-6 font-semibold cursor-pointer py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
          Book
        </button>
      </div>
    </div>
  );
}
