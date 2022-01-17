import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { candidates, dictionaryWords, getDailyOne } from "./data";

const answer = getDailyOne(candidates);

const debugMode = location.search.includes("debug");

if (debugMode) {
  console.log("answer:", answer);
}

const date = new Date();

ReactDOM.render(
  <React.StrictMode>
    <App dictionaryWords={dictionaryWords} answer={answer} date={date} />
  </React.StrictMode>,
  document.getElementById("root")
);
