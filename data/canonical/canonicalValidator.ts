/**
 * CANONICAL REGISTRY VALIDATOR (PHASE 1.2 HARDENED)
 *
 * Deterministic validation engine enforcing data integrity invariants across
 * the Canonical Knowledge Foundation.
 *
 * Audit Corrections Implemented (Phase 1.2):
 * - V-01: Strict Gregorian calendar-date validation (leap-year rules and exact month lengths)
 * - V-02: Mandatory structured metric governance (subject/scope compatibility matrix and wording safeguards)
 * - V-03: Dimension orthogonality between organizational context, IP ownership, and publication rights
 * - V-04: Interval-overlap semantics (INTERVAL_OVERLAP) for October 2021 co-occurrence
 *
 * Standard: DiffGuard-grade Evidence Provenance & Canonical Schema Invariants
 */

import {
  CanonicalRegistry,
  CanonicalCareerRecord,
  CanonicalProjectRecord,
  CanonicalTechnicalClaimRecord,
  CanonicalEvidenceRecord,
  CanonicalTimeSpan,
  CanonicalDatePoint,
  BoundaryType,
  MetricSubject,
  MeasurementScope,
  CanonicalCaseStudyReference,
  CaseStudyId,
  AdrId
} from './canonicalSchema'

export interface ValidationError {
  entityType: 'career' | 'project' | 'claim' | 'evidence' | 'caseStudy' | 'adr' | 'root'
  entityId: string
  field: string
  rule: string
  message: string
}

export interface ValidationWarning {
  entityType: 'career' | 'project' | 'claim' | 'evidence' | 'caseStudy' | 'adr' | 'root'
  entityId: string
  field: string
  message: string
}

export interface ValidationContext {
  validChapterIds?: string[] | Set<string>
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
  stats: {
    totalCareers: number
    totalProjects: number
    totalClaims: number
    totalEvidence: number
    totalCaseStudies?: number
    totalAdrs?: number
  }
}

// ============================================================================
// SAFE STRING & INPUT NORMALIZATION HELPERS (F-03 RESILIENCE)
// ============================================================================

function safeString(val: unknown): string {
  return typeof val === 'string' ? val : ''
}

function safeLower(val: unknown): string {
  return typeof val === 'string' ? val.toLowerCase() : ''
}

function safeArray(val: unknown): unknown[] {
  return Array.isArray(val) ? val : []
}

/**
 * Strict Gregorian leap-year rule:
 * - Divisible by 400: leap year
 * - Divisible by 100: not a leap year
 * - Divisible by 4: leap year
 * - Otherwise: not a leap year
 */
function isLeapYear(year: number): boolean {
  if (year % 400 === 0) return true
  if (year % 100 === 0) return false
  return year % 4 === 0
}

/**
 * Returns exact days in month according to the Gregorian calendar.
 */
function getDaysInMonth(year: number, month: number): number {
  switch (month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
      return 31
    case 4: case 6: case 9: case 11:
      return 30
    case 2:
      return isLeapYear(year) ? 29 : 28
    default:
      return 0
  }
}

/**
 * Validates ISO date string format (YYYY, YYYY-MM, or YYYY-MM-DD)
 * and enforces strict Gregorian calendar rules:
 * - 4-digit year (YYYY)
 * - 2-digit month (01-12)
 * - 2-digit day matching exact days in month, including leap years
 * - Rejects single-digit months/days (e.g. 2024-2-01, 2024-02-1)
 */
function isValidDateString(dateStr: string): boolean {
  if (!dateStr || typeof dateStr !== 'string') return false
  // Strict regex: YYYY or YYYY-MM or YYYY-MM-DD (requires 2 digits for MM and DD if present)
  const match = dateStr.match(/^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/)
  if (!match) return false

  const year = parseInt(match[1], 10)
  if (year < 1000 || year > 9999) return false

  if (match[2]) {
    const month = parseInt(match[2], 10)
    if (month < 1 || month > 12) return false

    if (match[3]) {
      const day = parseInt(match[3], 10)
      const maxDays = getDaysInMonth(year, month)
      if (day < 1 || day > maxDays) return false
    }
  }

  return true
}

/**
 * Validates a single CanonicalDatePoint against Gregorian calendar rules
 * and precision consistency.
 */
function validateDatePoint(
  dp: unknown,
  path: string,
  entityId: string,
  entityType: 'career' | 'project',
  errors: ValidationError[]
): boolean {
  if (!dp || typeof dp !== 'object') {
    errors.push({
      entityType,
      entityId,
      field: path,
      rule: 'MALFORMED_DATE_POINT',
      message: `Date point at ${path} must be a valid object.`
    })
    return false
  }

  const point = dp as Partial<CanonicalDatePoint>
  if (!point.dateString || typeof point.dateString !== 'string') {
    errors.push({
      entityType,
      entityId,
      field: `${path}.dateString`,
      rule: 'REQUIRED_DATE',
      message: `Date string at ${path}.dateString is required and must be a string.`
    })
    return false
  }

  if (!isValidDateString(point.dateString)) {
    errors.push({
      entityType,
      entityId,
      field: `${path}.dateString`,
      rule: 'INVALID_DATE_FORMAT',
      message: `Date string '${point.dateString}' at ${path}.dateString has an invalid format or impossible calendar date.`
    })
    return false
  }

  // Validate precision format agreement
  if (point.precision) {
    if (point.precision === 'year' && point.dateString.length !== 4) {
      errors.push({
        entityType,
        entityId,
        field: `${path}.precision`,
        rule: 'PRECISION_FORMAT_MISMATCH',
        message: `Date point precision 'year' expects 'YYYY', found '${point.dateString}'.`
      })
      return false
    }
    if (point.precision === 'month' && point.dateString.length !== 7) {
      errors.push({
        entityType,
        entityId,
        field: `${path}.precision`,
        rule: 'PRECISION_FORMAT_MISMATCH',
        message: `Date point precision 'month' expects 'YYYY-MM', found '${point.dateString}'.`
      })
      return false
    }
    if (point.precision === 'day' && point.dateString.length !== 10) {
      errors.push({
        entityType,
        entityId,
        field: `${path}.precision`,
        rule: 'PRECISION_FORMAT_MISMATCH',
        message: `Date point precision 'day' expects 'YYYY-MM-DD', found '${point.dateString}'.`
      })
      return false
    }
  }

  return true
}

/**
 * Validates a CanonicalTimeSpan including start <= end ordering (F-03).
 */
function validateTimeSpan(
  span: unknown,
  path: string,
  entityId: string,
  entityType: 'career' | 'project',
  errors: ValidationError[]
): void {
  if (!span || typeof span !== 'object') {
    errors.push({
      entityType,
      entityId,
      field: path,
      rule: 'MALFORMED_TIME_SPAN',
      message: `Time span at ${path} must be a valid object.`
    })
    return
  }

  const timeSpan = span as Partial<CanonicalTimeSpan>
  const startValid = validateDatePoint(timeSpan.start, `${path}.start`, entityId, entityType, errors)

  if (timeSpan.end === undefined || timeSpan.end === null) {
    errors.push({
      entityType,
      entityId,
      field: `${path}.end`,
      rule: 'REQUIRED_END_BOUNDARY',
      message: `End boundary at ${path}.end is required ('PRESENT', 'ONGOING', or a valid DatePoint).`
    })
    return
  }

  // Handle open-ended present/ongoing
  if (timeSpan.end === 'PRESENT' || timeSpan.end === 'ONGOING') {
    return
  }

  const endValid = validateDatePoint(timeSpan.end, `${path}.end`, entityId, entityType, errors)

  // Enforce start <= end when both boundaries are valid
  if (startValid && endValid && timeSpan.start && typeof timeSpan.end === 'object') {
    const startStr = timeSpan.start.dateString
    const endStr = timeSpan.end.dateString
    if (startStr > endStr) {
      errors.push({
        entityType,
        entityId,
        field: path,
        rule: 'TEMPORAL_ORDER_INVERTED',
        message: `Temporal interval inverted at ${path}: start '${startStr}' is chronologically after end '${endStr}'.`
      })
    }
  }
}

