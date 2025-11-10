
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const connectors = [
  {
    id: 'ccs',
    name: 'CCS (Combined Charging System)',
    description: 'The most common DC fast charging standard in North America and Europe.',
    speed: 'Up to 350 kW',
    compatibility: 'Most EVs except Tesla (without adapter)',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba13107bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'chademo',
    name: 'CHAdeMO',
    description: 'Direct current fast charging standard popular with Japanese EVs.',
    speed: 'Up to 100 kW',
    compatibility: 'Nissan Leaf, Mitsubishi Outlander PHEV',
    image: 'https://images.unsplash.com/photo-1554744512-783e8dc69b10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'tesla',
    name: 'Tesla Supercharger',
    description: 'Proprietary fast charging network for Tesla vehicles.',
    speed: 'Up to 250 kW',
    compatibility: 'Tesla vehicles, some non-Tesla with adapter in select regions',
    image: 'https://images.unsplash.com/photo-1601164283238-de62cc7f8855?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'type2',
    name: 'Type 2 (Mennekes)',
    description: 'Standard connector for AC charging in Europe.',
    speed: 'Up to 43 kW (AC)',
    compatibility: 'Most European and many global EV models',
    image: 'https://images.unsplash.com/photo-1647949849332-ab26fd564433?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'j1772',
    name: 'J1772 (Type 1)',
    description: 'Standard connector for AC charging in North America.',
    speed: 'Up to 19.2 kW (AC)',
    compatibility: 'Most North American EVs',
    image: 'https://images.unsplash.com/photo-1647949725174-d0042c2d1575?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
  }
];

export function EVConnectorGuide() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-2xl lg:text-center mb-12">
        <h2 className="text-base font-semibold leading-7 text-ev-blue">Charging Guide</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          EV Connector Types Explained
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Understanding the different types of connectors is essential for finding compatible charging stations for your electric vehicle.
        </p>
      </div>
      
      <Tabs defaultValue="ccs">
        <TabsList className="grid w-full grid-cols-5">
          {connectors.map(connector => (
            <TabsTrigger key={connector.id} value={connector.id}>{connector.name.split(' ')[0]}</TabsTrigger>
          ))}
        </TabsList>
        
        {connectors.map(connector => (
          <TabsContent key={connector.id} value={connector.id}>
            <Card>
              <CardHeader>
                <CardTitle>{connector.name}</CardTitle>
                <CardDescription>Charging connector standard</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={connector.image} 
                    alt={connector.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900">Description</h3>
                      <p className="text-gray-600">{connector.description}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Charging Speed</h3>
                      <p className="text-gray-600">{connector.speed}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Compatible With</h3>
                      <p className="text-gray-600">{connector.compatibility}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Badge className="bg-ev-blue">Connector Type</Badge>
                  {connector.id === 'ccs' || connector.id === 'chademo' || connector.id === 'tesla' ? 
                    <Badge className="bg-ev-green">DC Fast Charging</Badge> : 
                    <Badge variant="outline">AC Charging</Badge>
                  }
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-16 flex flex-col md:flex-row gap-6 bg-gray-50 p-6 rounded-lg">
        <div className="md:w-1/2">
          <h3 className="text-xl font-bold text-gray-900">Find compatible stations</h3>
          <p className="mt-2 text-gray-600">
            Use our station finder to locate charging points that are compatible with your vehicle's connector type.
            Filter by connector type, power output, and amenities to find the perfect charging spot.
          </p>
        </div>
        <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Pro Tip</h3>
          <p className="mt-2 text-gray-600">
            Many EVs can use multiple connector types with adapters.
            Check your vehicle's manual to see which adapters are compatible with your model.
          </p>
        </div>
      </div>
    </div>
  );
}
