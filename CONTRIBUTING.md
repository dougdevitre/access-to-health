# Contributing to Access to Health

Thank you for your interest in improving public health infrastructure. This project is part of the [CoTrackPro "Access To" Initiative](https://github.com/CoTrackPro) — open-source civic resource systems.

---

## How to Contribute

### Content Contributions
- **Fix errors**: Outdated statistics, broken references, incorrect procedures
- **Add local context**: Adapt Missouri-referenced content for other states/jurisdictions
- **Expand populations**: Additional deep dives following the existing template structure
- **Add templates**: New reporting or communication templates following existing format
- **Translate**: Expand bilingual content beyond English/Spanish

### Technical Contributions
- **Developer tools**: TypeScript/JavaScript utilities in `tools/`
- **Data schemas**: FHIR mappings, data models in `schemas/`
- **Integration guides**: New cross-sector integration content in `integration/`

### What We're Looking For
- [ ] New population deep dives (following `populations/deep-dives/black-african-american.md` as model)
- [ ] Additional role deep dives for roles not yet covered individually
- [ ] State-specific adaptations (legal authority, resources, organizations)
- [ ] Additional language layers beyond Spanish
- [ ] Developer tools for SDOH data exchange and visualization

---

## Style Guide

### Content Standards (the 10 Guardrails)

All content must follow these guardrails:

1. **Evidence-based**: Cite APHA, CDC, WHO, or peer-reviewed sources
2. **Trauma-informed**: No blame, shame, or stigmatizing language
3. **Equity lens**: Structural framing — name systems, not individuals, as causes of disparity
4. **Culturally responsive**: Adapt to community context
5. **Politically neutral**: Health outcomes, not partisan positions
6. **Privacy-first**: HIPAA / 42 CFR Part 2 compliant
7. **Plain language**: 6th-grade reading level for public-facing content
8. **Person-first**: "Person with diabetes" not "diabetic"
9. **Community voice**: Nothing about us without us
10. **Missouri reference, nationally applicable**

### Writing Style
- **Operational, not academic**: Write for practitioners, not journals
- **Actionable**: Every section should answer "so what do I do?"
- **Specific**: Phone numbers, timelines, checklists — not vague guidance
- **Concise**: Say it once, say it clearly, move on
- **Tables over paragraphs**: When comparing options, use tables
- **Decision trees for workflows**: `if X → do Y` format

### Language Rules
- **Person-first**: "Person experiencing homelessness" not "homeless person"
- **Structural framing**: "Structural racism creates conditions that..." not "Black people are at higher risk because..."
- **No stigmatizing terms**: "Substance use disorder" not "addiction." "Person who uses drugs" not "addict"
- **No jargon in public content**: If you must use a technical term, define it

### Formatting
- Markdown (`.md`) for all content files
- JSON Schema for data models
- TypeScript for developer tools
- Headers: `#` for title, `##` for sections, `###` for subsections
- Tables for comparison, reference, and lookup content
- Code blocks (```) for templates, scripts, and technical content
- Checkboxes (`- [ ]`) for procedures and checklists

---

## Process

1. **Fork** the repository
2. **Create a branch** from `main` with a descriptive name
3. **Make your changes** following the style guide
4. **Test**: Ensure all internal cross-references are correct
5. **Submit a pull request** with a clear description of what changed and why
6. **Review**: Maintainer will review for accuracy, tone, and guardrail compliance

### Commit Message Format
```
[Category] Brief description

- Detail 1
- Detail 2
```

Categories: `content`, `fix`, `tools`, `schema`, `docs`, `integration`

---

## What NOT to Contribute

- Content that blames individuals or communities for health outcomes
- Partisan political content
- Content that violates HIPAA or other privacy regulations
- Marketing or promotional content for specific products or services
- Content that contradicts established public health evidence (anti-vaccine, anti-fluoride, etc.)
- AI-generated content that hasn't been reviewed for accuracy by a subject matter expert

---

## Questions?

Doug Devitre — [cotrackpro.com](https://cotrackpro.com) — dougdevitre@gmail.com