// ============================================================================
// METRIC GOVERNANCE CONSTANTS & COMPATIBILITY MATRIX (V-02)
// ============================================================================

export const VALID_METRIC_SUBJECTS = new Set<MetricSubject>([
  'CAD_GEOMETRY_VOLUME_ACCURACY',
  'CAD_TEST_SUITE_COUNT',
  'OCR_PARSER_ACCURACY',
  'OCR_TEST_SUITE_COUNT',
  'DETERMINISTIC_EVALUATION_LATENCY',
  'MOBILE_COMPONENT_TEST_EXECUTION',
  'VOICE_AGENT_TEST_COUNT',
  'RELIABILITY_TEST_CASE_COUNT',
  'GOVERNANCE_TEST_COUNT',
  'AGENT_CORE_HARDENING_CHECKS',
  'HARNESS_TOTAL_ASSERTIONS',
  'ETL_INTEGRITY_STAGES',
  'WORKFLOW_RUNTIME_COMPARISON',
  'GENERAL_METRIC'
])

export const VALID_MEASUREMENT_SCOPES = new Set<MeasurementScope>([
  'ANALYTICAL_PRIMITIVE_CALCULUS',
  'IN_MEMORY_DETERMINISTIC_GATE',
  'LLM_GENERATIVE_PIPELINE',
  'MOBILE_JEST_TYPESCRIPT_STATIC',
  'MOBILE_PHYSICAL_DEVICE_RUNTIME',
  'AUTOMATED_TEST_COLLECTION',
  'AUTOMATED_SUITE_FILES',
  'OPERATIONAL_BASELINE_COMPARISON',
  'CONTROLLED_ALGORITHMIC_BENCHMARK',
  'CORE_SECURITY_HARDENING',
  'FULL_EVALUATION_HARNESS'
])

export const SUBJECT_TO_ALLOWED_SCOPES: Record<MetricSubject, MeasurementScope[]> = {
  CAD_GEOMETRY_VOLUME_ACCURACY: ['ANALYTICAL_PRIMITIVE_CALCULUS'],
  CAD_TEST_SUITE_COUNT: ['AUTOMATED_TEST_COLLECTION', 'AUTOMATED_SUITE_FILES'],
  OCR_PARSER_ACCURACY: ['AUTOMATED_TEST_COLLECTION', 'IN_MEMORY_DETERMINISTIC_GATE'],
  OCR_TEST_SUITE_COUNT: ['AUTOMATED_TEST_COLLECTION', 'AUTOMATED_SUITE_FILES'],
  DETERMINISTIC_EVALUATION_LATENCY: ['IN_MEMORY_DETERMINISTIC_GATE'],
  MOBILE_COMPONENT_TEST_EXECUTION: ['MOBILE_JEST_TYPESCRIPT_STATIC'],
  VOICE_AGENT_TEST_COUNT: ['AUTOMATED_TEST_COLLECTION', 'AUTOMATED_SUITE_FILES'],
  RELIABILITY_TEST_CASE_COUNT: ['AUTOMATED_TEST_COLLECTION'],
  GOVERNANCE_TEST_COUNT: ['AUTOMATED_TEST_COLLECTION'],
  AGENT_CORE_HARDENING_CHECKS: ['CORE_SECURITY_HARDENING'],
  HARNESS_TOTAL_ASSERTIONS: ['FULL_EVALUATION_HARNESS'],
  ETL_INTEGRITY_STAGES: ['IN_MEMORY_DETERMINISTIC_GATE', 'AUTOMATED_TEST_COLLECTION'],
  WORKFLOW_RUNTIME_COMPARISON: ['OPERATIONAL_BASELINE_COMPARISON'],
  GENERAL_METRIC: [
    'ANALYTICAL_PRIMITIVE_CALCULUS',
    'IN_MEMORY_DETERMINISTIC_GATE',
    'LLM_GENERATIVE_PIPELINE',
    'MOBILE_JEST_TYPESCRIPT_STATIC',
    'AUTOMATED_TEST_COLLECTION',
    'AUTOMATED_SUITE_FILES',
    'OPERATIONAL_BASELINE_COMPARISON',
    'CORE_SECURITY_HARDENING',
    'FULL_EVALUATION_HARNESS'
  ]
}

// ============================================================================
// WAYGROUND ENTERPRISE SYSTEM IDENTIFIERS (A-01 IDENTITY GOVERNANCE)
// ============================================================================

export const WAYGROUND_ENTERPRISE_PROJECT_IDS = new Set<string>([
  'proj-vm-copy',
  'proj-content-builder',
  'proj-ai-worksheets',
  'proj-curriculum-etl',
  'proj-item-bank'
])

export const WAYGROUND_ENTERPRISE_SLUGS = new Set<string>([
  'vm-copy',
  'voyagemath-content-builder',
  'ai-worksheets',
  'curriculum-etl',
  'us-mathematics-item-bank'
])

// ============================================================================
// ROOT REGISTRY VALIDATOR
// ============================================================================

