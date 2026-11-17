export type SourceType =
  | 'portfolio'
  | 'resume'
  | 'linkedin'
  | 'github'
  | 'structured_profile'
  | 'code_evidence'
  | 'quantitative_claim'
  | 'canonical_record'
  | 'knowledge_base'

export type PortfolioLayer =
  | 'timeline'
  | 'journal'
  | 'system'
  | 'resume'
  | 'canonical'
  | 'none'

export type OwnershipType =
  | 'independent'
  | 'team'
  | 'contribution'
  | 'professional'
  | 'hackathon'

export type AuthorityType =
  | 'primary'
  | 'secondary'
  | 'contextual'
  | 'unverified'

export type QueryIntent =
  | 'identity'
  | 'overview'
  | 'about'
  | 'projects'
  | 'project_overview'
  | 'technology'
  | 'timeline'
  | 'narrative'
  | 'technical'
  | 'contribution'
  | 'current_focus'
  | 'foundations'
  | 'contact'
  | 'cross_source'
  | 'unknown'
  | 'professional'
  | 'chronology'

export type VerificationStatus =
  | 'verified'
  | 'unverified'
  | 'needs_review'

export type AuditStatus =
  | 'CONSISTENT'
  | 'CONFLICT'
  | 'MISSING'
  | 'UNVERIFIED'
  | 'STALE'

export interface QuantitativeClaimItem {
  id: string
  claim: string
  projectSlug?: string
  metricValue: string | number
  unit?: string
  claimedIn: Array<{
    source: SourceType
    layer?: PortfolioLayer
    ref: string
  }>
  status: VerificationStatus
  evidenceSource?: string
  verificationDetails: string
}

export interface ProjectMetadata {
  slug: string
  title: string
  summary?: string
  problem?: string
  dates?: {
    start?: string
    end?: string
  }
  ownership: OwnershipType
  role?: string
  technologies: string[]
  portfolioRefs: {
    timeline?: string[]
    journal?: string[]
    system?: string
  }
  externalRefs?: {
    github?: string | null
    linkedin?: string | null
  }
  evidence?: string[]
  quantitativeClaims?: QuantitativeClaimItem[]
  lastVerified?: string
}

export interface SourceChunkMetadata {
  source_type: SourceType
  source_id: string
  source_title: string
  source_url: string
  portfolio_layer: PortfolioLayer
  project?: string
  chapter?: string
  section?: string
  ownership?: string
  ownershipClassification?: 'SYSTEM_CAPABILITY' | 'AADIL_CONTRIBUTION' | 'TEAM_OWNERSHIP' | 'INDEPENDENT_BUILD'
  date?: string
  technologies?: string[]
  content_type: 'narrative' | 'architecture' | 'spec' | 'code' | 'metric' | 'profile' | 'experience' | 'code_evidence' | 'quantitative_claim' | 'canonical_record' | 'principle'
  authority_type: AuthorityType
  last_verified: string
  sourcePath?: string
  lineRange?: string
  language?: string
  decision?: string
  principle?: string
  codeSnippet?: string
  quantitativeData?: {
    metricValue: string | number
    unit?: string
    claim: string
    evidenceSource?: string
    verificationDetails?: string
  }

  // Canonical Grounding Extensions (Phase 2.5)
  canonicalCareerIds?: string[]
  canonicalProjectIds?: string[]
  canonicalClaimIds?: string[]
  canonicalEvidenceIds?: string[]
  temporalContext?: string
  visibility?: 'PUBLIC' | 'RESTRICTED' | 'PROPRIETARY'
  contentHash?: string
  indexVersion?: string
  governedMetricCaveats?: string[]
  historicalDisclosures?: string[]

  // Knowledge Base & Case Study Ingestion Extensions (Phase 2.5E)
  caseStudyId?: string
  adrId?: string
  knowledgeCategory?:
    | 'CASE_STUDY_OVERVIEW'
    | 'ADR'
    | 'INCIDENT_DIAGNOSTICS'
    | 'ROOT_CAUSE'
    | 'VERIFICATION_MATRIX'
    | 'CROSS_PROJECT_PATTERN'
    | 'DOCUMENTED_METRIC'
    | 'TIMELINE_SPINE'
  evidenceStatus?:
    | 'SOURCE_VERIFIED'
    | 'TEST_VERIFIED'
    | 'REPORT_SUPPORTED'
    | 'HISTORY_SUPPORTED'
    | 'CONTEXT_SUPPORTED'
    | 'PARTIALLY_VERIFIED'
    | 'CONFLICTING'
    | 'PROPOSED'
    | 'UNVERIFIED'
  epistemicConfidence?: 'HIGH' | 'MEDIUM' | 'LOW'
  executionLocality?:
    | 'LOCAL_WORKSPACE_EXECUTED'
    | 'UNEXECUTED_IN_THIS_REPO'
    | 'EXTERNAL_REPOSITORY'
    | 'PROPRIETARY_CLUSTER'
  mandatoryCaveatText?: string
  contentAnchor?: string
  mappedJournalChapters?: string[]
}

