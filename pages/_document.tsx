import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ca">
      <Head>
        <meta name="description" content="Constitució d'Andorra, plataforma interactiva amb suport d'IA per explorar la Constitució del Principat d'Andorra." />
        <meta name="keywords" content="Constitució Andorra, lleis fonamentals, dret constitucional, Principat d'Andorra, drets fonamentals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

