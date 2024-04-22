import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">
                Description
            </div>
            <div className="descriptionbox-nav-box fade">
                Reviews (122)
            </div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe nisi qui dignissimos, quidem doloremque explicabo distinctio beatae laboriosam dicta odit perspiciatis natus doloribus alias quibusdam assumenda, officiis numquam maiores id?
            Iure error quae rem. Optio ratione quis nesciunt, et, minus delectus nostrum, laboriosam a odio quam in ab impedit fugit numquam sed? Ut inventore, cum eius harum voluptate minus illo.</p>
        </div>
    </div>
  )
}

export default DescriptionBox;