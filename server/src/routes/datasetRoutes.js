import express from "express";

import {
  createDataset,
  getDatasets,
  getDataset,
  updateDataset,
  deleteDataset,
} from "../controllers/datasetController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createDataset);

router.get("/", getDatasets);

router.get("/:id", getDataset);

router.put("/:id", updateDataset);

router.delete("/:id", deleteDataset);

export default router;
