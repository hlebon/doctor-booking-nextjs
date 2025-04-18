import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DoctorDirectory from '../../app/page';
import { useDoctors } from '../../hooks/useDoctors';
import { useAppointmentsStore } from '../../stores/appointmentsStore';

jest.mock('../../hooks/useDoctors');
jest.mock('../../stores/appointmentsStore');

describe('Booking Flow Integration', () => {
  const mockDoctors = [
    {
      id: '1',
      name: 'Dr. Smith',
      specialty: 'Cardiology',
      availability: 'morning',
      photo: '/doctor.jpg',
      location: 'New York',
    },
    {
      id: '2',
      name: 'Dr. Johnson',
      specialty: 'Pediatrics',
      availability: 'afternoon',
      photo: '/doctor2.jpg',
      location: 'Boston',
    },
  ];

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (useDoctors as jest.Mock).mockReturnValue({
      data: mockDoctors,
      isLoading: false,
      error: null,
    });

    const mockStore = {
      appointments: [],
      addAppointment: jest.fn(),
      removeAppointment: jest.fn(),
      hasConflict: jest.fn().mockReturnValue(false),
    };
    (useAppointmentsStore as unknown as jest.Mock).mockImplementation(
      (selector) => selector(mockStore),
    );

    render(
      <QueryClientProvider client={queryClient}>
        <DoctorDirectory />
      </QueryClientProvider>,
    );
  });

  it('completes full booking flow successfully', async () => {
    expect(screen.getByText('Dr. Smith')).toBeInTheDocument();
    expect(screen.getByText('Dr. Johnson')).toBeInTheDocument();

    const [bookButton] = await screen.findAllByRole('button', {
      name: 'Book Appointment',
    });
    fireEvent.click(bookButton);

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(screen.getByText(/Book with Dr. Smith/i)).toBeInTheDocument();

    const timeSlot = await screen.findByRole('button', {
      name: /Book appointment for.*9:00 AM/i,
    });
    fireEvent.click(timeSlot);

    await waitFor(() => {
      expect(
        screen.getByText(/Booking confirmed successfully!/i),
      ).toBeInTheDocument();
    });

    const addAppointment = useAppointmentsStore((s) => s.addAppointment);
    expect(addAppointment).toHaveBeenCalledWith(
      expect.objectContaining({
        doctorId: '1',
        doctorName: 'Dr. Smith',
        specialty: 'Cardiology',
      }),
    );
  });

  it('handles booking conflicts correctly', async () => {
    (useAppointmentsStore as unknown as jest.Mock).mockImplementation(
      (selector) =>
        selector({
          hasConflict: () => true,
          appointments: [],
          addAppointment: jest.fn(),
          removeAppointment: jest.fn(),
        }),
    );

    const [bookButton] = await screen.findAllByRole('button', {
      name: 'Book Appointment',
    });
    fireEvent.click(bookButton);

    const timeSlot = await screen.findByRole('button', {
      name: /Book appointment for.*9:00 AM/i,
    });
    expect(timeSlot.closest('button')).toBeDisabled();
  });
});
