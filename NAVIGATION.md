# Navigation Guide — Find What You Need

> 58 files organized by audience and use case
> Start here if you're not sure where to go

---

## Quick Start by Audience

### "I'm a public health professional"
1. **Start**: `SKILL.md` — the core routing hub
2. **Find your role**: `roles/ROLE-REGISTRY.md` → identifies your pod and workflows
3. **Load your population**: `populations/POPULATION-REGISTRY.md` → context for who you serve
4. **Execute**: `commands/COMMANDS.md` → 25 slash commands for common tasks
5. **Generate**: `artifacts/reporting-templates.md` → 60+ ready-to-use templates

### "I'm a developer building health tech"
1. **Start**: `integration/developer-guide.md` — architecture, APIs, compliance
2. **Data standards**: `integration/cross-sector-data-standards.md` → FHIR R4, Gravity Project
3. **Schema**: `schemas/sdoh-data-model.json` + `schemas/fhir-sdoh-mapping.json`
4. **Tools**: `tools/sdoh-score.ts` → reference implementation for SDOH scoring
5. **Test**: `evals/EVAL-SUITE.md` → 50 test cases including privacy/safety

### "I'm a city planner"
1. **Start**: `integration/city-planning-health.md` — zoning, transportation, housing, parks
2. **Data**: `assets/data-reference.md` → health statistics for planning decisions
3. **HIA process**: `features/advocacy-toolkit.md` → Health Impact Assessment guide
4. **Missouri context**: `references/missouri-public-health.md` → local data and organizations

### "I manage budgets or grants"
1. **Start**: `integration/fiscal-operations.md` — ROI, CBA, audit, Medicaid billing
2. **Grant templates**: `templates/grant-and-policy-templates.md` → LOI, narrative, budget
3. **Funding sources**: `references/funding-guide.md` → federal, state, foundation
4. **ROI calculator**: `tools/roi-calculator.ts` → evidence-based intervention ROI
5. **Sustainability**: `references/fiscal-crisis-brief.md` → 5-pillar revenue diversification

### "I'm a government official or legislative staff"
1. **Start**: `integration/government-toolkit.md` — legislation, constituent comms, HiAP
2. **Policy templates**: `features/advocacy-toolkit.md` → testimony, briefs, sign-on letters
3. **Data for your district**: `assets/data-reference.md` → key statistics
4. **Communication**: `communication/external-playbook.md` → media, community presentations

### "I work for a technology company"
1. **Start**: `integration/health-tech-vendor-guide.md` — procurement, compliance, partnerships
2. **Standards**: `integration/cross-sector-data-standards.md` → what you must support
3. **Product requirements**: Check the checklist in the vendor guide
4. **MCP integration**: `mcp/MCP-SCHEMA.md` → 10 AI tool schemas

---

## By Task

### I need to screen someone for social needs
`features/sdoh-screener.md` → `tools/sdoh-score.ts` → `features/resource-navigator.md`

### I need to respond to an outbreak
`workflows/cross-role-workflows-expanded.md` (Workflow 1) → `scripts/team-sops.md` (SOP 1)

### I need to write a grant
`templates/grant-and-policy-templates.md` → `references/funding-guide.md` → `integration/fiscal-operations.md`

### I need to communicate with the public
`communication/external-playbook.md` → `messaging/campaign-builder.md` → `messaging/social-media-library.md`

### I need to serve a specific population
`populations/POPULATION-REGISTRY.md` → `populations/deep-dives/` → `bilingual/spanish-layer.md`

### I need to prepare for a board meeting
`communication/internal-playbook.md` (Section 2) → `artifacts/reporting-templates.md` (Section 3)

### I need to advocate for policy change
`features/advocacy-toolkit.md` → `integration/government-toolkit.md` → `templates/grant-and-policy-templates.md` (Template 5-6)

### I need to build a dashboard
`integration/developer-guide.md` (Pattern 3) → `communication/internal-playbook.md` (KPI standards) → `integration/cross-sector-data-standards.md` (APIs)

### I need to train staff
`features/education-toolkit.md` → `scripts/team-sops.md` → `assets/ai-prompt-library.md`

### I need to rebuild community trust
`messaging/trust-rebuilding-playbook.md` → `populations/deep-dives/` (relevant population)

---

## Complete File Index

