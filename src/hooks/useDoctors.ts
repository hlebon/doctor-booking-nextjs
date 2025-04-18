import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Doctor } from '../types';

type Filters = {
  specialty?: string;
  availability?: string;
};

const CACHE_TIME = 1000 * 60 * 60 * 24 * 7;
const STALE_TIME = 1000 * 60 * 60 * 24;

export function useDoctors(filters: Filters) {
  const queryClient = useQueryClient();
  return useQuery<Doctor[], Error>({
    queryKey: ['doctors', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.specialty) params.append('specialty', filters.specialty);
      if (filters.availability)
        params.append('availability', filters.availability);

      const res = await fetch(`/api/doctors?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch doctors');
      return res.json();
    },
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    placeholderData: (prev) => {
      return prev;
    },
    initialData: () => {
      return queryClient.getQueryData(['doctors', {}]);
    },
  });
}
