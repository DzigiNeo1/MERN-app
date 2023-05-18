import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../components/hooks/useGetUserID";
import { useCookies } from "react-cookie";
export const Home = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const [recipes, setRecipes] = useState([]);
  const [allSavedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
    fetchSavedRecipes();
  }, [recipes,allSavedRecipes]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };
  const isRecipeSaved = (id) => allSavedRecipes.includes(id);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {allSavedRecipes.includes(recipe._id) && <h1>ALREADY SAVED</h1>}
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
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
