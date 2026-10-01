import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import { uploadDatasetFile } from "../controllers/uploadController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/dataset", upload.single("file"), uploadDatasetFile);

export default router;
