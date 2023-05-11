import React, { Fragment, useEffect } from 'react'
import Product from "./ProductCard"
import MetaData from '../layout/MetaData.js'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../redux/Actions/productAction.js'
import Loader from '../layout/Loader/Loader.js'
function Home() {
  const dispatch = useDispatch();
   
  const { loading, products, error  } = useSelector(state => state.products)
  console.log(products);
  useEffect(() => {
    if (error) {
      alert("error")
    }
    dispatch(getProduct())
  },[dispatch,error])
/*   const product = {
    name: "TShirt",
    image: [{ url: "https://w0.peakpx.com/wallpaper/180/708/HD-wallpaper-girl-smile-bags-shopping.jpg" }],
    price: "3000",
    _id:"anksuh"
  } */
  return (
    <Fragment>
      {loading?<Loader/>:<Fragment>
      <MetaData title="Shopkart"/>
      <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Click me 😊
              </button>
            </a>
          </div>

      <h2 className="homeHeading">Featured Products</h2>
      <div className='container' id='container'>
       
      {products.map((product) => (
        <Product product={product}/>
      ))}
 
      </div>

    </Fragment>}
    </Fragment>
  )
}

export default Home
