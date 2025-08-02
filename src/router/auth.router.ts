import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createUser,
  loginUser,
  getUserProfile,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
} from "../controller/auth.controller";

const router = Router();

//  Public Authentication
router.post("/sign-up", createUser);
router.post("/sign-in", loginUser);

//  Email Verification & MFA
router.post("/verify-email", verifyEmail);

//  Password Reset
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

//  User Profile (Authenticated)
router.get("/me", authenticate, getUserProfile);

export default router;
