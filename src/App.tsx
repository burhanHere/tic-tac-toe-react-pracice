import { useState } from "react";

import Player from "./components/Player.js";
import GameBoard from "./components/GameBoard.js";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.js";
import Logs from "./components/Logs.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const initialPlayerNames: { [key: string]: string } = {
  X: "Player 1",
  O: "Player 2",
};
const initialTurnLog: {
  playerSymbol: string;
  playerName: string;
  selectedCell: { rowIndex: number; cellIndex: number };
}[] = [];

function App() {
  const [playerNames, setPlayerNames] = useState(initialPlayerNames);

  const [turnLogs, addTurnLogs] = useState(initialTurnLog);
  let gameBoard: any = initialGameBoard.map((row) => [...row]);
  let winner: any = null;

  for (const turn of turnLogs) {
    const { playerSymbol, selectedCell } = turn;
    const { rowIndex, cellIndex } = selectedCell;

    gameBoard[rowIndex][cellIndex] = playerSymbol;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstCellSymbol =
      gameBoard[combination[0]!.rowIndex][combination[0]!.cellIndex];
    const secondCellSymbol =
      gameBoard[combination[1]!.rowIndex][combination[1]!.cellIndex];
    const thirdCellSymbol =
      gameBoard[combination[2]!.rowIndex][combination[2]!.cellIndex];

    if (
      firstCellSymbol &&
      firstCellSymbol === secondCellSymbol &&
      firstCellSymbol === thirdCellSymbol
    ) {
      winner = playerNames[firstCellSymbol];
    }
  }

  let hasDraw = turnLogs.length === 9 && !winner;

  function handleChangeTurn(rowIndex: number, cellIndex: number) {
    addTurnLogs((oldLogs: any[]) => {
      const nextPlayerSymbol = oldLogs.length % 2 === 0 ? "X" : "O"; // who's playing now
      return [
        {
          playerSymbol: nextPlayerSymbol,
          playerName: playerNames[nextPlayerSymbol], // current name at this moment
          selectedCell: { rowIndex, cellIndex },
        },
        ...oldLogs,
      ];
    });
  }

  function handelGameRestart() {
    addTurnLogs([]);
  }

  function handelPlayerNameChange(playerSymbol: string, newName: string) {
    setPlayerNames((oldPlayerNames) => ({
      ...oldPlayerNames,
      [playerSymbol]: newName,
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <li
            className={
              !turnLogs.length || turnLogs[0]!.playerSymbol === "X"
                ? "active"
                : ""
            }
          >
            <Player
              name={playerNames["X"] ?? ""}
              symbol="X"
              emitPlayerName={handelPlayerNameChange}
            />
          </li>
          <li
            className={
              turnLogs.length && turnLogs[0]!.playerSymbol === "O"
                ? "active"
                : ""
            }
          >
            <Player
              name={playerNames["O"] ?? ""}
              symbol="O"
              emitPlayerName={handelPlayerNameChange}
            />
          </li>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} restartGame={handelGameRestart} />
        )}
        <GameBoard
          turns={turnLogs}
          changeTurn={handleChangeTurn}
          gameBoard={gameBoard}
        />
        {/* // call teh state updaetd function here liek this or creat a seprate function to handel state updater function  */}
      </div>
      <Logs logs={turnLogs} />
    </main>
  );
}

export default App;
