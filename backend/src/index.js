require("dotenv").config({quiet:true});
const express = require('express');
const app = express();
const cors= require('cors');
const cookieParser = require("cookie-parser");


app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials:true
}));
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth",require("./routes/userRoutes"))


module.exports = app;
