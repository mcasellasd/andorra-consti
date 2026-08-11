import { articlesConstitucio } from './articles';
import { getContextConstitucional } from '../../../lib/prompts/context-constitucional';
import type { ConstitutionalEditorialEntry, EditorialText } from '../types';

const text = (ca = '', es?: string, fr?: string): EditorialText => ({ ca, es, fr });

function articleNumber(articleId: string): string {
  return articleId === 'CONST_PREAMB' ? 'Preàmbul' : articleId.replace('CONST_', 'Article ').replace(/^Article 0+/, 'Article ');
}

function baseEntry(articleId: string): ConstitutionalEditorialEntry {
  const article = articlesConstitucio.find((item) => item.id === articleId);
  const context = article ? getContextConstitucional(article.numeracio) : null;
  const reference = articleNumber(articleId);

  return {
    article_id: articleId,
    estat: 'pendent',
    resum: text(),
    finalitat: text(),
    destinataris: text(),
    aplicacio: text(),
    limits: text(),
    conceptes_clau: [],
    preguntes_aprenentatge: context?.forca === 'dret-fonamental'
      ? ['Quin dret protegeix?', 'Qui pot veure’l afectat?', 'Quines garanties i límits estableix el text?']
      : context?.forca === 'principi-rector'
        ? ['Quina actuació exigeix als poders públics?', 'Quina llei o política pública el desenvolupa?', 'Es pot invocar directament o cal desplegament legal?']
        : context?.forca === 'garantia'
          ? ['Quin dret o llibertat protegeix?', 'Quina institució és competent?', 'Quina via de protecció correspon?']
          : ['Quina funció té aquest article dins la Constitució?', 'A qui s’adreça principalment?', 'Amb quins altres articles s’ha de llegir?'],
    pistes_aprenentatge: [],
    articles_relacionats: context?.fonament.map((item) => `Article ${item}`) ?? [],
    fonts: [{ id: articleId, tipus: 'constitucio', referencia: `Constitució del Principat d’Andorra, ${reference}` }],
    notes_revisio: 'Registre creat. Cal redacció i revisió editorial abans de publicar-lo.',
  };
}

const editorial: Record<string, ConstitutionalEditorialEntry> = Object.fromEntries(
  articlesConstitucio.map((article) => [article.id, baseEntry(article.id)])
);

// Primer registre editorial aprofitant el contingut supervisat que ja existia per a l’article 10.
const article10 = editorial.CONST_010;
if (article10) {
  article10.estat = 'en-revisio';
  article10.resum = text('Tens dret que un tribunal escolti el teu cas, a tenir defensa i assistència d’un lletrat, i a obtenir una decisió fonamentada en dret dins d’un termini raonable.');
  article10.finalitat = text('Garanteix l’accés efectiu a la justícia i les principals garanties d’un procés just.');
  article10.destinataris = text('S’adreça a tothom que acudeix als tribunals, tant nacionals com residents.');
  article10.aplicacio = text('Inclou el dret a la defensa, a l’assistència lletrada, a ser informat de l’acusació i a recórrer en els processos penals.');
  article10.limits = text('El contingut concret d’aquestes garanties es desenvolupa per la llei i s’ha d’interpretar d’acord amb el text constitucional i les normes aplicables.');
  article10.conceptes_clau = ['Tutela judicial efectiva', 'Lletrat', 'Procés degut', 'Presumpció d’innocència'];
  article10.pistes_aprenentatge = [
    'Pensa en l’accés a un tribunal, la defensa i les garanties d’un procés just.',
    'La protecció s’adreça a qualsevol persona que participa en un procediment judicial.',
    'La Constitució fixa les garanties i la llei en concreta els supòsits i procediments.',
  ];
  article10.fonts.push({ id: 'CONST_010-context', tipus: 'constitucio', referencia: 'Constitució d’Andorra, articles 39–42 (garanties dels drets)' });
  article10.notes_revisio = 'Borrador editorial basat en el contingut supervisat existent; pendent de validació de fonts i publicació.';
}

type EditorialDraft = Pick<ConstitutionalEditorialEntry, 'resum' | 'finalitat' | 'destinataris' | 'aplicacio' | 'limits' | 'conceptes_clau' | 'preguntes_aprenentatge' | 'pistes_aprenentatge'> & {
  articles_relacionats?: string[];
};

