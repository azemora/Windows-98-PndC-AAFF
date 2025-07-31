// Este objeto guardará os dados de cada puzzle de terminal no jogo.
export const PUZZLES_DB = {
   // PUZZLE 1: O terminal de login do PC Principal
  'main_pc_puzzle': {
    type: 'login', // Define o tipo de puzzle
    id: 'main_pc_puzzle',
    loadingText: ['Mainframe K.I.T.T.E.N.', 'MAINFRAME - ACESSO RESTRITO A AGENTE. Autorização requerida. \nCONTROLADOR DA PORTA'],
    userLabel: 'Usuário:',
    passwordLabel: 'Senha:',
    correctUser: 'fridoca',
    correctPassword: 'paçoca',
    successText: 'AUTORIZAÇÃO CONCEDIDA. BEM-VINDA, AGENTE FRIDOCA.',
    errorText: 'ERRO: CREDENCIAIS INVÁLIDAS.',
    successButtonText: 'ABRIR',
    solvedText: 'Protocolo final iniciado. Acesso liberado.' // Adicionando texto para estado resolvido
  },

  // PUZZLE 2: O terminal da máquina de gemas
  'gem_unlocker_puzzle': {
    type: 'sequence', // <-- A PROPRIEDADE QUE FALTAVA
    id: 'gem_unlocker_puzzle',
    preConditionText: 'Controlador da máquina de varredura.\nA máquina precisa de um espécime para analisar.',
    loadingText: [
      'Analisando espécime...',
      'DNA FOSSILIZADO DETECTADO.',
      'Sistema de trava molecular requer 3 chaves de acesso.'
    ],
    promptText: [
      'CHAVE DE ACESSO 1/3:',
      'CHAVE DE ACESSO 2/3:',
      'CHAVE DE ACESSO 3/3:',
    ],
    correctPassword: [
      'AI',
      'UI',
      'PIMBA'
    ],
    successText: 'CHAVES ACEITAS. PROTOCOLO DE DESBLOQUEIO PRONTO.',
    errorText: 'ACESSO NEGADO. TENTE NOVAMENTE.',
    successButtonText: 'EXECUTAR',
    solvedText: 'Você está perto de descobrir a identidade da antiga agente que se tornou vilã...'
  },

    'map_screen_puzzle': {
    type: 'login',
    id: 'map_screen_puzzle',
    loadingText: ['Acessando sistema cartográfico...', 'SISTEMA PAWN - MAPAS E COORDENADAS'],
    userLabel: 'Usuário:',
    passwordLabel: 'Senha:',
    correctUser: 'cudipera',
    correctPassword: 'chibichibi',
    successText: 'ACESSO AUTORIZADO. DECRIPTANDO DADOS DE LOCALIZAÇÃO...',
    errorText: 'ERRO: CREDENCIAIS INVÁLIDAS.',
    successButtonText: 'EXECUTAR',
    solvedText: 'Dados de localização já decriptados.' // Mensagem se já foi resolvido
  },
    // NOVO PUZZLE DE SEQUÊNCIA
  'wall_can_puzzle': {
    type: 'sequence',
    id: 'wall_can_puzzle',
    loadingText: [
      'Analisando painel...',
      'Entrada de dados numéricos detectada.',
      'Requer sequência de 3 partes.'
    ],
    promptText: [
      'PARTE 1/3:',
      'PARTE 2/3:',
      'PARTE 3/3:',
    ],
    correctPassword: ['1704', '0406', '1996'],
    successText: 'SEQUÊNCIA ACEITA. ENERGIA CANALIZADA.',
    errorText: 'SEQUÊNCIA INCORRETA.',
    // Este puzzle não tem um botão de Ação depois, ele apenas dispara um evento.
  },
   'initial_login': {
    type: 'login',
    id: 'initial_login',
    loadingText: ['* _ --- PITCHU SYSTEM STARTING OS v1.0', 'Aguardando autenticação...'],
    userLabel: 'Usuário:',
    passwordLabel: 'Senha:',
    correctUser: 'pitchu',
    correctPassword: 'baby',
    successText: 'AUTENTICAÇÃO BEM-SUCEDIDA. INICIANDO PROGRAMA...',
    errorText: 'ACESSO NEGADO.',
    // Este puzzle não precisa de botão de sucesso, pois o jogo começa direto
  },
  // Adicionaremos os puzzles dos outros computadores aqui no futuro
};