import authenticateToken from "./middleware/authmiddleware.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import stationRoutes from "./routes/stations.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config();

const app = express();

// -----------------------------
// ✅ Proper CORS Configuration
// -----------------------------
const allowedOrigins = [
    "https://chage-up-ev.vercel.app", // your frontend URL on Vercel
    "http://localhost:5173", // optional: for local dev
    "http://localhost:8080"
];

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true); // allow non-browser requests
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                console.log("❌ Blocked by CORS:", origin);
                return callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// -----------------------------
// Middleware & JSON Parser
// -----------------------------
app.use(express.json());

// --- Startup message ---
console.log("🚀 Starting Charge-Up Backend...");

// --- MongoDB Connection ---
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/bookings", bookingRoutes);

// --- Test Route ---
app.get("/", (req, res) => {
    res.send("⚡ Server is running and connected to MongoDB!");
});

// --- Protected Route ---
console.log("✅ Registering protected route...");
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({
        message: "Access granted ✅ You are authorized!",
        userId: req.user.id,
    });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`)
);