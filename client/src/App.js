import './App.css';
import Header from './component/layout/Header/Header.js'
import Footer from './component/layout/Footer/Footer.js'
import webFont from "webfontloader"
import Home from './component/Home/Home.js'
import { Route, Routes } from "react-router-dom"
import React, { useEffect } from 'react';
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'
import Search from './component/Product/Search.js'
import LoginSingup from "./component/User/LoginSignUp.js";
import store from './store';
import { loadUser } from './redux/Actions/userAction';
import UserOption from './component/layout/Header/UserOption.js'
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.js'
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword from "./component/User/ResetPassword.js"
import Shoping from  "./component/Cart/Shoping.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import ConfirmOrder from './component/Cart/ConfirmOrder.js'
import Cart from './component/Cart/Cart';
import Payment from './component/Cart/Payment.js';
import OrderSuccess from './component/Cart/OrderSuccess'
import MyiOrder from './component/Order/MyiOrder.js'
import OrderDetails from './component/Order/OrderDetails.js'
import Dashboard from "./component/Admin/Dashboard.js"
import ProductList from './component/Admin/ProductList.js'
import NewProduct from './component/Admin/NewProduct.js'
import UpdateProduct from './component/Admin/UpdateProduct.js'
import OrderList from './component/Admin/OrderList.js'
import ProcessOrder from './component/Admin/ProcessOrder.js'
import UsersList from './component/Admin/UsersList.js'
import UpdateUser from './component/Admin/UpdateUser.js'
import ProductReviews from './component/Admin/ProductReviews.js'
import { useState } from 'react';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
function App() {
  const { isAuthenticated, user } = useSelector(state => state.user)
  const [stripeApiKey, setStripeApiKey] = useState("")
  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data)
  }

  useEffect(() => {
    webFont.load({
      google: {
        families:["Roboto","Droid Seans","Chilanka"]
      }
    })
    store.dispatch(loadUser())
    
    getStripeApiKey()
  },[])
  return (
    <>
      <Header />
      {isAuthenticated && <UserOption user={user}/>}
    <Routes>
        <Route path="/" element={<Home />} excect='/' />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products/>} />
        <Route path="/search" element={<Search/>} />
        
        {isAuthenticated ? <Route path="/account" element={<Profile />} />:<Route path="/login" element={<LoginSingup/>} />}
        {isAuthenticated && <Route path="/me/update" element={<UpdateProfile />} />}
        {isAuthenticated && <Route path="/password/update" element={<UpdatePassword />} />}
        {isAuthenticated && <Route path="/shoping" element={<Shoping />} />}
        {isAuthenticated && <Route path="/order/confirm" element={<ConfirmOrder />} />}
        <Route path="/password/forgot" element={<ForgotPassword />} />
       <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/login" element={<LoginSingup />} />
        <Route path="/cart" element={<Cart />} />
      
        
        {isAuthenticated && <Route path="/process/payment" element={<Payment />} />}
        {isAuthenticated && <Route  path="/success" element={<OrderSuccess/>} />}
        {isAuthenticated && <Route path="/orders" element={<MyiOrder/>} />}
        {isAuthenticated && <Route path="/order/:id" element={<OrderDetails />} />}
        {isAuthenticated && user.role == "admin" && <Route path="/admin/dashboard" element={<Dashboard />} />}
        {isAuthenticated && user.role == "admin" && <Route path="/admin/products" element={<ProductList />} />}
        {isAuthenticated && user.role == "admin" && <Route path="/admin/product" element={<NewProduct />} />}
        {isAuthenticated && user.role =="admin" && <Route   path="/admin/product/:id" element={<UpdateProduct/>} />}
        {isAuthenticated && user.role == "admin" && <Route path="/admin/orders" element={<OrderList />} />}
        {isAuthenticated && user.role == "admin" && <Route path="/admin/order/:id" element={<ProcessOrder />} />}
        {isAuthenticated && user.role == "admin" && <Route path="/admin/users" element={<UsersList/>} />}
        {isAuthenticated && user.role == "admin" && <Route path="/admin/user/:id" element={<UpdateUser/>} />}
        {isAuthenticated && user.role == "admin" && <Route path="/admin/reviews" element={<ProductReviews/>} />}      
    
      
      
      </Routes>
      <Footer />
    </>
  );
}

export default App;
