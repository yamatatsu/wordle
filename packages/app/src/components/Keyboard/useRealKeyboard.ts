import { useEffect } from "react";

type Props = {
  pressAlphabet: (char: string) => void;
  pressDelete: () => void;
  pressEnter: () => void;
};
export default function useRealKeyboard(props: Props) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key, metaKey, ctrlKey, shiftKey } = event;

      if (metaKey || ctrlKey || shiftKey) return;

      if (/^[qwertyuiopasdfghjklzxcvbnm]$/.test(key)) {
        props.pressAlphabet(key);
      } else if (key === "Enter") {
        props.pressEnter();
      } else if (key === "Backspace") {
        props.pressDelete();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });
}
