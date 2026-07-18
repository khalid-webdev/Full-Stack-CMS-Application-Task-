const {registerSchema,loginSchema} = require("../validators/userVal");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError")
const User=require("../models/User");
const generateToken = require("../config/generateToken");

//* register api
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

//* login api
exports.login = asyncHandler(async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  const { email, password } = value;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid credentials!!!");
  }
  const isMatch = user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: "Invalid credentials!!!" });
  }
  const accessToken = generateToken({ id: user._id });

  res.status(200).json({ success: true, message: "Login successfull!", token: accessToken, user:user.toJSON() })
});

//? get user profile
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password -__v");
  res.status(200).json({ success: true, user:user.toJSON() });
});
