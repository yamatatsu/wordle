import { padArray } from "../../util";
import Cell from "./Cell";

type Props = {
  currentInputWord: string;
};

export default function InputRow(props: Props) {
  const { currentInputWord } = props;

  const chars = padArray(currentInputWord.split(""), 5, "");

  return (
    <div>
      {chars.map((char, i) => (
        <Cell key={i} char={char} type={"plain"} />
      ))}
    </div>
  );
}
