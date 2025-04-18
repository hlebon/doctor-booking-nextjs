export type Doctor = {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  availability: 'morning' | 'afternoon';
  location: string;
};
