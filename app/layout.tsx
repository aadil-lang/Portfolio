import '../styles/globals.css'
import React from 'react'
import Providers from './providers'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AskAadilLauncher } from '../components/AskAadil/AskAadilLauncher'
import { StudioCommandPalette } from '../components/studio/StudioCommandPalette'
import { MobileBottomNav } from '../components/navigation/MobileBottomNav'

export const metadata = {
  title: 'AADIL BUILDS // Mohemmed Aadil Khurshid — AI Systems Engineering Studio',
  description:
    'Online AI Engineering Studio of Mohemmed Aadil Khurshid. Stateful multi-agent systems, concurrent Python/FastAPI pipelines, grounded RAG architectures, and deterministic verification harnesses.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-[#101316] text-[#F0EEE9] selection:bg-[#203D2F] selection:text-[#A3E5C2]" suppressHydrationWarning>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-24 lg:pb-12">{children}</main>
            <Footer />
            <AskAadilLauncher />
            <StudioCommandPalette />
            <MobileBottomNav />
          </div>
        </Providers>
      </body>
    </html>
  )
}
