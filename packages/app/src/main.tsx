import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { juniorHighSchoolWords, getRandomly } from "./data";

const dictionary = juniorHighSchoolWords;
const answer = getRandomly(dictionary);

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
