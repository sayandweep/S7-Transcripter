import fs from "fs";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function transcribeAudio(audioPath) {
  try {
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-large-v3",
      response_format: "verbose_json",
    });

    const transcript = transcription.text || "";

    const segments = (transcription.segments || []).map((segment) => ({
      start: segment.start,
      end: segment.end,
      text: segment.text,
    }));

    return {
      success: true,
      language: transcription.language || "unknown",
      transcript,
      segments,
    };
  } catch (error) {
    console.error("Groq Whisper Error:", error);
  
    if (
      error.status === 413 ||
      error.error?.error?.code === "request_too_large"
    ) {
      throw {
        code: "VIDEO_TOO_LARGE",
        message: "Video exceeds the maximum supported size.",
      };
    }
  
    if (
      error.error?.error?.message?.toLowerCase().includes("no audio track")
    ) {
      throw {
        code: "NO_AUDIO_TRACK",
        message: "No audio track found in the uploaded video.",
      };
    }
  
    throw {
      code: "TRANSCRIPTION_FAILED",
      message: error.message || "Failed to transcribe audio.",
    };
  }
}