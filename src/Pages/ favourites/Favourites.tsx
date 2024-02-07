import React, { useContext } from 'react'
import RecipeItem from '../../Components/recipeList/RecipeItem'
import { RecipieContext } from '../../Context'

function Favourites() {
  const {favouriteList} = useContext(RecipieContext)

  
  return (


    <div className='py-8 container mx-auto flex flex-wrap justify-center gap-10'>
      {
        favouriteList && favouriteList.length > 0 ?
          favouriteList.map((item)=><RecipeItem key={item.id} item={item}/>)
        :
        <p className='lg:text-2xl text-xl text-center text-black font-bold'>Nothing to Show. Add something in in Favourites</p>
      }
    </div>
  )
}

export default Favourites