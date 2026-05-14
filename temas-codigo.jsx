// Adiciona códigos sequenciais globais (CRIS-001, CRIS-002…) em ordem alfabética.
// Por padrão, só mostra decorações que já têm imagem real cadastrada —
// a Cris adiciona as outras pelo painel admin conforme for fotografando.

function temaTemImagem(t) {
  return t.opcoes && t.opcoes.some(o => o.imagem && o.imagem.length > 0);
}

function getTemasComCodigo() {
  let counter = 0;
  return window.TEMAS_INICIAIS
    .filter(temaTemImagem)
    .map(t => ({
      ...t,
      opcoes: t.opcoes.map((o) => {
        counter += 1;
        return {
          ...o,
          codigo: o.codigo || `CRIS-${String(counter).padStart(3, "0")}`,
        };
      }),
    }));
}

window.getTemasComCodigo = getTemasComCodigo;
window.temaTemImagem = temaTemImagem;
