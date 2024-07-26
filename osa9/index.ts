import express from "express"
const app = express()

const endpoint = "/hello"

app.get(endpoint, (_req, res) => {
  res.send("Hello Full Stack!")
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}${endpoint}`)
})