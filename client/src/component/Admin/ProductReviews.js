import React, { Fragment, useEffect, useState } from "react";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../redux/Actions/productAction";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";

import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../redux/constants/productConstants";
import { useNavigate } from "react-router-dom";

const ProductReviews = ({ history }) => {
  const dispatch = useDispatch();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");
  const Navigate = useNavigate();
  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert("Review Deleted Successfully");
      Navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted, productId]);

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <table id="customers">
              <tr>
                <th>User ID</th>
                <th>User</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
              {reviews &&
                reviews.map((info) => (
                  <tr>
                    <td>{info._id}</td>
                    <td>{info.name}</td>
                    <td>{info.comment}</td>
                    <td>{info.rating}</td>

                    <td>
                      <Button onClick={() => deleteReviewHandler(info._id)}>
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
            </table>
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
