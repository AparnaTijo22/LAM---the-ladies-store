import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Items/Item'

const RelatedProducts = (props) => {
    const {product} = props;
    const[related_products, setrelated_products] = useState([]);
    useEffect(() => {
      fetch(`http://localhost:4000/relatedproducts/${product.category}`).then((resp) => resp.json()).then((data) => setrelated_products(data))
    }, [product.category])

  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {related_products.map((item,i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} style={{ width: '10px', height: '10px' }}/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts;