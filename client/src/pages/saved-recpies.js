import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../components/hooks/useGetUserID";
export const SavedRecipes = () => {
  const [allSavedRecipes, setAllSavedRecipes] = useState([]);
  const userID = useGetUserID();
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setAllSavedRecipes(response.data.savedRecipes);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedRecipes();
  }, [setAllSavedRecipes, allSavedRecipes]);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {allSavedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
