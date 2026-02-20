import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.Port || 5001;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  console.log(`req method ${req.method} and url is ${req.url}`);
  next();
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
  });
});
