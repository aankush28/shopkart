import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, myOrders } from "../../redux/Actions/orderAction";
import { Link, useParams } from 'react-router-dom';
import MyOrder from './MyOrder'
export default function MyiOrder() {

  return (
    <>
     
          <MyOrder />
    </>
  )
}
