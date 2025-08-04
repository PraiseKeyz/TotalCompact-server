import { Request, Response } from "express";
import Contact from "../model/contact";
import logger from "../config/logger";
import { sendResponse } from "../utils/apiResponse";

// Create a new contact message
const createContact = async (req: Request, res: Response) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    
    res.status(201).json({
      message: "Contact message sent successfully",
      data: savedContact,
    });
  } catch (error) {
    logger.error("Contact creation failed - Internal server error", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    sendResponse({ res, status: 500, error: "Internal server error" });
    return;
  }
};

// Get all contact messages
const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Contact messages retrieved successfully",
      data: contacts,
    });
  } catch (error) {
    logger.error("Request failed - Internal server error", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    sendResponse({ res, status: 500, error: "Internal server error" });
    return;
  }
};

// Get a single contact message by ID
const getContactById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      res.status(404).json({ message: "Contact message not found" });
      return;
    }
    res.status(200).json({
      message: "Contact message retrieved successfully",
      data: contact,
    });
  } catch (error) {
    logger.error("Request failed - Internal server error", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    sendResponse({ res, status: 500, error: "Internal server error" });
    return;
  }
};

// Delete a contact message
const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      res.status(404).json({ message: "Contact message not found" });
      return;
    }
    res.status(200).json({
      message: "Contact message deleted successfully",
    });
  } catch (error) {
    logger.error("Request failed - Internal server error", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    sendResponse({ res, status: 500, error: "Internal server error" });
    return;
  }
};

export {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
};