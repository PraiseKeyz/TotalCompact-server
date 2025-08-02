import express from "express";
import {
  createProject,
  updateProject,
  getAllProjects,
  getProjectById,
  deleteProject,
} from "../controller/projects.controller";
import { upload } from "../config/r2.config";

const router = express.Router();

router.post("/create", upload.array("images", 5), createProject);
router.put("/:id", upload.array("images", 5), updateProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProject);

export default router;
