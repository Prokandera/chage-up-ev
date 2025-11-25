import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import stationRoutes from "./routes/stations.js";
import bookingRoutes from "./routes/bookings.js";
import authenticateToken from "./middleware/authmiddleware.js";
import cancelBookingRoute from "./routes/cancelBooking.js";


dotenv.config();

const app = express();

// ------------------------
// ✅ ABSOLUTE CORS FIX
// ------------------------
const allowedOrigins = [
    "https://chage-up-ev.vercel.app", // your deployed frontend
    "http://localhost:5173", // vite dev
    "http://localhost:3000", // react dev
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

// parse json
app.use(express.json());

// ------------------------
// ✅ MongoDB connect
// ------------------------
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ------------------------
// ✅ Routes
// ------------------------
app.use("/api/auth", authRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/cancel-booking", cancelBookingRoute);

// ------------------------
// ✅ Tiwlio
// ------------------------

const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


app.get("/", (req, res) => res.send("⚡ Server running & connected!"));

// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
