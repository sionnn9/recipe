import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const processImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const base64Image = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;

    // Step 1: Identify fruits and vegetables from image
    const visionResponse = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
            {
              type: "text",
              text: "List all the food ingredients you see in this image including vegetables, fruits, meat, fish, dairy, cheese, and any other food items. If there are none, respond with exactly 'NO_INGREDIENTS'. Just give me a comma separated list, nothing else.",
            },
          ],
        },
      ],
    });

    const detectedIngredients = visionResponse.choices[0].message.content;

    // Step 2: Check if anything was detected
    if (detectedIngredients.includes("NO_INGREDIENTS")) {
      return res.status(400).json({
        message:
          "No fruits or vegetables detected. Please upload a clearer image.",
      });
    }

    // Step 3: Generate 5 different recipes
    const recipeResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Give me 5 different and unique recipes using these ingredients: ${detectedIngredients}. 
          For each recipe include:
          - Recipe name
          - Ingredients with quantities
          - Step by step instructions
          
          Separate each recipe clearly with a numbered heading like "Recipe 1:", "Recipe 2:", etc.`,
        },
      ],
      max_tokens: 2000,
    });

    const recipes = recipeResponse.choices[0].message.content;

    res.status(200).json({
      message: "Image processed successfully",
      ingredients: detectedIngredients,
      recipes: recipes,
    });
  } catch (error) {
    console.log("Full error:", error);
    res.status(500).json({ message: error.message });
  }
};
