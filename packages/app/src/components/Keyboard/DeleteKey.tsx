import Key from "./Key";

type Props = { press: () => void };
export default function DeleteKey(props: Props) {
  const { press } = props;

  return <Key content="DELETE" press={press} />;
}
