# Command Specifications — 25 Slash Commands

> Full INPUT → PROCESS → OUTPUT → ERROR specs for each command
> See `commands/COMMANDS.md` for quick reference

---

## Core Commands

### /screen

**Description**: Run SDOH screening using a validated tool.
**Roles**: CHW, PHN, NUT, BHC (any role conducting client encounters)

**INPUT**:
- `tool` (required): `prapare` | `ahc` | `quick` — which screening instrument
- `client_id` (optional): Client identifier for record linkage
- `language` (optional): `en` | `es` — defaults to `en`

**PROCESS**:
1. Load selected screening tool questions from `features/sdoh-screener.md`
2. Present questions sequentially with appropriate framing script
3. Score responses using risk algorithm (per domain and total)
4. Map flagged domains to resources by tier (`features/resource-navigator.md`)
5. Generate follow-up schedule based on risk level

**OUTPUT**:
- Risk score (0-27) with risk level (none/low/moderate/high/critical)
- Domains flagged with severity
- Resource recommendations by domain and tier
- Follow-up schedule
- ICD-10 Z-codes for EHR documentation

**ERROR**:
- Client declines screening → Document refusal. Offer again at next visit. Do NOT pressure
- Incomplete responses → Score available domains. Note incomplete. Offer to complete later
- Crisis identified (safety, suicidal ideation) → Immediate warm handoff. Do NOT continue standard screening

---

### /refer

**Description**: Generate a warm handoff referral by SDOH domain.
**Roles**: CHW, PHN, BHC, NUT, HED

**INPUT**:
- `domain` (required): housing | food | income | healthcare | education | safety | transportation | utilities | childcare
- `tier` (required): emergency | short_term | long_term
- `zip_code` (optional): For location-specific resources
- `language` (optional): Preferred language for resource matching

**PROCESS**:
1. Look up resources in `features/resource-navigator.md` for domain × tier
2. Filter by geography if zip_code provided
3. Verify resource is active (note: recommend quarterly verification)
4. Generate referral documentation

**OUTPUT**:
- Resource name, address, phone, hours, eligibility
- Warm handoff script
- Client consent documentation
- Follow-up date (per risk level)

**ERROR**:
- No resources match → Expand geography. Escalate to supervisor for alternatives
- Resource has waitlist → Document waitlist. Identify interim resources. Follow up
- Client declines referral → Document refusal with reason. Respect autonomy. Offer again later

---

### /navigate

**Description**: Browse resources by SDOH domain and urgency tier.
**Roles**: All roles

**INPUT**:
- `domain` (required): One of 9 SDOH domains
- `tier` (optional): Filter by urgency level
- `geography` (optional): ZIP code, county, or "missouri"

**PROCESS**:
1. Load `features/resource-navigator.md`
2. Filter by domain, tier, and geography
3. Return organized resource list

**OUTPUT**: Resource list with name, contact, eligibility, hours, and notes

**ERROR**:
- Domain not recognized → Show list of valid domains
- No resources for geography → Expand to county/state level

---

### /report

**Description**: Generate a reporting artifact from the template library.
**Roles**: All roles (template-dependent)

**INPUT**:
- `type` (required): `surveillance_weekly` | `outbreak_final` | `director_monthly` | `program_quarterly` | `board_packet` | `grant_progress` | `community_profile` | `chna_summary` | `trend_analysis` | `qi_storyboard` | `hipaa_breach`
- `data` (required): Key-value data to populate the template
- `period` (optional): Reporting period dates

**PROCESS**:
1. Load template from `artifacts/reporting-templates.md`
2. Populate with provided data
3. Apply equity check: verify data disaggregation by race/ethnicity
4. Apply plain language check for public-facing reports
5. Format output

**OUTPUT**: Completed report in markdown format

