import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/Checkingout";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../redux/Actions/orderAction";
import { useNavigate } from "react-router-dom";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
const { user } = useSelector((state) => state.user);
const { error } = useSelector((state) => state.newOrder);
const order = {
  shippingInfo,
  orderItems: cartItems,
  itemsPrice: orderInfo.subtotal,
  taxPrice: orderInfo.tax,
  shippingPrice: orderInfo.shippingCharges,
  totalPrice: orderInfo.totalPrice,
  
};
const submitHandler = async (e) => { 
  e.preventDefault();
  try {
    order.paymentInfo = {
      id: "result.paymentIntent.id",
      status: 200,
    };
    dispatch(createOrder(order));
    navigate("/success")
  } catch (error) {
    
    alert(error);
  }
}
  const Success = () => {
   console.log("done");
}
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <input type="text" className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <input type="text" className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <input type="text" className="paymentInput" />
          </div>
          <input
            type="submit"
            /* value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn} */
            onClick={Success}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;