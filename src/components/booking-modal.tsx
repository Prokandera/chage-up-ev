import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clock, CreditCard, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config"; // ✅ centralized base URL

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationName: string;
  connectorTypes: string[];
}

export function BookingModal({
  isOpen,
  onClose,
  stationName,
  connectorTypes,
}: BookingModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [selectedConnector, setSelectedConnector] = useState<string | null>(
    connectorTypes[0] || null
  );
  const [step, setStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const connectorPricing: { [key: string]: number } = {
    "Type 2": 80,
    CCS: 120,
    CHAdeMO: 100,
    "DC Fast": 150,
    "Tesla Supercharger": 180,
    AC: 60,
  };

  const calculatePrice = () => {
    if (!selectedConnector || selectedSlot === null) return 0;
    const baseRate = connectorPricing[selectedConnector] || 80;
    return baseRate * 1; // 1 hour
  };

  const timeSlots = [
    { id: 1, time: "8:00 AM - 9:00 AM" },
    { id: 2, time: "9:00 AM - 10:00 AM" },
    { id: 3, time: "10:00 AM - 11:00 AM" },
    { id: 4, time: "11:00 AM - 12:00 PM" },
    { id: 5, time: "12:00 PM - 1:00 PM" },
    { id: 6, time: "1:00 PM - 2:00 PM" },
    { id: 7, time: "2:00 PM - 3:00 PM" },
    { id: 8, time: "3:00 PM - 4:00 PM" },
    { id: 9, time: "4:00 PM - 5:00 PM" },
  ];

  // ✅ Booking API Call
  const handleNext = async () => {
    if (step === 3) {
      const token = localStorage.getItem("token");
      if (!user || !token) {
        toast.error("Please sign in to complete booking");
        navigate("/auth?mode=login");
        handleClose();
        return;
      }

      try {
        setLoading(true);
        const bookingData = {
          stationName,
          connectorType: selectedConnector,
          bookingDate: date?.toISOString().split("T")[0],
          timeSlot: timeSlots.find((slot) => slot.id === selectedSlot)?.time,
          totalAmount: calculatePrice(),
        };

        console.log("📡 Posting booking to:", `${API_BASE_URL}/bookings`);

        const response = await fetch(`${API_BASE_URL}/bookings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
          body: JSON.stringify(bookingData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Booking failed");

        setBookingComplete(true);
        toast.success("✅ Booking confirmed!");
      } catch (err: any) {
        console.error("❌ Booking error:", err);
        toast.error(err.message || "Failed to create booking");
      } finally {
        setLoading(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleClose = () => {
    setDate(new Date());
    setSelectedSlot(null);
    setSelectedConnector(connectorTypes[0] || null);
    setStep(1);
    setBookingComplete(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        {!bookingComplete ? (
          <>
            <DialogHeader>
              <DialogTitle>Book a Charging Slot</DialogTitle>
              <DialogDescription>
                {stationName} | Step {step} of 3
              </DialogDescription>
            </DialogHeader>

            {/* simplified steps code (same as before) */}

            <DialogFooter className="flex justify-between">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              <Button
                className="bg-gradient-to-r from-ev-blue to-ev-green"
                onClick={handleNext}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : step === 3
                  ? "Complete Booking"
                  : "Next"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-10 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mt-3">Booking Confirmed!</h3>
            <Button
              className="w-full mt-4 bg-gradient-to-r from-ev-blue to-ev-green"
              onClick={() => {
                navigate("/profile");
                handleClose();
              }}
            >
              View My Bookings
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
