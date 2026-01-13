type GameOverProps = { winner: string; restartGame(): any };

export default function GameOver(props: GameOverProps) {
  return (
    <div id="game-over">
      <h2>Game over</h2>
      {props.winner && <p>{props.winner} win!</p>}
      {!props.winner && <p>It&apos;s a draw!</p>}
      <p>
        <button onClick={props.restartGame}>Rematch!</button>
      </p>
    </div>
  );
}
