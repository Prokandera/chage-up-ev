import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { SearchFilters } from "@/components/search-filters";
import { StationCard } from "@/components/station-card";
import { MapView } from "@/components/map-view";
import { BookingModal } from "@/components/booking-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, ArrowLeft } from "lucide-react";
import { API_BASE_URL } from "@/config"; // ✅ centralized API base URL

const FindStations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // ✅ Fetch stations dynamically from backend
  useEffect(() => {
    const fetchStations = async () => {
      try {
        console.log("🌐 Fetching stations from:", `${API_BASE_URL}/stations`);

        const response = await fetch(`${API_BASE_URL}/stations`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // ✅ Include this to handle Render + Vercel CORS safely
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch stations: ${response.status}`);
        }

        const data = await response.json();
        setStations(data);
      } catch (err: any) {
        console.error("❌ Station fetch error:", err);
        setError(err.message || "Unable to fetch stations");
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  // ✅ Filter stations by name or address
  const filteredStations = stations.filter(
    (station) =>
      station.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStation = stations.find((s) => s._id === selectedStationId);

  const handleBookingClick = (stationId: string) => {
    setSelectedStationId(stationId);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-32 h-32 bg-primary/5 rounded-full animate-float" />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-secondary/5 rounded-full animate-float-delayed" />
        <svg
          className="absolute top-1/3 left-10 w-16 h-16 text-primary/10 animate-spin-slow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center mb-6 gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-ev-blue hover:text-ev-green transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span className="font-medium">Back</span>
          </button>

          <h1 className="text-3xl font-bold text-foreground animate-slide-in-left gradient-text">
            Find Charging Stations
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="w-full lg:w-1/2">
            <div className="flex items-center mb-4 relative">
              <MapPin className="absolute left-3 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by location or station name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-16"
              />
              <Button
                className="absolute right-1 bg-gradient-to-r from-ev-blue to-ev-green hover:from-ev-blue hover:to-ev-indigo"
                size="sm"
              >
                <Search className="h-4 w-4 mr-1" />
                Search
              </Button>
            </div>

            <SearchFilters />

            <div className="mt-6">
              <Tabs defaultValue="list">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="list" className="flex-1">
                    List View
                  </TabsTrigger>
                  <TabsTrigger value="map" className="flex-1">
                    Map View
                  </TabsTrigger>
                </TabsList>

                {/* ✅ List View */}
                <TabsContent value="list">
                  {loading && (
                    <p className="text-gray-500 text-center mt-4">
                      Loading stations...
                    </p>
                  )}
                  {error && (
                    <p className="text-red-500 text-center mt-4">
                      Error: {error}
                    </p>
                  )}
                  {!loading && !error && filteredStations.length === 0 && (
                    <p className="text-gray-500 text-center mt-4">
                      No stations found for your search.
                    </p>
                  )}
                  {!loading && !error && filteredStations.length > 0 && (
                    <div className="grid gap-4">
                      {filteredStations.map((station, index) => (
                        <div
                          key={station._id || index}
                          className="animate-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <StationCard
                            station={station}
                            onBookingClick={() => handleBookingClick(station._id)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* ✅ Map View */}
                <TabsContent value="map">
                  <div className="h-[600px] rounded-lg overflow-hidden">
                    <MapView
                      stations={filteredStations}
                      onBookingClick={handleBookingClick}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* ✅ Side Map for desktop */}
          <div className="hidden lg:block w-1/2">
            <div className="h-[600px] rounded-lg overflow-hidden">
              <MapView
                stations={filteredStations}
                onBookingClick={handleBookingClick}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* ✅ Booking Modal */}
      {selectedStation && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          stationName={selectedStation.name}
          connectorTypes={selectedStation.connectorTypes}
        />
      )}
    </div>
  );
};

export default FindStations;
