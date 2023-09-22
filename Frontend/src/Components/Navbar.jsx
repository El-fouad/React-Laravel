import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className='navbar'>
    <NavLink className="NavLink" to='/'>Home</NavLink>
    <NavLink className="NavLink" to='/About'>About</NavLink>
    <NavLink className="NavLink" to='/products'>Products</NavLink>
    <NavLink className="NavLink" to='/Login'>Login</NavLink>
    </div>
  )
}

export default Navbar