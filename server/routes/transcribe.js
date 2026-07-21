import express from "express";
import fs from "fs";
import upload from "../middleware/upload.js";

import { downloadAudio } from "../services/downloader.js";
import { transcribeAudio } from "../services/whisper.js";
import { translateToEnglish } from "../services/translator.js";
import { generateSRT } from "../utils/srt.js";

const router = express.Router();

router.post("/", upload.single("audio"), async (req, res) => {
  console.log("\n==============================");
  console.log("📥 New transcription request");
  console.log("==============================");

  let audioPath = null;

  try {
    const {
      url,
      outputFormat = "txt",
      maxWords = "Auto",
    } = req.body;

    // Decide source
    if (req.file) {
      console.log("🎵 Uploaded MP3:", req.file.filename);
      audioPath = req.file.path;
    } else if (url) {
      console.log("🎥 URL:", url);

      console.log("⬇️ Downloading...");
      audioPath = await downloadAudio(url);
      console.log("✅ Download complete");
    } else {
      return res.status(400).json({
        success: false,
        message: "Provide either a URL or an MP3 file.",
      });
    }

    console.log("📝 Transcribing...");
    const transcript = await transcribeAudio(audioPath);
    console.log("✅ Done");

    console.log("🌐 Translating...");
    const english = await translateToEnglish(transcript.transcript);
    console.log("✅ Done");

    if (outputFormat === "srt") {
      const srt = generateSRT(english, maxWords);

      return res.json({
        success: true,
        language: transcript.language,
        srt,
      });
    }

    return res.json({
      success: true,
      language: transcript.language,
      transcript: english,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    // Delete uploaded MP3 after processing
    if (req.file && audioPath && fs.existsSync(audioPath)) {
      fs.unlink(audioPath, () => {});
    }
  }
});

export default router;