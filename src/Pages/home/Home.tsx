import React, { useContext } from "react";
import { RecipieContext } from "../../Context";
import RecipeItem from "../../Components/recipeList/RecipeItem";
import Spinner from "../../Components/Spinner";

function Home() {
  const { recipeList, loading, searchParams } = useContext(RecipieContext);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {recipeList && recipeList.length > 0 ? (
          recipeList.map((item) => <RecipeItem key={item.id} item={item} />)
        ) : (
          <p className="lg:text-2xl text-xl text-center text-black font-bold">
            Nothing to Show. search for results{" "}
          </p>
        )}
      </div>
    );
  }
}

export default Home;
