
import { CheckCircle, MapPin, Calendar, Zap } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      id: 1,
      name: 'Find a Station',
      description: 'Search for compatible charging stations nearby or along your route',
      icon: MapPin,
    },
    {
      id: 2,
      name: 'Book a Slot',
      description: 'Select your preferred time slot and reserve it in advance',
      icon: Calendar,
    },
    {
      id: 3,
      name: 'Charge Your EV',
      description: 'Arrive at the station, plug in, and start charging immediately',
      icon: Zap,
    },
    {
      id: 4,
      name: 'Drive with Confidence',
      description: 'Enjoy your journey knowing your charging needs are taken care of',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-ev-blue/5 to-ev-green/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-ev-blue">Simple Process</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How ElectricChargeHub Works
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our streamlined booking process ensures you can find and secure a charging spot in just a few taps.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-ev-blue to-ev-green shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                    <step.icon className="h-10 w-10 text-white" aria-hidden="true" />
                  </div>
                  {step.id < steps.length && (
                    <div className="absolute top-10 left-full h-0.5 w-full -translate-x-1/2 bg-gradient-to-r from-ev-blue to-ev-green hidden lg:block" />
                  )}
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-7 tracking-tight text-gray-900">
                  {step.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
