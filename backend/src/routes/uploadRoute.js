import express from "express";
import upload from "../middleware/upload.js";
import { processImage } from "../controller/uploadController.js";

const router = express.Router();

router.post("/analyze", upload.single("image"), processImage);

export default router;
