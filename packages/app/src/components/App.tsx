import { CSSProperties } from "react";
import useGame from "./useGame";
import Header from "./Header";
import Table from "./Table";
import Keyboard from "./Keyboard";
import ErrorToast from "./ErrorToast";
import Toast from "./Toast";

const rootStyle: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#282c34",
  textAlign: "center",

  width: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};
const wrapperStyle: CSSProperties = {
  maxWidth: "500px",
  width: "100vw",
};

type Props = { dictionaryWords: string[]; answer: string; date: Date };
function App(props: Props) {
  const { dictionaryWords, answer, date } = props;

  const game = useGame(dictionaryWords, answer, date);

  return (
    <div style={rootStyle}>
      <div style={wrapperStyle}>
        <div style={{ marginBottom: "4px" }}>
          <Header />
        </div>
        <Table
          estimatedWordSet={game.estimationHistory}
          currentInputWord={game.currentInputWord}
        />
        <div style={{ marginTop: "16px" }}>
          <Keyboard
            alphabetHints={game.alphabetHints}
            pressAlphabet={game.handleAlphabetPressed}
            pressDelete={game.handleDeletePressed}
            pressEnter={game.handleEnterPressed}
          />
        </div>
        {game.error && <ErrorToast error={game.error} />}
        {game.gameStatus === "solved" && (
          <Toast type="large" message="🎊 🎊 🎊" />
        )}
        {game.gameStatus === "failure" && (
          <Toast type="large" message="😩 😩 😩" />
        )}
      </div>
    </div>
  );
}

export default App;
