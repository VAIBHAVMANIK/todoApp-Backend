import mongoose from "mongoose";

export const dbconnection = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connection established with ${connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
