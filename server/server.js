import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import stationRoutes from "./routes/stations.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config();
const app = express();

// ✅ Proper CORS setup for Render + Vercel
const allowedOrigins = [
    "https://chage-up-ev.vercel.app", // your frontend (Vercel)
    "http://localhost:5173", // local dev
    "http://localhost:3000", // optional if needed
];

// ✅ Proper CORS setup
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    // If you want to allow all origins for testing, use:
    // res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
    );

    // Handle preflight quickly
    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    next();
});


app.use(express.json());

console.log("🚀 Starting Charge-Up Backend...");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
    res.send("⚡ Backend running and connected to MongoDB!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));