/** Primera sèrie de fitxes redactades: Títols I i II (articles 1–42). */
const draftsP1: Record<string, EditorialDraft> = {
  CONST_001: {
    resum: text('L’article defineix Andorra com un Estat independent, de dret, democràtic i social, i fixa el Coprincipat parlamentari com a règim polític. També situa la sobirania en el poble andorrà i enumera els principis que han d’orientar l’Estat.'),
    finalitat: text('Ofereix el marc polític i jurídic bàsic dins del qual s’han d’entendre les institucions i els drets constitucionals.'),
    destinataris: text('Vincula els poders públics i serveix de marc general per a tota la ciutadania i per a les institucions de l’Estat.'),
    aplicacio: text('S’utilitza per identificar la naturalesa d’Andorra, la font de la sobirania i el sistema institucional dins del qual actuen el Consell General, el Govern i els Coprínceps.'),
    limits: text('No és una llista exhaustiva de drets ni substitueix les regles específiques dels títols posteriors.'),
    conceptes_clau: ['Estat de dret', 'Sobirania popular', 'Coprincipat parlamentari', 'Estat democràtic i social'],
    preguntes_aprenentatge: ['On resideix la sobirania?', 'Què significa que Andorra sigui un Estat de dret?', 'Com es relaciona el Coprincipat amb el parlamentarisme?'],
    pistes_aprenentatge: ['Busca la relació entre sobirania, institucions i participació.', 'No descriu només la forma de l’Estat: també fixa principis d’actuació.', 'Cal llegir-lo amb els articles 3, 43 i 50.'],
    articles_relacionats: ['Article 3', 'Article 43', 'Article 50'],
  },
  CONST_002: {
    resum: text('L’article identifica els elements oficials que expressen la identitat de l’Estat: el català com a llengua oficial, els símbols tradicionals i Andorra la Vella com a capital.'),
    finalitat: text('Dona reconeixement constitucional als elements comuns de representació i identificació d’Andorra.'),
    destinataris: text('S’adreça sobretot a les institucions públiques i als actes oficials, sense convertir cada qüestió lingüística en un conflicte constitucional.'),
    aplicacio: text('Les administracions han d’utilitzar el català com a llengua oficial i els símbols constitucionals en l’activitat institucional.'),
    limits: text('L’article fixa l’oficialitat del català, però les conseqüències concretes de l’ús lingüístic es desenvolupen per la legislació corresponent.'),
    conceptes_clau: ['Llengua oficial', 'Símbols nacionals', 'Capitalitat', 'Identitat constitucional'],
    preguntes_aprenentatge: ['Quins elements d’identitat regula?', 'Què implica que el català sigui la llengua oficial?', 'Quina diferència hi ha entre un símbol constitucional i una pràctica administrativa?'],
    pistes_aprenentatge: ['Distingeix llengua oficial de llengües d’ús social.', 'L’article regula tres elements diferents: llengua, símbols i capital.', 'La legislació lingüística concreta l’aplicació.'],
    articles_relacionats: ['Article 1', 'Article 3'],
  },
  CONST_003: {
    resum: text('L’article proclama la Constitució com la norma suprema de l’ordenament i vincula tant els poders públics com els ciutadans. També fixa principis de legalitat, jerarquia normativa, seguretat jurídica, responsabilitat i prohibició de l’arbitrarietat.'),
    finalitat: text('Garanteix que l’exercici del poder públic estigui sotmès a normes prèvies, publicades i compatibles amb la Constitució.'),
    destinataris: text('Vincula totes les institucions, les administracions, els tribunals i les persones sotmeses a l’ordenament andorrà.'),
    aplicacio: text('Una llei, reglament o actuació administrativa ha de respectar la jerarquia normativa, ser accessible i poder ser controlada si vulnera la Constitució.'),
    limits: text('La supremacia constitucional no permet deixar d’aplicar una norma només per una opinió personal: cal utilitzar les vies d’interpretació i control previstes per l’ordenament.'),
    conceptes_clau: ['Supremacia constitucional', 'Legalitat', 'Seguretat jurídica', 'Interdicció de l’arbitrarietat'],
    preguntes_aprenentatge: ['Per què la Constitució és la norma suprema?', 'Què protegeix el principi de seguretat jurídica?', 'Com es controla una norma incompatible amb la Constitució?'],
    pistes_aprenentatge: ['Relaciona supremacia amb jerarquia normativa.', 'La publicitat de les normes permet que siguin conegudes.', 'Els articles 39 i 95–102 expliquen les vies de control i garantia.'],
    articles_relacionats: ['Article 1', 'Article 39', 'Article 95', 'Article 98'],
  },
  CONST_004: {
    resum: text('La dignitat humana és intangible i els drets de la persona són reconeguts com a inviolables i imprescriptibles.'),
    finalitat: text('Ofereix el fonament personalista de la Constitució: les institucions existeixen també per protegir la persona i els seus drets.'),
    destinataris: text('Vincula tots els poders públics i protegeix totes les persones, independentment de la seva nacionalitat.'),
    aplicacio: text('Serveix com a criteri per interpretar els drets fonamentals i per rebutjar actuacions que tractin la persona com un simple instrument.'),
    limits: text('No permet resoldre qualsevol conflicte només invocant la dignitat; cal concretar quin dret o garantia constitucional està afectat.'),
    conceptes_clau: ['Dignitat humana', 'Drets inviolables', 'Drets imprescriptibles', 'Persona'],
    preguntes_aprenentatge: ['Què vol dir que la dignitat sigui intangible?', 'Com informa aquest article la resta de drets?', 'Quin dret concret es podria veure afectat en un cas real?'],
    pistes_aprenentatge: ['La dignitat és un principi de lectura transversal.', 'No és només una declaració moral: orienta l’actuació dels poders públics.', 'Cal connectar-lo amb els articles 8–22.'],
    articles_relacionats: ['Article 3', 'Article 8', 'Article 39'],
  },
  CONST_005: {
    resum: text('La Declaració Universal dels Drets Humans és vigent a Andorra i actua com a referència internacional per a la protecció dels drets.'),
    finalitat: text('Connecta l’ordre constitucional andorrà amb els estàndards universals de drets humans.'),
    destinataris: text('Serveix de referència per al legislador, els tribunals i els poders públics quan interpreten els drets constitucionals.'),
    aplicacio: text('Pot ajudar a interpretar l’abast dels drets, sempre conjuntament amb la Constitució i les normes aplicables.'),
    limits: text('La Declaració no substitueix automàticament el text constitucional ni permet ignorar les regles internes de competència i procediment.'),
    conceptes_clau: ['Drets humans', 'Declaració Universal', 'Interpretació conforme', 'Estàndards internacionals'],
    preguntes_aprenentatge: ['Quina funció té la Declaració dins la Constitució?', 'És una font autònoma o una referència interpretativa?', 'Amb quins drets constitucionals es relaciona?'],
    pistes_aprenentatge: ['Pensa en una connexió entre dret intern i dret internacional.', 'La seva funció principal és reforçar la lectura dels drets.', 'Relaciona’l amb l’article 3 i els articles del capítol III.'],
    articles_relacionats: ['Article 3', 'Article 8', 'Article 10'],
  },
  CONST_006: {
    resum: text('Totes les persones són iguals davant la llei i no poden ser discriminades per motius com l’origen, el sexe, la religió, l’opinió o qualsevol altra condició personal o social.'),
    finalitat: text('Impedeix que els poders públics tractin iguals de manera diferent sense una justificació constitucional suficient.'),
    destinataris: text('Protegeix totes les persones i vincula el legislador, l’administració i els tribunals.'),
    aplicacio: text('S’aplica en lleis, polítiques públiques, decisions administratives i resolucions judicials que estableixin diferències de tracte.'),
    limits: text('No tota diferència de tracte és discriminatòria: cal examinar-ne la finalitat, la justificació i la proporcionalitat.'),
    conceptes_clau: ['Igualtat', 'No-discriminació', 'Diferència de tracte', 'Proporcionalitat'],
    preguntes_aprenentatge: ['Quina diferència hi ha entre igualtat formal i material?', 'Quan pot estar justificada una diferència de tracte?', 'Quin motiu de discriminació apareix en el cas que estudiem?'],
    pistes_aprenentatge: ['Comença comparant dues situacions semblants.', 'Pregunta’t si la diferència té una justificació objectiva.', 'Relaciona’l amb la dignitat de l’article 4.'],
    articles_relacionats: ['Article 4', 'Article 25', 'Article 27'],
  },
  CONST_007: {
    resum: text('La nacionalitat andorrana i les seves conseqüències jurídiques s’adquireixen, es conserven i es perden d’acord amb la llei.'),
    finalitat: text('Reserva al legislador la concreció del règim de nacionalitat dins del marc constitucional.'),
    destinataris: text('Afecta les persones que sol·liciten, tenen o poden perdre la nacionalitat andorrana i les institucions competents.'),
    aplicacio: text('Les decisions sobre nacionalitat han de basar-se en la llei i han de respectar les garanties de procediment i igualtat.'),
    limits: text('La llei no disposa d’una llibertat il·limitada: ha de respectar la Constitució, la igualtat i la seguretat jurídica.'),
    conceptes_clau: ['Nacionalitat', 'Adquisició', 'Pèrdua', 'Reserva de llei'],
    preguntes_aprenentatge: ['Quin paper té la llei?', 'Quines conseqüències jurídiques pot tenir la nacionalitat?', 'Quines garanties hauria de respectar una decisió sobre nacionalitat?'],
    pistes_aprenentatge: ['L’article no descriu tots els procediments: remet a la llei.', 'Diferencia condició personal i conseqüències jurídiques.', 'Relaciona’l amb els articles 6 i 21–22.'],
    articles_relacionats: ['Article 6', 'Article 21', 'Article 25'],
  },
  CONST_008: {
    resum: text('La Constitució reconeix el dret a la vida i protegeix la integritat física i moral. També prohibeix la tortura i els tractes inhumans o degradants.'),
    finalitat: text('Estableix una protecció reforçada de la vida i de la integritat de la persona davant l’Estat i davant qualsevol forma de violència.'),
    destinataris: text('Protegeix totes les persones i obliga especialment les forces de seguretat, els centres de detenció, els serveis públics i els tribunals.'),
    aplicacio: text('Una detenció, investigació o actuació mèdica o policial ha de respectar la integritat física i moral i excloure la tortura i els tractes degradants.'),
    limits: text('El contingut del dret s’ha d’interpretar amb el text complet de l’article i amb les garanties dels articles 9, 10 i 41.'),
    conceptes_clau: ['Dret a la vida', 'Integritat física', 'Integritat moral', 'Prohibició de la tortura'],
    preguntes_aprenentatge: ['Quins béns protegeix l’article?', 'Quina diferència hi ha entre tracte inhumà i tracte degradant?', 'Quines garanties processals poden activar-se?'],
    pistes_aprenentatge: ['No miris només la vida: l’article també protegeix la integritat.', 'La prohibició de la tortura és una garantia davant el poder públic.', 'Relaciona’l amb els articles 4, 9 i 41.'],
    articles_relacionats: ['Article 4', 'Article 9', 'Article 41'],
  },
  CONST_009: {
    resum: text('Tothom té dret a la llibertat i a la seguretat. La privació de llibertat només és possible per causes i procediments establerts, amb un límit general de 48 hores per a la detenció governativa.'),
    finalitat: text('Evita detencions arbitràries i garanteix que una persona privada de llibertat sigui sotmesa ràpidament al control judicial.'),
    destinataris: text('Protegeix totes les persones i obliga la policia, el Govern, els tribunals i les autoritats responsables de la detenció.'),
    aplicacio: text('En una detenció cal identificar la causa legal, respectar els terminis, informar la persona i posar-la a disposició judicial quan correspongui.'),
    limits: text('La llibertat pot ser limitada en els casos i procediments previstos per la Constitució i les lleis; el límit de 48 hores no autoritza una detenció sense causa.'),
    conceptes_clau: ['Llibertat personal', 'Seguretat', 'Detenció', 'Control judicial'],
    preguntes_aprenentatge: ['Quines condicions fan lícita una privació de llibertat?', 'Quin paper té el termini de 48 hores?', 'Quina via permet revisar la legalitat de la detenció?'],
    pistes_aprenentatge: ['Separa causa legal, procediment i durada.', 'El control judicial és el centre de la garantia.', 'Relaciona’l amb l’article 10 i el procediment d’empara de l’article 102.'],
    articles_relacionats: ['Article 8', 'Article 10', 'Article 41', 'Article 102'],
  },
  CONST_011: {
    resum: text('Es garanteixen la llibertat ideològica, religiosa i de culte, així com el dret a no declarar sobre les pròpies conviccions. La manifestació d’aquestes creences només pot limitar-se per protegir interessos constitucionals i d’acord amb la llei.'),
    finalitat: text('Protegeix l’autonomia de consciència i impedeix que l’Estat imposi o investigui les conviccions personals.'),
    destinataris: text('Protegeix totes les persones i vincula les autoritats públiques i qualsevol institució que exerceixi funcions públiques.'),
    aplicacio: text('Inclou el dret a tenir, canviar o no manifestar una convicció i a practicar una religió dins del respecte a la llei i als drets dels altres.'),
    limits: text('Les manifestacions externes poden estar subjectes a limitacions legals necessàries per protegir la seguretat, l’ordre, la salut, la moral públiques o els drets d’altres persones.'),
    conceptes_clau: ['Llibertat ideològica', 'Llibertat religiosa', 'Llibertat de culte', 'No declaració'],
    preguntes_aprenentatge: ['Què protegeix la llibertat de consciència?', 'Quina diferència hi ha entre tenir una creença i manifestar-la?', 'Quins límits pot establir la llei?'],
    pistes_aprenentatge: ['El dret protegeix també el silenci sobre les pròpies conviccions.', 'La limitació afecta la manifestació, no la simple possessió de la creença.', 'Relaciona’l amb igualtat i no-discriminació.'],
    articles_relacionats: ['Article 6', 'Article 14', 'Article 16'],
  },
  CONST_012: {
    resum: text('Reconeix les llibertats d’expressió, comunicació i informació, i prohibeix la censura prèvia dels poders públics.'),
    finalitat: text('Protegeix el debat públic, la circulació d’informació i la possibilitat de comunicar idees sense control previ de l’Estat.'),
    destinataris: text('Protegeix totes les persones, periodistes, mitjans de comunicació i entitats que difonen informació o opinions.'),
    aplicacio: text('La llibertat inclou expressar opinions, informar i comunicar-se; la rèplica, la rectificació i el secret professional es concreten legalment.'),
    limits: text('No és una llibertat absoluta: cal respectar l’honor, la intimitat, la pròpia imatge, la seguretat i els drets d’altres persones.'),
    conceptes_clau: ['Llibertat d’expressió', 'Informació', 'Censura prèvia', 'Rectificació'],
    preguntes_aprenentatge: ['Quines activitats protegeix l’article?', 'Què és la censura prèvia?', 'Amb quins drets pot entrar en tensió la llibertat d’expressió?'],
    pistes_aprenentatge: ['Distingueix expressar, comunicar i informar.', 'La prohibició principal és el control previ dels poders públics.', 'Relaciona’l amb els articles 12, 14 i 16.'],
    articles_relacionats: ['Article 6', 'Article 14', 'Article 16'],
  },
  CONST_013: {
    resum: text('La llei regula la condició civil de les persones i les formes de matrimoni. La Constitució protegeix la família, els fills i la igualtat jurídica dels cònjuges.'),
    finalitat: text('Estableix el marc constitucional de la família i reserva a la llei la concreció de l’estat civil i del matrimoni.'),
    destinataris: text('Afecta les persones i famílies, el legislador, els registres i les autoritats que apliquen la normativa civil.'),
    aplicacio: text('Les decisions sobre matrimoni, filiació i família han de respectar la igualtat, la dignitat i la protecció dels fills.'),
    limits: text('L’article no resol per si sol tots els efectes civils: aquests depenen de la legislació civil i del règim de garanties aplicable.'),
    conceptes_clau: ['Família', 'Matrimoni', 'Estat civil', 'Igualtat dels cònjuges'],
    preguntes_aprenentatge: ['Quines qüestions reserva a la llei?', 'Quina protecció constitucional tenen els fills?', 'Com es relaciona amb la igualtat?'],
    pistes_aprenentatge: ['Separa el marc constitucional de la regulació civil concreta.', 'L’article combina família, matrimoni i igualtat.', 'Relaciona’l amb els articles 4 i 6.'],
    articles_relacionats: ['Article 4', 'Article 6', 'Article 20'],
  },
  CONST_014: {
    resum: text('Es protegeixen la intimitat, l’honor i la pròpia imatge, i es garanteix que les lleis protegeixin les persones davant intromissions il·legítimes.'),
    finalitat: text('Preserva l’espai personal, la reputació i la capacitat de cada persona de controlar l’ús de la seva imatge i informació personal.'),
    destinataris: text('Protegeix totes les persones davant actuacions dels poders públics, mitjans, empreses i particulars.'),
    aplicacio: text('Pot activar-se davant publicacions, enregistraments, difusió d’informació o tractaments de dades que afectin injustificadament la vida privada o la reputació.'),
    limits: text('La protecció s’ha de ponderar amb la llibertat d’expressió i d’informació, especialment quan hi ha interès públic.'),
    conceptes_clau: ['Intimitat', 'Honor', 'Pròpia imatge', 'Intromissió il·legítima'],
    preguntes_aprenentatge: ['Quins tres béns protegeix?', 'Quan una intromissió pot ser legítima?', 'Com es pondera amb la informació?'],
    pistes_aprenentatge: ['No confonguis intimitat amb secret absolut.', 'La clau és valorar la legitimitat de la intromissió.', 'Relaciona’l amb l’article 12.'],
    articles_relacionats: ['Article 8', 'Article 12', 'Article 15'],
  },
  CONST_015: {
    resum: text('El domicili és inviolable. No s’hi pot entrar sense consentiment del titular o manament judicial, amb les excepcions constitucionals previstes.'),
    finalitat: text('Protegeix l’espai de vida privada davant entrades, escorcolls o actuacions invasives dels poders públics.'),
    destinataris: text('Protegeix tota persona que ocupa un domicili i obliga especialment les autoritats policials i judicials.'),
    aplicacio: text('Abans d’entrar en un domicili cal identificar el consentiment, l’autorització judicial o l’excepció que permet l’actuació.'),
    limits: text('El dret admet excepcions constitucionalment justificades, però aquestes no eliminen la necessitat de respectar la legalitat i la proporcionalitat.'),
    conceptes_clau: ['Domicili', 'Inviolabilitat', 'Consentiment', 'Manament judicial'],
    preguntes_aprenentatge: ['Quines són les vies legítimes d’entrada?', 'Per què és important el manament judicial?', 'Quina diferència hi ha entre domicili i propietat?'],
    pistes_aprenentatge: ['El dret protegeix l’espai privat, no només la propietat.', 'La pregunta central és qui autoritza l’entrada i amb quina causa.', 'Relaciona’l amb la intimitat de l’article 14.'],
    articles_relacionats: ['Article 9', 'Article 14', 'Article 16'],
  },
  CONST_016: {
    resum: text('Es reconeixen els drets de reunió i manifestació pacífiques amb finalitats lícites. La manifestació està sotmesa al règim de comunicació prèvia previst legalment.'),
    finalitat: text('Permet la participació col·lectiva en l’espai públic i la manifestació de reivindicacions sense autorització política prèvia.'),
    destinataris: text('Protegeix persones, col·lectius i organitzacions que es reuneixen o es manifesten pacíficament.'),
    aplicacio: text('Una convocatòria ha de ser pacífica i lícita, i ha de complir les comunicacions i condicions de seguretat establertes per la llei.'),
    limits: text('La violència, les finalitats il·lícites i els riscos greus per als drets d’altres persones poden justificar mesures proporcionades.'),
    conceptes_clau: ['Reunió', 'Manifestació', 'Pau', 'Comunicació prèvia'],
    preguntes_aprenentatge: ['Quina diferència hi ha entre autorització i comunicació?', 'Quines condicions ha de complir una manifestació?', 'Quan pot intervenir l’autoritat?'],
    pistes_aprenentatge: ['La regla és la llibertat; la comunicació no equival a una autorització.', 'La finalitat ha de ser lícita i l’exercici pacífic.', 'Relaciona’l amb expressió i associació.'],
    articles_relacionats: ['Article 12', 'Article 17', 'Article 23'],
  },
  CONST_017: {
    resum: text('Es reconeix el dret d’associació per assolir finalitats lícites i es reserva a la llei el registre, la dissolució i les garanties de les associacions.'),
    finalitat: text('Protegeix la capacitat de les persones d’organitzar-se col·lectivament sense ingerències indegudes.'),
    destinataris: text('Protegeix persones i entitats associatives i vincula les administracions encarregades del registre i control.'),
    aplicacio: text('Les associacions poden constituir-se per finalitats lícites i han de respectar les regles legals de publicitat i funcionament.'),
    limits: text('No protegeix associacions amb finalitats il·lícites i la dissolució o suspensió ha d’estar sotmesa a garanties legals i judicials.'),
    conceptes_clau: ['Associació', 'Finalitat lícita', 'Registre', 'Dissolució judicial'],
    preguntes_aprenentatge: ['Quina finalitat ha de tenir una associació?', 'Per a què serveix el registre?', 'Qui pot dissoldre una associació?'],
    pistes_aprenentatge: ['La inscripció dona publicitat, però no converteix el dret en una concessió administrativa.', 'La il·licitud de la finalitat és el límit principal.', 'Relaciona’l amb els articles 16 i 18.'],
    articles_relacionats: ['Article 16', 'Article 18', 'Article 19'],
  },
  CONST_018: {
    resum: text('Es reconeix la llibertat de crear i fer funcionar organitzacions empresarials, professionals i sindicals, amb autonomia respecte de les seves finalitats i organització.'),
    finalitat: text('Garanteix el pluralisme d’interessos professionals, econòmics i laborals dins del sistema constitucional.'),
    destinataris: text('Protegeix treballadors, empresaris, professionals i les organitzacions que representen els seus interessos.'),
    aplicacio: text('Permet crear entitats representatives i participar-hi sense que els poders públics en controlin arbitràriament el funcionament.'),
    limits: text('Les organitzacions han de respectar la llei, els drets dels altres i les regles pròpies de la seva activitat.'),
    conceptes_clau: ['Llibertat sindical', 'Organització professional', 'Autonomia', 'Representació'],
    preguntes_aprenentatge: ['Quines organitzacions protegeix?', 'Per què és important l’autonomia?', 'Com es relaciona amb la defensa d’interessos de l’article 19?'],
    pistes_aprenentatge: ['L’article protegeix tant la creació com el funcionament.', 'La llibertat té una dimensió col·lectiva.', 'Relaciona’l amb associació i treball.'],
    articles_relacionats: ['Article 17', 'Article 19', 'Article 29'],
  },
  CONST_019: {
    resum: text('Treballadors i empresaris tenen dret a defensar els seus interessos econòmics i socials, d’acord amb les condicions que estableixi la llei.'),
    finalitat: text('Dona cobertura constitucional a la representació i defensa col·lectiva en les relacions de treball.'),
    destinataris: text('S’adreça a treballadors, empresaris, organitzacions professionals i poders públics que regulen les relacions laborals.'),
    aplicacio: text('La defensa d’interessos pot articular-se mitjançant organitzacions, negociació i altres instruments regulats legalment.'),
    limits: text('El contingut concret depèn del desplegament legal i s’ha de conciliar amb els drets de tercers i la continuïtat dels serveis essencials.'),
    conceptes_clau: ['Interessos econòmics', 'Interessos socials', 'Relacions laborals', 'Representació col·lectiva'],
    preguntes_aprenentatge: ['Quins interessos protegeix?', 'Quins subjectes hi intervenen?', 'Quin paper té la llei?'],
    pistes_aprenentatge: ['No és només un dret individual del treballador.', 'La clau és la defensa col·lectiva.', 'Relaciona’l amb els articles 18, 28 i 29.'],
    articles_relacionats: ['Article 18', 'Article 28', 'Article 29'],
  },
  CONST_020: {
    resum: text('Tota persona té dret a l’educació, orientada al desenvolupament de la personalitat i la dignitat, i es reconeix la llibertat d’ensenyament i la dels pares d’escollir formació religiosa o moral.'),
    finalitat: text('Garanteix l’educació com a dret personal i com a instrument de desenvolupament, convivència i respecte dels drets humans.'),
    destinataris: text('Protegeix infants, joves, famílies, centres educatius i professionals de l’ensenyament, i obliga els poders públics.'),
    aplicacio: text('Inclou l’accés al sistema educatiu, el pluralisme d’ensenyament i el respecte a les opcions educatives dins del marc legal.'),
    limits: text('La llibertat d’ensenyament no permet vulnerar la dignitat, els drets dels infants ni les exigències legals del sistema educatiu.'),
    conceptes_clau: ['Educació', 'Llibertat d’ensenyament', 'Dignitat', 'Pluralisme educatiu'],
    preguntes_aprenentatge: ['Quina finalitat ha de tenir l’educació?', 'Quines llibertats protegeix?', 'Com es concilia amb l’interès de l’infant?'],
    pistes_aprenentatge: ['L’article combina dret, finalitat i llibertat.', 'La dignitat és el criteri orientador.', 'Relaciona’l amb igualtat i família.'],
    articles_relacionats: ['Article 4', 'Article 6', 'Article 13'],
  },
  CONST_021: {
    resum: text('Tothom pot circular pel territori andorrà i entrar i sortir del país d’acord amb les lleis. L’article també estableix el marc constitucional de la llibertat de residència.'),
    finalitat: text('Protegeix la mobilitat personal i impedeix restriccions arbitràries a l’entrada, sortida o circulació.'),
    destinataris: text('Protegeix nacionals i estrangers, amb les diferències que la Constitució i la llei estableixin.'),
    aplicacio: text('Les limitacions de circulació o residència han de tenir base legal, una finalitat legítima i garanties de control.'),
    limits: text('La situació dels estrangers i les condicions d’entrada o residència poden ser regulades per llei; això no permet actuacions arbitràries.'),
    conceptes_clau: ['Llibertat de circulació', 'Residència', 'Entrada i sortida', 'Estrangers'],
    preguntes_aprenentatge: ['A qui protegeix la llibertat de circulació?', 'Quines diferències poden existir per als estrangers?', 'Quina base ha de tenir una restricció?'],
    pistes_aprenentatge: ['Distingeix circular, entrar o sortir i residir.', 'La llei concreta el règim, però la Constitució fixa la garantia.', 'Relaciona’l amb l’expulsió de l’article 22.'],
    articles_relacionats: ['Article 7', 'Article 22', 'Article 40'],
  },
  CONST_022: {
    resum: text('La no-renovació de la residència o l’expulsió d’una persona legalment resident només es poden acordar per causes i segons procediments previstos legalment.'),
    finalitat: text('Protegeix les persones residents davant decisions arbitràries que afectin la seva permanència al país.'),
    destinataris: text('S’adreça especialment a persones estrangeres amb residència legal i a les autoritats administratives i judicials.'),
    aplicacio: text('Una decisió d’expulsió o no-renovació ha d’identificar la causa legal, respectar el procediment i permetre les garanties de defensa i control.'),
    limits: text('La residència legal no impedeix qualsevol decisió de sortida, però aquesta ha d’estar prevista per la llei i ser revisable.'),
    conceptes_clau: ['Residència legal', 'Expulsió', 'No-renovació', 'Garanties de defensa'],
    preguntes_aprenentatge: ['Quina situació protegeix l’article?', 'Quina diferència hi ha entre expulsió i no-renovació?', 'Quines garanties ha de tenir la decisió?'],
    pistes_aprenentatge: ['El punt de partida és que la persona resideix legalment.', 'La reserva de llei és una garantia contra l’arbitrarietat.', 'Relaciona’l amb els articles 6, 10 i 21.'],
    articles_relacionats: ['Article 6', 'Article 10', 'Article 21'],
  },
  CONST_023: {
    resum: text('Qualsevol persona amb un interès directe pot dirigir peticions als poders públics en la forma i amb els efectes previstos per la llei.'),
    finalitat: text('Ofereix una via de participació i comunicació amb les institucions sense convertir tota petició en una obligació d’acceptar-la.'),
    destinataris: text('Protegeix les persones amb interès directe i obliga els poders públics a tramitar les peticions segons la llei.'),
    aplicacio: text('Permet formular una petició davant l’òrgan competent i obtenir la resposta o tramitació que estableixi el règim legal.'),
    limits: text('La petició requereix interès directe i està sotmesa a forma, competència i efectes definits legalment.'),
    conceptes_clau: ['Dret de petició', 'Interès directe', 'Poders públics', 'Participació'],
    preguntes_aprenentatge: ['Què significa tenir interès directe?', 'Què garanteix exactament el dret: una resposta o una decisió favorable?', 'Quina llei en pot regular la forma?'],
    pistes_aprenentatge: ['No confonguis petició amb recurs administratiu.', 'La Constitució reconeix la via i la llei en fixa els efectes.', 'Relaciona’l amb participació i administració.'],
    articles_relacionats: ['Article 1', 'Article 6', 'Article 50'],
  },
  CONST_024: {
    resum: text('Els andorrans majors d’edat i en ple ús dels seus drets tenen dret de sufragi.'),
    finalitat: text('Garanteix la participació política directa de la ciutadania nacional en les eleccions.'),
    destinataris: text('S’adreça als ciutadans andorrans que compleixen les condicions constitucionals i legals per votar.'),
    aplicacio: text('La persona que compleix els requisits pot participar en els processos electorals segons les regles del cens i de la legislació electoral.'),
    limits: text('L’article reserva el sufragi als andorrans majors d’edat en ple ús dels seus drets; el procediment electoral es desenvolupa legalment.'),
    conceptes_clau: ['Sufragi', 'Participació política', 'Majoria d’edat', 'Cens electoral'],
    preguntes_aprenentatge: ['Qui té dret de sufragi segons l’article?', 'Quina diferència hi ha entre sufragi actiu i passiu?', 'Quin paper té la legislació electoral?'],
    pistes_aprenentatge: ['L’article parla principalment del dret a votar.', 'La nacionalitat i l’edat són requisits constitucionals expressos.', 'Relaciona’l amb els articles 25, 26 i 50.'],
    articles_relacionats: ['Article 25', 'Article 26', 'Article 50'],
  },
  CONST_025: {
    resum: text('Els andorrans poden accedir en condicions d’igualtat a les funcions i càrrecs públics, d’acord amb els requisits legals.'),
    finalitat: text('Assegura que l’accés a la funció pública no depengui de privilegis arbitraris, sinó de requisits objectius i iguals.'),
    destinataris: text('Protegeix els ciutadans andorrans que volen accedir a funcions o càrrecs públics i obliga les institucions convocants.'),
    aplicacio: text('Les convocatòries i processos de selecció han d’aplicar requisits coneguts, iguals i justificats.'),
    limits: text('La igualtat no elimina els requisits legals de capacitat, mèrit, incompatibilitat o elegibilitat.'),
    conceptes_clau: ['Accés a càrrecs públics', 'Igualtat', 'Mèrit', 'Requisits legals'],
    preguntes_aprenentatge: ['Quina igualtat protegeix?', 'Per què pot haver-hi requisits diferents?', 'Com es detectaria una discriminació en una convocatòria?'],
    pistes_aprenentatge: ['La clau és l’accés en condicions d’igualtat.', 'Els requisits han de ser legals i no arbitraris.', 'Relaciona’l amb els articles 6 i 24.'],
    articles_relacionats: ['Article 6', 'Article 24', 'Article 50'],
  },
  CONST_026: {
    resum: text('Els andorrans tenen dret a crear lliurement partits polítics, que han de funcionar democràticament i respectar la Constitució i la llei.'),
    finalitat: text('Protegeix el pluralisme polític i permet que diferents projectes polítics competeixin i participin en la vida pública.'),
    destinataris: text('Protegeix ciutadans i organitzacions polítiques i vincula les autoritats que registren, regulen o controlen els partits.'),
    aplicacio: text('Un partit pot constituir-se i actuar dins del marc legal, amb organització democràtica i transparència en el seu funcionament.'),
    limits: text('La llibertat de creació no protegeix organitzacions que actuïn contra la Constitució, la llei o els principis democràtics.'),
    conceptes_clau: ['Partit polític', 'Pluralisme', 'Democràcia interna', 'Participació política'],
    preguntes_aprenentatge: ['Per què els partits són importants en una democràcia?', 'Quines exigències imposa l’article?', 'Quina diferència hi ha entre pluralisme i absència de límits?'],
    pistes_aprenentatge: ['La llibertat té una dimensió col·lectiva.', 'L’organització interna també ha de ser democràtica.', 'Relaciona’l amb els articles 24, 25 i 50.'],
    articles_relacionats: ['Article 16', 'Article 24', 'Article 25'],
  },
  CONST_027: {
    resum: text('Es reconeixen la propietat privada i l’herència, però la propietat compleix una funció social i pot ser limitada o expropiada en els casos previstos.'),
    finalitat: text('Equilibra la protecció del patrimoni privat amb l’interès general i la funció social de la propietat.'),
    destinataris: text('Protegeix propietaris i hereus i vincula el legislador, l’administració i els tribunals.'),
    aplicacio: text('Les limitacions, expropiacions o regulacions de la propietat han de tenir base legal, finalitat legítima i garanties, inclosa la indemnització quan correspongui.'),
    limits: text('La propietat no és absoluta: la funció social i l’interès general poden justificar regulacions, però no una privació arbitrària.'),
    conceptes_clau: ['Propietat privada', 'Herència', 'Funció social', 'Expropiació'],
    preguntes_aprenentatge: ['Què significa funció social?', 'Quan pot existir una expropiació?', 'Quines garanties ha de tenir el propietari?'],
    pistes_aprenentatge: ['Distingeix limitar l’ús de privar de la propietat.', 'La causa d’interès general i la llei són essencials.', 'Relaciona’l amb habitatge, urbanisme i fiscalitat.'],
    articles_relacionats: ['Article 6', 'Article 31', 'Article 33', 'Article 37'],
  },
  CONST_028: {
    resum: text('Es reconeix la llibertat d’empresa dins del marc de l’economia de mercat i d’acord amb les lleis.'),
    finalitat: text('Protegeix la iniciativa econòmica privada i alhora permet que l’Estat reguli l’activitat empresarial.'),
    destinataris: text('Protegeix empreses, persones emprenedores i operadors econòmics, i vincula el legislador i l’administració.'),
    aplicacio: text('L’activitat empresarial pot exercir-se dins del règim d’autoritzacions, competència, fiscalitat, consum i protecció laboral aplicable.'),
    limits: text('La llibertat d’empresa està expressament sotmesa a la llei i no permet vulnerar drets laborals, ambientals, de consum o de competència.'),
    conceptes_clau: ['Llibertat d’empresa', 'Economia de mercat', 'Regulació', 'Interès general'],
    preguntes_aprenentatge: ['Què protegeix la llibertat d’empresa?', 'Per què l’article remet a les lleis?', 'Quins interessos poden justificar regulació?'],
    pistes_aprenentatge: ['No és una llibertat fora de l’ordenament.', 'La Constitució combina mercat i regulació.', 'Relaciona’l amb els articles 29, 32 i 35.'],
    articles_relacionats: ['Article 27', 'Article 29', 'Article 32', 'Article 35'],
  },
  CONST_029: {
    resum: text('Tota persona té dret al treball, a la promoció laboral i a una remuneració suficient; la llei regula les condicions laborals i la jornada.'),
    finalitat: text('Estableix una protecció constitucional del treball i orienta el legislador cap a unes condicions laborals dignes.'),
    destinataris: text('Protegeix les persones treballadores i obliga els poders públics i els ocupadors en els termes que concreti la llei.'),
    aplicacio: text('La seva concreció es troba en les normes laborals sobre contractació, salari, jornada, descans, igualtat i protecció social.'),
    limits: text('Com a dret del capítol V, el seu exercici concret depèn del desplegament legal i no s’ha de confondre amb un dret a obtenir qualsevol lloc de treball.'),
    conceptes_clau: ['Dret al treball', 'Promoció laboral', 'Remuneració', 'Condicions de treball'],
    preguntes_aprenentatge: ['Quins aspectes del treball protegeix?', 'És un dret directament exigible en qualsevol situació?', 'Quina llei el concreta?'],
    pistes_aprenentatge: ['Distingeix dret al treball de dret a una ocupació concreta.', 'L’article orienta la legislació laboral.', 'Relaciona’l amb els articles 18, 19 i 39.3.'],
    articles_relacionats: ['Article 18', 'Article 19', 'Article 30', 'Article 39'],
  },
  CONST_030: {
    resum: text('Es reconeix el dret a la protecció de la salut i a rebre prestacions per atendre altres necessitats personals, dins del sistema que estableixi l’Estat.'),
    finalitat: text('Orienta l’organització dels serveis sanitaris i socials i reconeix la responsabilitat pública en la protecció de la salut.'),
    destinataris: text('Protegeix totes les persones i obliga els poders públics a crear i mantenir polítiques i serveis adequats.'),
    aplicacio: text('Es concreta mitjançant el sistema sanitari, les prestacions socials, la prevenció i les normes sobre accés i cobertura.'),
    limits: text('L’article és un principi rector: l’abast concret de les prestacions depèn de la legislació i dels recursos i sistemes establerts legalment.'),
    conceptes_clau: ['Salut', 'Prestacions socials', 'Prevenció', 'Principi rector'],
    preguntes_aprenentatge: ['Quins dos àmbits protegeix?', 'Qui ha de desplegar aquest article?', 'Per què no funciona igual que un dret fonamental del capítol III?'],
    pistes_aprenentatge: ['Separa protecció de la salut i prestacions per altres necessitats.', 'L’Estat ha d’organitzar polítiques i serveis.', 'Relaciona’l amb l’article 39.3.'],
    articles_relacionats: ['Article 29', 'Article 31', 'Article 39'],
  },
  CONST_031: {
    resum: text('L’Estat ha de vetllar per l’ús racional del sòl i dels recursos naturals i garantir una qualitat de vida adequada per a les generacions presents i futures.'),
    finalitat: text('Incorpora la protecció ambiental i la sostenibilitat com a criteris constitucionals de les polítiques públiques.'),
    destinataris: text('S’adreça al legislador, al Govern, als Comuns i a totes les administracions que gestionen territori i recursos.'),
    aplicacio: text('Ha d’orientar l’urbanisme, la gestió de l’aigua i del territori, les infraestructures, l’energia i les decisions que afecten el medi.'),
    limits: text('És un principi rector i no un dret fonamental directament exigible per si sol; l’article 39.3 remet al desplegament legal.'),
    conceptes_clau: ['Medi ambient', 'Sòl', 'Recursos naturals', 'Generacions futures'],
    preguntes_aprenentatge: ['És un dret fonamental o un principi rector?', 'Quines polítiques públiques pot orientar?', 'Com es protegeixen les generacions futures?'],
    pistes_aprenentatge: ['La força normativa ve determinada pel capítol V.', 'Busca decisions públiques que afectin el territori.', 'Relaciona’l amb els articles 27, 30, 32 i 39.3.'],
    articles_relacionats: ['Article 27', 'Article 30', 'Article 32', 'Article 39'],
  },
  CONST_032: {
    resum: text('L’Estat pot intervenir en l’economia, el comerç, el treball i les finances per fer possible el desenvolupament equilibrat i el benestar general dins de l’economia de mercat.'),
    finalitat: text('Permet combinar iniciativa privada i intervenció pública quan l’interès general ho exigeix.'),
    destinataris: text('S’adreça principalment al legislador i al Govern, que dissenyen les polítiques econòmiques i reguladores.'),
    aplicacio: text('Pot justificar regulacions de mercat, polítiques econòmiques, planificació i mesures per corregir desequilibris, sempre amb base legal.'),
    limits: text('La intervenció ha de respectar la llibertat d’empresa, la propietat, la igualtat, la proporcionalitat i la resta de la Constitució.'),
    conceptes_clau: ['Intervenció econòmica', 'Economia de mercat', 'Interès general', 'Planificació'],
    preguntes_aprenentatge: ['Quins sectors pot ordenar l’Estat?', 'Com es concilia mercat i intervenció?', 'Quin límit constitucional té una regulació econòmica?'],
    pistes_aprenentatge: ['No elimina l’economia de mercat.', 'La intervenció té una finalitat de desenvolupament equilibrat.', 'Relaciona’l amb els articles 28, 29, 31 i 35.'],
    articles_relacionats: ['Article 28', 'Article 29', 'Article 31', 'Article 35'],
  },
  CONST_033: {
    resum: text('Els poders públics han de promoure les condicions necessàries perquè tothom pugui gaudir d’un habitatge digne.'),
    finalitat: text('Orienta les polítiques públiques d’habitatge i reconeix que les condicions materials d’accés a l’habitatge tenen rellevància constitucional.'),
    destinataris: text('S’adreça al Govern, als Comuns i al legislador, i té com a beneficiàries les persones que necessiten accedir a un habitatge adequat.'),
    aplicacio: text('Pot informar polítiques de lloguer, habitatge social, urbanisme, ajuts i planificació territorial.'),
    limits: text('És un principi rector: no garanteix per si sol l’adjudicació immediata d’un habitatge concret ni funciona com un dret fonamental directament emparable.'),
    conceptes_clau: ['Habitatge digne', 'Política d’habitatge', 'Principi rector', 'Condicions materials'],
    preguntes_aprenentatge: ['Què han de promoure els poders públics?', 'Quina diferència hi ha entre promoure i garantir un habitatge concret?', 'Quines polítiques el poden desenvolupar?'],
    pistes_aprenentatge: ['La Constitució fixa un objectiu d’acció pública.', 'La llei i les polítiques concreten els instruments.', 'Relaciona’l amb els articles 27, 31 i 39.3.'],
    articles_relacionats: ['Article 27', 'Article 31', 'Article 39'],
  },
  CONST_034: {
    resum: text('L’Estat ha de conservar, promocionar i difondre el patrimoni històric, cultural i artístic d’Andorra.'),
    finalitat: text('Protegeix el patrimoni com a element col·lectiu de memòria, identitat i cultura.'),
    destinataris: text('S’adreça a l’Estat i a les administracions culturals, territorials i patrimonials.'),
    aplicacio: text('Pot justificar inventaris, protecció d’edificis i béns, polítiques de restauració, difusió cultural i regulació d’intervencions.'),
    limits: text('La protecció concreta depèn de la legislació patrimonial i s’ha de conciliar amb la propietat i altres interessos legítims.'),
    conceptes_clau: ['Patrimoni històric', 'Patrimoni cultural', 'Patrimoni artístic', 'Conservació'],
    preguntes_aprenentatge: ['Quines dimensions del patrimoni protegeix?', 'Qui té responsabilitat de conservar-lo?', 'Com es concilia amb la propietat privada?'],
    pistes_aprenentatge: ['No és només conservació: també promoció i difusió.', 'El patrimoni té una dimensió col·lectiva.', 'Relaciona’l amb els articles 27 i 31.'],
    articles_relacionats: ['Article 27', 'Article 31', 'Article 39'],
  },
  CONST_035: {
    resum: text('La llei ha de garantir i els poders públics han de defensar els drets dels consumidors i usuaris.'),
    finalitat: text('Reconeix la necessitat de protegir la part més vulnerable en les relacions de consum i de serveis.'),
    destinataris: text('Protegeix consumidors i usuaris i obliga el legislador i les administracions de control i supervisió.'),
    aplicacio: text('Es concreta en informació, seguretat, garanties, reclamacions, contractació i control de pràctiques abusives.'),
    limits: text('La protecció concreta depèn de la llei i no eximeix el consumidor d’utilitzar els procediments i terminis aplicables.'),
    conceptes_clau: ['Consumidor', 'Usuari', 'Informació', 'Garanties'],
    preguntes_aprenentatge: ['Qui protegeix l’article?', 'Quines obligacions pot imposar la llei a les empreses?', 'Quina via té un consumidor davant un conflicte?'],
    pistes_aprenentatge: ['És un mandat constitucional de protecció.', 'La llei converteix el principi en drets i procediments concrets.', 'Relaciona’l amb l’article 32.'],
    articles_relacionats: ['Article 6', 'Article 28', 'Article 32'],
  },
  CONST_036: {
    resum: text('L’Estat pot crear mitjans de comunicació social, però la seva organització i control han de respectar la participació i el pluralisme.'),
    finalitat: text('Permet l’existència de mitjans públics sense convertir-los en instruments de control ideològic.'),
    destinataris: text('S’adreça al legislador, als mitjans públics i a les persones usuàries i professionals de la comunicació.'),
    aplicacio: text('La regulació dels mitjans ha de garantir pluralitat, participació, independència i respecte a la llibertat d’informació.'),
    limits: text('La creació de mitjans públics no legitima censura ni monopolització del debat públic.'),
    conceptes_clau: ['Mitjans públics', 'Pluralisme', 'Participació', 'Informació'],
    preguntes_aprenentatge: ['Per què l’article parla de pluralisme?', 'Quin risc constitucional s’ha d’evitar?', 'Com es relaciona amb la llibertat d’informació?'],
    pistes_aprenentatge: ['El mitjà públic ha de servir la pluralitat.', 'La llei en regula l’organització.', 'Relaciona’l amb l’article 12.'],
    articles_relacionats: ['Article 12', 'Article 16', 'Article 40'],
  },
  CONST_037: {
    resum: text('Les persones físiques i jurídiques han de contribuir a les despeses públiques segons la seva capacitat econòmica, mitjançant un sistema fiscal just.'),
    finalitat: text('Dona fonament constitucional al deure de contribuir i exigeix que la fiscalitat respongui a capacitat econòmica i justícia.'),
    destinataris: text('S’adreça a contribuents, empreses, legislador i administració tributària.'),
    aplicacio: text('La legislació fiscal concreta els tributs, les obligacions, les exempcions, els procediments i les garanties del contribuent.'),
    limits: text('La fiscalitat ha de respectar la reserva de llei, la igualtat, la capacitat econòmica i la prohibició d’arbitrarietat.'),
    conceptes_clau: ['Deure fiscal', 'Capacitat econòmica', 'Sistema fiscal', 'Justícia tributària'],
    preguntes_aprenentatge: ['Per què existeix el deure de contribuir?', 'Què significa capacitat econòmica?', 'Quines garanties té el contribuent?'],
    pistes_aprenentatge: ['No és només una obligació: també fixa criteris de justícia.', 'La llei concreta l’impost i el procediment.', 'Relaciona’l amb els articles 3, 6 i 40.'],
    articles_relacionats: ['Article 3', 'Article 6', 'Article 40'],
  },
  CONST_038: {
    resum: text('L’Estat pot crear per llei formes de servei cívic per complir finalitats d’interès general.'),
    finalitat: text('Permet establir mecanismes de participació o contribució cívica quan siguin necessaris per a finalitats col·lectives.'),
    destinataris: text('S’adreça al legislador i a les persones que eventualment quedin incloses en un servei cívic regulat legalment.'),
    aplicacio: text('Qualsevol servei cívic hauria d’estar definit per llei, amb finalitat d’interès general, condicions clares i garanties.'),
    limits: text('La Constitució no crea directament una obligació concreta: exigeix una llei i respecte pels drets, la igualtat i la proporcionalitat.'),
    conceptes_clau: ['Servei cívic', 'Interès general', 'Reserva de llei', 'Proporcionalitat'],
    preguntes_aprenentatge: ['Qui pot crear el servei cívic?', 'Quina finalitat ha de tenir?', 'Quines garanties haurien d’existir?'],
    pistes_aprenentatge: ['La reserva de llei és central.', 'No qualsevol activitat pública és un servei cívic constitucional.', 'Relaciona’l amb els deures i l’article 40.'],
    articles_relacionats: ['Article 3', 'Article 37', 'Article 40'],
  },
  CONST_039: {
    resum: text('Els drets dels capítols III i IV vinculen immediatament els poders públics com a drets directament aplicables. Els principis del capítol V orienten la legislació i l’acció pública en els termes que fixi l’ordenament.'),
    finalitat: text('Determina que no tots els drets constitucionals tenen la mateixa força jurídica ni les mateixes vies de reclamació.'),
    destinataris: text('Vincula legislador, Govern, administracions i tribunals, i orienta les persones sobre la via de protecció disponible.'),
    aplicacio: text('Per saber si un article és directament invocable cal situar-lo dins del capítol constitucional corresponent i llegir-lo amb els articles 40–42.'),
    limits: text('Un principi del capítol V no es pot presentar com un dret fonamental directament emparable; cal acudir al desplegament legal aplicable.'),
    conceptes_clau: ['Aplicació directa', 'Principi rector', 'Força normativa', 'Empara'],
    preguntes_aprenentatge: ['Quina diferència hi ha entre els capítols III–IV i el V?', 'Què vol dir vincular immediatament?', 'Quina importància té per al recurs d’empara?'],
    pistes_aprenentatge: ['La ubicació sistemàtica de l’article és decisiva.', 'No confonguis reconeixement constitucional amb exigibilitat directa.', 'Relaciona’l amb els articles 31, 40 i 41.'],
    articles_relacionats: ['Article 31', 'Article 40', 'Article 41'],
  },
  CONST_040: {
    resum: text('La regulació de l’exercici dels drets del títol II només es pot fer per llei. Els drets directament aplicables han de respectar el seu contingut essencial.'),
    finalitat: text('Protegeix els drets davant restriccions administratives arbitràries i impedeix que la regulació en buidi el nucli.'),
    destinataris: text('Vincula el legislador, el Govern, les administracions i els tribunals quan regulen o apliquen drets.'),
    aplicacio: text('Una limitació d’un dret ha de tenir rang legal suficient, finalitat legítima i respecte pel contingut essencial.'),
    limits: text('La reserva de llei no vol dir que tot dret sigui il·limitat: permet regular-ne l’exercici, però no eliminar-ne l’essència.'),
    conceptes_clau: ['Reserva de llei', 'Contingut essencial', 'Regulació', 'Limitació de drets'],
    preguntes_aprenentatge: ['Què pot fer la llei i què no pot fer?', 'Què és el contingut essencial?', 'Per què una administració no pot limitar lliurement un dret?'],
    pistes_aprenentatge: ['Regulació i supressió no són el mateix.', 'El contingut essencial marca el límit del legislador.', 'Relaciona’l amb l’article 3 i el control constitucional.'],
    articles_relacionats: ['Article 3', 'Article 39', 'Article 41'],
  },
  CONST_041: {
    resum: text('Els drets i llibertats dels capítols III i IV són protegits pels tribunals ordinaris mitjançant un procediment urgent i preferent. En determinats casos també poden arribar al Tribunal Constitucional per empara.'),
    finalitat: text('Ofereix una via ràpida i reforçada per reaccionar davant la vulneració dels drets fonamentals.'),
    destinataris: text('Protegeix les persones titulars dels drets i obliga els tribunals ordinaris i el Tribunal Constitucional a actuar dins les seves competències.'),
    aplicacio: text('La persona afectada ha d’utilitzar primer les vies judicials previstes i pot acudir a l’empara quan es compleixin els requisits constitucionals i processals.'),
    limits: text('L’empara no és una tercera instància ni protegeix automàticament tots els principis del capítol V; exigeix una lesió constitucional i legitimació.'),
    conceptes_clau: ['Tutela judicial', 'Procediment urgent', 'Procediment preferent', 'Recurs d’empara'],
    preguntes_aprenentatge: ['Quina és la primera via de protecció?', 'Quan es pot arribar al Tribunal Constitucional?', 'Per què l’empara no és una apel·lació ordinària?'],
    pistes_aprenentatge: ['La protecció comença davant els tribunals ordinaris.', 'L’empara té requisits propis.', 'Relaciona’l amb els articles 39, 40 i 102.'],
    articles_relacionats: ['Article 39', 'Article 40', 'Article 102'],
  },
  CONST_042: {
    resum: text('Una llei qualificada regula els estats d’alarma i d’emergència. Poden limitar temporalment alguns drets en situacions excepcionals, amb control i garanties constitucionals.'),
    finalitat: text('Permet respondre a catàstrofes o emergències sense deixar l’actuació pública fora del dret.'),
    destinataris: text('Vincula el Govern, el Consell General, les autoritats responsables de l’emergència i totes les persones afectades per les mesures.'),
    aplicacio: text('La declaració, les mesures, la durada i els controls han de seguir la llei qualificada i respectar els drets que no poden ser suspesos.'),
    limits: text('L’excepcionalitat no autoritza mesures il·limitades: cal necessitat, proporcionalitat, temporalitat, control parlamentari i judicial.'),
    conceptes_clau: ['Estat d’alarma', 'Estat d’emergència', 'Excepcionalitat', 'Control constitucional'],
    preguntes_aprenentatge: ['Quina diferència hi ha entre alarma i emergència?', 'Qui pot declarar-les i sota quina llei?', 'Quines garanties impedeixen l’abús?'],
    pistes_aprenentatge: ['L’emergència també està sotmesa a la Constitució.', 'La durada i el control són elements essencials.', 'Relaciona’l amb els articles 39–41 i 95.'],
    articles_relacionats: ['Article 39', 'Article 40', 'Article 41', 'Article 95'],
  },
};

