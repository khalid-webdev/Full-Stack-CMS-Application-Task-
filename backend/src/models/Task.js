const User = require("./User");
const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref:User,required:true},
  title:{type:String,required:true,trim:true},
  description:{type:String,trim:true,default:""},
  dueDate:{type:Date},
  priority:{type:String,enum:["low","medium","high"],default:"medium"},
  completed:{type:Boolean,default:false}
},{timestamps:true});

const Task = mongoose.model("Task",taskSchema);
module.exports = Task;
