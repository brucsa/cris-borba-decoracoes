// Card e Modal — pastel. Mostra código por opção, CTA com código no WhatsApp/Instagram,
// botão amarelo com texto preto.

function TemaCardPastel({ tema, index, onOpen }) {
  const opcao = tema.opcoes[0];
  const numStr = String(index + 1).padStart(2, "0");
  return (
    <article className="card" onClick={() => onOpen(tema)}>
      <div className="card-img-wrap">
        <window.PlaceholderImg paleta={opcao.paleta} imagem={opcao.imagem} label={tema.nome} />
        <div className="card-num">{numStr}</div>
        {tema.opcoes.length > 1 && (
          <div className="card-opts">+{tema.opcoes.length - 1} vers{tema.opcoes.length > 2 ? "ões" : "ão"}</div>
        )}
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span>{tema.categoria}</span>
          <span>·</span>
          <span>{tema.opcoes.length} opç{tema.opcoes.length > 1 ? "ões" : "ão"}</span>
        </div>
        <h3 className="card-title">{tema.nome}</h3>
      </div>
    </article>
  );
}

function TemaModalPastel({ tema, onClose }) {
  const [opcaoIdx, setOpcaoIdx] = React.useState(0);
  const [zoom, setZoom] = React.useState(false);

  React.useEffect(() => {
    setOpcaoIdx(0);
    setZoom(false);
  }, [tema]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (zoom) setZoom(false); else onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, onClose]);

  if (!tema) return null;
  const opcao = tema.opcoes[opcaoIdx];
  const codigo = opcao.codigo || "—";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <span>fechar</span>
          <span className="x">✕</span>
        </button>

        <div className="modal-grid">
          <div className="modal-img-col">
            <div className="modal-img" onClick={() => setZoom(true)}>
              <window.PlaceholderImg paleta={opcao.paleta} imagem={opcao.imagem} label={`${tema.nome} — ${opcao.titulo}`} full />
              <div className="modal-zoom-hint">
                <span>⌕</span> clique para ampliar
              </div>
            </div>
            {tema.opcoes.length > 1 && (
              <div className="modal-thumbs">
                {tema.opcoes.map((o, i) => (
                  <button
                    key={i}
                    className={`modal-thumb ${i === opcaoIdx ? "active" : ""}`}
                    onClick={() => setOpcaoIdx(i)}
                  >
                    <window.PlaceholderImg paleta={o.paleta} imagem={o.imagem} label={o.titulo} />
                    <span>{o.titulo}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="modal-info">
            <div className="modal-cat">{tema.categoria}</div>
            <h2 className="modal-title">{tema.nome}</h2>
            <p className="modal-desc">{tema.descricao}</p>

            <div className="modal-section">
              <div className="modal-opcao-head">
                <div>
                  <span className="modal-section-label">Opção em destaque</span>
                  <h3 className="modal-opcao-titulo">{opcao.titulo}</h3>
                </div>
                <div className="modal-codigo">
                  <span>código</span>
                  <strong>{codigo}</strong>
                </div>
              </div>
              {opcao.legenda && <p className="modal-opcao-legenda">{opcao.legenda}</p>}
            </div>

            <div className="modal-foot">
              <div className="codigo-aviso">
                <span className="codigo-aviso-label">Importante</span>
                <p>Ao falar com a Cris, mencione o código <strong>{codigo}</strong> para identificar exatamente a decoração e versão.</p>
              </div>
            </div>
          </div>
        </div>

        {zoom && (
          <div className="zoom-overlay" onClick={() => setZoom(false)}>
            <button className="zoom-close" onClick={() => setZoom(false)}>fechar ✕</button>
            <div className="zoom-img">
              <window.PlaceholderImg paleta={opcao.paleta} imagem={opcao.imagem} label={`${tema.nome} — ${opcao.titulo}`} full />
            </div>
            <div className="zoom-caption">
              {tema.nome} · {opcao.titulo} · <strong style={{color: "var(--amarelo)"}}>{codigo}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.TemaCard = TemaCardPastel;
window.TemaModal = TemaModalPastel;
