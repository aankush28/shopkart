import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../redux/Actions/productAction.js";
import { getAllOrders } from "../../redux/Actions/orderAction.js";
import { getAllUsers } from "../../redux/Actions/userAction.js";
import MetaData from "../layout/MetaData";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip , PieChart, Pie, Sector, Cell, ResponsiveContainer} from 'recharts';
const Dashboard = () => {
  const dispatch = useDispatch();
  const data = [{name: 'Page A', uv: 100,  amt: totalAmount},{name: 'Page A', uv: 300,  amt: totalAmount},{name: 'Page A', uv: 400,  amt: totalAmount}];

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  /* const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };
 */
   const doughnutState = [
    { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
    
   ]; 

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          {/* <Line data={lineState} /> */}
          <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
        </div>

        <div className="doughnutChart">
          {/*  <Doughnut data={doughnutState} /> */}
          <PieChart width={400} height={400}>
          <Pie data={doughnutState} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
          <Pie data={doughnutState} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;