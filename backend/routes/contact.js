const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, query } = req.body || {};

  if (!name || !email || !query) {
    return res.status(400).json({ message: "Name, email, and query are required." });
  }

  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({
        message: "Email service is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Boolean(process.env.SMTP_SECURE === "true"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const receiver = process.env.CONTACT_RECEIVER || process.env.SMTP_USER;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: receiver,
      subject: `New contact form message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${query}\n`,
    });

    return res.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact email failed:", error);
    return res.status(500).json({ message: "Failed to send message." });
  }
});

module.exports = router;
