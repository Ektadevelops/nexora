export const getHealth = (req, res) => {
  res.json({
    success: true,
    message: "Nexora API is running",
  });
};
