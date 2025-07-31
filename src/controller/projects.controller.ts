import { Request, Response } from 'express';
import Project from '../model/projects';
import logger from '../config/logger';
import { sendResponse } from "../utils/apiResponse";

// Create a new project
const createProject = async (req: Request, res: Response) => {
  const project = new Project(req.body);
  if (!project) {
    res.status(400).json({ message: 'Missing fields required' });
    return;
  }
      // Check if images were uploaded
      if (req.files && Array.isArray(req.files)) {
        project.images = req.files.map((file, index) => ({
          url: file.path
        }));
      }
  try {
    const savedProject = await project.save();
    res.status(201).json({
      message: 'Project created successfully',
      data: savedProject
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

// Get all projects
const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      message: 'Projects retrieved successfully',
      data: projects
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

// Get a single project by ID
const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json({
      message: 'Project retrieved successfully',
      data: project
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

// Update a project
const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    if (req.files && Array.isArray(req.files)) {
        project.images = req.files.map((file, index) => ({
          url: file.path,
          caption: req.body.imageCaptions?.[index] || '',
        }));
      }
    res.status(200).json({
      message: 'Project updated successfully',
      data: project
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

// Delete a project
const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json({
      message: 'Project deleted successfully'
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
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
};