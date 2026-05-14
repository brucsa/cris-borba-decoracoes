// App pastel — versão simplificada, sem tweaks (ja é a direção pastel committed)

function App() {
  const [temas, setTemas] = React.useState(() => {
    // Migração v3: remove temas sem imagem do localStorage (uma vez)
    const MIGRATED_KEY = "crisborba_migrated_v3";
    let stored = window.loadTemas();
    if (stored && Array.isArray(stored) && !localStorage.getItem(MIGRATED_KEY)) {
      stored = stored.filter(window.temaTemImagem);
      window.saveTemas(stored);
      localStorage.setItem(MIGRATED_KEY, "1");
    }
    return stored && Array.isArray(stored) && stored.length ? stored : window.getTemasComCodigo();
  });

  const [query, setQuery] = React.useState("");
  const [categoria, setCategoria] = React.useState("Todos");
  const [tagsAtivas, setTagsAtivas] = React.useState([]);

  function toggleTag(t) {
    setTagsAtivas(tagsAtivas.includes(t) ? tagsAtivas.filter((x) => x !== t) : [...tagsAtivas, t]);
  }

  // Mostra somente decorações de parceria nesta página.
  // Particulares aparecem apenas na home (Cris Borba Decoracoes - Home.html).
  const temasParceria = React.useMemo(
    () => temas.filter((t) => t.tipo !== "particular"),
    [temas]
  );

  const temasFiltrados = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return temasParceria.filter((t) => {
      if (categoria !== "Todos" && t.categoria !== categoria) return false;
      if (tagsAtivas.length > 0) {
        const has = tagsAtivas.every((tag) => t.tags.includes(tag));
        if (!has) return false;
      }
      if (q) {
        const blob = (t.nome + " " + t.descricao + " " + t.tags.join(" ") + " " + t.categoria).toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [temasParceria, query, categoria, tagsAtivas]);

  const [temaAberto, setTemaAberto] = React.useState(null);
  const [adminOpen, setAdminOpen] = React.useState(false);

  function scrollToPortfolio() {
    const el = document.getElementById("portfolio");
    if (el) window.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
  }

  return (
    <React.Fragment>
      <nav className="topbar-full" style={{ backgroundColor: "rgb(255, 252, 245)" }}>
        <div className="topbar topbar-inner">
          <div className="brand">
            <img src="logo-cris-borba.jpeg" alt="Cris Borba Decorações" className="brand-logo" style={{ objectFit: "cover" }} />
          </div>
          <div className="topbar-links">
            <a href="#portfolio">Portfólio</a>
            <a className="topbar-cta" href="Cris Borba Decoracoes - Home.html" style={{ backgroundColor: "rgb(255, 211, 80)", color: "rgb(0, 0, 0)", opacity: "100" }}>Decorações particulares

            </a>
          </div>
        </div>
      </nav>

      <div className="page">

      <window.Hero onExploreClick={scrollToPortfolio} />

      <window.Filtros
        temas={temasParceria}
        query={query} setQuery={setQuery}
        categoria={categoria} setCategoria={setCategoria}
        totalFiltrados={temasFiltrados.length} />


      {temasParceria.length === 0 ?
      <div className="empty">
          <p><strong>Catálogo em construção.</strong></p>
          <p style={{ marginTop: 8, fontSize: 15 }}>
            A Cris está adicionando as decorações aos poucos.
            Em breve novos temas aparecem por aqui.
          </p>
        </div> :
      temasFiltrados.length === 0 ?
      <div className="empty">
          <p>Nenhum tema encontrado com esses filtros.</p>
          <button className="btn btn-ghost" onClick={() => {setQuery("");setCategoria("Todos");setTagsAtivas([]);}}>
            limpar filtros
          </button>
        </div> :

      <section className="grid">
          {temasFiltrados.map((t, i) =>
        <window.TemaCard key={t.id} tema={t} index={i} onOpen={setTemaAberto} />
        )}
        </section>
      }

      <window.Footer onAdminClick={() => setAdminOpen(true)} />

      {temaAberto && <window.TemaModal tema={temaAberto} onClose={() => setTemaAberto(null)} />}
      {adminOpen && <window.AdminPanel onClose={() => setAdminOpen(false)} temas={temas} setTemas={setTemas} />}
      </div>
    </React.Fragment>);

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);