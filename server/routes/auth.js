import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();

/**
 * ✅ POST /api/auth/signup
 * Registers a new user
 */
const twilio = require("twilio");

// Twilio client setup
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;

        // 🔍 Validate input
        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // 🔍 Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // 🔒 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🧾 Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            mobile,
        });

        await newUser.save();

        // 📩 Send Welcome SMS with Twilio
        await client.messages.create({
            body: `🎉 Hi ${name}! Welcome to our platform.\nYour signup was successful. Enjoy the experience! 🚀`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobile,
        });

        // 🎉 Successful Signup Response
        res.status(201).json({
            message: "User registered successfully! SMS sent.",
        });

    } catch (err) {
        console.error("❌ Signup error:", err.message);
        res.status(500).json({ error: "Server error during signup." });
    }
});


/**
 * ✅ POST /api/auth/login
 * Authenticates a user and returns a JWT token
 */
router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        // 🔍 Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // 🔍 Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // 🔒 Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // 🪪 Generate JWT
        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET, { expiresIn: "1d" } // token valid for 1 day
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        console.error("❌ Login error:", err.message);
        res.status(500).json({ error: "Server error during login." });
    }
});

export default router;
