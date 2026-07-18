const asyncHandler = require("../middleware/asyncHandler");
const Task = require("../models/Task");
const ApiError = require("../utils/ApiError");

exports.createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  if (!title) {
    throw new ApiError(400, "Title is required!");
  }
  const existing = await Task.findOne({ title });
  if (existing) {
    throw new ApiError(400, "Title is already exist!");
  }

  const newTask = new Task({
    userId: req.user.id,
    title, description, dueDate, priority
  });

  await newTask.save();
  res.status(201).json({ message: "Your Task created!", success: true, task: newTask });

});

//? get all the tasks
exports.getUserTasks = asyncHandler(async (req, res) => {
  const { search, completed } = req.query;
  const filter = { userId: req.user.id };

  if (search) {
    filter.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }];
  }
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  if (completed !== "undefined") {
    filter.completed = completed === "true";
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ success: true, tasks });
});

//?get single task
exports.getSingleTask = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const userId = req.user.id;
  const task = await Task.findOne({ userId, _id });
  if (!task) throw new ApiError(404, "Task not found!");
  res.status(200).json({ success: true, task });
});

//updateTask
exports.updateTask = asyncHandler(async(req,res)=>{
  const {title,description,completed,priority,dueDate}=req.body;


  let task = await Task.findOne({_id:req.params.id,userId:req.user.id});
  if(!task)throw new ApiError(404,"task not found!");
  if(title) task.title=title;
  if(description) {
    task.description=description
  }
  if(dueDate) task.dueDate=dueDate
  if(priority) task.priority=priority
  if(completed) task.completed=completed;
  await task.save();

  res.status(200).json({success:true,message:"Task updated successfully!",task});
});

//delete task
exports.deleteSingleTask = asyncHandler(async (req, res) => {
  const deletedTask = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });

  if (!deletedTask) {
    throw new ApiError(404, "Task not found!");
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully!",
    deletedTask
  });
});
