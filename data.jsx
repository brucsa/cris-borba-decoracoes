// 30 temas em ordem alfabética. Cada um pode ter múltiplas opções/variações.
// Imagens são placeholders com gradientes/listras — Cris substitui no painel admin.

const PALETTES = {
  "Amarelo & Preto":  ["#F5C518", "#0E0E0C", "#FAF8F2"],
  "Rosa & Dourado":   ["#F4B8C4", "#D4A017", "#FFF1E6"],
  "Verde & Branco":   ["#7BA688", "#F8F4E9", "#2E3A2E"],
  "Azul Marinho":     ["#1E2A44", "#C9B98A", "#F2EEE3"],
  "Lavanda":          ["#B9A6D4", "#5C4A7A", "#F5F0F8"],
  "Coral & Areia":    ["#E07856", "#E8C9A8", "#FFF6EE"],
  "Vermelho Cereja":  ["#B82C3D", "#F5E6CC", "#1A0E0F"],
  "Off-White & Verde":["#EFEAD8", "#3F5340", "#FAF8F2"],
  "Boho Terracota":   ["#C26C4A", "#9A7B4F", "#F1E6D2"],
  "Pastel Misto":     ["#F4C8D0", "#C8E0F4", "#FFF6CC"],
  "Preto & Dourado":  ["#0E0E0C", "#D4A017", "#F5F0E0"],
  "Tropical":         ["#1F7A4D", "#F2A93A", "#FFF1B8"],
  "Cinza & Mostarda": ["#5A5852", "#E8A93C", "#F2EFE6"],
  "Tiffany":          ["#7DD3C0", "#F8F4E9", "#0E2E2A"],
  "Branco Total":     ["#FFFFFF", "#E8E4D8", "#7A786E"],
};

// Helper: cria estilo de placeholder consistente (gradiente diagonal sutil sobre cor base)
function placeholder(c1, c2) {
  return `linear-gradient(135deg, ${c1} 0%, ${c1} 40%, ${c2} 40%, ${c2} 60%, ${c1} 60%, ${c1} 100%)`;
}

