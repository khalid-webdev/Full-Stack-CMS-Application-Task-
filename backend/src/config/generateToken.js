require("dotenv").config({quiet:true});
const jwt =require("jsonwebtoken");

const generateToken = (data)=>{
  return jwt.sign(data,process.env.JWT_ACCESS_SECRET,{expiresIn:"1h"});
}

module.exports = generateToken;
