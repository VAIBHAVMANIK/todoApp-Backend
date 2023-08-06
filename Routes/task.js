import express from "express";
import ErrorHandler from "../utils/errorhandler.js";
import { deleteTask, getmyTasks, newTask, updateTask } from "../controller/task.js";
import { isAuthenticated } from "../middlerware/Auth.js";

const router = express.Router();
const Error = ErrorHandler;

router.post("/new",isAuthenticated,newTask);
router.get("/allTask",isAuthenticated,getmyTasks);
router.route("/:id").patch(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);
export default router;