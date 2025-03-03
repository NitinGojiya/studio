import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import route from './routes/userroutes.js';
import nodemailer from 'nodemailer'
import Video from './model/Video.js';
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
// imageupload
const PhotoSchema = new mongoose.Schema({
  name: String,
  path: String,
  email: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});
const Photo = mongoose.model('Photo', PhotoSchema);

app.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const { email } = req.body; // Get email from the request body

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
      const newPhoto = new Photo({
        
          name: req.file.originalname,
          path: `/uploads/${req.file.filename}`,
          email: email,
      });
      await newPhoto.save();
      res.json({ message: 'File uploaded successfully', file: newPhoto });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
app.get('/photos', async (req, res) => {
  const photos = await Photo.find();
  res.json(photos);
});

app.delete('/photos/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const photo = await Photo.findById(id);

      if (!photo) {
          return res.status(404).json({ message: 'Photo not found' });
      }
      await Photo.findByIdAndDelete(id);
      res.json({ message: 'Photo deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
// imageupload end
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
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
            <h2 style="color: #333;">Your One-Time Password (OTP) From Studio.com</h2>
            <p style="font-size: 18px;">Use the following OTP to complete your verification process:</p>
            <h3 style="background: #f8f8f8; padding: 10px; display: inline-block; border-radius: 5px;">
                <strong>${otp}</strong>
            </h3>
            <p style="color: #666; font-size: 14px;">This OTP is valid for only 10 minutes. Do not share it with anyone.</p>
            <hr style="margin: 20px 0;">
            <p style="font-size: 12px; color: #888;">If you didn’t request this code, you can safely ignore this email.</p>
            <p style="font-size: 12px; color: #888;">And Report  this email.<a href="nitingojiya.vercel.app">nitingojiya.vercel.app</a></p>
        </div>
    `,
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

//video upload
app.post("/videoupload", upload.single("video"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const { email } = req.body; // Get email from the request body

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
  const video = new Video({
    filename: req.file.filename,
    videoUrl: `http://localhost:8080/uploads/${req.file.filename}`,
    email:email,
  });

  try {
    await video.save();
    res.json({ message: "Video uploaded successfully", video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving video" });
  }
});

app.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving videos" });
  }
});

app.delete('/videos/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const photo = await Video.findById(id);

      if (!photo) {
          return res.status(404).json({ message: 'Photo not found' });
      }
      await Video.findByIdAndDelete(id);
      res.json({ message: 'video deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
//video upload end




// Start Server
app.listen(PORT, () => {
  console.log(` Backend running on port ${PORT}`);
});

// Export Multer Middleware (for use in routes)
export { upload };
