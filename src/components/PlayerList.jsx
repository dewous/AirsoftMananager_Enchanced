import PlayerItem from "./PlayerItem";

function PlayerList({ players, onDelete, onEdit }) {
  return (
    <div>
      {players.map(player => (
        <PlayerItem key={player.id} player={player} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default PlayerList;