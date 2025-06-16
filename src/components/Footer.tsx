export function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-6 mt-12">
      <div className="container mx-auto px-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} AirStudio. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 