# Unknowns & Investigation Gaps — AI Worksheets

## 1. Unresolved Questions & Missing Evidence

1. **Production Pilot Telemetry**:
   - The repository contains the POC code and leadership brief, but lacks post-deployment student usage telemetry (e.g. real student submission logs or aggregated teacher NPS survey data).
   - *Impact*: User impact metrics should be framed as POC validation findings and leadership targets rather than multi-year enterprise production telemetry.

2. **Absence of Committed Unit Test Files**:
   - `backend/tests/` contains only an empty `__init__.py`. While runtime Pydantic validations and compiler exit codes protect execution, there are no committed pytest suites.
   - *Impact*: Must describe validation truthfully as architectural runtime validation rather than quoting offline test coverage numbers.

3. **Maze Trail & Mystery Room Execution Completeness**:
   - The codebase contains service modules for `maze_trail` and `mystery_room` alongside `crossword_pipeline`. The leadership brief focuses heavily on Formal and Crossword workflows, indicating the other gamified pipelines were prototype extensions.
