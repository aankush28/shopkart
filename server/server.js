const app = require("./app");
const dotenv = require("dotenv");
const connectdata = require("./config/database");
const cloudinary = require("cloudinary")
//handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.massage}`)
    console.log(`shutting down the server due to Uncaught Exception `);
    server.close(() => {
        process.exit(1);
    })
})

//config
dotenv.config({ path: "./config/config.env" });

connectdata()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
const server = app.listen(process.env.PORT, () => {
    console.log(`server is runing in ${process.env.PORT}`)
})


// unhandled promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error:${err.massage}`)
    console.log(`shutting down the server due to unhandle promise rejection`);
    server.close(() => {
        process.exit(1);
    })
})