import React, { useState } from "react";
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";

import DasboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoopingIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Profile_image from '../../User/Profile.png'
import "./Header.css";
function UserOption({ user }) {
  const [open, setOpen] = useState(false);
  const {cartItems}=useSelector((state)=>state.cart)
  const dispatch = useDispatch();
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoopingIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}/>, name: `Carts(${cartItems.length})`, func: cart },
    { icon: <Link to={"/"}> <ExitToAppIcon /></Link>, name: "Logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <DasboardIcon />,
      name: "DashboardIcon",
      func: dashboard,
    });
  }
  const native = useNavigate();
  function dashboard() {
    native("/admin/dashboard");
  }
  function orders() {
    native("/orders");
  }
  function account() {
    native("/account");
  }
  function cart() {
    native("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert("Now u are logout");
  }
  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url:Profile_image}
            
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
}

export default UserOption;
