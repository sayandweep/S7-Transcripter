import express from "express";
import { downloadAudio } from "../services/downloader.js";
import { transcribeAudio } from "../services/whisper.js";
import { translateToEnglish } from "../services/translator.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("\n==============================");
  console.log("📥 New transcription request");
  console.log("==============================");

  try {
    console.log("Request body:", req.body);

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Video URL is required",
      });
    }

    console.log("🎥 URL:", url);

    console.log("⬇️ Starting download...");
    const audioPath = await downloadAudio(url);
    console.log("✅ Download complete");

    console.log("📝 Starting transcription...");
    const transcript = await transcribeAudio(audioPath);
    console.log("✅ Transcription complete");

    console.log("🌐 Translating to English...");
    const english = await translateToEnglish(transcript.transcript);
    console.log("✅ Translation complete");

    console.log("📤 Sending response");

    return res.json({
      success: true,
      language: transcript.language,
      transcript: english,
      segments: transcript.segments,
    });

  } catch (error) {
    console.error("❌ ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;