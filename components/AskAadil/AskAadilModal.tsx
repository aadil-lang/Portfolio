'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import {
  MessageSquare,
  Send,
  X,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Mail,
  User,
  Building,
  CheckCircle,
  AlertTriangle,
  Layers,
  ChevronRight,
  BookOpen,
  RotateCcw
} from 'lucide-react'
import { askAadil } from '@/lib/rag/askAadilAgent'
import { AgentAnswer, VisitorContext, AgentConversationState } from '@/types/rag'
import { structuredProfile } from '@/data/canonical/structuredProfile'
import { AskAadilPageContext } from '@/lib/rag/askAadilPageContext'
import { VoiceInputButton, VoicePlaybackButton } from './AskAadilVoiceControls'

interface ChatMessage {
  id: string
  sender: 'user' | 'agent'
  text: string
  answer?: AgentAnswer
  timestamp: string
}

interface AskAadilModalProps {
  isOpen: boolean
  onClose: () => void
  initialQuery?: string
  pageContext?: AskAadilPageContext
}

export function AskAadilModal({ isOpen, onClose, initialQuery, pageContext }: AskAadilModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'agent',
      text: `Hello! I’m **Ask Aadil**, a grounded conversational agent. I can answer questions about Aadil’s engineering journey, systems architectures, technical decisions, and professional background.

Every answer is strictly grounded with source provenance across:
• **Timeline** (Chronology & changing curiosity)
• **Engineering Journal** (Reasoning, what broke & discoveries)
• **Systems Archive** (Verified architectures & code specs)
• **Resume** (Concise professional context & formal titles)
• **GitHub Repositories** (Technical code evidence & test suites)

Where would you like to start?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputQuery, setInputQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDraftingContact, setIsDraftingContact] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Explicit Conversation State Model
  const [conversationState, setConversationState] = useState<AgentConversationState>({
    currentIntent: 'unknown',
    retrievedSources: [],
    retrievedLayers: [],
    visitorContext: {},
    selectedChannel: 'email',
    confirmationState: 'idle',
    executionResult: { status: 'idle', emailClientOpened: false, emailSentStatus: 'unknown' },
    turnCount: 0
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Visitor Contact Form State
  const [draftSubject, setDraftSubject] = useState('')
  const [draftBody, setDraftBody] = useState('')
  const [contactConfirmed, setContactConfirmed] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      if (initialQuery && initialQuery !== inputQuery) {
        handleSendQuery(initialQuery)
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, messages, initialQuery, onClose])

  const suggestedQueries = pageContext?.suggestedPrompts && pageContext.suggestedPrompts.length > 0
    ? pageContext.suggestedPrompts
    : [
        'Tell me about VM Copy.',
        'How did Aadil move from mathematics content into AI engineering?',
        'How does VM Copy validate generated questions?',
        'Which projects use LangGraph?',
        'What has Aadil done professionally?',
        'Tell me the complete story of VM Copy.',
        'How can I contact Aadil?'
      ]

  const handleSendQuery = async (queryText: string) => {
    const q = queryText.trim()
    if (!q || isLoading) return

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInputQuery('')
    setIsLoading(true)

    try {
      const agentRes = await askAadil(q, conversationState)
      setConversationState(agentRes.newState)

      const agentMsg: ChatMessage = {
        id: `agt-${Date.now()}`,
        sender: 'agent',
        text: agentRes.answer,
        answer: agentRes,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, agentMsg])

      // If draft generated or updated in conversation state
      if (agentRes.newState.editedDraft) {
        setDraftSubject(agentRes.newState.editedDraft.subject)
        setDraftBody(agentRes.newState.editedDraft.body)
      }

      // If contact action or draft state
      if (agentRes.newState.confirmationState === 'awaiting_confirmation') {
        setIsDraftingContact(true)
      } else if (agentRes.newState.confirmationState === 'confirmed') {
        setContactConfirmed(true)
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'agent',
        text: 'An error occurred while evaluating authoritative sources. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetConversation = async () => {
    const res = await askAadil('reset')
    setConversationState(res.newState)
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'agent',
        text: res.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])
    setIsDraftingContact(false)
    setContactConfirmed(false)
    setDraftSubject('')
    setDraftBody('')
  }

  const initiateContactDraft = (userIntent: string) => {
    setDraftSubject(`Inquiry regarding AI Systems Engineering`)
    setDraftBody(
      `Hi Aadil,\n\nI was exploring your engineering portfolio and wanted to connect regarding your work on AI systems and verification.\n\nBest regards,\n[Your Name]`
    )
    setIsDraftingContact(true)
    setContactConfirmed(false)
  }

  const handleExecuteContact = () => {
    setContactConfirmed(true)
    const destination = structuredProfile.email
    const mailtoUrl = `mailto:${destination}?subject=${encodeURIComponent(
      draftSubject
    )}&body=${encodeURIComponent(draftBody)}`

    // Real browser execution via mailto
    window.location.href = mailtoUrl
  }

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-full max-w-2xl h-full bg-[#121417] border-l border-[#2B3037] shadow-2xl flex flex-col font-sans text-[#E1E4EA]">
        {/* MODAL HEADER */}
        <div className="p-4 border-b border-[#22272E] bg-[#0E1013] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#1C242D] border border-[#3D5A6E]/50 flex items-center justify-center text-[#5A9CB5]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-[#F0F3F6] font-mono tracking-tight">
                  ASK AADIL // GROUNDED AGENT
                </h2>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#1F2F23] text-[#7EE787] border border-[#2EA043]/40">
                  RAG VERIFIED
                </span>
              </div>
              <p className="text-[11px] text-[#8B949E] mt-0.5">
                Authoritative retrieval across Timeline, Journal, Systems, Resume & GitHub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="ask-aadil-reset-btn"
              onClick={handleResetConversation}
              className="px-2 py-1 rounded hover:bg-[#21262D] text-[#8B949E] hover:text-[#C9D1D9] flex items-center gap-1 text-[11px] font-mono border border-[#30363D] transition-colors"
              title="Reset conversation state"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-[#21262D] text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
              aria-label="Close Ask Aadil"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SOURCE HEALTH INDICATOR STRIP */}
        <div className="px-4 py-2 bg-[#161B22] border-b border-[#21262D] flex items-center justify-between text-[10.5px] font-mono text-[#8B949E]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#7EE787]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7EE787]" /> Timeline
            </span>
            <span className="flex items-center gap-1 text-[#7EE787]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7EE787]" /> Journal (10 Ch.)
            </span>
            <span className="flex items-center gap-1 text-[#7EE787]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7EE787]" /> Systems (8)
            </span>
            <span className="flex items-center gap-1 text-[#7EE787]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7EE787]" /> Resume
            </span>
            <span className="flex items-center gap-1 text-[#7EE787]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7EE787]" /> GitHub
            </span>
          </div>
          <span className="text-[#5A6066]">Source Separation: STRICT</span>
        </div>

        {/* CHAT MESSAGES CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed">
          {pageContext?.contextGreeting && (
            <div className="p-3 rounded-lg bg-[#162332] border border-[#388BFD]/30 text-xs font-mono text-[#58A6FF] flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#58A6FF] shrink-0" />
                <span>
                  <strong>{pageContext.contextGreeting}</strong> Ask me about this page, Aadil&apos;s engineering decisions, or anything else in the portfolio.
                </span>
              </span>
            </div>
          )}

          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                data-sender={msg.sender}
                className={`chat-bubble chat-bubble-${msg.sender} max-w-[90%] rounded-lg p-3.5 ${
                  msg.sender === 'user'
                    ? 'bg-[#1F3142] text-[#E6EDF3] border border-[#388BFD]/30 shadow-sm'
                    : 'bg-[#161B22] text-[#C9D1D9] border border-[#30363D]'
                }`}
              >
                {/* Agent Header Tag */}
                {msg.sender === 'agent' && (
                  <div className="flex items-center justify-between border-b border-[#21262D] pb-1.5 mb-2 text-[10px] font-mono text-[#8B949E]">
                    <span className="font-bold text-[#5A9CB5] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#7EE787]" /> GROUNDED RESPONSE
                    </span>
                    <div className="flex items-center gap-2">
                      <VoicePlaybackButton messageId={msg.id} text={msg.text} />
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                )}

                {/* Message Body */}
                <div className="whitespace-pre-wrap space-y-2">{msg.text}</div>

                {/* Provenance Pills for Agent Answers */}
                {msg.answer && msg.answer.provenance.citations.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-[#21262D] text-[10px] font-mono">
                    <div className="text-[#8B949E] mb-1 font-semibold flex items-center gap-1">
                      <Layers className="w-2.5 h-2.5" /> SOURCES & PROVENANCE:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.answer.provenance.citations.map((cite, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[#0D1117] text-[#58A6FF] border border-[#1F6FEB]/40 inline-flex items-center gap-1"
                        >
                          {cite}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Action Affordances */}
                {msg.answer?.suggestedAction && (
                  <div className="mt-3 pt-2 border-t border-[#21262D] flex flex-wrap gap-2">
                    {msg.answer.suggestedAction.type === 'navigate' && (
                      <Link
                        href={msg.answer.suggestedAction.payload.url}
                        onClick={onClose}
                        className="px-3 py-1.5 rounded bg-[#162332] hover:bg-[#1E3247] text-[#58A6FF] hover:text-[#79B8FF] border border-[#388BFD]/30 font-mono text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{msg.answer.suggestedAction.label}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    )}

                    {msg.answer.suggestedAction.type === 'confirm_action' && (
                      <button
                        onClick={handleExecuteContact}
                        className="px-3.5 py-1.5 rounded bg-[#238636] hover:bg-[#2EA043] text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{msg.answer.suggestedAction.label}</span>
                      </button>
                    )}

                    {msg.answer.suggestedAction.type === 'contact_draft' && !isDraftingContact && (
                      <button
                        onClick={() => initiateContactDraft(msg.text)}
                        className="px-3 py-1.5 rounded bg-[#238636] hover:bg-[#2EA043] text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{msg.answer.suggestedAction.label}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* DRAFT -> EDIT -> CONFIRM -> EXECUTE INTERFACE */}
          {isDraftingContact && (
            <div className="p-4 rounded-lg bg-[#161B22] border border-[#238636]/50 shadow-md space-y-3 font-sans text-xs">
              <div className="flex items-center justify-between border-b border-[#21262D] pb-2 text-[11px] font-mono">
                <span className="font-bold text-[#7EE787] flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> CONTACT DRAFT // DRAFT → EDIT → CONFIRM → EXECUTE
                </span>
                <button
                  onClick={() => setIsDraftingContact(false)}
                  className="text-[#8B949E] hover:text-[#C9D1D9]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-2 rounded bg-[#0D1117] border border-[#30363D] text-[10.5px] font-mono text-[#8B949E]">
                Destination verified:{' '}
                <strong className="text-[#58A6FF]">{structuredProfile.email}</strong>
                <span className="block text-[9.5px] text-[#5A6066] mt-0.5">
                  Your edited text is authoritative. No simulated API sends.
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-[10px] font-mono text-[#8B949E] mb-0.5">
                    Subject Line:
                  </label>
                  <input
                    type="text"
                    value={draftSubject}
                    onChange={e => setDraftSubject(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] text-xs focus:outline-none focus:border-[#58A6FF]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#8B949E] mb-0.5">
                    Editable Message Body:
                  </label>
                  <textarea
                    rows={5}
                    value={draftBody}
                    onChange={e => setDraftBody(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] text-xs focus:outline-none focus:border-[#58A6FF]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#21262D]">
                <span className="text-[10px] font-mono text-[#8B949E]">
                  {contactConfirmed ? 'Opening email client...' : 'Requires explicit confirmation'}
                </span>
                <button
                  onClick={handleExecuteContact}
                  className="px-3.5 py-1.5 rounded bg-[#238636] hover:bg-[#2EA043] text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Confirm & Open Mail Client
                </button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#8B949E] font-mono p-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#58A6FF] animate-pulse" />
              Routing query and retrieving authoritative evidence...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* SUGGESTED QUERIES (WHEN CHAT HAS 1 MESSAGE) */}
        {messages.length <= 1 && (
          <div className="px-4 py-2 bg-[#0E1013] border-t border-[#21262D] space-y-1.5">
            <span className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider block">
              Suggested Inquiries:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQueries.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSendQuery(q)}
                  className="px-2.5 py-1 rounded-md bg-[#161B22] hover:bg-[#21262D] text-[#C9D1D9] hover:text-[#58A6FF] border border-[#30363D] text-[11px] transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* QUERY INPUT FORM */}
        <form
          onSubmit={e => {
            e.preventDefault()
            handleSendQuery(inputQuery)
          }}
          className="p-3 border-t border-[#21262D] bg-[#0E1013] flex items-center gap-2"
        >
          <VoiceInputButton
            disabled={isLoading}
            onTranscriptComplete={transcript => {
              setInputQuery(transcript)
              handleSendQuery(transcript)
            }}
          />

          <input
            type="text"
            placeholder="Ask by text or voice..."
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-3.5 py-2 rounded-md bg-[#161B22] border border-[#30363D] text-[#E6EDF3] placeholder-[#6E7681] text-xs focus:outline-none focus:border-[#58A6FF] transition-colors"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-3.5 py-2 rounded-md bg-[#1F6FEB] hover:bg-[#388BFD] disabled:opacity-40 disabled:hover:bg-[#1F6FEB] text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>,
    document.body
  )
}
