import useGameState, { State } from "./useGameState";
import { EstimatedWord, EstimationResult } from "../../types";

export type AlphabetHints = Record<string, EstimationResult>;
export type GameStatus = "playing" | "solved" | "failure";
export type Game = State & {
  gameStatus: GameStatus;
  alphabetHints: AlphabetHints;
  handleAlphabetPressed: (char: string) => void;
  handleDeletePressed: () => void;
  handleEnterPressed: () => void;
};

export type Action =
  | { type: "alphabetPressed"; payload: { char: string } }
  | { type: "deletePressed" }
  | { type: "enterPressed"; payload: { timestamp: number } };

export default function useGame(dictionary: string[], answer: string): Game {
  const [state, dispatch] = useGameState(dictionary, answer);

  const alphabetHints = getAlphabetHints(state.estimationHistory);

  const solved = isSolved(last(state.estimationHistory));
  const failure = state.estimationHistory.length === 6;
  const gameStatus: GameStatus = solved
    ? "solved"
    : failure
    ? "failure"
    : "playing";

  return {
    ...state,
    alphabetHints,
    gameStatus,
    handleAlphabetPressed: (char: string) => {
      if (gameStatus !== "playing") return;
      dispatch({ type: "alphabetPressed", payload: { char } });
    },
    handleDeletePressed: () => {
      if (gameStatus !== "playing") return;
      dispatch({ type: "deletePressed" });
    },
    handleEnterPressed: () => {
      if (gameStatus !== "playing") return;
      dispatch({ type: "enterPressed", payload: { timestamp: Date.now() } });
    },
  };
}

const getAlphabetHints = (
  estimationHistory: EstimatedWord[]
): AlphabetHints => {
  const estimatedChars = estimationHistory.flat();
  const exactHints = estimatedChars
    .filter(({ result }) => result === "exact")
    .reduce((acc, { char }) => {
      return { ...acc, [char]: "exact" as const };
    }, {} as AlphabetHints);

  const hintsBase = estimatedChars
    .filter(({ result }) => result !== "exact")
    .reduce((acc, { char, result }) => {
      return { ...acc, [char]: result };
    }, {} as AlphabetHints);

  return { ...hintsBase, ...exactHints };
};

const isSolved = (estimatedWord: EstimatedWord | undefined): boolean =>
  !!estimatedWord && estimatedWord.every(({ result }) => result === "exact");

const last = <T>(arr: T[]): T | undefined => arr.slice(-1)[0];
