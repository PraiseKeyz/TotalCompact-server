import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} from "../controller/contact.controller";
// import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

// Public routes (for contact form submissions)
router.post("/", createContact);

// Admin routes (protected - you might want to add auth middleware later)
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.delete("/:id", deleteContact);

export default router; 