import express from "express";
import {
  saveRecipe,
  getMyRecipes,
} from "../controller/saveRecipieController.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.post("/save", authMiddleware, saveRecipe);
router.get("/my-recipes", authMiddleware, getMyRecipes);
export default router;
