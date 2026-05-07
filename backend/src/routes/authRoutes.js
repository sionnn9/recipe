import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {
  registerUser,
  loginUser,
  logincheck,
  logoutUser,
} from "../controller/authController.js";

import "../config/passport.js";

dotenv.config();

const router = express.Router();

// ================= NORMAL AUTH =================

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/checklogin", logincheck);

router.post("/logout", logoutUser);

// ================= GOOGLE AUTH =================

// Redirect to Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

// Google callback route
router.get(
  "/google/callback",

  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),

  (req, res) => {
    // Create JWT
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Redirect frontend
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  },
);

export default router;
