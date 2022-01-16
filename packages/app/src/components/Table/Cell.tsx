import { CSSProperties } from "react";
import { EstimationResult } from "../../types";
import assets from "../assets";

type CellType = EstimationResult | "plain";

type Props = {
  char: string;
  type: CellType;
};

const cellStyleMap: Record<CellType, CSSProperties> = {
  plain: {
    backgroundColor: "black",
    border: "2px solid gray",
  },
  wrong: {
    backgroundColor: assets.colors.wrong,
  },
  containing: {
    backgroundColor: assets.colors.containing,
  },
  exact: {
    backgroundColor: assets.colors.exact,
  },
};

export default function Cell(props: Props) {
  const { char, type } = props;

  return (
    <div
      style={{
        ...cellStyleMap[type],

        color: "white",
        fontWeight: "bold",

        width: "4rem",
        height: "4rem",
        fontSize: "2rem",

        display: "inline-flex",

        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
        boxSizing: "border-box",

        textTransform: "uppercase",
        userSelect: "none",
      }}
    >
      {char}
    </div>
  );
}
