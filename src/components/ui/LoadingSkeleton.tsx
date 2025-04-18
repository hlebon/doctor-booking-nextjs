export function LoadingSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-200 rounded-lg h-48" />
      ))}
    </div>
  );
}
