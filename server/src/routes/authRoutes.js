import express from "express";

import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.get("/admin-test", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin! You have access.",
  });
});

export default router;
