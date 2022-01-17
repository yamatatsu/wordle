import { useReducer } from "react";
import { EstimatedWord, EstimatedChar } from "../../types";
import { State, Action } from "./types";

export default function useGameState(
  dictionaryWords: string[],
  answer: string,
  initialState?: State
) {
  return useReducer(
    createReducer(dictionaryWords, answer),
    initialState ?? {
      currentInputWord: "",
      estimationHistory: [],
      error: null,
    }
  );
}

const createReducer =
  (dictionaryWords: string[], answer: string) =>
  (state: State, action: Action): State => {
    switch (action.type) {
      case "alphabetPressed":
        const { currentInputWord } = state;
        if (currentInputWord.length >= 5) {
          return state;
        }
        return {
          ...state,
          currentInputWord: currentInputWord + action.payload.char,
        };

      case "deletePressed": {
        const { currentInputWord: word } = state;
        return {
          ...state,
          currentInputWord: word.slice(0, word.length - 1),
        };
      }

      case "enterPressed": {
        const { currentInputWord: word, estimationHistory } = state;

        if (word.length < 5) {
          return {
            ...state,
            error: {
              type: "not-filled",
              timestamp: action.payload.timestamp,
            },
          };
        }
        if (!dictionaryWords.includes(word)) {
          return {
            ...state,
            error: {
              type: "not-exists-word",
              timestamp: action.payload.timestamp,
            },
          };
        }

        const estimatedWord = estimate(word, answer);

        return {
          ...state,
          currentInputWord: "",
          error: null,
          estimationHistory: [...estimationHistory, estimatedWord],
        };
      }
      default:
        return state;
    }
  };

const estimate = (word: string, answer: string): EstimatedWord =>
  word.split("").map((char, index): EstimatedChar => {
    if (answer.charAt(index) === char) {
      return { char, result: "exact" };
    }
    if (answer.includes(char)) {
      return { char, result: "containing" };
    }
    return { char, result: "wrong" };
  });
