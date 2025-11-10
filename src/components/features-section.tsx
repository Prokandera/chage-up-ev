
import { Zap, Clock, MapPin, Shield, Smartphone, CreditCard } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      name: 'Instant Availability',
      description: 'See real-time availability of charging stations near you, filter by connector type and power output.',
      icon: Zap,
    },
    {
      name: 'Advanced Booking',
      description: 'Reserve your charging slot in advance to ensure your EV gets charged exactly when you need it.',
      icon: Clock,
    },
    {
      name: 'Location Intelligence',
      description: 'Find stations along your route, complete with amenities information and user reviews.',
      icon: MapPin,
    },
    {
      name: 'Verified Stations',
      description: 'All stations on our network are verified for reliability and maintenance status.',
      icon: Shield,
    },
    {
      name: 'Mobile Notifications',
      description: 'Get alerts when your charging session is about to end or when a preferred station becomes available.',
      icon: Smartphone,
    },
    {
      name: 'Seamless Payments',
      description: 'Pay directly through the app with your preferred payment method. No fumbling with multiple cards or apps.',
      icon: CreditCard,
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-ev-blue">Charge Smarter</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for hassle-free EV charging
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform makes finding, booking, and paying for EV charging stations simpler than ever before.
            Say goodbye to range anxiety and hello to convenient charging.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={feature.name} 
                className="flex flex-col hover-lift bg-white rounded-xl p-6 border border-gray-100 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-ev-blue to-ev-green shadow-lg transition-transform duration-300 hover:scale-110">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
