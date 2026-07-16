import express from "express";
import { downloadAudio } from "../services/downloader.js";
import { transcribeAudio } from "../services/whisper.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Video URL is required",
      });
    }

    const audioPath = await downloadAudio(url);
    const transcript = await transcribeAudio(audioPath);

    return res.json({
      success: true,
      ...transcript,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;