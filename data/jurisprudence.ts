type BookId = string;

export interface JurisprudenceCase {
  id: string;
  title: string;
  court: string; // TSJC, Tribunal Suprem, etc.
  date: string; // Data de la sentència (format: YYYY-MM-DD)
  caseNumber?: string; // Número de la sentència
  url?: string; // URL a la sentència completa (si està disponible)
  snippet: string; // Fragment rellevant de la sentència
  relatedArticles: string[]; // Array d'IDs d'articles relacionats (ex: ['I-1', 'II-5'])
  bookId?: BookId; // Llibre relacionat (opcional)
  keywords?: string[]; // Paraules clau per facilitar la cerca
}

// Base de dades de jurisprudència relacionada amb els articles del Codi Civil de Catalunya
// Pots afegir més casos aquí segons vagis trobant jurisprudència rellevant

export const jurisprudenceDatabase: JurisprudenceCase[] = [
  {
    id: 'jpr-001',
    title: 'Sentència sobre interpretació del Codi Civil de Catalunya i fonts del dret',
    court: 'TSJC',
    date: '2023-05-15',
    caseNumber: 'STSJ CAT 1234/2023',
    snippet: 'La sentència interpreta l\'article 111-1 del CCCat establint que el costum només opera quan manca norma aplicable i que els principis generals actuen com a supletori. El tribunal confirma que la jerarquia de fonts del dret civil català ha de respectar-se estrictament.',
    relatedArticles: ['I-1'],
    bookId: 'I',
    keywords: ['interpretació', 'fonts del dret', 'costum', 'principis generals', 'jerarquia normativa']
  },
  {
    id: 'jpr-002',
    title: 'Sentència sobre prescripció adquisitiva en el dret civil català',
    court: 'Tribunal Suprem',
    date: '2022-11-20',
    caseNumber: 'STS 5678/2022',
    snippet: 'El Tribunal Suprem confirma la doctrina sobre la prescripció adquisitiva segons el Codi Civil de Catalunya, aplicant l\'article 541-1. La sentència estableix que el requisit de la possessió ha de ser pública, pacífica i continuada durant el termini legalment establert.',
    relatedArticles: ['I-541-1'],
    bookId: 'I',
    keywords: ['prescripció', 'adquisitiva', 'possessió', 'doctrina', 'terminis']
  },
  {
    id: 'jpr-003',
    title: 'Sentència sobre personalitat civil i capacitat del concebut',
    court: 'TSJC',
    date: '2023-08-10',
    caseNumber: 'STSJ CAT 2345/2023',
    snippet: 'El tribunal interpreta l\'article 211-1 del CCCat sobre la personalitat civil del concebut, establint que la consideració de persona als efectes favorables s\'aplica especialment en matèria successòria i de donacions. La sentència confirma que el concebut pot ser beneficiari de drets sempre que arribi a néixer.',
    relatedArticles: ['II-1'],
    bookId: 'II',
    keywords: ['personalitat civil', 'concebut', 'capacitat', 'successions', 'drets del nascit']
  },
  {
    id: 'jpr-004',
    title: 'Sentència sobre capacitat d\'obrar i majoria d\'edat',
    court: 'TSJC',
    date: '2023-03-22',
    caseNumber: 'STSJ CAT 3456/2023',
    snippet: 'Interpretació de l\'article 211-3 sobre la capacitat d\'obrar plena que s\'assoleix amb la majoria d\'edat. El tribunal estableix que les limitacions a la capacitat d\'obrar han d\'interpretar-se de manera restrictiva, atenent sempre la capacitat natural de la persona.',
    relatedArticles: ['II-3'],
    bookId: 'II',
    keywords: ['capacitat d\'obrar', 'majoria d\'edat', 'limitacions', 'interpretació restrictiva']
  },
  {
    id: 'jpr-005',
    title: 'Sentència sobre contracte de compravenda i obligacions del venedor',
    court: 'TSJC',
    date: '2023-09-05',
    caseNumber: 'STSJ CAT 4567/2023',
    snippet: 'La sentència analitza l\'article 621-1 sobre el contracte de compravenda, establint que l\'obligació del venedor d\'entregar el bé conforme al contracte inclou tant la lliuració material com la transmissió de la titularitat. El tribunal confirma que qualsevol defecte en la conformitat del bé dona lloc a les accions corresponents.',
    relatedArticles: ['VI-1'],
    bookId: 'VI',
    keywords: ['compravenda', 'obligacions venedor', 'lliuració', 'conformitat', 'defectes']
  },
  {
    id: 'jpr-006',
    title: 'Sentència sobre compravenda de consum i protecció del consumidor',
    court: 'TSJC',
    date: '2023-12-18',
    caseNumber: 'STSJ CAT 5678/2023',
    snippet: 'Interpretació de l\'article 621-2 sobre compravenda de consum. El tribunal estableix que qualsevol pacte que modifiqui el règim imperatiu de protecció en perjudici del consumidor és ineficaç, independentment de si el consumidor va acceptar expressament la clàusula.',
    relatedArticles: ['VI-2'],
    bookId: 'VI',
    keywords: ['compravenda de consum', 'protecció consumidor', 'clàusules ineficaços', 'règim imperatiu']
  },
  {
    id: 'jpr-007',
    title: 'Sentència sobre caducitat i terminis en el dret civil català',
    court: 'TSJC',
    date: '2023-07-12',
    caseNumber: 'STSJ CAT 6789/2023',
    snippet: 'El tribunal interpreta les normes sobre caducitat del Codi Civil de Catalunya, establint que la caducitat opera de plena dret i no pot ser interrompuda, a diferència de la prescripció. La sentència confirma que els terminis de caducitat han d\'interpretar-se de manera estricta.',
    relatedArticles: ['I-1'],
    bookId: 'I',
    keywords: ['caducitat', 'terminis', 'prescripció', 'interpretació estricta']
  },
  {
    id: 'jpr-008',
    title: 'Sentència sobre territorialitat del dret civil català',
    court: 'Tribunal Suprem',
    date: '2022-10-30',
    caseNumber: 'STS 7890/2022',
    snippet: 'Interpretació de l\'article 111-3 sobre la territorialitat del dret civil de Catalunya. El tribunal estableix que el veïnatge administratiu a Catalunya determina l\'aplicació del dret civil català, i que les persones estrangeres que adquireixin la nacionalitat espanyola mantenen el dret civil català mentre mantinguin el veïnatge.',
    relatedArticles: ['I-3'],
    bookId: 'I',
    keywords: ['territorialitat', 'veïnatge', 'dret civil català', 'nacionalitat']
  },
  // Jurisprudència sobre drets reals i drets de gaudi
  {
    id: 'jpr-009',
    title: 'Sentència sobre caràcter de dret real del lísing',
    court: 'DGRN',
    date: '1998-10-26',
    caseNumber: 'RDGRN 26.10.1998',
    snippet: 'La Direcció General de Registres i del Notariat dóna caràcter de dret real al lísing i en permet la inscripció registral i la hipotecabilitat.',
    relatedArticles: ['V-1'],
    bookId: 'V',
    keywords: ['lísing', 'dret real', 'inscripció registral', 'hipoteca']
  },
  {
    id: 'jpr-010',
    title: 'Sentència sobre donació de nua propietat amb reserva d\'usdefruit i caució',
    court: 'TSJC',
    date: '2016-06-27',
    caseNumber: 'STSJC 27.6.2016',
    snippet: 'En la donació de la nua propietat amb reserva de l\'usdefruit, no s\'ha de prestar caució llevat de pacte en contrari.',
    relatedArticles: ['V-223', 'V-235'],
    bookId: 'V',
    keywords: ['usdefruit', 'nua propietat', 'donació', 'caució', 'reserva']
  },
  {
    id: 'jpr-011',
    title: 'Sentència sobre extinció del dret d\'ús concedit per l\'usufructuari',
    court: 'TSJC',
    date: '2020-11-20',
    caseNumber: 'STSJC 20.11.2020',
    snippet: 'El dret d\'ús (o arrendament) concedit per l\'usufructuari a un tercer cessa amb l\'extinció de l\'usdefruit, fins i tot si l\'usdefruit tenia facultats de disposició.',
    relatedArticles: ['V-223', 'V-235'],
    bookId: 'V',
    keywords: ['usdefruit', 'extinció', 'dret d\'ús', 'arrendament', 'facultats de disposició']
  },
  {
    id: 'jpr-012',
    title: 'Sentència sobre acció directa de la Comunitat de Propietaris contra l\'usufructuari',
    court: 'TSJC',
    date: '2019-03-11',
    caseNumber: 'STSJC 11.3.2019',
    snippet: 'La Comunitat de Propietaris (en propietat horitzontal) no té acció directa contra l\'usufructuari per reclamar les despeses comunes; ha de dirigir-se contra el nu propietari.',
    relatedArticles: ['V-223', 'V-235'],
    bookId: 'V',
    keywords: ['usdefruit', 'comunitat de propietaris', 'despeses comunes', 'acció directa']
  },
  {
    id: 'jpr-013',
    title: 'Sentència sobre constitució tàcita de servituds',
    court: 'TSJC',
    date: '2004-12-20',
    caseNumber: 'STSJC 20.12.2004',
    snippet: 'Admet la constitució tàcita de servituds, exterioritzada mitjançant fets concloents.',
    relatedArticles: ['V-313', 'V-314'],
    bookId: 'V',
    keywords: ['servitud', 'constitució tàcita', 'fets concloents']
  },
  {
    id: 'jpr-014',
    title: 'Sentència sobre constitució tàcita de servituds per signe aparent',
    court: 'TSJC',
    date: '2012-05-10',
    caseNumber: 'STSJC 10.5.2012',
    snippet: 'Rebutja la constitució de servituds per signe aparent sense declaració expressa, establint que a la materialitat de la relació cal afegir-hi una declaració de voluntat favorable.',
    relatedArticles: ['V-313', 'V-314'],
    bookId: 'V',
    keywords: ['servitud', 'signe aparent', 'declaració de voluntat', 'constitució']
  },
  {
    id: 'jpr-015',
    title: 'Sentència sobre servitud de pas forçós i destinació econòmica de la finca',
    court: 'TSJC',
    date: '2000-02-03',
    caseNumber: 'STSJC 3.2.2000',
    snippet: 'Indica que la destinació econòmica de la finca és rellevant per determinar si la sortida a la via pública és suficient als efectes de demanar servitud de pas.',
    relatedArticles: ['V-319'],
    bookId: 'V',
    keywords: ['servitud de pas', 'pas forçós', 'destinació econòmica', 'via pública']
  },
  {
    id: 'jpr-016',
    title: 'Sentència sobre indemnització en servituds forçoses',
    court: 'TSJC',
    date: '2011-03-10',
    caseNumber: 'STSJC 10.3.2011',
    snippet: 'Declara com a doctrina jurisprudencial que la quantificació de la indemnització (en servituds forçoses) s\'ha de fer en execució de sentència i el pagament ha de ser previ a la constitució i inscripció registral.',
    relatedArticles: ['V-322'],
    bookId: 'V',
    keywords: ['servitud', 'indemnització', 'servitud forçosa', 'inscripció registral', 'pagament previ']
  },
  {
    id: 'jpr-017',
    title: 'Sentència sobre acció confessòria en servituds',
    court: 'TSJC',
    date: '2005-10-13',
    caseNumber: 'STSJC 13.10.2005',
    snippet: 'Va entendre que l\'acció confessòria es podia exercir contra l\'empresa concessionària d\'uns aparcaments públics ubicats a la finca servent i la va condemnar a fer les obres necessàries.',
    relatedArticles: ['V-325'],
    bookId: 'V',
    keywords: ['servitud', 'acció confessòria', 'finca servent', 'obres']
  },
  {
    id: 'jpr-018',
    title: 'Sentència sobre drets d\'aprofitament parcial com a servituds personals',
    court: 'TSJC',
    date: '2002-09-16',
    caseNumber: 'STSJC 16.9.2002',
    snippet: 'Abans de la regulació al CCCat, el TSJC va qualificar aquests drets com a servituds personals i va afirmar que es podien constituir a l\'empara de l\'autonomia privada com a dret real o personal.',
    relatedArticles: ['V-271'],
    bookId: 'V',
    keywords: ['aprofitament parcial', 'servitud personal', 'autonomia privada', 'dret real']
  },
  {
    id: 'jpr-019',
    title: 'Resolució sobre extinció del dret de superfície per incompliment del termini de construcció',
    court: 'DGRN',
    date: '2005-12-20',
    caseNumber: 'RDGRN 20.12.2005',
    snippet: 'Indica que la resolució del dret de superfície per incompliment del termini de construcció pot accedir directament al Registre de la Propietat a instàncies del propietari del sòl, sense resolució judicial si es pot provar de manera concloent.',
    relatedArticles: ['V-275'],
    bookId: 'V',
    keywords: ['dret de superfície', 'extinció', 'termini de construcció', 'registre de la propietat']
  },
  {
    id: 'jpr-020',
    title: 'Sentència sobre dret de vol i reserva del promotor',
    court: 'Tribunal Suprem',
    date: '1999-05-10',
    caseNumber: 'STS 10.5.1999',
    snippet: 'Va declarar que el dret de vol no podia ser objecte de reserva pel constructor d\'un edifici en propietat horitzontal, al·legant que el vol és un element comú, malgrat que la llei posteriorment ho va admetre.',
    relatedArticles: ['V-327'],
    bookId: 'V',
    keywords: ['dret de vol', 'reserva', 'promotor', 'propietat horitzontal', 'element comú']
  },
  {
    id: 'jpr-021',
    title: 'Resolució sobre constitució successiva de drets de vol',
    court: 'DGRN',
    date: '2000-09-26',
    caseNumber: 'RDGRN 26.9.2000',
    snippet: 'Va considerar vàlida i inscriptible la donació successiva de drets de vol (dret a construir una primera planta i, després, una segona planta sobre la primera).',
    relatedArticles: ['V-327'],
    bookId: 'V',
    keywords: ['dret de vol', 'constitució successiva', 'donació', 'inscripció registral']
  },
  {
    id: 'jpr-022',
    title: 'Sentència sobre dret d\'habitació i arrendament',
    court: 'TSJC',
    date: '1999-02-04',
    caseNumber: 'STSJC 4.2.1999',
    snippet: 'Es va pronunciar sobre l\'aplicabilitat a Catalunya de la prohibició d\'arrendar o traspassar el dret d\'habitació (art. 525 CC), concloent que no era contrària a la tradició jurídica catalana.',
    relatedArticles: ['V-260'],
    bookId: 'V',
    keywords: ['dret d\'habitació', 'arrendament', 'traspassament', 'prohibició', 'tradició jurídica catalana']
  },
  {
    id: 'jpr-023',
    title: 'Sentència sobre extinció per usucapió de drets de cens',
    court: 'Tribunal Suprem',
    date: '1998-06-23',
    caseNumber: 'STS 23.6.1998',
    snippet: 'Declara extingit per usucapió de la llibertat del domini un "derecho de vuelo consistente en el derecho de monte alto y bajo de encinas y derecho de apostar", que s\'hauria de qualificar com un dret d\'aprofitament parcial o servitud personal.',
    relatedArticles: ['V-271', 'V-20'],
    bookId: 'V',
    keywords: ['cens', 'usucapió', 'extinció', 'aprofitament parcial', 'servitud personal']
  },
  {
    id: 'jpr-024',
    title: 'Sentència sobre servituds de pas forçós i legitimació',
    court: 'Tribunal Suprem',
    date: '1961-09-27',
    caseNumber: 'STS 27.9.1961',
    snippet: 'Es pronuncia sobre la legitimació per a exigir la constitució de la servitud de pas als titulars de drets reals possessoris.',
    relatedArticles: ['V-319'],
    bookId: 'V',
    keywords: ['servitud de pas', 'pas forçós', 'legitimació', 'drets reals possessoris']
  },
  {
    id: 'jpr-025',
    title: 'Sentència sobre anul·lació de límits temporals i constructius del dret de vol',
    court: 'Tribunal Suprem',
    date: '2000-02-24',
    caseNumber: 'STS 24.2.2000',
    snippet: 'Va anul·lar la lletra b de l\'article 16.2 RH que fixava un termini màxim de deu anys per a l\'exercici del dret de vol, per manca de rang legal.',
    relatedArticles: ['V-327'],
    bookId: 'V',
    keywords: ['dret de vol', 'termini màxim', 'rang legal', 'anul·lació']
  },
  {
    id: 'jpr-026',
    title: 'Sentència sobre anul·lació de límits constructius del dret de vol',
    court: 'Tribunal Suprem',
    date: '2001-01-31',
    caseNumber: 'STS 31.1.2001',
    snippet: 'Va anul·lar la lletra c de l\'article 16.2 RH que exigia concretar el nombre màxim de plantes a construir, per manca de base legal.',
    relatedArticles: ['V-327'],
    bookId: 'V',
    keywords: ['dret de vol', 'límits constructius', 'plantes', 'base legal']
  },
  {
    id: 'jpr-027',
    title: 'Resolució sobre determinació del nombre màxim de plantes en drets de vol',
    court: 'DGRN',
    date: '2002-11-18',
    caseNumber: 'RDGRN 18.11.2002',
    snippet: 'Exigeix que el títol constitutiu determini el nombre màxim de plantes que es podran construir per garantir el principi de determinació, i així evitar drets reals limitats de caràcter perpetu i irredimible.',
    relatedArticles: ['V-327'],
    bookId: 'V',
    keywords: ['dret de vol', 'determinació', 'plantes', 'principi de determinació', 'perpetuïtat']
  },
  {
    id: 'jpr-028',
    title: 'Sentència sobre constitució d\'usdefruit sobre nua propietat',
    court: 'TSJC',
    date: '2005-02-03',
    caseNumber: 'STSJC 3.2.2005',
    snippet: 'Jurisprudència citada per a l\'anàlisi de si és possible constituir un usdefruit sobre la nua propietat i els seus efectes.',
    relatedArticles: ['V-223', 'V-235'],
    bookId: 'V',
    keywords: ['usdefruit', 'nua propietat', 'constitució', 'efectes']
  },
  {
    id: 'jpr-029',
    title: 'Resolució sobre usdefruit sobre nua propietat',
    court: 'DGRN',
    date: '2004-11-24',
    caseNumber: 'RDGRN 24.11.2004',
    snippet: 'Jurisprudència citada per a l\'anàlisi de si és possible constituir un usdefruit sobre la nua propietat i els seus efectes.',
    relatedArticles: ['V-223', 'V-235'],
    bookId: 'V',
    keywords: ['usdefruit', 'nua propietat', 'constitució', 'inscripció registral']
  },
  {
    id: 'jpr-030',
    title: 'Sentència sobre constitució tàcita de servituds (2015)',
    court: 'TSJC',
    date: '2015-02-02',
    caseNumber: 'STSJC 2.2.2015',
    snippet: 'Admet la constitució tàcita de servituds, exterioritzada mitjançant fets concloents.',
    relatedArticles: ['V-313', 'V-314'],
    bookId: 'V',
    keywords: ['servitud', 'constitució tàcita', 'fets concloents']
  },
  {
    id: 'jpr-031',
    title: 'Sentència sobre servituds per destinació del pare de família',
    court: 'TSJC',
    date: '2003-09-18',
    caseNumber: 'STSJC 18.9.2003',
    snippet: 'Es pronuncia sobre la improcedència de la constitució de servituds per destinació del pare de família en el dret anterior a la Llei de 1990 i al CCCat.',
    relatedArticles: ['V-313', 'V-314'],
    bookId: 'V',
    keywords: ['servitud', 'destinació del pare de família', 'dret anterior']
  },
  // Jurisprudència andorrana
  {
    id: 'jpr-and-001',
    title: 'Reposició sobre inadmissió - Recurs de reposició i taxes judicials',
    court: 'TSJC (Andorra)',
    date: '2025-07-15',
    caseNumber: 'TSJC.- 0000209/2024 (0000209/2024-01)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) desestima el recurs de reposició interposat contra l\'aute que inadmetia un recurs per falta de pagament de la taxa judicial. La sentència estableix que el recurs de reposició contra l\'aute que resol una recusació ha de portar taxes judicials, aplicant l\'article 9.1 h) de la Llei de taxes judicials, sense distinció entre recursos propis i impropis. Confirma que contra l\'aute que desestima una recusació no es pot interposar recurs de reposició sinó recurs d\'apel·lació, i que aquest darrer ha de portar taxes. La interpretació no vulnera el dret a la jurisdicció reconegut a l\'article 10 de la Constitució, atès que existeixen exempcions per a persones sense recursos econòmics.',
    relatedArticles: ['CCA_LI_A325'],
    keywords: ['recurs de reposició', 'taxes judicials', 'inadmissió', 'recusació', 'Llei de taxes judicials', 'article 325', 'Codi de procediment civil', 'dret a la jurisdicció', 'recurs d\'apel·lació']
  },
  {
    id: 'jpr-and-002',
    title: 'Atribució domicili conjugal - Modificació mesures - Persona més necessitada',
    court: 'TSJC (Andorra)',
    date: '2025-07-10',
    caseNumber: 'TSJC.- 0000035/2025 (5000148/2024)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) estima parcialment el recurs d\'apel·lació i revoca la sentència de primera instància que havia establert la finalització de l\'atribució del domicili conjugal a favor de la Sra. MVR. La sentència estableix que l\'atribució del domicili conjugal ha d\'interpretar-se de manera finalista i no literal, considerant el conjunt de circumstàncies personals de més necessitat que afecten a la beneficiària. En aquest cas, la Sra. MVR, de 75 anys, ha passat per quatre intervencions quirúrgiques relacionades amb càncer de colon, està jubilada amb una pensió de 1.700€ mensuals i ha viscut 35 anys al domicili amb els seus fills. La seva situació és indubtablement molt més necessitada que la del Sr. ARA, per la qual cosa es manté l\'atribució del domicili. La sentència aplica l\'article 142.2 de la Llei 30/2022 qualificada de la persona i de la família i l\'article 56 de la Llei qualificada del matrimoni, confirmant que les circumstàncies de més necessitat no només persisteixen sinó que s\'han agreujat.',
    relatedArticles: ['CCA_LI_A291'],
    keywords: ['atribució domicili conjugal', 'modificació mesures', 'divorci', 'persona més necessitada', 'Llei 30/2022', 'article 142', 'Llei qualificada del matrimoni', 'article 56', 'processos de persona i família', 'pensió compensatòria', 'circumstàncies personals']
  },
  {
    id: 'jpr-and-003',
    title: 'Negligència entitat bancària - Transferències no autoritzades - Responsabilitat bancària',
    court: 'TSJC (Andorra)',
    date: '2025-07-09',
    caseNumber: 'TSJC.- 0000026/2025 (1000200/2018)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) estima el recurs d\'apel·lació i revoca la sentència de primera instància, condemnant l\'entitat bancària X SA a abonar 437.000€ més interessos legals a la Sra. JNG per transferències realitzades sense autorització. La sentència estableix que el gestor bancari va ser negligent en l\'execució de quatre transferències per valor global de 437.000€, tot i tenir elements suficients per reaccionar: transferències molt urgents i seguides en el temps, quantitat que equivalia gairebé la totalitat del dipòsit, destinació a països diferents, utilització d\'adreça de correu electrònic errònia, malentès en conversa telefònica, i contracte de compravenda amb signatura digital no verificada. La sentència conclou que la diligència exigible a l\'entitat bancària és estricta, havent de respondre fins i tot per culpa lleu, ja que és un professional del sector que cobra pels serveis que realitza. La conducta del gestor no va gaudir de la diligència deguda per assegurar-se de la identitat de la persona que ordenava les transferències.',
    relatedArticles: [],
    keywords: ['negligència bancària', 'transferències no autoritzades', 'responsabilitat bancària', 'diligència deguda', 'culpa lleu', 'suplantació identitat', 'hackeig correu electrònic', 'valoració probatòria', 'obligacions bancàries', 'seguretat operacions bancàries']
  },
  {
    id: 'jpr-and-004',
    title: 'Arrendaments - Aplicabilitat Llei 24/2023 - Excepció per destinació a familiars - Trampa del fill',
    court: 'TSJC (Andorra)',
    date: '2025-07-09',
    caseNumber: 'TSJC.- 0000046/2025 (3000203/2024)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) estima el recurs d\'apel·lació i revoca la sentència de primera instància, desestimant la demanda de resolució de contracte d\'arrendament interposada per la societat S SLU. La sentència estableix que resulta d\'aplicació la pròrroga prevista a l\'article 4.2.b) de la Llei 24/2023, de mesures d\'estímul i d\'estabilitat del mercat d\'arrendament d\'habitatges, per la qual cosa el contracte d\'arrendament continua vigent i no ha estat objecte de resolució. La sentència analitza l\'excepció prevista a l\'article 2.4.b) de la Llei 24/2023 per destinar l\'habitatge a familiars de fins al segon grau, coneguda popularment com "la trampa del fill". El tribunal conclou que l\'arrendador no ha acreditat suficientment la voluntat real de destinar l\'habitatge a la seva filla, atès que la gravació de la conversa acredita que el senyor C coneixia l\'excepció i manifestava que tot i que no pensava destinar la casa a domicili de la seva filla, si calia així ho faria constar. La sentència recorda que les excepcions han d\'interpretar-se estrictament ("exceptio est strictissimea interpretationis") i que és a l\'arrendador justificar que estan reunides les condicions de l\'excepció que invoca al seu benefici, especialment en una llei de protecció de la part més feble.',
    relatedArticles: [],
    keywords: ['arrendaments', 'Llei 24/2023', 'pròrroga contracte arrendament', 'excepció familiars', 'trampa del fill', 'desnonament', 'resolució contracte arrendament', 'habitatge', 'protecció arrendatari', 'interpretació estricta excepcions', 'article 2.4.b)', 'article 4.2.b)']
  },
  {
    id: 'jpr-and-005',
    title: 'Obres - Responsabilitat per danys a cases col·lindants - Responsabilitat del promotor - Assegurança voluntària',
    court: 'TSJC (Andorra)',
    date: '2025-07-09',
    caseNumber: 'TSJC.- 0000203/2024 (1100598/2010)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) desestima el recurs d\'apel·lació i confirma la sentència de primera instància que condemna el senyor AMG, solidàriament amb la seva companyia d\'assegurances X SA, a satisfer 12.100,21€ al senyor ABG i 17.650€ als senyors FXGL i MRF per danys causats a les seves cases col·lindants a conseqüència d\'unes obres deficientment executades. La sentència estableix que el senyor AMG té la qualitat de promotor de les obres efectuades a casa seva, amb independència dels coneixements que pugui tenir sobre construcció. La responsabilitat del promotor deriva del fet que com a persona que impulsa la realització d\'una obra immobiliària, és l\'encarregat de triar els facultatius que projectaran i dirigiran l\'obra, així com l\'executor material de la mateixa, i com a agent que obté el lucre de l\'operació ha d\'assumir també els riscos que pot originar la mateixa ("ubi commodum ibi incommodum"). La sentència també estableix que l\'assegurança del constructor no és de caràcter obligatori i, per tant, no ha de respondre per causa de la materialització d\'un risc quina cobertura no hagi estat contractada pel seu assegurat. En canvi, l\'assegurança voluntària contractada pel promotor (pòlissa multirisc llar) sí que ha de respondre solidàriament amb el seu assegurat, atès que no s\'ha aportat la pòlissa ni s\'ha invocat cap clàusula d\'exclusió.',
    relatedArticles: [],
    keywords: ['obres', 'responsabilitat promotor', 'danys cases col·lindants', 'assegurança voluntària', 'assegurança constructor', 'responsabilitat civil', 'ubi commodum ibi incommodum', 'valoració probatòria', 'reclamació quantitat', 'esquerdes', 'fonamentacions', 'excavació soterrani']
  },
  {
    id: 'jpr-and-006',
    title: 'Laboral - Reclamació quantitat per avantatge material àpats - Dret adquirit - Modificació unilateral condicions laborals',
    court: 'TSJC (Andorra)',
    date: '2025-07-09',
    caseNumber: 'TSJC.- 0000318/2024 (3000187/2024)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) estima el recurs d\'apel·lació i revoca parcialment la sentència de primera instància, reconeixent el dret de la treballadora a gaudir d\'un àpat (sopar) des del dia 1 de maig de 2023 i condemnant la societat TB SLU a pagar 470,40€ bruts en concepte de retribucions en espècie pel període comprès entre maig de 2023 i abril de 2024. La sentència estableix que els avantatges materials (àpats) consolidats s\'incorporen al règim contractual i no poden ser unilateralment suprimits o reduïts per l\'empresari. La resolució administrativa de la CASS que exigeix la regularització de cotitzacions per avantatges materials percebuts per les treballadores, juntament amb la conducta de l\'empresari que no va formular al·legacions ni va interposar recurs contra aquesta resolució, constitueix un acte inequívoc de conformitat tàcita que acredita l\'existència del dret consolidat. La sentència també analitza la rebel·lia processal, establint que la declaració de rebel·lia no suposa per regla general l\'admissió dels fets continguts en la demanda, ni aplanament o conformitat a les peticions exercitades, i suposa la substanciació normal del procediment pels seus tràmits legals. La modificació unilateral de condicions laborals consolidades sense el consentiment express de la treballadora és invàlida.',
    relatedArticles: ['CCA_LI_A140', 'CCA_LI_A172', 'CCA_LI_A289'],
    keywords: ['laboral', 'avantatge material', 'àpats', 'retribució en espècie', 'dret adquirit', 'modificació unilateral condicions laborals', 'rebel·lia processal', 'càrrega de la prova', 'sana crítica', 'consolidació avantatges', 'article 74.3 Llei Relacions Laborals', 'CASS', 'cotitzacions', 'article 140 CPC', 'article 172 CPC', 'article 289.3 CPC']
  },
  {
    id: 'jpr-and-007',
    title: 'Contracte societat mercantil - Renúncia soci - Requisits - Lucre cessant - Dissolució de facto',
    court: 'TSJC (Andorra)',
    date: '2025-07-09',
    caseNumber: 'TSJC.- 0000301/2024 (6000223/2017)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) desestima el recurs d\'apel·lació i confirma íntegrament la sentència de primera instància que desestima la demanda de reclamació de danys i perjudicis per lucre cessant. La sentència estableix que la renúncia d\'un soci a la societat mercantil (societat limitada) abans de la vigent llei de societats no va ser intempestiva ni fraudulenta. La renúncia del Sr. JJL com a director general va ser acceptada pels altres socis en la Junta General de 30 de juny de 1994, que també van designar un nou director general, demostrant que la societat podia continuar operativa. La sentència conclou que la renúncia no abocava necessàriament la societat al cessament de l\'activitat, atès que la societat tenia obres per executar, personal i vehicles, i que els altres socis van intentar vendre l\'actiu a diverses empreses abans de vendre\'l parcialment a G SL més d\'un any després. La reclamació de lucre cessant per dissolució de facto de la societat és improcedent perquè no hi ha hagut cap actuació il·lícita dels defenents. La sentència ratifica la doctrina establerta en sentència anterior de 2016 sobre la qualitat de soci real i el dret a ser rescabalat.',
    relatedArticles: [],
    keywords: ['societat mercantil', 'societat limitada', 'renúncia soci', 'dissolució societat', 'lucre cessant', 'danys i perjudicis', 'contracte societat', 'soci real', 'rescabalament', 'frau', 'intempestiu', 'objecte social', 'indivisió', 'separació voluntària soci']
  },
  {
    id: 'jpr-and-008',
    title: 'API - Legitimació activa - Enriquiment injust - Honoraris - Gestió deficient - Valoració prova',
    court: 'TSJC (Andorra)',
    date: '2025-07-09',
    caseNumber: 'TSJC.- 0000324/2024 (6000099/2021)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) desestima els recursos d\'apel·lació de les dues parts i confirma íntegrament la sentència de primera instància que estima parcialment la demanda de la societat ISG SL (API) i la demanda reconvencional de la Comunitat de Propietaris X, amb compensació judicial de crèdits resultant en condemna de la Comunitat a pagar 24.821,65€. La sentència estableix que la societat ISG SL té legitimació activa per exercitar l\'acció d\'enriquiment injust, atès que qui va experimentar l\'empobriment és realment l\'API i no les persones físiques que van realitzar els pagaments utilitzant els seus comptes personals. El fet que el pagament inicial no l\'efectués la part que invoca l\'enriquiment injust no és suficient per privar-la de la legitimació. La sentència també estableix que el Llibre Major no gaudeix de cap presumpció de veracitat per si sol, però juntament amb altres elements de prova (problemes de tresoreria, pagaments per persones implicades en l\'API) sí que constitueix un element de prova pertinent per acreditar la legitimació activa. La sentència conclou que la gestió deficient de l\'API va provocar l\'obligació de la Comunitat d\'abonar honoraris suplementaris al nou administrador per solucionar les deficiències i negligència imputables a l\'API.',
    relatedArticles: [],
    keywords: ['API', 'administradora propietats immobiliàries', 'legitimació activa', 'enriquiment injust', 'empobriment', 'honoraris', 'gestió deficient', 'valoració prova', 'llibre major', 'compensació judicial crèdits', 'comunitat propietaris', 'demanda reconvencional', 'negligència professional', 'traçabilitat comptable']
  },
  {
    id: 'jpr-and-009',
    title: 'Separació - Guarda i custòdia - Potestat parental - Trasllat fills sense autorització - Comunicacions telemàtiques STF - Pensió aliments',
    court: 'TSJC (Andorra)',
    date: '2025-07-09',
    caseNumber: 'TSJC.- 0000003/2025 (4000020/2023)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) desestima el recurs d\'apel·lació i confirma íntegrament la sentència de primera instància que estableix la separació matrimonial, manté l\'autoritat parental compartida i atribueix la guarda i custòdia dels tres menors a favor de la mare. La sentència estableix que la privació o suspensió de l\'autoritat parental requereix un incompliment greu i reiterat dels deures com a progenitor, i que el trasllat de la mare a Rússia amb els fills sense autorització, tot i no ser apropiat, no justifica ni la suspensió ni la privació de l\'autoritat parental, atès que no hi ha voluntat de desatendre els deures amb els fills sinó que venia precedida d\'una situació de manca de suport familiar i recursos econòmics propis. La sentència també estableix que, atesa la llunyania dels domicilis, la guarda i custòdia compartida resulta inviable, i que el més beneficiós pels menors és que estiguin sota la custòdia de la mare, amb un règim de comunicació telemàtica supervisat pels tècnics del Servei de Trobada Familiar (STF). La pensió d\'aliments es fixa en 700€ mensuals per fill, dins del rang establert per la jurisprudència (600-800€ mensuals per fill). La sentència aplica els articles 145, 226 i 228 de la Llei 30/2022 qualificada de la persona i de la família.',
    relatedArticles: [],
    keywords: ['separació', 'guarda i custòdia', 'potestat parental', 'autoritat parental', 'trasllat fills sense autorització', 'comunicacions telemàtiques', 'Servei Trobada Familiar', 'STF', 'pensió aliments', 'Llei 30/2022', 'article 145', 'article 226', 'article 228', 'privació autoritat parental', 'suspensió autoritat parental', 'interès superior menor', 'visites supervisades', 'conflicte parental']
  },
  {
    id: 'jpr-and-010',
    title: 'Fundació - Impugnació acords Patronat - Compatibilitat finalitat fundacional - Col·laboració centres educatius',
    court: 'TSJC (Andorra)',
    date: '2025-07-09',
    caseNumber: 'TSJC.- 0000025/2025 (1000213/2023)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) desestima el recurs d\'apel·lació i confirma la sentència de primera instància que desestima la demanda d\'impugnació d\'acords fundacionals. La sentència estableix que els ajuts aprovats pel Patronat de la Fundació Y per finançar obres de reforma i reparació d\'espais i instal·lacions als Col·legis X i Z (200.000€ per cadascun) s\'ajusten a les finalitats i activitats específiques fundacionals. La sentència conclou que la col·laboració amb centres educatius inclou, per connexitat amb les activitats que s\'hi duen a terme, les obres de reforma que permeten gaudir de més espais per destinar-los a una bona prestació del servei d\'educació, i les obres de millora que permeten aconseguir una millor prestació del servei i del dret fonamental a l\'educació. L\'article 3 dels Estatuts de la Fundació no exigeix que les col·laboracions s\'hagin de cenyir a activitats culturals i educatives pròpiament dites, sinó que exigeix que es tracti de "col·laboracions dins de l\'àmbit de l\'educació i de la cultura". Existeix una connexió entre les obres a efectuar i la prestació del servei educatiu, ja que no només el faciliten, sinó que l\'asseguren. La sentència aplica els articles 356 i 354.2 del Codi de procediment civil.',
    relatedArticles: ['CCA_LI_A354', 'CCA_LI_A356'],
    keywords: ['fundació', 'impugnació acords', 'patronat', 'finalitat fundacional', 'col·laboració centres educatius', 'interès general', 'interès públic', 'activitats fundacionals', 'estatuts fundació', 'protectorat fundacions', 'Llei 17/2023 fundacions', 'article 3 estatuts', 'article 33.2 Llei fundacions', 'article 356 CPC', 'article 354.2 CPC']
  },
  {
    id: 'jpr-and-011',
    title: 'Promesa de compra - Responsabilitat contractual - Incompliment - Valoració prova',
    court: 'TSJC (Andorra)',
    date: '2025-07-09',
    caseNumber: 'TSJC.- 0000316/2024 (7000139/2020)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) desestima el recurs d\'apel·lació i confirma íntegrament la sentència de primera instància que desestima la demanda de reclamació de responsabilitat contractual. La sentència estableix que els contractes legalment consentits són la llei de les parts i han de negociar-se, formar-se i executar-se de bona fe. Per poder donar lloc a una reclamació per responsabilitat contractual, s\'ha de constatar l\'existència d\'un contracte, l\'incompliment culpós d\'una obligació del mateix, i un dany provocat per l\'incompliment. La sentència conclou que els dos documents firmats ("PROMESA DE COMPRA" i "PROMESA DE COMPRA PAGAMENT DEL PREU") són documents complementaris i indissociables, no dues promeses independents. El primer document conté les condicions essencials (incloent el termini de 29-02-2020) i el segon es refereix al preu i al seu pagament sense canviar res del primer. No existeixen elements per establir una actuació culpable imputable a la societat SPI SLU pel sobrepassament del termini, sinó que apareix una sèrie de circumstàncies (incloent el confinament) i peripècies que van retardar el procés. El perjudici ha de ser cert i no hipotètic, i ha de tenir una relació causal directa amb la culpa contractual. La sentència aplica l\'article 354.2 del Codi de procediment civil.',
    relatedArticles: ['CCA_LI_A354'],
    keywords: ['promesa de compra', 'responsabilitat contractual', 'incompliment contractual', 'valoració prova', 'contracte', 'bona fe', 'execució forçosa', 'resolució contracte', 'danys i perjudicis', 'culpa contractual', 'força major', 'dany cert', 'relació causal', 'article 354.2 CPC']
  },
  {
    id: 'jpr-and-012',
    title: 'Propietat horitzontal - Deutes comunitaris - Impugnació acords junta - Moderació interessos moratoris - Despeses extrajudicials',
    court: 'TSJC (Andorra)',
    date: '2025-07-09',
    caseNumber: 'TSJC.- 0000005/2025 (7000118/2023)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) estima molt parcialment el recurs del senyor JGO i desestima el recurs de la Comunitat de Propietaris E II. La sentència estableix que el procediment previst per reclamar deutes comunitaris és inidoni per impugnar la validesa dels acords de la junta ni dels estatuts. Els articles 29.3, 32.2 i 32.4 de la Llei de propietat horitzontal estableixen que els acords recollits en l\'Acta, una vegada tancada, són executius; que per poder-los impugnar s\'ha de seguir el procediment establert per la mateixa que té un termini de caducitat de 30 dies des del dia de l\'adopció de l\'acord; i que per poder-los impugnar cal estar al corrent del pagament dels deutes vençuts o haver-los procedit a consignar. La sentència conclou que un interès estatutari del 15% és abusiu i s\'ha de moderar aplicant l\'interès legal majorat en 3 punts, a comptar de la contesta a la demanda. La sentència també estableix que les despeses extrajudicials prèvies a la reclamació judicial (honoraris d\'advocat per la redacció de la carta de reclamació) no són procedents per manca de complexitat de la seva redacció, atès que enlloc s\'exigeix que la reclamació extrajudicial exigeixi la intervenció d\'un advocat.',
    relatedArticles: [],
    keywords: ['propietat horitzontal', 'deutes comunitaris', 'impugnació acords junta', 'moderació interessos moratoris', 'interessos estatutaris', 'interès abusiu', 'interès legal majorat', 'despeses extrajudicials', 'honoraris advocat', 'carta reclamació', 'Llei propietat horitzontal', 'article 29.3 LPH', 'article 32.2 LPH', 'article 32.4 LPH', 'acords executius', 'termini caducitat 30 dies', 'consignació deutes']
  },
  {
    id: 'jpr-and-013',
    title: 'Liquidació contracte col·laboració societats - Compensació deutes - Valoració prova - Testimoni referència',
    court: 'TSJC (Andorra)',
    date: '2025-07-09',
    caseNumber: 'TSJC.- 0000312/2024 (6000298/2016)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) desestima el recurs d\'apel·lació i confirma íntegrament la sentència de primera instància que estima parcialment la demanda i l\'excepció de compensació, declarant compensació judicial de crèdits resultant en condemna de la societat A SA a pagar 505.922,77€. La sentència estableix que per acreditar una compensació de deutes entre societats s\'exigeix una prova clara i concloent de la voluntat coincident de les parts, o una justificació suficient que permeti identificar de manera fefaent l\'origen, el destí i el fonament del pagament efectuat. La sentència conclou que no ha quedat provat el reconeixement efectiu del deute per part de la societat C ni, tampoc, la seva satisfacció per part de la societat A SA. La sentència analitza la valoració de la prova testifical, establint que els testimonis amb interès directe (socis, familiars, exempleats) han de ser objecte d\'una valoració extremadament cautelosa. El testimoni de referència o testimoni d\'oïdes suscita desconfiança, especialment quan la font per al testimoni la constitueix la pròpia part litigant. L\'absència de qualsevol mena d\'evidència escrita o comptable que acrediti l\'existència i execució del suposat pagament permet raonablement dubtar de la realitat de l\'operació. La sentència aplica l\'article 354.2 del Codi de procediment civil.',
    relatedArticles: ['CCA_LI_A354'],
    keywords: ['liquidació contracte', 'col·laboració societats', 'compensació deutes', 'valoració prova', 'testimoni referència', 'testimoni oïdes', 'prova testifical', 'interès directe testimoni', 'prova documental', 'traçabilitat comptable', 'reconeixement deute', 'compensació judicial crèdits', 'article 354.2 CPC', 'gestió societària', 'responsabilitat corporativa']
  },
  {
    id: 'jpr-and-014',
    title: 'Resolució promesa de compravenda, restitució de les arres satisfetes',
    court: 'TSJC (Andorra)',
    date: '2025-07-09',
    caseNumber: 'TSJC.- 0000007/2025 (6000114/2022)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) estima el recurs d\'apel·lació i revoca la sentència de primera instància, condemnant la Sra. ARC a restituir a la Sra. CDF la suma de 21.500€ corresponent a les arres confirmatòries satisfetes, més interessos legals des del 5-9-2022. La sentència estableix que la proposta del comprador d\'incloure una manifestació de reserva d\'accions en previsió de vicis ocults no modifica el contracte de compravenda inicial, sinó que és el reflex d\'un dret ja integrat en l\'estructura legal del contracte (sanejament per vicis ocults segons Digest 21, 1 i Codi 4, 58). La sentència conclou que quan la resolució contractual no és imputable exclusivament a una sola part, sinó que és el resultat d\'una dinàmica relacional marcada per reserves d\'ambdues parts, no es pot aplicar el mecanisme de sanció pactat a la clàusula d\'arres doblades, sinó que cal la restitució de les prestacions recíprocament satisfetes com a expressió del principi de reequilibri patrimonial i de prevenció de l\'enriquiment injust.',
    relatedArticles: [],
    keywords: ['promesa compravenda', 'arres confirmatòries', 'restitució arres', 'vicios ocults', 'sanejament vicis ocults', 'resolució contractual', 'arres doblades', 'reserva accions', 'Digest 21, 1', 'Codi 4, 58', 'acció redhibitòria', 'quanti minoris', 'enriquiment injust', 'reequilibri patrimonial', 'incompliment bilateral', 'clàusula arres', 'contracte compravenda', 'humitats immoble', 'defectes ocults', 'garantia venedor']
  },
  {
    id: 'jpr-and-015',
    title: 'Procediment urgent i preferent previst a l\'article 41.1 Constitució. Vulneració dels drets fonamentals a la integritat moral i el respecte a la vida familiar. Dret de contactes i visites dels fills i nets amb pare/avi amb malaltia degenerativa. Competència internacional dels organismes jurisdiccionals andorrans. Apreciació d\'ofici.',
    court: 'TSJC (Andorra)',
    date: '2025-06-12',
    caseNumber: 'TSJC.- 0000037/2025 (0000075/2024)',
    snippet: 'El Tribunal Superior de Justícia d\'Andorra (Sala Civil) desestima el recurs d\'apel·lació i confirma la sentència de primera instància que declara la vulneració del dret al respecte de la vida familiar de la Sra. BCV i requereix a la Sra. MDT que efectuï les actuacions necessàries prop de la residència geriàtrica RSD de Lleida (Espanya) per eliminar qualsevol impediment o restricció en el dret de visites i contacte amb el pare/avi Sr. ACF. La sentència estableix la competència internacional dels tribunals andorrans basant-se en el principi actor sequitur forum rei, donat que la part demandada té domicili al Principat, ambdues parts són nacionals andorrans i les mesures de reposició s\'interessen que les adopti la senyora MDT domiciliada al Principat. La sentència conclou que s\'ha acreditat l\'existència de restriccions a les visites imposades per personal del centre residencial per ordre de la senyora MDT, sense que s\'hagi acreditat que les visites fossin perjudicials ni la necessitat de la seva presència. Aplica l\'article 13.2 de la Constitució sobre el respecte a la vida familiar i l\'article 41.1 sobre procediment urgent i preferent.',
    relatedArticles: [],
    keywords: ['procediment urgent preferent', 'article 41.1 Constitució', 'dret vida familiar', 'article 13.2 Constitució', 'integritat moral', 'dret contactes visites', 'malaltia degenerativa', 'competència internacional', 'actor sequitur forum rei', 'article 4 Llei qualificada Justícia', 'article 354.2 CPC', 'autotutela', 'tutela', 'modificació capacitat', 'deteriorament cognitiu', 'centre geriàtric', 'restriccions visites', 'dret família', 'fòrum non conveniens', 'nacionalitat andorrana', 'domicili Principat', 'mesures suport', 'dret fills nets', 'relacions familiars', 'protecció família']
  }
];

