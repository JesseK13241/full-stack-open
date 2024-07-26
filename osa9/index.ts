import express from "express";
import calculateBMI from "./bmiCalculator";

const app = express();

const endpoint = "/bmi";

interface BMIQuery {
  height: string;
  weight: string;
}

const isValidBMIQuery = (query: unknown): query is BMIQuery => {
  if (typeof query !== "object" || query === null) {
    return false;
  }

  const queryObj = query as Record<string, unknown>;

  return (
    typeof queryObj.height === "string" &&
    !isNaN(Number(queryObj.height)) &&
    typeof queryObj.weight === "string" &&
    !isNaN(Number(queryObj.weight)) &&
    Number(queryObj.height) > 0 &&
    Number(queryObj.weight) > 0
  );
};

app.get(endpoint, (req, res) => {
  const input = req.query;

  if (!isValidBMIQuery(input)) {
    res.send({
      error: "malformatted parameters"
    });
  } else {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    const bmi = calculateBMI(height, weight);

    res.send({
      weight: weight,
      height: height,
      bmi: bmi
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}${endpoint}`);
});
