import Key from "./Key";
import { AlphabetHints } from "../useGame";

type FirstOrderProps = {
  alphabetHints: AlphabetHints;
  press: (char: string) => void;
};
type SecondOrderProps = {
  content: string;
};
export default function createAlphabetKey(props: FirstOrderProps) {
  const { alphabetHints, press } = props;

  return function AlphabetKey(props: SecondOrderProps) {
    const { content } = props;

    return (
      <Key
        content={content}
        hint={alphabetHints[content]}
        press={() => {
          press(content);
        }}
      />
    );
  };
}
