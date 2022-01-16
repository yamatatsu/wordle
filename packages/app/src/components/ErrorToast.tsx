import { ErrorObject, ErrorType } from "./useGame";
import Toast from "./Toast";

const messageMap: Record<ErrorType, string> = {
  "not-filled": "5文字の単語を入力しよう",
  "not-exists-word": "辞書にない単語です",
};

type Props = {
  error: ErrorObject;
};
export default function ErrorToast(props: Props) {
  const { error } = props;

  return (
    <Toast message={messageMap[error.type]} identifier={error.timestamp} />
  );
}
