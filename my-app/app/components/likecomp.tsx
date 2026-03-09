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
  isInitiallySaved = false,
  onUnsave,
}: {
  recipeId: string;
  recipeName: string;
  ingredients: Array<string>;
  prepTime: string;
  difficulty: string;
  instructions: Array<string>;
  isInitiallySaved?: boolean;
  onUnsave?: () => void;
}) => {
  const [active, setActive] = useState(isInitiallySaved);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    if (isLoading) return; // Prevent multiple clicks

    try {
      setIsLoading(true);

      if (active) {
        // Unsave: call delete API
        const res = await fetch(
          `http://localhost:5001/api/delete/${recipeId}`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Failed to unsave recipe");
        }

        console.log("Recipe unsaved");
        onUnsave?.(); // Call callback to remove from list
      } else {
        // Save: call save API
        const res = await fetch("http://localhost:5001/api/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            recipeId,
            recipeName,
            ingredients,
            prepTime,
            difficulty,
            instructions,
          }),
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Failed to save recipe");
        }

        const data = await res.json();
        console.log("Recipe saved:", data);
      }

      setActive(!active); // Toggle heart
    } catch (error) {
      console.error("Error toggling save:", error);
      alert("Failed to toggle save. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        filter: active ? "drop-shadow(0 0 8px rgba(255, 0, 0, 0.8))" : "none",
        transition: "filter 0.3s ease",
      }}
    >
      <Heart width={24} height={24} active={active} onClick={handleToggle} />
    </div>
  );
};
