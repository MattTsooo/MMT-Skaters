import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {generateSelfEmailHTML, 
        generateSelfEmailText, 
        generateCustomerEmailHTML, 
        generateCustomerEmailText} from './email.js';
import { dir } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env')});

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

app.get('/book', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.post('/book', async (req,res) => {
  const {name, email, phone, lessonType, date, message } = req.body;

  if(!name || !email || !lessonType || !date) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['name', 'email', 'lessonType', 'date']
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({error: 'Invalid email format'});
  }

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  try {
    const selfEmail = {
      from: `"MMT Skaters Booking" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Lesson Booking Request - ${name}`,
      html: generateSelfEmailHTML(name, email, phone, lessonType, formattedDate, message),
      text: generateSelfEmailText(name, email, phone, lessonType, formattedDate, message)
    };

    const customerEmail = {
      from: `"MMT Skaters" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Skating Lesson Request - MMT Skaters',
      html: generateCustomerEmailHTML(name, lessonType, formattedDate),
      text: generateCustomerEmailText(name, lessonType, formattedDate)
    };

    await Promise.all([
      transporter.sendMail(selfEmail),
      transporter.sendMail(customerEmail)
    ]);

    console.log(`Booking confirmed for ${name} (${email})`);

    res.status(200).json({
      message: 'Booking request sent successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error){
    console.error('Email sending failed:', error);
    res.status(500).json({
      error: 'Failed to process booking request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
  

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));