import type React from "react"
import type { Metadata } from "next"
import { Source_Sans_3, Source_Serif_4 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
})

const _sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
})

export const metadata: Metadata = {
  title: "Prudència.cat · Codi Civil de Catalunya",
  description: "Plataforma de consulta del dret civil català amb eines d'intel·ligència artificial",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ca">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
