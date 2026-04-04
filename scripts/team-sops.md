# Team SOPs — 10 Standard Operating Procedures

> Executable procedures for health department operations
> Each SOP: Purpose, trigger, steps, documentation, escalation, review cycle

---

## SOP 1: Daily Disease Surveillance

**Purpose**: Ensure timely detection of reportable diseases and unusual health events.
**Responsible**: EPI, DAT | **Trigger**: Every business day by 10:00 AM
**Review cycle**: Annually

### Procedure
- [ ] Check reportable disease queue (EpiTrax/state system) for new reports
- [ ] Review syndromic surveillance (ESSENCE) for anomalies (ILI, GI, rash, respiratory)
- [ ] Update active line lists for ongoing investigations
- [ ] Review lab results for pending cases
- [ ] Flag any anomalies to EPI supervisor:
  - ≥2 cases with epidemiologic link → outbreak protocol (Workflow 1)
  - Single case of highly infectious disease → immediate notification
  - Unusual pathogen or presentation → state/CDC consultation
- [ ] Send daily summary to EPI team (brief email or dashboard update)

**Documentation**: Daily surveillance log (date, reviewer, # new cases, anomalies flagged)
**Escalation**: ≥2 linked cases → Workflow 1. Novel pathogen → CDC EOC (770-488-7100)
**Reference**: `workflows/cross-role-workflows-expanded.md` Workflow 1

---

## SOP 2: SDOH Screening and Referral

**Purpose**: Screen every new client for social determinants and connect to resources.
**Responsible**: CHW, PHN | **Trigger**: Every new client encounter
**Review cycle**: Semi-annually

### Procedure
- [ ] Introduce screening: "We ask everyone these questions because health is affected by many things beyond medical care"
- [ ] Administer screening tool (see selection guide in `features/sdoh-screener.md`):
  - Clinical setting → PRAPARE
  - CMS program → AHC Screen
  - Community/home visit → Quick Screen
- [ ] Score responses using risk algorithm
- [ ] For each flagged domain:
  - [ ] Identify appropriate resources (`features/resource-navigator.md`)
  - [ ] Conduct warm handoff (call together, introduce, confirm appointment)
  - [ ] Document referral (resource, date, contact, type)
- [ ] Schedule follow-up per risk level:
  - Low → 90 days
  - Moderate → 30 days
  - High → 7 days
  - Critical → 24-48 hours + supervisor notification
- [ ] Code using ICD-10 Z-codes in EHR

**Documentation**: Screening results, referrals made, follow-up dates in client record
**Escalation**: Critical risk score → same-day intervention + supervisor notification
**Reference**: `features/sdoh-screener.md`, `features/resource-navigator.md`

---

## SOP 3: Media Inquiry Response

**Purpose**: Ensure accurate, timely, and authorized media communication.
**Responsible**: HCS, HDO | **Trigger**: Any media contact (reporter, outlet, request)
**Review cycle**: Annually

### Procedure
- [ ] Log the inquiry (reporter name, outlet, phone/email, deadline, topic)
- [ ] Assess urgency:
  - Breaking/crisis → respond within 1 hour
  - Same-day deadline → respond within 2 hours
  - Feature/investigative → respond within 24 hours
  - Routine → respond within 48 hours
- [ ] Route to subject matter expert for content (EPI for data, HDO for policy, PHN for clinical)
- [ ] HCS drafts response
- [ ] HDO approval required for all statements during crisis
- [ ] Legal review if litigation-adjacent
- [ ] Respond on the record (attributed to named spokesperson) unless strategic reason for background
- [ ] Document inquiry, response, and follow-up in media log
- [ ] Do NOT say "no comment" — say "I can't speak to that, but what I can tell you is..."

**Documentation**: Media inquiry log (date, reporter, outlet, topic, response, outcome)
**Escalation**: Legal questions → legal counsel. Multi-jurisdictional → state PIO
**Reference**: `communication/external-playbook.md` Section 1

---

## SOP 4: Critical Incident Notification

**Purpose**: Ensure staff are informed and prepared during emergencies.
**Responsible**: HDO, HCS | **Trigger**: Any event affecting public health or operations
**Review cycle**: Annually

### Procedure
- [ ] Verify facts (2 independent sources minimum before internal communication)
- [ ] Notify chain of command (HDO → division directors → supervisors)
- [ ] Draft staff notification using template (`communication/internal-playbook.md` Section 1.3):
  - What happened (brief, factual)
  - What we're doing
  - What staff need to know (schedule changes, talking points, safety)
  - Support available (EAP, peer support)
  - Media direction: "Direct all inquiries to [HCS contact]"
- [ ] Distribute via email + text for urgent incidents
- [ ] Activate relevant workflow if applicable (outbreak, substance crisis, etc.)
- [ ] Schedule follow-up updates at defined intervals
- [ ] Document all communications in incident file

**Documentation**: Incident log, all communications, timeline of actions
**Escalation**: Death → immediate notification. Multi-agency → coordination call within 2 hours
**Reference**: `communication/internal-playbook.md` Section 1.3

---

## SOP 5: Grant Application and Reporting

**Purpose**: Manage grant lifecycle from identification to closeout.
**Responsible**: PMG, HDO | **Trigger**: NOFO/RFP identified or grant calendar milestone
**Review cycle**: Annually (grant calendar reviewed quarterly)

### Procedure

**Pre-Application**:
- [ ] Review NOFO/RFP completely (not just summary)
- [ ] Assess fit (eligibility, alignment with strategic plan, staff capacity)
- [ ] Get leadership approval to apply
- [ ] Assign grant team (lead writer, budget, data, program expert)
- [ ] Build timeline working backward from deadline

**Application**:
- [ ] Compile needs assessment data (disaggregated by race, ethnicity, income, geography)
- [ ] Draft narrative per funder format (`templates/grant-and-policy-templates.md`)
- [ ] Develop budget with justification
- [ ] Create logic model
- [ ] Obtain letters of support (allow 2+ weeks)
- [ ] Internal review (content + compliance + budget)
- [ ] Submit at least 24 hours before deadline

**Post-Award**:
- [ ] Kick-off meeting with staff and partners
- [ ] Set up reporting calendar (interim + annual + final)
- [ ] Track deliverables against work plan
- [ ] Submit reports on time using funder templates
- [ ] Monitor budget burn rate quarterly

**Documentation**: Application file, award documents, reporting calendar, expenditure tracking
**Escalation**: Underspending (>25% variance) → budget modification request. Scope change → funder notification
**Reference**: `templates/grant-and-policy-templates.md`, `references/funding-guide.md`

---

## SOP 6: Data Request Processing

**Purpose**: Respond to data requests accurately, timely, and with appropriate privacy protections.
**Responsible**: DAT, EPI | **Trigger**: Internal or external data request received
**Review cycle**: Annually

### Procedure
- [ ] Log request (requestor, date, data elements, purpose, timeline)
- [ ] Assess scope and feasibility
- [ ] Determine privacy requirements:
  - [ ] Does this contain PHI? → HIPAA applies
  - [ ] Does this involve substance use data? → 42 CFR Part 2 applies
  - [ ] Is this a FOIA/open records request? → Route to FOIA officer
  - [ ] Is data sharing agreement required? → Route to legal
- [ ] Pull data from appropriate source
- [ ] De-identify if sharing externally (HIPAA Safe Harbor method):
  - Remove names, DOB, full ZIP (use 3-digit prefix), addresses
  - Suppress cells with count <5
  - Age ≥90 → "90+"
- [ ] Peer review data output for accuracy
- [ ] Deliver to requestor with source citation and methodology notes
- [ ] Document request and response

**Documentation**: Data request log, response file, privacy determination
**Escalation**: Sensitive requests (media, legal, legislative) → HDO notification before release
**Reference**: `communication/internal-playbook.md` Section 3.2, `schemas/sdoh-data-model.json`

---

## SOP 7: Community Advisory Board Meeting

**Purpose**: Ensure meaningful community engagement through well-managed advisory processes.
**Responsible**: CES, HDO | **Trigger**: Monthly (or per charter)
**Review cycle**: Annually (charter reviewed every 2 years)

### Procedure

**Pre-Meeting (1 week before)**:
- [ ] Prepare agenda (standing items: community update, data, decision items, action items)
- [ ] Distribute packet 5 business days before meeting
- [ ] Arrange logistics: interpretation, childcare, food, accessible venue, virtual option
- [ ] Confirm attendance
- [ ] Review outstanding action items from prior meeting

**During Meeting**:
- [ ] Welcome and introductions (especially for new members)
- [ ] Review and approve prior minutes
- [ ] Present agenda items — limit presentations to 15 min, leave time for discussion
- [ ] For decision items: present options, facilitate discussion, document decision
- [ ] Capture action items with responsible person and deadline
- [ ] Collect feedback on the meeting itself

**Post-Meeting**:
- [ ] Distribute minutes within 5 business days
- [ ] Process compensation for board members ($25-75 per meeting)
- [ ] Follow up on action items
- [ ] Report back to board on how their input was used (next meeting)

**Documentation**: Agenda, minutes, attendance, compensation records, action item tracker
**Escalation**: Quorum not met → reschedule or hold informational only (no votes). Community conflict → facilitator intervention
**Reference**: `roles/remaining-roles.md` (CES role)

---

## SOP 8: Immunization Compliance Review

**Purpose**: Ensure school immunization requirements are met and barriers addressed.
**Responsible**: PHN, SHC | **Trigger**: Annually (before school start) and ongoing
**Review cycle**: Annually

### Procedure

**Pre-School Year (June-August)**:
- [ ] Pull enrollment and immunization records from schools
- [ ] Cross-reference with state immunization registry (ShowMeVax in MO)
- [ ] Identify students not up-to-date
- [ ] Send notification letters to parents (include: which vaccines needed, where to get them free, deadline, exemption info)
- [ ] Organize catch-up clinics (school-based, community, health department)

**During School Year**:
- [ ] Track compliance rates by school
- [ ] Issue exclusion notices per state law for non-compliant students (with due process)
- [ ] Coordinate make-up clinics for excluded students
- [ ] Address barriers: cost (VFC program), transportation, hesitancy (HEAR framework), language

**Reporting**:
- [ ] Submit immunization coverage rates to state by deadline
- [ ] Report exemption rates (medical, religious, philosophical)
- [ ] Present compliance data to board annually

**Documentation**: Student immunization records, notification letters, compliance rates, exemption tracking
**Escalation**: <90% school compliance → targeted intervention plan. Cluster of exemptions → public health nursing outreach
**Reference**: `roles/remaining-roles.md` (SHC role), `messaging/trust-rebuilding-playbook.md`

---

## SOP 9: Quality Improvement Project Cycle

**Purpose**: Maintain a continuous quality improvement practice using PDSA methodology.
**Responsible**: QIC, project lead | **Trigger**: Quarterly minimum (or as needs arise)
**Review cycle**: Annually

### Procedure

**Identify** (Week 1):
- [ ] Select problem based on data (performance measures, complaints, process failures)
- [ ] Write aim statement: "By [date], improve [what] from [baseline] to [target] for [population]"
- [ ] Form improvement team (3-7 people including frontline staff)

**Analyze** (Weeks 2-3):
- [ ] Root cause analysis (fishbone diagram or 5-whys)
- [ ] Process map current state
- [ ] Identify potential changes to test

**PDSA Cycle** (Weeks 4-8):
- [ ] **Plan**: Predict what will happen. Define small test scope
- [ ] **Do**: Implement the change on a small scale
- [ ] **Study**: Compare results to prediction. Analyze data (run chart)
- [ ] **Act**: Adopt (spread), Adapt (modify and retest), or Abandon (try different change)

**Document and Share** (Week 8+):
- [ ] Complete QI storyboard (`artifacts/reporting-templates.md`)
- [ ] Present to leadership and staff
- [ ] Submit to QI portfolio
- [ ] Celebrate and recognize the team

**Documentation**: QI storyboard, data charts, project tracker
**Escalation**: Stalled project → QIC coaching session. Significant resource needs → leadership approval
**Reference**: `roles/remaining-roles.md` (QIC role)

---

## SOP 10: After-Action Review (AAR)

**Purpose**: Capture lessons learned after significant events to improve future response.
**Responsible**: EPC, HDO | **Trigger**: After any activation, exercise, or significant event
**Review cycle**: Annually (AAR process reviewed)

### Procedure

**Schedule** (within 2 weeks of event conclusion):
- [ ] Schedule 2-hour AAR session
- [ ] Invite all involved staff and key partners
- [ ] Assign facilitator (ideally not the incident commander — allows them to participate freely)

**Prepare**:
- [ ] Compile timeline of events
- [ ] Gather documentation (ICS forms, SitReps, communications, data)
- [ ] Prepare facilitation guide with structured questions

**Facilitate**:
- [ ] Review timeline: What was supposed to happen? What actually happened?
- [ ] Strengths: What worked well? Why?
- [ ] Areas for improvement: What didn't work? Why?
- [ ] Root causes: Was it training? Resources? Communication? Policy?
- [ ] Recommendations: Specific, actionable changes

**Rules**:
- Blame-free environment. Focus on systems, not individuals
- No rank in the room — everyone's perspective matters equally
- Document everything — the AAR report is the product

**Post-AAR**:
- [ ] Write AAR report within 2 weeks
- [ ] Assign corrective actions with responsible person and deadline
- [ ] Track corrective action completion
- [ ] Update relevant plans, SOPs, and training based on findings
- [ ] Share summary (not full AAR) with leadership and partners

**Documentation**: AAR report, corrective action tracker, updated plans
**Escalation**: Systemic failures identified → leadership briefing + plan revision
**Reference**: `workflows/cross-role-workflows-expanded.md`, `artifacts/reporting-templates.md`
