const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const auth = (req,res,next)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(403).json({message:"Access denied!",success:false});
  }
  const token = authHeader.split(" ")[1];
  // res.send(token);
  try {
    const decode = jwt.verify(token,process.env.JWT_ACCESS_SECRET);
    req.user=decode
    next();
  } catch (error) {
    throw new ApiError(403,error||"Server error");
  }
}
module.exports = auth;
