import express from express;
import { upload } from "../controller/uploadController";

const router =express.router;

router.post("/uploads",upload);

export default router;