import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import twilio from "twilio";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

/* ------------------------------------
   📩 Mailtrap Email Transport
------------------------------------ */
const emailTransport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    },
});

/* ------------------------------------
   📱 Twilio Client
------------------------------------ */
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

/* ------------------------------------
   ✅ SIGNUP ROUTE (SMS + EMAIL both)
------------------------------------ */
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

        /* ---------------------
           📩 SEND WELCOME EMAIL
        ---------------------- */
        try {
            await emailTransport.sendMail({
                from: "admin@evchargeup.com",
                to: email,
                subject: "Welcome to ChargeUp ⚡",
                text: `Hi ${name}, your account has been successfully created! 🚀`,
            });
        } catch (emailErr) {
            console.error("Email Error:", emailErr.message);
        }

        /* ---------------------
           📱 SEND SMS
        ---------------------- */
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
            message: "User registered successfully! Email + SMS sent.",
        });

    } catch (err) {
        console.error("Signup error:", err.message);
        res.status(500).json({ error: "Server error during signup." });
    }
});

/* ------------------------------------
   ✅ LOGIN ROUTE + EMAIL ON LOGIN
------------------------------------ */
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

        // 📱 SEND LOGIN SMS

        try {
    await twilioClient.messages.create({
        body: `🔐 Login Alert!\nHi ${user.name}, you have successfully logged in to ChargeUp.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.mobile,
    });
} catch (smsError) {
    console.error("SMS Error:", smsError.message);
}
            
        /* ---------------------
           📩 SEND LOGIN EMAIL
        ---------------------- */
        try {
            await emailTransport.sendMail({
                from: "admin@evchargeup.com",
                to: email,
                subject: "Login Successful ✔",
                text: `Hi ${user.name}, you have successfully logged in to ChargeUp! ⚡`,
            });
        } catch (emailErr) {
            console.error("Login Email Error:", emailErr.message);
        }

        res.status(200).json({
            message: "Login successful! Email sent.",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });

    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ error: "Server error during login." });
    }
});

export default router;
