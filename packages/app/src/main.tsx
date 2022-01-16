import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { candidates, dictionary, getRandomly } from "./data";

const answer = getRandomly(candidates);

const debugMode = location.search.includes("debug");

if (debugMode) {
  console.log("answer:", answer);
}

ReactDOM.render(
  <React.StrictMode>
    <App dictionary={dictionary} answer={answer} />
  </React.StrictMode>,
  document.getElementById("root")
);
