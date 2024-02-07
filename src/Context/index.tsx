import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const RecipieContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParams, setSetsearchParams] = useState("");
  const [loading, setLoading] = useState(false);

  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);

  const [favouriteList, setFavouriteList] = useState([])

  const navigate  = useNavigate()
  async function handleOnSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const response = (
        await axios.get(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}`
        )
      ).data;

      
      // const data= await response.json()

      console.log(response);

      if (response?.data?.recipes) {
        setRecipeList(response?.data?.recipes);
      }
      setLoading(false);
      setSetsearchParams("");
      navigate('/')
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setSetsearchParams("");
    }
  }
  
  function handleAddToFavourites(getCurrentItem){
    console.log(getCurrentItem);
    let copyOfFavList = [...favouriteList]
    const index = copyOfFavList.findIndex(item => item.id === getCurrentItem.id)

    if(index === -1){

      copyOfFavList.push(getCurrentItem)
    }
    else{
      copyOfFavList.splice(index)
    }
    

    setFavouriteList(copyOfFavList)
  }
  console.log("Favourite list is " , favouriteList)
  return (
    <RecipieContext.Provider
      value={{
        searchParams,
        setSetsearchParams,
        handleOnSubmit,
        loading,
        recipeList,
        recipeDetails,
        setRecipeDetails,
        handleAddToFavourites,
        favouriteList
      }}
    >
      {children}
    </RecipieContext.Provider>
  );
}
