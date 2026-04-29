import { useState, useEffect } from "react";

const CATEGORIES = ["Тактика", "Снаряжение", "Полигоны", "Турниры", "Обучение"];

const CATEGORY_STYLE = {
  "Тактика":    { bg: "#3498db" },
  "Снаряжение": { bg: "#9b59b6" },
  "Полигоны":   { bg: "#27ae60" },
  "Турниры":    { bg: "#e74c3c" },
  "Обучение":   { bg: "#e67e22" },
};

const CATEGORY_KEYWORDS = {
  "Снаряжение": ["оружи", "снаряж", "экипиров", "привод", "амуниц", "маск", "бронежил", "прицел", "патрон", "шар", "магазин", "автомат", "пистолет", "винтовк", "пулемёт", "гранат", "защит"],
  "Полигоны":   ["полигон", "поле", "площадк", "локац", "территори", "парк", "лес", "cqb", "арен", "объект", "база"],
  "Турниры":    ["турнир", "соревнован", "чемпион", "кубок", "матч", "победит", "призёр", "рейтинг", "лига", "команд"],
  "Обучение":   ["обучен", "тренир", "курс", "инструкц", "навык", "подготовк", "новичок", "практик", "правил", "безопасност"],
  "Тактика":    ["тактик", "стратег", "атак", "оборон", "манёвр", "позиц", "штурм", "разведк", "операц", "взаимодейств", "команд"],
};

function detectCategory(title, body) {
  const text = (title + " " + body).toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) return cat;
  }
  return "Тактика";
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, "");
}

function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const query = encodeURIComponent("страйкбол OR пейнтбол OR milsim OR тактическое снаряжение OR военно-спортивная игра");
    fetch(
      `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*&srlimit=20&srprop=snippet`
    )
      .then(res => {
        if (!res.ok) throw new Error("Сервер недоступен");
        return res.json();
      })
      .then(data => {
        const results = (data.query?.search ?? []).map((item) => {
          const body = stripHtml(item.snippet);
          return {
            id: item.pageid,
            title: item.title,
            body,
            category: detectCategory(item.title, body),
            url: `https://ru.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, "_"))}`,
          };
        });
        setArticles(results);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = articles
    .filter(a => category === "all" || a.category === category)
    .filter(a => a.title.toLowerCase().includes(search.toLowerCase()) ||
                 a.body.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1>Тактические новости</h1>

      <input
        type="text"
        className="search-input"
        placeholder="Поиск по заголовку или содержанию..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="news-filter">
        <button
          className={category === "all" ? "news-filter-btn active" : "news-filter-btn"}
          onClick={() => setCategory("all")}
        >
          Все
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={category === cat ? "news-filter-btn active" : "news-filter-btn"}
            style={category === cat ? { backgroundColor: CATEGORY_STYLE[cat].bg } : {}}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p className="status-msg">Загрузка данных...</p>}
      {error && <p className="status-msg error-msg">Ошибка: {error}</p>}

      <div className="news-list">
        {filtered.map(article => (
          <a
            key={article.id}
            className="news-card"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              className="news-category"
              style={{ backgroundColor: CATEGORY_STYLE[article.category].bg }}
            >
              {article.category}
            </span>
            <h3 className="news-title">{article.title}</h3>
            <p className="news-body">{article.body}…</p>
          </a>
        ))}
      </div>

      {!loading && !error && filtered.length === 0 && (
        <p className="empty-msg">Материалов не найдено</p>
      )}
    </div>
  );
}

export default NewsPage;
