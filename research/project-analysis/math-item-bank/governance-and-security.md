# Governance, Security & Prompt Discipline — US Mathematics Item Bank

## 1. Pedagogical Governance & Curriculum Standards
- Designed around United States state mathematics frameworks:
  - Texas Essential Knowledge and Skills (TEKS)
  - Common Core State Standards for Mathematics (CCSS-M)
  - Depth of Knowledge (DOK) cognitive taxonomies (DOK 1: Recall, DOK 2: Skills & Concepts, DOK 3: Strategic Thinking).
- Requires deterministic balancing to prevent over-indexing on low-order recall questions.

## 2. Human-in-the-Loop Escalation Policy
- A central governance principle in the claimed architecture is the dead-letter human review queue:
  - If a generated question fails verification after 3 node iterations, the system forbids publishing and routes the item to human curriculum subject matter experts (SMEs).
  - Ensures no unverified or corrupted mathematical items reach production item banks.
