type GameBoardProps = {
  changeTurn(rowIndex: number, cellIndex: number): any;
  turns: any[];
  gameBoard: Array<Array<string>>;
};
export default function GameBoard(props: GameBoardProps) {
  function handelCellClick(rowIndex: number, cellIndex: number) {
    props.changeTurn(rowIndex, cellIndex);
  }

  return (
    <ol id="game-board">
      {props.gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((cell, cellIndex) => (
              <li key={cellIndex}>
                <button
                  onClick={() => handelCellClick(rowIndex, cellIndex)}
                  disabled={props.gameBoard[rowIndex]![cellIndex] !== null}
                >
                  {cell}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
