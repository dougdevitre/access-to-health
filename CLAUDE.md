# CLAUDE.md — Project Conventions for Claude Code

## What This Project Is

Access to Health is a comprehensive AI operating system for public health professionals, with cross-sector integration for developers, city planners, accountants, government officials, and technology companies. It is a **knowledge framework** (markdown + schemas + tools), not a web application.

## Project Structure

- `SKILL.md` — AI routing hub (start here for the core loop)
- `roles/` — 20 public health roles across 9 pods
- `populations/` — 25 populations with 10 individual deep dives
- `workflows/` — 8 cross-role workflows with decision trees
- `commands/` — 25 slash commands with I/O/P/E specs
- `features/` — SDOH screener, resource navigator, advocacy, education
- `communication/` — Internal + external playbooks
- `messaging/` — Campaigns, social media, trust-rebuilding, email sequences
- `artifacts/` — 60+ reporting templates, 13 role artifacts
- `integration/` — Cross-sector guides (developer, planner, government, fiscal, tech, data)
- `references/` — APHA, Missouri data, funding, fiscal crisis
- `bilingual/` — Spanish language support
- `mcp/` — 10 MCP tool schemas
- `evals/` — 50 test cases
- `scripts/` — 10 SOPs
- `schemas/` — SDOH data model (JSON) + FHIR R4 mapping
- `templates/` — Grant and policy templates
- `tools/` — TypeScript/JS developer tools + tests
- `assets/` — AI prompts, data reference, engagement calendar
- `docs/` — MkDocs site (symlinks to source files, do NOT edit directly)

## The 10 Guardrails (ALWAYS enforce)

1. **Evidence-based** — Cite APHA, CDC, WHO, or peer-reviewed sources
2. **Trauma-informed** — No blame, shame, or stigmatizing language
3. **Equity lens** — Structural framing, not individual blame. Disaggregate all data by race, ethnicity, income, geography
4. **Culturally responsive** — Adapt to community context
5. **Politically neutral** — Health outcomes, not partisan positions
6. **Privacy-first** — HIPAA / 42 CFR Part 2 compliant
7. **Plain language** — 6th-grade reading level for public-facing content
8. **Person-first** — "Person with diabetes" not "diabetic"
9. **Community voice** — Nothing about us without us
10. **Missouri reference, nationally applicable**

## Content Rules

- **Structural framing**: "Structural racism creates conditions that..." NOT "Black people are at higher risk because..."
- **Person-first**: "Person experiencing homelessness" NOT "homeless person"
- **No stigma**: "Substance use disorder" NOT "addiction." "Person who uses drugs" NOT "addict"
- **Operational, not academic**: Write for practitioners in the field, not for journals
- **Actionable**: Every section should answer "so what do I do?"
- **Specific**: Phone numbers, timelines, checklists — not vague guidance

## Development Commands

```bash
npm run build          # TypeScript compile
npm test               # Jest tests (20 tests)
npm run lint:md        # Markdown lint
npm run check          # Build + lint + test
npm run sdoh-score     # Run SDOH scoring tool
npm run roi            # Run ROI calculator
npm run apha           # Run APHA reference lookup
mkdocs build           # Build documentation site (requires Python deps)
mkdocs serve           # Local docs preview at localhost:8000
```

## CI Pipeline

GitHub Actions runs on every push to `main` and every PR:
- **build**: TypeScript compile + Jest tests (20 tests)
- **lint**: Markdown lint (markdownlint-cli)
- **validate-structure**: Verifies all expected files exist + JSON schemas valid

Docs deploy runs on push to `main` only (GitHub Pages via MkDocs).

## When Editing Content

- Run `npm run lint:md` before committing
- Check cross-references: if you rename or move a file, grep for its old path across all `.md` files
- If adding a new file, add it to: `mkdocs.yml` nav, `NAVIGATION.md`, `README.md` file tree, and the CI validate-structure file list
- If adding a new population deep dive, create an individual file in `populations/deep-dives/` AND add a symlink in `docs/populations/deep-dives/`
- If adding a new tool, add tests in `tools/__tests__/`

## When Adding Cross-Sector Content

New audience guides go in `integration/`. Follow the existing pattern:
- Clear audience statement at top
- Actionable content (not just description)
- Tables for comparison/lookup
- Mermaid diagrams for architecture/flow
- References to existing repo files

## File Naming

- Markdown: `kebab-case.md`
- TypeScript: `kebab-case.ts`
- JSON schemas: `kebab-case.json`
- Directories: `kebab-case/`
- Role codes: 3-letter uppercase (EPI, CHW, PHN, etc.)
- Population codes: 3-4 letter uppercase (BLK, HIS, PRG, etc.)

## Do NOT

- Create files in `docs/` directly — use symlinks to source files
- Edit `package-lock.json` manually
- Push to `main` directly — use feature branches + PRs
- Add content that blames individuals or communities for health outcomes
- Use stigmatizing language (see guardrails above)
- Add speculative health claims without evidence
