import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons (Leaflet bug in Webpack/Vite)
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
});

interface Station {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  stations: Station[];
}

const MapView: React.FC<MapProps> = ({ stations }) => {
  const defaultPosition: [number, number] = [19.076, 72.8777]; // Mumbai coords (change as needed)

  return (
    <MapContainer
      {...({ center: defaultPosition } as any)}
      zoom={12}
      style={{ height: "80vh", width: "100%", borderRadius: "1rem" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        {...({ attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>' } as any)}
      />

      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
        >
          <Popup>
            <strong>{station.name}</strong>
            <br />
            Type: Fast Charger
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
