import express from "express";
import calculateBMI from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

const PORT = 3003;
const bmiEndpoint = "/bmi";
const exercisesEndpoint = "/exercises";

interface BMIQuery {
  height: string;
  weight: string;
}

interface ExercisesBody {
  daily_exercises: number[];
  target: number;
}

const isValidBMIQuery = (query: unknown): query is BMIQuery => {
  if (typeof query !== "object" || query === null) {
    return false;
  }
  const { height, weight } = query as Record<string, unknown>;
  return (
    typeof height === "string" &&
    typeof weight === "string" &&
    !isNaN(Number(height)) &&
    !isNaN(Number(weight)) &&
    Number(height) > 0 &&
    Number(weight) > 0
  );
};

const exerciseParametersMissing = (body: unknown): body is ExercisesBody => {
  if (typeof body !== "object" || body === null) {
    return true;
  }

  if ("target" in body && "daily_exercises" in body) {
    return false;
  }

  return true;
};

const exerciseParametersCorrect = (body: unknown): body is ExercisesBody => {
  const { daily_exercises, target } = body as Record<string, unknown>;
  return (
    Array.isArray(daily_exercises) &&
    daily_exercises.every(ex => typeof ex === "number" && !isNaN(ex)) &&
    typeof target === "number" &&
    !isNaN(target)
  );
};

app.get(bmiEndpoint, (req, res) => {
  const input = req.query;

  if (!isValidBMIQuery(input)) {
    res.json({
      error: "malformatted parameters"
    });
  } else {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    const bmi = calculateBMI(height, weight);

    res.json({ weight, height, bmi });
  }
});

app.post(exercisesEndpoint, (req, res) => {
  const input: unknown = req.body;
  if (exerciseParametersMissing(input)) {
    res.json({
      error: "parameters missing"
    });
  } else if (!exerciseParametersCorrect(input)) {
    res.json({
      error: "malformatted parameters"
    });
  } else {
    const result = calculateExercises(input.daily_exercises, input.target);
    res.json(result);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