for (const [articleId, draft] of Object.entries(draftsP1)) {
  const target = editorial[articleId];
  if (!target) continue;
  Object.assign(target, draft, {
    estat: articleId === 'CONST_010' ? target.estat : 'en-revisio',
    notes_revisio: 'Borrador editorial del paquet P1; pendent de revisió jurídica, terminològica i de fonts abans de publicar.',
  });
}

function institutionalDraft(
  resum: string,
  finalitat: string,
  destinataris: string,
  aplicacio: string,
  limits: string,
  conceptes: string[],
  preguntes: string[],
  pistes: string[]
): EditorialDraft {
  return {
    resum: text(resum),
    finalitat: text(finalitat),
    destinataris: text(destinataris),
    aplicacio: text(aplicacio),
    limits: text(limits),
    conceptes_clau: conceptes,
    preguntes_aprenentatge: preguntes,
    pistes_aprenentatge: pistes,
  };
}

const draftsP2P3: Record<string, EditorialDraft> = {
  CONST_043: institutionalDraft('Els Coprínceps són conjuntament i indivisiblement el Cap de l’Estat i n’assumeixen la representació més alta.', 'Defineix la titularitat constitucional de la Jefatura de l’Estat i la seva naturalesa conjunta.', 'S’adreça als Coprínceps, als òrgans de l’Estat i a la ciutadania.', 'Les funcions de la Jefatura de l’Estat s’exerceixen mitjançant les competències constitucionals i les regles de contrasignatura.', 'No permet atribuir als Coprínceps competències diferents de les previstes per la Constitució.', ['Cap de l’Estat', 'Coprincipat', 'Representació', 'Conjunció'], ['Què significa que siguin Cap de l’Estat conjuntament?', 'Quina diferència hi ha entre representació i govern?', 'Amb quin article s’han de llegir les seves competències?'], ['La titularitat és conjunta i indivisible.', 'No és el mateix Cap d’Estat que cap del Govern.', 'Relaciona’l amb els articles 44–46.']),
  CONST_044: institutionalDraft('Els Coprínceps simbolitzen i garanteixen la permanència, continuïtat i independència d’Andorra, així com l’equilibri institucional.', 'Explica la dimensió de garantia i continuïtat de la institució dels Coprínceps.', 'S’adreça a totes les institucions constitucionals.', 'La funció es manifesta mitjançant els actes i procediments que la Constitució atribueix als Coprínceps.', 'La funció simbòlica no substitueix les competències concretes ni permet una intervenció fora del marc constitucional.', ['Continuïtat', 'Independència', 'Garantia institucional', 'Equilibri'], ['Què garanteix aquest article?', 'Com es diferencia una garantia institucional d’un poder executiu?', 'Quines competències concretes desenvolupen aquesta funció?'], ['L’article descriu una funció, no una competència il·limitada.', 'Cal anar als articles següents per saber com s’exerceix.', 'Relaciona’l amb l’article 3.']),
  CONST_045: institutionalDraft('Enumera actes dels Coprínceps que requereixen contrasignatura i estableix qui assumeix la responsabilitat política d’aquests actes.', 'Distribueix responsabilitat entre la Jefatura de l’Estat i el Govern o la Sindicatura.', 'S’adreça als Coprínceps, al cap de Govern, al Govern i al síndic general.', 'La contrasignatura connecta l’acte formal del Copríncep amb la responsabilitat de l’òrgan polític que el valida.', 'Sense contrasignatura quan és exigible, l’acte no pot produir els efectes previstos; cal consultar el tipus d’acte.', ['Contrasignatura', 'Responsabilitat política', 'Actes d’Estat', 'Cap de Govern'], ['Què és la contrasignatura?', 'Qui respon políticament de l’acte?', 'Quins actes queden subjectes a aquesta regla?'], ['Busca qui signa i qui assumeix responsabilitat.', 'La responsabilitat política és diferent de la responsabilitat personal.', 'Relaciona’l amb els articles 43, 46 i 75.']),
  CONST_046: institutionalDraft('Determina els actes de lliure decisió dels Coprínceps, entre els quals hi ha la prerrogativa de gràcia i determinades decisions sobre els seus serveis.', 'Delimita les excepcions a la regla general de contrasignatura.', 'S’adreça als Coprínceps i als òrgans que intervenen en els actes constitucionals.', 'Només els actes expressament identificats poden exercir-se com a actes de lliure decisió.', 'La lliure decisió és una categoria constitucional concreta i no una potestat general sobre l’acció de Govern.', ['Lliure decisió', 'Prerrogativa de gràcia', 'Contrasignatura', 'Competència constitucional'], ['Què diferencia un acte de lliure decisió?', 'Per què la llista ha de ser interpretada restrictivament?', 'Quina relació té amb l’article 45?'], ['Compara els articles 45 i 46.', 'La competència s’ha de trobar en el text.', 'No confonguis lliure decisió amb discrecionalitat absoluta.']),
  CONST_047: institutionalDraft('El pressupost general assigna una quantitat igual a cada Copríncep per al funcionament dels seus serveis.', 'Assegura la dotació institucional dels serveis dels Coprínceps dins del pressupost públic.', 'S’adreça al Consell General, al Govern i als serveis dels Coprínceps.', 'La dotació s’incorpora al pressupost general i queda sotmesa a les regles pressupostàries aplicables.', 'La igualtat de la quantitat no elimina el control i la publicitat pressupostària que corresponguin.', ['Pressupost', 'Dotació institucional', 'Serveis dels Coprínceps', 'Igualtat'], ['Quina finalitat té la dotació?', 'Qui aprova el pressupost general?', 'Per què la quantitat és igual?'], ['És una regla de finançament institucional.', 'No és una despesa fora del pressupost.', 'Relaciona’l amb l’article 61.']),
  CONST_048: institutionalDraft('Cada Copríncep nomena un representant personal a Andorra.', 'Garanteix la presència institucional de cadascun dels Coprínceps al Principat.', 'S’adreça als Coprínceps i als seus representants personals.', 'Els representants actuen dins les funcions i instruccions que corresponguin a la representació institucional.', 'El representant no és un òrgan constitucional autònom ni pot substituir les competències del Copríncep.', ['Representant personal', 'Representació institucional', 'Copríncep'], ['Quina funció té un representant personal?', 'Què no pot fer en lloc del Copríncep?', 'Com es diferencia del cap de Govern?'], ['És una figura de representació, no de govern.', 'La competència originària continua en el Copríncep.', 'Relaciona’l amb l’article 43.']),
  CONST_049: institutionalDraft('Preveu la continuïtat institucional i reconeix els mecanismes de substitució d’un Copríncep en cas de vacant.', 'Evita un buit en la Jefatura de l’Estat.', 'S’adreça als Coprínceps, a les institucions de l’Estat i als ordenaments que regulen la substitució.', 'En cas de vacant s’apliquen els mecanismes previstos, sense alterar la continuïtat constitucional.', 'No crea un procediment nou al marge dels ordenaments aplicables ni permet una successió discrecional.', ['Vacança', 'Substitució', 'Continuïtat institucional'], ['Quin problema resol l’article?', 'Qui estableix els mecanismes de substitució?', 'Per què és important la continuïtat?'], ['L’article remet a mecanismes preexistents.', 'Cal distingir vacant temporal i definitiva.', 'Relaciona’l amb l’article 44.']),
  CONST_050: institutionalDraft('El Consell General representa el poble andorrà mitjançant una composició que combina la representació nacional i la de les set parròquies.', 'Defineix la legitimitat representativa del parlament andorrà.', 'S’adreça al Consell General, als electors i als òrgans electorals.', 'La representació es concreta mitjançant el sistema electoral i les competències parlamentàries.', 'La representació mixta no permet que una part del Consell actuï fora de les regles constitucionals i electorals.', ['Consell General', 'Representació nacional', 'Parròquies', 'Parlament'], ['Què significa representació mixta?', 'Quina funció té el Consell General?', 'Com es relaciona amb el sufragi?'], ['Hi conviuen una dimensió nacional i una territorial.', 'L’article 51 i 52 concreten elecció i composició.', 'Relaciona’l amb els articles 24 i 58.']),
  CONST_051: institutionalDraft('Els consellers generals són elegits per sufragi universal, lliure, igual, directe i secret per un mandat de quatre anys.', 'Garanteix la legitimitat democràtica i la renovació periòdica del Consell General.', 'S’adreça als electors, candidats, òrgans electorals i consellers generals.', 'Les eleccions i la finalització del mandat es regeixen per la Constitució i la legislació electoral.', 'El mandat no és indefinit i les condicions d’elegibilitat i incompatibilitat depenen també de la llei.', ['Eleccions', 'Mandat', 'Sufragi universal', 'Secret del vot'], ['Quines garanties té el sufragi?', 'Quant dura el mandat?', 'Per què és important el vot secret?'], ['L’article descriu principis electorals.', 'La llei concreta el procediment.', 'Relaciona’l amb els articles 24, 25 i 52.']),
  CONST_052: institutionalDraft('Estableix el nombre de consellers generals i el sistema de meitat de representants nacionals i meitat de representants parroquials.', 'Equilibra la representació de la població nacional amb la representació territorial de les parròquies.', 'S’adreça al Consell General, als electors i al legislador electoral.', 'La composició s’aplica en cada convocatòria electoral dins dels límits constitucionals.', 'Qualsevol reforma del sistema ha de respectar les majories i procediments constitucionals.', ['Composició parlamentària', 'Representació parroquial', 'Representació nacional'], ['Per què hi ha dues formes de representació?', 'Com es distribueixen els escons?', 'Quin valor té la igualtat del vot en aquest sistema?'], ['L’article combina població i territori.', 'No és un sistema purament proporcional nacional.', 'Relaciona’l amb els articles 50 i 51.']),
  CONST_053: institutionalDraft('Els membres del Consell General tenen la mateixa naturalesa representativa, igualtat de drets i deures i no estan sotmesos a mandat imperatiu.', 'Protegeix la llibertat del mandat parlamentari i la igualtat entre consellers.', 'S’adreça als consellers generals, grups parlamentaris i electors.', 'Els consellers exerceixen el càrrec representant el poble, no com a delegats sotmesos a ordres jurídicament obligatòries.', 'La llibertat del mandat no elimina la responsabilitat política davant els electors ni les regles parlamentàries.', ['Mandat representatiu', 'Mandat imperatiu', 'Igualtat parlamentària', 'Immunitat'], ['Què és un mandat imperatiu?', 'A qui representa un conseller?', 'Quina diferència hi ha entre responsabilitat política i mandat jurídic?'], ['El conseller no rep instruccions vinculants d’un elector.', 'La disciplina política no és el mateix que mandat imperatiu.', 'Relaciona’l amb l’article 50.']),
  CONST_054: institutionalDraft('El Consell General aprova el seu reglament, fixa el seu pressupost i regula l’estatut del seu personal.', 'Garanteix l’autonomia organitzativa i funcional del parlament.', 'S’adreça al Consell General, a la Sindicatura i al personal parlamentari.', 'El reglament ordena els debats, les sessions, les comissions i el funcionament intern.', 'L’autonomia parlamentària s’exerceix dins la Constitució i les lleis aplicables.', ['Autonomia parlamentària', 'Reglament', 'Pressupost', 'Sindicatura'], ['Per què el Consell aprova el seu reglament?', 'Quines matèries regula internament?', 'Quins límits té l’autonomia?'], ['És autonomia funcional, no sobirania separada.', 'El reglament no pot contradir la Constitució.', 'Relaciona’l amb els articles 55–57.']),
  CONST_055: institutionalDraft('La Sindicatura és l’òrgan rector del Consell General i l’article regula la sessió constitutiva i l’elecció dels seus òrgans.', 'Assegura que el parlament pugui constituir-se i organitzar-se després de les eleccions.', 'S’adreça als consellers generals i als òrgans de direcció parlamentària.', 'La sessió constitutiva inicia formalment la legislatura i permet elegir la Sindicatura.', 'Els terminis i formalitats són constitucionals i no poden ser substituïts per pràctiques informals.', ['Sindicatura', 'Sessió constitutiva', 'Legislatura'], ['Quina funció té la Sindicatura?', 'Quan es constitueix el Consell?', 'Què passa si no es compleixen les formalitats?'], ['És el govern intern de la Cambra.', 'Cal distingir constitució del Consell i inici del Govern.', 'Relaciona’l amb l’article 68.']),
  CONST_056: institutionalDraft('Regula les sessions tradicionals, ordinàries i extraordinàries del Consell General i la seva convocatòria.', 'Garanteix la continuïtat del treball parlamentari i diferencia els tipus de sessió.', 'S’adreça al Consell General, a la Sindicatura i als grups parlamentaris.', 'El reglament i la convocatòria determinen quan i com es reuneix la Cambra.', 'Una sessió ha de respectar la convocatòria, l’ordre del dia i les garanties de publicitat i participació.', ['Sessions parlamentàries', 'Convocatòria', 'Sindicatura'], ['Quins tipus de sessions existeixen?', 'Qui les convoca?', 'Per què és important la convocatòria?'], ['La sessió és una garantia del debat públic.', 'No totes les reunions parlamentàries tenen el mateix règim.', 'Relaciona’l amb els articles 54 i 57.']),
  CONST_057: institutionalDraft('Fixa el quòrum necessari perquè el Consell General adopti acords i regula les majories i votacions parlamentàries.', 'Evita decisions adoptades sense una presència mínima i ordena la formació de la voluntat de la Cambra.', 'S’adreça als consellers, a la Sindicatura i als grups parlamentaris.', 'Abans de votar cal comprovar la constitució vàlida de la sessió i aplicar la majoria corresponent.', 'El quòrum i la majoria depenen de la matèria; no es poden substituir per una simple majoria informal.', ['Quòrum', 'Majoria', 'Votació', 'Acord parlamentari'], ['Quina diferència hi ha entre quòrum i majoria?', 'Quan és vàlid un acord?', 'Per què algunes decisions exigeixen majories reforçades?'], ['Primer cal saber si hi ha quòrum.', 'Després cal identificar la majoria exigida.', 'Relaciona’l amb els articles 58–63.']),
  CONST_058: institutionalDraft('La iniciativa legislativa correspon al Consell General i al Govern; també reconeix iniciatives dels Comuns i de la ciutadania en els termes previstos.', 'Obre les vies d’iniciativa legislativa i connecta parlament, Govern, territori i participació ciutadana.', 'S’adreça al Govern, consellers, Comuns i ciutadans legitimats.', 'Una iniciativa ha de seguir els requisits de forma, signatures, tramitació i límits materials establerts.', 'La iniciativa no equival a l’aprovació de la llei: el text encara ha de superar el procediment legislatiu.', ['Iniciativa legislativa', 'Proposició de llei', 'Participació ciutadana', 'Comuns'], ['Qui pot iniciar una llei?', 'Quina diferència hi ha entre iniciativa i aprovació?', 'Quins requisits pot establir la llei?'], ['L’article obre el procediment, no el tanca.', 'El Consell conserva la funció d’aprovació.', 'Relaciona’l amb els articles 50, 59 i 61.']),
  CONST_059: institutionalDraft('El Consell General pot delegar al Govern l’exercici de la funció legislativa mitjançant una llei, amb límits i sense possibilitat de subdelegació.', 'Permet una producció normativa delegada sense perdre el control parlamentari sobre l’abast de la delegació.', 'S’adreça al Consell General i al Govern.', 'La llei de delegació ha de definir matèria, abast i condicions; el Govern només pot actuar dins d’aquests límits.', 'No es pot subdelegar ni actuar més enllà de l’autorització parlamentària.', ['Delegació legislativa', 'Govern', 'Llei de delegació', 'Control parlamentari'], ['Què es delega?', 'Qui fixa els límits?', 'Per què no es pot subdelegar?'], ['La delegació no és una cessió definitiva de la funció legislativa.', 'Cal comparar la llei de delegació amb el decret legislatiu.', 'Relaciona’l amb els articles 3 i 60.']),
  CONST_060: institutionalDraft('En casos d’extrema urgència i necessitat, el Govern pot presentar un text articulat perquè sigui aprovat com a llei en una votació de totalitat.', 'Ofereix un procediment excepcional per respondre ràpidament a situacions urgents.', 'S’adreça al Govern i al Consell General.', 'La urgència ha d’estar justificada i el Consell manté la competència d’aprovar o rebutjar el text.', 'No permet utilitzar l’urgència per evitar el debat ordinari ni alterar matèries reservades o drets sense garanties.', ['Urgència legislativa', 'Text articulat', 'Votació de totalitat', 'Excepcionalitat'], ['Què justifica el procediment?', 'Quin paper conserva el Consell?', 'Quin risc constitucional cal evitar?'], ['La urgència és una excepció al procediment ordinari.', 'El Govern proposa, però el Consell aprova.', 'Relaciona’l amb els articles 40, 58 i 61.']),
  CONST_061: institutionalDraft('La iniciativa del projecte de pressupost general correspon exclusivament al Govern, però la seva aprovació correspon al Consell General.', 'Ordena la responsabilitat política i parlamentària sobre els ingressos i les despeses públiques.', 'S’adreça al Govern, al Consell General i a la ciutadania com a contribuent.', 'El Govern elabora el projecte i el Consell el debat i aprova dins del procediment pressupostari.', 'L’exclusivitat de la iniciativa no elimina el control parlamentari ni el principi de legalitat pressupostària.', ['Pressupost general', 'Iniciativa governamental', 'Control parlamentari', 'Despesa pública'], ['Qui prepara el pressupost?', 'Qui l’aprova?', 'Per què el pressupost té rellevància política?'], ['El Govern proposa i el Consell controla i aprova.', 'Relaciona’l amb els articles 37, 47 i 69.', 'El pressupost concreta polítiques públiques.']),
  CONST_062: institutionalDraft('Els consellers i grups parlamentaris poden presentar esmenes als projectes i proposicions de llei, amb les regles especials del procediment pressupostari.', 'Garanteix que el parlament pugui modificar i controlar els textos legislatius.', 'S’adreça als consellers, grups parlamentaris i Govern.', 'Les esmenes s’han de presentar dins els terminis i formes del reglament parlamentari.', 'El dret d’esmena està subjecte a límits procedimentals i materials, especialment en matèria pressupostària.', ['Dret d’esmena', 'Procediment legislatiu', 'Grups parlamentaris'], ['Què permet una esmena?', 'Qui pot presentar-la?', 'Per què el pressupost té regles especials?'], ['Esmenar no és iniciar un text completament nou.', 'Cal respectar el procediment parlamentari.', 'Relaciona’l amb els articles 54, 58 i 61.']),
  CONST_063: institutionalDraft('Un cop aprovada una llei, el síndic general en dona compte als Coprínceps perquè la sancionin, promulguin i en disposin la publicació.', 'Completa la fase institucional que converteix el text aprovat en una llei publicada i aplicable.', 'S’adreça al Consell General, als Coprínceps, al Govern i al BOPA.', 'La llei segueix les fases d’aprovació, sanció, promulgació, publicació i entrada en vigor.', 'La publicació és essencial per a l’exigibilitat i la seguretat jurídica; una llei no publicada no pot operar com una norma coneguda.', ['Sanció', 'Promulgació', 'Publicació', 'BOPA'], ['Què passa després de l’aprovació?', 'Per què és necessària la publicació?', 'Quina diferència hi ha entre sancionar i promulgar?'], ['Segueix el recorregut complet de la llei.', 'Relaciona’l amb l’article 3.', 'La publicitat és una garantia constitucional.']),
  CONST_064: institutionalDraft('Determina quins tractats internacionals requereixen l’aprovació del Consell General per majoria absoluta, especialment els que afecten sobirania, drets o obligacions financeres.', 'Assegura control parlamentari sobre compromisos internacionals d’especial importància.', 'S’adreça al Govern, al Consell General i als Coprínceps en la negociació i aprovació de tractats.', 'Abans de vincular l’Estat, el tractat ha de seguir el procediment constitucional corresponent.', 'No tots els tractats segueixen el mateix règim; cal classificar la matèria i consultar el text complet.', ['Tractats internacionals', 'Aprovació parlamentària', 'Sobirania', 'Majoria absoluta'], ['Quins tractats exigeixen aprovació?', 'Per què intervenen les institucions?', 'Com s’integra un tractat en l’ordenament?'], ['La matèria del tractat determina el procediment.', 'Relaciona’l amb l’article 3 i els articles 65–67.', 'La publicació és necessària per a la integració interna.']),
  CONST_065: institutionalDraft('Permet cedir competències legislatives, executives o judicials a organitzacions internacionals quan sigui necessari per als interessos d’Andorra, el progrés o la pau.', 'Fa possible la cooperació i integració internacional sense abandonar el marc constitucional.', 'S’adreça al Consell General, al Govern i als òrgans que negocien tractats.', 'La cessió s’ha de fer mitjançant el procediment constitucional i el tractat corresponent.', 'No és una renúncia il·limitada a la sobirania: la cessió ha de ser concreta, aprovada i compatible amb la Constitució.', ['Cessió de competències', 'Cooperació internacional', 'Sobirania', 'Tractat'], ['Quines competències es poden cedir?', 'Quina finalitat ha de justificar-ho?', 'Per què la cessió no equival a desaparició de la sobirania?'], ['La Constitució admet cooperació amb control.', 'Cal distingir delegació i cessió.', 'Relaciona’l amb els articles 3, 64 i 95.']),
  CONST_066: institutionalDraft('Regula la participació dels Coprínceps en la negociació de tractats amb els estats veïns sobre determinades matèries.', 'Protegeix la dimensió institucional i històrica de les relacions amb els estats veïns.', 'S’adreça als Coprínceps, al Govern i als òrgans de negociació internacional.', 'La participació es concreta en la negociació dels tractats que entren en les matèries constitucionals previstes.', 'No converteix tota política exterior en competència exclusiva dels Coprínceps.', ['Relacions amb estats veïns', 'Negociació de tractats', 'Participació institucional'], ['Quan participen els Coprínceps?', 'Quin paper conserva el Govern?', 'Quina diferència hi ha entre negociar i aprovar?'], ['La matèria i la relació exterior són determinants.', 'Relaciona’l amb els articles 45, 64 i 67.', 'La competència s’ha d’interpretar segons el text complet.']),
  CONST_067: institutionalDraft('Els Coprínceps són informats dels altres projectes de tractats i poden ser associats a la negociació a petició del Govern.', 'Estableix informació i cooperació institucional en política exterior fora dels supòsits de l’article 66.', 'S’adreça als Coprínceps i al Govern.', 'El Govern informa i pot demanar l’associació dels Coprínceps en la negociació.', 'Informar o associar no equival a atribuir una competència general de negociació.', ['Informació', 'Associació a la negociació', 'Política exterior'], ['Quina diferència hi ha entre els articles 66 i 67?', 'Qui pot demanar l’associació?', 'Què implica rebre informació?'], ['L’article regula cooperació, no substitució.', 'Relaciona’l amb l’article 66.', 'La iniciativa pràctica correspon al Govern.']),
  CONST_068: institutionalDraft('Després de cada renovació del Consell General, el Consell elegeix el síndic i el subsíndic en la primera sessió.', 'Assegura la constitució democràtica de la direcció parlamentària després de les eleccions.', 'S’adreça als consellers generals i als òrgans de la Cambra.', 'L’elecció es fa en el termini i amb el procediment constitucional i reglamentari.', 'El càrrec no és una designació externa: deriva de l’elecció parlamentària.', ['Síndic general', 'Subsíndic', 'Renovació parlamentària'], ['Quan s’elegeixen?', 'Quina funció institucional tenen?', 'Com es relaciona amb la Sindicatura?'], ['La Sindicatura necessita una Cambra constituïda.', 'Relaciona’l amb l’article 55.', 'Diferencia direcció parlamentària i Govern.']),
  CONST_069: institutionalDraft('El Govern respon políticament de manera solidària davant del Consell General. Una cinquena part dels consellers pot presentar una moció de censura.', 'Fa efectiva la responsabilitat parlamentària del Govern i permet substituir-lo mitjançant una majoria constitucional.', 'S’adreça al Govern, al Consell General i als grups parlamentaris.', 'La moció de censura segueix requisits, debat i votació; si prospera, produeix les conseqüències constitucionals.', 'No és una simple crítica política: exigeix el llindar i el procediment previstos.', ['Responsabilitat política', 'Moció de censura', 'Solidaritat governamental'], ['Davant de qui respon el Govern?', 'Qui pot presentar una moció?', 'Quina diferència hi ha entre censura i qüestió de confiança?'], ['La responsabilitat és del Govern com a conjunt.', 'El llindar de presentació no és la majoria d’aprovació.', 'Relaciona’l amb l’article 70.']),
  CONST_070: institutionalDraft('El cap de Govern pot plantejar una qüestió de confiança davant el Consell General sobre el seu programa o una declaració política general.', 'Permet al cap de Govern comprovar si conserva el suport parlamentari necessari.', 'S’adreça al cap de Govern, al Govern i al Consell General.', 'La qüestió es presenta, es debat i es vota segons el procediment constitucional.', 'No és un mecanisme per substituir una moció de censura ni permet governar contra una pèrdua de confiança.', ['Qüestió de confiança', 'Suport parlamentari', 'Programa de Govern'], ['Qui planteja la qüestió?', 'Sobre què es pot plantejar?', 'Com es diferencia de la moció de censura?'], ['En la confiança, la iniciativa és del Govern.', 'En la censura, la iniciativa és parlamentària.', 'Relaciona’l amb els articles 69 i 77.']),
  CONST_071: institutionalDraft('El cap de Govern pot demanar la dissolució anticipada del Consell General, amb els límits constitucionals previstos.', 'Permet desbloquejar una situació política mitjançant una nova consulta electoral.', 'S’adreça al cap de Govern, als Coprínceps, al Consell General i al cos electoral.', 'La dissolució només es pot demanar en les condicions constitucionals i comporta convocar eleccions.', 'No pot utilitzar-se contra els límits temporals o circumstàncies prohibides per la Constitució.', ['Dissolució anticipada', 'Eleccions', 'Cap de Govern'], ['Qui demana la dissolució?', 'Quina finalitat té?', 'Quins límits ha de respectar?'], ['És una sortida institucional a una crisi política.', 'No és una decisió personal sense condicions.', 'Relaciona’l amb l’article 51.']),
  CONST_072: institutionalDraft('El Govern es compon del cap de Govern i dels ministres i dirigeix la política nacional, l’administració i la defensa de l’ordre jurídic.', 'Defineix el Govern com a òrgan executiu responsable de conduir l’acció política i administrativa de l’Estat.', 'S’adreça al cap de Govern, ministres, administració i Consell General.', 'El Govern executa les lleis, dirigeix l’administració i respon políticament davant del Consell.', 'No pot exercir competències reservades al Consell General, als tribunals o al Tribunal Constitucional.', ['Govern', 'Funció executiva', 'Administració', 'Responsabilitat política'], ['Quines funcions té el Govern?', 'Davant de qui respon?', 'Quina diferència hi ha entre Govern i Administració?'], ['El Govern dirigeix; l’Administració executa de manera sotmesa al dret.', 'Relaciona’l amb els articles 3, 69 i 73.', 'La direcció política té control parlamentari.']),
  CONST_073: institutionalDraft('El cap de Govern és nomenat pels Coprínceps després d’haver estat elegit d’acord amb el procediment constitucional.', 'Connecta la confiança parlamentària amb el nomenament formal del cap de Govern.', 'S’adreça als Coprínceps, al Consell General i al candidat a cap de Govern.', 'El Consell General elegeix i els Coprínceps nomenen formalment.', 'El nomenament no permet escollir una persona sense la legitimitat parlamentària prevista.', ['Nomenament', 'Elecció parlamentària', 'Cap de Govern', 'Coprínceps'], ['Qui elegeix i qui nomena?', 'Per què hi intervenen dos òrgans?', 'Quina és la font de la legitimitat política?'], ['Diferencia elecció i nomenament.', 'Relaciona’l amb els articles 50, 68 i 72.', 'El sistema és parlamentari.']),
  CONST_074: institutionalDraft('El cap de Govern i els ministres estan sotmesos al mateix règim jurisdiccional que els consellers generals.', 'Evita privilegis jurisdiccionals diferenciats i fixa una regla comuna de responsabilitat judicial.', 'S’adreça als membres del Govern, consellers i tribunals competents.', 'Les responsabilitats dels membres del Govern es tramiten segons el règim jurisdiccional aplicable.', 'La igualtat de règim no elimina les garanties funcionals ni les regles processals específiques.', ['Règim jurisdiccional', 'Responsabilitat', 'Ministres'], ['Què significa el mateix règim jurisdiccional?', 'Per què és important la igualtat?', 'Quin paper tenen els tribunals?'], ['No és immunitat absoluta ni absència de garanties.', 'Cal consultar la llei processal aplicable.', 'Relaciona’l amb els articles 53 i 85.']),
  CONST_075: institutionalDraft('El cap de Govern o el ministre responsable contrasigna els actes dels Coprínceps previstos a l’article 45.', 'Concreta qui assumeix la responsabilitat política dels actes que necessiten contrasignatura.', 'S’adreça al cap de Govern, als ministres i als Coprínceps.', 'La signatura ministerial acompanya l’acte del Copríncep i activa la responsabilitat política corresponent.', 'Només opera per als actes inclosos en l’article 45.', ['Contrasignatura', 'Ministre responsable', 'Responsabilitat política'], ['Qui pot contrasignar?', 'Per què és necessària la signatura?', 'Quina relació té amb l’article 45?'], ['La contrasignatura no és una formalitat buida.', 'Identifica qui respon políticament.', 'Relaciona’l amb l’article 69.']),
  CONST_076: institutionalDraft('El cap de Govern, amb l’acord de la majoria del Consell General, pot demanar als Coprínceps la convocatòria d’un referèndum sobre una qüestió d’ordre polític.', 'Permet consultar directament el cos electoral en qüestions polítiques d’especial rellevància.', 'S’adreça al cap de Govern, al Consell General, als Coprínceps i als electors.', 'La convocatòria exigeix acord parlamentari i segueix el procediment legal del referèndum.', 'No tota qüestió pot ser sotmesa a referèndum; cal respectar la Constitució i les matèries excloses.', ['Referèndum', 'Cos electoral', 'Acord parlamentari'], ['Qui pot iniciar la petició?', 'Per què cal l’acord del Consell?', 'Quina diferència hi ha entre referèndum i eleccions?'], ['La iniciativa no és unilateral del cap de Govern.', 'El referèndum és una forma de participació directa.', 'Relaciona’l amb els articles 1, 23 i 24.']),
  CONST_077: institutionalDraft('El Govern acaba el mandat quan finalitza la legislatura o per dimissió, defunció, incapacitació definitiva del cap de Govern o pèrdua de confiança.', 'Determina quan es produeix el cessament i evita períodes de poder sense base constitucional.', 'S’adreça al Govern, al Consell General i als Coprínceps.', 'Quan es produeix una causa de cessament s’activa el règim de Govern sortint i la formació d’un nou Govern.', 'El cessament no elimina la necessitat de continuïtat administrativa ni permet prorrogar el mandat fora de les regles.', ['Cessament', 'Govern sortint', 'Pèrdua de confiança'], ['Quines causes posen fi al mandat?', 'Què passa després del cessament?', 'Quina relació té amb la legislatura?'], ['La causa pot ser política o personal.', 'Relaciona’l amb els articles 69–73.', 'El canvi de Govern ha de preservar la continuïtat institucional.']),
  CONST_078: institutionalDraft('El cap de Govern no pot exercir més de dos mandats consecutius complets i els membres del Govern estan sotmesos a incompatibilitats.', 'Limita la concentració temporal del poder i protegeix la separació entre funció governamental i altres activitats.', 'S’adreça al cap de Govern, ministres i institucions que controlen incompatibilitats.', 'La durada dels mandats i les incompatibilitats s’han de comprovar abans i durant l’exercici del càrrec.', 'El límit és de mandats consecutius complets; cal aplicar amb precisió les regles legals complementàries.', ['Limitació de mandats', 'Incompatibilitat', 'Separació de funcions'], ['Què limita exactament l’article?', 'Per què existeixen incompatibilitats?', 'Com es compten els mandats?'], ['La finalitat és evitar acumulació de poder.', 'No confonguis mandat consecutiu amb mandat total.', 'Relaciona’l amb els articles 50 i 72.']),
  CONST_079: institutionalDraft('Els Comuns són corporacions públiques amb personalitat jurídica, autonomia i potestat normativa per representar i administrar les parròquies.', 'Reconeix l’autonomia territorial dins de la unitat de l’Estat.', 'S’adreça als Comuns, parròquies, ciutadania i òrgans generals de l’Estat.', 'Els Comuns gestionen els assumptes propis dins del marc constitucional i legal.', 'L’autonomia no equival a sobirania ni permet actuar fora de les competències atribuïdes.', ['Comuns', 'Autonomia parroquial', 'Personalitat jurídica', 'Potestat normativa'], ['Què és un Comú?', 'Quina diferència hi ha entre autonomia i sobirania?', 'Quines competències pot exercir?'], ['L’autonomia és administrativa i financera.', 'La llei qualificada en concreta l’abast.', 'Relaciona’l amb els articles 80–84.']),
  CONST_080: institutionalDraft('Delimita les competències dels Comuns dins de la seva autonomia administrativa i financera i reserva aquesta delimitació a una llei qualificada.', 'Ordena la distribució territorial de poder i evita conflictes d’atribució.', 'S’adreça als Comuns, al Consell General i al legislador.', 'Les competències comunals s’exerceixen dins les matèries i condicions de la llei qualificada.', 'Un Comú no pot assumir competències generals de l’Estat ni el legislador pot buidar completament l’autonomia comunal.', ['Competència comunal', 'Autonomia financera', 'Llei qualificada'], ['Qui delimita les competències?', 'Què protegeix l’autonomia?', 'Què passa si hi ha conflicte?'], ['La llei concreta, però no pot buidar, l’autonomia.', 'Relaciona’l amb els articles 81 i 82.', 'La competència és una qüestió jurídica, no només política.']),
  CONST_081: institutionalDraft('Una llei qualificada determina les transferències de capital del pressupost general necessàries per assegurar la capacitat econòmica dels Comuns.', 'Garanteix que l’autonomia territorial tingui una base financera suficient.', 'S’adreça al Consell General, Govern i Comuns.', 'Les transferències es determinen per llei i s’integren en el sistema financer territorial.', 'La capacitat econòmica no elimina el control pressupostari ni permet despesa sense base legal.', ['Transferències', 'Finançament comunal', 'Capacitat econòmica'], ['Per què cal finançar l’autonomia?', 'Qui fixa les transferències?', 'Com es relacionen autonomia i recursos?'], ['Sense recursos no hi ha autonomia efectiva.', 'Relaciona’l amb els articles 61 i 80.', 'Cal verificar la legislació financera comunal.']),
  CONST_082: institutionalDraft('Els litigis sobre competències entre òrgans generals de l’Estat i Comuns són resolts pel Tribunal Constitucional.', 'Ofereix un àrbitre constitucional per garantir l’equilibri territorial i institucional.', 'S’adreça als Comuns, òrgans generals i Tribunal Constitucional.', 'Quan hi ha una disputa competencial, s’ha d’identificar l’òrgan legitimat i el procés constitucional aplicable.', 'No qualsevol desacord administratiu és un conflicte constitucional de competència.', ['Conflicte competencial', 'Comuns', 'Tribunal Constitucional'], ['Quin tipus de conflicte resol?', 'Qui el pot plantejar?', 'Per què no el resol un òrgan polític?'], ['Cal distingir competència constitucional i mera legalitat administrativa.', 'Relaciona’l amb els articles 83 i 103.', 'El Tribunal actua com a àrbitre constitucional.']),
  CONST_083: institutionalDraft('Els Comuns tenen iniciativa legislativa i poden interposar recursos d’inconstitucionalitat en els termes previstos per la Constitució.', 'Dona als Comuns participació en la producció legislativa i en la defensa del seu àmbit competencial.', 'S’adreça als Comuns, al Consell General i al Tribunal Constitucional.', 'Un Comú pot activar les vies corresponents quan compleixi els requisits de legitimació i procediment.', 'La legitimació no significa que qualsevol acte comunal pugui impugnar qualsevol llei sense connexió constitucional.', ['Iniciativa comunal', 'Legitimació', 'Inconstitucionalitat'], ['Quines dues facultats reconeix?', 'Què significa estar legitimat?', 'Quina relació té amb els conflictes competencials?'], ['El dret està subjecte als termes de la Constitució.', 'Relaciona’l amb els articles 58, 82 i 99.', 'La legitimació és diferent del fons de l’assumpte.']),
  CONST_084: institutionalDraft('Les lleis tenen en compte els usos i costums per determinar les competències dels quarts i veïnats i les seves relacions amb els Comuns.', 'Reconeix la rellevància constitucional de les formes territorials tradicionals dins del sistema comunal.', 'S’adreça al legislador, Comuns, quarts i veïnats.', 'La legislació ha d’integrar els usos i costums quan reguli les competències territorials menors.', 'El costum no pot contradir la Constitució ni substituir una competència legalment atribuïda.', ['Usos i costums', 'Quarts', 'Veïnats', 'Competència territorial'], ['Què reconeix l’article?', 'Com es relacionen costum i llei?', 'Quin és el límit del costum?'], ['La Constitució no converteix qualsevol pràctica en norma.', 'Cal provar el costum i situar-lo en el marc legal.', 'Relaciona’l amb els articles 79 i 80.']),
  CONST_085: institutionalDraft('La justícia és administrada exclusivament per jutges independents i inamovibles, sotmesos només a la Constitució i la llei.', 'Garanteix la independència judicial i reserva als jutges l’exercici de la potestat jurisdiccional.', 'S’adreça als jutges, tribunals, altres poders públics i persones que acudeixen a la justícia.', 'Els jutges han de resoldre els casos sense instruccions externes i d’acord amb el dret aplicable.', 'La independència no significa absència de responsabilitat: els jutges continuen sotmesos a la llei i al règim disciplinari.', ['Independència judicial', 'Inamovibilitat', 'Potestat jurisdiccional'], ['Què protegeix la independència?', 'Què vol dir inamovibilitat?', 'A qui estan sotmesos els jutges?'], ['Independència és decidir sense pressió, no actuar fora de la llei.', 'Relaciona’l amb els articles 3, 89 i 91.', 'La imparcialitat protegeix també les parts.']),
  CONST_086: institutionalDraft('La competència i el procediment de l’Administració de Justícia estan reservats a la llei i les sentències han de ser motivades i públiques, amb les excepcions legals.', 'Garanteix previsibilitat del sistema judicial i permet entendre i controlar les decisions dels tribunals.', 'S’adreça al legislador, tribunals i persones que participen en un procés.', 'La llei defineix quin tribunal és competent i com es tramita el procediment; la sentència ha d’explicar les raons.', 'La publicitat pot limitar-se en casos justificats per protegir drets o interessos legítims.', ['Competència judicial', 'Procediment', 'Motivació', 'Publicitat'], ['Per què la competència es reserva a la llei?', 'Què aporta la motivació?', 'Quan pot limitar-se la publicitat?'], ['Sense competència no hi ha judici vàlid.', 'La motivació permet recórrer i controlar.', 'Relaciona’l amb l’article 10.']),
  CONST_087: institutionalDraft('La potestat jurisdiccional correspon als batlles i als tribunals que integren l’Administració de Justícia andorrana.', 'Identifica els òrgans que poden jutjar i evita l’existència de tribunals extraordinaris al marge del sistema.', 'S’adreça als tribunals, professionals del dret i persones litigants.', 'La via adequada depèn de la competència material, territorial i funcional de cada òrgan.', 'Un òrgan administratiu o polític no pot substituir els tribunals en l’exercici de la potestat jurisdiccional.', ['Batlles', 'Tribunal de Batlles', 'Tribunal de Corts', 'Tribunal Superior'], ['Quins òrgans exerceixen jurisdicció?', 'Com es determina el tribunal competent?', 'Quina diferència hi ha entre jutjar i administrar?'], ['Segueix la cadena d’instàncies.', 'Relaciona’l amb l’article 86.', 'El Tribunal Constitucional té una funció diferent.']),
  CONST_088: institutionalDraft('Les sentències fermes tenen valor de cosa jutjada i només poden ser modificades o anul·lades en els casos previstos per la llei.', 'Protegeix la seguretat jurídica i l’estabilitat de les decisions judicials.', 'S’adreça als tribunals, parts del procés i poders públics.', 'Un cop una resolució és ferma, les parts han de respectar-la, llevat de les vies excepcionals legalment previstes.', 'La cosa jutjada no impedeix els recursos o revisions que la llei admet abans o excepcionalment després de la fermesa.', ['Cosa jutjada', 'Sentència ferma', 'Seguretat jurídica'], ['Quan una sentència és ferma?', 'Per què no es pot reobrir qualsevol cas?', 'Quines vies excepcionals poden existir?'], ['Fermesa no és el mateix que impossibilitat absoluta de revisió.', 'Relaciona’l amb els articles 3 i 86.', 'La finalitat és evitar decisions contradictòries.']),
  CONST_089: institutionalDraft('El Consell Superior de la Justícia governa i administra l’organització judicial i vetlla per la independència dels tribunals.', 'Separa el govern del poder judicial de les funcions jurisdiccionals concretes dels jutges.', 'S’adreça al Consell Superior, jutges, fiscals i òrgans de l’Estat.', 'El Consell gestiona l’organització judicial i protegeix la independència sense decidir el fons dels processos.', 'No pot substituir els tribunals en la resolució de casos ni rebre instruccions del Govern.', ['Consell Superior de la Justícia', 'Govern judicial', 'Independència'], ['Quina és la seva funció?', 'Què no pot fer?', 'Com es diferencia d’un tribunal?'], ['Governar la justícia no és jutjar.', 'Relaciona’l amb els articles 85 i 90.', 'La independència té una dimensió institucional i personal.']),
  CONST_090: institutionalDraft('Els jutges són nomenats per sis anys renovables entre persones titulades en Dret amb els requisits d’experiència i capacitat previstos.', 'Estableix un sistema constitucional de selecció i renovació dels jutges.', 'S’adreça al Consell Superior, candidats i jutges.', 'El nomenament ha de seguir els requisits de titulació, experiència, procediment i renovació.', 'La renovació no pot convertir-se en una eina de pressió sobre la independència judicial.', ['Nomenament judicial', 'Mandat', 'Titulació jurídica', 'Renovació'], ['Qui nomena els jutges?', 'Quant dura el mandat?', 'Quina relació hi ha entre renovació i independència?'], ['La selecció ha de combinar capacitat i independència.', 'Relaciona’l amb l’article 89.', 'El mandat no autoritza ingerències.']),
  CONST_091: institutionalDraft('El càrrec de jutge és incompatible amb altres càrrecs públics i activitats que puguin comprometre la independència o imparcialitat.', 'Evita conflictes d’interès i protegeix la confiança en la justícia.', 'S’adreça als jutges, Consell Superior i òrgans disciplinaris.', 'Abans d’assumir o mantenir el càrrec cal comprovar les incompatibilitats constitucionals i legals.', 'Les incompatibilitats han d’interpretar-se d’acord amb la finalitat d’independència i no com una sanció arbitrària.', ['Incompatibilitat', 'Imparcialitat', 'Conflicte d’interès'], ['Per què existeixen incompatibilitats?', 'Quina activitat podria comprometre la imparcialitat?', 'Qui controla el règim?'], ['La regla protegeix la confiança pública.', 'Relaciona’l amb els articles 85 i 90.', 'Distingueix incompatibilitat i responsabilitat.']),
  CONST_092: institutionalDraft('L’Estat ha de reparar els danys causats per error judicial d’acord amb la llei, sense perjudici de les responsabilitats personals.', 'Garanteix una resposta patrimonial quan el funcionament de la justícia causa un dany indemnitzable.', 'S’adreça a persones perjudicades, Estat i òrgans judicials.', 'La reclamació ha d’acreditar el dany i seguir el procediment legal corresponent.', 'No tota decisió desfavorable és error judicial ni genera automàticament indemnització.', ['Error judicial', 'Responsabilitat patrimonial', 'Indemnització'], ['Què és un error judicial?', 'Qui respon patrimonialment?', 'Per què cal acreditar el dany?'], ['Diferencia error judicial de simple disconformitat.', 'Relaciona’l amb l’article 85.', 'La llei concreta el procediment.']),
  CONST_093: institutionalDraft('El Ministeri Fiscal defensa i aplica l’ordre jurídic, promou l’acció de la justícia i vetlla per la independència dels tribunals.', 'Defineix la funció constitucional del Ministeri Fiscal dins del sistema de justícia.', 'S’adreça al Ministeri Fiscal, tribunals, investigats, víctimes i ciutadania.', 'El Ministeri Fiscal actua davant els tribunals en els casos i formes previstos legalment.', 'No és un tribunal ni pot substituir la decisió judicial; actua amb autonomia funcional dins la llei.', ['Ministeri Fiscal', 'Acció de la justícia', 'Ordre jurídic'], ['Quina és la seva missió?', 'Quina diferència hi ha entre Fiscalia i tribunal?', 'Com protegeix la independència judicial?'], ['Promoure la justícia no és dictar sentència.', 'Relaciona’l amb els articles 85 i 94.', 'La seva actuació té una dimensió pública.']),
  CONST_094: institutionalDraft('Els jutges i el Ministeri Fiscal dirigeixen l’acció de la policia en matèria judicial segons el que estableixen les lleis.', 'Assegura que la investigació penal sota autoritat judicial no quedi sotmesa a direccions polítiques indegudes.', 'S’adreça a jutges, Ministeri Fiscal i policia judicial.', 'La policia actua en investigació judicial sota la direcció funcional que determini la llei.', 'La direcció judicial opera en matèria judicial i no elimina les competències administratives generals de la policia.', ['Policia judicial', 'Investigació penal', 'Direcció judicial'], ['Què significa matèria judicial?', 'Qui dirigeix la investigació?', 'Com es diferencia direcció judicial i jerarquia policial?'], ['La clau és separar investigació i administració policial.', 'Relaciona’l amb els articles 9, 10 i 93.', 'Cal consultar la normativa processal.']),
  CONST_095: institutionalDraft('El Tribunal Constitucional és l’intèrpret suprem de la Constitució, actua jurisdiccionalment i les seves sentències vinculen els poders públics i les persones.', 'Concentra el control suprem de constitucionalitat i assegura una interpretació comuna de la Constitució.', 'S’adreça a tots els poders públics, tribunals, parts dels processos constitucionals i ciutadania.', 'El Tribunal interpreta la Constitució mitjançant els processos que li atribueix el títol VIII.', 'Ser intèrpret suprem no significa que pugui actuar sense procés ni fora de les competències constitucionals.', ['Tribunal Constitucional', 'Intèrpret suprem', 'Sentència vinculant'], ['Què significa intèrpret suprem?', 'A qui vinculen les sentències?', 'Quina diferència hi ha entre Tribunal Constitucional i tribunals ordinaris?'], ['El Tribunal té funció jurisdiccional.', 'La vinculació és una garantia d’unitat constitucional.', 'Relaciona’l amb els articles 3 i 98.']),
  CONST_096: institutionalDraft('El Tribunal Constitucional es compon de quatre magistrats constitucionals designats entre persones de reconeguda experiència jurídica o institucional.', 'Estableix la composició reduïda i la qualificació professional del Tribunal.', 'S’adreça als òrgans de designació i als magistrats constitucionals.', 'La designació ha de respectar el nombre, els requisits i els torns previstos constitucionalment.', 'La legitimitat del Tribunal depèn del respecte al procediment de designació i de la independència dels magistrats.', ['Magistrats constitucionals', 'Designació', 'Experiència jurídica'], ['Quants magistrats hi ha?', 'Quins requisits han de reunir?', 'Per què importa el procediment de designació?'], ['Compara composició i funció.', 'Relaciona’l amb els articles 89 i 95.', 'La qualificació no substitueix la independència.']),
  CONST_097: institutionalDraft('El Tribunal adopta decisions per majoria, manté secretes les deliberacions i designa un ponent per preparar les resolucions.', 'Ordena el funcionament intern i la formació de la voluntat del Tribunal.', 'S’adreça als magistrats constitucionals i a les parts dels processos.', 'Les resolucions es preparen i adopten segons les regles de deliberació, ponència i votació.', 'El secret de les deliberacions no impedeix la motivació i publicació de les sentències.', ['Majoria', 'Deliberació', 'Ponent', 'Vot particular'], ['Com pren decisions el Tribunal?', 'Quina funció té el ponent?', 'Com es concilia secret i transparència?'], ['El secret protegeix la deliberació interna.', 'La sentència publicada ha de ser motivada.', 'Relaciona’l amb l’article 86.']),
  CONST_098: institutionalDraft('Enumera els processos que coneix el Tribunal Constitucional: inconstitucionalitat, empara, conflictes competencials, dictàmens i altres qüestions que la Constitució li atribueix.', 'Delimita la jurisdicció constitucional i permet saber quina via correspon a cada problema.', 'S’adreça a ciutadania, tribunals, institucions i persones legitimades.', 'Abans d’acudir al Tribunal cal classificar l’objecte: llei, acte públic, conflicte o tractat.', 'No és una via general per revisar qualsevol decisió judicial o administrativa.', ['Competència constitucional', 'Inconstitucionalitat', 'Empara', 'Conflicte competencial'], ['Quines vies existeixen?', 'Quina via correspon a una llei?', 'Quina via correspon a una vulneració de drets?'], ['Comença sempre identificant l’objecte del conflicte.', 'Relaciona’l amb els articles 99–103.', 'El procediment determina la legitimació.']),
  CONST_099: institutionalDraft('Regula el recurs d’inconstitucionalitat contra lleis i decrets legislatius i determina qui el pot interposar.', 'Permet controlar directament la compatibilitat d’una norma amb la Constitució.', 'S’adreça als subjectes constitucionalment legitimats i al Tribunal Constitucional.', 'El recurs s’ha de presentar dins els requisits, terminis i formes del procés constitucional.', 'No és una acció ciutadana general ni serveix per impugnar qualsevol acte d’aplicació d’una llei.', ['Recurs d’inconstitucionalitat', 'Legitimació', 'Llei', 'Decret legislatiu'], ['Quin objecte té el recurs?', 'Qui està legitimat?', 'Quina diferència hi ha amb la qüestió d’inconstitucionalitat?'], ['El recurs ataca directament la norma.', 'La qüestió arriba des d’un procés judicial.', 'Relaciona’l amb els articles 95, 98 i 100.']),
  CONST_100: institutionalDraft('Permet que un tribunal plantegi una qüestió d’inconstitucionalitat quan té dubtes raonables sobre la norma que ha d’aplicar en un procés.', 'Connecta la justícia ordinària amb el control constitucional de les lleis.', 'S’adreça als tribunals que coneixen un procés i al Tribunal Constitucional.', 'El tribunal ordinari suspèn o tramita el procés segons la llei i planteja la qüestió amb justificació suficient.', 'No basta un dubte abstracte: la norma ha de ser rellevant per decidir el cas i el dubte ha d’estar fonamentat.', ['Qüestió d’inconstitucionalitat', 'Tribunal ordinari', 'Rellevància normativa'], ['Qui pot plantejar-la?', 'Per què la norma ha de ser rellevant?', 'Què passa amb el procés d’origen?'], ['La qüestió neix d’un cas concret.', 'El Tribunal Constitucional decideix sobre la norma.', 'Relaciona’l amb els articles 3 i 98.']),
  CONST_101: institutionalDraft('Els Coprínceps, el cap de Govern o una cinquena part del Consell General poden requerir dictamen previ sobre la constitucionalitat de determinats tractats.', 'Evita que entri en vigor un compromís internacional incompatible amb la Constitució.', 'S’adreça als legitimats, al Govern i al Tribunal Constitucional.', 'El dictamen es demana abans de la ratificació en els supòsits constitucionals previstos.', 'És un control previ i no substitueix els altres processos constitucionals quan siguin procedents.', ['Dictamen previ', 'Tractat', 'Control preventiu'], ['Quan es demana el dictamen?', 'Qui el pot requerir?', 'Per què és preventiu?'], ['La temporalitat és decisiva: abans de ratificar.', 'Relaciona’l amb els articles 64–67 i 95.', 'No és el mateix que un recurs posterior.']),
  CONST_102: institutionalDraft('Permet demanar empara al Tribunal Constitucional contra actes dels poders públics que lesionin drets fonamentals, quan compleixin els requisits de legitimació i procediment.', 'Ofereix la protecció constitucional final dels drets fonamentals davant actuacions públiques.', 'S’adreça a les persones i subjectes legitimats que han patit una lesió constitucional.', 'Normalment exigeix haver utilitzat abans les vies judicials i identificar una vulneració concreta d’un dret protegible.', 'No és una tercera instància ni protegeix qualsevol desacord amb una sentència o política pública.', ['Recurs d’empara', 'Drets fonamentals', 'Acte públic', 'Subsidiarietat'], ['Quin acte es pot impugnar?', 'Qui pot demanar empara?', 'Per què no és una tercera instància?'], ['Busca una lesió de dret, no només una decisió desfavorable.', 'Relaciona’l amb els articles 39–41.', 'La subsidiarietat exigeix respectar les vies prèvies.']),
  CONST_103: institutionalDraft('Regula els conflictes entre òrgans constitucionals quan un d’ells al·lega que un altre exerceix il·legítimament les seves competències.', 'Protegeix la separació de poders i resol disputes sobre qui pot actuar constitucionalment.', 'S’adreça als òrgans constitucionals legitimats i al Tribunal Constitucional.', 'El conflicte s’ha de plantejar identificant la competència constitucional discutida i l’acte que l’ha vulnerada.', 'No és una via per resoldre disputes polítiques sense dimensió competencial constitucional.', ['Conflicte entre òrgans', 'Separació de poders', 'Competència'], ['Quin és l’objecte del conflicte?', 'Qui pot plantejar-lo?', 'Com es diferencia del conflicte comunal?'], ['La clau és la competència, no la conveniència política.', 'Relaciona’l amb els articles 82, 95 i 98.', 'El Tribunal actua com a àrbitre institucional.']),
  CONST_104: institutionalDraft('Una llei qualificada regula l’estatut dels magistrats constitucionals, els processos constitucionals i el funcionament del Tribunal.', 'Reserva a una llei reforçada el desplegament de la justícia constitucional.', 'S’adreça al Consell General, Tribunal Constitucional, magistrats i parts dels processos.', 'La llei qualificada concreta procediments, terminis, legitimació i organització sense alterar la Constitució.', 'El legislador no pot utilitzar el desplegament per reduir les competències o garanties constitucionals.', ['Llei qualificada', 'Estatut dels magistrats', 'Processos constitucionals'], ['Què ha de regular la llei?', 'Quin marge té el legislador?', 'Què no pot modificar una llei qualificada?'], ['Desplegar no és reformar informalment la Constitució.', 'Relaciona’l amb els articles 95–103.', 'La llei ha de ser compatible amb el text constitucional.']),
  CONST_105: institutionalDraft('La iniciativa de reforma de la Constitució correspon als Coprínceps conjuntament o a una tercera part dels membres del Consell General.', 'Defineix qui pot iniciar el procediment excepcional de reforma constitucional.', 'S’adreça als Coprínceps i als consellers generals legitimats.', 'La proposta ha de seguir el procediment reforçat dels articles 106 i 107.', 'La iniciativa no permet aprovar la reforma unilateralment: encara calen les majories, el referèndum i la sanció previstos.', ['Reforma constitucional', 'Iniciativa', 'Coprínceps', 'Consell General'], ['Qui pot iniciar una reforma?', 'Per què el llindar és reforçat?', 'Quins passos venen després?'], ['Iniciar no és aprovar.', 'La reforma té diverses fases de control.', 'Relaciona’l amb els articles 3 i 106.']),
  CONST_106: institutionalDraft('La reforma constitucional requereix una majoria de dues terceres parts del Consell General, la dissolució de la Cambra, noves eleccions i un nou acord parlamentari, seguit de referèndum.', 'Garanteix que la Constitució només es pugui modificar amb un consens polític i ciutadà reforçat.', 'S’adreça al Consell General, electors, Coprínceps i òrgans electorals.', 'La reforma segueix una seqüència obligatòria: aprovació reforçada, renovació electoral, nova aprovació i referèndum.', 'No es pot substituir el procediment per una majoria ordinària ni ometre la consulta ciutadana.', ['Majoria reforçada', 'Dissolució', 'Referèndum', 'Reforma constitucional'], ['Per què calen dues aprovacions?', 'Quina funció té la dissolució?', 'Quin paper té el referèndum?'], ['La reforma és més rígida que una llei ordinària.', 'El poble intervé després de la renovació parlamentària.', 'Relaciona’l amb els articles 24, 50 i 105.']),
  CONST_107: institutionalDraft('Un cop superats els tràmits de reforma, els Coprínceps sancionen el nou text constitucional perquè sigui promulgat i entri en vigor.', 'Completa formalment el procediment de reforma i dona entrada en vigor al nou text.', 'S’adreça als Coprínceps, al Consell General i a la ciutadania.', 'La sanció i promulgació només arriben després d’haver superat totes les fases de l’article 106.', 'No és una via per corregir o modificar el contingut aprovat fora del procediment de reforma.', ['Sanció', 'Promulgació', 'Entrada en vigor', 'Text constitucional'], ['Quin és l’últim pas de la reforma?', 'Per què ve després del referèndum?', 'Quan produeix efectes el nou text?'], ['És una fase formal final.', 'La legitimitat principal prové del procediment reforçat anterior.', 'Relaciona’l amb els articles 63 i 106.']),
};

