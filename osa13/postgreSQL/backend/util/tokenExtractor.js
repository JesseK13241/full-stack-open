const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next({ name: "JsonWebTokenError", message: "Token missing or invalid" });
  }
};

module.exports = tokenExtractor;
