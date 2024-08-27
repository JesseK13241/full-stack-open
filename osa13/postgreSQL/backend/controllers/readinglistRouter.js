const { Readlist } = require("../models");

const express = require("express");
const readinglistRouter = express.Router();

readinglistRouter.post("/", async (req, res) => {
    const readlistEntry = await Readlist.create({
      ...req.body,
      readStatus: false
    });
    res.json(readlistEntry);
});

module.exports = readinglistRouter;
