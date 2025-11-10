import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    connectorTypes: [{ type: String }], // e.g., ["Type2", "CCS", "CHAdeMO"]
    availablePorts: { type: Number, default: 1 },
    pricing: { type: String, default: "₹0.00/kWh" },
    openHours: { type: String, default: "24x7" },
    createdAt: { type: Date, default: Date.now },
});

export const Station = mongoose.model("Station", stationSchema);