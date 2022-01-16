import { EstimatedWord } from "../../types";
import { range } from "../../util";
import EstimatedRow from "./EstimatedRow";
import InputRow from "./InputRow";
import PlaceholderRow from "./PlaceholderRow";

type Props = {
  estimatedWordSet: EstimatedWord[];
  currentInputWord: string;
};

const ROW_NUM = 6;

export default function Table(props: Props) {
  const { estimatedWordSet, currentInputWord } = props;

  if (estimatedWordSet.length === ROW_NUM) {
    return (
      <div>
        {estimatedWordSet.map((estimatedWord, i) => (
          <EstimatedRow key={i} estimatedWord={estimatedWord} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {estimatedWordSet.map((estimatedWord, i) => (
        <EstimatedRow key={i} estimatedWord={estimatedWord} />
      ))}
      <InputRow currentInputWord={currentInputWord} />
      {range(ROW_NUM - estimatedWordSet.length - 1).map((i) => (
        <PlaceholderRow key={`placeholder${i}`} />
      ))}
    </div>
  );
}
