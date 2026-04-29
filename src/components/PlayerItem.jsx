import { useState } from "react";

const roleLabels = { assault: "Штурмовик", sniper: "Снайпер", support: "Поддержка" };

function PlayerItem({ player, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(player.name);
  const [editRole, setEditRole] = useState(player.role);

  const handleSave = () => {
    if (!editName.trim()) return;
    onEdit(player.id, { name: editName.trim(), role: editRole });
    setIsEditing(false);
  };

  return (
    <div className={`player-item ${player.role}`}>
      {isEditing ? (
        <>
          <input value={editName} onChange={(e) => setEditName(e.target.value)} />
          <select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
            <option value="assault">Штурмовик</option>
            <option value="sniper">Снайпер</option>
            <option value="support">Поддержка</option>
          </select>
          <div className="player-actions">
            <button className="add-btn" onClick={handleSave}>Сохранить</button>
            <button className="delete-btn" onClick={() => setIsEditing(false)}>Отменить</button>
          </div>
        </>
      ) : (
        <>
          <div className="player-info">
            <span className="player-name">{player.name}</span>
            <span className="player-role">{roleLabels[player.role] || player.role}</span>
          </div>
          <div className="player-actions">
            <button className="add-btn" onClick={() => setIsEditing(true)}>Редактировать</button>
            <button className="delete-btn" onClick={() => onDelete(player.id)}>Удалить</button>
          </div>
        </>
      )}
    </div>
  );
}

export default PlayerItem;
