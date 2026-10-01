"use client"
import React, { useState } from 'react'
import { profile } from '../../data/profile'
import { Mail, Github, Linkedin, Send, CheckCircle2, Copy, Check, AlertCircle, Loader2 } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    roleOpportunity: '',
    message: ''
  })

  type FormState = 'idle' | 'submitting' | 'success' | 'validation_error' | 'server_error' | 'rate_limited'
  const [status, setStatus] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Single in-flight submission & double-click prevention
    if (status === 'submitting') return

    // Validation
    if (!formData.name.trim()) {
      setStatus('validation_error')
      setErrorMessage('Please enter your name.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setStatus('validation_error')
      setErrorMessage('Please enter a valid email address.')
      return
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatus('validation_error')
      setErrorMessage('Please enter a message (at least 5 characters).')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
      } else if (res.status === 429) {
        setStatus('rate_limited')
        setErrorMessage(data.error || 'Too many messages sent. Please try again later.')
      } else {
        setStatus('server_error')
        setErrorMessage(data.error || "We couldn't send your message right now. Please try again or use LinkedIn.")
      }
    } catch (err) {
      setStatus('server_error')
      setErrorMessage("We couldn't send your message right now. Please try again or connect directly via LinkedIn.")
    }
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyPhone = () => {
    if (profile.phone) {
      navigator.clipboard.writeText(profile.phone)
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    }
  }

  return (
    <section className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">Get in Touch</h1>
        <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
          Have an AI engineering role, an enterprise consulting engagement, or an agentic workflow project in mind? Reach out and let&apos;s build together.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8 items-start">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass p-6 rounded-xl border border-slate-800 space-y-5">
            <h3 className="font-semibold text-white text-lg">Direct Details</h3>
            
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Email</span>
              <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-purple-400 hover:text-purple-300 truncate"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email address"
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {profile.phone && (
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Mobile / Phone</span>
                <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-sm text-purple-400 hover:text-purple-300 font-mono"
                  >
                    {profile.phone}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    title="Copy phone number"
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Location & Availability</span>
              <p className="text-sm text-slate-300">{profile.location}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Profiles</span>
              <div className="flex gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition-colors"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3">
          <div className="glass p-6 md:p-8 rounded-xl border border-slate-800" id="contact-form">
            {status === 'success' ? (
              <div className="py-12 text-center space-y-4" role="status" aria-live="polite">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Received!</h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Your message has been sent to Aadil. You can also connect directly via{' '}
                  <a href={`mailto:${profile.email}`} className="text-purple-400 underline">
                    {profile.email}
                  </a> or on{' '}
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    LinkedIn
                  </a>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle')
                    setFormData({ name: '', company: '', email: '', roleOpportunity: '', message: '' })
                  }}
                  className="text-xs text-slate-400 hover:text-white underline pt-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {errorMessage && (
                  <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2" role="alert">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={status === 'submitting'}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-xs"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-medium text-slate-300 mb-1">
                      Recruiter / Company <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                      id="contact-company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      disabled={status === 'submitting'}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-xs"
                      placeholder="Acme Talent Partners"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={status === 'submitting'}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-xs"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-role" className="block text-xs font-medium text-slate-300 mb-1">
                      Role / Opportunity <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                      id="contact-role"
                      value={formData.roleOpportunity}
                      onChange={(e) => setFormData({ ...formData, roleOpportunity: e.target.value })}
                      disabled={status === 'submitting'}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-xs"
                      placeholder="Senior AI Engineer (Remote)"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-1">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={status === 'submitting'}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-xs"
                    placeholder="Tell me about your role, team, or project requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-colors shadow-lg shadow-purple-600/25 cursor-pointer text-xs"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
