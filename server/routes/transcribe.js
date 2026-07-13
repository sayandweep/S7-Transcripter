import express from "express";

const router = express.Router();

// POST /api/v1/transcribe
router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Video URL is required",
      });
    }

    console.log("Received URL:", url);

    // We'll replace this with real transcription later
    return res.json({
      success: true,
      metadata: {
        title: "Demo Video",
        thumbnail: "https://placehold.co/640x360",
        platform: "youtube",
        duration: "00:00",
      },
      transcript: "Transcription will appear here...",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;