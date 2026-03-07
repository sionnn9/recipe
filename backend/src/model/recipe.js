import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipeName: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    prepTime: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
