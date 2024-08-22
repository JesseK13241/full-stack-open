const redis = require("../redis");
const VISITS_KEY = "visit_count";

const visitCounter = async (req, res, next) => {
  try {
    let visits = (await redis.getAsync(VISITS_KEY)) || 0;
    visits = parseInt(visits) + 1;
    await redis.setAsync(VISITS_KEY, visits);
  } catch (error) {
    console.error("Error updating visit count:", error);
  }
  next();
};

module.exports = visitCounter;
