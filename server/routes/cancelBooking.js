import express from "express";
import Booking from "../models/Booking.js";
import { Station } from "../models/Station.js";

const router = express.Router();

// CANCEL BOOKING
// CANCEL BOOKING + REFUND PROCESS
router.delete("/:bookingId", async(req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const stationId = booking.stationId;

        // ⭐ Refund = full amount for now
        const refundAmount = booking.totalAmount;

        // 1. Update booking instead of deleting (for history)
        booking.status = "cancelled";
        booking.refundStatus = "processed";
        booking.refundAmount = refundAmount;
        await booking.save();

        // 2. Make station available again
        await Station.findByIdAndUpdate(stationId, { available: true });

        return res.json({
            message: "Booking cancelled & refund processed",
            refundAmount,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});

export default router;