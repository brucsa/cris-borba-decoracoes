// Filtros: busca + chips de categoria + chips de tag, mais contagem e ordenação.

function Filtros({ temas, query, setQuery, categoria, setCategoria, tagsAtivas, toggleTag, totalFiltrados }) {
  const categorias = ["Todos", ...window.getCategorias(temas)];
  const tags = window.getTags(temas);

  return (
    <section className="filtros" id="portfolio">
      <div className="filtros-head">
        <div>
          <span className="section-num">02</span>
          <h2 className="section-title">Portfólio</h2>
        </div>
        <div className="filtros-count">
          <strong>{totalFiltrados}</strong>
          <span>de {temas.length} temas</span>
        </div>
      </div>

      <div className="filtros-search">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder="Buscar tema, estilo ou cor — ex: rústico, princesa, safari…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="search-clear" onClick={() => setQuery("")}>
            limpar
          </button>
        )}
      </div>

      <div className="filtros-row">
        <span className="filtros-label">Categoria</span>
        <div className="chips">
          {categorias.map((c) => (
            <button
              key={c}
              className={`chip ${categoria === c ? "chip-active" : ""}`}
              onClick={() => setCategoria(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="filtros-row">
        <span className="filtros-label">Estilo / cor</span>
        <div className="chips chips-tags">
          {tags.map((t) => (
            <button
              key={t}
              className={`chip chip-sm ${tagsAtivas.includes(t) ? "chip-active" : ""}`}
              onClick={() => toggleTag(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Filtros = Filtros;
