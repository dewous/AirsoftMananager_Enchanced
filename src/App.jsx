import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import "./App.css";

const mockPlayers = [
  { id: 1, name: "Волк", role: "assault" },
  { id: 2, name: "Сокол", role: "sniper" },
  { id: 3, name: "Медведь", role: "support" },
];

function App() {
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem("players");
    return saved ? JSON.parse(saved) : mockPlayers;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const addPlayer = (player) => {
    setPlayers(prev => [...prev, { ...player, id: Date.now() }]);
  };

  const deletePlayer = (id) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  const editPlayer = (id, updated) => {
    setPlayers(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  return (
    <div className={`app-wrapper${darkMode ? " dark" : ""}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                players={players}
                addPlayer={addPlayer}
                deletePlayer={deletePlayer}
                editPlayer={editPlayer}
              />
            }
          />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
