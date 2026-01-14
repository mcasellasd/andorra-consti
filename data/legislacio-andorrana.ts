/**
 * Legislació andorrana d'interès
 * 
 * Taula amb totes les normes legals d'Andorra i els seus enllaços als PDFs
 */

export interface NormaAndorrana {
  id: string;
  nom: string;
  url: string;
  tipus: 'llei' | 'reglament' | 'decret' | 'altres';
  any?: number;
}

export const legislacioAndorrana: NormaAndorrana[] = [
  {
    id: 'reglament-codi-duana',
    nom: 'Reglament del Codi de Duana',
    url: 'https://www.ccis.ad/wp-content/uploads/2025/09/Reglament-codi-de-duana.pdf',
    tipus: 'reglament',
    any: 2025
  },
  {
    id: 'llei-llengua-propia',
    nom: 'Llei de la llengua pròpia i oficial',
    url: 'https://www.ccis.ad/wp-content/uploads/2025/05/llei-catala.pdf',
    tipus: 'llei',
    any: 2025
  },
  {
    id: 'llei-creixement-sostenible-habitatge',
    nom: 'Llei per al creixement sostenible i el dret a l\'habitatge',
    url: 'https://www.ccis.ad/wp-content/uploads/2025/03/llei-per-al-creixement-sostenible-i-el-dret-a-lhabitatge.pdf',
    tipus: 'llei',
    any: 2025
  },
  {
    id: 'reglament-exportacio-bens-doble-us',
    nom: 'Reglament relatiu a les formalitats d\'exportació de béns de doble ús',
    url: 'https://www.ccis.ad/wp-content/uploads/2025/06/Reglament-exportacio-bens-doble-us.pdf',
    tipus: 'reglament',
    any: 2025
  },
  {
    id: 'llei-mesures-urgents-poder-adquisitiu-2024',
    nom: 'Llei de mesures urgents per a la millora del poder adquisitiu de la ciutadania',
    url: 'https://www.ccis.ad/wp-content/uploads/2024/02/Llei-de-mesures-urgents-per-a-la-millora-del-poder-adquisitiu-de-la-ciutadania.pdf',
    tipus: 'llei',
    any: 2024
  },
  {
    id: 'llei-suspensio-inversio-estrangera-immobles',
    nom: 'Llei de suspensió transitòria de la inversió estrangera en immobles',
    url: 'https://www.ccis.ad/wp-content/uploads/2023/09/Llei-de-suspensio-transitoria-de-la-inversio-estrangera-en-immobles.pdf',
    tipus: 'llei',
    any: 2023
  },
  {
    id: 'llei-economia-digital',
    nom: 'Llei de l\'economia digital, l\'emprenedoria i innovació',
    url: 'https://www.ccis.ad/wp-content/uploads/2022/12/Llei-de-leconomia-digital-lemprenedoria-i-innovacio.pdf',
    tipus: 'llei',
    any: 2022
  },
  {
    id: 'decret-productes-monodosi',
    nom: 'Llista de productes d\'un sol ús que estan subjectes a reducció',
    url: 'https://www.ccis.ad/wp-content/uploads/2023/07/Decret-llista-dels-productes-de-plastic-dun-sol-us-que-estan-subjectes-a-reduccio-1.pdf',
    tipus: 'decret',
    any: 2023
  },
  {
    id: 'reglament-productes-monodosi-exempts',
    nom: 'Reglament de productes en monodosi exempts de ser prohibits',
    url: 'https://www.ccis.ad/wp-content/uploads/2023/07/Reglament-de-productes-alimentaris-en-monodosi-exempts-de-ser-prohibits-per-al-consum.pdf',
    tipus: 'reglament',
    any: 2023
  },
  {
    id: 'llei-mesures-urgents-poder-adquisitiu-2023',
    nom: 'Llei de mesures urgents per la millora del poder adquisitiu i arrendament d\'habitatges',
    url: 'https://www.ccis.ad/wp-content/uploads/2023/02/Llei-de-mesures-urgents-per-a-la-millora-del-poder-adquisitiu.pdf',
    tipus: 'llei',
    any: 2023
  },
  {
    id: 'llei-jocs-atzar',
    nom: 'Llei de regulació dels jocs d\'atzar',
    url: 'https://www.ccis.ad/wp-content/uploads/2024/12/Llei-14-2024-del-7-de-novembre-dels-jocs-datzar-2.pdf',
    tipus: 'llei',
    any: 2024
  },
  {
    id: 'llei-mesures-crisi-energetica',
    nom: 'Llei mesures crisi energètica',
    url: 'https://www.ccis.ad/wp-content/uploads/2022/12/Llei-mesures-situacio-crisi-energetica..pdf',
    tipus: 'llei',
    any: 2022
  },
  {
    id: 'llei-economia-circular',
    nom: 'Llei d\'economia circular (LEC)',
    url: 'https://www.ccis.ad/wp-content/uploads/2022/07/Llei-deconomia-circular-LEC.pdf',
    tipus: 'llei',
    any: 2022
  },
  {
    id: 'llei-representacio-digital-actius',
    nom: 'Llei de la representació digital d\'actius',
    url: 'https://www.ccis.ad/wp-content/uploads/2022/07/Llei-de-la-representacio-digital-dactius-1.pdf',
    tipus: 'llei',
    any: 2022
  },
  {
    id: 'llei-contractacio-publica',
    nom: 'Llei de contractació pública',
    url: 'https://www.ccis.ad/wp-content/uploads/2022/09/Llei-de-contractacio-publica..pdf',
    tipus: 'llei',
    any: 2022
  },
  {
    id: 'reglament-impost-estades-allotjaments',
    nom: 'Reglament de l\'impost sobre les estades en allotjamnets turístics',
    url: 'https://www.ccis.ad/wp-content/uploads/2022/07/Reglament-de-limpost-sobre-les-estades-en-allotjaments-turistics.pdf',
    tipus: 'reglament',
    any: 2022
  },
  {
    id: 'llei-arrendament-finques-urbanes',
    nom: 'Llei d\'arrendament de finques urbanes',
    url: 'https://www.ccis.ad/wp-content/uploads/2022/06/Llei-darrendament-de-finques-urbanes.pdf',
    tipus: 'llei',
    any: 2022
  },
  {
    id: 'llei-esports-electronics',
    nom: 'Llei d\'esports electrònics',
    url: 'https://www.ccis.ad/wp-content/uploads/2021/05/Llei-desports-electronics.pdf',
    tipus: 'llei',
    any: 2021
  },
  {
    id: 'reglament-plans-mobilitat-sostenible',
    nom: 'Reglament relatiu als plans de mobilitat sostenible per al personal de l\'Administració, les entitats públiques i les empreses',
    url: 'https://www.ccis.ad/wp-content/uploads/2020/12/Reglament-relatiu-als-plans-de-mobilitat-sostenible-per-al-personal-de-lAdministracio-les-entitats-publiques-i-les-empreses.pdf',
    tipus: 'reglament',
    any: 2020
  },
  {
    id: 'llei-mesures-urgents-arrendaments-2020',
    nom: 'Llei de mesures urgents en matèria d\'arrendaments de finques urbanes i de millora del poder adquisitiu',
    url: 'https://www.ccis.ad/wp-content/uploads/2020/12/Llei-de-mesures-urgents-en-materia-darrendaments-de-finques-urbanes-i-de-millora-del-poder-adquisitiu.pdf',
    tipus: 'llei',
    any: 2020
  },
  {
    id: 'llei-qualificada-immigracio',
    nom: 'Llei qualificada d\'immigració',
    url: 'https://www.ccis.ad/wp-content/uploads/2023/01/Llei-qualificada-dimmigracio-002.pdf',
    tipus: 'llei',
    any: 2023
  },
  {
    id: 'llei-tribunal-arbitratge',
    nom: 'Llei del Tribunal d\'Arbitratge d\'Andorra',
    url: 'https://www.ccis.ad/wp-content/uploads/2020/03/Llei-del-Tribunal-Arbitratge-Andorra-2.pdf',
    tipus: 'llei',
    any: 2020
  },
  {
    id: 'reglament-asseguranca-tapa',
    nom: 'Reglament de l\'import mínim de l\'assegurança de responsabilitat civil obligatòria del TAPA i dels seus àrbitres',
    url: 'https://www.ccis.ad/wp-content/uploads/2020/12/Reglament-de-limport-minim-de-lasseguranca-de-responsabilitat-civil-obligatoria-del-TAPA-1.pdf',
    tipus: 'reglament',
    any: 2020
  },
  {
    id: 'llei-serveis-pagament-diner-electronic',
    nom: 'Llei dels serveis de pagament i el diner electrònic',
    url: 'https://www.ccis.ad/wp-content/uploads/2019/02/Llei-dels-serveis-de-pagament-i-el-diner-electr%C3%B2nic.pdf',
    tipus: 'llei',
    any: 2019
  },
  {
    id: 'reglament-serveis-pagament-diner-electronic',
    nom: 'Reglament dels serveis de pagament i el diner electrònic',
    url: 'https://www.ccis.ad/wp-content/uploads/2018/11/Reglament-dels-serveis-de-pagament-i-el-diner-electr%C3%B2nic.pdf',
    tipus: 'reglament',
    any: 2018
  },
  {
    id: 'llei-control-mercaderies-sensibles',
    nom: 'Llei de control de les mercaderies sensibles',
    url: 'https://www.ccis.ad/wp-content/uploads/2025/11/Llei-de-mercaderies-sensibles.pdf',
    tipus: 'llei',
    any: 2025
  },
  {
    id: 'reglament-aplicacio-llei-mercaderies-sensibles',
    nom: 'Reglament d\'aplicació de la Llei de control de les mercaderies sensibles',
    url: 'https://www.ccis.ad/wp-content/uploads/2018/05/Reglament-daplicaci%C3%B3-de-la-Llei-de-control-de-les-mercaderies-sensibles.pdf',
    tipus: 'reglament',
    any: 2018
  },
  {
    id: 'llei-assegurances-reassegurances',
    nom: 'Llei d\'ordenació i supervisió d\'assegurances i reassegurances',
    url: 'https://www.ccis.ad/wp-content/uploads/2018/01/Llei-d%E2%80%99assegurances-i-reassegurances.pdf',
    tipus: 'llei',
    any: 2018
  },
  {
    id: 'reglament-assegurances-reassegurances',
    nom: 'Reglament de desenvolupament de la Llei d\'assegurances i reassegurances',
    url: 'https://www.ccis.ad/wp-content/uploads/2018/01/Reglament-de-desenvolupament-de-la-Llei-d%E2%80%99assegurances-i-reassegurances.pdf',
    tipus: 'reglament',
    any: 2018
  },
  {
    id: 'llei-allotjament-turistic',
    nom: 'Llei general de l\'allotjament turístic',
    url: 'https://www.ccis.ad/wp-content/uploads/2019/02/Llei-general-de-l%E2%80%99allotjament-tur%C3%ADstic.pdf',
    tipus: 'llei',
    any: 2019
  },
  {
    id: 'reglament-concursos-rifes-loteries',
    nom: 'Reglament regulador de l\'explotació de concursos, rifes i loteries',
    url: 'https://www.ccis.ad/wp-content/uploads/2017/01/reglament-regulador-de-lexplotacio-de-concursos-amb-intervencio-datzar-rifes-participacions-de-loteria-i-loteries-de-promocio-o-publicitaries.pdf',
    tipus: 'reglament',
    any: 2017
  },
  {
    id: 'reglament-casino-joc',
    nom: 'Reglament del casino de joc',
    url: 'https://www.ccis.ad/wp-content/uploads/2017/01/reglament-del-casino-de-joc.pdf',
    tipus: 'reglament',
    any: 2017
  },
  {
    id: 'llei-reestructuracio-resolucio-entitats-bancaries',
    nom: 'Llei de mesures urgents per implantar mecanismes de reestructuració i resolució d\'entitats bancàries',
    url: 'https://www.ccis.ad/wp-content/uploads/2017/01/llei-de-mesures-urgents-per-implantar-mecanismes-de-reestructuracio-i-resolucio-dentitats-bancaries.pdf',
    tipus: 'llei',
    any: 2017
  },
  {
    id: 'llei-proteccio-dades-personals',
    nom: 'Llei qualificada de protecció de dades personals',
    url: 'https://www.ccis.ad/wp-content/uploads/2024/08/llei-de-proteccio-de-dades-personal-12-2024.pdf',
    tipus: 'llei',
    any: 2024
  },
  {
    id: 'reglament-aplicacio-llei-proteccio-dades',
    nom: 'Reglament d\'aplicació de la Llei qualificada de protecció de dades personals',
    url: 'https://www.ccis.ad/wp-content/uploads/2024/08/llei-de-proteccio-de-dades-personal-12-2024.pdf',
    tipus: 'reglament',
    any: 2024
  },
  {
    id: 'llei-mesures-contra-morositat',
    nom: 'Llei de mesures contra la morositat',
    url: 'https://www.ccis.ad/wp-content/uploads/2017/01/llei-de-mesures-contra-la-morositat.pdf',
    tipus: 'llei',
    any: 2017
  },
  {
    id: 'llei-embargament',
    nom: 'Llei de l\'embargament',
    url: 'https://www.ccis.ad/wp-content/uploads/2017/01/llei-de-lembargament.pdf',
    tipus: 'llei',
    any: 2017
  },
  {
    id: 'llei-contractacio-electronica',
    nom: 'Llei contractació electrònica',
    url: 'https://www.ccis.ad/wp-content/uploads/2017/01/llei-contractacio-electronica.pdf',
    tipus: 'llei',
    any: 2017
  },
  {
    id: 'llei-arbitratge',
    nom: 'Llei d\'arbitratge',
    url: 'https://www.ccis.ad/wp-content/uploads/2020/03/Llei-darbitratge.pdf',
    tipus: 'llei',
    any: 2020
  },
  {
    id: 'llei-mediacio',
    nom: 'Llei de mediació',
    url: 'https://www.ccis.ad/wp-content/uploads/2018/04/Llei-de-mediaci%C3%B3.pdf',
    tipus: 'llei',
    any: 2018
  },
  {
    id: 'reglament-mediacio-formacio-honoraris',
    nom: 'Reglament regulador de la formació continuada, de les normes deontològiques i dels honoraris de la mediació',
    url: 'https://www.ccis.ad/wp-content/uploads/2019/12/Reglament-regulador-de-la-formaci%C3%B3-continuada-de-les-normes-deontol%C3%B2giques-i-dels-honoraris-de-la-mediaci%C3%B3-1.pdf',
    tipus: 'reglament',
    any: 2019
  },
  {
    id: 'reglament-mediador-negociacio-collectiva',
    nom: 'Reglament de la figura del mediador en la negociació col·lectiva',
    url: 'https://www.ccis.ad/wp-content/uploads/2023/05/Reglament-del-mediador-en-la-negociacio-col%C2%B7lectiva.pdf',
    tipus: 'reglament',
    any: 2023
  },
  {
    id: 'llei-proteccio-tabaquisme-passiu',
    nom: 'Llei de protecció contra el tabaquisme passiu ambiental',
    url: 'https://www.ccis.ad/wp-content/uploads/2017/01/llei-de-proteccio-contra-el-tabaquisme-passiu-ambiental.pdf',
    tipus: 'llei',
    any: 2017
  },
  {
    id: 'reglament-sales-fumadors',
    nom: 'Reglament que regula els criteris que han de complir les sales per a fumadors',
    url: 'https://www.ccis.ad/wp-content/uploads/2017/01/reglament-que-regula-els-criteris-que-han-de-complir-les-sales-per-a-fumadors.pdf',
    tipus: 'reglament',
    any: 2017
  },
  {
    id: 'reglament-foment-bosses-reutilitzables',
    nom: 'Reglament per al foment de l\'ús de les bosses reutilitzables',
    url: 'https://www.ccis.ad/wp-content/uploads/2017/01/reglament-per-al-foment-de-lus-de-les-bosses-reutilitzables.pdf',
    tipus: 'reglament',
    any: 2017
  },
  {
    id: 'llei-21-2023-tribunal-constitucional',
    nom: 'Llei 21/2023, del 23 d\'octubre, de text consolidat qualificada del Tribunal Constitucional',
    url: 'https://www.bopa.ad/bopa/2023/10/23/20231023.pdf',
    tipus: 'llei',
    any: 2023
  }
];

/**
 * Obté una norma per ID
 */
export function obtenirNorma(id: string): NormaAndorrana | undefined {
  return legislacioAndorrana.find(n => n.id === id);
}

/**
 * Obté totes les normes d'un tipus específic
 */
export function obtenirNormesPerTipus(tipus: NormaAndorrana['tipus']): NormaAndorrana[] {
  return legislacioAndorrana.filter(n => n.tipus === tipus);
}

/**
 * Obté totes les normes d'un any específic
 */
export function obtenirNormesPerAny(any: number): NormaAndorrana[] {
  return legislacioAndorrana.filter(n => n.any === any);
}
