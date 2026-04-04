# Access to Health -- Quick Command Reference

> All 25 commands enforce the **10 Access to Health Guardrails**. See [COMMAND-SPECS.md](COMMAND-SPECS.md) for full parameter details, guardrail mappings, and output templates.

---

## Usage Syntax

```
/command [required_param] (optional_param) --flag value
```

- `[brackets]` = required
- `(parentheses)` = optional
- `--flag` = named option (e.g., `--format pdf`, `--lang es`)

---

## Command Reference

### Core

| Command | Description | Key Roles | Primary Output | Spec |
|---------|-------------|-----------|----------------|------|
| `/screen` | Run SDOH screening (PRAPARE, AHC, or Quick Screen) | CHW, Nurse, Social Worker | Scored screening with risk flags | [spec](COMMAND-SPECS.md#screen) |
| `/refer` | Generate warm handoff referral by domain | CHW, Care Coordinator | Referral packet with closed-loop tracker | [spec](COMMAND-SPECS.md#refer) |
| `/navigate` | Resource navigation by SDOH domain and tier | CHW, Navigator | Tiered resource list with eligibility notes | [spec](COMMAND-SPECS.md#navigate) |
| `/report` | Generate reporting artifact by type | Epidemiologist, Director | Formatted report (epi, program, board) | [spec](COMMAND-SPECS.md#report) |
| `/brief` | Create elected official or leadership briefing | Director, PIO | 1-2 page executive briefing | [spec](COMMAND-SPECS.md#brief) |

### Role-Specific

| Command | Description | Key Roles | Primary Output | Spec |
|---------|-------------|-----------|----------------|------|
| `/investigate` | Launch outbreak or environmental investigation | Epidemiologist, EH Specialist | Investigation protocol with line list template | [spec](COMMAND-SPECS.md#investigate) |
| `/surveil` | Daily surveillance check | Epidemiologist, Disease Investigator | Surveillance summary with alert flags | [spec](COMMAND-SPECS.md#surveil) |
| `/trace` | Contact tracing workflow | Disease Investigator, CHW | Contact elicitation form and follow-up schedule | [spec](COMMAND-SPECS.md#trace) |
| `/inspect` | Environmental health inspection | EH Specialist, Inspector | Inspection checklist with violation codes | [spec](COMMAND-SPECS.md#inspect) |
| `/immunize` | Immunization assessment and schedule | Nurse, Immunization Coordinator | Catch-up schedule with VFC eligibility | [spec](COMMAND-SPECS.md#immunize) |
| `/assess` | Behavioral health assessment | BH Counselor, Social Worker | Screening summary with referral recommendations | [spec](COMMAND-SPECS.md#assess) |
| `/certify` | WIC certification workflow | WIC Nutritionist, Clerk | Certification packet with food package assignment | [spec](COMMAND-SPECS.md#certify) |
| `/educate` | Health education session design | Health Educator, CHW | Lesson plan with materials list and eval rubric | [spec](COMMAND-SPECS.md#educate) |

### Communication

| Command | Description | Key Roles | Primary Output | Spec |
|---------|-------------|-----------|----------------|------|
| `/campaign` | Build health campaign | PIO, Health Educator | Campaign plan with timeline and channel matrix | [spec](COMMAND-SPECS.md#campaign) |
| `/message` | Generate health message by audience/channel | PIO, Health Educator | Audience-tailored message set | [spec](COMMAND-SPECS.md#message) |
| `/media` | Media response preparation | PIO, Director | Talking points, Q&A, and holding statement | [spec](COMMAND-SPECS.md#media) |
| `/newsletter` | Community newsletter draft | PIO, Outreach Coordinator | Newsletter copy with section layout | [spec](COMMAND-SPECS.md#newsletter) |
| `/translate` | Bilingual content generation (English/Spanish) | PIO, CHW, Translator | Side-by-side EN/ES content | [spec](COMMAND-SPECS.md#translate) |

### Policy & Operations

| Command | Description | Key Roles | Primary Output | Spec |
|---------|-------------|-----------|----------------|------|
| `/grant` | Grant template and narrative | Grant Writer, Director | Grant narrative with budget justification | [spec](COMMAND-SPECS.md#grant) |
| `/policy` | Policy brief or bill analysis | Policy Analyst, Director | Policy brief with equity impact assessment | [spec](COMMAND-SPECS.md#policy) |
| `/dashboard` | KPI dashboard design | Analyst, QI Coordinator | Dashboard wireframe with metric definitions | [spec](COMMAND-SPECS.md#dashboard) |
| `/qi` | Quality improvement (PDSA) project setup | QI Coordinator, Manager | PDSA worksheet with aim statement and measures | [spec](COMMAND-SPECS.md#qi) |
| `/accredit` | PHAB accreditation documentation | Accreditation Coordinator | Domain-mapped documentation with evidence index | [spec](COMMAND-SPECS.md#accredit) |
| `/sop` | Standard operating procedure generation | Manager, QI Coordinator | Formatted SOP with revision tracking | [spec](COMMAND-SPECS.md#sop) |
| `/eval` | Program evaluation design | Evaluator, Director | Evaluation plan with logic model and instruments | [spec](COMMAND-SPECS.md#eval) |

---

## Getting Started -- Example Workflows

**1. New Client Intake (CHW)**
```
/screen [client_id] --tool prapare
/navigate [housing] --tier 1
/refer [client_id] [housing] --warm
```

**2. Outbreak Response (Epidemiologist)**
```
/surveil --disease salmonella --period 7d
/investigate [case_cluster_id] --type foodborne
/report [investigation_id] --type epi --format pdf
```

**3. Community Campaign Launch (PIO)**
```
/campaign [diabetes_prevention] --duration 90d
/message [campaign_id] --audience adults_35_plus --channel social
/translate [message_id] --lang es
```

**4. Grant Application (Director)**
```
/eval [maternal_health_program] --type formative
/dashboard [maternal_health_program] --kpis prenatal,postpartum
/grant [cdc_2024] --program maternal_health --eval attach
```

**5. Accreditation Prep (QI Coordinator)**
```
/accredit --domain 5 --gap-analysis
/qi [domain_5_gap] --aim "Increase documentation compliance to 90%"
/sop [contact_tracing] --template phab
```

---

> **Guardrails active on every command.** No command will generate clinical diagnoses, store PII, or bypass jurisdiction-specific protocols. See the Guardrails Reference for the complete list.
