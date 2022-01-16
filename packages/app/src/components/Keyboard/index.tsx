import { CSSProperties } from "react";
import { AlphabetHints } from "../useGame";
import createAlphabetKey from "./AlphabetKey";
import EnterKey from "./EnterKey";
import DeleteKey from "./DeleteKey";
import useRealKeyboard from "./useRealKeyboard";

const wrapperStyle: CSSProperties = {
  display: "block",
  maxWidth: "500px",
};
const rowStyle: CSSProperties = {
  display: "flex",
  margin: "0 auto 8px",
  touchAction: "manipulation",
};
const spacerStyle: CSSProperties = {
  flex: 0.5,
};
type Props = {
  alphabetHints: AlphabetHints;
  pressAlphabet: (char: string) => void;
  pressDelete: () => void;
  pressEnter: () => void;
};
export default function Keyboard(props: Props) {
  const { alphabetHints, pressAlphabet, pressDelete, pressEnter } = props;

  useRealKeyboard({ pressAlphabet, pressDelete, pressEnter });

  const AlphabetKey = createAlphabetKey({
    alphabetHints,
    press: pressAlphabet,
  });

  return (
    <div style={wrapperStyle}>
      <div style={rowStyle}>
        <AlphabetKey content="q" />
        <AlphabetKey content="w" />
        <AlphabetKey content="e" />
        <AlphabetKey content="r" />
        <AlphabetKey content="t" />
        <AlphabetKey content="y" />
        <AlphabetKey content="u" />
        <AlphabetKey content="i" />
        <AlphabetKey content="o" />
        <AlphabetKey content="p" />
      </div>
      <div style={rowStyle}>
        <div style={spacerStyle}></div>
        <AlphabetKey content="a" />
        <AlphabetKey content="s" />
        <AlphabetKey content="d" />
        <AlphabetKey content="f" />
        <AlphabetKey content="g" />
        <AlphabetKey content="h" />
        <AlphabetKey content="j" />
        <AlphabetKey content="k" />
        <AlphabetKey content="l" />
        <div style={spacerStyle}></div>
      </div>
      <div style={rowStyle}>
        <EnterKey press={pressEnter} />
        <AlphabetKey content="z" />
        <AlphabetKey content="x" />
        <AlphabetKey content="c" />
        <AlphabetKey content="v" />
        <AlphabetKey content="b" />
        <AlphabetKey content="n" />
        <AlphabetKey content="m" />
        <DeleteKey press={pressDelete} />
      </div>
    </div>
  );
}
