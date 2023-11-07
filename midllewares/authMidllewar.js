const { HTTPError, compareTokens } = require("../utils");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const User = require("../models/user");
const authorization = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer") {
    return next(HTTPError(401, "Token type is not allowed"));
  }
  if (!token) {
    return next(HTTPError(401, "Token is required"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id, { password: 0 });
    if (!(await compareTokens(token, id))) {
      return next(HTTPError(401, "Not authorized"));
    }
    if (!user) {
      return next(HTTPError(401, "User not found"));
    }
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return next(HTTPError(401, "Token is not valid"));
    }
    throw error;
  }
  next();
};
module.exports = authorization;
