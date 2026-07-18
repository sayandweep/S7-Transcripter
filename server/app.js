import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transcribeRoutes from "./routes/transcribe.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://transship.sayandweep.in"
  ]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "S7 Transcriber API is running 🚀",
  });
});

app.use("/api/v1/transcribe", transcribeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});