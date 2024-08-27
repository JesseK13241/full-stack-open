const { Readlist } = require("../models");

const express = require("express");
const readinglistRouter = express.Router();
const tokenExtractor = require("../util/tokenExtractor.js");

readinglistRouter.post("/", async (req, res) => {
  const readlistEntry = await Readlist.create({
    ...req.body,
    readStatus: false
  });
  res.json(readlistEntry);
});

readinglistRouter.put("/:id", tokenExtractor, async (req, res) => {
  const readlistEntry = await Readlist.findByPk(req.params.id);
  if (req.decodedToken.id !== readlistEntry.dataValues.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  readlistEntry.set({ readStatus: req.body.readStatus });
  await readlistEntry.save();

  // SequelizeValidationError notNull Violation: readlist.readStatus cannot be null
  res.json(readlistEntry);
});

module.exports = readinglistRouter;
