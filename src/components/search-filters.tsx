
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sliders, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function SearchFilters() {
  const [isOpen, setIsOpen] = useState(false);
  const [distance, setDistance] = useState([5]);
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState(true);
  
  const connectorTypes = [
    'CCS', 'CHAdeMO', 'Type 2', 'J1772', 'Tesla'
  ];
  
  const toggleConnector = (connector: string) => {
    if (selectedConnectors.includes(connector)) {
      setSelectedConnectors(selectedConnectors.filter(c => c !== connector));
    } else {
      setSelectedConnectors([...selectedConnectors, connector]);
    }
  };
  
  const clearFilters = () => {
    setDistance([5]);
    setSelectedConnectors([]);
    setAvailableOnly(true);
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Sliders className="h-4 w-4" />
          Filters
          {(selectedConnectors.length > 0 || distance[0] !== 5 || !availableOnly) && (
            <Badge className="bg-ev-blue ml-1 h-5 w-5 p-0 flex items-center justify-center">
              {selectedConnectors.length + (distance[0] !== 5 ? 1 : 0) + (!availableOnly ? 1 : 0)}
            </Badge>
          )}
        </Button>
        
        <div className="flex gap-2">
          {selectedConnectors.map(connector => (
            <Badge 
              key={connector} 
              variant="secondary" 
              className="flex items-center gap-1"
            >
              {connector}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleConnector(connector)} 
              />
            </Badge>
          ))}
          {(selectedConnectors.length > 0 || distance[0] !== 5 || !availableOnly) && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-gray-500"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="grid gap-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Distance</h3>
              <div className="px-2">
                <Slider 
                  value={distance} 
                  min={1} 
                  max={50} 
                  step={1} 
                  onValueChange={setDistance} 
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1 mile</span>
                  <span>{distance[0]} miles</span>
                  <span>50 miles</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Connector Types</h3>
              <div className="flex flex-wrap gap-2">
                {connectorTypes.map(connector => (
                  <Badge 
                    key={connector} 
                    variant={selectedConnectors.includes(connector) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedConnectors.includes(connector) 
                        ? "bg-gradient-to-r from-ev-blue to-ev-green" 
                        : ""
                    }`}
                    onClick={() => toggleConnector(connector)}
                  >
                    {connector}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="available" 
                  checked={availableOnly} 
                  onCheckedChange={setAvailableOnly}
                />
                <Label htmlFor="available">Available now only</Label>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-ev-blue to-ev-green hover:from-ev-blue hover:to-ev-indigo"
                onClick={() => setIsOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
