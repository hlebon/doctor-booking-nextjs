import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Appointment = {
  doctorId: string;
  doctorName: string;
  doctorPhoto: string;
  specialty: string;
  location: string;
  dateTime: string;
};

type AppointmentsState = {
  appointments: Appointment[];
  addAppointment: (appt: Appointment) => boolean;
  cancelAppointment: (appt: Appointment) => void;
  hasConflict: (doctorId: string, dateTime: string) => boolean;
};
export const useAppointmentsStore = create<AppointmentsState>()(
  persist(
    (set, get) => ({
      appointments: [],
      addAppointment: (appt) => {
        const exists = get().appointments.some(
          (a) => a.doctorId === appt.doctorId && a.dateTime === appt.dateTime,
        );
        if (exists) return false;

        set((state) => ({
          appointments: [...state.appointments, appt],
        }));
        return true;
      },
      cancelAppointment: (appt) => {
        set((state) => ({
          appointments: state.appointments.filter(
            (a) =>
              !(
                a.doctorId === appt.doctorId &&
                a.dateTime === appt.dateTime &&
                a.doctorName === appt.doctorName
              ),
          ),
        }));
      },
      hasConflict: (doctorId, dateTime) => {
        return get().appointments.some(
          (a) => a.doctorId === doctorId && a.dateTime === dateTime,
        );
      },
    }),
    {
      name: 'appointments',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
