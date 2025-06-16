import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/img/Logo_SVG-Black.svg" 
            alt="AirStudio Logo" 
            width={134} 
            height={29}
            priority
          />
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-gray-900" style={{fontSize: '20px'}}>Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900" style={{fontSize: '20px'}}>About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900" style={{fontSize: '20px'}}>Contact</Link>
        </div>
      </div>
    </nav>
  );
} 