import express from express;
import { uploadImage } from "../controller/uploadController";

const router =express.router;

router.post("/uploads",uploadImage);

export default router;