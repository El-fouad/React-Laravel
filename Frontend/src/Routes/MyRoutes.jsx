import React from 'react'
import {Routes , Route} from "react-router-dom"
import HomePage from '../Pages/HomePage'
import About from '../Pages/About'
import Products from '../Pages/Products'
import Login from '../Pages/Login'
import DetailProduct from '../Pages/DetailProduct'
const MyRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' index element={<HomePage/>}/>
        <Route path='/About' index element={<About/>}/>
        <Route path='products' index element={<Products/>}/>
        <Route path='products/:id' element={<DetailProduct/>}/>
        <Route path='/Login' index element={<Login/>}/>
    </Routes>

    </>
  )
}

export default MyRoutes