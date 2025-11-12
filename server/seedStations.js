// server/seedStations.js
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { Station } from "./models/Station.js"; // adjust path if your model lives elsewhere

const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/chargeup";

const sampleStations = [{
        name: "ChargeUp EV Station - Connaught Place",
        address: "Inner Circle, Connaught Place, New Delhi",
        latitude: 28.6315,
        longitude: 77.2167,
        connectorTypes: ["Type2", "CCS2"],
        availablePorts: 4,
        pricing: "₹80/kWh",
        openHours: "6 AM - 11 PM",
    },
    {
        name: "ChargeUp EV Station - South Extension",
        address: "E Block, South Extension II, New Delhi",
        latitude: 28.5366,
        longitude: 77.2243,
        connectorTypes: ["CCS2", "CHAdeMO"],
        availablePorts: 3,
        pricing: "₹100/kWh",
        openHours: "7 AM - 11 PM",
    },
    {
        name: "Ather Grid - Select Citywalk Saket",
        address: "Select Citywalk Mall, Saket, New Delhi",
        latitude: 28.5246,
        longitude: 77.2066,
        connectorTypes: ["Type2"],
        availablePorts: 2,
        pricing: "₹85/kWh",
        openHours: "8 AM - 10 PM",
    },
    {
        name: "ChargeUp EV Station - Dwarka Sector 12",
        address: "Sector 12, Dwarka, New Delhi",
        latitude: 28.5929,
        longitude: 77.0179,
        connectorTypes: ["Type2", "CCS2"],
        availablePorts: 3,
        pricing: "₹75/kWh",
        openHours: "24x7",
    },
    {
        name: "Tata Power EZ Charge - South Extension",
        address: "South Extension II, New Delhi",
        latitude: 28.5357,
        longitude: 77.2245,
        connectorTypes: ["CCS2", "Type2"],
        availablePorts: 2,
        pricing: "₹90/kWh",
        openHours: "6 AM - 12 AM",
    }
];

async function main() {
    await mongoose.connect(MONGO, {});
    console.log("Connected to MongoDB. Seeding stations...");
    // optional: remove existing sample stations (be careful)
    // await Station.deleteMany({ name: /ChargeUp|Ather|Tata Power/ });

    const inserted = await Station.insertMany(sampleStations);
    console.log("Inserted", inserted.length, "stations.");
    await mongoose.disconnect();
    process.exit(0);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});