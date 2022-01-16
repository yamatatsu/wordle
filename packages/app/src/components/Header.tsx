import { CSSProperties } from "react";

export default function Header() {
  return (
    <header>
      <div
        style={{
          fontWeight: "700",
          fontSize: "36px",
          letterSpacing: "0.2rem",
          textAlign: "center",
          color: "white",
        }}
      >
        Wordle 中学英単語
      </div>
    </header>
  );
}
