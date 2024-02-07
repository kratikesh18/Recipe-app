import React from 'react'
import {Link} from 'react-router-dom'

function RecipeItem({ item }) {
  return (
    <div className='flex flex-col w-80 overflow-hidden p-5 shadow-2xl hover:scale-105 transition-all duration-150 bg-white/75  gap-5 border  rounded-2xl border-black/50'>

      <div className='h-40 flex justify-center items-center overflow-hidden rounded-xl'>
        <img src={item?.image_url}  className='block w-full'/>
      </div>

      <div className='flex flex-col gap-3 items-start'>
        <span className='text-sm text-cyan-600 font-medium'>{item?.publisher}</span>
        <h3 className='font-bold text-lg  text-black'>{item?.title}</h3>
        <Link to={`/recipe-item/${item?.id}`} 
        className=' text-sm p-3 px-6 w-fit rounded-lg uppercase font-medium tracking-wider  shadow-md bg-black text-white'> Read More </Link>
      </div>
    </div>
  )
}

export default RecipeItem