import React from 'react';
import './Hero.css';
import arrow_icon from '../Assets/Icons/arrow-right-circle.svg';
// import hero_img from '../Assets/img/heroTransparent.png';
import hero_img from '../Assets/img/transparentHere.png';
// import hero_img from '../Assets/img/transparentHero.png';

// : Where Beauty Meets Confidence.
const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>Discover Your Radiance</h2>
            <p>Elevate Your Beauty Journey with Our Signature Cosmetic Collection</p>
            <div className="hero-latest-btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
        </div>
        </div>
        
        <div className="hero-right">
            <img src={hero_img} alt="" height="650"/>

        </div>
    </div>
  )
}

export default Hero;