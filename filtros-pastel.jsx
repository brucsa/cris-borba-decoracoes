// Versão pastel dos filtros — sem a linha de "Estilo / cor".
// As tags continuam pesquisáveis pela busca por palavra-chave.

function FiltrosPastel({ temas, query, setQuery, categoria, setCategoria, totalFiltrados }) {
  const categorias = ["Todos", ...window.getCategorias(temas)];

  return (
    <section className="filtros" id="portfolio">
      <div className="filtros-head">
        <div>
          <span className="section-num">02</span>
          <h2 className="section-title">Portfólio</h2>
        </div>
        <div className="filtros-count" style={{ backgroundColor: "rgba(255, 230, 155, 0.5)" }}>
          <strong>{totalFiltrados}</strong>
          <span>de {temas.length} temas</span>
        </div>
      </div>

      <div className="filtros-search">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder="Buscar tema, estilo ou palavra-chave — ex: rústico, princesa, safari, menina, 1 ano…"
          value={query}
          onChange={(e) => setQuery(e.target.value)} />
        
        {query &&
        <button className="search-clear" onClick={() => setQuery("")}>
            limpar
          </button>
        }
      </div>

      <div className="filtros-row">
        <span className="filtros-label">Categoria</span>
        <div className="chips">
          {categorias.map((c) =>
          <button
            key={c}
            className={`chip ${categoria === c ? "chip-active" : ""}`}
            onClick={() => setCategoria(c)} style={{ backgroundColor: "rgb(255, 211, 80)" }}>
            
              {c}
            </button>
          )}
        </div>
      </div>
    </section>);

}

window.Filtros = FiltrosPastel;