export function validateCanonicalRegistry(
  registry: CanonicalRegistry,
  context?: ValidationContext
): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []

  if (!registry || typeof registry !== 'object') {
    return {
      isValid: false,
      errors: [{
        entityType: 'root',
        entityId: 'registry',
        field: 'root',
        rule: 'MALFORMED_REGISTRY',
        message: 'Canonical registry must be a non-null object.'
      }],
      warnings: [],
      stats: { totalCareers: 0, totalProjects: 0, totalClaims: 0, totalEvidence: 0 }
    }
  }

  const careerRecords = safeArray(registry.careerRecords) as CanonicalCareerRecord[]
  const projectRecords = safeArray(registry.projectRecords) as CanonicalProjectRecord[]
  const claimRecords = safeArray(registry.claimRecords) as CanonicalTechnicalClaimRecord[]
  const evidenceRecords = safeArray(registry.evidenceRecords) as CanonicalEvidenceRecord[]

  const careerIdSet = new Set<string>()
  const projectIdSet = new Set<string>()
  const evidenceIdSet = new Set<string>()
  const claimIdSet = new Set<string>()

  const projectMap = new Map<string, CanonicalProjectRecord>()
  for (const p of projectRecords) {
    if (p && typeof p === 'object' && p.projectId) {
      projectMap.set(p.projectId, p)
    }
  }

  const careerMap = new Map<string, CanonicalCareerRecord>()
  for (const c of careerRecords) {
    if (c && typeof c === 'object' && c.careerId) {
      careerMap.set(c.careerId, c)
    }
  }

  const claimMap = new Map<string, CanonicalTechnicalClaimRecord>()
  for (const cl of claimRecords) {
    if (cl && typeof cl === 'object' && cl.claimId) {
      claimMap.set(cl.claimId, cl)
    }
  }

  const evidenceMap = new Map<string, CanonicalEvidenceRecord>()
  for (const ev of evidenceRecords) {
    if (ev && typeof ev === 'object' && ev.evidenceId) {
      evidenceMap.set(ev.evidenceId, ev)
    }
  }

  // --------------------------------------------------------------------------
  // 1. Validate Career Records
  // --------------------------------------------------------------------------
  for (const career of careerRecords) {
    if (!career || typeof career !== 'object') {
      errors.push({
        entityType: 'career',
        entityId: 'unknown',
        field: 'career',
        rule: 'MALFORMED_RECORD',
        message: 'Career record must be a valid object.'
      })
      continue
    }

    const cId = safeString(career.careerId)
    if (!cId) {
      errors.push({
        entityType: 'career',
        entityId: 'missing-id',
        field: 'careerId',
        rule: 'REQUIRED_FIELD',
        message: 'Career record is missing required careerId.'
      })
      continue
    }

    if (careerIdSet.has(cId)) {
      errors.push({
        entityType: 'career',
        entityId: cId,
        field: 'careerId',
        rule: 'UNIQUE_ID',
        message: `Duplicate careerId '${cId}' found.`
      })
    }
    careerIdSet.add(cId)

    // Validate employmentPeriod time span (F-03)
    validateTimeSpan(career.employmentPeriod, 'employmentPeriod', cId, 'career', errors)

    // V-04: October 2021 boundary semantics
    // Graveiens and InhaltMart share October 2021; this must be classified as INTERVAL_OVERLAP (or UNRESOLVED_BOUNDARY)
    if ((cId === 'car-graveiens' || cId.includes('graveiens')) && career.employmentPeriod?.end && typeof career.employmentPeriod.end === 'object') {
      if (career.employmentPeriod.end.dateString === '2021-10') {
        const bt = career.employmentPeriod.end.boundaryType
        if (bt === 'TRANSITION_WINDOW') {
          errors.push({
            entityType: 'career',
            entityId: cId,
            field: 'employmentPeriod.end.boundaryType',
            rule: 'OCTOBER_2021_SEMANTICS_RESTRICTION',
            message: 'October 2021 for Graveiens cannot be classified as TRANSITION_WINDOW; no formal handover occurred.'
          })
        } else if (bt === 'OVERLAPPING_ACTIVITY') {
          errors.push({
            entityType: 'career',
            entityId: cId,
            field: 'employmentPeriod.end.boundaryType',
            rule: 'OCTOBER_2021_SEMANTICS_RESTRICTION',
            message: 'October 2021 for Graveiens cannot be classified as OVERLAPPING_ACTIVITY without primary evidence of simultaneous working days; must use INTERVAL_OVERLAP.'
          })
        } else if (bt !== 'INTERVAL_OVERLAP' && bt !== 'UNRESOLVED_BOUNDARY') {
          errors.push({
            entityType: 'career',
            entityId: cId,
            field: 'employmentPeriod.end.boundaryType',
            rule: 'OCTOBER_2021_SEMANTICS_RESTRICTION',
            message: 'October 2021 for Graveiens must be classified as INTERVAL_OVERLAP.'
          })
        }
      }
    }
    if ((cId === 'car-inhaltmart' || cId.includes('inhaltmart')) && career.employmentPeriod?.start) {
      if (career.employmentPeriod.start.dateString === '2021-10') {
        const bt = career.employmentPeriod.start.boundaryType
        if (bt === 'TRANSITION_WINDOW') {
          errors.push({
            entityType: 'career',
            entityId: cId,
            field: 'employmentPeriod.start.boundaryType',
            rule: 'OCTOBER_2021_SEMANTICS_RESTRICTION',
            message: 'October 2021 for InhaltMart cannot be classified as TRANSITION_WINDOW; no formal handover occurred.'
          })
        } else if (bt === 'OVERLAPPING_ACTIVITY') {
          errors.push({
            entityType: 'career',
            entityId: cId,
            field: 'employmentPeriod.start.boundaryType',
            rule: 'OCTOBER_2021_SEMANTICS_RESTRICTION',
            message: 'October 2021 for InhaltMart cannot be classified as OVERLAPPING_ACTIVITY without primary evidence of simultaneous working days; must use INTERVAL_OVERLAP.'
          })
        } else if (bt !== 'INTERVAL_OVERLAP' && bt !== 'UNRESOLVED_BOUNDARY') {
          errors.push({
            entityType: 'career',
            entityId: cId,
            field: 'employmentPeriod.start.boundaryType',
            rule: 'OCTOBER_2021_SEMANTICS_RESTRICTION',
            message: 'October 2021 for InhaltMart must be classified as INTERVAL_OVERLAP.'
          })
        }
      }
    }

    // Causality claim restriction (VM Copy transfer narrative)
    if (career.transitionContext && career.transitionContext.isCausalClaimFormallyVerified === false) {
      const note = safeLower(career.transitionContext.transitionNote)
      if (note.includes('caused by') || note.includes('guaranteed promotion')) {
        errors.push({
          entityType: 'career',
          entityId: cId,
          field: 'transitionContext.transitionNote',
          rule: 'CAUSALITY_VERIFICATION_RESTRICTION',
          message: 'Unverified causal claims cannot assert definitive corporate promotion causality.'
        })
      }
    }
  }

  // --------------------------------------------------------------------------
  // 2. Validate Evidence Records
  // --------------------------------------------------------------------------
  for (const evidence of evidenceRecords) {
    if (!evidence || typeof evidence !== 'object') {
      errors.push({
        entityType: 'evidence',
        entityId: 'unknown',
        field: 'evidence',
        rule: 'MALFORMED_RECORD',
        message: 'Evidence record must be a valid object.'
      })
      continue
    }

    const eId = safeString(evidence.evidenceId)
    if (!eId) {
      errors.push({
        entityType: 'evidence',
        entityId: 'missing-id',
        field: 'evidenceId',
        rule: 'REQUIRED_FIELD',
        message: 'Evidence record is missing required evidenceId.'
      })
      continue
    }

    if (evidenceIdSet.has(eId)) {
      errors.push({
        entityType: 'evidence',
        entityId: eId,
        field: 'evidenceId',
        rule: 'UNIQUE_ID',
        message: `Duplicate evidenceId '${eId}' found.`
      })
    }
    evidenceIdSet.add(eId)

    if (!evidence.repositoryPathOrArtifact) {
      errors.push({
        entityType: 'evidence',
        entityId: eId,
        field: 'repositoryPathOrArtifact',
        rule: 'REQUIRED_ANCHOR',
        message: 'Evidence must specify repositoryPathOrArtifact.'
      })
    }

    // F-04: Metadata files must not be classified as BENCHMARK_MEASUREMENT
    const pathStr = safeLower(evidence.repositoryPathOrArtifact)
    if (pathStr.includes('projectsmetadata.ts') && evidence.evidenceType === 'BENCHMARK_MEASUREMENT') {
      errors.push({
        entityType: 'evidence',
        entityId: eId,
        field: 'evidenceType',
        rule: 'METADATA_PROVENANCE_CLASSIFICATION',
        message: `Evidence '${eId}' cites a metadata configuration file (projectsMetadata.ts) and must be classified as SOURCE_INVENTORY, not BENCHMARK_MEASUREMENT.`
      })
    }
  }

  // --------------------------------------------------------------------------
  // 3. Validate Project Records
  // --------------------------------------------------------------------------
  for (const project of projectRecords) {
    if (!project || typeof project !== 'object') {
      errors.push({
        entityType: 'project',
        entityId: 'unknown',
        field: 'project',
        rule: 'MALFORMED_RECORD',
        message: 'Project record must be a valid object.'
      })
      continue
    }

    const pId = safeString(project.projectId)
    if (!pId) {
      errors.push({
        entityType: 'project',
        entityId: 'missing-id',
        field: 'projectId',
        rule: 'REQUIRED_FIELD',
        message: 'Project record is missing required projectId.'
      })
      continue
    }

    if (projectIdSet.has(pId)) {
      errors.push({
        entityType: 'project',
        entityId: pId,
        field: 'projectId',
        rule: 'UNIQUE_ID',
        message: `Duplicate projectId '${pId}' found.`
      })
    }
    projectIdSet.add(pId)

    // Referential integrity: associatedCareerId
    const cRef = safeString(project.associatedCareerId)
    if (!careerIdSet.has(cRef)) {
      errors.push({
        entityType: 'project',
        entityId: pId,
        field: 'associatedCareerId',
        rule: 'REFERENTIAL_INTEGRITY',
        message: `Project references unknown associatedCareerId '${cRef}'.`
      })
    }

    // Validate project temporalRegistry time spans (F-03)
    if (project.temporalRegistry) {
      if (project.temporalRegistry.developmentWindow) {
        validateTimeSpan(project.temporalRegistry.developmentWindow, 'temporalRegistry.developmentWindow', pId, 'project', errors)
      }
      if (project.temporalRegistry.internalTeamUsageWindow) {
        validateTimeSpan(project.temporalRegistry.internalTeamUsageWindow, 'temporalRegistry.internalTeamUsageWindow', pId, 'project', errors)
      }
      if (project.temporalRegistry.activeMaintenanceWindow) {
        validateTimeSpan(project.temporalRegistry.activeMaintenanceWindow, 'temporalRegistry.activeMaintenanceWindow', pId, 'project', errors)
      }
      if (project.temporalRegistry.formalDeploymentDate) {
        validateDatePoint(project.temporalRegistry.formalDeploymentDate, 'temporalRegistry.formalDeploymentDate', pId, 'project', errors)
      }
      if (project.temporalRegistry.publicReleaseDate) {
        validateDatePoint(project.temporalRegistry.publicReleaseDate, 'temporalRegistry.publicReleaseDate', pId, 'project', errors)
      }
    }

    // V-03 Orthogonality & A-01 Identity Protection:
    // Organizational context, IP ownership, and publication eligibility are independent dimensions.
    // Wayground enterprise internal systems are strictly protected against PERSONAL_PROPRIETARY IP
    // through both stable canonical projectId and protected slug safeguards:
    const isWaygroundEnterpriseProject =
      WAYGROUND_ENTERPRISE_PROJECT_IDS.has(pId) ||
      WAYGROUND_ENTERPRISE_SLUGS.has(safeLower(project.slug))

    if (isWaygroundEnterpriseProject) {
      if (project.ipOwnership === 'PERSONAL_PROPRIETARY') {
        errors.push({
          entityType: 'project',
          entityId: pId,
          field: 'ipOwnership',
          rule: 'WAYGROUND_PROPRIETARY_RESTRICTION',
          message: `Wayground employer internal project '${pId}' must maintain verified EMPLOYER_PROPRIETARY classification.`
        })
      }
    }

    // Rule: Non-public open source MUST have repository.publicUrl === null
    if (project.publicationEligibility !== 'PUBLIC_OPEN_SOURCE' && project.repository?.publicUrl !== null) {
      errors.push({
        entityType: 'project',
        entityId: pId,
        field: 'repository.publicUrl',
        rule: 'PROPRIETARY_URL_RESTRICTION',
        message: `Project with publicationEligibility '${project.publicationEligibility}' must have repository.publicUrl === null.`
      })
    }

    // Rule: Non-SOLE_IMPLEMENTER must provide contributionBreakdown
    if (project.implementationAuthorship !== 'SOLE_IMPLEMENTER') {
      if (!project.contributionBreakdown) {
        errors.push({
          entityType: 'project',
          entityId: pId,
          field: 'contributionBreakdown',
          rule: 'COLLABORATIVE_BREAKDOWN_REQUIRED',
          message: `Project with implementationAuthorship '${project.implementationAuthorship}' must declare contributionBreakdown.`
        })
      } else {
        const modules = safeArray(project.contributionBreakdown.personallyEngineeredModules)
        if (modules.length === 0) {
          errors.push({
            entityType: 'project',
            entityId: pId,
            field: 'contributionBreakdown.personallyEngineeredModules',
            rule: 'MODULES_REQUIRED',
            message: 'Collaborative project must declare at least one personally engineered module.'
          })
        }
      }
    }

    // Rule: Content Builder Authorship Restriction
    const slugLower = safeLower(project.slug)
    const titleLower = safeLower(project.title)
    if (slugLower.includes('content-builder') || titleLower.includes('content builder') || slugLower.includes('voyagemath')) {
      if (project.implementationAuthorship === 'SOLE_IMPLEMENTER' || project.architecturalResponsibility === 'PRIMARY_ARCHITECT') {
        errors.push({
          entityType: 'project',
          entityId: pId,
          field: 'implementationAuthorship',
          rule: 'CONTENT_BUILDER_RESTRICTION',
          message: 'VoyageMath Content Builder V1 was built by Wayground Engineering; user cannot be classified as sole implementer or primary architect.'
        })
      }
    }

    // Rule: VM Copy development vs team usage separation
    if (slugLower === 'vm-copy') {
      const devStart = project.temporalRegistry?.developmentWindow?.start?.dateString
      const usageStart = project.temporalRegistry?.internalTeamUsageWindow?.start?.dateString
      if (!devStart || !usageStart) {
        errors.push({
          entityType: 'project',
          entityId: pId,
          field: 'temporalRegistry',
          rule: 'VM_COPY_TEMPORAL_SEPARATION',
          message: 'VM Copy must declare both developmentWindow and internalTeamUsageWindow.'
        })
      }
      if (project.temporalRegistry?.formalDeploymentDate) {
        warnings.push({
          entityType: 'project',
          entityId: pId,
          field: 'temporalRegistry.formalDeploymentDate',
          message: 'VM Copy formal deployment date is not independently established; consider leaving undefined.'
        })
      }
    }

    // Rule: Referential integrity for project evidenceIds
    for (const evidId of safeArray(project.evidenceIds) as string[]) {
      if (!evidenceIdSet.has(evidId)) {
        errors.push({
          entityType: 'project',
          entityId: pId,
          field: 'evidenceIds',
          rule: 'REFERENTIAL_INTEGRITY',
          message: `Project references unknown evidenceId '${evidId}'.`
        })
      }
    }
  }

  // --------------------------------------------------------------------------
  // 4. Validate Technical Claim Records (F-02 & F-03)
  // --------------------------------------------------------------------------
  for (const claim of claimRecords) {
    if (!claim || typeof claim !== 'object') {
      errors.push({
        entityType: 'claim',
        entityId: 'unknown',
        field: 'claim',
        rule: 'MALFORMED_RECORD',
        message: 'Claim record must be a valid object.'
      })
      continue
    }

    const claimId = safeString(claim.claimId)
    if (!claimId) {
      errors.push({
        entityType: 'claim',
        entityId: 'missing-id',
        field: 'claimId',
        rule: 'REQUIRED_FIELD',
        message: 'Claim record is missing required claimId.'
      })
      continue
    }

    if (claimIdSet.has(claimId)) {
      errors.push({
        entityType: 'claim',
        entityId: claimId,
        field: 'claimId',
        rule: 'UNIQUE_ID',
        message: `Duplicate claimId '${claimId}' found.`
      })
    }
    claimIdSet.add(claimId)

    // Referential integrity: projectId
    const pRef = safeString(claim.projectId)
    if (!projectIdSet.has(pRef)) {
      errors.push({
        entityType: 'claim',
        entityId: claimId,
        field: 'projectId',
        rule: 'REFERENTIAL_INTEGRITY',
        message: `Claim references unknown projectId '${pRef}'.`
      })
    }

    // Referential integrity: linkedEvidenceIds
    for (const evidId of safeArray(claim.linkedEvidenceIds) as string[]) {
      if (!evidenceIdSet.has(evidId)) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'linkedEvidenceIds',
          rule: 'REFERENTIAL_INTEGRITY',
          message: `Claim references unknown evidenceId '${evidId}'.`
        })
      }
    }

    // Rule: Check wording object existence
    if (!claim.wording || typeof claim.wording !== 'object') {
      errors.push({
        entityType: 'claim',
        entityId: claimId,
        field: 'wording',
        rule: 'REQUIRED_FIELD',
        message: `Claim '${claimId}' must declare a valid wording object.`
      })
      continue
    }

    // Rule: PARTIALLY_VERIFIED claims MUST have non-empty mandatory caveats
    const caveats = safeArray(claim.wording.mandatoryCaveats) as string[]
    if (claim.verificationStatus === 'PARTIALLY_VERIFIED') {
      if (caveats.length === 0 || caveats.every(c => safeString(c).trim().length === 0)) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'wording.mandatoryCaveats',
          rule: 'MANDATORY_CAVEATS_REQUIRED',
          message: `Claim '${claimId}' is PARTIALLY_VERIFIED but has no meaningful mandatory caveats declared.`
        })
      }
    }

    // ========================================================================
    // STRUCTURED METRIC GOVERNANCE (V-02)
    // Mandatory structured fields on quantitative claims & compatibility checks
    // ========================================================================

    const isQuantitative =
      claim.isQuantitative !== false &&
      (claim.claimDomain === 'ACCURACY' ||
        claim.claimDomain === 'LATENCY' ||
        claim.claimDomain === 'TEST_COUNT' ||
        claim.claimDomain === 'COST' ||
        claim.metricSubject !== undefined ||
        claim.measurementScope !== undefined)

    if (isQuantitative) {
      // 1. Mandatory metricSubject
      if (!claim.metricSubject) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'metricSubject',
          rule: 'METRIC_SUBJECT_REQUIRED',
          message: `Quantitative claim '${claimId}' must declare a valid metricSubject.`
        })
      } else if (!VALID_METRIC_SUBJECTS.has(claim.metricSubject)) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'metricSubject',
          rule: 'INVALID_METRIC_SUBJECT',
          message: `Claim '${claimId}' declares invalid metricSubject '${claim.metricSubject}'.`
        })
      }

      // 2. Mandatory measurementScope
      if (!claim.measurementScope) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'measurementScope',
          rule: 'MEASUREMENT_SCOPE_REQUIRED',
          message: `Quantitative claim '${claimId}' must declare a valid measurementScope.`
        })
      } else if (!VALID_MEASUREMENT_SCOPES.has(claim.measurementScope)) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'measurementScope',
          rule: 'INVALID_MEASUREMENT_SCOPE',
          message: `Claim '${claimId}' declares invalid measurementScope '${claim.measurementScope}'.`
        })
      }

      // 3. Subject-to-Scope Compatibility Matrix Validation
      if (
        claim.metricSubject &&
        claim.measurementScope &&
        VALID_METRIC_SUBJECTS.has(claim.metricSubject) &&
        VALID_MEASUREMENT_SCOPES.has(claim.measurementScope)
      ) {
        const allowedScopes = SUBJECT_TO_ALLOWED_SCOPES[claim.metricSubject]
        if (allowedScopes && !allowedScopes.includes(claim.measurementScope)) {
          errors.push({
            entityType: 'claim',
            entityId: claimId,
            field: 'measurementScope',
            rule: 'SUBJECT_SCOPE_INCOMPATIBILITY',
            message: `Claim '${claimId}' has metricSubject '${claim.metricSubject}' which is incompatible with measurementScope '${claim.measurementScope}'. Allowed scopes: ${allowedScopes.join(', ')}.`
          })
        }
      }
    }

    // ========================================================================
    // GENERALIZED SEMANTIC METRIC CAVEAT GOVERNANCE (F-02 & V-02)
    // Independent of claimId string and independent of verificationStatus label!
    // ========================================================================

    const headlineLower = safeLower(claim.wording.headline)
    const statementLower = safeLower(claim.wording.qualifiedTechnicalStatement)
    const combinedText = `${headlineLower} ${statementLower}`
    const caveatText = caveats.map(safeLower).join(' ')
    const subject = claim.metricSubject

    // ------------------------------------------------------------------------
    // Domain A: CAD Geometry Volume Discrepancy vs CNC Physical Tolerance
    // ------------------------------------------------------------------------
    const isCadVolumeMetric =
      subject === 'CAD_GEOMETRY_VOLUME_ACCURACY' ||
      ((claim.claimDomain === 'ACCURACY' || combinedText.includes('volume')) &&
        (combinedText.includes('opencascade') ||
          combinedText.includes('brep') ||
          combinedText.includes('cad solid') ||
          combinedText.includes('0.0000%') ||
          combinedText.includes('calculus') ||
          combinedText.includes('analytical volume'))) ||
      combinedText.includes('cnc tolerance') ||
      combinedText.includes('machining tolerance')

    if (isCadVolumeMetric) {
      // 1. Prohibited Interpretation: Physical CNC machining or manufacturing precision
      const prohibitedCadPhrases = [
        'cnc tolerance',
        'zero physical error',
        'physical cnc',
        'physical manufacturing',
        'physical precision',
        'physical tolerance',
        'machining precision',
        'machining tolerance',
        'machining deviation',
        'zero machining',
        'manufacturing accuracy',
        'machine-level',
        'sub-micron',
        'hardware tolerance',
        'physical deviation'
      ]

      if (prohibitedCadPhrases.some(phrase => combinedText.includes(phrase))) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'wording.qualifiedTechnicalStatement',
          rule: 'PROHIBITED_METRIC_CLAIM',
          message:
            'CAD geometry volume claim cannot assert physical CNC manufacturing tolerance, machine-level precision, or physical machining accuracy.'
        })
      }

      // 2. Mandatory Qualification: Must state software calculus agreement and clarify not CNC tolerance
      const hasSoftwareCalculus =
        caveatText.includes('software') || caveatText.includes('calculus') || caveatText.includes('analytical') || caveatText.includes('math')
      const disclaimsCnc =
        caveatText.includes('cnc') || caveatText.includes('machin') || caveatText.includes('physical')

      if (!hasSoftwareCalculus || !disclaimsCnc) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'wording.mandatoryCaveats',
          rule: 'EDA_CAD_CAVEAT_REQUIRED',
          message: 'CAD geometry volume claim must explicitly qualify software calculus agreement vs physical CNC machining tolerance in mandatory caveats regardless of claimId or verification status.'
        })
      }
    }

    // ------------------------------------------------------------------------
    // Domain B: Deterministic In-Memory Latency vs Full Generative LLM Pipeline
    // ------------------------------------------------------------------------
    const isDeterministicLatencyMetric =
      subject === 'DETERMINISTIC_EVALUATION_LATENCY' ||
      combinedText.includes('<1ms') ||
      combinedText.includes('< 1ms') ||
      combinedText.includes('sub-millisecond') ||
      combinedText.includes('$0 marginal') ||
      (combinedText.includes('vm copy') && (combinedText.includes('latency') || combinedText.includes('eval')))

    if (isDeterministicLatencyMetric) {
      // 1. Prohibited Interpretation: End-to-end question generation in <1ms or $0
      if (
        combinedText.includes('llm in under 1ms') ||
        combinedText.includes('generation in <1ms') ||
        combinedText.includes('end-to-end question generation costs $0') ||
        combinedText.includes('generative question synthesis in <1ms')
      ) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'wording.qualifiedTechnicalStatement',
          rule: 'PROHIBITED_METRIC_CLAIM',
          message: 'Deterministic evaluation latency claim cannot assert that generative LLM synthesis executes in under 1ms or costs $0.'
        })
      }

      // 2. Mandatory Qualification: Must distinguish Tier-1 deterministic evaluation from generative LLM calls
      const hasTier1 = caveatText.includes('tier-1') || caveatText.includes('deterministic') || caveatText.includes('in-memory')
      const mentionsLlm = caveatText.includes('llm') || caveatText.includes('generat') || caveatText.includes('api cost') || caveatText.includes('provider')

      if (!hasTier1 || !mentionsLlm) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'wording.mandatoryCaveats',
          rule: 'VM_COPY_CAVEAT_REQUIRED',
          message: 'Deterministic evaluation latency claim must distinguish Tier-1 deterministic evaluation from generative LLM calls in mandatory caveats regardless of claimId or verification status.'
        })
      }
    }

    // ------------------------------------------------------------------------
    // Domain C: Mobile Component Checks vs Physical Android Device Execution
    // ------------------------------------------------------------------------
    const isMobileCheckMetric =
      subject === 'MOBILE_COMPONENT_TEST_EXECUTION' ||
      (combinedText.includes('50') && (combinedText.includes('mobile check') || combinedText.includes('mobile verification') || combinedText.includes('react native') || combinedText.includes('solace')))

    if (isMobileCheckMetric) {
      // 1. Prohibited Interpretation: Physical device or hardware emulator execution
      if (
        combinedText.includes('physical android') ||
        combinedText.includes('on physical device') ||
        combinedText.includes('automated apk execution on device') ||
        combinedText.includes('physical hardware')
      ) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'wording.qualifiedTechnicalStatement',
          rule: 'PROHIBITED_METRIC_CLAIM',
          message: 'Mobile verification claim cannot assert physical Android device or hardware emulator execution.'
        })
      }

      // 2. Mandatory Qualification: Must clarify non-device / Jest component scope
      const disclaimsDevice =
        caveatText.includes('android device') || caveatText.includes('emulator') || caveatText.includes('physical') || caveatText.includes('hardware')

      if (!disclaimsDevice) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'wording.mandatoryCaveats',
          rule: 'SOLACE_MOBILE_CAVEAT_REQUIRED',
          message: 'Mobile test claim must explicitly state that checks do not represent physical Android device or emulator execution.'
        })
      }
    }

    // ------------------------------------------------------------------------
    // Domain D: AI Reliability Test Cases Unit (Cases vs Suites)
    // ------------------------------------------------------------------------
    const isReliabilityCountMetric =
      subject === 'RELIABILITY_TEST_CASE_COUNT' ||
      (combinedText.includes('158') && (combinedText.includes('reliability') || combinedText.includes('tool boundaries') || combinedText.includes('mcp')))

    if (isReliabilityCountMetric) {
      if (
        headlineLower.includes('suite') ||
        statementLower.includes('158 test suites') ||
        statementLower.includes('158 backend test suites')
      ) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'wording.headline',
          rule: 'AI_RELIABILITY_UNIT_ACCURACY',
          message: 'AI Reliability Framework metric must use test cases / tests, not test suites, for the 158 count.'
        })
      }
    }

    // ------------------------------------------------------------------------
    // Domain E: Ask Aadil Checks vs Broader Assertions
    // ------------------------------------------------------------------------
    const isAskAadilMetric =
      subject === 'AGENT_CORE_HARDENING_CHECKS' ||
      subject === 'HARNESS_TOTAL_ASSERTIONS' ||
      (combinedText.includes('ask aadil') && (combinedText.includes('172') || combinedText.includes('327')))

    if (isAskAadilMetric) {
      if (combinedText.includes('172') && headlineLower.includes('172 assertion')) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'wording.headline',
          rule: 'ASK_AADIL_METRIC_CONFLATION',
          message: '172 Ask Aadil count represents core hardening checks, not total assertions.'
        })
      }
      if (combinedText.includes('327') && (headlineLower.includes('327 test files') || headlineLower.includes('327 separate test'))) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'wording.headline',
          rule: 'ASK_AADIL_METRIC_CONFLATION',
          message: '327 Ask Aadil count represents total assertions across 10 evaluation test scripts, not 327 test files.'
        })
      }
    }

    // ------------------------------------------------------------------------
    // Domain F: AI Worksheets Operational Baseline Comparison
    // ------------------------------------------------------------------------
    const isWorksheetsRuntimeMetric =
      subject === 'WORKFLOW_RUNTIME_COMPARISON' ||
      (combinedText.includes('worksheet') && (combinedText.includes('2h') || combinedText.includes('2 hours')) && (combinedText.includes('3m') || combinedText.includes('3 minutes')))

    if (isWorksheetsRuntimeMetric) {
      if (combinedText.includes('controlled benchmark') || combinedText.includes('40x algorithmic benchmark')) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'wording.qualifiedTechnicalStatement',
          rule: 'PROHIBITED_METRIC_CLAIM',
          message: 'AI Worksheets runtime claim cannot assert a controlled algorithmic benchmark.'
        })
      }

      const hasOperationalQualification =
        caveatText.includes('operational comparison') || caveatText.includes('manual baseline') || caveatText.includes('estimated teacher') || caveatText.includes('not a controlled benchmark')

      if (!hasOperationalQualification) {
        errors.push({
          entityType: 'claim',
          entityId: claimId,
          field: 'wording.mandatoryCaveats',
          rule: 'WORKSHEETS_BENCHMARK_CAVEAT_REQUIRED',
          message: 'AI Worksheets claim must qualify that ~2h to ~3m is an operational comparison against an estimated manual baseline, not a controlled benchmark.'
        })
      }
    }
  }

  // ==========================================================================
  // INVARIANT SUITE: CANONICAL CASE STUDY REFERENCES & ADR GOVERNANCE (PHASE 2.5C)
  // ==========================================================================
  let totalCaseStudies = 0
  let totalAdrs = 0

  if (registry.caseStudyReferences !== undefined && registry.caseStudyReferences !== null) {
    if (!Array.isArray(registry.caseStudyReferences)) {
      errors.push({
        entityType: 'root',
        entityId: 'caseStudyReferences',
        field: 'caseStudyReferences',
        rule: 'CASE_STUDY_COLLECTION_MALFORMED',
        message: 'caseStudyReferences must be an array when defined.'
      })
    } else {
      const caseStudyRecords = registry.caseStudyReferences
      totalCaseStudies = caseStudyRecords.length
      const seenCaseStudyIds = new Set<string>()
      const seenAdrIdsAcrossRegistry = new Set<string>()
      const validChapterIdSet = context?.validChapterIds
        ? (context.validChapterIds instanceof Set ? context.validChapterIds : new Set(context.validChapterIds))
        : null

      for (const cs of caseStudyRecords) {
        if (!cs || typeof cs !== 'object') {
          errors.push({
            entityType: 'caseStudy',
            entityId: 'unknown',
            field: 'root',
            rule: 'MALFORMED_RECORD',
            message: 'Case study record is not a valid object.'
          })
          continue
        }

        const csId = safeString(cs.caseStudyId)

        // 1. Case Study ID Uniqueness & Non-emptiness
        if (!csId) {
          errors.push({
            entityType: 'caseStudy',
            entityId: 'missing',
            field: 'caseStudyId',
            rule: 'CASE_STUDY_ID_REQUIRED',
            message: 'Case study record missing required caseStudyId.'
          })
        } else if (seenCaseStudyIds.has(csId)) {
          errors.push({
            entityType: 'caseStudy',
            entityId: csId,
            field: 'caseStudyId',
            rule: 'CASE_STUDY_DUPLICATE_ID',
            message: `Duplicate case study identifier: ${csId}`
          })
        } else {
          seenCaseStudyIds.add(csId)
        }

        // 2. Title, Slug & Content Anchor
        if (!safeString(cs.title)) {
          errors.push({
            entityType: 'caseStudy',
            entityId: csId,
            field: 'title',
            rule: 'CASE_STUDY_TITLE_REQUIRED',
            message: `Case study ${csId} missing title.`
          })
        }
        if (!safeString(cs.slug)) {
          errors.push({
            entityType: 'caseStudy',
            entityId: csId,
            field: 'slug',
            rule: 'CASE_STUDY_SLUG_REQUIRED',
            message: `Case study ${csId} missing slug.`
          })
        }
        if (!safeString(cs.contentAnchor)) {
          errors.push({
            entityType: 'caseStudy',
            entityId: csId,
            field: 'contentAnchor',
            rule: 'CASE_STUDY_ANCHOR_REQUIRED',
            message: `Case study ${csId} missing contentAnchor.`
          })
        }

        // 3. CS-08 External Boundary Governance
        if (csId === 'CS-08') {
          if (cs.projectId !== null) {
            errors.push({
              entityType: 'caseStudy',
              entityId: csId,
              field: 'projectId',
              rule: 'CS08_PROJECT_MUST_BE_NULL',
              message: `CS-08 represents an external repository boundary and must have projectId: null (found ${cs.projectId}).`
            })
          }
          if (cs.associatedCareerId !== null) {
            errors.push({
              entityType: 'caseStudy',
              entityId: csId,
              field: 'associatedCareerId',
              rule: 'CS08_CAREER_MUST_BE_NULL',
              message: `CS-08 was not developed under any portfolio career record; associatedCareerId must be null (found ${cs.associatedCareerId}).`
            })
          }
          if (Array.isArray(cs.mappedJournalChapters) && cs.mappedJournalChapters.length > 0) {
            errors.push({
              entityType: 'caseStudy',
              entityId: csId,
              field: 'mappedJournalChapters',
              rule: 'CS08_JOURNAL_MAPPINGS_PROHIBITED',
              message: `CS-08 is not the subject of any historical journal chapter; mappedJournalChapters must be empty.`
            })
          }
          if (Array.isArray(cs.canonicalClaimIds) && cs.canonicalClaimIds.length > 0) {
            errors.push({
              entityType: 'caseStudy',
              entityId: csId,
              field: 'canonicalClaimIds',
              rule: 'CS08_INTERNAL_CLAIMS_PROHIBITED',
              message: `CS-08 external claims cannot be registered as internal portfolio canonical claims.`
            })
          }
          if (Array.isArray(cs.canonicalEvidenceIds) && cs.canonicalEvidenceIds.length > 0) {
            errors.push({
              entityType: 'caseStudy',
              entityId: csId,
              field: 'canonicalEvidenceIds',
              rule: 'CS08_INTERNAL_EVIDENCE_PROHIBITED',
              message: `CS-08 external evidence cannot be registered as internal portfolio canonical evidence.`
            })
          }
          if (cs.manifestGovernanceStatus !== 'SEPARATE_REPOSITORY_DEFERRED') {
            errors.push({
              entityType: 'caseStudy',
              entityId: csId,
              field: 'manifestGovernanceStatus',
              rule: 'CS08_GOVERNANCE_STATUS_INVALID',
              message: `CS-08 manifestGovernanceStatus must be SEPARATE_REPOSITORY_DEFERRED.`
            })
          }
          if (cs.publicationEligibility !== 'RESTRICTED_OR_INTERNAL_ONLY') {
            errors.push({
              entityType: 'caseStudy',
              entityId: csId,
              field: 'publicationEligibility',
              rule: 'CS08_PUBLICATION_ELIGIBILITY_RESTRICTED',
              message: `CS-08 publicationEligibility must be RESTRICTED_OR_INTERNAL_ONLY by default.`
            })
          }
          if (Array.isArray(cs.externalEvidenceReferences)) {
            for (const extRef of cs.externalEvidenceReferences) {
              if (!safeString(extRef.externalRepository) || !safeString(extRef.externalReferenceId)) {
                errors.push({
                  entityType: 'caseStudy',
                  entityId: csId,
                  field: 'externalEvidenceReferences',
                  rule: 'EXTERNAL_EVIDENCE_MALFORMED',
                  message: `CS-08 external evidence reference missing required repository or reference ID.`
                })
              }
              if (extRef.verificationLocality !== 'EXTERNAL_REPOSITORY') {
                errors.push({
                  entityType: 'caseStudy',
                  entityId: csId,
                  field: 'externalEvidenceReferences.verificationLocality',
                  rule: 'EXTERNAL_VERIFICATION_LOCALITY_INVALID',
                  message: `CS-08 external evidence must have verificationLocality: EXTERNAL_REPOSITORY.`
                })
              }
            }
          }
        } else {
          // Internal Case Study Validations (CS-01 through CS-07)
          // 4. Project & Career Referential Existence & Consistency
          const projId = safeString(cs.projectId)
          const careerId = safeString(cs.associatedCareerId)

          if (!projId) {
            errors.push({
              entityType: 'caseStudy',
              entityId: csId,
              field: 'projectId',
              rule: 'CASE_STUDY_PROJECT_REQUIRED',
              message: `Internal case study ${csId} requires a non-null projectId.`
            })
          } else if (!projectMap.has(projId)) {
            errors.push({
              entityType: 'caseStudy',
              entityId: csId,
              field: 'projectId',
              rule: 'CASE_STUDY_PROJECT_NOT_FOUND',
              message: `Case study ${csId} references non-existent project ${projId}.`
            })
          }

          if (!careerId) {
            errors.push({
              entityType: 'caseStudy',
              entityId: csId,
              field: 'associatedCareerId',
              rule: 'CASE_STUDY_CAREER_REQUIRED',
              message: `Internal case study ${csId} requires a non-null associatedCareerId.`
            })
          } else if (!careerMap.has(careerId)) {
            errors.push({
              entityType: 'caseStudy',
              entityId: csId,
              field: 'associatedCareerId',
              rule: 'CASE_STUDY_CAREER_NOT_FOUND',
              message: `Case study ${csId} references non-existent career ${careerId}.`
            })
          }

          if (projId && careerId && projectMap.has(projId)) {
            const proj = projectMap.get(projId)!
            if (proj.associatedCareerId !== careerId) {
              errors.push({
                entityType: 'caseStudy',
                entityId: csId,
                field: 'associatedCareerId',
                rule: 'CASE_STUDY_CAREER_PROJECT_MISMATCH',
                message: `Case study ${csId} associatedCareerId (${careerId}) does not match project ${projId} associatedCareerId (${proj.associatedCareerId}).`
              })
            }
          }

          if (cs.manifestGovernanceStatus !== 'ACCEPTED') {
            errors.push({
              entityType: 'caseStudy',
              entityId: csId,
              field: 'manifestGovernanceStatus',
              rule: 'CASE_STUDY_GOVERNANCE_STATUS_INVALID',
              message: `Internal case study ${csId} must have manifestGovernanceStatus: ACCEPTED.`
            })
          }
        }

        // 5. Nested ADR References & Global Uniqueness
        const adrIdsInThisCaseStudy = new Set<string>()
        if (Array.isArray(cs.adrReferences)) {
          totalAdrs += cs.adrReferences.length
          for (const adr of cs.adrReferences) {
            const adrId = safeString(adr.adrId)
            if (!adrId) {
              errors.push({
                entityType: 'adr',
                entityId: `${csId}::missing`,
                field: 'adrId',
                rule: 'ADR_ID_REQUIRED',
                message: `ADR in case study ${csId} missing adrId.`
              })
              continue
            }

            if (seenAdrIdsAcrossRegistry.has(adrId)) {
              errors.push({
                entityType: 'adr',
                entityId: adrId,
                field: 'adrId',
                rule: 'ADR_DUPLICATE_ID',
                message: `Global ADR duplicate detected: ${adrId} is already defined in another case study.`
              })
            } else {
              seenAdrIdsAcrossRegistry.add(adrId)
            }

            adrIdsInThisCaseStudy.add(adrId)

            if (!safeString(adr.title)) {
              errors.push({
                entityType: 'adr',
                entityId: adrId,
                field: 'title',
                rule: 'ADR_TITLE_REQUIRED',
                message: `ADR ${adrId} missing title.`
              })
            }
            if (!safeString(adr.contentAnchor)) {
              errors.push({
                entityType: 'adr',
                entityId: adrId,
                field: 'contentAnchor',
                rule: 'ADR_ANCHOR_REQUIRED',
                message: `ADR ${adrId} missing contentAnchor.`
              })
            }
          }
        }

        // 6. Claim & Evidence Referential Existence
        if (Array.isArray(cs.canonicalClaimIds)) {
          for (const cid of cs.canonicalClaimIds) {
            if (!claimMap.has(cid)) {
              errors.push({
                entityType: 'caseStudy',
                entityId: csId,
                field: 'canonicalClaimIds',
                rule: 'CASE_STUDY_CLAIM_NOT_FOUND',
                message: `Case study ${csId} references non-existent canonical claim ${cid}.`
              })
            }
          }
        }

        if (Array.isArray(cs.canonicalEvidenceIds)) {
          for (const eid of cs.canonicalEvidenceIds) {
            if (!evidenceMap.has(eid)) {
              errors.push({
                entityType: 'caseStudy',
                entityId: csId,
                field: 'canonicalEvidenceIds',
                rule: 'CASE_STUDY_EVIDENCE_NOT_FOUND',
                message: `Case study ${csId} references non-existent canonical evidence ${eid}.`
              })
            }
          }
        }

        // 7. Deterministic Journal Mapping Validation
        if (Array.isArray(cs.mappedJournalChapters)) {
          const seenMappingKeys = new Set<string>()

          for (const mapping of cs.mappedJournalChapters) {
            const chId = safeString(mapping.chapterId)
            if (!chId) {
              errors.push({
                entityType: 'caseStudy',
                entityId: csId,
                field: 'mappedJournalChapters.chapterId',
                rule: 'JOURNAL_MAPPING_CHAPTER_REQUIRED',
                message: `Mapping in case study ${csId} missing chapterId.`
              })
              continue
            }

            // Chapter existence via clean validation boundary
            if (validChapterIdSet && !validChapterIdSet.has(chId)) {
              errors.push({
                entityType: 'caseStudy',
                entityId: csId,
                field: 'mappedJournalChapters.chapterId',
                rule: 'JOURNAL_MAPPING_CHAPTER_NOT_FOUND',
                message: `Case study ${csId} maps to non-existent journal chapter: ${chId}.`
              })
            }

            // Classification-specific validation & identity key
            if (mapping.classification === 'DIRECT') {
              const directKey = `${chId}::DIRECT`
              if (seenMappingKeys.has(directKey)) {
                errors.push({
                  entityType: 'caseStudy',
                  entityId: csId,
                  field: 'mappedJournalChapters',
                  rule: 'JOURNAL_MAPPING_DUPLICATE_DIRECT',
                  message: `Duplicate DIRECT mapping for chapter ${chId} in case study ${csId}. At most one DIRECT mapping per chapter is permitted.`
                })
              }
              seenMappingKeys.add(directKey)

              if ((mapping as any).targetAspect !== undefined) {
                errors.push({
                  entityType: 'caseStudy',
                  entityId: csId,
                  field: 'mappedJournalChapters.targetAspect',
                  rule: 'DIRECT_MAPPING_TARGET_ASPECT_PROHIBITED',
                  message: `DIRECT mapping for chapter ${chId} in case study ${csId} must not define targetAspect.`
                })
              }
            } else if (mapping.classification === 'PARTIAL') {
              const aspect = safeString(mapping.targetAspect).trim()
              if (!aspect) {
                errors.push({
                  entityType: 'caseStudy',
                  entityId: csId,
                  field: 'mappedJournalChapters.targetAspect',
                  rule: 'PARTIAL_MAPPING_TARGET_ASPECT_REQUIRED',
                  message: `PARTIAL mapping for chapter ${chId} in case study ${csId} must specify a non-empty targetAspect.`
                })
              } else {
                const partialKey = `${chId}::PARTIAL::${aspect.toLowerCase()}`
                if (seenMappingKeys.has(partialKey)) {
                  errors.push({
                    entityType: 'caseStudy',
                    entityId: csId,
                    field: 'mappedJournalChapters.targetAspect',
                    rule: 'JOURNAL_MAPPING_DUPLICATE_PARTIAL_ASPECT',
                    message: `Duplicate PARTIAL aspect for chapter ${chId} in case study ${csId}: "${aspect}".`
                  })
                }
                seenMappingKeys.add(partialKey)
              }
            } else {
              errors.push({
                entityType: 'caseStudy',
                entityId: csId,
                field: 'mappedJournalChapters.classification',
                rule: 'JOURNAL_MAPPING_CLASSIFICATION_INVALID',
                message: `Invalid journal mapping classification: ${(mapping as any).classification}`
              })
            }

            // In-Manifest ADR Scope & Duplicate Check
            if (Array.isArray(mapping.relevantAdrIds)) {
              const seenRelevantAdrs = new Set<string>()
              for (const adrId of mapping.relevantAdrIds) {
                if (seenRelevantAdrs.has(adrId)) {
                  errors.push({
                    entityType: 'caseStudy',
                    entityId: csId,
                    field: 'mappedJournalChapters.relevantAdrIds',
                    rule: 'JOURNAL_MAPPING_DUPLICATE_ADR',
                    message: `Mapping for chapter ${chId} in case study ${csId} contains duplicate ADR reference: ${adrId}.`
                  })
                }
                seenRelevantAdrs.add(adrId)

                if (!adrIdsInThisCaseStudy.has(adrId)) {
                  errors.push({
                    entityType: 'caseStudy',
                    entityId: csId,
                    field: 'mappedJournalChapters.relevantAdrIds',
                    rule: 'JOURNAL_MAPPING_ADR_NOT_IN_MANIFEST',
                    message: `Mapping for chapter ${chId} references ADR ${adrId} which is not declared in case study ${csId}. Cross-manifest ADR referencing is prohibited.`
                  })
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats: {
      totalCareers: careerRecords.length,
      totalProjects: projectRecords.length,
      totalClaims: claimRecords.length,
      totalEvidence: evidenceRecords.length,
      totalCaseStudies,
      totalAdrs
    }
  }
}
