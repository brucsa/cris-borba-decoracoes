// FAQ + Footer com Instagram CTA.

function FAQ() {
  const items = [
  {
    q: "Como funciona a contratação?",
    a: "Você navega o portfólio, escolhe os temas e versões que mais combinam com a sua festa, e entra em contato pelo Instagram. A partir daí, marcamos uma conversa para entender datas, espaço, número de convidados e personalizar tudo."
  },
  {
    q: "Posso misturar elementos de temas diferentes?",
    a: "Sim. A maioria das nossas decorações combina referências. Use o portfólio como ponto de partida e a gente desenha algo único para você."
  },
  {
    q: "Atendem em qualquer espaço?",
    a: "Atendemos em buffets, salões, casas e espaços ao ar livre. Fazemos visita técnica antes do evento para alinhar o cenário com a planta do local."
  },
  {
    q: "Os temas listados são os únicos disponíveis?",
    a: "Não. Esse portfólio mostra projetos já realizados e combinações testadas. Se você tem uma referência diferente, mande pra gente — adoramos criar do zero."
  },
  {
    q: "Com quanto tempo de antecedência preciso fechar?",
    a: "Para casamentos e eventos grandes, recomendamos pelo menos 90 dias. Para festas infantis e chás, 30 dias é confortável. Datas em alta temporada (dezembro, junho) lotam mais cedo."
  },
  {
    q: "Vocês fornecem só decoração ou o evento todo?",
    a: "Nosso foco é decoração e cenografia. Indicamos parceiros de buffet, fotografia, DJ e bolo conforme o estilo do seu evento."
  }];


  const [open, setOpen] = React.useState(0);

  return (
    <section className="faq" id="faq">
      <div className="faq-head">
        <span className="section-num">03</span>
        <h2 className="section-title">Perguntas frequentes</h2>
      </div>
      <div className="faq-list">
        {items.map((item, i) =>
        <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="faq-q-text">{item.q}</span>
              <span className="faq-toggle">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <div className="faq-a">{item.a}</div>}
          </div>
        )}
      </div>
    </section>);

}

function Instagram() {
  // Mock embed — placeholders coloridos com username.
  const posts = [
  "Amarelo & Preto", "Rosa & Dourado", "Boho Terracota", "Tropical",
  "Lavanda", "Verde & Branco", "Coral & Areia", "Azul Marinho"];

  return (
    <section className="instagram" id="instagram">
      <div className="ig-head">
        <span className="section-num">04</span>
        <div>
          <h2 className="section-title">No Instagram</h2>
          <p className="ig-handle">@crisborba.decoracoes</p>
        </div>
      </div>
      <div className="ig-grid">
        {posts.map((p, i) =>
        <a key={i} className="ig-post" href="#" onClick={(e) => e.preventDefault()}>
            <window.PlaceholderImg paleta={p} label={`post ${String(i + 1).padStart(2, "0")}`} />
            <div className="ig-overlay">
              <span>♡ {120 + i * 17}</span>
              <span>◯ {8 + i * 2}</span>
            </div>
          </a>
        )}
      </div>
    </section>);

}

function Footer({ onAdminClick }) {
  return (
    <footer className="home-footer" id="footer">
      <span>© 2026 Cris Borba Decorações</span>
      <span className="sep">·</span>
      <span>Cada festa, uma memória que fica.</span>
      <button className="home-footer-admin" onClick={onAdminClick}>
        área da Cris
      </button>
    </footer>
  );
}

window.FAQ = FAQ;
window.Instagram = Instagram;
window.Footer = Footer;