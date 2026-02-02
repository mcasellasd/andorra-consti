import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

const LegalNoticePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Avís legal, privacitat i termes d&apos;ús</title>
        <meta
          name="description"
          content="Avís legal, política de privacitat, ús de cookies i termes d'ús del projecte acadèmic dretplaner.ad."
        />
      </Head>
      <Layout>
        <div className="page-container">
          <article className="legal-card">
            <header className="legal-header">
              <h1>Avís legal, privacitat i termes d&apos;ús</h1>
              <p className="legal-subtitle">
                Transparència sobre la finalitat acadèmica del projecte, el tractament de dades i les condicions
                d&apos;ús de dretplaner.ad.
              </p>
            </header>

            <section className="legal-section">
              <h2>1. Projecte acadèmic individual</h2>
              <p>
                dretplaner.ad és una iniciativa personal d&apos;un estudiant de dret. El projecte té una finalitat exclusivament acadèmica i de recerca, sense ànim de lucre,
                i explora l&apos;ús d&apos;intel·ligència artificial aplicada a la divulgació del Codi Civil d'Andorra.
              </p>
              <p>
                Aquesta plataforma no presta serveis professionals ni ofereix assessorament jurídic. Les informacions i
                explicacions proporcionades són orientatives i poden contenir errors o simplificacions. Per prendre
                decisions jurídiques, econòmiques o patrimonials cal adreçar-se a professionals titulats i col·legiats.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Contingut i responsabilitat de l&apos;usuari</h2>
              <p>
                L&apos;autor revisa i cura el contingut generat, però no pot garantir la seva exactitud absoluta ni la seva
                vigència temporal. L&apos;usuari és responsable de la interpretació i ús que faci de la informació obtinguda
                i accepta que el lloc web és només un suport didàctic inicial.
              </p>
              <p>
                Es demana explícitament no introduir dades personals ni informació sensible en els formularis o al xat.
                Qualsevol ús contrari a la normativa o a aquesta advertència és responsabilitat exclusiva de l&apos;usuari.
              </p>
            </section>

            <section className="legal-section">
              <h2>3. Responsables i contacte</h2>
              <p>
                Responsable: estudiant del Grau de Dret de la UOC (contacte:{' '}
                <a href="mailto:contacte@dretplaner.ad">contacte@dretplaner.ad</a>). Per dubtes sobre privacitat
                utilitza l&apos;adreça <a href="mailto:privacitat@dretplaner.ad">privacitat@dretplaner.ad</a>.
              </p>
            </section>

            <section className="legal-section">
              <h2>4. Política de privacitat</h2>
              <p>
                <strong>Finalitat.</strong> Es tracten exclusivament les dades introduïdes voluntàriament pels usuaris per
                generar respostes del xat i analitzar-ne l&apos;ús de forma agregada, sempre amb finalitat acadèmica i sense
                explotació comercial.
              </p>
              <p>
                <strong>Base jurídica.</strong> Interès legítim de recerca (art. 6.1.f RGPD) i consentiment informat de
                l&apos;usuari, que confirma haver llegit aquesta informació abans d&apos;enviar consultes.
              </p>
              <p>
                <strong>Dades tractades i minimització.</strong> No es recullen dades identificatives de manera
                proactiva. Les preguntes enviades poden contenir dades personals, però s&apos;insisteix a evitar-ho.
              </p>
              <p>
                <strong>Emmagatzematge de converses.</strong> Les converses del xat es guarden <strong>únicament al navegador de l&apos;usuari</strong> 
                (sessionStorage) durant la sessió activa i s&apos;esborren automàticament en tancar la pestanya o el navegador. 
                <strong>No hi ha cap base de dades al servidor</strong> que emmagatzemi missatges o converses. El projecte no disposa 
                de sistema de comptes ni seguiment d&apos;usuaris.
              </p>
              <p>
                <strong>Processament temporal.</strong> Quan envies una consulta, aquesta es processa temporalment al servidor 
                per generar la resposta i després es descarta. No es conserven registres de consultes al nostre servidor. 
                Els proveïdors de models d&apos;IA (Groq) poden mantenir logs temporals segons les seves pròpies polítiques de retenció.
              </p>
              <p>
                <strong>Destinataris i transferències.</strong> Les peticions del xat es processen mitjançant l&apos;API
                de Groq (Groq, Inc., EUA) utilitzant el model Llama-3.3-70B-Versatile. La transferència internacional s&apos;empara en clàusules contractuals
                tipus de la Comissió Europea i les garanties complementàries de Groq. No es comparteixen dades amb
                altres tercers.
              </p>
              <p>
                <strong>Drets.</strong> Pots exercir els drets d&apos;accés, rectificació, supressió, limitació, oposició i
                portabilitat escrivint a <a href="mailto:privacitat@dretplaner.ad">privacitat@dretplaner.ad</a>. També pots
                presentar reclamacions davant l'autoritat de protecció de dades d'Andorra.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Cookies i emmagatzematge local</h2>
              <p>
                El projecte utilitza emmagatzematge local del navegador per a funcionalitats tècniques:
              </p>
              <ul>
                <li>
                  <strong>sessionStorage</strong>: Guarda els missatges del xat durant la sessió activa. S&apos;esborra automàticament 
                  en tancar la pestanya o el navegador.
                </li>
                <li>
                  <strong>localStorage</strong>: Recorda el consentiment de privacitat i preferències de l&apos;usuari (com ara 
                  la supressió d&apos;avisos interns). Persisteix fins que l&apos;usuari esborra les dades del navegador.
                </li>
              </ul>
              <p>
                No s&apos;empren cookies publicitàries ni de tercers. Pots esborrar o bloquejar aquestes dades des de la configuració 
                del teu navegador; l&apos;experiència pot veure&apos;s limitada si ho fas. També pots esborrar la conversa actual 
                utilitzant el botó &quot;Netejar xat&quot; dins del xat.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Condicions d&apos;ús</h2>
              <p>
                L&apos;accés a dretplaner.ad és gratuït. L&apos;usuari es compromet a fer-ne un ús responsable, a no introduir
                continguts il·lícits ni dades de tercers i a respectar les indicacions de privacitat. Ens reservem el dret
                de restringir l&apos;accés en cas d&apos;ús abusiu o fraudulent.
              </p>
              <p>
                El material divulgatiu es publica sota llicència Creative Commons BY-NC-SA 4.0, excepte els textos legals
                del Codi Civil d'Andorra, que són de domini públic. Cal citar la font i mantenir el caràcter no
                comercial en qualsevol reutilització.
              </p>
              <p>
                Aquestes condicions es regeixen pel dret andorrà. Qualsevol controvèrsia es sotmet als jutjats i
                tribunals d'Andorra.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Compliment amb la Llei d&apos;Intel·ligència Artificial de la UE (AI Act)</h2>
              <p>
                Aquest sistema està classificat com a <strong>risc limitat</strong> segons el Reglament (UE) 2024/1689
                de l&apos;Intel·ligència Artificial (AI Act) i implementa validació automàtica per garantir la
                transparència i el compliment legal en totes les respostes generades.
              </p>

              <h3>7.1. Models utilitzats</h3>
              <ul>
                <li>
                  <strong>Generació de text</strong>: Llama-3.3-70B-Versatile (Groq, Inc.)
                </li>
                <li>
                  <strong>Embeddings</strong>: XLM-RoBERTa-base (executat localment) o text-embedding-3-large (OpenAI OpCo, LLC) si s&apos;utilitza aquesta opció
                </li>
              </ul>

              <h3>7.2. Classificació de risc</h3>
              <p>
                El sistema està classificat com a <strong>risc limitat</strong> perquè:
              </p>
              <ul>
                <li>Sistema educatiu/acadèmic sense finalitat comercial</li>
                <li>No pren decisions autònomes que afectin drets fonamentals</li>
                <li>Requereix supervisió humana (recomana consultar professionals)</li>
                <li>No s&apos;utilitza en sectors crítics (sanitat, seguretat, etc.)</li>
                <li>Implementa tots els requisits de transparència de l&apos;Article 50 de l&apos;AI Act</li>
              </ul>

              <h3>7.3. Sistema de validació automàtica</h3>
              <p>
                Cada resposta generada passa automàticament per <strong>5 checks bàsics</strong> de compliment amb
                l&apos;AI Act:
              </p>
              <ol>
                <li>
                  <strong>Divulgació d&apos;IA</strong> (25 punts): Verifica que la resposta indica explícitament que
                  ha estat generada per intel·ligència artificial.
                </li>
                <li>
                  <strong>Menció del model</strong> (20 punts): Comprova que es menciona el model o proveïdor
                  utilitzat (Llama-3.3-70B-Versatile de Groq, Inc.).
                </li>
                <li>
                  <strong>Advertències sobre limitacions</strong> (20 punts): Verifica que la resposta inclou
                  advertències adequades sobre les seves limitacions (informació orientativa, pot contenir errors).
                </li>
                <li>
                  <strong>Recomanació de supervisió humana</strong> (20 punts): Garanteix que es recomana consultar
                  professionals titulats (advocats, notaris) per a decisions jurídiques importants.
                </li>
                <li>
                  <strong>Clarificació que no és assessorament legal</strong> (15 punts): Deixa clar que la resposta
                  no constitueix assessorament legal professional.
                </li>
              </ol>

              <p>
                El sistema calcula un <strong>score de compliment</strong> (0-100 punts). Respostes amb un score
                ≥80 punts es consideren complients amb l&apos;AI Act. Si alguna verificació falla, es generen
                advertències específiques.
              </p>

              <h3>7.4. Transparència i informació</h3>
              <p>
                Totes les respostes generades per IA inclouen informació sobre:
              </p>
              <ul>
                <li>El caràcter orientatiu de la informació</li>
                <li>Les limitacions possibles (errors, simplificacions)</li>
                <li>La recomanació de consultar professionals per casos específics</li>
                <li>La clarificació que no constitueix assessorament legal</li>
                <li>El model d&apos;IA utilitzat (Llama-3.3-70B-Versatile de Groq, Inc.)</li>
              </ul>

              <p>
                Aquestes mesures garanteixen la <strong>transparència</strong> requerida per l&apos;Article 50 de
                l&apos;AI Act, que s&apos;aplica des de l&apos;entrada en vigor del reglament (1 d&apos;agost de 2024).
              </p>
            </section>

            <section className="legal-section">
              <h2>8. Actualitzacions</h2>
              <p>
                Aquesta informació legal es revisa periòdicament per adaptar-la a canvis legislatius o tècnics. Última
                actualització: Gener 2025.
              </p>
            </section>
          </article>
        </div>
      </Layout>
    </>
  );
};

export default LegalNoticePage;

