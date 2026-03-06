import express from "express";
import { registerUser, loginUser } from "../controller/authController.js";
import { logincheck } from "../controller/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/checklogin", logincheck);
export default router;
