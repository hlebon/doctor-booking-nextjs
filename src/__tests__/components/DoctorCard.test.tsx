import { render, screen, fireEvent } from '@testing-library/react';
import DoctorCard from '../../components/doctors/DoctorCard';
import { Doctor } from '../../types';

describe('DoctorCard', () => {
  const mockDoctor: Doctor = {
    id: '1',
    name: 'Dr. Smith',
    specialty: 'Cardiology',
    availability: 'morning',
    photo: '/doctor.jpg',
    location: 'New York',
  };

  it('renders doctor information correctly', () => {
    render(<DoctorCard doctor={mockDoctor} onBookAppointment={jest.fn()} />);

    expect(screen.getByText('Dr. Smith')).toBeInTheDocument();
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('morning')).toBeInTheDocument();
  });

  it('calls onBookAppointment when book button is clicked', () => {
    const mockOnBook = jest.fn();
    render(<DoctorCard doctor={mockDoctor} onBookAppointment={mockOnBook} />);

    fireEvent.click(screen.getByText('Book'));
    expect(mockOnBook).toHaveBeenCalledTimes(1);
  });
});
