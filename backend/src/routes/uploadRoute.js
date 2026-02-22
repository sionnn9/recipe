import express from "express";
import upload from "../middleware/upload.js";
import { processImage } from "../controller/uploadController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/analyze", authMiddleware, upload.single("image"), processImage);

export default router;
