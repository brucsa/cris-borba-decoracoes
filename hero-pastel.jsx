// Hero pastel — bolinhas decorativas, formato circular na imagem, eyebrow em pílula.

function HeroPastel({ onExploreClick }) {
  return (
    <section className="hero">
      <div className="hero-top">
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="dot" />
            <span>Decoração de eventos · Feita com carinho</span>
          </div>
          <h1 className="hero-title">
            <span className="line">Decorações</span>
            <span className="line italic">em buffets</span>
            <span className="line"><span className="accent">parceiros</span>.</span>
          </h1>
          <p className="hero-sub">
            A união da nossa assinatura visual com a estrutura dos melhores buffets
            para tornar o seu evento inesquecível.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onExploreClick}>
              Ver projetos
              <span className="arrow">→</span>
            </button>
            <a className="btn btn-ghost" href="#faq">
              Como funciona
            </a>
          </div>
        </div>

        <div className="hero-img-wrap" style={{ position: "relative" }}>
          <div className="hero-dot d1" />
          <div className="hero-dot d2" />
          <div className="hero-dot d3" />
          <div className="hero-img">
            <window.PlaceholderImg
              paleta="Pastel Misto"
              label="capa — mesa de evento principal"
              full
            />
          </div>
        </div>
      </div>

    </section>
  );
}

window.Hero = HeroPastel;
