require("dotenv").config({quiet:true});
const express = require('express');
const app = express();
const cors= require('cors');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");


app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials:true
}));
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth",require("./routes/userRoutes"));
app.use("/api/tasks",require("./routes/taskRoutes"));



// at the end
app.use(errorHandler)
module.exports = app;
