const express = require("express");
const router = express.Router();
const redis = require("../redis");
const configs = require("../util/config");

const VISITS_KEY = "visit_count";

router.get("/", async (req, res) => {
  let visits = (await redis.getAsync(VISITS_KEY)) || 0;
  visits = parseInt(visits) + 1;
  await redis.setAsync(VISITS_KEY, visits);

  res.send({
    ...configs,
    visits
  });
});

router.get("/statistics", async (req, res) => {
  const statistics = await redis.getAsync(VISITS_KEY);
  res.json(statistics);
});

module.exports = router;
