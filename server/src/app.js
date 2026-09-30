import express from "express";

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Nexora API",
  });
});

app.listen(PORT, () => {
  console.log(`Nexora server running on http://localhost:${PORT}`);
});
