import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import twilio from "twilio";

const router = express.Router();

// -----------------------------
// ✅ Twilio Client (LOCAL)
// -----------------------------
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

/**
 * ✅ POST /api/auth/signup
 * Registers user + sends welcome SMS
 */
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;

        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            mobile,
        });

        await newUser.save();

        // 📩 Send Welcome SMS
        try {
            await twilioClient.messages.create({
                body: `🎉 Hi ${name}! Welcome to ChargeUp.\nSignup successful! ⚡🚗`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: mobile,
            });
        } catch (smsError) {
            console.error("SMS Error:", smsError.message);
        }

        res.status(201).json({
            message: "User registered successfully! SMS sent.",
        });

    } catch (err) {
        console.error("Signup error:", err.message);
        res.status(500).json({ error: "Server error during signup." });
    }
});

/**
 * ✅ POST /api/auth/login
 * Authenticates user
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });

    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ error: "Server error during login." });
    }
});

export default router;

