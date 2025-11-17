// server.js
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// GET endpoint to test backend in browser
app.get('/book', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// POST endpoint for booking
app.post('/book', async (req, res) => {
  const { name, email, lessonType, message } = req.body;

  if (!name || !email || !lessonType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.verify()
  .then(() => console.log("✅ Gmail credentials are valid"))
  .catch(err => console.error("❌ Nodemailer login failed:", err));
  
  try {
    // Send email to yourself
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Lesson Booking from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nLesson: ${lessonType}\nMessage: ${message || '(none)'}`
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Lesson Booking Confirmed - MMT Skaters',
      text: `Hi ${name},\n\nThank you for booking with MMT Skaters! We'll reach out soon to confirm your lesson, finalize a time and date.\n\n- MMT Skaters`
    });

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
