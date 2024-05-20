const jwt = require("jsonwebtoken");
const { HttpError } = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers?.authorization?.split(" ")[1]; // 'BEARER TOKEN'
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedtoken = jwt.verify(token, "super-secret");
    req.userData = { userId: decodedtoken.userId };
    next();
  } catch (error) {
    console.log(error);
    const err = new HttpError("Authentication failed", 401);
    console.log(err);
    return next(error);
  }
};
