import express from "express";
import { config } from "dotenv";
import { app } from "./app.js";
import { dbconnection } from "./Data/dbconnection.js";

dbconnection();

app.listen(process.env.PORT, () => {
  console.log(
    `Server listening on port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});
