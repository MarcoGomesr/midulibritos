import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "📚 MiduLibritos",
  description: "Los Libros de midu prueba técnica"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="grid min-h-screen grid-rows-[60px,1fr,60px] gap-4">
        <main className="m-auto flex h-full  w-full max-w-screen-lg flex-col items-center justify-between px-4">
          <nav className="flex items-center text-2xl">📚 Libros</nav>
          <section>{children}</section>
          <footer className="flex items-center justify-center">
            Con ♥️ MarcoGomes
          </footer>
        </main>
      </body>
    </html>
  )
}
