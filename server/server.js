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
app.use(cors());
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


console.log("✅ Registering protected route...");

// ✅ Protected Route Example
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({
        message: "Access granted ✅ You are authorized!",
        userId: req.user.id
    });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`)
);