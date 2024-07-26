import express from "express"
import calculateBMI from "./bmiCalculator"

const app = express()

const endpoint = "/bmi"

interface BMIQuery {
  height: string
  weight: string
}

const isValidBMIQuery = (query: any): query is BMIQuery => {
  return typeof query.height === "string" &&
    !isNaN(Number(query.height)) &&
    typeof query.weight === "string" &&
    !isNaN(Number(query.weight)) &&
    Number(query.height) > 0 &&
    Number(query.weight) > 0 
}

app.get(endpoint, (req, res) => {
  const input = req.query

  if (!isValidBMIQuery(input)) {
    res.send({
      error: "malformatted parameters"
    })
  } else {
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)

    const bmi = calculateBMI(height, weight)

    res.send({
      weight: weight,
      height: height,
      bmi: bmi
    })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}${endpoint}`)
})
