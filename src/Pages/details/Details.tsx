import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RecipieContext } from "../../Context";
import axios from "axios";

function Details() {
  const { id } = useParams();
  const { recipeDetails, setRecipeDetails, handleAddToFavourites , favouriteList } = useContext(RecipieContext);

  useEffect(() => {
    async function fetchRecipeDetails() {
      const response = (
        await axios.get(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        )
      ).data;

      console.log(response);
      if (response?.data) {
        setRecipeDetails(response?.data);
      }
    }
    fetchRecipeDetails();
  }, []);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className=" row-start-2  lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group shadow-xl shadow-gray-800/40">
          <img
            src={recipeDetails?.recipe?.image_url}
            alt=""
            className="w-full h-full object-cover block group-hover:scale-105 duration-300 "
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 items-start ">
        <span className="text-base  text-cyan-600 font-medium">
          {recipeDetails?.recipe?.publisher}
        </span>
        <h3 className="font-bold text-2xl underline truncate text-black">
          {recipeDetails?.recipe?.title}
        </h3>

        <div>
          <button className="p-3 px-6 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white" onClick={() => handleAddToFavourites(recipeDetails?.recipe)} >
            {
             favouriteList.findIndex(item => item.id === recipeDetails?.recipe?.id ) !== -1 ?" Remove From Favourites" : "Add to Favourites"   
            }
          </button>
        </div>
      </div>

      <div>
        <span className="text-2xl font-semibold text-black">Ingredients</span>

        <ul className="flex flex-col gap-3">
          {
            recipeDetails?.recipe?.ingredients.map((ingredient) =>
              <li >
                <span className="text-xl font-semibold text-black"> {ingredient.quantity} {ingredient.unit}</span>
                <span className="text-2xl font-semibold text-black"> {ingredient.description}</span>
              </li>)
          }
        </ul>
      </div>
    </div>
  );
}

export default Details;
