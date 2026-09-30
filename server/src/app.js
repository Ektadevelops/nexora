import express from "express";

const app = express();

const PORT = 5000;

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Nexora API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Nexora server running on http://localhost:${PORT}`);
});
