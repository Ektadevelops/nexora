import express from "express";
import cors from "cors";

import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import datasetRoutes from "./routes/datasetRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/datasets", datasetRoutes);
app.use("/api/uploads", uploadRoutes);

export default app;
