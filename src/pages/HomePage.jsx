import { useState } from "react";
import PlayerForm from "../components/PlayerForm";
import PlayerList from "../components/PlayerList";
import Filter from "../components/Filter";

function HomePage({ players, addPlayer, deletePlayer, editPlayer }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = players
    .filter(p => filter === "all" || p.role === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1>Состав команды</h1>
      <div className="stats-bar">
        <span>Всего: <strong>{players.length}</strong></span>
        <span>Штурмовиков: <strong>{players.filter(p => p.role === "assault").length}</strong></span>
        <span>Снайперов: <strong>{players.filter(p => p.role === "sniper").length}</strong></span>
        <span>Поддержки: <strong>{players.filter(p => p.role === "support").length}</strong></span>
      </div>
      <PlayerForm addPlayer={addPlayer} />
      <input
        type="text"
        className="search-input"
        placeholder="Поиск по позывному..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Filter filter={filter} setFilter={setFilter} />
      <PlayerList players={filtered} onDelete={deletePlayer} onEdit={editPlayer} />
      {filtered.length === 0 && <p className="empty-msg">Игроков не найдено</p>}
    </div>
  );
}

export default HomePage;
