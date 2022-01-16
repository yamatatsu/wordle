import { useReducer } from "react";
import { EstimatedWord, EstimatedChar, EstimationResult } from "../../types";

export type AlphabetHints = Record<string, EstimationResult>;

export type ErrorType = "not-exists-word" | "not-filled";
export type ErrorObject = { type: ErrorType; timestamp: number };

export type State = {
  currentInputWord: string;
  estimationHistory: EstimatedWord[];
  error: ErrorObject | null;
};

export type Action =
  | { type: "alphabetPressed"; payload: { char: string } }
  | { type: "deletePressed" }
  | { type: "enterPressed"; payload: { timestamp: number } };

export default function useGameState(dictionary: string[], answer: string) {
  const initialState: State = {
    currentInputWord: "",
    estimationHistory: [],
    error: null,
  };
  return useReducer(createReducer(dictionary, answer), initialState);
}

const createReducer =
  (dictionary: string[], answer: string) =>
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
        if (!dictionary.includes(word)) {
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
