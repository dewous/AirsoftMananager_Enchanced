function Filter({ filter, setFilter }) {
  const roles = [
    { value: "all", label: "Все" },
    { value: "assault", label: "Штурмовик" },
    { value: "sniper", label: "Снайпер" },
    { value: "support", label: "Поддержка" },
  ];

  return (
    <div className="filter-buttons">
      {roles.map(role => (
        <button
          key={role.value}
          onClick={() => setFilter(role.value)}
          className={filter === role.value ? "active" : ""}
        >
          {role.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;