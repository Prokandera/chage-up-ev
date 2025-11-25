
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export function HeroSection() {
  const [zipCode, setZipCode] = useState('');

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ev-blue/10 via-ev-green/5 to-ev-indigo/10 z-0 border border-gray-300 rounded-b-md p-4" />
      
      <div className="relative max-w-7xl mx-auto pt-16 pb-24 px-4 sm:pt-24 sm:pb-32 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left animate-slide-in-left">
            <h1>
              <span className="block text-sm font-semibold uppercase tracking-wide text-ev-green animate-fade-in">
                Charge with confidence
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-ev-slate animate-slide-in-bottom">Find & Book EV</span>
                <span className="block bg-gradient-to-r from-ev-blue to-ev-green bg-clip-text text-transparent animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
                  Charging Stations
                </span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Book charging slots in advance, find compatible stations for your vehicle, 
              and never wait in line again. The smartest way to keep your EV charged.
            </p>
            
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <p className="text-base font-medium text-gray-900">
                Find charging stations near you
              </p>
              <div className="mt-3 sm:flex">
                <label htmlFor="pinCode" className="sr-only">
                  PIN Code
                </label>
                <input
                  type="text"
                  name="pinCode"
                  id="pinCode"
                  className="block w-full py-3 px-4 rounded-md placeholder-gray-500 shadow-sm border border-gray-300 focus:ring-ev-blue focus:border-ev-blue sm:flex-1"
                  placeholder="Enter your PIN code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
                <Button
                  type="submit"
                  className="mt-3 w-full px-6 py-3 bg-gradient-to-r from-ev-blue to-ev-green hover:from-ev-blue hover:to-ev-indigo sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                We care about your data. Read our{' '}
                <Link to="/privacy-policy" className="font-medium text-ev-blue underline">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6 animate-slide-in-right">
            <div className="relative mx-auto w-full rounded-lg shadow-xl overflow-hidden lg:max-w-none hover-lift">
              <div className="relative block w-full h-[400px] bg-gradient-to-r from-ev-green to-ev-blue rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover mix-blend-overlay opacity-90 image-parallax"
                  src="/electric-car-charging-in-underground-garage-plugged-at-home-charger-station-battery-ev-vehicle-standing-parking-free-photo.webp"
                  alt="Electric car charging"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center animate-float shadow-xl">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-ev-blue to-ev-green flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
