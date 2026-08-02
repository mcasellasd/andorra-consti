/**
 * Regles operatives de dret planer.
 *
 * Substitueix instruccions com «utilitza les teves pròpies paraules», que no
 * funcionen: el model comprimeix la frase legal en comptes de reformular-la.
 * Aquí es donen regles verificables i un exemple contrastat, que és el que
 * realment mou el resultat.
 */

export const REGLES_DRET_PLANER = `
COM S'ESCRIU EN DRET PLANER (regles operatives, no orientacions)

1. Comença per qui fa què. Subjecte + verb + complement, en actiu.
   «L'Estat ha de vigilar que…» i no «És funció de l'Estat vetllar per…».

2. Converteix els noms abstractes en verbs. És el canvi que més s'hi nota:
   «la utilització racional del sòl» → «que el terreny es faci servir bé»
   «la prestació del servei» → «que el servei es doni»
   «l'exercici del dret» → «poder fer servir aquest dret»

3. Frases curtes: com a màxim unes 20 paraules. Una idea per frase.

4. Si un terme jurídic és imprescindible, explica'l la primera vegada:
   «recurs d'empara (la via per anar al Tribunal Constitucional quan et vulneren
   un dret fonamental)».

5. Parla a la persona lectora. «Això vol dir que…», «si et trobes en aquesta
   situació…». Evita l'impersonal constant.

6. No comencis mai copiant l'inici de l'article. Si l'article diu «Es reconeix el
   dret a…», tu comences per una altra banda.

ESTRUCTURA DEL RESUM (3 moviments, 4-6 frases en total)
   a) Què obliga o reconeix, i a qui.
   b) Per a què serveix: quin problema vol resoldre.
   c) Què significa a la pràctica per a una persona corrent.

EXEMPLE CONTRASTAT (article 30 de la Constitució)

Text oficial:
   «Es reconeix el dret a la protecció de la salut i a rebre prestacions per
    atendre altres necessitats personals. Amb aquestes finalitats, l'Estat
    garantirà un sistema de Seguretat Social.»

MALAMENT — és el mateix text amb menys paraules:
   «Es reconeix el dret a la protecció de la salut i a rebre prestacions, i
    l'Estat garanteix un sistema de Seguretat Social.»

BÉ — explica en comptes de comprimir:
   «Tothom que visqui a Andorra té dret que se li cuidi la salut i a rebre ajuda
    quan es troba en una situació de necessitat. Per fer-ho possible, l'Estat està
    obligat a mantenir un sistema de Seguretat Social: no ho pot deixar només en
    mans privades. A la pràctica, això és el fonament del sistema sanitari públic
    i de les prestacions socials. El que no fa aquest article és fixar quines
    prestacions concretes et corresponen: això ho decideixen les lleis.»

Fixa't que la versió bona canvia el subjecte, fa servir verbs en comptes de noms
abstractes, i acaba dient què NO cobreix l'article. Fes el mateix.
`.trim();
