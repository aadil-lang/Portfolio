'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Film,
  Play,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Video
} from 'lucide-react'
import { ProjectVideoDemo as VideoDemoType, VideoSourceType, VideoChapter } from '../../types'
import { isValidVideoDemo } from '../../lib/videoDemo'
export { isValidVideoDemo }

export interface ProjectVideoDemoProps {
  demo?: VideoDemoType
  projectTitle: string
  projectSlug?: string
  variant?: 'full' | 'card'
  className?: string
}

/**
 * Resolves standard third-party embed URLs into responsive iframe src URLs.
 */
export function resolveEmbedUrl(source: string, type: VideoSourceType): string | null {
  if (!source || !source.trim()) return null

  const trimmed = source.trim()

  if (type === 'youtube') {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
    const match = trimmed.match(regExp)
    const videoId = match ? match[1] : trimmed
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`
  }

  if (type === 'vimeo') {
    const regExp = /(?:vimeo\.com\/)(\d+)/i
    const match = trimmed.match(regExp)
    const videoId = match ? match[1] : trimmed
    return `https://player.vimeo.com/video/${videoId}?dnt=1`
  }

  if (type === 'loom') {
    const regExp = /(?:loom\.com\/share\/)([a-zA-Z0-9]+)/i
    const match = trimmed.match(regExp)
    const videoId = match ? match[1] : trimmed
    return `https://www.loom.com/embed/${videoId}?hide_owner=true&hide_share=true&hide_title=true`
  }

  return null
}


