import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlerware/errorMiddleware .js";
import Userrouter from "./Routes/user.js";
import Taskrouter from "./Routes/task.js";
import cors from "cors";

config({
  path: "./Data/config.env",
});

export const app = express();


//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  method: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true // --> this will allow send cookies
}));



//----------------------------------------------------------------Route---------------------------------------------------------

app.get("/", (req, res) => {
  res.send(`Welcome to the ${process.env.PORT} Port`);
});
app.use("/user", Userrouter);
app.use("/task",Taskrouter);

app.use(errorMiddleware);
