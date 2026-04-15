// Importa as imagens dos itens diretamente aqui
import keyImage from '../assets/item_key.png';
import knifeImage from '../assets/item_knife.png';

import keyPiece1 from '../assets/item_keypiece1.png';
import keyPiece2 from '../assets/item_keypiece2.png';
import KeyComplete from '../assets/item_keycomplete1.png';
import bookInventoryImage from '../assets/item-book-inventory.png';
import candleInventoryImage from '../assets/item-candle-inventory.png';
import gemBlueInventoryImage from '../assets/item-gem1.png';
import gemRedInventoryImage from '../assets/item-gem2.png';
import hammerInventoryImage from '../assets/item-hammer-inventory.png';
import dinoHandInventoryImage from '../assets/item-dino-hand-inventory.png';
import skullInventoryImage from '../assets/item-skull-inventory.png';
import itemNoteFumoImage  from '../assets/item-note-fumo.png';
import dragonHeartImage   from '../assets/item_dragonheart.jpg';
import crystalBloodImage  from '../assets/item-crystalblood.jpg';
import fishImage          from '../assets/item-fish.png';
import owlbearKeyImage    from '../assets/item_key.png';

// Nosso "Banco de Dados". Um objeto onde a chave é o ID do item.
export const ITEMS_DB = {
  // Item 1: A Chave
  'key_1': {
    id: 'key_1',
    name: 'Chave Enferrujada',
    image: keyImage, // Referência da imagem importada
    description: 'Uma chave velha e enferrujada. O que será que ela abre?'
  },
  
  // Item 2: A Faca
  'knife_1': {
    id: 'knife_1',
    name: 'Faca de trinchar',
    image: knifeImage,
    description: 'Uma faca afiada. Parece útil para cortar alguma coisa.'
  },

    // --- NOVOS ITENS ---
  'key_piece_1': {
    id: 'key_piece_1',
    name: 'Pedaço de Chave (cabo)',
    image: keyPiece1,
    description: 'A parte de cima de uma chave ornamentada.'
  },
  'key_piece_2': {
    id: 'key_piece_2',
    name: 'Pedaço de Chave (haste)',
    image: keyPiece2,
    description: 'A parte de baixo de uma chave, com os dentes.'
  },
  'key_complete': {
    id: 'key_complete',
    name: 'Chave Ornamentada',
    image: KeyComplete,
    description: 'Uma chave completa e robusta. Parece importante.'
  },
    'book_1': {
    id: 'book_1',
    name: 'Diário Antigo',
    image: bookInventoryImage,
    description: 'Um diário com a capa de couro gasta. As páginas parecem frágeis. Há anotações a respeito de uma máquina de analisar ossos. Seu protocolo de segurança lê: AI, _I, _ _ M _ A'
  },
  'candle_1': {
    id: 'candle_1',
    name: 'Vela parcialmente usada',
    image: candleInventoryImage,
    description: 'Na sua face luminosa, onde a chama dança com um brilho quase divino, está gravada a história da Primeira Luz. Diz-se que foi uma mulher de beleza inigualável e coração tão vasto quanto o próprio universo, cuja bondade era a mais pura já vista. A data de seu nascimento, 1 _ _ 4, está inscrita no metal polido, mas a própria luz que emana dela ofusca os números do meio, como se o brilho de sua alma protegesse seu mistério. A face escura do candelabro, fria ao toque e que parece absorver toda a luz ao redor, guarda a memória do Homem Sombrio. Uma alma amarga que trilhou a vida sem conhecer o amor, nem mesmo o próprio. 0 _ _ 6, foi cinzelada em um entalhe tão profundo e escuro que se confunde com as sombras.Embora fossem o dia e a noite, o destino os uniu no mesmo ano, um detalhe quase perdido na base do artefato: 1 _ 9 _. Um lembrete de que luz e escuridão, por mais distintas que sejam, foram feitas para se encontrar.'
  },
    'gem_blue': {
    id: 'gem_blue',
    name: 'Gema Azul',
    image: gemBlueInventoryImage,
    description: 'Uma gema azul que brilha com uma luz fria.'
  },
  'gem_red': {
    id: 'gem_red',
    name: 'Gema Vermelha',
    image: gemRedInventoryImage,
    description: 'Uma gema vermelha que pulsa com um calor suave.'
  },

   'hammer_1': {
    id: 'hammer_1',
    name: 'Martelo Pequeno',
    image: hammerInventoryImage,
    description: 'Um martelo robusto. Perfeito para quebrar coisas frágeis.'
  },
  'dino_hand_1': {
    id: 'dino_hand_1',
    name: 'Mão de Dinossauro Fossilizada',
    image: dinoHandInventoryImage,
    description: 'Uma garra fossilizada. Parece que se encaixaria em algum lugar.'
  },
    'skull_1': {
    id: 'skull_1',
    name: 'Caveira Estranha',
    image: skullInventoryImage,
    description: 'Uma caveira pesada. Parece ser a chave para algo.'
  },
    'candle_revealed_1': {
    id: 'candle_revealed_1',
    name: 'Vela com Escrita Antiga',
    image: itemNoteFumoImage,
    description: 'Surge Fumo, gato detetive de pelo escuro, nas areias do Egito, buscando um segredo puro. De bigodes eriçados, adentrou as pirâmides colossais, sabendo que não eram meros túmulos reais. Contudo, ao sair da penumbra ancestral, Fumo deparou-se com uma visão surreal. Contra o céu do deserto, uma torre de ferro, um monumento francês, causando-lhe um certo desterro. "Ora, ora," miou Fumo, "que estranha vizinhança! Uma dama parisiense perto da Esfinge, que extravagância! Eis um novo mistério para este gato decifrar.'
  },

  'tea_list': {
    id: 'tea_list',
    name: 'Anotações Aromáticas do Leão',
    image: bookInventoryImage,
    description: 'Amora, mirtilo, baunilha, morango, camomila, hibisco, rosa silvestre, <strong>gengibre com especiarias</strong>'
  },

  'dragon_heart': {
    id: 'dragon_heart',
    name: 'Coração de Dragão',
    image: dragonHeartImage,
    description: 'Um coração mecânico de proporções extraordinárias. Engrenagens de aço negro entrelaçadas por cristais de plasma pulsam em sincronia perfeita, replicando o ritmo ancestral de uma besta extinta. Cada batida emite um leve ressoar metálico que ecoa pelo peito de quem o segura. Construído por artesãos de uma era esquecida para animar guardiões de ferro, o artefato ainda irradia um calor suave e constante — como se a chama de um dragão nunca tivesse realmente se apagado.',
  },

  'crystal_blood': {
    id: 'crystal_blood',
    name: 'Cristal de Sangue',
    image: crystalBloodImage,
    description: 'Um cristal carmesim que pulsa com uma luz interna rítmica, como um coração adormecido. Sua superfície fria ao toque contrasta com o calor que emana de seu núcleo. Dizem que foi formado nas profundezas onde a magia e a matéria se encontram.',
  },

  'item_fish': {
    id: 'item_fish',
    name: 'Peixe Mecânico',
    image: fishImage,
    description: 'Um peixe feito de engrenagens e cristal. Suas escamas metálicas refletem a luz como fragmentos de espelho. Parece que pertence a algum lugar — talvez um aquário especial.',
  },

  'octo_book': {
    id: 'octo_book',
    name: 'Caderno de Ordens',
    image: bookInventoryImage,
    description: `As anotações estão escritas em tinta desbotada. Na capa está gravado: "INSTRUÇÕES — CONTROLADOR DE 4 SENHAS".

"A ordem das coisas:
  Cão         — branca
  Escaravelho — m0oon
  Dragão      — 8756
  Polvo       — petou

Insira as senhas na ordem correta. Não misture. A sequência importa."`,
  },

  'item_owlbearkey': {
    id: 'item_owlbearkey',
    name: 'Chave da Coruja-Ursa',
    image: owlbearKeyImage,
    description: 'Uma chave ornamentada com entalhes em forma de penas e garras. Parece se encaixar numa fechadura especial na sala da Coruja-Ursa.',
  },

  'item_owlbearbook': {
    id: 'item_owlbearbook',
    name: 'Livro da Coruja-Ursa',
    image: bookInventoryImage,
    description: `Era uma ave de peso imensurável,
Que vivia a comer de forma insaciável.
Os galhos gemiam, o chão estremecia,
Nenhum ninho suportava — ela os partia.

A Deusa dos Céus, serena e paciente,
Tolerava a ave gorda e impertinente.
Mas quando sua graça enfim se esgotou,
Com um sopro de vento, a ave ela soprou.

De corpulenta e pesada, virou pequenino,
Hoje salta ligeiro o nosso Pardalzinho.`,
  },

  // Adicione quantos itens quiser aqui no futuro!
  // 'item_id': { id: '...', name: '...', image: ... },
};