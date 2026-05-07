import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoute from "./routes/uploadRoute.js";
import multer from "multer";
import saveRecipieRoute from "./routes/saveRecipieRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import "./config/passport.js";
const app = express();
const PORT = process.env.Port || 5001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Make sure Authorization is allowed!
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use((req, res, next) => {
  console.log(`req method ${req.method} and url is ${req.url}`);
  next();
});

app.use("/api/auth", authRoutes);

app.use("/api/ai", uploadRoute);

app.use("/api", saveRecipieRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
  });
});
