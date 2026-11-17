import { TimelineItem } from '../types'
import { getCanonicalTimeline } from './adapters/experienceAdapter'

/**
 * THE TIMELINE // CHRONOLOGICAL SPINE (CANONICAL PROJECTION)
 *
 * Authoritative factual map of engineering evolution.
 * Migrated in Phase 2.1 to project dynamically from the Phase 1 Canonical Registry
 * via data/adapters/experienceAdapter.ts.
 *
 * Flow:
 * TIMELINE (What happened → what I learned → how that enabled the next chapter)
 *   ↓
 * JOURNAL (Why / what was difficult / discoveries / reflections)
 *   ↓
 * SYSTEM (What was built / evidence / benchmarks)
 *
 * Chronology Semantics Enforced:
 * 1. Graveiens Edu Services: May 2021 — Oct 2021 (month-level INTERVAL_OVERLAP with InhaltMart).
 * 2. InhaltMart Educational Services: Oct 2021 — Feb 2022.
 * 3. DIGIPPLUS: Jun 2022 — Sep 2022 (correcting legacy July 2022 erratum).
 * 4. Independent Quantitative Discipline: Sep 2022 — Dec 2023 (correcting legacy August 2022 erratum; TRANSITION_WINDOW).
 * 5. Wayground Mathematics SME: Jan 2024 — Dec 2025.
 *    - VM Copy: Conceived and developed Oct–mid-Nov 2025 during Mathematics SME tenure; adopted Nov 2025 onward.
 * 6. Wayground AI Engineer / AI/ML Team: Jan 2026 — Jul 2026.
 * 7. Independent AI Engineering & Research: Aug 2026 — Present.
 */

export const experience: TimelineItem[] = getCanonicalTimeline()

export const timelineData: TimelineItem[] = experience

export type { TimelineItem }
