import React from 'react'
import ReactStars from "react-rating-stars-component"
import { Link } from 'react-router-dom'
function ProductCard({ product }) {
    const option = {
        edit: false,
        color: "rgda(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size:window.innerWidth<600?20:25,
        value: product.ratings,
        isHalf:true
    }
  return (
      <Link className='productCard' to={`/product/${product._id}`}>
          <img src={product.images[0].url} alt={ product.public_id} />
          <p>{product.name}</p>
          <div>
              <ReactStars {...option} /><span>{ product.numOfreviews}( Reviews)</span>
          </div>
          <span>₹{ product.price}</span>
      </Link>
  )
}

export default ProductCard
