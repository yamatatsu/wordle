import { CSSProperties } from "react";
import { EstimationResult } from "../../types";
import assets from "../assets";

const hintStyleMap: Record<EstimationResult, CSSProperties> = {
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

const plainStyle: CSSProperties = {
  backgroundColor: "darkgrey",
};

type Props = {
  content: string;
  hint?: EstimationResult;
  press: () => void;
};
export default function Key(props: Props) {
  const { content, hint, press } = props;

  const hintStyle = hint ? hintStyleMap[hint] : plainStyle;

  return (
    <button
      style={{
        ...hintStyle,
        fontFamily: "inherit",
        fontWeight: "bold",
        border: 0,
        padding: 0,
        margin: "0 6px 0 0",
        height: "58px",
        borderRadius: "4px",
        cursor: "pointer",
        userSelect: "none",
        color: "white",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "uppercase",
        WebkitTapHighlightColor: "rgba(0, 0, 0, 0.3)",
      }}
      onClick={press}
    >
      {content}
    </button>
  );
}
