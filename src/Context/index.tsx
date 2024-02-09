import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Recipe {
  id: string;
  title: string;
  publisher: string;
  image_url: string;
}

interface GlobalStateProps{
  children : React.ReactNode
}

export interface RecipeContextValue {
  searchParams: string;
  setSearchParams: React.Dispatch<React.SetStateAction<string>>;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  // Add other properties as needed
  loading: boolean;
  recipeList: Recipe[];
  recipeDetails?: Recipe;
  setRecipeDetails: React.Dispatch<React.SetStateAction<Recipe | undefined>>;
  handleAddToFavourites: (getCurrentItem: Recipe) => void;
  favouriteList: Recipe[];
}



export const RecipieContext = createContext<RecipeContextValue | undefined>(undefined);

export default function GlobalState( {children}:GlobalStateProps ) {
  const [searchParams, setSearchParams] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  const [recipeDetails, setRecipeDetails] = useState<Recipe | undefined>();

  const [favouriteList, setFavouriteList] = useState<Recipe[]>([]);

  const navigate = useNavigate();

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    try {
      const response = (
        await axios.get(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}`
        )
      ).data;

      if (response?.data?.recipes) {
        setRecipeList(response?.data?.recipes);
      }

      setLoading(false);
      setSearchParams("");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setSearchParams("");
    }
  }

  function handleAddToFavourites(getCurrentItem: Recipe) {
    let copyOfFavList = [...favouriteList];
    const index = copyOfFavList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      copyOfFavList.push(getCurrentItem);
    } else {
      copyOfFavList.splice(index, 1);
    }

    setFavouriteList(copyOfFavList);
  }
  console.log("Favourite list is ", favouriteList);
  return (
    <RecipieContext.Provider

      value={{
        searchParams,
        setSearchParams,
        handleOnSubmit,
        loading,
        recipeList,
        recipeDetails,
        setRecipeDetails,
        handleAddToFavourites,
        favouriteList,
      }}
    >
      {children}
    </RecipieContext.Provider>
  );
}
