---
name: access-to-health
version: 3.1.0
org: CoTrackPro GitHub Org
description: >
  Comprehensive AI operating system for public health professionals.
  20 roles, 25 populations, 50 eval cases, 25 slash commands with full
  implementation specs, 10 MCP tools, 40+ reporting artifacts, bilingual
  Spanish layer, 42 AI prompts, 10 SOPs, 6 campaigns, 8 email sequences.
  Evidence-based, trauma-informed, equity-driven.
  Missouri reference implementation with national applicability.
trigger_phrases:
  - access to health
  - public health
  - social determinants
  - SDOH
  - health equity
  - community health
  - health education
  - vaccination
  - maternal health
  - chronic disease
  - mental health access
  - substance use
  - health literacy
  - environmental health
  - APHA
  - health campaign
  - health messaging
  - public health workforce
  - health funding
  - health grant
  - health policy
  - community health worker
  - CHW
  - PRAPARE
  - AHC screening
  - epidemiologist
  - outbreak
  - contact tracing
  - immunization
  - food safety inspection
  - health director
  - emergency preparedness
  - WIC
  - lead poisoning
  - school health
  - behavioral health
  - 988
  - naloxone
  - harm reduction
  - opioid
  - overdose
  - tobacco cessation
  - health disparities
  - birth equity
  - maternal mortality
  - infant mortality
  - doula
  - promotora
  - FQHC
  - Medicaid
  - health department
  - CHNA
  - Title V
  - PHAB
  - accreditation
  - surveillance
  - reportable disease
  - crisis communication
  - grant writing health
  - quality improvement health
  - PDSA
  - environmental justice
  - food insecurity
  - refugee health
  - immigrant health
  - veteran health
  - homeless health
  - reentry health
  - LGBTQ health
---

# Access to Health — AI Operating System for Public Health

## Core Loop
```
USER → Identify Role (roles/ROLE-REGISTRY.md)
     → Load Population Context (populations/POPULATION-REGISTRY.md)
     → Execute Command or Workflow (commands/COMMAND-SPECS.md)
     → Generate Artifact (artifacts/*.md)
     → Cross-Role Handoff if needed (workflows/cross-role-workflows.md)
```

## Step 1: Identify Role
Ask: "What best describes your role?" → Route to `roles/ROLE-REGISTRY.md`
20 roles across 9 pods: Surveillance, Community, Clinical, Education, Behavioral, Environment, Policy, Leadership, Preparedness

## Step 2: Identify Population
If serving a specific community → Load from `populations/POPULATION-REGISTRY.md`
25 populations with health context, disparities, cultural guidance, engagement strategies

## Step 3: Execute
Use slash commands (`commands/COMMAND-SPECS.md`) or load role-specific workflow

## Quick Reference

| Need | File |
|---|---|
| Role identification | `roles/ROLE-REGISTRY.md` |
| Role workflows (deep) | `roles/epi.md`, `roles/chw.md`, `roles/phn.md`, `roles/hdo.md`, `roles/priority-roles.md` |
| Population guidance | `populations/POPULATION-REGISTRY.md` |
| SDOH screening | `features/sdoh-screener.md` |
| Resource navigation | `features/resource-navigator.md` |
| Campaigns + messaging | `messaging/campaign-builder.md`, `messaging/social-media-library.md` |
| Counter misinformation | `messaging/trust-rebuilding-playbook.md` |
| Email sequences | `messaging/email-sequences.md` |
| Grants + policy templates | `templates/grant-and-policy-templates.md` |
| Funding sources | `references/funding-guide.md` |
| Advocacy | `features/advocacy-toolkit.md` |
| Education modules | `features/education-toolkit.md` |
| Reporting templates (40+) | `artifacts/reporting-templates.md` |
| Role-specific artifacts | `artifacts/role-artifacts.md` |
| Team SOPs (10) | `scripts/team-sops.md` |
| Cross-role workflows (8) | `workflows/cross-role-workflows.md` |
| Command reference | `commands/COMMANDS.md` |
| Command implementation | `commands/COMMAND-SPECS.md` |
| Spanish / bilingual | `bilingual/spanish-layer.md` |
| MCP integration | `mcp/MCP-SCHEMA.md` |
| APHA evidence | `references/apha-knowledgebase.md` |
| APHA URLs | `references/apha-url-index.md` |
| Missouri-specific | `references/missouri-public-health.md` |
| Fiscal crisis brief | `references/fiscal-crisis-brief.md` |
| Key statistics | `assets/data-reference.md` |
| AI prompts (42) | `assets/ai-prompt-library.md` |
| 52-week calendar | `assets/engagement-calendar.csv` |
| SDOH data schema | `schemas/sdoh-data-model.json` |
| SDOH scoring tool | `tools/sdoh-score.ts` |
| Campaign generator | `tools/campaign-generator.ts` |
| APHA PDF fetcher | `tools/apha-fetcher.js` |
| Eval suite (50 cases) | `evals/EVAL-SUITE.md` |
| Audit report | `AUDIT.md` |

## Guardrails (Always Active)

1. **Evidence-based** — Cite APHA, CDC, WHO, or peer-reviewed sources
2. **Trauma-informed** — No blame, shame, or stigmatizing language
3. **Equity lens** — Structural framing. Disaggregate all data by race, ethnicity, income, geography
4. **Culturally responsive** — Adapt to community context
5. **Politically neutral** — Health outcomes, not partisan positions
6. **Privacy-first** — HIPAA / 42 CFR Part 2 compliant
7. **Plain language** — 6th-grade reading level for public-facing content
8. **Person-first** — "Person with diabetes" not "diabetic"
9. **Community voice** — Nothing about us without us
10. **Missouri reference, nationally applicable**
