import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import mailTestRoute from "./routes/mailTest.js";


// Routes
import authRoutes from "./routes/auth.js";
import stationRoutes from "./routes/stations.js";
import bookingRoutes from "./routes/bookings.js";
import cancelBookingRoute from "./routes/cancelBooking.js";

// Twilio
import twilio from "twilio";

dotenv.config();

const app = express();

// ------------------------
// ✅ CORS FIX
// ------------------------
const allowedOrigins = [
    "https://chage-up-ev.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
];

const isVercelPreview = (origin) =>
    origin && origin.endsWith(".vercel.app");

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin) || isVercelPreview(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }

    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
});

// parse JSON
app.use(express.json());

// ------------------------
// ✅ MongoDB Connection
// ------------------------
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Error:", err));

// ------------------------
// ✅ Twilio Client (GLOBAL)
// ------------------------
export const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// ------------------------
// Test SMS Route
// ------------------------
app.post("/api/send-sms", async (req, res) => {
    try {
        const { mobile } = req.body;

        if (!mobile) {
            return res.status(400).json({ message: "Mobile number is required" });
        }

        const sms = await twilioClient.messages.create({
            body: "Hello from ChargeUp EV ⚡",
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobile,
        });

        res.json({ message: "SMS sent", sid: sms.sid });
    } catch (error) {
        res.status(500).json({ message: "SMS failed", error: error.message });
    }
});

// ------------------------
// API Routes
// ------------------------
app.use("/api/auth", authRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/cancel-booking", cancelBookingRoute);

//  ADD THIS ROUTE
app.use("/api", mailTestRoute);

// Home route
app.get("/", (req, res) => res.send("⚡ Server running successfully!"));

// ------------------------
// Start Server
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
);



