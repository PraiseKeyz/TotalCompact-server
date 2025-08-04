import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} from "../controller/contact.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

// Public routes (for contact form submissions)
router.post("/", createContact);

// Admin routes (protected - you might want to add auth middleware later)
router.get("/", authenticate, getAllContacts);
router.get("/:id", authenticate, getContactById);
router.delete("/:id", authenticate, deleteContact);

export default router; 