export default function ProjectVideoDemo({
  demo,
  projectTitle,
  projectSlug,
  variant = 'full',
  className = ''
}: ProjectVideoDemoProps) {
  const [activeChapter, setActiveChapter] = useState<number | null>(null)
  const [hasError, setHasError] = useState<boolean>(false)

  // Full page view requires a valid, actionable video source; omit if absent
  if (variant === 'full' && !isValidVideoDemo(demo)) {
    return null
  }

  // Card view with no demo at all
  if (!demo) {
    return null
  }

  const {
    source,
    sourceType = 'hosted',
    title = 'See It in Action',
    eyebrow,
    description,
    poster,
    duration,
    caption,
    aspectRatio = '16/9',
    chapters
  } = demo

  const hasValidSource = isValidVideoDemo(demo)
  const isEmbed = sourceType !== 'hosted'
  const embedUrl = isEmbed && hasValidSource ? resolveEmbedUrl(source, sourceType) : null

  const aspectClass =
    aspectRatio === '4/3'
      ? 'aspect-4/3'
      : aspectRatio === '9/16'
      ? 'aspect-[9/16]'
      : 'aspect-video'

  // Card Variant (for Homepage curated showcase)
  if (variant === 'card') {
    const detailRoute = projectSlug ? `/projects/${projectSlug}` : '#'

    return (
      <article
        className={`p-5 sm:p-6 rounded-xl bg-[#14171A] border border-[#262B32] hover:border-[#388BFD]/40 transition-all flex flex-col justify-between space-y-4 ${className}`}
      >
        <div className="space-y-3">
          {/* Eyebrow & Duration */}
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[#18261F] text-[#5A9A78] font-bold border border-[#234030] uppercase tracking-wider">
              {eyebrow || 'VERIFIED WALKTHROUGH'}
            </span>
            {duration ? (
              <span className="text-[#858A90] font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#71899A]" />
                {duration}
              </span>
            ) : !hasValidSource ? (
              <span className="text-[#D48A63] font-semibold flex items-center gap-1">
                <Video className="w-3 h-3 text-[#D48A63]" />
                RECORDING STANDBY
              </span>
            ) : null}
          </div>

          {/* Project Title */}
          <h3 className="font-serif font-bold text-lg text-[#F0EEE9]">
            <Link
              href={detailRoute}
              className="hover:text-[#5A9A78] transition-colors inline-flex items-center gap-1.5"
            >
              <span>{title || projectTitle}</span>
            </Link>
          </h3>

          <p className="text-xs text-[#9EA4AA] leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Video Player or Clean Pending Container in Card */}
          <div className={`relative rounded-lg overflow-hidden border border-[#262B32] bg-[#0D151C] shadow-lg ${aspectClass}`}>
            {hasValidSource ? (
              isEmbed && embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={`${projectTitle} Video Demonstration`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0 bg-black"
                />
              ) : (
                <video
                  controls
                  preload="none"
                  poster={poster}
                  aria-label={`${projectTitle} Video Demonstration`}
                  className="w-full h-full object-contain bg-black"
                  playsInline
                  onError={() => setHasError(true)}
                >
                  <source src={source} type="video/mp4" />
                  <p className="p-4 text-xs font-mono text-[#9EA4AA]">
                    Your browser does not support HTML5 video playback.
                  </p>
                </video>
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-[#101418] border border-dashed border-[#2A313C]">
                <div className="w-10 h-10 rounded-full bg-[#182028] border border-[#2E3744] flex items-center justify-center text-[#71899A]">
                  <Film className="w-5 h-5 text-[#5A9A78]" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-mono font-bold text-[#D8D6D0]">
                    Walkthrough Recording Standby
                  </p>
                  <p className="text-[11px] font-mono text-[#858A90] max-w-xs leading-relaxed">
                    Infrastructure verified. Recording awaiting repository asset ingestion. Full interactive specifications and code evidence available below.
                  </p>
                </div>
              </div>
            )}
          </div>

          {caption && (
            <p className="text-[11px] font-mono text-[#858A90] leading-snug pt-1">
              {caption}
            </p>
          )}
        </div>

        {/* Action Link to Full Case Study */}
        {projectSlug && (
          <div className="pt-3 border-t border-[#22272E] text-xs font-mono flex items-center justify-between">
            <Link
              href={detailRoute}
              className="text-[#58A6FF] hover:text-[#79B8FF] transition-colors font-semibold inline-flex items-center gap-1 group"
            >
              <span>Explore Full Architecture & Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </article>
    )
  }

  // Full Variant (for Individual Project Detail Pages)
  return (
    <div
      className={`rounded-xl border border-[#262B32] bg-[#14171A] p-5 sm:p-6 space-y-5 shadow-xl ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-[#242930] gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5A9A78] animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-mono text-[#5A9A78] font-bold">
              {eyebrow || 'SYSTEM DEMONSTRATION // LIVE WALKTHROUGH'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F0EEE9] font-serif">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-[#9EA4AA] leading-relaxed max-w-3xl pt-0.5">
            {description}
          </p>
        </div>

        {duration && (
          <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0 font-mono text-[11px] px-3 py-1.5 rounded-lg bg-[#181C21] border border-[#2A2F36] text-[#71899A]">
            <Film className="w-3.5 h-3.5 text-[#5A9A78]" />
            <span>{duration}</span>
          </div>
        )}
      </div>

      {/* Video Container */}
      <div className={`relative rounded-xl overflow-hidden border border-[#262B32] bg-[#0D151C] shadow-2xl ${aspectClass}`}>
        {hasError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-[#121518]">
            <AlertCircle className="w-8 h-8 text-[#D48A63]" />
            <p className="text-xs font-mono text-[#C8C6BF] max-w-md">
              Unable to load the video stream. Please check your network connection or inspect the repository directly.
            </p>
          </div>
        ) : isEmbed && embedUrl ? (
          <iframe
            src={embedUrl}
            title={`${projectTitle} Video Walkthrough`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0 bg-black"
          />
        ) : (
          <video
            controls
            preload="metadata"
            poster={poster}
            aria-label={`${projectTitle} Guided Video Walkthrough`}
            className="w-full h-full object-contain bg-black"
            playsInline
            onError={() => setHasError(true)}
          >
            <source src={source} type="video/mp4" />
            <p className="p-4 text-xs font-mono text-[#9EA4AA]">
              Your browser does not support HTML5 video playback.
            </p>
          </video>
        )}
      </div>

      {/* Caption Note */}
      {caption && (
        <div className="p-3 rounded-lg bg-[#181C21] border border-[#2A2F36] flex items-start gap-2.5 text-xs text-[#9EA4AA] leading-relaxed">
          <CheckCircle2 className="w-4 h-4 text-[#5A9A78] shrink-0 mt-0.5" />
          <span>{caption}</span>
        </div>
      )}

      {/* Optional Chapter Index */}
      {chapters && chapters.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#71899A] font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#5A9A78]" />
              <span>Walkthrough Milestones:</span>
            </span>
            <span className="text-[11px] font-mono text-[#858A90]">
              {chapters.length} Chapters
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {chapters.map((ch, idx) => {
              const isSelected = activeChapter === idx
              return (
                <button
                  key={ch.title}
                  type="button"
                  onClick={() => setActiveChapter(idx)}
                  className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#5A9A78] bg-[#18261F] text-[#F0EEE9] shadow-xs'
                      : 'border-[#262B32] bg-[#181C21] text-[#9EA4AA] hover:border-[#3E4652] hover:text-[#C8C6BF]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-[#5A9A78]">{ch.time}</span>
                      <span className="text-[9px] font-mono text-[#71899A]">Scene 0{idx + 1}</span>
                    </div>
                    <h4 className="font-serif font-bold text-xs line-clamp-1">{ch.title}</h4>
                  </div>
                  {ch.description && (
                    <p className="text-[10.5px] mt-1.5 leading-snug line-clamp-2 text-[#858A90]">
                      {ch.description}
                    </p>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
