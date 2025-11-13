import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  User,
  Calendar,
  Clock,
  Zap,
  LogOut,
  ArrowLeft,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { API_BASE_URL } from "@/config"; // ✅ Import centralized API URL

interface Booking {
  _id: string;
  stationName: string;
  connectorType: string;
  bookingDate: string;
  timeSlot: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface Profile {
  email: string | null;
  full_name: string | null;
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // 📦 Fetch Profile + Bookings
  useEffect(() => {
    const fetchProfileAndBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        setProfile({
          email: user?.email || "user@example.com",
          full_name: user?.user_metadata?.name || "EV User",
        });

        // ✅ Use API_BASE_URL instead of localhost
        const res = await fetch(`${API_BASE_URL}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error loading profile:", err);
        toast.error("Failed to load profile or bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndBookings();
  }, [user]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    toast.success("Signed out successfully");
    navigate("/");
  };

  // 🗑️ Cancel booking
  const handleCancelBooking = async (bookingId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Not authorized");

      // ✅ Updated delete URL to use API_BASE_URL
      const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to cancel booking");

      toast.success("Booking cancelled successfully");
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
    } catch (err) {
      console.error("Cancel booking error:", err);
      toast.error("Failed to cancel booking");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* ✅ Top Bar with Back + Sign Out */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border-2 hover-lift"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-ev-blue to-ev-green bg-clip-text text-transparent">
            My Profile
          </h1>

          <Button
            variant="outline"
            onClick={handleSignOut}
            className="flex items-center gap-2 hover-lift border-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* ✅ Profile Info */}
        <Card className="mb-8 hover-lift animate-slide-in-left border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-ev-blue to-ev-green">
                <User className="h-5 w-5 text-white" />
              </div>
              Account Information
            </CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-transparent border border-blue-100">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Email
              </p>
              <p className="text-base font-semibold">
                {profile?.email || "N/A"}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-transparent border border-green-100">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Full Name
              </p>
              <p className="text-base font-semibold">
                {profile?.full_name || "Not set"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ✅ Bookings */}
        <Card className="hover-lift animate-slide-in-right border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-ev-blue to-ev-green">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              Recent Bookings
            </CardTitle>
            <CardDescription>
              {bookings.length > 0
                ? `You have ${bookings.length} booking${
                    bookings.length > 1 ? "s" : ""
                  }`
                : "No bookings yet"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-ev-blue to-ev-green rounded-full flex items-center justify-center animate-float">
                  <Zap className="h-12 w-12 text-white" />
                </div>
                <p className="text-muted-foreground mb-4">
                  You haven’t made any bookings yet
                </p>
                <Button
                  onClick={() => navigate("/find-stations")}
                  className="bg-gradient-to-r from-ev-blue to-ev-green hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Find Charging Stations
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking, index) => (
                  <div
                    key={booking._id || index}
                    className="border-2 rounded-lg p-4 hover:border-ev-blue transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {booking.stationName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.bookingDate).toLocaleDateString(
                            "en-IN",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : "secondary"
                        }
                        className={`text-white ${
                          booking.status === "cancelled"
                            ? "bg-gray-400"
                            : "bg-gradient-to-r from-ev-blue to-ev-green"
                        }`}
                      >
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 p-2 rounded-md bg-blue-50">
                        <Clock className="h-4 w-4 text-ev-blue" />
                        <span className="font-medium">{booking.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-md bg-green-50">
                        <Zap className="h-4 w-4 text-ev-green" />
                        <span className="font-medium">
                          {booking.connectorType}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Total Amount
                      </span>
                      <span className="font-bold text-lg bg-gradient-to-r from-ev-blue to-ev-green bg-clip-text text-transparent">
                        ₹{booking.totalAmount}
                      </span>
                    </div>

                    {booking.status === "confirmed" && (
                      <Button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="mt-3 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
                      >
                        <XCircle className="h-4 w-4" />
                        Cancel Booking
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