### Root
| File | Purpose |
|------|---------|
| `SKILL.md` | AI routing hub — start here for the core loop |
| `README.md` | Project overview, file structure, diagrams |
| `AUDIT.md` | Audit findings and change log |
| `CONTRIBUTING.md` | How to contribute, style guide, guardrails |
| `NAVIGATION.md` | This file |
| `LICENSE` | MIT license |

### roles/ — 20 Public Health Roles
| File | Roles Covered |
|------|--------------|
| `ROLE-REGISTRY.md` | Master index, pod structure, routing |
| `epi.md` | Epidemiologist (5 workflows) |
| `chw.md` | Community Health Worker (5 workflows) |
| `phn.md` | Public Health Nurse (5 workflows) |
| `hdo.md` | Health Director (5 workflows) |
| `priority-roles.md` | BHC, EHS, MCH, HCS, PMG, EPC |
| `remaining-roles.md` | DIS, NUT, SUP, SHC, OHC, CES, QIC, DAT, POL, HED |
| `all-roles.md` | Quick reference for all 20 |

### populations/ — 25 Populations
| File | Content |
|------|---------|
| `POPULATION-REGISTRY.md` | 25 profiles, SDOH matrix, intersectionality |
| `deep-dives/black-african-american.md` | Full deep dive: disparities, history, culture |
| `deep-dives/all-deep-dives.md` | 9 populations: HIS, PRG, HML, PWUD, IMM, LGBT, OAD, JUS, RUR |

### workflows/ — 8 Cross-Role Workflows
| File | Content |
|------|---------|
| `cross-role-workflows.md` | Quick reference for all 8 |
| `cross-role-workflows-expanded.md` | Full decision trees, timelines, templates |

### commands/ — 25 Slash Commands
| File | Content |
|------|---------|
| `COMMANDS.md` | Quick reference card |
| `COMMAND-SPECS.md` | Full I/O/P/E specs |

### features/ — Core Features
| File | Content |
|------|---------|
| `sdoh-screener.md` | PRAPARE, AHC, Quick Screen + scoring |
| `resource-navigator.md` | 9 domains × 3 tiers + MO resources |
| `advocacy-toolkit.md` | Testimony, legislator visits, HIA |
| `education-toolkit.md` | 5 modules: CE, community, career, PH 101, TTT |

### integration/ — Cross-Sector
| File | Audience |
|------|---------|
| `developer-guide.md` | Engineers, health tech |
| `city-planning-health.md` | City planners, housing, transportation |
| `fiscal-operations.md` | Accountants, CFOs, grant managers |
| `government-toolkit.md` | Elected officials, legislative staff |
| `health-tech-vendor-guide.md` | Technology companies |
| `cross-sector-data-standards.md` | Data engineers, interoperability |

### messaging/ — Campaigns and Content
| File | Content |
|------|---------|
| `campaign-builder.md` | 6 campaigns + planning framework |
| `social-media-library.md` | 27 posts, 9 categories |
| `trust-rebuilding-playbook.md` | HEAR framework, prebunking, proxy model |
| `email-sequences.md` | 8 sequences, 30 emails |

### communication/ — Playbooks
| File | Content |
|------|---------|
| `internal-playbook.md` | Staff, leadership, board, interagency |
| `external-playbook.md` | Media, digital, regulatory, presentations |

### references/ — Knowledge Base
| File | Content |
|------|---------|
| `apha-knowledgebase.md` | 23 APHA topic areas |
| `apha-url-index.md` | Reference URLs |
| `missouri-public-health.md` | MO infrastructure, data, organizations |
| `funding-guide.md` | Federal, state, foundation sources |
| `fiscal-crisis-brief.md` | 5-pillar sustainability blueprint |

### Other Directories
| Directory | Files | Content |
|-----------|-------|---------|
| `artifacts/` | 2 | 60+ reporting templates + 13 role artifacts |
| `bilingual/` | 1 | Spanish screening, cultural concepts, safe spaces |
| `mcp/` | 1 | 10 MCP tool schemas |
| `evals/` | 1 | 50 test cases |
| `scripts/` | 1 | 10 SOPs |
| `schemas/` | 2 | SDOH data model + FHIR mapping |
| `templates/` | 1 | Grant and policy templates |
| `tools/` | 4 | SDOH scorer, campaign generator, ROI calculator, APHA fetcher |
| `assets/` | 3 | AI prompts, data reference, engagement calendar |
