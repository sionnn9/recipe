"use client";
import React, { useState } from "react";
import Heart from "@react-sandbox/heart";

export const LikeComponent = ({
  recipeId,
  recipeName,
  ingredients,
  prepTime,
  difficulty,
  instructions,
}: {
  recipeId: string;
  recipeName: string;
  ingredients: Array<string>;
  prepTime: string;
  difficulty: string;
  instructions: Array<string>;
}) => {
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (isLoading) return; // Prevent multiple clicks

    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:5001/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Moved to correct place
        body: JSON.stringify({
          recipeId,
          recipeName,
          ingredients,
          prepTime,
          difficulty,
          instructions,
        }), // ✅ Use actual recipeId prop
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to save recipe");
      }

      const data = await res.json();
      console.log("Recipe saved:", data);

      setActive(!active); // ✅ Toggle heart
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Failed to save recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Heart width={24} height={24} active={active} onClick={handleSave} />
    </div>
  );
};
