"use client"
import React, { useState } from 'react'
import { profile } from '../../data/profile'
import { Mail, Github, Linkedin, Send, CheckCircle2, Copy, Check, Phone } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setSubmitted(true)
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
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
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
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
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
          <div className="glass p-6 md:p-8 rounded-xl border border-slate-800">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Received!</h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto">
                  Thank you for reaching out, {formData.name}. You can also connect directly via{' '}
                  <a href={`mailto:${profile.email}`} className="text-purple-400 underline">
                    {profile.email}
                  </a>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', message: '' })
                  }}
                  className="text-xs text-slate-400 hover:text-white underline pt-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-slate-200 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-slate-200 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    placeholder="jane@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-slate-200 mb-1.5">
                    Message or Project Brief
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    placeholder="Tell me about your project, timeline, or requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors shadow-lg shadow-purple-600/25 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
