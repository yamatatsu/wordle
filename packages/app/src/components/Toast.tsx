import { useState, useEffect } from "react";

const VISIBLE_DURATION = 2000;

type Props = {
  message: string;
  type?: "small" | "large";
  identifier?: number;
};
export default function Toast(props: Props) {
  const { message, type = "small", identifier } = props;

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const handle = setTimeout(() => {
      setVisible(false);
    }, VISIBLE_DURATION);
    return () => clearTimeout(handle);
  }, [message, identifier]);

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",

        top: "10%",
        left: "50%",
        transform: "translate(-50%, 0)",
        pointerEvents: "none",
        width: "fit-content",

        fontFamily: "inherit",
        fontSize: type === "large" ? "52px" : undefined,
        fontWeight: "bold",
        border: 0,
        padding: 0,
        borderRadius: "4px",
        backgroundColor: "#eee",
        color: "black",
        paddingBlock: "10px 10px",
        paddingInline: "20px 20px",
      }}
    >
      {message}
    </div>
  );
}