export interface EngineeringKnowledgeChunkMetadata extends SourceChunkMetadata {
  source_type: 'knowledge_base'
  portfolio_layer: 'canonical'
}

export interface KnowledgeChunk {
  id: string
  content: string
  metadata: SourceChunkMetadata
}

export interface SourceConflict {
  id: string
  topic: string
  claim_a: {
    claim: string
    source: SourceType
    layer?: PortfolioLayer
    reference: string
  }
  claim_b: {
    claim: string
    source: SourceType
    layer?: PortfolioLayer
    reference: string
  }
  status: 'needs_review' | 'resolved_by_context'
  notes: string
}

export interface AuditFinding {
  id: string
  field: string
  entity: string
  status: AuditStatus
  details: string
  sourcesCompared: SourceType[]
  actionRecommended: string
}

export interface VisitorContext {
  name?: string
  email?: string
  company?: string
  role?: string
  reason_for_contact?: string
  project_of_interest?: string
  message?: string
  preferred_channel?: 'email' | 'linkedin' | 'whatsapp'
}

export interface StructuredProfileData {
  name: string
  legalOrFormalName?: string
  verifiedRoles: string[]
  portfolioPositioning: string
  email: string
  secondaryEmail?: string
  phone: string
  whatsappDestination: string | null // null indicates pending verification; never infer
  linkedinUrl: string
  githubUrls: {
    primary: string
    legacyOrAlternate?: string
  }
  portfolioUrl: string
  location: string
  openToWork: boolean
  education: Array<{
    degree: string
    institution: string
    year: number
    grade?: string
    verified: boolean
  }>
  languages: string[]
  lastVerified: string
}

export interface ProvenanceClaim {
  claim: string
  sourceType: SourceType
  layer?: PortfolioLayer
  reference: string
  url?: string
}

export interface AgentProvenance {
  sources: SourceType[]
  layers: PortfolioLayer[]
  citations: string[]
  claims: ProvenanceClaim[]
}

export interface AgentAnswer {
  query: string
  intent: QueryIntent
  answer: string
  provenance: AgentProvenance
  uncertainties?: string[]
  suggestedAction?: {
    type: 'contact_draft' | 'navigate' | 'view_evidence' | 'confirm_action'
    label: string
    payload: any
  }
}

export type ConfirmationState =
  | 'idle'
  | 'collecting_info'
  | 'draft_generated'
  | 'awaiting_confirmation'
  | 'confirmed'
  | 'cancelled'

export interface AgentDraft {
  subject: string
  body: string
  recipient?: string
  isEdited: boolean
}

export interface AgentExecutionResult {
  status: 'idle' | 'draft_created' | 'email_client_opened' | 'failed'
  emailClientOpened: boolean
  emailSentStatus: 'unknown' | 'failed'
  executionInput?: AgentDraft
  timestamp?: string
  error?: string
}

export interface EvidenceItem {
  id?: string
  source: string
  sourceType: SourceType
  authority: AuthorityType | 'primary' | 'secondary' | 'high' | 'medium'
  layer?: PortfolioLayer
  entity?: string
  date?: string
  content: string
  deepLink?: string
  provenanceBadge?: string
  sourcePath?: string
  lineRange?: string
  language?: string
  decision?: string
  principle?: string
  codeSnippet?: string
  ownership?: string
  ownershipClassification?: 'SYSTEM_CAPABILITY' | 'AADIL_CONTRIBUTION' | 'TEAM_OWNERSHIP' | 'INDEPENDENT_BUILD'
  quantitativeData?: {
    metricValue: string | number
    unit?: string
    claim: string
    evidenceSource?: string
    verificationDetails?: string
  }
  // Phase 2.5E Knowledge Base & Caveat Extensions
  caseStudyId?: string
  adrId?: string
  contentAnchor?: string
  governedMetricCaveats?: string[]
  mandatoryCaveatText?: string
  epistemicConfidence?: 'HIGH' | 'MEDIUM' | 'LOW'
  evidenceStatus?: string
  executionLocality?: string
}

export interface SourcePlan {
  intent: QueryIntent
  primarySources: SourceType[]
  primaryLayers?: PortfolioLayer[]
  secondarySources: SourceType[]
  secondaryLayers?: PortfolioLayer[]
  strategy: string
}

