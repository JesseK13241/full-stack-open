const express = require("express");
const router = express.Router();
const { pool } = require("../db");

// Get all habits
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM habits");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching habits" });
  }
});

// Create a new habit
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO habits (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the habit" });
  }
});

// Mark habit as done for a day
router.post("/:id/complete", async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;

  try {
    const { rows } = await pool.query(
      "UPDATE habits SET completion_dates = array_append(completion_dates, $1::date) WHERE id = $2 RETURNING *",
      [date, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Habit not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while marking the habit as complete" });
  }
});

module.exports = router;
