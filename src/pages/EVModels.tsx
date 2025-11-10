
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { evModels } from '@/data/mock-data';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search } from 'lucide-react';

// Extended model data for the page
const extendedModels = [
  {
    id: 1,
    name: 'Tesla Model 3',
    connectorTypes: ['Tesla', 'Type 2 (with adapter)'],
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    range: '272-358 miles',
    batterySize: '60-82 kWh',
    chargingSpeed: 'Up to 250 kW',
    category: 'sedan'
  },
  {
    id: 2,
    name: 'Nissan Leaf',
    connectorTypes: ['CHAdeMO', 'J1772'],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba13107bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    range: '149-226 miles',
    batterySize: '40-62 kWh',
    chargingSpeed: 'Up to 100 kW',
    category: 'hatchback'
  },
  {
    id: 3,
    name: 'BMW i4',
    connectorTypes: ['CCS', 'Type 2'],
    image: "https://images.unsplash.com/photo-1633525875520-e3cc339f31ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    range: '270-300 miles',
    batterySize: '83.9 kWh',
    chargingSpeed: 'Up to 200 kW',
    category: 'sedan'
  },
  {
    id: 4,
    name: 'Hyundai Ioniq 5',
    connectorTypes: ['CCS', 'Type 2'],
    image: "https://images.unsplash.com/photo-1669994790850-640fc1304381?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    range: '220-303 miles',
    batterySize: '58-77.4 kWh',
    chargingSpeed: 'Up to 350 kW',
    category: 'crossover'
  },
  {
    id: 5,
    name: 'Ford Mustang Mach-E',
    connectorTypes: ['CCS', 'J1772'],
    image: "https://images.unsplash.com/photo-1633509817725-30fcbb87db3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    range: '224-314 miles',
    batterySize: '70-91 kWh',
    chargingSpeed: 'Up to 150 kW',
    category: 'suv'
  },
  {
    id: 6,
    name: 'Volkswagen ID.4',
    connectorTypes: ['CCS', 'Type 2'],
    image: "https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    range: '208-275 miles',
    batterySize: '62-82 kWh',
    chargingSpeed: 'Up to 125 kW',
    category: 'suv'
  },
  {
    id: 7,
    name: 'Rivian R1T',
    connectorTypes: ['CCS', 'J1772'],
    image: "https://images.unsplash.com/photo-1655410195309-c0a5de1494a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    range: '314-400+ miles',
    batterySize: '105-135 kWh',
    chargingSpeed: 'Up to 200 kW',
    category: 'truck'
  },
  {
    id: 8,
    name: 'Porsche Taycan',
    connectorTypes: ['CCS', 'Type 2'],
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    range: '199-227 miles',
    batterySize: '79.2-93.4 kWh',
    chargingSpeed: 'Up to 270 kW',
    category: 'sedan'
  }
];

const EVModels = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredModels = searchTerm 
    ? extendedModels.filter(model => 
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.connectorTypes.some(type => 
          type.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : extendedModels;
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background doodles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-40 h-40 bg-primary/5 rounded-full animate-float" />
        <div className="absolute bottom-40 right-10 w-32 h-32 bg-secondary/5 rounded-full animate-float-delayed" />
        <svg className="absolute top-1/2 left-1/2 w-20 h-20 text-primary/10 animate-bounce-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      
      <Navbar />
      
      <main className="flex-1 relative z-10">
        <div className="bg-gradient-to-r from-ev-blue/10 to-ev-green/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-slide-in-bottom gradient-text">EV Models</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in">
                Browse popular electric vehicles and their compatible charging options.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Popular Electric Vehicles</h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sedan">Sedans</TabsTrigger>
              <TabsTrigger value="suv">SUVs</TabsTrigger>
              <TabsTrigger value="crossover">Crossovers</TabsTrigger>
              <TabsTrigger value="truck">Trucks</TabsTrigger>
              <TabsTrigger value="hatchback">Hatchbacks</TabsTrigger>
            </TabsList>
            
            {['all', 'sedan', 'suv', 'crossover', 'truck', 'hatchback'].map(category => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredModels
                    .filter(model => category === 'all' || model.category === category)
                    .map((model, index) => (
                      <Card 
                        key={model.id} 
                        className="overflow-hidden hover-lift animate-fade-in" 
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={model.image} 
                            alt={model.name}
                            className="w-full h-full object-cover image-parallax"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>{model.name}</CardTitle>
                          <CardDescription className="flex flex-wrap gap-2 mt-2">
                            {model.connectorTypes.map(type => (
                              <Badge key={type} variant="outline" className="bg-gray-50">
                                {type}
                              </Badge>
                            ))}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Range</p>
                              <p className="font-medium">{model.range}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Battery</p>
                              <p className="font-medium">{model.batterySize}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm text-gray-500">Fast Charging</p>
                              <p className="font-medium">{model.chargingSpeed}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4">
                          <Badge className={`bg-gradient-to-r from-ev-blue to-ev-green`}>
                            {model.category.charAt(0).toUpperCase() + model.category.slice(1)}
                          </Badge>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
                
                {filteredModels.filter(model => category === 'all' || model.category === category).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No vehicles found matching your search criteria.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-16 bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold mb-4">Find Compatible Charging Stations</h3>
            <p className="text-gray-600 mb-6">
              Once you've identified your vehicle's connector type, you can easily find compatible charging stations
              using our station finder. Filter by connector type to ensure you only see stations that work with your vehicle.
            </p>
            <div className="flex justify-center">
              <a href="/find-stations" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-ev-blue to-ev-green hover:from-ev-blue hover:to-ev-indigo">
                Find Charging Stations
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EVModels;
