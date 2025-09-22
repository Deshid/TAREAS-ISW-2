import { Router } from "express";
import { login, register, updateProfile, deleteProfile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.patch("/profile/private", authMiddleware, updateProfile);
router.delete("/profile/private", authMiddleware, deleteProfile);

export default router;
