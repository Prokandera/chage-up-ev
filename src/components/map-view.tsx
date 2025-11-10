import { useEffect } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";

// 🧭 Fix Leaflet marker icons (required for React builds)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Station {
  _id?: string;
  name?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  connectorTypes?: string[];
}

interface MapViewProps {
  stations: Station[];
  onBookingClick: (stationId: string) => void;
}

// ✅ Utility to recenter map when stations change
function RecenterOnStations({ stations }: { stations: Station[] }) {
  const map = useMap();

  useEffect(() => {
    const validStations = stations.filter((s) => s.latitude && s.longitude);
    if (validStations.length > 0) {
      const bounds = L.latLngBounds(validStations.map((s) => [s.latitude!, s.longitude!]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [stations, map]);

  return null;
}

export function MapView({ stations, onBookingClick }: MapViewProps) {
  const defaultPosition: [number, number] = [28.6139, 77.2090]; // Delhi default

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden">
      <LeafletMap
        center={defaultPosition as [number, number]}
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterOnStations stations={stations} />

        {stations.map((station, index) => {
          if (!station.latitude || !station.longitude) return null;

          return (
            <Marker key={station._id || index} position={[station.latitude, station.longitude]}>
              <Popup>
                <div className="text-sm font-semibold mb-1">
                  {station.name || "Unknown Station"}
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {station.address || "No address"}
                </div>
                <Button
                  size="sm"
                  className="bg-ev-blue text-white text-xs"
                  onClick={(e) => {
                    // ✅ Prevent click from bubbling
                    e.stopPropagation();

                    // ✅ Close popup before opening booking modal
                    const map = (e.target as HTMLElement).closest('.leaflet-container') as any;
                    if (map && map._leaflet_id) {
                      const leafletMap = (map as any)._leaflet_map;
                      if (leafletMap && leafletMap.closePopup) leafletMap.closePopup();
                    }

                    // ✅ Trigger booking modal from parent
                    onBookingClick(station._id || "");
                  }}
                >
                  Book Now
                </Button>
              </Popup>
            </Marker>
          );
        })}
      </LeafletMap>
    </div>
  );
}
