import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const processImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const base64Image = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;

    // Step 1: Identify ingredients
    const visionResponse = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: `data:${mimeType};base64,${base64Image}` },
            },
            {
              type: "text",
              text: "List food items you see. Comma separated list. If none, say 'NO_INGREDIENTS'.",
            },
          ],
        },
      ],
    });

    const detectedIngredients = visionResponse.choices[0].message.content;

    if (detectedIngredients.includes("NO_INGREDIENTS")) {
      return res.status(400).json({ message: "No food detected." });
    }
    // Step 2 & 3: Generate Highly Detailed Structured JSON Recipes
    const recipeResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a professional Michelin-star chef who outputs only valid JSON. You provide extremely detailed, professional instructions.",
        },
        {
          role: "user",
          content: `Generate 5 unique, gourmet recipes using these ingredients: ${detectedIngredients}. 
          Return a JSON object with a key "recipeList" containing an array of 5 objects.
          
          For the "instructions" array: 
          - Provide at least 6-8 detailed steps per recipe.
          - Include specific techniques (e.g., 'sauté until translucent', 'deglaze the pan', 'fold gently').
          - Include approximate timing for steps (e.g., 'simmer for 10-12 minutes').
          - Add a final 'Chef's Tip' as the last step in the instructions array.

          JSON Structure:
          {
            "recipeList": [
              {
                "title": "String",
                "ingredients": ["Quantity + Item", "Quantity + Item"],
                "instructions": ["Detailed Step 1...", "Detailed Step 2...", "Chef's Tip: ..."],
                "difficulty": "Easy/Medium/Hard",
                "prepTime": "String (e.g. 15 mins)"
              }
            ]
          }`,
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 3500, // Increased tokens because the instructions are now longer/detailed
    });

    const structuredData = JSON.parse(
      recipeResponse.choices[0].message.content,
    );
    // Step 4: Final Response
    res.status(200).json({
      message: "Image processed successfully",
      items: detectedIngredients,
      recipes: structuredData.recipeList, // This is now an array!
    });
  } catch (error) {
    console.log("Full error:", error);
    res.status(500).json({ message: error.message });
  }
};
