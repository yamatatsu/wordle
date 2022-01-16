import { useState } from "react";
import { State } from "./types";
import { getItem, setItem } from "./localStorage";

export default function useLocalStorage(key: string) {
  const [data, setData] = useState<State | undefined>(() => {
    const item = getItem(key);
    if (!item) {
      return undefined;
    }
    const data = JSON.parse(item);
    return data;
  });

  const persist = (data: State) => {
    setData(data);
    const item = JSON.stringify(data);
    setItem(key, item);
  };

  return [data, persist] as const;
}
