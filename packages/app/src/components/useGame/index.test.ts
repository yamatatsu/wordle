import { it, describe, expect } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import useGame, { Game } from ".";

const dictionary = ["qwert", "yuiop", "asdfg", "qwrtz"];

type GameProperties = Omit<
  Game,
  "handleAlphabetPressed" | "handleDeletePressed" | "handleEnterPressed"
>;

const initialState: GameProperties = {
  currentInputWord: "",
  estimationHistory: [],
  error: null,
  alphabetHints: {},
  gameStatus: "playing",
};

describe("store", () => {
  it("init", () => {
    const answer = "qwert";
    const { result } = renderHook(() => useGame(dictionary, answer));

    const expected: GameProperties = initialState;
    expect(result.current).toEqual(expect.objectContaining(expected));
  });

  describe("alphabetPressed", () => {
    it("success", () => {
      const answer = "qwert";
      const { result } = renderHook(() => useGame(dictionary, answer));

      act(() => result.current.handleAlphabetPressed("q"));

      const expected: GameProperties = {
        ...initialState,
        currentInputWord: "q",
      };
      expect(result.current).toEqual(expect.objectContaining(expected));
    });

    it("already filled", () => {
      const answer = "qwert";
      const { result } = renderHook(() => useGame(dictionary, answer));

      act(() => result.current.handleAlphabetPressed("q"));
      act(() => result.current.handleAlphabetPressed("w"));
      act(() => result.current.handleAlphabetPressed("e"));
      act(() => result.current.handleAlphabetPressed("r"));
      act(() => result.current.handleAlphabetPressed("t"));
      act(() => result.current.handleAlphabetPressed("y"));

      const expected: GameProperties = {
        ...initialState,
        currentInputWord: "qwert",
      };
      expect(result.current).toEqual(expect.objectContaining(expected));
    });
  });

  describe("deletePressed", () => {
    it("success", () => {
      const answer = "qwert";
      const { result } = renderHook(() => useGame(dictionary, answer));

      act(() => result.current.handleAlphabetPressed("q"));
      act(() => result.current.handleAlphabetPressed("w"));
      act(() => result.current.handleAlphabetPressed("e"));
      act(() => result.current.handleDeletePressed());
      act(() => result.current.handleDeletePressed());

      const expected: GameProperties = {
        ...initialState,
        currentInputWord: "q",
      };
      expect(result.current).toEqual(expect.objectContaining(expected));
    });

    it("already empty", () => {
      const answer = "qwert";
      const { result } = renderHook(() => useGame(dictionary, answer));

      act(() => result.current.handleAlphabetPressed("q"));
      act(() => result.current.handleAlphabetPressed("w"));
      act(() => result.current.handleAlphabetPressed("e"));
      act(() => result.current.handleDeletePressed());
      act(() => result.current.handleDeletePressed());
      act(() => result.current.handleDeletePressed());
      act(() => result.current.handleDeletePressed());

      const expected: GameProperties = {
        ...initialState,
        currentInputWord: "",
      };
      expect(result.current).toEqual(expect.objectContaining(expected));
    });
  });

  describe("enterPressed", () => {
    it("resolved", () => {
      const answer = "qwert";
      const { result } = renderHook(() => useGame(dictionary, answer));

      act(() => result.current.handleAlphabetPressed("q"));
      act(() => result.current.handleAlphabetPressed("w"));
      act(() => result.current.handleAlphabetPressed("e"));
      act(() => result.current.handleAlphabetPressed("r"));
      act(() => result.current.handleAlphabetPressed("t"));
      act(() => result.current.handleEnterPressed());

      const expected: GameProperties = {
        ...initialState,
        estimationHistory: [
          [
            { char: "q", result: "exact" },
            { char: "w", result: "exact" },
            { char: "e", result: "exact" },
            { char: "r", result: "exact" },
            { char: "t", result: "exact" },
          ],
        ],
        gameStatus: "solved",
        alphabetHints: {
          q: "exact",
          w: "exact",
          e: "exact",
          r: "exact",
          t: "exact",
        },
      };
      expect(result.current).toEqual(expect.objectContaining(expected));
    });

    it("not resolved", () => {
      const answer = "qwert";
      const { result } = renderHook(() => useGame(dictionary, answer));

      act(() => result.current.handleAlphabetPressed("q"));
      act(() => result.current.handleAlphabetPressed("w"));
      act(() => result.current.handleAlphabetPressed("r"));
      act(() => result.current.handleAlphabetPressed("t"));
      act(() => result.current.handleAlphabetPressed("z"));
      act(() => result.current.handleEnterPressed());

      const expected: GameProperties = {
        ...initialState,
        estimationHistory: [
          [
            { char: "q", result: "exact" },
            { char: "w", result: "exact" },
            { char: "r", result: "containing" },
            { char: "t", result: "containing" },
            { char: "z", result: "wrong" },
          ],
        ],
        gameStatus: "playing",
        alphabetHints: {
          q: "exact",
          w: "exact",
          r: "containing",
          t: "containing",
          z: "wrong",
        },
      };
      expect(result.current).toEqual(expect.objectContaining(expected));
    });

    it("fail", () => {
      const answer = "qwert";
      const { result } = renderHook(() => useGame(dictionary, answer));

      [...Array(6).keys()].forEach(() => {
        act(() => result.current.handleAlphabetPressed("q"));
        act(() => result.current.handleAlphabetPressed("w"));
        act(() => result.current.handleAlphabetPressed("r"));
        act(() => result.current.handleAlphabetPressed("t"));
        act(() => result.current.handleAlphabetPressed("z"));
        act(() => result.current.handleEnterPressed());
      });

      const expected: GameProperties = {
        ...initialState,
        // @ts-ignore
        estimationHistory: expect.any(Array),
        gameStatus: "failure",
        alphabetHints: {
          q: "exact",
          w: "exact",
          r: "containing",
          t: "containing",
          z: "wrong",
        },
      };
      expect(result.current).toEqual(expect.objectContaining(expected));
    });

    it("not filled", () => {
      const answer = "qwert";
      const { result } = renderHook(() => useGame(dictionary, answer));

      act(() => result.current.handleAlphabetPressed("q"));
      act(() => result.current.handleAlphabetPressed("w"));
      act(() => result.current.handleAlphabetPressed("e"));
      act(() => result.current.handleAlphabetPressed("r"));
      act(() => result.current.handleEnterPressed());

      const expected: GameProperties = {
        ...initialState,
        currentInputWord: "qwer",
        error: {
          type: "not-filled",
          // @ts-ignore
          timestamp: expect.any(Number),
        },
      };
      expect(result.current).toEqual(expect.objectContaining(expected));
    });

    it("not exists word", () => {
      const answer = "qwert";
      const { result } = renderHook(() => useGame(dictionary, answer));

      act(() => result.current.handleAlphabetPressed("z"));
      act(() => result.current.handleAlphabetPressed("x"));
      act(() => result.current.handleAlphabetPressed("c"));
      act(() => result.current.handleAlphabetPressed("v"));
      act(() => result.current.handleAlphabetPressed("b"));
      act(() => result.current.handleEnterPressed());

      const expected: GameProperties = {
        ...initialState,
        currentInputWord: "zxcvb",
        error: {
          type: "not-exists-word",
          // @ts-ignore
          timestamp: expect.any(Number),
        },
      };
      expect(result.current).toEqual(expect.objectContaining(expected));
    });
  });
});
