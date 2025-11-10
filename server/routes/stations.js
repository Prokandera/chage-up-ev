import express from "express";
import { Station } from "../models/Station.js";
import authenticateToken from "../middleware/authmiddleware.js";

const router = express.Router();

// ✅ Add a new charging station (protected)
router.post("/", authenticateToken, async(req, res) => {
    try {
        const newStation = new Station(req.body);
        await newStation.save();
        res.status(201).json({ message: "Station added successfully!", newStation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get all charging stations (public)
router.get("/", async(req, res) => {
    try {
        const stations = await Station.find();
        res.status(200).json(stations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;