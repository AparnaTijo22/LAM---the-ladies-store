import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Items/Item'

const NewCollections = () => {

  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/newcollection').then((resp) => resp.json()).then((data) => setNew_collection(data))
  }, [])

  return (
    <div className='new-collections'>
        <div className="collection-h">
            <h1>NEW COLLECTIONS</h1>
        </div>
        <hr />
        <div className="collections">
            {new_collection.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} style={{ width: '10px', height: '10px' }}/>
            })}
        </div>
    </div>
  )
}

export default NewCollections;