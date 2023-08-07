import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import {catchAsyncError} from "../middlerware/catchAsyncerror.js";
import { sendCookie } from "../utils/features.js";
import ErrorHandler  from "../utils/errorhandler.js";

const Error = ErrorHandler;

export const register = catchAsyncError(async (req,res,next)=>{
    const{name,email,password} = req.body;
    let user = await User.findOne({email})
    if(user) {
        return next(new Error("User already registered",409))
    }
    const hashedPassword = await bcrypt.hash(password,10);

    user = await User.create({name,email,password:hashedPassword})

    sendCookie(user,res,"Registered Successfully");

})

export const login = catchAsyncError(async(req, res, next)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email}).select("+password"); // because we have selected password false from models so to get password we need to all data +password
    if(!user) {
        return next(new Error("Invalid Email or Password",404));
    }
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) {
        return next(new Error("Invalid Email or Password",404));
    }

    sendCookie(user,res,`Welcome back ${user.name}`,200);

});
export const getProfile = (req, res, next)=>{

    res.status(200).json({
        Success: true,
        user : req.user
    });
};
export const logout = (req, res, next)=>{
    sendCookie(null,res);
};

