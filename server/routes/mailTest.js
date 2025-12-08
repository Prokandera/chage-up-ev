import express from "express"
import { sendMail } from "../utils/sendMail.js";



const router = express.Router();

router.get("/test-mail", async(req, res) => {
    try {
        await sendMail(
            "yourEmail@gmail.com", // jis par mail aayega
            "Nodemailer Test 🚀",
            "Sunny bhai, Nodemailer successful chal raha hai!"
        );

        res.json({ message: "Mail sent successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Mail failed", details: err.message });
    }
});

export default router;