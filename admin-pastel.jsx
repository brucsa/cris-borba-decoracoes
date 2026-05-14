// Admin pastel — sem seletor de paleta, com upload de imagem por opção,
// e código único por imagem gerado automaticamente.
// Login: cris_borba / 13051994

const ADMIN_USER_P = "cris_borba";
const ADMIN_PASS_P = "13051994";
const STORAGE_KEY_P = "crisborba_temas_v2";  // v2: schema com imagens + códigos
const ADMIN_SESSION_P = "crisborba_admin_session";

function loadTemasPastel() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_P);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}
function saveTemasPastel(temas) {
  try { localStorage.setItem(STORAGE_KEY_P, JSON.stringify(temas)); } catch (e) {}
}
function resetTemasPastel() {
  try { localStorage.removeItem(STORAGE_KEY_P); } catch (e) {}
}

// Gera código tipo "CRIS-001", "CRIS-002" — prefixo fixo "CRIS" + número sequencial
// global por opção (mais personalizado, mantém a identidade da marca).
function gerarCodigo(nomeTema, indiceOpcao, offsetGlobal = 0) {
  const num = String((offsetGlobal || 0) + indiceOpcao + 1).padStart(3, "0");
  return `CRIS-${num}`;
}

// Lê arquivo de imagem como data URL (para uso simples sem backend)
function lerImagem(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function AdminPanelPastel({ onClose, temas, setTemas }) {
  const [logged, setLogged] = React.useState(() => sessionStorage.getItem(ADMIN_SESSION_P) === "1");
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [erro, setErro] = React.useState("");
  const [view, setView] = React.useState("list");

  const [form, setForm] = React.useState({
    nome: "",
    categoria: "Infantil",
    tipo: "parceria",
    tags: "",
    descricao: "",
    opcoes: [{ titulo: "", legenda: "", imagem: "" }],
  });

  function tryLogin(e) {
    e.preventDefault();
    if (user.trim() === ADMIN_USER_P && pass === ADMIN_PASS_P) {
      setLogged(true);
      sessionStorage.setItem(ADMIN_SESSION_P, "1");
      setErro("");
    } else {
      setErro("Usuário ou senha incorretos.");
    }
  }
  function logout() {
    setLogged(false); sessionStorage.removeItem(ADMIN_SESSION_P);
    setUser(""); setPass("");
  }

  function addOpcao() {
    setForm({ ...form, opcoes: [...form.opcoes, { titulo: "", legenda: "", imagem: "" }] });
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
  async function uploadOpcao(i, file) {
    if (!file) return;
    try {
      const dataUrl = await lerImagem(file);
      setOpcao(i, "imagem", dataUrl);
    } catch (e) {
      alert("Erro ao carregar imagem.");
    }
  }

  function salvarTema(e) {
    e.preventDefault();
    if (!form.nome.trim()) return alert("Nome obrigatório");
    const nomeTrim = form.nome.trim();
    // Próximo número global = total de opções existentes + 1
    let prox = temas.reduce((acc, t) => acc + t.opcoes.length, 0);
    const novo = {
      id: nomeTrim.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now().toString(36),
      nome: nomeTrim,
      categoria: form.categoria,
      tipo: form.tipo || "parceria",
      tags: form.tags.split(",").map(t => t.trim().toLowerCase()).filter(Boolean),
      descricao: form.descricao.trim() || "Tema personalizado adicionado pela Cris.",
      opcoes: form.opcoes.map((o) => {
        prox += 1;
        return {
          titulo: o.titulo.trim() || "Versão única",
          legenda: o.legenda.trim() || "",
          imagem: o.imagem || "",
          codigo: `CRIS-${String(prox).padStart(3, "0")}`,
        };
      }),
    };
    const next = [...temas, novo].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    setTemas(next);
    saveTemasPastel(next);
    setForm({ nome: "", categoria: "Infantil", tipo: "parceria", tags: "", descricao: "", opcoes: [{ titulo: "", legenda: "", imagem: "" }] });
    setView("list");
  }

  function removerTema(id) {
    if (!confirm("Remover este tema?")) return;
    const next = temas.filter(t => t.id !== id);
    setTemas(next); saveTemasPastel(next);
  }

  function resetar() {
    if (!confirm("Voltar para a lista padrão de temas? Suas adições serão perdidas.")) return;
    resetTemasPastel();
    setTemas(window.getTemasComCodigo());
  }

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
                      <window.PlaceholderImg paleta={t.opcoes[0].paleta || "Pastel Misto"} imagem={t.opcoes[0].imagem} label="" />
                    </div>
                    <div className="admin-row-info">
                      <strong>{t.nome} <span className="admin-tipo-badge" data-tipo={t.tipo || "parceria"}>{(t.tipo || "parceria") === "particular" ? "Particular" : "Parceria"}</span></strong>
                      <span>{t.categoria} · {t.opcoes.length} opç{t.opcoes.length > 1 ? "ões" : "ão"} · códigos: {t.opcoes.map(o => o.codigo).join(", ")}</span>
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
                  <span>Tipo de decoração *</span>
                  <select value={form.tipo} onChange={(e) => setForm({...form, tipo: e.target.value})}>
                    <option value="parceria">Parceria com buffet — aparece no portfólio principal</option>
                    <option value="particular">Particular — aparece em “Decorações particulares”</option>
                  </select>
                </label>

                <label>
                  <span>Palavras-chave (separadas por vírgula)</span>
                  <input type="text" value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} placeholder="menina, fantasia, colorido, 1 ano" />
                </label>

                <label>
                  <span>Descrição</span>
                  <textarea rows="3" value={form.descricao} onChange={(e) => setForm({...form, descricao: e.target.value})} placeholder="Conte sobre o tema, atmosfera, elementos…" />
                </label>

                <div className="admin-opcoes">
                  <div className="admin-opcoes-head">
                    <span>Opções/versões deste tema · cada uma recebe um código automático</span>
                    <button type="button" onClick={addOpcao}>+ adicionar opção</button>
                  </div>
                  {form.opcoes.map((o, i) => {
                    // Preview do próximo código global
                    const baseCount = temas.reduce((acc, t) => acc + t.opcoes.length, 0);
                    const codigoPreview = `CRIS-${String(baseCount + i + 1).padStart(3, "0")}`;
                    return (
                      <div key={i} className="admin-opcao admin-opcao-pastel">
                        <div className="admin-opcao-pastel-top">
                          <span className="admin-opcao-num">{String(i + 1).padStart(2, "0")}</span>
                          <span className="admin-opcao-cod">código: <strong>{codigoPreview}</strong></span>
                          <button type="button" className="admin-opcao-rm" onClick={() => rmOpcao(i)}>remover</button>
                        </div>
                        <div className="admin-opcao-pastel-grid">
                          <div className="admin-img-up">
                            {o.imagem ? (
                              <div className="admin-img-preview">
                                <img src={o.imagem} alt="preview" />
                                <button type="button" onClick={() => setOpcao(i, "imagem", "")}>trocar</button>
                              </div>
                            ) : (
                              <label className="admin-img-drop">
                                <input type="file" accept="image/*" onChange={(e) => uploadOpcao(i, e.target.files[0])} />
                                <span className="up-icon">⤴</span>
                                <span>enviar imagem</span>
                              </label>
                            )}
                          </div>
                          <div className="admin-opcao-fields-pastel">
                            <input
                              type="text"
                              placeholder="Título da versão (ex: Versão Boho)"
                              value={o.titulo}
                              onChange={(e) => setOpcao(i, "titulo", e.target.value)}
                            />
                            <input
                              type="text"
                              placeholder="Legenda curta"
                              value={o.legenda}
                              onChange={(e) => setOpcao(i, "legenda", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

window.AdminPanel = AdminPanelPastel;
window.loadTemas = loadTemasPastel;
window.saveTemas = saveTemasPastel;
window.gerarCodigo = gerarCodigo;
