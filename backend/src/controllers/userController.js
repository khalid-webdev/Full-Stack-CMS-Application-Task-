const {registerSchema,loginSchema} = require("../validators/userVal");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError")
const User=require("../models/User");
const generateToken = require("../config/generateToken");

exports.register = asyncHandler(async(req,res)=>{
  const {error,value} = registerSchema.validate(req.body);
  if(error){
    // throw new ApiError( 404, "User not found" );
    throw new ApiError(400,error.details[0].message);
  }
  const {fullName,email,password} = value;

  const existing = await User.findOne({email});
  if(existing){
    throw new ApiError(400,"User already register!");
  }

  const newUser = new User({
    fullName,email,password
  });
  await newUser.save();
  const accessToken = generateToken({id:newUser._id});

  res.status(201).json({success:true,message:"Account creation successfull. Now Login",user:newUser.toJSON(),token:accessToken});
});