const TEMAS_INICIAIS = [
  {
    id: "abelhinhas",
    nome: "Abelhinhas",
    categoria: "Infantil",
    tags: ["amarelo", "fofo", "natureza", "menino", "menina", "1 ano"],
    descricao: "Tema doce e ensolarado, perfeito para festas de 1 e 2 anos. Combina amarelo, preto e mel com elementos de favo.",
    opcoes: [
      { titulo: "Versão Clássica", paleta: "Amarelo & Preto", legenda: "Mesa principal com favo gigante" },
      { titulo: "Versão Boho", paleta: "Boho Terracota", legenda: "Pampas + cera + amarelo queimado" },
      { titulo: "Versão Mini", paleta: "Pastel Misto", legenda: "Para festinhas em casa" },
    ],
  },
  {
    id: "alice-pais-maravilhas",
    nome: "Alice no País das Maravilhas",
    categoria: "Infantil",
    tags: ["fantasia", "menina", "ch\u00e1", "literatura", "colorido"],
    descricao: "Mesa de chá maluca com xícaras flutuantes, cartas de baralho e cogumelos cenográficos.",
    opcoes: [
      { titulo: "Whimsical", paleta: "Pastel Misto", legenda: "Versão lúdica e colorida" },
      { titulo: "Editorial", paleta: "Vermelho Cereja", legenda: "Versão sofisticada para 15 anos" },
    ],
  },
  {
    id: "boho-chic",
    nome: "Boho Chic",
    categoria: "Casamento",
    tags: ["r\u00fastico", "natural", "neutro", "campo", "casamento", "bodas"],
    descricao: "Pampas, macramê, madeira crua e velas. Atmosfera relaxada e atemporal para cerimônias ao ar livre.",
    opcoes: [
      { titulo: "Pampas & Velas", paleta: "Boho Terracota", legenda: "Cerimônia ao ar livre" },
      { titulo: "Indoor Boho", paleta: "Off-White & Verde", legenda: "Salão fechado com tapeçaria" },
    ],
  },
  {
    id: "borboletas",
    nome: "Borboletas",
    categoria: "Infantil",
    tags: ["menina", "delicado", "primavera", "jardim", "colorido"],
    descricao: "Borboletas em diferentes escalas atravessando a mesa, com flores em tons pastel.",
    opcoes: [
      { titulo: "Jardim Pastel", paleta: "Pastel Misto", legenda: "Mesa principal com cascata" },
      { titulo: "Monocrom\u00e1tico", paleta: "Lavanda", legenda: "Tudo em tons de lil\u00e1s" },
    ],
  },
  {
    id: "bosque-encantado",
    nome: "Bosque Encantado",
    categoria: "Infantil",
    tags: ["natureza", "verde", "menino", "menina", "fantasia"],
    descricao: "Cogumelos, raposas, troncos e musgo. Mesa com altura variada simulando uma clareira.",
    opcoes: [
      { titulo: "Versão Diurna", paleta: "Verde & Branco", legenda: "Iluminação clara e quente" },
      { titulo: "Versão Noturna", paleta: "Azul Marinho", legenda: "Lanternas e luz baixa" },
    ],
  },
  {
    id: "candy-color",
    nome: "Candy Color",
    categoria: "Infantil",
    tags: ["colorido", "doces", "festa", "menina", "alegre"],
    descricao: "Doceria explosiva: pirulitos gigantes, balões em tons de algodão-doce, displays de balas.",
    opcoes: [
      { titulo: "Mesa Principal", paleta: "Pastel Misto", legenda: "Explosão de cores" },
    ],
  },
  {
    id: "circo",
    nome: "Circo",
    categoria: "Infantil",
    tags: ["colorido", "festa", "menino", "menina", "vintage"],
    descricao: "Listras vermelhas, pipoca, leões de pelúcia e tipografia retrô de circo.",
    opcoes: [
      { titulo: "Circo Cl\u00e1ssico", paleta: "Vermelho Cereja", legenda: "Vermelho, branco e dourado" },
      { titulo: "Circo Vintage", paleta: "Coral & Areia", legenda: "Tons amaciados, m\u00e3o-pintado" },
    ],
  },
  {
    id: "corporativo-minimal",
    nome: "Corporativo Minimal",
    categoria: "Corporativo",
    tags: ["empresa", "evento", "minimal", "neutro", "lan\u00e7amento"],
    descricao: "Cenografia limpa para lançamentos, painéis com identidade da marca e mobiliário modular.",
    opcoes: [
      { titulo: "Branco & Marca", paleta: "Branco Total", legenda: "Foco no logo do cliente" },
      { titulo: "Premiação", paleta: "Preto & Dourado", legenda: "Para galas e premiações" },
    ],
  },
  {
    id: "dinossauros",
    nome: "Dinossauros",
    categoria: "Infantil",
    tags: ["menino", "aventura", "natureza", "verde"],
    descricao: "Selva pré-histórica com folhagens grandes, ovos, vulcão cenográfico e dinos em diferentes escalas.",
    opcoes: [
      { titulo: "Vers\u00e3o Selva", paleta: "Tropical", legenda: "Verde intenso e laranja" },
      { titulo: "Vers\u00e3o Educativa", paleta: "Cinza & Mostarda", legenda: "Tons terrosos, mais s\u00f3brio" },
    ],
  },
  {
    id: "fada-madrinha",
    nome: "Fada Madrinha",
    categoria: "Infantil",
    tags: ["princesa", "menina", "fantasia", "delicado"],
    descricao: "Brilho, varinhas, cetim e tons de rosa empoeirado. Para princesas que prestam atenção nos detalhes.",
    opcoes: [
      { titulo: "Rosa Cl\u00e1ssico", paleta: "Rosa & Dourado", legenda: "Vers\u00e3o tradicional" },
      { titulo: "Lil\u00e1s Estrelado", paleta: "Lavanda", legenda: "Vers\u00e3o noturna com estrelas" },
    ],
  },
  {
    id: "fazendinha",
    nome: "Fazendinha",
    categoria: "Infantil",
    tags: ["menino", "menina", "campo", "animais", "1 ano"],
    descricao: "Celeiros de madeira, palha, animaizinhos e quadros de giz. Mesa em três níveis.",
    opcoes: [
      { titulo: "Vers\u00e3o Cl\u00e1ssica", paleta: "Vermelho Cereja", legenda: "Celeiro vermelho tradicional" },
      { titulo: "Vers\u00e3o Soft", paleta: "Coral & Areia", legenda: "Tons amaciados" },
    ],
  },
  {
    id: "festa-junina",
    nome: "Festa Junina",
    categoria: "Sazonal",
    tags: ["junho", "tem\u00e1tica", "rural", "colorido"],
    descricao: "Bandeirinhas, fogueira cenográfica, mesa de comidas típicas e barracas em miniatura.",
    opcoes: [
      { titulo: "Cl\u00e1ssica", paleta: "Tropical", legenda: "Bandeirinhas multicoloridas" },
      { titulo: "Modern Junina", paleta: "Boho Terracota", legenda: "Releitura contempor\u00e2nea" },
    ],
  },
  {
    id: "floresta-tropical",
    nome: "Floresta Tropical",
    categoria: "Casamento",
    tags: ["natureza", "verde", "casamento", "ch\u00e1", "festa"],
    descricao: "Folhagens grandes, monstera, antúrios e iluminação âmbar. Atmosfera de estufa botânica.",
    opcoes: [
      { titulo: "Casamento", paleta: "Tropical", legenda: "Cerim\u00f4nia + recep\u00e7\u00e3o" },
      { titulo: "Ch\u00e1 de Beb\u00ea", paleta: "Verde & Branco", legenda: "Vers\u00e3o mais leve" },
    ],
  },
  {
    id: "frida",
    nome: "Frida Kahlo",
    categoria: "Adulto",
    tags: ["arte", "colorido", "mulher", "anivers\u00e1rio", "mexicano"],
    descricao: "Coroa de flores, cores intensas, papel picado, frutas e arte mexicana em camadas.",
    opcoes: [
      { titulo: "Cores Intensas", paleta: "Tropical", legenda: "Vers\u00e3o vibrante" },
      { titulo: "Frida Editorial", paleta: "Vermelho Cereja", legenda: "Vers\u00e3o sofisticada" },
    ],
  },
  {
    id: "futebol",
    nome: "Futebol",
    categoria: "Infantil",
    tags: ["menino", "esporte", "colorido"],
    descricao: "Campo cenográfico, traves, troféus e cores do time do aniversariante.",
    opcoes: [
      { titulo: "Vers\u00e3o Neutra", paleta: "Verde & Branco", legenda: "Campo + traves, sem time" },
      { titulo: "Personalizada", paleta: "Amarelo & Preto", legenda: "Cores do time \u00e0 escolha" },
    ],
  },
  {
    id: "glamour-dourado",
    nome: "Glamour Dourado",
    categoria: "Adulto",
    tags: ["luxo", "anivers\u00e1rio", "bodas", "dourado", "elegante"],
    descricao: "Cristais, espelhos, dourado em camadas e iluminação cenográfica. Para aniversários marcantes.",
    opcoes: [
      { titulo: "Black Tie", paleta: "Preto & Dourado", legenda: "Vers\u00e3o noturna" },
      { titulo: "All Gold", paleta: "Amarelo & Preto", legenda: "Mon\u00f3tono dourado" },
    ],
  },
  {
    id: "harry-potter",
    nome: "Harry Potter",
    categoria: "Infantil",
    tags: ["fantasia", "literatura", "menino", "menina", "magia"],
    descricao: "Velas flutuantes, pergaminhos, baú de varinhas e mesa do salão principal.",
    opcoes: [
      { titulo: "Sal\u00e3o Principal", paleta: "Vermelho Cereja", legenda: "Velas + grandes mesas" },
      { titulo: "Diagonal", paleta: "Cinza & Mostarda", legenda: "Lojinhas e detalhes" },
    ],
  },
  {
    id: "jardim-secreto",
    nome: "Jardim Secreto",
    categoria: "Casamento",
    tags: ["romantico", "flores", "casamento", "ch\u00e1", "menina"],
    descricao: "Arcos floridos, glicínias, mesas de pedra e iluminação suspensa entre as folhagens.",
    opcoes: [
      { titulo: "Glic\u00ednias", paleta: "Lavanda", legenda: "Cascatas suspensas" },
      { titulo: "Rosas Brancas", paleta: "Off-White & Verde", legenda: "Vers\u00e3o cl\u00e1ssica" },
      { titulo: "Vers\u00e3o Diurna", paleta: "Pastel Misto", legenda: "Para almo\u00e7o ou ch\u00e1" },
    ],
  },
  {
    id: "mar-azul",
    nome: "Mar Azul",
    categoria: "Casamento",
    tags: ["praia", "verao", "casamento", "azul"],
    descricao: "Inspiração Mediterrâneo: louças azul cobalto, limões, alecrim e linho cru.",
    opcoes: [
      { titulo: "Mediterr\u00e2neo", paleta: "Azul Marinho", legenda: "Lim\u00f5es + cer\u00e2mica" },
      { titulo: "P\u00e9 na Areia", paleta: "Tiffany", legenda: "Vers\u00e3o praia" },
    ],
  },
  {
    id: "minimal-branco",
    nome: "Minimal Branco",
    categoria: "Casamento",
    tags: ["minimal", "casamento", "neutro", "modern", "branco"],
    descricao: "Estética escultural: arcos limpos, pedestais, flores brancas em pontos focais. Sem ruído visual.",
    opcoes: [
      { titulo: "Total White", paleta: "Branco Total", legenda: "Mon\u00f3tono branco" },
      { titulo: "White + Verde", paleta: "Off-White & Verde", legenda: "Acento natural" },
    ],
  },
  {
    id: "naked-cake",
    nome: "Naked Cake & Campo",
    categoria: "Casamento",
    tags: ["r\u00fastico", "campo", "bodas", "ch\u00e1", "casamento"],
    descricao: "Bolo nu, frutas vermelhas, mesas de madeira corridas e flores do campo. Atmosfera de almoço de domingo.",
    opcoes: [
      { titulo: "Almo\u00e7o de Domingo", paleta: "Off-White & Verde", legenda: "Mesa corrida" },
      { titulo: "Bodas de Madeira", paleta: "Boho Terracota", legenda: "Para anivers\u00e1rios de casamento" },
    ],
  },
  {
    id: "neon-night",
    nome: "Neon Night",
    categoria: "Adulto",
    tags: ["festa", "noturno", "anivers\u00e1rio", "15 anos", "moderno"],
    descricao: "Letreiros em neon, painéis pretos, iluminação cenográfica e bar central. Para 15 anos modernos e adultos.",
    opcoes: [
      { titulo: "Neon Rosa", paleta: "Rosa & Dourado", legenda: "Letreiros em rosa fluo" },
      { titulo: "Neon Amarelo", paleta: "Amarelo & Preto", legenda: "Vers\u00e3o assinatura da casa" },
    ],
  },
  {
    id: "paris",
    nome: "Paris",
    categoria: "Adulto",
    tags: ["romantico", "viagem", "15 anos", "menina", "elegante"],
    descricao: "Torre Eiffel cenográfica, macarons, listras pretas e brancas e iluminação âmbar.",
    opcoes: [
      { titulo: "Cl\u00e1ssica", paleta: "Preto & Dourado", legenda: "Listras + Torre Eiffel" },
      { titulo: "Caf\u00e9 Parisien", paleta: "Coral & Areia", legenda: "Mesinhas de bistr\u00f4" },
    ],
  },
  {
    id: "principe",
    nome: "Pequeno Príncipe",
    categoria: "Infantil",
    tags: ["menino", "menina", "literatura", "1 ano", "ch\u00e1"],
    descricao: "Avião, planeta, raposa e estrelas. Atmosfera lúdica e poética.",
    opcoes: [
      { titulo: "Vers\u00e3o Cl\u00e1ssica", paleta: "Azul Marinho", legenda: "Aviador" },
      { titulo: "Vers\u00e3o Soft", paleta: "Coral & Areia", legenda: "Tons amaciados, ch\u00e1" },
    ],
  },
  {
    id: "princesas",
    nome: "Princesas",
    categoria: "Infantil",
    tags: ["princesa", "menina", "fantasia"],
    descricao: "Castelo, coroas, tecidos suntuosos e cetim. Personalizável para princesa específica.",
    opcoes: [
      { titulo: "Castelo Cl\u00e1ssico", paleta: "Rosa & Dourado", legenda: "Estilo Disney tradicional" },
      { titulo: "Princesa Editorial", paleta: "Lavanda", legenda: "Vers\u00e3o sofisticada" },
    ],
  },
  {
    id: "rei-leao",
    nome: "Rei Leão",
    categoria: "Infantil",
    tags: ["menino", "selva", "animais", "1 ano"],
    descricao: "Savana com folhagens, animais em escala, sol nascente e tons quentes.",
    opcoes: [
      { titulo: "Savana", paleta: "Cinza & Mostarda", legenda: "Tons terrosos" },
      { titulo: "Selva Vibrante", paleta: "Tropical", legenda: "Cores intensas" },
    ],
  },
  {
    id: "rustico-moderno",
    nome: "Rústico Moderno",
    categoria: "Casamento",
    tags: ["r\u00fastico", "moderno", "casamento", "bodas"],
    descricao: "Madeira queimada, ferro preto e flores secas. Releitura contemporânea do rústico.",
    opcoes: [
      { titulo: "Casamento", paleta: "Boho Terracota", legenda: "Recep\u00e7\u00e3o completa" },
      { titulo: "Bodas", paleta: "Cinza & Mostarda", legenda: "Para celebrar uni\u00f5es" },
    ],
  },
  {
    id: "safari",
    nome: "Safari",
    categoria: "Infantil",
    tags: ["menino", "menina", "animais", "aventura", "1 ano"],
    descricao: "Jipe cenográfico, lonas, baús de viagem e bichos da savana em diferentes escalas.",
    opcoes: [
      { titulo: "Vers\u00e3o Aventura", paleta: "Cinza & Mostarda", legenda: "Jipe + bin\u00f3culos" },
      { titulo: "Vers\u00e3o Beb\u00ea", paleta: "Coral & Areia", legenda: "Tons amaciados, ch\u00e1 de beb\u00ea" },
    ],
  },
  {
    id: "tropical-vibe",
    nome: "Tropical Vibe",
    categoria: "Adulto",
    tags: ["festa", "verao", "anivers\u00e1rio", "praia", "colorido"],
    descricao: "Folhagens monstera, frutas tropicais, drinks e iluminação âmbar. Para verão e festas adultas.",
    opcoes: [
      { titulo: "Vers\u00e3o Adulto", paleta: "Tropical", legenda: "Para 30, 40, 50 anos" },
      { titulo: "Vers\u00e3o Praia", paleta: "Tiffany", legenda: "P\u00e9 na areia" },
    ],
  },
  {
    id: "vintage-rosa",
    nome: "Vintage Rosa",
    categoria: "Casamento",
    tags: ["romantico", "rosa", "vintage", "casamento", "ch\u00e1", "bodas"],
    descricao: "Louças antigas, cristais, rosas em tons empoeirados e mobiliário de época.",
    opcoes: [
      { titulo: "Cl\u00e1ssico", paleta: "Rosa & Dourado", legenda: "Lou\u00e7as + cristais" },
      { titulo: "Soft", paleta: "Pastel Misto", legenda: "Vers\u00e3o mais leve" },
    ],
  },
];

// Ordena alfabeticamente por nome
TEMAS_INICIAIS.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

// Categorias e tags únicas
function getCategorias(temas) {
  return [...new Set(temas.map(t => t.categoria))].sort();
}
function getTags(temas) {
  const all = new Set();
  temas.forEach(t => t.tags.forEach(tag => all.add(tag)));
  return [...all].sort();
}

window.PALETTES = PALETTES;
window.TEMAS_INICIAIS = TEMAS_INICIAIS;
window.placeholder = placeholder;
window.getCategorias = getCategorias;
window.getTags = getTags;
