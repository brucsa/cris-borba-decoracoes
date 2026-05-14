// Componente de imagem placeholder usando paleta — sem desenhar SVG complexo.
// Usa gradientes em camadas pra dar textura tipo decoração.

function PlaceholderImg({ paleta, label, full }) {
  const cores = window.PALETTES[paleta] || window.PALETTES["Amarelo & Preto"];
  const [c1, c2, c3] = cores;
  const style = {
    background: `
      radial-gradient(circle at 30% 20%, ${c1}99 0%, transparent 45%),
      radial-gradient(circle at 75% 70%, ${c2}cc 0%, transparent 50%),
      radial-gradient(circle at 50% 95%, ${c3}88 0%, transparent 60%),
      repeating-linear-gradient(135deg, ${c1} 0px, ${c1} 18px, ${c2} 18px, ${c2} 19px),
      ${c3}
    `,
  };
  return (
    <div className={`ph-img ${full ? "ph-full" : ""}`} style={style}>
      <div className="ph-label" style={{ color: c3 === "#FFFFFF" || c3 === "#FAF8F2" || c3 === "#F2EEE3" || c3 === "#F2EFE6" || c3 === "#FFF1B8" || c3 === "#FFF6EE" || c3 === "#FFF1E6" || c3 === "#F5E6CC" || c3 === "#FFF6CC" || c3 === "#F5F0F8" || c3 === "#F5F0E0" || c3 === "#F8F4E9" || c3 === "#F1E6D2" ? "#0E0E0C" : "#FAF8F2" }}>
        <span className="ph-tag">FOTO</span>
        <span className="ph-text">{label}</span>
      </div>
      <div className="ph-grain" />
    </div>
  );
}

window.PlaceholderImg = PlaceholderImg;
