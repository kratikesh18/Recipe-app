
import './App.css'
import {Routes,Route  } from 'react-router-dom'


import Home from './Pages/home/Home.js'
import Favourites from './Pages/ favourites/Favourites.js'
import Details from './Pages/details/Details.js'
import Navbar from './Components/navBar/Navbar.js'
function App() {
  
  return (
    <div>

      <div className='min-h-screen p-6 bg-white text-gray-700 text-lg'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/favourites' element={<Favourites/>}></Route>
          <Route path='/recipe-item/:id' element={<Details/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
