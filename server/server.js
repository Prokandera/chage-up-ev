import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
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
app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log("❌ Blocked by CORS:", origin);
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// ✅ Explicitly ensure the header is always sent
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
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