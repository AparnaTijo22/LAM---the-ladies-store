import React from 'react'
import './Footer.css'
import instagram_icon from '../Assets/Icons/instagram.svg'
import whatsapp_icon from '../Assets/Icons/whatsapp.svg'
import facebook_icon from '../Assets/Icons/facebook.svg'
import pinterest_icon from '../Assets/Icons/pinterest.svg'
import logo from '../Assets/Icons/logo.svg'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={logo} alt= "" height="40"/>
            <p>LAM</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icon-container">
                <img src={instagram_icon} alt=''/>
            </div>
            <div className="footer-icon-container">
                <img src={facebook_icon} alt=''/>
            </div>
            <div className="footer-icon-container">
                <img src={pinterest_icon} alt=''/>
            </div>
            <div className="footer-icon-container">
                <img src={whatsapp_icon} alt=''/>
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @2023 - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer;