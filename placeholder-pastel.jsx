// Placeholder pastel — agora aceita imagem opcional. Se vier, mostra a imagem.
// Senão, mantém o blob de cores suaves e label monospace.

function PlaceholderImgPastel({ paleta, label, full, imagem }) {
  if (imagem) {
    return (
      <div className={`ph-img ${full ? "ph-full" : ""} ph-real`}>
        <img src={imagem} alt={label || ""} />
      </div>
    );
  }
  const cores = window.PALETTES[paleta] || window.PALETTES["Pastel Misto"];
  const [c1, c2, c3] = cores;
  const soften = (hex) => `color-mix(in oklab, ${hex} 55%, #FFFAF0)`;
  const sc1 = soften(c1), sc2 = soften(c2), sc3 = soften(c3);
  const style = {
    background: `
      radial-gradient(circle at 28% 30%, ${sc1} 0%, transparent 55%),
      radial-gradient(circle at 78% 65%, ${sc2} 0%, transparent 55%),
      radial-gradient(circle at 50% 90%, ${sc3} 0%, transparent 60%),
      #FFFAF0
    `,
  };
  return (
    <div className={`ph-img ${full ? "ph-full" : ""}`} style={style}>
      <div className="ph-label">
        <span className="ph-tag">foto</span>
        <span className="ph-text">{label}</span>
      </div>
    </div>
  );
}

window.PlaceholderImg = PlaceholderImgPastel;
