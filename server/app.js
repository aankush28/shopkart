const express = require("express")
const app = express();
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
const payment = require('./routes/paymentRoute')
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");
//config
dotenv.config({ path: "./config/config.env" });

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
//Route Imports
app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1",payment)
// Middleware for errors
app.use(errorMiddleware)

module.exports = app