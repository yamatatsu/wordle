import { EstimatedWord, EstimationResult } from "../../types";

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
