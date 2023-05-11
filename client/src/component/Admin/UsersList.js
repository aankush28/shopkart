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
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../redux/Actions/userAction";
import { DELETE_USER_RESET } from "../../redux/constants/userConstant";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const { error: deleteError, isDeleted, message } = useSelector(
    (state) => state.profile
  );

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert.success(message);
      Navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <table id="customers">
            <tr>
              <th>UserID</th>
              <th>Email </th>
              <th>Role</th>
              <th>Name</th>
              <th>Edit</th>
            </tr>
            {users &&
              users.map((info) => (
                <tr>
                  <td>{info._id}</td>
                  <td>{info.email}</td>
                  <td>{info.role}</td>
                  <td>{info.name}</td>
                  <td>
                    <Fragment>
                      <Link
                        to={`/admin/user/${info._id}`}
                      >
                        <EditIcon />
                      </Link>

                      <Button
                        onClick={() =>
                          deleteUserHandler(info._id)
                        }
                      >
                        <DeleteIcon />
                      </Button>
                    </Fragment>
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
