import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDirectory = "uploads";

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".xlsx", ".csv"];

  const extension = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Only .xlsx and .csv files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;
