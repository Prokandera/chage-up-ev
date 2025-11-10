import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    stationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        required: false, // ✅ optional
        default: null,
    },

    stationName: {
        type: String,
        required: true,
    },
    connectorType: {
        type: String,
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    timeSlot: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["confirmed", "cancelled", "completed"],
        default: "confirmed",
    },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);