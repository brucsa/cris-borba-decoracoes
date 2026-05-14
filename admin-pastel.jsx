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

function gerarCodigo(nomeTema, indiceOpcao, offsetGlobal = 0) {
  const num = String((offsetGlobal || 0) + indiceOpcao + 1).padStart(3, "0");
  return `CRIS-${num}`;
}

async function uploadImagemSupabase(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 6)}.${ext}`;
  const { data, error } = await window.supabaseClient.storage
    .from('temas')
    .upload(fileName, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  const { data: pub } = window.supabaseClient.storage.from('temas').getPublicUrl(data.path);
  return pub.publicUrl;
}

function AdminPanelPastel({ onClose, temas, setTemas }) {
  const [logged, setLogged] = React.useState(() => sessionStorage.getItem(ADMIN_SESSION_P) === "1");
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [erro, setErro] = React.useState("");
  const [view, setView] = React.useState("list");
  const [editId, setEditId] = React.useState(null);

  const formVazio = { nome: "", categoria: "Aniversário Infantil", tipo: "parceria", tags: "", descricao: "", opcoes: [{ titulo: "", legenda: "", imagem: "" }] };
  const [form, setForm] = React.useState(formVazio);

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
    setOpcao(i, "imagem", "uploading");
    try {
      const url = await uploadImagemSupabase(file);
      setOpcao(i, "imagem", url);
    } catch (e) {
      setOpcao(i, "imagem", "");
      alert("Erro ao fazer upload: " + e.message);
    }
  }

  function salvarTema(e) {
    e.preventDefault();
    if (!form.nome.trim()) return alert("Nome obrigatório");
    const nomeTrim = form.nome.trim();
    let next;

    if (editId) {
      // Edição: preserva códigos existentes, gera novo só para opções novas
      let prox = temas.reduce((acc, t) => t.id === editId ? acc : acc + t.opcoes.length, 0);
      const atualizado = {
        ...temas.find(t => t.id === editId),
        nome: nomeTrim,
        categoria: form.categoria,
        tipo: form.tipo || "parceria",
        tags: form.tags.split(",").map(t => t.trim().toLowerCase()).filter(Boolean),
        descricao: form.descricao.trim() || "Tema personalizado adicionado pela Cris.",
        opcoes: form.opcoes.map((o) => {
          if (o.codigo) return { titulo: o.titulo.trim() || "Versão única", legenda: o.legenda.trim() || "", imagem: o.imagem || "", codigo: o.codigo };
          prox += 1;
          return { titulo: o.titulo.trim() || "Versão única", legenda: o.legenda.trim() || "", imagem: o.imagem || "", codigo: `CRIS-${String(prox).padStart(3, "0")}` };
        }),
      };
      next = temas.map(t => t.id === editId ? atualizado : t).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    } else {
      let prox = temas.reduce((acc, t) => acc + t.opcoes.length, 0);
      const novo = {
        id: nomeTrim.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
              .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now().toString(36),
        nome: nomeTrim,
        categoria: form.categoria,
        tipo: form.tipo || "parceria",
        tags: form.tags.split(",").map(t => t.trim().toLowerCase()).filter(Boolean),
        descricao: form.descricao.trim() || "Tema personalizado adicionado pela Cris.",
        opcoes: form.opcoes.map((o) => {
          prox += 1;
          return { titulo: o.titulo.trim() || "Versão única", legenda: o.legenda.trim() || "", imagem: o.imagem || "", codigo: `CRIS-${String(prox).padStart(3, "0")}` };
        }),
      };
      next = [...temas, novo].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    }

    setTemas(next);
    saveTemasPastel(next);
    setForm(formVazio);
    setEditId(null);
    setView("list");
  }

  function editarTema(tema) {
    setForm({
      nome: tema.nome,
      categoria: tema.categoria,
      tipo: tema.tipo || "parceria",
      tags: (tema.tags || []).join(", "),
      descricao: tema.descricao || "",
      opcoes: tema.opcoes.map(o => ({ titulo: o.titulo, legenda: o.legenda || "", imagem: o.imagem || "", codigo: o.codigo })),
    });
    setEditId(tema.id);
    setView("add");
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

  const categoriasOpts = ["Aniversário Infantil", "Casamento", "15 anos", "Chá de bebê", "Chá de revelação", "Bodas", "Batizado", "Datas especiais"];

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
              <button className={view === "list" ? "active" : ""} onClick={() => { setView("list"); setEditId(null); setForm(formVazio); }}>
                Temas ({temas.length})
              </button>
              <button className={view === "add" ? "active" : ""} onClick={() => { setEditId(null); setForm(formVazio); setView("add"); }}>
                {view === "add" && editId ? "Editando tema" : "+ Adicionar tema"}
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
                    <button className="admin-row-edit" onClick={() => editarTema(t)}>editar</button>
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
                    <option value="particular">Particular — aparece em "Decorações particulares"</option>
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
                    // Se já tem código (edição), mostra o código existente; senão preview do próximo
                    const baseCount = temas.reduce((acc, t) => t.id === editId ? acc : acc + t.opcoes.length, 0);
                    const codigoLabel = o.codigo ? o.codigo : `CRIS-${String(baseCount + i + 1).padStart(3, "0")} (novo)`;
                    return (
                      <div key={i} className="admin-opcao admin-opcao-pastel">
                        <div className="admin-opcao-pastel-top">
                          <span className="admin-opcao-num">{String(i + 1).padStart(2, "0")}</span>
                          <span className="admin-opcao-cod">código: <strong>{codigoLabel}</strong></span>
                          <button type="button" className="admin-opcao-rm" onClick={() => rmOpcao(i)}>remover</button>
                        </div>
                        <div className="admin-opcao-pastel-grid">
                          <div className="admin-img-up">
                            {o.imagem === "uploading" ? (
                              <div className="admin-img-drop" style={{cursor:"default"}}>
                                <span className="up-icon">⏳</span>
                                <span>enviando...</span>
                              </div>
                            ) : o.imagem ? (
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
                  <button type="button" className="btn btn-ghost" onClick={() => { setForm(formVazio); setEditId(null); setView("list"); }}>cancelar</button>
                  <button type="submit" className="btn btn-primary">{editId ? "Salvar alterações →" : "Salvar tema →"}</button>
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
