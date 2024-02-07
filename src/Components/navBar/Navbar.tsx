import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import GlobalState, { RecipieContext } from "../../Context";

function Navbar() {
  const {searchParams , setSetsearchParams , handleOnSubmit} = useContext(RecipieContext)

  return (
    <nav className="flex justify-between items-center py-6 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">

      <h2 className="text-2xl font-semibold">
        <NavLink to={"/"}>
          Recipe of the Item
        </NavLink>
      </h2>

      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search Items...."
          className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200"
          value={searchParams}
          onChange={(e) => setSetsearchParams(e.target.value)}
        />
      </form>
      
      <ul className="flex gap-5 ">
        <li>
          <NavLink
            to={"/"}
            className={"text-black hover:text-gray-600 duration-150"}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/favourites"}  
            className={"text-black hover:text-gray-600 duration-150"}
          >
            favourites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
