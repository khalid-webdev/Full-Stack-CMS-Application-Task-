const bcrypt=require("bcrypt");
const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
  fullName:{type:String,required:[true,"Name is required!"],trim:true},
  email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  password:{type:String,required:true}
},{timestamps:true});


userSchema.pre("save",async function(){
  if(!this.isModified("password")){
    return;
  }
  this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword =async function(inputPass){
  return await bcrypt.compare(inputPass,this.password);
};

userSchema.methods.toJSON=function(){
const obj = this.toObject();
delete this.password;
// delete this.refreshToken;
return obj;
}

const User = mongoose.model("User",userSchema);

module.exports = User;
