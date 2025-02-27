import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import route from './routes/userroutes.js';
import nodemailer from 'nodemailer'
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_CON = process.env.MONGO_CON;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_CON, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error(" Database connection error:", err));

// Multer Setup (For File Uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// Serve Static Files (Uploaded Images)
app.use("/uploads", express.static("uploads"));

// Use Routes
app.use("/api/studio", route);

const otpStore = {};
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use 587 if 465 doesn’t work
  secure: true, // Use `false` for port 587
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
  },
  tls: {
      rejectUnauthorized: false,
  },
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  otpStore[email] = otp;

  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
  };

  try {
      let info = await transporter.sendMail(mailOptions);
      console.log("Email sent: ", info.response);
      console.log("Stored OTP:", otpStore[email]);
      res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
      console.error("Email sending error: ", error);
      res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  console.log("Stored OTP:", otpStore[email]);
  console.log("Received OTP:", otp);

  if (otpStore[email] && otpStore[email] === otp) {
      delete otpStore[email]; // Remove OTP after verification
      res.json({ success: true, message: "OTP verified" });
  } else {
      res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(` Backend running on port ${PORT}`);
});

// Export Multer Middleware (for use in routes)
export { upload };
