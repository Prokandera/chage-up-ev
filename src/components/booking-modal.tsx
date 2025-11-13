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
import { Clock, CheckCircle, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationId: string;
  stationName: string;
  connectorTypes: string[];
}

export function BookingModal({
  isOpen,
  onClose,
  stationId,
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
    AC: 60,
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

  const calculatePrice = () => {
    if (!selectedConnector) return 0;
    return connectorPricing[selectedConnector] || 80;
  };

  const handleNext = async () => {
    // 🛑 Step validation
    if (step === 1 && !date) return toast.error("Please select a date.");
    if (step === 2 && !selectedConnector)
      return toast.error("Please select a connector type.");
    if (step === 3 && selectedSlot === null)
      return toast.error("Please select a time slot.");

    // 🟢 Final step — Send booking request
    if (step === 3) {
      const token = localStorage.getItem("token");

      if (!user || !token) {
        toast.error("Please sign in to complete booking.");
        navigate("/auth?mode=login");
        handleClose();
        return;
      }

      const bookingDate = date?.toISOString().split("T")[0] || "";
      const timeSlot =
        timeSlots.find((slot) => slot.id === selectedSlot)?.time || "";

      const bookingData = {
        stationId,
        stationName,
        connectorType: selectedConnector,
        bookingDate,
        timeSlot,
        totalAmount: calculatePrice(),
      };

      console.log("📦 Sending Booking Payload:", bookingData);

      // 🧪 Backend-required fields check
      if (!stationName || !selectedConnector || !bookingDate || !timeSlot) {
        toast.error("Missing required booking fields.");
        return;
      }

      try {
        setLoading(true);

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

        console.log("✅ Booking Successful:", data);
        setBookingComplete(true);
        toast.success("Booking Confirmed!");
      } catch (err: any) {
        console.error("❌ Booking Error:", err);
        toast.error(err.message || "Failed to create booking");
      } finally {
        setLoading(false);
      }
    } else {
      setStep((prev) => prev + 1);
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

            {/* Step 1 - Date */}
            {step === 1 && (
              <div className="py-4">
                <h4 className="text-sm font-medium mb-3">Select Date</h4>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) =>
                    d < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  className="rounded-md border mx-auto"
                />
              </div>
            )}

            {/* Step 2 - Connector */}
            {step === 2 && (
              <div className="space-y-4 py-4">
                <h4 className="text-sm font-medium mb-2">Choose Connector</h4>
                <div className="grid grid-cols-2 gap-3">
                  {connectorTypes.map((type) => (
                    <Button
                      key={type}
                      variant={
                        selectedConnector === type ? "default" : "outline"
                      }
                      className={`w-full ${
                        selectedConnector === type
                          ? "bg-gradient-to-r from-ev-blue to-ev-green text-white"
                          : ""
                      }`}
                      onClick={() => setSelectedConnector(type)}
                    >
                      <Zap className="h-4 w-4 mr-1" />
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 - Time slot */}
            {step === 3 && (
              <div className="space-y-4 py-4">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-ev-blue" /> Select Time Slot
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={
                        selectedSlot === slot.id ? "default" : "outline"
                      }
                      onClick={() => setSelectedSlot(slot.id)}
                      className={`${
                        selectedSlot === slot.id
                          ? "bg-gradient-to-r from-ev-blue to-ev-green text-white"
                          : ""
                      }`}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>

                <div className="mt-4 flex justify-between items-center border-t pt-3">
                  <p className="text-sm text-gray-500">Estimated Price:</p>
                  <p className="text-lg font-semibold text-ev-green">
                    ₹{calculatePrice()}
                  </p>
                </div>
              </div>
            )}

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
