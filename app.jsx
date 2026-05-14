// App principal — junta tudo, controla estado de filtros, modal e admin.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direcao": "editorial",
  "amareloTom": "#F5C518",
  "acentoSecundario": "#0E0E0C",
  "tipografiaBold": true,
  "showAdminLink": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  // Aplica direção visual via data-attr no body
  React.useEffect(() => {
    document.body.dataset.direcao = tweaks.direcao;
    document.body.dataset.bold = tweaks.tipografiaBold ? "1" : "0";
    document.documentElement.style.setProperty("--amarelo", tweaks.amareloTom);
    document.documentElement.style.setProperty("--acento", tweaks.acentoSecundario);
  }, [tweaks.direcao, tweaks.tipografiaBold, tweaks.amareloTom, tweaks.acentoSecundario]);

  // Estado dos temas (com localStorage)
  const [temas, setTemas] = React.useState(() => {
    const stored = window.loadTemas();
    return stored && Array.isArray(stored) && stored.length ? stored : [...window.TEMAS_INICIAIS];
  });

  // Filtros
  const [query, setQuery] = React.useState("");
  const [categoria, setCategoria] = React.useState("Todos");
  const [tagsAtivas, setTagsAtivas] = React.useState([]);

  function toggleTag(t) {
    setTagsAtivas(tagsAtivas.includes(t) ? tagsAtivas.filter(x => x !== t) : [...tagsAtivas, t]);
  }

  // Filtragem
  const temasFiltrados = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return temas.filter(t => {
      if (categoria !== "Todos" && t.categoria !== categoria) return false;
      if (tagsAtivas.length > 0) {
        const has = tagsAtivas.every(tag => t.tags.includes(tag));
        if (!has) return false;
      }
      if (q) {
        const blob = (t.nome + " " + t.descricao + " " + t.tags.join(" ") + " " + t.categoria).toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [temas, query, categoria, tagsAtivas]);

  const [temaAberto, setTemaAberto] = React.useState(null);
  const [adminOpen, setAdminOpen] = React.useState(false);

  function scrollToPortfolio() {
    const el = document.getElementById("portfolio");
    if (el) window.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
  }

  return (
    <div className="page">
      <nav className="topbar">
        <div className="brand">
          <span className="brand-mark">CB</span>
          <span className="brand-name">Cris Borba<br /><em>Decorações</em></span>
        </div>
        <div className="topbar-links">
          <a href="#portfolio">Portfólio</a>
          <a href="#faq">FAQ</a>
          <a href="#instagram">Instagram</a>
          <a className="topbar-cta" href="https://instagram.com/crisborba.decoracoes" target="_blank" rel="noreferrer">
            Falar com a Cris →
          </a>
        </div>
      </nav>

      <window.Hero onExploreClick={scrollToPortfolio} totalTemas={temas.length} />

      <window.Filtros
        temas={temas}
        query={query} setQuery={setQuery}
        categoria={categoria} setCategoria={setCategoria}
        tagsAtivas={tagsAtivas} toggleTag={toggleTag}
        totalFiltrados={temasFiltrados.length}
      />

      {temasFiltrados.length === 0 ? (
        <div className="empty">
          <p>Nenhum tema encontrado com esses filtros.</p>
          <button className="btn btn-ghost" onClick={() => { setQuery(""); setCategoria("Todos"); setTagsAtivas([]); }}>
            limpar filtros
          </button>
        </div>
      ) : (
        <section className="grid">
          {temasFiltrados.map((t, i) => (
            <window.TemaCard key={t.id} tema={t} index={i} onOpen={setTemaAberto} />
          ))}
        </section>
      )}

      <window.FAQ />
      <window.Instagram />
      <window.Footer onAdminClick={() => setAdminOpen(true)} />

      {temaAberto && <window.TemaModal tema={temaAberto} onClose={() => setTemaAberto(null)} />}
      {adminOpen && <window.AdminPanel onClose={() => setAdminOpen(false)} temas={temas} setTemas={setTemas} />}

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Direção visual">
          <window.TweakSelect
            label="Direção"
            value={tweaks.direcao}
            onChange={(v) => setTweak("direcao", v)}
            options={[
              { value: "editorial", label: "Editorial Bold (default)" },
              { value: "soft", label: "Soft Romântico" },
              { value: "dark", label: "Dark Studio" },
            ]}
          />
        </window.TweakSection>

        <window.TweakSection title="Cores">
          <window.TweakColor
            label="Amarelo principal"
            value={tweaks.amareloTom}
            onChange={(v) => setTweak("amareloTom", v)}
          />
          <window.TweakColor
            label="Acento secundário"
            value={tweaks.acentoSecundario}
            onChange={(v) => setTweak("acentoSecundario", v)}
          />
        </window.TweakSection>

        <window.TweakSection title="Tipografia">
          <window.TweakToggle
            label="Títulos extra-bold"
            value={tweaks.tipografiaBold}
            onChange={(v) => setTweak("tipografiaBold", v)}
          />
        </window.TweakSection>

        <window.TweakSection title="Atalhos">
          <window.TweakButton onClick={() => setAdminOpen(true)}>
            Abrir área da Cris
          </window.TweakButton>
        </window.TweakSection>
      </window.TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
