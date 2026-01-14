/**
 * Articles d'exemple de la Constitució d'Andorra
 * Aquests són articles d'exemple per provar el sistema mentre s'extreu el text complet del PDF.
 * 
 * TODO: Reemplaçar amb articles reals extrets del PDF oficial
 */

import { ArticleAndorra } from '../types';

export const articlesConstitucioExemple: ArticleAndorra[] = [
  {
    id: 'const-art-1',
    codi: 'constitucio',
    numeracio: 'Article 1',
    llibre: 'Constitució',
    titol: 'Preàmbul',
    capitol: null,
    text_oficial: `Andorra, poble mil·lenari, amb voluntat de fer perdurar i enriquir els ideals de llibertat, justícia i democràcia que són la seva tradició, i amb la voluntat de contribuir a la realització dels ideals de pau, llibertat i cooperació entre els pobles, proclama la seva voluntat de:

- Garantir l'exercici dels drets humans i de les llibertats fonamentals dins del seu propi marc jurídic
- Consolidar i desenvolupar el seu sistema institucional propi
- Garantir una aplicació rigorosa i un control dels principis democràtics
- Mantenir les seves relacions privilegiades amb els estats veïns, dins del respecte mutu i de la sobirania
- Col·laborar amb tots els estats per a la construcció d'una Europa lliure, justa i segura
- Donar la seva contribució a la causa de la pau i de la seguretat internacionals`,
    vigencia: '1993-05-04',
    modificacions: [],
    enllacos: ['const-art-2'],
    tags: ['constitució', 'preàmbul', 'drets fonamentals'],
    idiomes: {
      ca: `Andorra, poble mil·lenari, amb voluntat de fer perdurar i enriquir els ideals de llibertat, justícia i democràcia que són la seva tradició...`,
    },
  },
  {
    id: 'const-art-2',
    codi: 'constitucio',
    numeracio: 'Article 2',
    llibre: 'Constitució',
    titol: 'Títol I - Sobirania d\'Andorra',
    capitol: null,
    text_oficial: `1. La Constitució, que és la norma suprema de l'ordre jurídic andorrà, vincula tots els poders públics i els ciutadans.

2. La Constitució garanteix els principis de llibertat, igualtat, justícia i pluralisme polític com a valors superiors de l'ordre jurídic.

3. La Constitució és directament aplicable i vincula tots els poders públics.`,
    vigencia: '1993-05-04',
    modificacions: [],
    enllacos: ['const-art-1', 'const-art-3'],
    tags: ['constitució', 'sobirania', 'ordre jurídic'],
    idiomes: {
      ca: `1. La Constitució, que és la norma suprema de l'ordre jurídic andorrà, vincula tots els poders públics i els ciutadans...`,
    },
  },
  {
    id: 'const-art-3',
    codi: 'constitucio',
    numeracio: 'Article 3',
    llibre: 'Constitució',
    titol: 'Títol I - Sobirania d\'Andorra',
    capitol: null,
    text_oficial: `1. La sobirania resideix en el poble andorrà, que l'exerceix per mitjà de les diferents classes de participació i d'òrgans que estableix aquesta Constitució.

2. Els coprínceps són, conjuntament i indivisiblement, el cap de l'Estat i n'expressen la màxima representació.

3. L'Estat andorrà és un Estat de Dret, democràtic i social.`,
    vigencia: '1993-05-04',
    modificacions: [],
    enllacos: ['const-art-2'],
    tags: ['constitució', 'sobirania', 'coprínceps', 'estat de dret'],
    idiomes: {
      ca: `1. La sobirania resideix en el poble andorrà, que l'exerceix per mitjà de les diferents classes de participació i d'òrgans que estableix aquesta Constitució...`,
    },
  },
];

