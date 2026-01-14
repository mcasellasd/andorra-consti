/**
 * Preguntes de control per avaluar si el sistema està ben entrenat
 * Aquestes preguntes cobreixen diferents aspectes de la Constitució d'Andorra
 */

export interface PreguntaControl {
  id: string;
  categoria: 'bàsica' | 'específica' | 'complexa' | 'edge-case';
  pregunta: string;
  articlesEsperats: string[]; // IDs d'articles que s'espera que es trobin (ex: ["CONST_001", "CONST_002"])
  paraulesClau: string[]; // Paraules que haurien d'aparèixer a la resposta
  paraulesProhibides?: string[]; // Paraules que NO haurien d'aparèixer
  descripcio: string; // Descripció de què s'està avaluant
  dificultat: 'baixa' | 'mitjana' | 'alta';
  respostaEsperada?: string; // Resposta model esperada (per preguntes golden standard)
}

export const preguntesControl: PreguntaControl[] = [
  // Preguntes bàsiques - Articles coneguts
  {
    id: 'control-001',
    categoria: 'bàsica',
    pregunta: 'Què diu l\'article 1 de la Constitució d\'Andorra?',
    articlesEsperats: ['CONST_001'],
    paraulesClau: ['Estat independent', 'Principat', 'Coprincipat parlamentari', 'Parròquies'],
    descripcio: 'Avalua si el sistema pot trobar i explicar l\'article 1 de la Constitució',
    dificultat: 'baixa'
  },
  {
    id: 'control-002',
    categoria: 'bàsica',
    pregunta: 'Quina és la llengua oficial d\'Andorra segons la Constitució?',
    articlesEsperats: ['CONST_002'],
    paraulesClau: ['català', 'llengua oficial'],
    paraulesProhibides: ['castellà', 'francès', 'anglès'],
    descripcio: 'Avalua si el sistema identifica correctament la llengua oficial',
    dificultat: 'baixa'
  },
  {
    id: 'control-003',
    categoria: 'bàsica',
    pregunta: 'Quines són les parròquies d\'Andorra?',
    articlesEsperats: ['CONST_001'],
    paraulesClau: ['Canillo', 'Encamp', 'Ordino', 'La Massana', 'Andorra la Vella', 'Sant Julià de Lòria', 'Escaldes-Engordany'],
    descripcio: 'Avalua si el sistema llista correctament les 7 parròquies',
    dificultat: 'baixa'
  },
  {
    id: 'control-004',
    categoria: 'bàsica',
    pregunta: 'Què diu l\'article 4 sobre la dignitat humana?',
    articlesEsperats: ['CONST_004'],
    paraulesClau: ['dignitat humana', 'intangible', 'drets inviolables', 'imprescriptibles'],
    descripcio: 'Avalua si el sistema troba i explica l\'article sobre dignitat humana',
    dificultat: 'baixa'
  },
  {
    id: 'control-005',
    categoria: 'bàsica',
    pregunta: 'Està prohibida la pena de mort a Andorra?',
    articlesEsperats: ['CONST_008'],
    paraulesClau: ['prohibeix', 'pena de mort'],
    descripcio: 'Avalua si el sistema identifica correctament la prohibició de la pena de mort',
    dificultat: 'baixa'
  },

  // Preguntes específiques - Conceptes concrets
  {
    id: 'control-006',
    categoria: 'específica',
    pregunta: 'Què és el Coprincipat parlamentari?',
    articlesEsperats: ['CONST_001'],
    paraulesClau: ['Coprincipat', 'parlamentari', 'règim polític'],
    descripcio: 'Avalua si el sistema explica el concepte de Coprincipat',
    dificultat: 'mitjana'
  },
  {
    id: 'control-007',
    categoria: 'específica',
    pregunta: 'Quins són els principis inspiradors de l\'Estat andorrà?',
    articlesEsperats: ['CONST_001'],
    paraulesClau: ['llibertat', 'igualtat', 'justícia', 'tolerància', 'drets humans', 'dignitat'],
    descripcio: 'Avalua si el sistema identifica tots els principis fonamentals',
    dificultat: 'mitjana'
  },
  {
    id: 'control-008',
    categoria: 'específica',
    pregunta: 'Què estableix la Constitució sobre la igualtat de les persones?',
    articlesEsperats: ['CONST_006'],
    paraulesClau: ['iguals davant la llei', 'discriminat', 'raó de naixement', 'raça', 'sexe'],
    descripcio: 'Avalua si el sistema explica el principi d\'igualtat',
    dificultat: 'mitjana'
  },
  {
    id: 'control-009',
    categoria: 'específica',
    pregunta: 'Què diu la Constitució sobre la Declaració Universal dels Drets Humans?',
    articlesEsperats: ['CONST_005'],
    paraulesClau: ['Declaració Universal dels Drets Humans', 'vigent'],
    descripcio: 'Avalua si el sistema identifica la vigència de la DUDH',
    dificultat: 'mitjana'
  },
  {
    id: 'control-010',
    categoria: 'específica',
    pregunta: 'Com s\'adquireix la nacionalitat andorrana?',
    articlesEsperats: ['CONST_007'],
    paraulesClau: ['nacional andorrà', 'Llei Qualificada', 'adquireix', 'conserva', 'perd'],
    descripcio: 'Avalua si el sistema explica els requisits de nacionalitat',
    dificultat: 'mitjana'
  },

  // Preguntes complexes - Múltiples articles o conceptes relacionats
  {
    id: 'control-011',
    categoria: 'complexa',
    pregunta: 'Quins són els drets fonamentals que garanteix la Constitució d\'Andorra?',
    articlesEsperats: ['CONST_004', 'CONST_005', 'CONST_006', 'CONST_008', 'CONST_009'],
    paraulesClau: ['drets fonamentals', 'dignitat humana', 'dret a la vida', 'llibertat', 'igualtat'],
    descripcio: 'Avalua si el sistema identifica múltiples drets fonamentals',
    dificultat: 'alta'
  },
  {
    id: 'control-012',
    categoria: 'complexa',
    pregunta: 'Què estableix la Constitució sobre la sobirania d\'Andorra?',
    articlesEsperats: ['CONST_001', 'CONST_PREAMB'],
    paraulesClau: ['sobirania', 'poble andorrà', 'exerceix', 'participació', 'institucions'],
    descripcio: 'Avalua si el sistema explica el concepte de sobirania',
    dificultat: 'alta'
  },
  {
    id: 'control-013',
    categoria: 'complexa',
    pregunta: 'Quina és la relació entre la Constitució i l\'ordenament jurídic?',
    articlesEsperats: ['CONST_003'],
    paraulesClau: ['norma suprema', 'ordenament jurídic', 'vincula', 'poders públics', 'ciutadans'],
    descripcio: 'Avalua si el sistema explica la jerarquia normativa',
    dificultat: 'alta'
  },

  // Edge cases - Preguntes que poden ser difícils o ambigües
  {
    id: 'control-014',
    categoria: 'edge-case',
    pregunta: 'Què significa "virtus, unita, fortior"?',
    articlesEsperats: ['CONST_PREAMB'],
    paraulesClau: ['lema', 'virtus', 'unita', 'fortior', 'divisa'],
    descripcio: 'Avalua si el sistema troba informació del preàmbul',
    dificultat: 'mitjana'
  },
  {
    id: 'control-015',
    categoria: 'edge-case',
    pregunta: 'Quina és la capital d\'Andorra?',
    articlesEsperats: ['CONST_002'],
    paraulesClau: ['Andorra la Vella', 'capital'],
    descripcio: 'Avalua si el sistema identifica la capital',
    dificultat: 'baixa'
  },
  {
    id: 'control-016',
    categoria: 'edge-case',
    pregunta: 'Què diu el preàmbul de la Constitució sobre els Pareatges?',
    articlesEsperats: ['CONST_PREAMB'],
    paraulesClau: ['Pareatges', 'orígens', 'institucions'],
    descripcio: 'Avalua si el sistema troba informació històrica del preàmbul',
    dificultat: 'mitjana'
  },
  {
    id: 'control-017',
    categoria: 'edge-case',
    pregunta: 'Què estableix la Constitució sobre la integritat física i moral?',
    articlesEsperats: ['CONST_008'],
    paraulesClau: ['integritat física', 'integritat moral', 'tortures', 'penes cruels'],
    descripcio: 'Avalua si el sistema identifica els drets a la integritat',
    dificultat: 'mitjana'
  },
  {
    id: 'control-018',
    categoria: 'edge-case',
    pregunta: 'Què passa si un andorrà adquireix una altra nacionalitat?',
    articlesEsperats: ['CONST_007'],
    paraulesClau: ['nacionalitat diferent', 'pèrdua', 'nacionalitat andorrana'],
    descripcio: 'Avalua si el sistema explica les conseqüències de tenir múltiples nacionalitats',
    dificultat: 'mitjana'
  },

  // Preguntes sobre conceptes que poden no estar explícits
  {
    id: 'control-019',
    categoria: 'complexa',
    pregunta: 'Quins són els principis de legalitat que garanteix la Constitució?',
    articlesEsperats: ['CONST_003'],
    paraulesClau: ['legalitat', 'jerarquia', 'publicitat', 'no retroactivitat'],
    descripcio: 'Avalua si el sistema identifica els principis jurídics bàsics',
    dificultat: 'alta'
  },
  {
    id: 'control-020',
    categoria: 'bàsica',
    pregunta: 'Quina és la data d\'aprovació de la Constitució d\'Andorra?',
    articlesEsperats: ['CONST_PREAMB'],
    paraulesClau: ['1993'], // La data exacta pot estar al preàmbul o als metadades
    descripcio: 'Avalua si el sistema coneix la data d\'aprovació',
    dificultat: 'mitjana'
  },
  {
    id: 'control-golden-temas-01',
    categoria: 'específica',
    pregunta: 'Conté la Constitució alguna disposició que defineixi el seu rang normatiu i eficàcia jurídica? Quin és el valor jurídic de la Constitució?',
    articlesEsperats: ['CONST_003'],
    paraulesClau: ['rang normatiu', 'eficàcia jurídica', 'norma suprema', 'ordenament jurídic'],
    descripcio: 'Pregunta del golden standard sobre temes constitucionals - pregunta 1',
    dificultat: 'mitjana'
  },

  {
    id: 'control-golden-temas-02',
    categoria: 'específica',
    pregunta: 'Estableix la Constitució expressa o implícitament alguna diferenciació de graus d\'eficàcia entre diferents tipus de normes constitucionals (valors, principis, drets, poders, garanties, entre altres)? De ser afirmatiu, identifiqueu els supòsits i expliqueu breument el seu fonament.',
    articlesEsperats: ['CONST_003', 'CONST_004'],
    paraulesClau: ['diferenciació', "graus d'eficàcia", 'principis', 'drets', 'jerarquia'],
    descripcio: 'Pregunta del golden standard sobre temes constitucionals - pregunta 2',
    dificultat: 'mitjana'
  },

  {
    id: 'control-golden-temas-03',
    categoria: 'específica',
    pregunta: 'Estableix la Constitució tipus de normes legislatives que la complementin o desenvolupin? Es requereix un procediment agreujat per a la seva adopció? Identifiqueu aquestes normes i expliqueu el seu funcionament.',
    articlesEsperats: ['CONST_040', 'CONST_057'],
    paraulesClau: ['lleis qualificades', 'procediment agreujat', 'majoria', 'normes legislatives'],
    descripcio: 'Pregunta del golden standard sobre temes constitucionals - pregunta 3',
    dificultat: 'mitjana'
  },

  {
    id: 'control-golden-temas-04',
    categoria: 'específica',
    pregunta: 'Quin és el valor jurídic i la jerarquia que la Constitució assigna als tractats i convencions internacionals, especialment als que tracten sobre drets humans?',
    articlesEsperats: ['CONST_003', 'CONST_005'],
    paraulesClau: ['tractats internacionals', 'convencions', 'drets humans', 'jerarquia', 'valor jurídic'],
    descripcio: 'Pregunta del golden standard sobre temes constitucionals - pregunta 4',
    dificultat: 'mitjana'
  },

  {
    id: 'control-golden-temas-05',
    categoria: 'específica',
    pregunta: 'Conté la Constitució normes expresses o implícites que estableixin la subjectió dels poders públics i la resta dels òrgans estatals a la Constitució? Identifiqueu i descriviu aquestes normes.',
    articlesEsperats: ['CONST_043', 'CONST_050', 'CONST_072', 'CONST_085', 'CONST_095'],
    paraulesClau: ['poders públics', 'òrgans estatals', 'subjectió', 'Constitució'],
    descripcio: 'Pregunta del golden standard sobre temes constitucionals - pregunta 5',
    dificultat: 'mitjana'
  },

  {
    id: 'control-golden-temas-06',
    categoria: 'específica',
    pregunta: 'Existeix alguna disposició, pràctica institucional o costum constitucional que permeti als poders polítics interpretar la Constitució? De ser aquest el cas, quina seria l\'eficàcia vinculant d\'aquestes denominades "convencions constitucionals"?',
    articlesEsperats: ['CONST_095', 'CONST_039'],
    paraulesClau: ['interpretació', 'convencions constitucionals', 'costum constitucional'],
    descripcio: 'Pregunta del golden standard sobre temes constitucionals - pregunta 6',
    dificultat: 'mitjana'
  },

  {
    id: 'control-golden-temas-07',
    categoria: 'complexa',
    pregunta: 'Imposa la Constitució el deure dels ciutadans de respectar-la? Reconeix la Constitució l\'eficàcia dels drets fonamentals en les relacions entre particulars? Expliqueu el seu fonament.',
    articlesEsperats: ['CONST_003', 'CONST_004'],
    paraulesClau: ['ciutadans', 'respectar', 'drets fonamentals', 'relacions particulars'],
    descripcio: 'Pregunta del golden standard sobre temes constitucionals - pregunta 7',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-temas-08',
    categoria: 'complexa',
    pregunta: 'Quin és el mecanisme vigent de reforma constitucional? Es requereix per a la reforma constitucional majories agreujades o procediments especials en comparació del procediment ordinari de producció legislativa? Es estableix alguna diferenciació entre diferents normes constitucionals per a la seva modificació? Identifiqueu les normes i expliqueu el seu funcionament.',
    articlesEsperats: ['CONST_105', 'CONST_106', 'CONST_107'],
    paraulesClau: ['reforma constitucional', 'mecanisme', 'majoria agreujada', 'referèndum'],
    descripcio: 'Pregunta del golden standard sobre temes constitucionals - pregunta 8',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-temas-09',
    categoria: 'complexa',
    pregunta: 'Conté la Constitució normes inderogables o inmodificables (las denominada clàusules pètrias)? Identifique esas normas, enuncie los',
    articlesEsperats: ['CONST_001'],
    paraulesClau: ['clàusules pètrias', 'inderogables', 'inmodificables'],
    descripcio: 'Pregunta del golden standard sobre temes constitucionals - pregunta 9',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-temas-10',
    categoria: 'complexa',
    pregunta: 'Existeixn normes constitucionals de aplicación exclusiva a determinados àmbits territorials en el Estado? Quin es el abast territorial de la eficacia',
    articlesEsperats: ['CONST_001', 'CONST_005'],
    paraulesClau: ['àmbits territorials', 'parròquies', 'territori'],
    descripcio: 'Pregunta del golden standard sobre temes constitucionals - pregunta 10',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-temas-11',
    categoria: 'complexa',
    pregunta: 'Consagra la Constitució mecanismes de garantia jurisdiccional? El control jurisdiccional de la Constitució es concentrat, difús o mixt?',
    articlesEsperats: ['CONST_085', 'CONST_095', 'TC_006'],
    paraulesClau: ['garantia jurisdiccional', 'control jurisdiccional', 'Tribunal Constitucional', 'concentrat', 'difús'],
    descripcio: 'Pregunta del golden standard sobre temes constitucionals - pregunta 11',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-temas-12',
    categoria: 'complexa',
    pregunta: 'Conté la Constitució normes que estableixin els estats d\'excepció? Quines obligacions imposa la Constitució als poders polítics per a la protecció de la Constitució en moments d\'estats d\'excepció? Estan subjectes a control jurisdiccional les (o algunes) actuacions del poder polític durant l\'estat d\'excepció? Descriviu aquestes normes i discutiu la seva naturalesa i abast.',
    articlesEsperats: ['CONST_042'],
    paraulesClau: ["estats d'excepció", 'alarma', 'emergència', 'suspensió drets'],
    descripcio: 'Pregunta del golden standard sobre temes constitucionals - pregunta 12',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-jurisprudencia-01',
    categoria: 'complexa',
    pregunta: 'S\'ha pronunciat la jurisprudència constitucional sobre l\'existència de lleis que complementin o desenvolupin el text constitucional? Quina és la jerarquia atribuïda per la jurisprudència a aquestes lleis respecte de la Constitució i altres normes jurídiques? Assenyaleu algunes decisions al respecte i expliqueu la seva naturalesa i abast.',
    articlesEsperats: ['CONST_003', 'CONST_095', 'TC_001', 'TC_002'],
    paraulesClau: ['jurisprudència', 'Tribunal Constitucional', 'interpretació', 'sentències'],
    descripcio: 'Pregunta del golden standard sobre jurisprudència constitucional - pregunta 1',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-jurisprudencia-02',
    categoria: 'complexa',
    pregunta: 'Existeixen casos en què la jurisprudència ha declarat el caràcter vinculant de normes constitucionals no escrites? De ser afirmatiu, expliqueu aquests casos.',
    articlesEsperats: ['CONST_003', 'CONST_095', 'TC_001', 'TC_002'],
    paraulesClau: ['jurisprudència', 'Tribunal Constitucional', 'interpretació', 'sentències'],
    descripcio: 'Pregunta del golden standard sobre jurisprudència constitucional - pregunta 2',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-jurisprudencia-03',
    categoria: 'complexa',
    pregunta: 'Ha reconegut la jurisprudència constitucional que la Constitució pot ser aplicada directament pels tribunals? En quins supòsits s\'ha pronunciat al respecte? Expliqueu i identifiqueu alguns exemples en què s\'ha seguit una interpretació de les lleis conforme a la Constitució.',
    articlesEsperats: ['CONST_003', 'CONST_095', 'TC_001', 'TC_002'],
    paraulesClau: ['jurisprudència', 'Tribunal Constitucional', 'interpretació', 'sentències'],
    descripcio: 'Pregunta del golden standard sobre jurisprudència constitucional - pregunta 3',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-jurisprudencia-04',
    categoria: 'complexa',
    pregunta: 'Ha reconegut la jurisprudència constitucional l\'existència d\'un "bloc de constitucionalitat"? Quins principis, normes i fonts integren el bloc? Expliqueu.',
    articlesEsperats: ['CONST_003', 'CONST_095', 'TC_001', 'TC_002'],
    paraulesClau: ['jurisprudència', 'Tribunal Constitucional', 'interpretació', 'sentències'],
    descripcio: 'Pregunta del golden standard sobre jurisprudència constitucional - pregunta 4',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-jurisprudencia-05',
    categoria: 'complexa',
    pregunta: 'S\'ha pronunciat la jurisprudència constitucional sobre el valor i jerarquia jurídica dels convenis i tractats internacionals, especialment els relatius a drets humans? Expliqueu aquests supòsits.',
    articlesEsperats: ['CONST_003', 'CONST_095', 'TC_001', 'TC_002'],
    paraulesClau: ['jurisprudència', 'Tribunal Constitucional', 'interpretació', 'sentències'],
    descripcio: 'Pregunta del golden standard sobre jurisprudència constitucional - pregunta 5',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-jurisprudencia-06',
    categoria: 'complexa',
    pregunta: 'S\'ha pronunciat la jurisprudència constitucional sobre el caràcter vinculant de les decisions dels òrgans supranacionals en matèria de drets humans? Quin és el valor jurídic assignat a les decisions d\'aquests òrgans? Expliqueu.',
    articlesEsperats: ['CONST_003', 'CONST_095', 'TC_001', 'TC_002'],
    paraulesClau: ['jurisprudència', 'Tribunal Constitucional', 'interpretació', 'sentències'],
    descripcio: 'Pregunta del golden standard sobre jurisprudència constitucional - pregunta 6',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-jurisprudencia-07',
    categoria: 'complexa',
    pregunta: 'Quins són els criteris predominants d\'interpretació que la jurisprudència constitucional ha sostingut per a la declaratòria de nul·litat de lleis o altres actes públics que contradiuen els preceptes constitucionals? Expliqueu.',
    articlesEsperats: ['CONST_003', 'CONST_095', 'TC_001', 'TC_002'],
    paraulesClau: ['jurisprudència', 'Tribunal Constitucional', 'interpretació', 'sentències'],
    descripcio: 'Pregunta del golden standard sobre jurisprudència constitucional - pregunta 7',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-jurisprudencia-08',
    categoria: 'complexa',
    pregunta: 'Pot ser exigit als particulars el compliment dels mandats constitucionals? En quins supòsits la jurisprudència ha considerat vàlida aquesta exigència, especialment pel que respecta als drets fonamentals de tercers?',
    articlesEsperats: ['CONST_003', 'CONST_095', 'TC_001', 'TC_002'],
    paraulesClau: ['jurisprudència', 'Tribunal Constitucional', 'interpretació', 'sentències'],
    descripcio: 'Pregunta del golden standard sobre jurisprudència constitucional - pregunta 8',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-jurisprudencia-09',
    categoria: 'complexa',
    pregunta: 'Quins han estat els criteris –si és que existeixen– establerts per la jurisprudència constitucional respecte del control jurisdiccional de reformes constitucionals?',
    articlesEsperats: ['CONST_003', 'CONST_095', 'TC_001', 'TC_002'],
    paraulesClau: ['jurisprudència', 'Tribunal Constitucional', 'interpretació', 'sentències'],
    descripcio: 'Pregunta del golden standard sobre jurisprudència constitucional - pregunta 9',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-jurisprudencia-10',
    categoria: 'complexa',
    pregunta: 'En quins supòsits –si existeixen– s\'ha aplicat la Constitució a la frontera o fora del territori de l\'Estat?',
    articlesEsperats: ['CONST_003', 'CONST_095', 'TC_001', 'TC_002'],
    paraulesClau: ['jurisprudència', 'Tribunal Constitucional', 'interpretació', 'sentències'],
    descripcio: 'Pregunta del golden standard sobre jurisprudència constitucional - pregunta 10',
    dificultat: 'alta'
  },

  {
    id: 'control-golden-jurisprudencia-11',
    categoria: 'complexa',
    pregunta: 'Quins han estat els problemes pràctics més notables i recurrents trobats al moment d\'assegurar la garantia jurisdiccional de la Constitució?',
    articlesEsperats: ['CONST_003', 'CONST_095', 'TC_001', 'TC_002'],
    paraulesClau: ['jurisprudència', 'Tribunal Constitucional', 'interpretació', 'sentències'],
    descripcio: 'Pregunta del golden standard sobre jurisprudència constitucional - pregunta 11',
    dificultat: 'alta'
  }
];

/**
 * Obtenir preguntes per categoria
 */
export function getPreguntesPerCategoria(categoria: PreguntaControl['categoria']): PreguntaControl[] {
  return preguntesControl.filter(p => p.categoria === categoria);
}

/**
 * Obtenir preguntes per dificultat
 */
export function getPreguntesPerDificultat(dificultat: PreguntaControl['dificultat']): PreguntaControl[] {
  return preguntesControl.filter(p => p.dificultat === dificultat);
}

/**
 * Obtenir una pregunta aleatòria
 */
export function getPreguntaAleatoria(): PreguntaControl {
  const index = Math.floor(Math.random() * preguntesControl.length);
  return preguntesControl[index];
}
