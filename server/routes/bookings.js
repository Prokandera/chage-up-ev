import express from "express";
import Booking from "../models/Booking.js";
import authenticateToken from "../middleware/authmiddleware.js";

const router = express.Router();

// ✅ POST /api/bookings — Create new booking
router.post("/", authenticateToken, async(req, res) => {
    console.log("📩 Incoming booking request:", req.body);
    console.log("👤 Authenticated user:", req.user);

    try {
        const {
            stationId,
            stationName,
            connectorType,
            bookingDate,
            timeSlot,
            totalAmount,
        } = req.body;

        if (!req.user) {
            console.log("❌ No user found in req.user");
            return res.status(401).json({ error: "Unauthorized - Token missing or invalid" });
        }

        if (!stationName || !connectorType || !bookingDate || !timeSlot) {
            console.log("❌ Missing fields:", req.body);
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newBooking = new Booking({
            userId: req.user.id,
            stationId: stationId || null,
            stationName,
            connectorType,
            bookingDate,
            timeSlot,
            totalAmount: totalAmount || 0,
            status: "confirmed",
            createdAt: new Date(),
        });

        await newBooking.save();
        console.log("✅ Booking created successfully:", newBooking);

        res.status(201).json({
            message: "Booking created successfully",
            booking: newBooking,
        });
    } catch (err) {
        console.error("❌ Error creating booking:", err.message);
        res.status(500).json({ error: "Failed to create booking", details: err.message });
    }
});

// ✅ GET /api/bookings — Fetch user’s bookings
router.get("/", authenticateToken, async(req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error("❌ Error fetching bookings:", err);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
});

export default router;