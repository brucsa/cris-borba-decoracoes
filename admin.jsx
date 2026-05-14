// Painel admin: login + listagem + adicionar/remover tema.
// Persiste em localStorage. Login: cris_borba / 13051994

const ADMIN_USER = "cris_borba";
const ADMIN_PASS = "13051994";
const STORAGE_KEY = "crisborba_temas_v1";
const ADMIN_SESSION = "crisborba_admin_session";

function loadTemas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}
function saveTemas(temas) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(temas));
  } catch (e) {}
}
function resetTemas() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

function AdminPanel({ onClose, temas, setTemas }) {
  const [logged, setLogged] = React.useState(() => sessionStorage.getItem(ADMIN_SESSION) === "1");
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [erro, setErro] = React.useState("");
  const [view, setView] = React.useState("list"); // list | add

  // Form add tema
  const [form, setForm] = React.useState({
    nome: "",
    categoria: "Infantil",
    tags: "",
    descricao: "",
    opcoes: [{ titulo: "", paleta: "Amarelo & Preto", legenda: "" }],
  });

  function tryLogin(e) {
    e.preventDefault();
    if (user.trim() === ADMIN_USER && pass === ADMIN_PASS) {
      setLogged(true);
      sessionStorage.setItem(ADMIN_SESSION, "1");
      setErro("");
    } else {
      setErro("Usuário ou senha incorretos.");
    }
  }
  function logout() {
    setLogged(false);
    sessionStorage.removeItem(ADMIN_SESSION);
    setUser("");
    setPass("");
  }

  function addOpcao() {
    setForm({ ...form, opcoes: [...form.opcoes, { titulo: "", paleta: "Amarelo & Preto", legenda: "" }] });
  }
  function rmOpcao(i) {
    if (form.opcoes.length === 1) return;
    setForm({ ...form, opcoes: form.opcoes.filter((_, idx) => idx !== i) });
  }
  function setOpcao(i, key, val) {
    const next = [...form.opcoes];
    next[i] = { ...next[i], [key]: val };
    setForm({ ...form, opcoes: next });
  }

  function salvarTema(e) {
    e.preventDefault();
    if (!form.nome.trim()) return alert("Nome obrigatório");
    const novo = {
      id: form.nome.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now().toString(36),
      nome: form.nome.trim(),
      categoria: form.categoria,
      tags: form.tags.split(",").map(t => t.trim().toLowerCase()).filter(Boolean),
      descricao: form.descricao.trim() || "Tema personalizado adicionado pela Cris.",
      opcoes: form.opcoes.map(o => ({
        titulo: o.titulo.trim() || "Versão única",
        paleta: o.paleta,
        legenda: o.legenda.trim() || "",
      })),
    };
    const next = [...temas, novo].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    setTemas(next);
    saveTemas(next);
    setForm({
      nome: "", categoria: "Infantil", tags: "", descricao: "",
      opcoes: [{ titulo: "", paleta: "Amarelo & Preto", legenda: "" }],
    });
    setView("list");
  }

  function removerTema(id) {
    if (!confirm("Remover este tema?")) return;
    const next = temas.filter(t => t.id !== id);
    setTemas(next);
    saveTemas(next);
  }

  function resetar() {
    if (!confirm("Voltar para a lista padrão de 30 temas? Suas adições serão perdidas.")) return;
    resetTemas();
    setTemas([...window.TEMAS_INICIAIS]);
  }

  const paletasList = Object.keys(window.PALETTES);
  const categoriasOpts = ["Infantil", "Casamento", "Adulto", "Corporativo", "Sazonal"];

  return (
    <div className="admin-backdrop" onClick={onClose}>
      <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
        <header className="admin-head">
          <div>
            <span className="admin-eyebrow">Cris Borba Decorações</span>
            <h2>Área da Cris</h2>
          </div>
          <button className="admin-close" onClick={onClose}>fechar ✕</button>
        </header>

        {!logged ? (
          <form className="admin-login" onSubmit={tryLogin}>
            <p>Acesso restrito ao administrador. Entre com seu login.</p>
            <label>
              <span>Usuário</span>
              <input type="text" value={user} onChange={(e) => setUser(e.target.value)} autoFocus />
            </label>
            <label>
              <span>Senha</span>
              <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
            </label>
            {erro && <p className="admin-erro">{erro}</p>}
            <button type="submit" className="btn btn-primary">Entrar →</button>
          </form>
        ) : (
          <div className="admin-body">
            <nav className="admin-nav">
              <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
                Temas ({temas.length})
              </button>
              <button className={view === "add" ? "active" : ""} onClick={() => setView("add")}>
                + Adicionar tema
              </button>
              <div className="admin-nav-spacer" />
              <button className="admin-nav-side" onClick={resetar}>resetar</button>
              <button className="admin-nav-side" onClick={logout}>sair</button>
            </nav>

            {view === "list" && (
              <div className="admin-list">
                {temas.map((t, i) => (
                  <div key={t.id} className="admin-row">
                    <span className="admin-row-num">{String(i + 1).padStart(2, "0")}</span>
                    <div className="admin-row-thumb">
                      <window.PlaceholderImg paleta={t.opcoes[0].paleta} label="" />
                    </div>
                    <div className="admin-row-info">
                      <strong>{t.nome}</strong>
                      <span>{t.categoria} · {t.opcoes.length} opç{t.opcoes.length > 1 ? "ões" : "ão"} · {t.tags.length} tags</span>
                    </div>
                    <button className="admin-row-rm" onClick={() => removerTema(t.id)}>remover</button>
                  </div>
                ))}
              </div>
            )}

            {view === "add" && (
              <form className="admin-form" onSubmit={salvarTema}>
                <div className="admin-form-row">
                  <label>
                    <span>Nome do tema *</span>
                    <input type="text" value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} placeholder="ex: Unicórnios" />
                  </label>
                  <label>
                    <span>Categoria</span>
                    <select value={form.categoria} onChange={(e) => setForm({...form, categoria: e.target.value})}>
                      {categoriasOpts.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </label>
                </div>

                <label>
                  <span>Tags (separadas por vírgula)</span>
                  <input type="text" value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} placeholder="menina, fantasia, colorido, 1 ano" />
                </label>

                <label>
                  <span>Descrição</span>
                  <textarea rows="3" value={form.descricao} onChange={(e) => setForm({...form, descricao: e.target.value})} placeholder="Conte sobre o tema, atmosfera, elementos…" />
                </label>

                <div className="admin-opcoes">
                  <div className="admin-opcoes-head">
                    <span>Opções/versões deste tema</span>
                    <button type="button" onClick={addOpcao}>+ adicionar opção</button>
                  </div>
                  {form.opcoes.map((o, i) => (
                    <div key={i} className="admin-opcao">
                      <span className="admin-opcao-num">{String(i + 1).padStart(2, "0")}</span>
                      <div className="admin-opcao-fields">
                        <input
                          type="text"
                          placeholder="Título da versão (ex: Versão Boho)"
                          value={o.titulo}
                          onChange={(e) => setOpcao(i, "titulo", e.target.value)}
                        />
                        <select value={o.paleta} onChange={(e) => setOpcao(i, "paleta", e.target.value)}>
                          {paletasList.map(p => <option key={p}>{p}</option>)}
                        </select>
                        <input
                          type="text"
                          placeholder="Legenda curta"
                          value={o.legenda}
                          onChange={(e) => setOpcao(i, "legenda", e.target.value)}
                        />
                      </div>
                      <button type="button" className="admin-opcao-rm" onClick={() => rmOpcao(i)}>remover</button>
                    </div>
                  ))}
                </div>

                <div className="admin-form-foot">
                  <button type="button" className="btn btn-ghost" onClick={() => setView("list")}>cancelar</button>
                  <button type="submit" className="btn btn-primary">Salvar tema →</button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

window.AdminPanel = AdminPanel;
window.loadTemas = loadTemas;
window.saveTemas = saveTemas;
