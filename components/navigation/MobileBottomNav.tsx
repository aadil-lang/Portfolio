'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Terminal, Layers, BookOpen, User, Sparkles } from 'lucide-react'

interface NavTab {
  name: string
  href: string
  icon: React.ElementType
  matchPrefix?: string
}

const TABS: NavTab[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Work', href: '/systems', icon: Terminal, matchPrefix: '/projects' },
  { name: 'Systems', href: '/architecture', icon: Layers },
  { name: 'Journal', href: '/journal', icon: BookOpen },
  { name: 'About', href: '/about', icon: User, matchPrefix: '/experience' }
]

export function MobileBottomNav() {
  const pathname = usePathname()

  const handleOpenAskAadil = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-ask-aadil'))
    }
  }

  return (
    <nav
      aria-label="Mobile Studio Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-[#262B32] bg-[#0E1114]/95 backdrop-blur-xl transition-all shadow-[0_-10px_25px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-md mx-auto px-3 py-1.5 flex items-center justify-around pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {TABS.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== '/' && pathname?.startsWith(tab.href)) ||
            (tab.matchPrefix && pathname?.startsWith(tab.matchPrefix))
          const Icon = tab.icon

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center justify-center min-w-[54px] min-h-[46px] rounded-xl transition-all relative py-1 px-1.5 ${
                isActive
                  ? 'text-[#78C29A]'
                  : 'text-[#8B949E] hover:text-[#C9D1D9] active:scale-95'
              }`}
            >
              {/* Active glow pill */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 w-6 h-0.5 rounded-full bg-[#78C29A] shadow-[0_0_8px_#78C29A]"
                />
              )}

              <Icon className={`w-5 h-5 mb-0.5 transition-transform ${isActive ? 'scale-110 text-[#78C29A]' : ''}`} />
              <span className={`text-[10px] font-mono tracking-tight font-medium ${isActive ? 'font-bold text-[#E6EDF3]' : ''}`}>
                {tab.name}
              </span>
            </Link>
          )
        })}

        {/* Quick Ask Aadil Agent launcher action */}
        <button
          onClick={handleOpenAskAadil}
          aria-label="Open Ask Aadil Conversational Agent"
          className="flex flex-col items-center justify-center min-w-[54px] min-h-[46px] rounded-xl text-[#58A6FF] hover:text-[#79B8FF] active:scale-95 py-1 px-1.5 transition-all"
        >
          <Sparkles className="w-5 h-5 mb-0.5 animate-pulse text-[#78C29A]" />
          <span className="text-[10px] font-mono tracking-tight font-bold text-[#78C29A]">
            Ask
          </span>
        </button>
      </div>
    </nav>
  )
}
