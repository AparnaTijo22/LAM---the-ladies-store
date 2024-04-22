import React from 'react'
import './Breadcrums.css'
import chevron_icon from '../Assets/Icons/chevron-right.svg';

const Breadcrums = (props) => {
    const {product} = props;
  return (
    <div className='breadcrums'>
        HOME <img src={chevron_icon} alt="" /> SHOP <img src={chevron_icon} alt="" /> {product.category} <img src={chevron_icon} alt="" /> {product.name}
    </div>
  )
}

export default Breadcrums;