for (const [articleId, draft] of Object.entries(draftsP2P3)) {
  const target = editorial[articleId];
  if (!target) continue;
  Object.assign(target, draft, {
    estat: 'en-revisio',
    notes_revisio: 'Borrador editorial del paquet institucional; pendent de revisió jurídica, terminològica i de fonts abans de publicar.',
  });
}

export const editorialConstitucio = editorial;

export function getEditorialConstitucional(articleId: string): ConstitutionalEditorialEntry | null {
  return editorialConstitucio[articleId] ?? null;
}

export function validarEditorialConstitucio(): string[] {
  return Object.values(editorialConstitucio).flatMap((entry) => {
    const errors: string[] = [];
    if (!entry.article_id) errors.push('article_id buit');
    if (!['pendent', 'en-revisio', 'revisat', 'publicat'].includes(entry.estat)) errors.push('estat invàlid');
    if (entry.fonts.some((font) => !font.id || !font.referencia || !['constitucio', 'legislacio', 'jurisprudencia', 'doctrina'].includes(font.tipus))) {
      errors.push('font invàlida');
    }
    if (entry.estat === 'publicat' && (!entry.resum.ca || entry.preguntes_aprenentatge.length === 0 || entry.fonts.length === 0)) {
      errors.push('registre publicat incomplet');
    }
    return errors.map((error) => `${entry.article_id}: ${error}`);
  });
}
