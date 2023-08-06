import express  from "express";
import { login, register,getProfile, logout } from "../controller/user.js";
import { isAuthenticated } from "../middlerware/Auth.js";


const router = express.Router();

router
.post('/new',register)
.post('/login',login)
.get('/logout',isAuthenticated,logout)
.get('/me',isAuthenticated,getProfile)


export default router