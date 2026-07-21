import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
  
    cb(
      null,
      `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "audio/mpeg") {
    cb(null, true);
  } else { 
    cb(new Error("Only MP3 files are allowed"), false);
  }
};

export default multer({
  storage,
  fileFilter,
});