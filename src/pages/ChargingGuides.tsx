
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { EVConnectorGuide } from '@/components/ev-connector-guide';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ChargingGuides = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background doodles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-36 h-36 bg-primary/5 rounded-full animate-float" />
        <div className="absolute bottom-40 right-20 w-28 h-28 bg-secondary/5 rounded-full animate-float-slow" />
        <svg className="absolute top-1/3 right-10 w-16 h-16 text-primary/10 animate-spin-slow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      
      <Navbar />
      
      <main className="flex-1 relative z-10">
        <div className="bg-gradient-to-r from-ev-blue/10 to-ev-green/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-slide-in-bottom gradient-text">Charging Guides</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in">
                Everything you need to know about EV charging - from connector types to charging strategies.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Tabs defaultValue="connectors" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="connectors">Connector Types</TabsTrigger>
              <TabsTrigger value="strategies">Charging Strategies</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="connectors">
              <EVConnectorGuide />
            </TabsContent>
            
            <TabsContent value="strategies">
              <div className="mx-auto max-w-3xl py-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Smart Charging Strategies</h2>
                
                <div className="space-y-10">
                  <div className="bg-card p-6 rounded-lg shadow-sm hover-lift animate-fade-in border border-border">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Time Your Charging Right</h3>
                    <p className="mb-4">
                      Charging during off-peak hours can save you money and reduce strain on the electrical grid.
                      Many utility companies offer lower rates during evening hours.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm font-medium">Pro Tip</p>
                      <p className="text-sm text-gray-600">
                        Set your EV to charge after midnight when electricity demand is typically lowest.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg shadow-sm hover-lift animate-fade-in border border-border">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Maintain the 20-80 Rule</h3>
                    <p className="mb-4">
                      For optimal battery health, keep your EV's charge level between 20% and 80% most of the time.
                      Only charge to 100% when you need the full range for a specific trip.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm font-medium">Battery Health Tip</p>
                      <p className="text-sm text-gray-600">
                        Regularly charging to 100% can degrade your battery faster over time. Reserve full charges for long trips.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg shadow-sm hover-lift animate-fade-in border border-border">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Plan Charging Stops on Road Trips</h3>
                    <p className="mb-4">
                      For long journeys, plan your charging stops in advance. Add 20-30% buffer to your range estimates 
                      to account for weather conditions, elevation changes, and unexpected detours.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm font-medium">Road Trip Strategy</p>
                      <p className="text-sm text-gray-600">
                        Multiple shorter charging sessions can be faster than one long charging session due to charging speed curves.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faqs">
              <div className="mx-auto max-w-3xl py-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      question: "How long does it take to charge an electric vehicle?",
                      answer: "Charging time depends on your vehicle's battery size, the charger's power output, and your current battery level. Level 1 charging (standard outlet) can take 8-24 hours for a full charge. Level 2 charging (240V) typically takes 4-10 hours. DC Fast Charging can charge to 80% in 20-60 minutes depending on the vehicle and charger capability."
                    },
                    {
                      question: "How much does it cost to charge an EV?",
                      answer: "Charging costs vary based on electricity rates in your area and the size of your vehicle's battery. On average, charging at home costs $10-15 for a full charge (about 250-300 miles of range). Public charging stations typically charge by the kWh and rates can vary from $0.30 to $0.60 per kWh."
                    },
                    {
                      question: "Can I use any charger for my electric vehicle?",
                      answer: "Not all chargers are compatible with all EVs. Your vehicle will have a specific connector type, though adapters are available for some combinations. Tesla vehicles can use Tesla Superchargers and, with an adapter, many other stations. Non-Tesla vehicles typically use CCS, CHAdeMO, or J1772 connectors depending on the model."
                    },
                    {
                      question: "Is it better to charge at home or at public charging stations?",
                      answer: "Home charging is typically more convenient and less expensive if you have the ability to install a charger. Public charging stations are essential for longer trips and for those without home charging access. Many EV owners use a combination of both based on their needs."
                    },
                    {
                      question: "How can I find charging stations while traveling?",
                      answer: "Our app provides real-time information on charging station locations, availability, and connector types. Many EVs also have built-in navigation that can route you to compatible charging stations along your journey. Plan charging stops before your battery gets too low (below 20%) to avoid range anxiety."
                    },
                  ].map((faq, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChargingGuides;
