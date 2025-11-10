import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Zap, Clock, Star } from 'lucide-react';

export interface StationProps {
  id?: string;
  _id?: string;
  name?: string;
  address?: string;
  distance?: string;
  rating?: number;
  powerOutput?: string;
  connectorTypes?: string[];
  availableNow?: number;
  price?: string;
  amenities?: string[];
}

export function StationCard({
  station,
  onBookingClick,
}: {
  station: StationProps;
  onBookingClick: (stationId: string) => void;
}) {
  const {
    id,
    _id,
    name = "Unknown Station",
    address = "Address not available",
    distance = "N/A",
    rating = 4.5,
    powerOutput = "Fast Charger",
    connectorTypes = [],
    availableNow = 0,
    price = "₹—/kWh",
    amenities = [],
  } = station;

  const safeId = id || _id || ""; // handles both local mock and MongoDB

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
              {address}
            </CardDescription>
          </div>
          <Badge
            variant={availableNow > 0 ? "default" : "secondary"}
            className={availableNow > 0 ? "bg-ev-green" : ""}
          >
            {availableNow > 0 ? `${availableNow} Available` : "Busy"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex justify-between text-sm mb-2">
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-1 text-ev-blue" />
            <span>{powerOutput}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-ev-blue" />
            <span>{distance}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-500" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Connector Types */}
        <div className="flex gap-1 flex-wrap mb-3">
          {connectorTypes.length > 0 ? (
            connectorTypes.map((type) => (
              <Badge key={type} variant="outline" className="text-xs bg-gray-50">
                {type}
              </Badge>
            ))
          ) : (
            <Badge variant="outline" className="text-xs bg-gray-50">
              Type info unavailable
            </Badge>
          )}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1">
          {amenities && amenities.length > 0 ? (
            <>
              {amenities.slice(0, 3).map((amenity) => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{amenities.length - 3} more
                </Badge>
              )}
            </>
          ) : (
            <Badge variant="secondary" className="text-xs">
              No amenities listed
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2 flex justify-between items-center">
        <span className="font-medium">{price}</span>
        <Button
          size="sm"
          className="bg-gradient-to-r from-ev-blue to-ev-green hover:from-ev-blue hover:to-ev-indigo"
          onClick={() => onBookingClick(safeId)}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
