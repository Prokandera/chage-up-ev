
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 relative overflow-hidden">
      {/* Decorative doodles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-primary/20 rounded-full animate-float" />
        <div className="absolute bottom-20 right-20 w-16 h-16 border-4 border-secondary/20 rounded-full animate-float-delayed" />
        <svg className="absolute top-1/2 left-1/4 w-12 h-12 text-primary/10 animate-spin-slow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <svg className="absolute bottom-10 left-1/2 w-10 h-10 text-secondary/10 animate-bounce-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8 relative z-10">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center animate-fade-in" aria-label="Footer">
          <div className="px-5 py-2">
            <Link to="/about" className="text-base text-gray-500 hover:text-primary transition-colors duration-300">
              About
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/find-stations" className="text-base text-gray-500 hover:text-primary transition-colors duration-300">
              Find Stations
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/charging-guides" className="text-base text-gray-500 hover:text-primary transition-colors duration-300">
              Charging Guides
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/ev-models" className="text-base text-gray-500 hover:text-primary transition-colors duration-300">
              EV Models
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/contact" className="text-base text-gray-500 hover:text-primary transition-colors duration-300">
              Contact
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/privacy-policy" className="text-base text-gray-500 hover:text-primary transition-colors duration-300">
              Privacy
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/terms" className="text-base text-gray-500 hover:text-primary transition-colors duration-300">
              Terms
            </Link>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6 animate-fade-in">
          <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110">
            <span className="sr-only">Facebook</span>
            <Facebook className="h-6 w-6" />
          </a>

          <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </a>

          <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110">
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </a>

          <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110">
            <span className="sr-only">Email</span>
            <Mail className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-500">
          &copy; {new Date().getFullYear()} ElectricChargeHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
