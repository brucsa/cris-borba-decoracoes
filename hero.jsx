// Hero editorial — tipografia gigante à esquerda, imagem grande à direita, marquee inferior.

function Hero({ onExploreClick, totalTemas }) {
  return (
    <section className="hero">
      <div className="hero-top">
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="dot" />
            <span>Decoração de eventos · Desde 2015</span>
          </div>
          <h1 className="hero-title">
            <span className="line">Cada festa</span>
            <span className="line italic">tem o seu</span>
            <span className="line accent">próprio tom.</span>
          </h1>
          <p className="hero-sub">
            Portfólio vivo da Cris Borba. Navegue por <strong>{totalTemas} temas</strong> em
            ordem alfabética, filtre por estilo e encontre a atmosfera que combina
            com o seu evento.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onExploreClick}>
              Explorar portfólio
              <span className="arrow">→</span>
            </button>
            <a className="btn btn-ghost" href="#faq">
              Como funciona
            </a>
          </div>
        </div>

        <div className="hero-img">
          <window.PlaceholderImg
            paleta="Amarelo & Preto"
            label="capa editorial — mesa de evento principal"
            full
          />
          <div className="hero-img-meta">
            <span>nº 001</span>
            <span>Boho Amarelo · 2025</span>
          </div>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          {["Casamentos","Aniversários","Chá de bebê","Chá de revelação","Bodas","15 anos","Batizados","Formaturas","Corporativo","Casamentos","Aniversários","Chá de bebê","Chá de revelação","Bodas","15 anos","Batizados"].map((t, i) => (
            <span className="marquee-item" key={i}>
              <span className="marquee-num">{String((i % 9) + 1).padStart(2, "0")}</span>
              {t}
              <span className="marquee-sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
