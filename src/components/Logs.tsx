type LogsProps = { logs: any[] };

export default function Logs(props: LogsProps) {
  return (
    <ol id="log">
      {props.logs.map((log: any) => (
        <li key={`${log.selectedCell.rowIndex}${log.selectedCell.cellIndex}`}>
          {log.playerName} selected {log.selectedCell.rowIndex},
          {log.selectedCell.cellIndex}
        </li>
      ))}
    </ol>
  );
}
