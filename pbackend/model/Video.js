import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    email:{ type: String, required: true },
  filename: { type: String, required: true },
  videoUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
