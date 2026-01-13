import { useState } from "react";

type PlayerProps = {
  name: string;
  symbol: string;
  emitPlayerName(symbol: string, value: string): any;
};

export default function Player(props: PlayerProps) {
  const [playerName, setPlayerName] = useState(props.name);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    // setIsEditing(!isEditing); // this is alsp correct but in this case the state update is schadulers for future not done immideatly
    setIsEditing((oldIsEditing) => !oldIsEditing); // best practice for emmidiate changes if new value is dependent on previous value of the state
  }

  function handlePlayerNameChange(event: any) {
    setPlayerName(event.target.value);
    props.emitPlayerName(props.symbol, event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handlePlayerNameChange}
      />
    );
  }

  return (
    <>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{props.symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </>
  );
}
