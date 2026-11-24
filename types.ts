export type FailureModeItem = {
  failure: string
  cause: string
  detection: string
  response: string
}

export type SystemLayerItem = {
  layer: string
  components: string
  details: string
}

export type OwnershipClassification =
  | 'WAYGROUND · INDEPENDENT BUILD'
  | 'WAYGROUND · TEAM PROJECT'
  | 'INDEPENDENT · PERSONAL BUILD'
  | 'INDEPENDENT · HACKATHON PROJECT'

export type OwnershipCategory =
  | 'wayground-independent'
  | 'wayground-team'
  | 'personal-independent'
  | 'hackathon'

export type CodeEvidenceOwnership =
  | 'BUILT INDEPENDENTLY'
  | 'PROFESSIONAL SYSTEM'
  | 'TEAM SYSTEM'
  | 'MY CONTRIBUTION'

export type CodeEvidenceResult = {
  input?: string
  result?: string
  verification?: string
}

export type CodeEvidence = {
  id: string
  title: string
  decision: string
  explanation: string
  language: string
  code: string
  sourcePath?: string
  lineRange?: string
  ownership: CodeEvidenceOwnership
  sourceUrl?: string
  evidence?: string[]
  evidenceResult?: CodeEvidenceResult
  principle?: string
}

export type Project = {
  id: string
  slug: string
  title: string
  subtitle?: string
  tagline?: string
  summary: string
  type?: string
  ownershipLabel: OwnershipClassification
  ownershipCategory: OwnershipCategory
  github?: string | null
  demo?: string | null
  technologies?: string[]
  problem?: string
  solution?: string
  keyFeatures?: string[]
  architecturePattern?: 'atlas' | 'textile' | 'taskmanager' | 'overview' | 'reliability' | 'eda' | 'qgen' | 'worksheets' | 'etl' | 'ask-aadil' | 'solace' | 'ocr'
  statusNotice?: string
  systemLayers?: SystemLayerItem[]
  context?: string
  criticalDecision?: string
  whatBroke?: FailureModeItem[]
  whatBecameDeterministic?: string
  evidence?: string[]
  tradeoffs?: string[]
  breakthrough?: string
  delta?: string
  codeEvidence?: CodeEvidence[]
  videoDemo?: ProjectVideoDemo
}

export type VideoSourceType = 'hosted' | 'youtube' | 'vimeo' | 'loom'

export interface VideoChapter {
  time: string
  title: string
  description?: string
}

export interface ProjectVideoDemo {
  /** Video source: URL (https://...), relative path (/videos/...), or embed URL/ID */
  source: string
  /** Source classification: 'hosted' for native HTML5 video, or embed provider */
  sourceType: VideoSourceType
  /** Section heading override (defaults to "See It in Action") */
  title?: string
  /** Eyebrow badge (e.g. "PRODUCT WALKTHROUGH // PIXEL 7 ANDROID 16") */
  eyebrow?: string
  /** Short technical description of what the walkthrough demonstrates */
  description: string
  /** Optional poster image frame */
  poster?: string
  /** Optional duration or technical format pill (e.g. "4:59 • 1080p 60fps") */
  duration?: string
  /** Optional caption rendered beneath player */
  caption?: string
  /** Optional aspect ratio override (defaults to '16/9') */
  aspectRatio?: '16/9' | '4/3' | '9/16'
  /** Optional chapters */
  chapters?: VideoChapter[]
}

export type TimelineItem = {
  id: string
  period: string
  title: string
  organization?: string
  role?: string
  category?: 'Hackathon Project' | 'Independent Engineering Project' | 'Independent Personal Project' | 'Professional Employment' | string
  layerAnnotation: string
  summary: string
  details?: string[]
  technologies?: string[]
  journalChapterRef?: number
  systemSlugRef?: string
  isQuieter?: boolean
  isMilestone?: boolean
  isEnd?: boolean
  milestoneNumber?: number
  isWaygroundSubMilestone?: boolean
  causalChain?: string
  capability?: string
  transition?: string
}

export type ExperienceItem = TimelineItem


export type Chapter = {
  id: string
  number: string
  title: string
  subtitle: string
  layer: string
  ownershipLabel?: OwnershipClassification
  timeline: string
  context: string
  problem: string
  solution: string
  architectureDescription: string
  breakthrough: string
  criticalDecision?: string
  whatBroke?: FailureModeItem[]
  whatBecameDeterministic?: string
  tradeoffs?: string[]
  failuresAndTradeoffs: string[]
  evidenceAndMetrics: string[]
  accumulatedCapability: string
  technologies: string[]
  slug: string
  statusNotice?: string
}
export type Epilogue = {
  title: string
  subtitle: string
  thesis: string
  principles: Array<{
    title: string
    description: string
  }>
  conclusion: string
}

export * from './types/rag'
