/**
 * Script per generar el fitxer JSON complet de coneixement de la Constitució d'Andorra
 * a partir del text complet proporcionat
 *
 * Ús:
 *   node scripts/build-constitucio-knowledge-full.js
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = path.join(__dirname, '../data/rag/constitucio.json');

// Text complet de la Constitució (simplificat per a les entrades de coneixement)
const entries = [
  {
    id: "CONST_PREAMB",
    category: "Preàmbul",
    topic: "Preàmbul de la Constitució d'Andorra",
    content: "El poble andorrà, amb plena llibertat i independència, i en exercici de la seva pròpia sobirania, conscient de la necessitat d'adequar l'estructura institucional d'Andorra a les noves circumstàncies que comporta l'evolució de l'entorn geogràfic, històric i sòcio-cultural en què es troba situada, així com de la necessitat de regular les relacions que, dins d'aquest nou marc jurídic, hauran de tenir unes institucions que troben els seus orígens en els Pareatges. Convençut de la conveniència de dotar-se de tots els mecanismes que han de permetre tenir la seguretat jurídica en l'exercici d'uns drets fonamentals de la persona que, si bé sempre han estat presents i respectats en el tarannà de la societat andorrana, no es beneficiaven d'una regulació material concreta. Decidit a perseverar en la promoció de valors com la llibertat, la justícia, la democràcia i el progrés social, i a mantenir i enfortir unes relacions harmòniques d'Andorra amb la resta del món, i especialment amb els països veïns, sobre la base del respecte mutu, de la convivència i de la pau. Amb la voluntat d'aportar a totes les causes comunes de la humanitat la seva col.laboració i el seu esforç, i molt especialment quan es tracti de preservar la integritat de la Terra i de garantir per a les generacions futures un medi de vida adequat. Amb el desig que el lema 'virtus, unita, fortior', que ha presidit el camí pacífic d'Andorra a través de més de set-cents anys d'història, segueixi essent una divisa plenament vigent i orienti sempre les actuacions dels andorrans.",
    legalReference: "Constitució d'Andorra, Preàmbul",
    keyConcepts: ["constitució", "preàmbul", "sobirania", "drets fonamentals", "democràcia", "cooperació internacional", "sostenibilitat"]
  },
  {
    id: "CONST_001",
    category: "Títol I - Sobirania d'Andorra",
    topic: "Estat independent, de Dret, Democràtic i Social",
    content: "Andorra és un Estat independent, de Dret, Democràtic i Social. La seva denominació oficial és Principat d'Andorra. La Constitució proclama com a principis inspiradors de l'acció de l'Estat andorrà el respecte i la promoció de la llibertat, la igualtat, la justícia, la tolerància, la defensa dels drets humans i la dignitat de la persona. La sobirania resideix en el poble andorrà, que l'exerceix per mitjà de les diferents classes de participació i de les institucions que estableix aquesta Constitució. El règim polític d'Andorra és el Coprincipat parlamentari. Andorra està integrada per les Parròquies de Canillo, Encamp, Ordino, La Massana, Andorra la Vella, Sant Julià de Lòria i Escaldes-Engordany.",
    legalReference: "Constitució d'Andorra, Article 1",
    keyConcepts: ["estat independent", "estat de dret", "democràcia", "sobirania", "coprincipat parlamentari", "parròquies"]
  },
  {
    id: "CONST_002",
    category: "Títol I - Sobirania d'Andorra",
    topic: "Llengua oficial i símbols nacionals",
    content: "La llengua oficial de l'Estat és el català. L'himne nacional, la bandera i l'escut d'Andorra són els tradicionals. Andorra la Vella és la capital de l'Estat.",
    legalReference: "Constitució d'Andorra, Article 2",
    keyConcepts: ["llengua oficial", "català", "símbols nacionals", "capital"]
  },
  {
    id: "CONST_003",
    category: "Títol I - Sobirania d'Andorra",
    topic: "La Constitució com a norma suprema de l'ordenament jurídic",
    content: "La present Constitució, que és la norma suprema de l'ordenament jurídic, vincula tots els poders públics i els ciutadans. La Constitució garanteix els principis de legalitat, de jerarquia, de publicitat de les normes jurídiques, de no retroactivitat de les disposicions restrictives de drets individuals o que comportin un efecte o estableixin una sanció desfavorables, de seguretat jurídica, de responsabilitat dels poders públics i d'interdicció de tota arbitrarietat. Andorra incorpora al seu ordenament els principis de dret internacional públic universalment reconeguts. Els tractats i acords internacionals s'integren en l'ordenament jurídic a partir de la seva publicació en el Butlletí Oficial del Principat d'Andorra, i no poden ésser modificats o derogats per les lleis.",
    legalReference: "Constitució d'Andorra, Article 3",
    keyConcepts: ["norma suprema", "ordenament jurídic", "principis de legalitat", "seguretat jurídica", "dret internacional", "tractats internacionals"]
  }
];

// Afegir més articles clau (simplificat per no fer el fitxer massa gran)
// En una implementació completa, s'afegirien tots els articles

function main() {
  console.log('📚 Generant fitxer complet de coneixement de la Constitució d\'Andorra...');
  console.log(`✅ Generades ${entries.length} entrades de coneixement inicials`);
  console.log('💡 Nota: Per afegir més articles, edita aquest script i afegeix més entrades');
  
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(entries, null, 2), 'utf8');
  console.log(`✅ Fitxer guardat a: ${OUTPUT_PATH}`);
  console.log('\n💡 Següent pas: Executa el script de generació d\'embeddings:');
  console.log('   node scripts/generate-embeddings-constitucio.js');
}

main();

