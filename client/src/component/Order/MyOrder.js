import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../redux/Actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();


  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams()
  


  orders &&
    orders.forEach((item, index) => {
    
    });

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders(id));
  }, [dispatch, alert, error,id]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <table id="customers">
  <tr>
    <th>Order ID</th>
    <th>itemsQty</th>
    <th>Status</th>
    <th>Amount</th>
    <th>Check Info</th>
              </tr>
              {orders &&
              orders.map((info) => (
                <tr>
                  <td>{ info._id}</td>
                  <td>{ info.orderItems.length}</td>
                  <td>{ info.orderStatus}</td>
                  <td>{info.totalPrice }</td>
    <td><Link to={`/order/${info._id}`}><LaunchIcon/></Link></td>
  </tr>
              ))}          
  

            </table>
           

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;