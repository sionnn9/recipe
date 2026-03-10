import express from "express";
import {
  saveRecipe,
  getMyRecipes,
} from "../controller/saveRecipieController.js";
import authMiddleware from "../middleware/auth.js";
import { deleteRecipe } from "../controller/saveRecipieController.js";
import { getRecipeById } from "../controller/saveRecipieController.js";
const router = express.Router();

router.post("/save", authMiddleware, saveRecipe);
router.get("/my-recipes", authMiddleware, getMyRecipes);
router.get("/recipes/:recipeId", authMiddleware, getRecipeById);
router.delete("/delete/:recipeId", authMiddleware, deleteRecipe);
export default router;
