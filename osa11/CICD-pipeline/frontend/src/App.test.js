import { describe, expect, it } from "@jest/globals"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

describe("App component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.createRoot(div).render(<App />)
    expect(div).not.toBeNull()
  })
})