**ERROR**:
- Missing required data fields → List missing fields with descriptions
- Data not disaggregated → Prompt for disaggregated data (Guardrail #3)

---

### /brief

**Description**: Create an elected official or leadership briefing.
**Roles**: HDO, POL, HCS, PMG

**INPUT**:
- `audience` (required): `elected_official` | `board` | `leadership` | `partner`
- `topic` (required): Free text describing the issue
- `ask` (required): What you need from the audience
- `data` (optional): Key data points to include

**PROCESS**:
1. Load appropriate template from `communication/internal-playbook.md`
2. Apply BLUF (Bottom Line Up Front) format for elected officials
3. Include local data with source
4. Generate talking points for media/constituent questions
5. Keep to 1-2 pages

**OUTPUT**: Formatted briefing document

**ERROR**:
- No local data provided → Flag: "Local data strengthens the brief. Add data from [sources]"
- Partisan framing detected → Redirect to health outcomes framing (Guardrail #5)

---

## Role-Specific Commands

### /investigate
**Roles**: EPI, EHS | **Description**: Launch outbreak or environmental investigation
- **INPUT**: `type` (outbreak | environmental), `trigger` (description of report/event)
- **PROCESS**: Load appropriate workflow decision tree from `workflows/cross-role-workflows-expanded.md`. Determine escalation level. Generate investigation checklist, team assignments, and timeline
- **OUTPUT**: Investigation plan with timeline, team assignments, documentation checklist, communication plan
- **ERROR**: Insufficient information → Request minimum: what, where, when, how many affected

### /surveil
**Roles**: EPI, DAT | **Description**: Daily surveillance check
- **INPUT**: `date` (optional, defaults to today)
- **PROCESS**: Load SOP 1 from `scripts/team-sops.md`. Generate checklist for daily review
- **OUTPUT**: Surveillance checklist, anomaly report template, summary template
- **ERROR**: Data source unavailable → Flag system issue. Use backup data source

### /trace
**Roles**: DIS | **Description**: Contact tracing workflow
- **INPUT**: `disease` (STI | TB | outbreak), `case_id`
- **PROCESS**: Load DIS workflow from `roles/remaining-roles.md`. Generate contact investigation worksheet
- **OUTPUT**: Contact investigation worksheet, locating plan, notification script, disposition tracker
- **ERROR**: Index case refuses to provide contacts → Document refusal. Follow state-specific protocols. Consult DIS supervisor

### /inspect
**Roles**: EHS | **Description**: Environmental health inspection
- **INPUT**: `facility_type` (restaurant | pool | school | housing | other), `inspection_type` (routine | complaint | followup | preopening)
- **PROCESS**: Load inspection template from `artifacts/role-artifacts.md`. Generate checklist per facility type and applicable code
- **OUTPUT**: Inspection report, violation list, corrective action orders, re-inspection schedule
- **ERROR**: Facility not in system → Create new facility record. Verify permit status

### /immunize
**Roles**: PHN, SHC | **Description**: Immunization assessment and catch-up schedule
- **INPUT**: `age` (required), `vaccine_history` (doses received by type), `contraindications` (optional)
- **PROCESS**: Compare history against ACIP schedule. Identify gaps. Generate catch-up plan using minimum intervals. Check contraindications
- **OUTPUT**: Assessment summary, catch-up schedule with dates, VFC eligibility, parent communication
- **ERROR**: Incomplete history → Assess available records. Recommend titers if uncertain. Start catch-up based on documented doses only

### /assess
**Roles**: BHC | **Description**: Behavioral health assessment
- **INPUT**: `presenting_concern`, `screening_tools` (optional: PHQ-9, GAD-7, AUDIT-C, C-SSRS, PC-PTSD-5)
- **PROCESS**: Load assessment template from `artifacts/role-artifacts.md`. Administer selected screening tools. Safety assessment (SI/HI/means). Generate clinical summary
- **OUTPUT**: Assessment summary with scores, safety plan if indicated, treatment recommendations, referral plan
- **ERROR**: Active suicidal ideation with plan and means → Immediate safety protocol. Do NOT continue standard assessment. 988 or ED

### /certify
**Roles**: NUT | **Description**: WIC certification workflow
- **INPUT**: `category` (pregnant | breastfeeding | postpartum | infant | child), `anthropometric_data`, `hemoglobin`
- **PROCESS**: Determine eligibility and nutritional risk. Prescribe food package. Plan nutrition counseling. Assess breastfeeding if applicable
- **OUTPUT**: Certification record, food package prescription, counseling plan, referrals
- **ERROR**: Income over limit → Check adjunctive eligibility (Medicaid, SNAP, TANF). Refer to other nutrition resources if ineligible

### /educate
**Roles**: HED, SHC, CHW | **Description**: Health education session design
- **INPUT**: `topic`, `audience`, `duration`, `setting`
- **PROCESS**: Load education toolkit (`features/education-toolkit.md`). Design session using adult learning principles. Select evidence-based curriculum if available. Plan interactive activities (max 50% lecture)
- **OUTPUT**: Session plan with objectives, outline, materials list, pre/post assessment, evaluation form
- **ERROR**: Topic not evidence-based → Flag. Recommend evidence-based alternatives from Community Guide or What Works for Health

---

## Communication Commands

### /campaign
**Roles**: HCS, HED, CES | **Description**: Build a health communication campaign
- **INPUT**: `topic`, `audience`, `duration`, `channels` (optional), `equity_populations` (optional)
- **PROCESS**: Load `messaging/campaign-builder.md`. Apply audience segmentation. Generate messages per channel. Include equity considerations for specified populations
- **OUTPUT**: Campaign plan with audience analysis, key messages, channel strategy, content calendar, evaluation metrics, equity checklist
- **ERROR**: No equity populations specified → Prompt: "Which populations need specific consideration?"

### /message
**Roles**: HCS, HED | **Description**: Generate health message by audience and channel
- **INPUT**: `topic`, `audience` (public | provider | media | internal), `channel` (social | email | flyer | press | radio)
- **PROCESS**: Generate message at appropriate reading level (6th grade for public, professional for providers). Apply guardrails. Offer bilingual version if public-facing
- **OUTPUT**: Message text, hashtags (if social), alt text (if visual), bilingual version (if applicable)
- **ERROR**: Medical jargon detected in public message → Simplify automatically. Flag original terms

### /media
**Roles**: HCS, HDO | **Description**: Media response preparation
- **INPUT**: `topic`, `type` (inquiry_response | interview_prep | holding_statement | oped | press_release)
- **PROCESS**: Load templates from `communication/external-playbook.md`. Generate with key messages, anticipated questions, and talking points
- **OUTPUT**: Media document per type with key messages, talking points, do/don't list
- **ERROR**: Speculative content requested → Refuse. "Only share what the data supports"

### /newsletter
**Roles**: HCS, CES | **Description**: Community newsletter draft
- **INPUT**: `period` (month/quarter), `highlights` (optional), `events` (optional)
- **PROCESS**: Load template from `communication/internal-playbook.md` Section 4.1. Generate with health tip, events, resources, community voice section
- **OUTPUT**: Newsletter draft in markdown
- **ERROR**: No community voice section → Prompt: "Include community input — newsletter should not be one-directional"

### /translate
**Roles**: All roles | **Description**: Bilingual content generation (English/Spanish)
- **INPUT**: `content` (English text), `content_type` (screening | resource | social | flyer | letter)
- **PROCESS**: Culturally adapt (not just translate) using `bilingual/spanish-layer.md`. Apply health literacy standards. Use professional terminology from glossary
- **OUTPUT**: Side-by-side English/Spanish content
- **ERROR**: Content too complex for plain-language Spanish → Simplify English first, then adapt

---

## Policy & Operations Commands

### /grant
**Roles**: PMG, HDO | **Description**: Grant template and narrative assistance
- **INPUT**: `type` (loi | narrative | budget | logic_model), `funder` (optional), `topic`
- **PROCESS**: Load templates from `templates/grant-and-policy-templates.md`. Pre-populate structure. Reference `references/funding-guide.md` for funder-specific guidance
- **OUTPUT**: Grant document per type
- **ERROR**: Funder format not recognized → Use generic federal format. Note: "Verify against specific NOFO requirements"

### /policy
**Roles**: POL, HDO | **Description**: Policy brief or bill analysis
- **INPUT**: `type` (brief | bill_analysis | testimony | sign_on_letter | resolution), `topic`, `position` (optional: support | oppose | amend)
- **PROCESS**: Load template from `templates/grant-and-policy-templates.md` or `features/advocacy-toolkit.md`. Generate with local data, evidence, equity analysis
- **OUTPUT**: Policy document per type
- **ERROR**: Partisan framing → Redirect to health outcomes. "Frame around health impact, not partisan position"

### /dashboard
**Roles**: DAT, QIC, PMG | **Description**: KPI dashboard design
- **INPUT**: `audience` (board | program | community | funder), `program_type` (prevention | clinical | outreach | surveillance | preparedness)
- **PROCESS**: Load dashboard standards from `communication/internal-playbook.md` Section 5. Select KPIs per program type and audience. Apply equity disaggregation by default
- **OUTPUT**: Dashboard specification with KPIs, data sources, visualization types, refresh schedule
- **ERROR**: No equity disaggregation → Add automatically. "Data disaggregated by race/ethnicity by default (Guardrail #3)"

### /qi
**Roles**: QIC | **Description**: Quality improvement (PDSA) project setup
- **INPUT**: `problem_statement`, `baseline_data` (optional), `team_members` (optional)
- **PROCESS**: Load QI framework from SOP 9 (`scripts/team-sops.md`). Generate aim statement, measurement plan, fishbone template, PDSA tracking sheet
- **OUTPUT**: QI project charter with aim, measures, team, and PDSA template
- **ERROR**: Aim not SMART → Prompt for specific, measurable, time-bound revision

### /accredit
**Roles**: QIC, HDO | **Description**: PHAB accreditation documentation
- **INPUT**: `domain` (1-12 or "all"), `status` (gap_analysis | documentation | site_prep)
- **PROCESS**: Load PHAB standards from `workflows/cross-role-workflows-expanded.md` Workflow 7. Generate checklist, gap analysis, or documentation guide per domain
- **OUTPUT**: Accreditation documentation guide per domain with standards, required evidence, and status tracker
- **ERROR**: Prerequisites not met → Flag: "Complete CHNA, CHIP, and strategic plan before proceeding"

### /sop
**Roles**: All roles | **Description**: Standard operating procedure generation
- **INPUT**: `topic`, `responsible_roles`, `trigger`
- **PROCESS**: Load SOP format from `scripts/team-sops.md`. Generate with purpose, trigger, step-by-step procedure, documentation requirements, escalation criteria, and review cycle
- **OUTPUT**: SOP document ready for review and adoption
- **ERROR**: Missing escalation criteria → Prompt: "Every SOP needs escalation criteria. What triggers escalation?"

### /eval
**Roles**: PMG, QIC, EPI | **Description**: Program evaluation design
- **INPUT**: `program_name`, `evaluation_type` (process | outcome | impact | formative), `timeline`
- **PROCESS**: Generate evaluation plan with questions, indicators, data sources, methods, timeline, and use plan. Reference logic model if available
- **OUTPUT**: Evaluation plan document
- **ERROR**: No baseline data → Flag: "Collect baseline before intervention starts. Evaluation without baseline is limited to post-only design"
