import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller";

const router = Router();

// Create profile
router.post("/", ProfileController.createProfile);

// Get all profiles (with filtering)
router.get("/", ProfileController.getAllProfiles);

// Get single profile
router.get("/:id", ProfileController.getProfile);

// Delete profile
router.delete("/:id", ProfileController.deleteProfile);

export default router;
