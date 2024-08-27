const { ValidationError } = require("sequelize");

const errorHandler = (error, req, res, next) => {
  console.error(error.name, error.message);

  if (error instanceof ValidationError) {
    return res.status(400).json({
      error: "Validation error",
      details: error.errors.map(err => ({
        field: err.path,
        message: err.message
      }))
    });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" });
  }

  return res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;
