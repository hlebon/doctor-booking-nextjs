'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Doctor } from '../../types';
import { useAppointmentsStore } from '../../stores/appointmentsStore';
import { timeSlotsByAvailability } from '../../utils/timeSlots';
import { Modal } from '../ui/Modal';
import { Toast } from '../ui/Toast';

type Props = {
  doctor: Doctor;
  onClose: () => void;
};

function createAppointment(doctor: Doctor, slot: string) {
  return {
    doctorId: doctor.id,
    doctorName: doctor.name,
    doctorPhoto: doctor.photo,
    specialty: doctor.specialty,
    location: doctor.location,
    dateTime: slot,
  };
}

export default function AppointmentModal({ doctor, onClose }: Props) {
  const addAppointment = useAppointmentsStore((s) => s.addAppointment);
  const hasConflict = useAppointmentsStore((s) => s.hasConflict);

  const [showToast, setShowToast] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const slots = timeSlotsByAvailability[doctor.availability];

  const handleCreateAppointment = (slot: string) => {
    addAppointment(createAppointment(doctor, slot));
    setShowToast(true);
  };

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  return (
    <Modal title={`Book with ${doctor.name}`} onClose={onClose}>
      <div ref={modalRef} className="space-y-4">
        <div className="text-sm text-white dark:text-white">
          <p>
            Select an available time slot for your appointment with Dr.{' '}
            {doctor.name}
          </p>
          <p className="mt-1">Specialty: {doctor.specialty}</p>
        </div>

        <fieldset className="space-y-3">
          <legend className="sr-only">Available Time Slots</legend>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            role="list"
            aria-label="Available appointment times"
          >
            {slots.map((slot) => {
              const disabled = hasConflict(doctor.id, slot);
              return (
                <li key={slot}>
                  <button
                    onClick={() => handleCreateAppointment(slot)}
                    disabled={disabled}
                    className={`w-full px-4 py-3 rounded-lg text-left ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} transition-all duration-200 border-2
                      ${
                        disabled
                          ? 'bg-oxford text-gray-400 text-gray-500 cursor-not-allowed border-gray-600'
                          : 'bg-primary-light hover:bg-primary text-white border-white hover:border-primary-light shadow-sm hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
                      }`}
                    aria-disabled={disabled}
                    aria-label={`Book appointment for ${slot}${disabled ? ' (unavailable)' : ''}`}
                  >
                    <span className="flex items-center justify-between">
                      <span>{slot}</span>
                      {disabled && (
                        <span className="text-xs bg-oxford px-2 py-1 rounded">
                          Booked
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <div className="text-xs text-white dark:text-white mt-4">
          <p>Note: All times are in your local timezone</p>
        </div>
      </div>
      {showToast && (
        <Toast
          message="Booking confirmed successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </Modal>
  );
}
