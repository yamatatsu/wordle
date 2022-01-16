import Key from "./Key";

type Props = { press: () => void };
export default function EnterKey(props: Props) {
  const { press } = props;

  return <Key content="ENTER" press={press} />;
}
