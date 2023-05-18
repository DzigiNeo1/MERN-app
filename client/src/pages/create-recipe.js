import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../components/hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export const CreateRecpie = () => {
  const [cookies, _] = useCookies("access_token");
  const navigate = useNavigate();
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handelIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="create-recipe">
      <h2>CreateRecpie</h2>
      <form className="form-recipe" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            type="text"
            key={idx}
            name="ingredients"
            value={ingredient}
            onChange={(event) => handelIngredientChange(event, idx)}
          />
        ))}
        <button onClick={addIngredients} type="button">
          Add Ingredients
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
