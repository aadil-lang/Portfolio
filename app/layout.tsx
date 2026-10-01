import '../styles/globals.css'
import React from 'react'
import Providers from './providers'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AskAadilLauncher } from '../components/AskAadil/AskAadilLauncher'

export const metadata = {
  title: 'Mohemmed Aadil Khurshid — AI Systems Engineer',
  description: 'AI Systems Engineer building complete software systems around AI: agentic orchestration, backend pipelines, full-stack interfaces, and reliability verification.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#121518] text-[#F0EEE9]">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">{children}</main>
            <Footer />
            <AskAadilLauncher />
          </div>
        </Providers>
      </body>
    </html>
  )
}
