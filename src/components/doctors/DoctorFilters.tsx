type Props = {
  filters: { specialty: string; availability: string };
  setFilters: (filters: { specialty?: string; availability?: string }) => void;
};

export default function DoctorFilters({ filters, setFilters }: Props) {
  const handleInitialValues = () => {
    setFilters({
      specialty: '',
      availability: '',
    });
  };

  return (
    <div
      className="flex flex-col sm:flex-row gap-4 pt-4 pb-4 bg-white dark:bg-oxford rounded-lg shadow-light dark:shadow-dark"
      role="search"
      aria-label="Doctor filters"
    >
      <div className="flex-1">
        <label
          htmlFor="specialty-filter"
          className="block text-sm font-medium text-primary-dark dark:text-primary-light mb-1"
        >
          Specialty
        </label>
        <select
          id="specialty-filter"
          value={filters.specialty}
          onChange={(e) => setFilters({ specialty: e.target.value })}
          className="w-full border border-gray-300 dark:border-indigo px-3 py-2 rounded-md bg-white dark:bg-penn text-primary-dark dark:text-primary-light focus:ring-2 focus:ring-primary focus:border-primary dark:focus:ring-primary-light dark:focus:border-primary-light transition-colors"
          aria-label="Filter by specialty"
        >
          <option value="">All Specialties</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Pediatrics">Pediatrics</option>
        </select>
      </div>

      <div className="flex-1">
        <label
          htmlFor="availability-filter"
          className="block text-sm font-medium text-primary-dark dark:text-primary-light mb-1"
        >
          Availability
        </label>
        <select
          id="availability-filter"
          value={filters.availability}
          onChange={(e) => setFilters({ availability: e.target.value })}
          className="w-full border border-gray-300 dark:border-indigo px-3 py-2 rounded-md bg-white dark:bg-penn text-primary-dark dark:text-primary-light focus:ring-2 focus:ring-primary focus:border-primary dark:focus:ring-primary-light dark:focus:border-primary-light transition-colors"
          aria-label="Filter by availability"
        >
          <option value="">All Times</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
        </select>
      </div>

      <div className="flex items-end">
        <button
          type="button"
          onClick={handleInitialValues}
          className="w-full sm:w-auto px-6 py-2 bg-white border-2 border-gray-600 border-0 focus:border-white text-on-primary rounded-md 
          hover:bg-primary-dark transition-colors focus:ring-2 focus:ring-offset-2 
          focus:ring-primary focus:outline-none cursor-pointer"
          aria-label="Reset filters to initial values"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
