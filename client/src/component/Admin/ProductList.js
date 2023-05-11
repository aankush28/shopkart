import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../redux/Actions/productAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../redux/constants/productConstants";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate()
const {id} = useParams()
  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert("Product Deleted Successfully");
      Navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);




  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <table id="customers">
  <tr>
    <th>Product ID</th>
    <th>Name</th>
    <th>Stock</th>
    <th>Price</th>
    <th>Action</th>
              </tr>
              {products &&
              products.map((item) => (
                <tr>
                  <td>{ item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.Stock}</td>
                  <td>{ item.price}</td>
                  
    <td><>
            <Link to={`/admin/product/${item._id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(item._id)
              }
            >
              <DeleteIcon />
            </Button>
          </></td>
  </tr>
              ))}          
  

            </table>
           
        </div>
      </div>
    </>
  );
};

export default ProductList;