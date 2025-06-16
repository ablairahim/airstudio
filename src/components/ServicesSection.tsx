export function ServicesSection() {
  return (
    <section className="container mx-auto px-4 py-20 space-y-12">
      <div className="h-10 w-56 bg-gray-200 rounded-md mx-auto" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-40 rounded-md bg-gray-100"
          />
        ))}
      </div>
    </section>
  );
} 