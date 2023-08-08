import Task from "../Models/Task.js";
import { catchAsyncError } from "../middlerware/catchAsyncerror.js";

export const newTask = catchAsyncError(async (req, res, next) => {
  const { title, description } = req.body;
  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    Success: true,
    message: "Task created successfully",
  });
});

export const getmyTasks = catchAsyncError(async (req, res, next)=>{
    const userid = req.user._id;
    const tasks =  await Task.find({user: userid});
    if(!tasks){
        return next(new Error("All Done",404));
    }
    res.status(200).json({
        Success: true,
        tasks
    });
});

export const updateTask = catchAsyncError(async (req, res, next)=>{
    const {id} = req.params;
    const task = await Task.findById(id)
    task.isCompleted = !task.isCompleted;
    task.save();
    res.status(200).json({
        Success: true,
        message: "Task Updated Successfully"
    });
});
export const deleteTask = catchAsyncError(async (req, res, next)=>{
    const {id} = req.params;
    await Task.findByIdAndDelete(id)
    res.status(200).json({
        Success: true,
        message: "Task Deleted Successfully"
    });
});
