import Recipe from "../model/recipe.js";

export async function saveRecipe(req, res) {
  try {
    const { recipeName, ingredients, content } = req.body;

    const recipe = new Recipe({
      userId: req.user.userId, // comes from auth middleware
      recipeName,
      ingredients,
      content,
    });

    await recipe.save();
    res.status(201).json({ message: "Recipe saved successfully" });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function getMyRecipes(req, res) {
  try {
    const recipes = await Recipe.find({ userId: req.user.userId });
    if (recipes.length === 0) {
      return res
        .status(404)
        .json({ message: "No recipes found for this user" });
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: error.message });
  }
}
