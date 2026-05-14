// ===== Cris Borba Decorações — Home Page (Decorações Particulares) =====

// Categorias com placeholder de cor (cada uma um tom da paleta pastel)
const CATEGORIAS_HOME = [
{ id: "infantil", nome: "Aniversário Infantil", cor: "var(--amarelo)" },
{ id: "casamento", nome: "Casamento", cor: "var(--lilas)" },
{ id: "15-anos", nome: "15 anos", cor: "var(--salmao)" },
{ id: "cha-bebe", nome: "Chá de bebê", cor: "var(--menta)" },
{ id: "cha-revelacao", nome: "Chá de revelação", cor: "var(--azul)" },
{ id: "bodas", nome: "Bodas", cor: "var(--amarelo)" },
{ id: "batizado", nome: "Batizado", cor: "var(--menta)" },
{ id: "datas", nome: "Datas especiais", cor: "var(--lilas)" }];


// Pacotes — exatamente como descritos pelo cliente
const PACOTES = [
{
  tamanho: "Mini Decor · 1,5 m",
  titulo: "Mini Decor",
  itens: [
  "Painel redondo tema",
  "Bolo fake",
  "Trio cilindro",
  "Um vaso com arranjo artificial",
  "Suporte cerâmica para doces",
  "Meio arco de balão desconstruído",
  "Suporte para lembrancinha",
  "Personagens",
  "Tapete"],

  valor: "R$ 950,00"
},
{
  tamanho: "Cenário · 2,5 m",
  titulo: "Cenário Compacto",
  itens: [
  "Painel circular",
  "Painel lateral ou portal com arco desconstruído",
  "Tapete",
  "Uma mesa",
  "Bolo fake",
  "Um cilindro",
  "2 vasos com flores artificiais",
  "Suporte de cerâmica para doces",
  "Escadinha para lembrancinha",
  "Personagens",
  "Peças decorativas"],

  valor: "R$ 1.200,00",
  destaque: true,
  badge: "mais pedido"
},
{
  tamanho: "Cenário · 3,5 m",
  titulo: "Cenário Ampliado",
  itens: [
  "Painéis desconstruídos",
  "Arco de balões desconstruído",
  "Tapete",
  "Uma mesa",
  "Bolo fake",
  "Quatro cilindros",
  "Dois vasos com flores artificiais",
  "Suporte para doces",
  "Escadinha para lembrancinhas",
  "Personagens",
  "Peças decorativas"],

  valor: "R$ 1.450,00"
},
{
  tamanho: "Cenário · 5 m",
  titulo: "Cenário Completo",
  itens: [
  "Painéis desconstruídos ou inteiro",
  "Duas colunas de balões ou arco desconstruído",
  "Tapete",
  "Uma mesa",
  "Bolo fake",
  "Três cilindros",
  "Quatro vasos com flores artificiais",
  "Suporte de cerâmica para doces",
  "Suporte para lembrancinhas",
  "Personagens",
  "Peças decorativas",
  "Cubos desconstruídos"],

  valor: "R$ 1.690,00"
}];