export interface SynthesisInput {
  question: string
  intent: QueryIntent
  activeProject?: string
  evidence: EvidenceItem[]
  conflicts?: SourceConflict[]
  ownershipMetadata?: Record<string, string>
  temporalContext?: string
}

export interface SynthesisResult {
  answer: string
  citations: string[]
  claims?: ProvenanceClaim[]
  uncertainties?: string[]
  modelUsed?: string
}

export interface AnswerSynthesizer {
  synthesize(input: SynthesisInput): Promise<SynthesisResult>
}

export interface AgentConversationState {
  currentIntent: QueryIntent
  activeEntity?: string
  activeProject?: string
  retrievedSources: SourceType[]
  retrievedLayers: PortfolioLayer[]
  visitorContext: VisitorContext
  selectedChannel: 'email'
  generatedDraft?: AgentDraft
  editedDraft?: AgentDraft
  confirmationState: ConfirmationState
  executionResult: AgentExecutionResult
  turnCount: number
  sourcePlan?: SourcePlan
  evidenceContext?: EvidenceItem[]
  answerConflicts?: SourceConflict[]
  synthesisMetadata?: {
    synthesizer: string
    model?: string
  }
  /** Phase 3: Recent question for multi-turn context resolution */
  recentQuestion?: string
  /** Phase 3: Compact summary of the most recent answer */
  recentAnswerSummary?: string
  /** Phase 3: Developer-only query understanding trace (not exposed to end user) */
  queryUnderstandingTrace?: {
    originalQuestion: string
    resolvedIntent: string
    resolvedProject?: string
    normalizedQuery: string
    source: 'llm' | 'deterministic_fallback'
    confidence: number
    llmLatencyMs: number
    failureType: string
  }
  /** Phase 5B: Developer-only tool plan execution trace */
  toolPlanTrace?: {
    planId: string
    goal: string
    stepCount: number
    status: string
    validationDurationMs: number
    executionDurationMs: number
    steps: Array<{
      stepId: string
      toolName: string
      status: string
      durationMs?: number
      errorCode?: string
    }>
  }
  /** Phase 6: Active email draft and resource authorization IDs */
  activeDraftId?: string
  activeAuthorizationId?: string
}

export interface AgentTurnResult {
  answer: AgentAnswer
  newState: AgentConversationState
}

export interface EvidencePackage {
  originalQuestion: string
  normalizedQuestion: string
  intent: QueryIntent
  informationNeed: string
  activeProject?: string
  conversationContext: {
    activeProject?: string
    activeEntities?: string[]
    recentQuestion?: string
    recentAnswerSummary?: string
  }
  evidence: EvidenceItem[]
  quantitativeClaims: QuantitativeClaimItem[]
  codeEvidence: EvidenceItem[]
  ownershipEvidence: EvidenceItem[]
  conflicts?: SourceConflict[]
  sourcePlan?: SourcePlan
}

export interface GroundedLlmSynthesisOutput {
  answer: string
  evidenceRefs: string[]
  confidence: number
  grounded: boolean
  needsClarification: boolean
  clarificationQuestion?: string
  navigationRefs?: string[]
}

export type RequestMode = 'information' | 'navigation' | 'action' | 'clarification'

export type ToolRisk = 'read_only' | 'external_navigation' | 'side_effect'

export interface ToolResult {
  success: boolean
  toolName: string
  title?: string
  message: string
  navigation?: {
    url: string
    label: string
    isExternal?: boolean
  }
  data?: any
  errorCode?: string
}

export interface AskAadilTool {
  name: string
  description: string
  risk: ToolRisk
  execute(input: any): Promise<ToolResult>
}

export type EmailActionStatus =
  | 'draft'
  | 'awaiting_confirmation'
  | 'confirmed'
  | 'sending'
  | 'sent'
  | 'failed'
  | 'cancelled'

export interface ActionAuthorization {
  authorizationId: string
  actionType: string
  resourceId: string
  status: 'pending' | 'approved' | 'expired' | 'cancelled'
  createdAt: string
  expiresAt: string
  draftContentHash?: string
}

export interface EmailDraft {
  draftId: string
  recipient: string
  subject: string
  body: string
  status: EmailActionStatus
  createdAt: string
  updatedAt: string
  authorizationId?: string
}

export interface ActionAuditEvent {
  id: string
  timestamp: string
  eventType:
    | 'draft_created'
    | 'confirmation_requested'
    | 'authorization_approved'
    | 'authorization_expired'
    | 'action_executed'
    | 'action_failed'
    | 'action_cancelled'
  actionType: string
  resourceId: string
  authorizationId?: string
  details: string
  success: boolean
}



