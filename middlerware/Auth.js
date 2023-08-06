import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import { catchAsyncError } from "./catchAsyncerror.js";

export const isAuthenticated =catchAsyncError(async(req,res,next) =>{
    const {token} = req.cookies;
    if(!token){
        return next(new Error("Login First",401));
    }
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    const user = await User.findOne({_id: decoded._id});
    req.user = user;
    next();
})