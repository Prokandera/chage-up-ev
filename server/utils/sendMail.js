import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // .env load karne ke liye

// ✅ Mail Transporter
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, // e.g. sandbox.smtp.mailtrap.io
    port: process.env.MAIL_PORT, // e.g. 2525
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// ✅ Named Export (IMPORTANT)
export const sendMail = async(to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: `"ChargeUp" <no-reply@chargeup.com>`,
            to: to,
            subject: subject,
            text: text,
        });

        console.log("✅ Mail sent successfully:", info.messageId);
    } catch (error) {
        console.error("❌ Error sending mail:", error.message);
        throw error;
    }
};