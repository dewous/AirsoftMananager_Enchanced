import { useState } from "react";

function PlayerForm({ addPlayer }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("assault");

  const handleAdd = () => {
    if (!name.trim()) return;
    addPlayer({ name: name.trim(), role });
    setName("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="player-form">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Позывной игрока"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="assault">Штурмовик</option>
        <option value="sniper">Снайпер</option>
        <option value="support">Поддержка</option>
      </select>
      <button className="add-btn" onClick={handleAdd}>Добавить</button>
    </div>
  );
}

export default PlayerForm;
