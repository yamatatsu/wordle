import { EstimatedWord } from "../../types";
import Cell from "./Cell";

type Props = {
  estimatedWord: EstimatedWord;
};

export default function EstimatedRow(props: Props) {
  const { estimatedWord } = props;

  return (
    <div>
      {estimatedWord.map(({ char, result }, i) => (
        <Cell key={i} char={char} type={result} />
      ))}
    </div>
  );
}
