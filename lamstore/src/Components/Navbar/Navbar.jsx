import React, { useContext, useState, useRef } from 'react'
import './Navbar.css';
import logo from '../Assets/Icons/logo.svg';
import cart from '../Assets/Icons/cart3.svg';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/Icons/hamburger.svg'

export const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
    
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" height="35"/>.
            <p>LAM</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={() => {setMenu("shop")}}><Link style={{textDecoration: 'none', color: 'black'}} to='/'>Shop</Link> {menu==="shop" ? <hr/> : <></>}</li>
            <li onClick={() => {setMenu("skincare")}}><Link style={{textDecoration: 'none', color: 'black'}} to="/skincare">Skincare</Link>{menu==="skincare" ? <hr/> : <></>}</li>
            <li onClick={() => {setMenu("body")}}><Link style={{textDecoration: 'none', color: 'black'}} to="/body">Body and hair</Link>{menu==="body" ? <hr/> : <></>}</li>
            <li onClick={() => {setMenu("makeup")}}><Link style={{textDecoration: 'none', color: 'black'}} to="/makeup">Makeup</Link>{menu==="makeup" ? <hr/> : <></>}</li>
        </ul>
        <div className="nav-login-cart">
            {localStorage.getItem('auth-token') ? <button onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button> : <Link to="/login"><button>Login</button></Link>
            }            
            <Link to="/cart"><img src={cart} alt="" height="25"/></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

