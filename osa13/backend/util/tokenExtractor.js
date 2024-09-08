const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { User, Session } = require("../models");
const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.substring(7);
      const decodedToken = jwt.verify(token, SECRET);
      const user = await User.findByPk(decodedToken.id);

      if (user.disabled) {
        return res.status(401).json({ error: "User account disabled" });
      }
      
      const session = await Session.findOne({ where: { token: token } });
      if (!session) {
        return res.status(401).json({ error: "Session not found" });
      }

      const now = new Date();
      if (session.expiresAt < now) {
        await session.destroy(); 
        return res.status(401).json({ error: "Session expired" });
      }

      req.decodedToken = decodedToken;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next({ name: "JsonWebTokenError", message: "Token missing or invalid" });
  }
};

module.exports = tokenExtractor;
