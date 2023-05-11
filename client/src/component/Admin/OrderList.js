import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../redux/Actions/orderAction";
import { DELETE_ORDER_RESET } from "../../redux/constants/orderConstant";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate()

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      Navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);





  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

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
    <td><Link to={`/admin/order/${info._id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(info._id)
              }
            >
              <DeleteIcon />
            </Button></td>
  </tr>
              ))}          
  

            </table>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;