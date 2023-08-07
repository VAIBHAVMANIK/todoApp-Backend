import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {

  if(user) {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite:process.env.NODE_ENV ==="Development"?"lax":"none",
      secure: process.env.NODE_ENV ==="Development"?false:true
    })
    .json({
      Success: true,
      message,
    });
  }
  return res
    .status(statusCode)
    .cookie("token","", {
      expires: new Date(Date.now()),
      sameSite:process.env.NODE_ENV ==="Development"?"lax":"none",
      secure: process.env.NODE_ENV ==="Development"?false:true
    })
    .json({
      Success: true,
    });

};
