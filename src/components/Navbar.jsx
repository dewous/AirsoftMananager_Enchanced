import { NavLink } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar">
      <span className="navbar-brand">Страйкбол Менеджер</span>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
          Команда
        </NavLink>
        <NavLink to="/news" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
          Новости
        </NavLink>
      </div>
      <button className="theme-toggle" onClick={() => setDarkMode(p => !p)}>
        {darkMode ? "Светлая тема" : "Тёмная тема"}
      </button>
    </nav>
  );
}

export default Navbar;