// ===== HEADER =====
function Header() {
  const [openMenu, setOpenMenu] = React.useState(false);
  function scrollTo(id, e) {
    if (e) e.preventDefault();
    setOpenMenu(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  }
  return (
    <header className="home-header">
      <div className="home-header-inner">
        <a href="#inicio" className="home-brand" onClick={(e) => scrollTo("inicio", e)}>
          <img src="logo-cris-borba.jpeg" alt="Cris Borba Decorações" />
        </a>
        <button className="home-menu-toggle" onClick={() => setOpenMenu(!openMenu)} aria-label="Menu">
          {openMenu ? "✕" : "☰"}
        </button>
        <nav className={`home-menu ${openMenu ? "open" : ""}`}>
          <a href="#inicio" className="active" onClick={(e) => scrollTo("inicio", e)}>Início</a>
          <a href="#decoracoes" onClick={(e) => scrollTo("decoracoes", e)}>Decorações</a>
          <a href="#sobre" onClick={(e) => scrollTo("sobre", e)}>Sobre a Cris</a>
          <a href="#contato" onClick={(e) => scrollTo("contato", e)}>Contato</a>
          <a href="Cris Borba Decoracoes - Pastel.html" className="home-menu-cta" style={{ padding: "14px" }}>Parceiros →</a>
        </nav>
      </div>
    </header>);

}

// ===== HERO =====
function Hero() {
  function scrollToDecoracoes() {
    const el = document.getElementById("decoracoes");
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  }
  function scrollToContato() {
    const el = document.getElementById("contato");
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  }
  return (
    <section className="home-hero" id="inicio">
      <div className="home-hero-bg"></div>
      <div className="home-hero-confete confete-1"></div>
      <div className="home-hero-confete confete-2"></div>
      <div className="home-hero-confete confete-3"></div>
      <div className="home-hero-confete confete-4"></div>
      <div className="home-hero-confete confete-5"></div>

      <div className="home-hero-content">
        <div className="home-hero-eyebrow">
          <span className="dot"></span>
          <span>Decorações particulares · Feitas com afeto desde 2014</span>
        </div>
        <h1>
          Transformamos<br />
          <em>sonhos em</em><br />
          <span className="acc">memórias</span>.
        </h1>
        <p>
          Cada festa começa com um sonho. A Cris Borba Decorações
          cuida de cada detalhe para que o seu dia se torne uma lembrança
          que fica para sempre.
        </p>
        <div className="home-hero-actions">
          <button className="btn btn-primary btn-lg" onClick={scrollToDecoracoes}>
            Ver decorações
            <span className="arrow">→</span>
          </button>
          <button className="btn btn-ghost btn-lg" onClick={scrollToContato}>
            Fazer um orçamento
          </button>
        </div>
      </div>
    </section>);

}

// ===== BUSCA =====
function Busca({ query, setQuery, categoria, setCategoria, onSearch }) {
  return (
    <section className="home-busca">
      <form className="home-busca-inner" onSubmit={(e) => {e.preventDefault();onSearch();}}>
        <div className="home-busca-field">
          <span className="icon">⌕</span>
          <input
            type="text"
            placeholder="Pesquise um tema — ex: princesas, safari, K-pop…"
            value={query}
            onChange={(e) => setQuery(e.target.value)} />
          
        </div>
        <div className="home-busca-field has-select">
          <span className="icon">☰</span>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Todas as categorias</option>
            {CATEGORIAS_HOME.map((c) =>
            <option key={c.id} value={c.id}>{c.nome}</option>
            )}
          </select>
        </div>
        <button type="submit" className="home-busca-btn">Buscar</button>
      </form>
    </section>);

}

// ===== CATEGORIAS =====
function CategoriaCard({ cat, index, onSelect, selected }) {
  const numStr = String(index + 1).padStart(2, "0");
  const bg = {
    background: `
      radial-gradient(circle at 30% 25%, color-mix(in oklab, ${cat.cor} 70%, #FFFAF0) 0%, transparent 55%),
      radial-gradient(circle at 75% 70%, color-mix(in oklab, ${cat.cor} 50%, #FFFAF0) 0%, transparent 55%),
      radial-gradient(circle at 50% 95%, color-mix(in oklab, ${cat.cor} 40%, #FFFAF0) 0%, transparent 60%),
      #FFFAF0
    `
  };
  return (
    <a className={`cat-card${selected ? " cat-card-selected" : ""}`} href="#projetos"
      onClick={(e) => { e.preventDefault(); onSelect(cat); }}>
      <div className="cat-card-bg" style={bg}></div>
      <div className="cat-card-overlay"></div>
      <div className="cat-card-arrow">→</div>
      <div className="cat-card-content">
        <span className="cat-card-num">{numStr} · Categoria</span>
        <h3>{cat.nome}</h3>
      </div>
    </a>);
}

function Categorias({ onSelectCat, catSelecionada }) {
  return (
    <section className="home-categorias" id="decoracoes">
      <div className="home-section-head">
        <div className="left">
          <span className="home-section-tag">Por onde começar</span>
          <h2 className="home-section-title">
            Encontre a <em>decoração</em><br />perfeita para o seu evento.
          </h2>
          <p className="home-section-sub">
            Clique em uma categoria para ver as decorações disponíveis.
            Cada projeto tem um código único — ao falar com a Cris, basta mencioná-lo.
          </p>
        </div>
      </div>
      <div className="cat-grid">
        {CATEGORIAS_HOME.map((c, i) => (
          <CategoriaCard key={c.id} cat={c} index={i}
            onSelect={onSelectCat}
            selected={catSelecionada && catSelecionada.id === c.id} />
        ))}
      </div>
    </section>);
}

// ===== PACOTES =====
function PacoteCard({ pacote, onSolicitar }) {
  function abrirContato() {
    if (onSolicitar) onSolicitar(pacote);
    const el = document.getElementById("contato");
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  }
  return (
    <div className={`pacote-card ${pacote.destaque ? "featured" : ""}`}>
      {pacote.badge && <span className="pacote-badge">{pacote.badge}</span>}
      <span className="pacote-tamanho">{pacote.tamanho}</span>
      <h3 className="pacote-titulo">{pacote.titulo}</h3>
      <div className="pacote-sep"></div>
      <ul>
        {pacote.itens.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
      <div className="pacote-valor">
        <span className="pacote-valor-label">A partir de</span>
        <strong>{pacote.valor}</strong>
      </div>
      <button className="pacote-cta" onClick={abrirContato}>
        Solicitar orçamento
      </button>
    </div>);

}

function Pacotes({ onSolicitar }) {
  return (
    <section className="home-pacotes" id="valores">
      <div className="home-pacotes-inner">
        <div className="home-section-head">
          <div className="left">
            <span className="home-section-tag">Valores</span>
            <h2 className="home-section-title">
              Pacotes pensados <em>para cada</em><br />tipo de festa.
            </h2>
            <p className="home-section-sub">
              Escolha o tamanho de cenário que combina com o seu espaço.
              Todos os pacotes podem ser personalizados de acordo com o tema escolhido.
            </p>
          </div>
        </div>
        <div className="pacotes-grid">
          {PACOTES.map((p, i) => <PacoteCard key={i} pacote={p} onSolicitar={onSolicitar} />)}
        </div>
        <p className="home-pacotes-aviso">
          Valores podem variar de acordo com personalizações, deslocamento e data do evento.
        </p>
      </div>
    </section>);

}

// ===== SOBRE =====
function Sobre() {
  return (
    <section className="home-sobre" id="sobre">
      <div className="sobre-grid">
        <div className="sobre-foto">
          <div className="sobre-foto-deco d1"></div>
          <div className="sobre-foto-deco d2"></div>
          <img src="cris-foto.jpeg" alt="Cris Borba" className="sobre-foto-img" />
        </div>
        <div className="sobre-text">
          <span className="home-section-tag">Minha História</span>
          <h2>
            Do <em>sonho</em><br />à realidade.
          </h2>
          <p className="sub">
            A trajetória inspiradora da Cris Borba Decorações e como o amor pela família
            se transformou em um negócio de sucesso.
          </p>
          <p>
            Meu nome é <strong>Cristina Borba</strong>, e tenho o prazer de compartilhar
            um pouco sobre minha jornada no fascinante mundo da decoração. Ao longo
            de mais de 10 anos, dediquei-me com muito empenho e paixão a essa profissão,
            transformando um hobby em uma carreira gratificante.
          </p>
          <p>
            Minha história com a decoração começou com um amor genuíno por embelezar
            as festas das minhas quatro filhas. Desde pequenas, sempre adorei criar
            ambientes especiais e memoráveis para elas, e esse entusiasmo acabou se
            tornando o alicerce da minha profissão. Decidi, em um determinado momento,
            transformar essa paixão em minha carreira. Para mim, trabalhar com o que
            amamos é, acima de tudo, trabalhar com amor.
          </p>
          <p>
            Sou imensamente grata a todas as pessoas que me apoiaram e torceram por mim
            ao longo do caminho. Cada palavra de encorajamento e cada gesto de apoio
            foram fundamentais para que eu chegasse onde estou hoje.
          </p>
          <p>
            Atualmente, lidero uma equipe maravilhosa composta por <strong>cinco pessoas</strong>,
            todas familiares. Minha mãe, <strong>Cida</strong>, minha tia, <strong>Dina</strong>,
            e minhas filhas, <strong>Bruna</strong> e <strong>Manuella</strong>, são parte
            essencial desse time. Trabalhar ao lado deles é um privilégio e uma fonte
            constante de alegria e inspiração.
          </p>
          <p>
            Minha trajetória é um reflexo da minha dedicação e do carinho que tenho
            pelo que faço. Espero que minha história possa inspirar outros a seguir
            seus sonhos e a encontrar alegria no trabalho que realizam.
          </p>

          <div className="sobre-numeros">
            <div className="sobre-num">
              <strong>10+</strong>
              <span>anos de história</span>
            </div>
            <div className="sobre-num">
              <strong>5</strong>
              <span>pessoas no time, todas família</span>
            </div>
            <div className="sobre-num">
              <strong>500+</strong>
              <span>festas decoradas com carinho</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ===== CONTATO =====
function IconWhats() {return (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.523 5.286l-.999 3.648 3.965-1.633z" /></svg>);
}
function IconInsta() {return (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.265.058-1.645.069-4.849.069-3.205 0-3.584-.012-4.849-.069-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.647 2.163 15.268 2.163 12c0-3.204.012-3.584.069-4.849.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.149 0-3.515.012-4.756.067-1.052.048-1.62.219-2 .368-.5.194-.86.426-1.236.803-.376.376-.609.736-.803 1.236-.149.38-.32.949-.368 2-.055 1.241-.067 1.607-.067 4.756 0 3.149.012 3.515.067 4.756.048 1.052.219 1.62.368 2 .194.5.426.86.803 1.236.376.376.736.609 1.236.803.38.149.949.32 2 .368 1.241.055 1.607.067 4.756.067 3.149 0 3.515-.012 4.756-.067 1.052-.048 1.62-.219 2-.368.5-.194.86-.426 1.236-.803.376-.376.609-.736.803-1.236.149-.38.32-.949.368-2 .055-1.241.067-1.607.067-4.756 0-3.149-.012-3.515-.067-4.756-.048-1.052-.219-1.62-.368-2-.194-.5-.426-.86-.803-1.236-.376-.376-.736-.609-1.236-.803-.38-.149-.949-.32-2-.368-1.241-.055-1.607-.067-4.756-.067zm0 3.131A4.868 4.868 0 1 1 12 16.868 4.868 4.868 0 0 1 12 7.132zm0 8.027A3.159 3.159 0 1 0 12 8.841a3.159 3.159 0 0 0 0 6.318zm6.205-8.225a1.137 1.137 0 1 1-2.274 0 1.137 1.137 0 0 1 2.274 0z" /></svg>);
}
function IconMail() {return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>);
}
function IconFB() {return (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>);
}
function IconTikTok() {return (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.65a8.16 8.16 0 0 0 4.77 1.52V6.7a4.85 4.85 0 0 1-1.84-.01z" /></svg>);
}

function Contato({ mensagemInicial, onMensagemConsumida }) {
  const [form, setForm] = React.useState({ nome: "", email: "", mensagem: "" });
  const [enviado, setEnviado] = React.useState(false);

  // Quando vier uma mensagem inicial (de um pacote), preenche o textarea
  React.useEffect(() => {
    if (mensagemInicial) {
      setForm((f) => ({ ...f, mensagem: mensagemInicial }));
      if (onMensagemConsumida) onMensagemConsumida();
    }
  }, [mensagemInicial]);

  function enviar(e) {
    e.preventDefault();
    if (!form.nome.trim() || !form.email.trim() || !form.mensagem.trim()) return;
    setEnviado(true);
    setForm({ nome: "", email: "", mensagem: "" });
    setTimeout(() => setEnviado(false), 6000);
  }

  return (
    <section className="home-contato" id="contato">
      <div className="contato-grid">
        <div className="contato-info">
          <span className="contato-info-tag">Vamos conversar</span>
          <h2>Contato</h2>
          <p>
            Entre em contato preenchendo o formulário ou através dos nossos
            canais de atendimento.
          </p>

          <div className="contato-redes">
            <a className="contato-rede" href="https://wa.me/5511972375707" target="_blank" rel="noreferrer">
              <IconWhats /> WhatsApp
            </a>
            <a className="contato-rede" href="https://instagram.com/crisborba_eventos" target="_blank" rel="noreferrer">
              <IconInsta /> Instagram
            </a>
            <a className="contato-rede" href="mailto:crisborba_eventos@hotmail.com">
              <IconMail /> E-mail
            </a>
            <a className="contato-rede" href="https://www.tiktok.com/@crisborba_eventos" target="_blank" rel="noreferrer">
              <IconTikTok /> TikTok
            </a>
          </div>

          <div className="contato-detalhes">
            <div className="contato-detalhe">
              <span className="contato-detalhe-label">Atendimento</span>
              <span className="contato-detalhe-val">Seg. a Sex. · 9h às 17h30</span>
            </div>
            <div className="contato-detalhe">
              <span className="contato-detalhe-label">Ateliê</span>
              <span className="contato-detalhe-val">Osasco · SP</span>
            </div>
          </div>
        </div>

        <form className="contato-form" onSubmit={enviar}>
          <div className="contato-form-head">
            <h3>Conte sobre o seu evento</h3>
            <p>Responda em até 24h em dias úteis. Quanto mais detalhes, melhor o orçamento.</p>
          </div>

          {enviado &&
          <div className="contato-form-msg">
              ✓ Mensagem enviada! Em breve a Cris entra em contato.
            </div>
          }

          <div className="contato-row">
            <label>
              <span>Seu nome</span>
              <input
                type="text"
                placeholder="Como podemos te chamar"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                required />
              
            </label>
            <label>
              <span>Seu email</span>
              <input
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required />
              
            </label>
          </div>

          <label>
            <span>Mensagem</span>
            <textarea
              rows="5"
              placeholder="Escreva sua mensagem… conta pra gente o tema, data, local e quantas pessoas."
              value={form.mensagem}
              onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
              required />
            
          </label>

          <button type="submit">Enviar →</button>
        </form>
      </div>
    </section>);

}

// ===== FOOTER =====
function HomeFooter({ onAdminClick }) {
  return (
    <footer className="home-footer">
      <span>© 2026 Cris Borba Decorações <span className="sep">·</span> Cada festa, uma memória que fica.</span>
      <button className="home-footer-admin" onClick={onAdminClick}>área da Cris</button>
    </footer>);
}

// ===== APP =====
// ===== PORTFOLIO FILTRADO POR CATEGORIA =====
function PortfolioHome({ temas, catSelecionada, onClearCat, onOpen }) {
  const particulares = (temas || []).filter((t) => t.tipo === "particular");
  const filtradas = catSelecionada
    ? particulares.filter((t) => t.categoria === catSelecionada.nome)
    : particulares;

  if (particulares.length === 0) return null;

  return (
    <section className="home-particulares" id="projetos">
      <div className="home-particulares-inner">
        <div className="home-section-head">
          <div className="left">
            <span className="home-section-tag">Decorações</span>
            <h2 className="home-section-title">
              {catSelecionada
                ? catSelecionada.nome
                : <><em>Nossas</em><br />decorações</>}
            </h2>
            <p className="home-section-sub">
              Cada projeto tem um código único. Mencione o código ao falar com a Cris.
            </p>
            {catSelecionada && (
              <button onClick={onClearCat} style={{ marginTop: 10, fontSize: 13, textDecoration: "underline", color: "var(--fg-mute)" }}>
                ← ver todas as categorias
              </button>
            )}
          </div>
          <div className="filtros-count">
            <strong>{filtradas.length}</strong>
            <span>projeto{filtradas.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
        {filtradas.length === 0 ? (
          <div className="empty">
            <p>Nenhuma decoração cadastrada nesta categoria ainda.</p>
          </div>
        ) : (
          <div className="grid">
            {filtradas.map((t, i) =>
              <window.TemaCard key={t.id} tema={t} index={i} onOpen={onOpen} />
            )}
          </div>
        )}
      </div>
    </section>);
}

// ===== APP =====
function HomeApp() {
  const [query, setQuery] = React.useState("");
  const [categoria, setCategoria] = React.useState("");
  const [temas, setTemas] = React.useState(() => {
    const stored = window.loadTemas ? window.loadTemas() : null;
    return stored && Array.isArray(stored) ? stored : [];
  });
  const [adminOpen, setAdminOpen] = React.useState(false);
  const [mensagemInicial, setMensagemInicial] = React.useState("");
  const [temaAberto, setTemaAberto] = React.useState(null);
  const [catSelecionada, setCatSelecionada] = React.useState(null);

  function onSearch() {
    const el = document.getElementById("decoracoes");
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  }

  function onSelectCat(cat) {
    setCatSelecionada(cat);
    setTimeout(() => {
      const el = document.getElementById("projetos");
      if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
    }, 50);
  }

  function onSolicitarPacote(pacote) {
    const msg = `Olá, Cris! Tenho interesse no pacote "${pacote.titulo}" (${pacote.tamanho}), com valor a partir de ${pacote.valor}.\n\nGostaria de mais informações sobre disponibilidade e personalização.\n\nDetalhes do evento:\n- Tema desejado: \n- Data: \n- Local: \n- Quantidade de convidados: `;
    setMensagemInicial(msg);
  }

  return (
    <div className="home">
      <Header />
      <Hero />
      <Busca
        query={query}
        setQuery={setQuery}
        categoria={categoria}
        setCategoria={setCategoria}
        onSearch={onSearch} />

      <Categorias onSelectCat={onSelectCat} catSelecionada={catSelecionada} />
      <PortfolioHome temas={temas} catSelecionada={catSelecionada} onClearCat={() => setCatSelecionada(null)} onOpen={setTemaAberto} />
      <Pacotes onSolicitar={onSolicitarPacote} />
      <Sobre />
      <Contato
        mensagemInicial={mensagemInicial}
        onMensagemConsumida={() => setMensagemInicial("")} />
      
      <HomeFooter onAdminClick={() => setAdminOpen(true)} />
      {temaAberto && window.TemaModal &&
      <window.TemaModal tema={temaAberto} onClose={() => setTemaAberto(null)} />
      }
      {adminOpen && window.AdminPanel &&
      <window.AdminPanel onClose={() => setAdminOpen(false)} temas={temas} setTemas={setTemas} />
      }
    </div>);

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HomeApp />);