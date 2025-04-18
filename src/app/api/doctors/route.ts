import { NextRequest, NextResponse } from 'next/server';
import { doctorsMock } from '../../../mocks/doctors';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const specialty = searchParams.get('specialty');
  const availability = searchParams.get('availability');

  let filtered = doctorsMock;

  if (specialty) {
    filtered = filtered.filter(
      (d) => d.specialty.toLowerCase() === specialty.toLowerCase(),
    );
  }

  if (availability) {
    filtered = filtered.filter(
      (d) => d.availability.toLowerCase() === availability.toLowerCase(),
    );
  }

  return NextResponse.json(filtered);
}