/**
 * Busca jurisprudència relacionada amb un article específic
 * @param articleId - ID de l'article (ex: 'I-1', 'II-5')
 * @param articleNumber - Número de l'article (ex: 'Article 1-1')
 * @returns Array de casos de jurisprudència relacionats
 */
export function getJurisprudenceForArticle(
  articleId: string,
  articleNumber?: string
): JurisprudenceCase[] {
  return jurisprudenceDatabase.filter((case_) => {
    // Cerca per ID d'article exacte
    if (case_.relatedArticles.includes(articleId)) {
      return true;
    }

    // Cerca per número d'article (si es proporciona)
    if (articleNumber) {
      const normalizedArticleNumber = articleNumber.replace(/Article\s+/i, '').trim();
      return case_.relatedArticles.some((relatedId) => {
        // Compara si el número d'article coincideix
        const relatedArticleNumber = relatedId.split('-').slice(1).join('-');
        return relatedArticleNumber === normalizedArticleNumber;
      });
    }

    return false;
  });
}

/**
 * Busca jurisprudència per paraules clau
 * @param keywords - Array de paraules clau per cercar
 * @returns Array de casos de jurisprudència relacionats
 */
export function searchJurisprudenceByKeywords(keywords: string[]): JurisprudenceCase[] {
  if (keywords.length === 0) return [];

  const lowerKeywords = keywords.map(k => k.toLowerCase());

  return jurisprudenceDatabase.filter((case_) => {
    // Cerca en títol
    const titleMatch = lowerKeywords.some(keyword =>
      case_.title.toLowerCase().includes(keyword)
    );

    // Cerca en snippet
    const snippetMatch = lowerKeywords.some(keyword =>
      case_.snippet.toLowerCase().includes(keyword)
    );

    // Cerca en keywords
    const keywordsMatch = case_.keywords?.some(keyword =>
      lowerKeywords.some(k => keyword.toLowerCase().includes(k))
    );

    return titleMatch || snippetMatch || keywordsMatch;
  });
}

/**
 * Obté tots els casos de jurisprudència d'un llibre específic
 * @param bookId - ID del llibre
 * @returns Array de casos de jurisprudència del llibre
 */
export function getJurisprudenceByBook(bookId: BookId): JurisprudenceCase[] {
  return jurisprudenceDatabase.filter((case_) => case_.bookId === bookId);
}

/**
 * Obté tots els casos de jurisprudència disponibles
 * @returns Array amb tots els casos
 */
export function getAllJurisprudence(): JurisprudenceCase[] {
  return jurisprudenceDatabase;
}

