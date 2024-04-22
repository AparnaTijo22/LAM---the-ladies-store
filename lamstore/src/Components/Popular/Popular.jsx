import React, { useEffect, useState } from 'react'
import './Popular.css';
import Item from '../Items/Item';

const Popular = () => {

  const[data_product, setData_product] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/popularinskincare").then((resp) => resp.json()).then((data) => setData_product(data))
  }, [])

  return (
    <div className='popular'>
        <h1>POPULAR IN SKINCARE</h1>
        <hr />
        <div className="popular-item">
            {data_product.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} style={{ width: '10px', height: '10px' }} />
            })}
        </div>
    </div>
  )
}

export default Popular;