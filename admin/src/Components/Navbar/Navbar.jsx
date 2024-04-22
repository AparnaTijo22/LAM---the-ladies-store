import React from 'react'
import './Navbar.css'
import nav_logo from '../../assets/Icons/L.png'
import nav_profile from '../../assets/Icons/profile.jpeg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='nav-logo' src={nav_logo} alt="" />
        <img className='nav-profile' src={nav_profile} alt="" />
    </div>
  )
}

export default Navbar