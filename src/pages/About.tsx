
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background doodles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary/5 rounded-full animate-float" />
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-secondary/5 rounded-full animate-float-slow" />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-primary/5 rounded-full animate-float-delayed" />
        <svg className="absolute top-1/4 right-1/4 w-20 h-20 text-secondary/10 animate-bounce-subtle" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
      
      <Navbar />
      
      <main className="flex-1 relative z-10">
        <div className="bg-gradient-to-r from-ev-blue/10 to-ev-green/10 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-slide-in-bottom gradient-text">Our Mission</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in">
                We're making electric vehicle charging accessible, convenient, and stress-free.
              </p>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4 animate-slide-in-left">
                <div className="lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-primary">About ElectricChargeHub</h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Revolutionizing EV Charging</p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    ElectricChargeHub was born from a simple frustration - the difficulty in finding and securing reliable charging spots for electric vehicles. We saw firsthand how range anxiety and charging uncertainty were holding back EV adoption.
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Our platform connects drivers with charging stations, offering real-time availability and advanced booking to eliminate the uncertainty in the EV charging experience.
                  </p>
                  
                  <div className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                    <div>
                      <h3 className="font-semibold text-gray-900">Founded by EV Enthusiasts</h3>
                      <p className="mt-2">
                        Our team consists of passionate EV owners who understand the challenges and joys of electric vehicle ownership. We've built the solution we wished existed when we first started driving electric.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Our Values</h3>
                      <p className="mt-2">
                        We believe in sustainable transportation, exceptional customer experiences, and building technology that makes a positive impact on the environment and society.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Growing Network</h3>
                      <p className="mt-2">
                        We're constantly expanding our network of charging stations and partners to provide the most comprehensive coverage and best service for our users.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-muted/30 p-2 ring-1 ring-inset ring-border lg:flex lg:flex-col lg:justify-center animate-slide-in-right hover-lift">
                <img
                  src="https://images.unsplash.com/photo-1638887232075-33691d8de7d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Team working on electric vehicle charging solutions"
                  className="w-full rounded-md shadow-2xl image-parallax"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Leadership Team
            </h2>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: 'Abhishek Kandera',
                  role: 'Co-Founder & CEO',
                },
                {
                  name: 'Shashank Tyagi',
                  role: 'Co-Founder & CTO',
                },
                {
                  name: 'Sunny Kumar',
                  role: 'COO',
                },
              ].map((person) => (
                <div key={person.name} className="flex flex-col items-center">
                  <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-base leading-7 text-ev-blue">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
