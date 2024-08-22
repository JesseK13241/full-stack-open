const express = require("express");
const router = express.Router();
const redis = require("../redis");
const configs = require("../util/config");

router.get("/", async (req, res) => {
  res.send({
    ...configs,
  });
});

router.get("/statistics", async (req, res) => {
  const statistics = await redis.getAsync(VISITS_KEY);
  res.json(statistics);
});

module.exports = router;
