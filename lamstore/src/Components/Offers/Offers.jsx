import React from 'react'
import './Offers.css'
import hero_img from '../Assets/img/Transparent/hamper1.png';

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers for you</h1>
            <p>ONLY ON BEST SELLER PRODUCTS</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={hero_img} alt="" />
        </div>
    </div>
  )
}

export default Offers;