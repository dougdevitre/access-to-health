# Role Registry — Access to Health

> **Purpose**: Master routing index. This is the FIRST file loaded (Step 1 in the system routing loop). Maps all 20 roles across 9 pods. Routes users to the correct role file, identifies cross-role handoffs, and enforces pod boundaries.

> **Missouri reference implementation. Nationally applicable.**

---

## Routing Decision Tree

Use the keyword triggers below to identify your role. If multiple roles match, start with the one closest to your daily work.

```
What best describes your primary work?

├─ Outbreak / disease surveillance / epi curves / case investigation
│   └─ → EPI (Epidemiologist)
│
├─ Contact tracing / partner notification / STI-HIV field work
│   └─ → DIS (Disease Intervention Specialist)
│
├─ Dashboards / data quality / reporting / ETL / visualization
│   └─ → DAT (Data Analyst / Informaticist)
│
├─ Home visits / resource navigation / SDOH screening / enrollment assistance
│   └─ → CHW (Community Health Worker)
│
├─ Advisory boards / listening sessions / community assessment / engagement
│   └─ → CES (Community Engagement Specialist)
│
├─ Immunizations / clinical nursing / school health nursing / chronic disease
│   └─ → PHN (Public Health Nurse)
│
├─ Dental access / sealant programs / fluoridation / oral health
│   └─ → OHC (Oral Health Coordinator)
│
├─ Mental health assessment / crisis intervention / integrated behavioral care
│   └─ → BHC (Behavioral Health Clinician)
│
├─ Substance use prevention / coalitions / SBIRT / harm reduction / naloxone
│   └─ → SUP (Substance Use Prevention Specialist)
│
├─ Prenatal / postpartum / infant mortality / home visiting programs / Title V
│   └─ → MCH (MCH Specialist)
│
├─ WIC / breastfeeding / nutrition counseling / food prescriptions
│   └─ → NUT (WIC Nutritionist / Dietitian)
│
├─ Health education / workshops / curriculum design / CHES / health literacy
│   └─ → HED (Health Educator / CHES)
│
├─ School wellness policy / mandated screenings / school mental health / IHPs
│   └─ → SHC (School Health Coordinator)
│
├─ Inspections / food safety / lead / water quality / hazmat / vector control
│   └─ → EHS (Environmental Health Specialist)
│
├─ Department strategy / emergency authority / budget / governance / accreditation
│   └─ → HDO (Health Director)
│
├─ Legislative tracking / HIA / Health in All Policies / advocacy coalitions
│   └─ → POL (Policy Analyst / Advocate)
│
├─ Grants / program operations / supervision / evaluation / contracts
│   └─ → PMG (Program Manager)
│
├─ PDSA / performance management / PHAB / quality improvement
│   └─ → QIC (QI Coordinator)
│
├─ Emergency preparedness / exercises / ESF-8 / PHEP / SNS / MRC
│   └─ → EPC (Emergency Preparedness Coordinator)
│
└─ Media relations / social media / crisis communications / campaigns / messaging
    └─ → HCS (Health Communications Specialist)
```

---

## Pod Summary Table

| # | Pod | Roles (Code) | Pod Function | Primary Outputs |
|---|-----|-------------|--------------|-----------------|
| 1 | **Surveillance** | EPI, DIS, DAT | Detect, investigate, and quantify health threats | Epi curves, line lists, dashboards, case reports |
| 2 | **Community** | CHW, CES | Connect residents to services; center community voice | SDOH referrals, advisory board reports, CHNA engagement |
| 3 | **Clinical** | PHN, OHC | Deliver population-level clinical and preventive services | Immunization records, IHPs, sealant reports, clinic data |
| 4 | **Behavioral Health** | BHC, SUP | Address mental health and substance use across the continuum | Assessments, crisis plans, SBIRT rates, naloxone logs |
| 5 | **Maternal-Child Health** | MCH, NUT | Improve outcomes from preconception through early childhood | Home visit records, WIC certifications, Title V reports |
| 6 | **Education** | HED, SHC | Build health literacy in community and school settings | Curricula, CE courses, wellness policies, screening reports |
| 7 | **Environment** | EHS | Protect health through regulation of physical environment | Inspection reports, lead investigations, water quality data |
| 8 | **Policy & Leadership** | HDO, POL | Set direction, secure authority, and advance health policy | Strategic plans, policy briefs, budgets, testimony |
| 9 | **Operations** | PMG, QIC, EPC, HCS | Run programs, assure quality, prepare for emergencies, communicate | Grant reports, QI storyboards, EOP, press releases |

---

## Full Role Index

### Pod 1: Surveillance

| Code | Full Title | Key File | Scope | Key Partnerships |
|------|-----------|----------|-------|-----------------|
| **EPI** | Epidemiologist | `roles/epi.md` | Disease surveillance, outbreak investigation, epi analysis, study design, situational awareness | DIS, DAT, PHN, EHS, HDO |
| **DIS** | Disease Intervention Specialist | `roles/remaining-roles.md` | Partner notification (STI/HIV), contact tracing (TB, outbreaks), linkage to care, field investigation | EPI, PHN, BHC, CHW |
| **DAT** | Data Analyst / Informaticist | `roles/remaining-roles.md` | Dashboards, data quality, ETL, reporting, visualization, advanced analytics, interoperability | EPI, PMG, QIC, HDO |

### Pod 2: Community

| Code | Full Title | Key File | Scope | Key Partnerships |
|------|-----------|----------|-------|-----------------|
| **CHW** | Community Health Worker | `roles/chw.md` | SDOH screening, resource navigation, home visits, enrollment assistance, care coordination | PHN, BHC, CES, NUT, HED |
| **CES** | Community Engagement Specialist | `roles/remaining-roles.md` | Advisory boards, listening sessions, CHNA community engagement, participatory budgeting | CHW, HDO, POL, HCS |

### Pod 3: Clinical

| Code | Full Title | Key File | Scope | Key Partnerships |
|------|-----------|----------|-------|-----------------|
| **PHN** | Public Health Nurse | `roles/phn.md` | Immunizations, maternal-child health nursing, chronic disease, school health, clinical services | CHW, MCH, EPI, SHC, OHC |
| **OHC** | Oral Health Program Coordinator | `roles/remaining-roles.md` | Dental access programs, school sealant programs, community water fluoridation, oral-systemic education | PHN, SHC, CHW, POL |

### Pod 4: Behavioral Health

| Code | Full Title | Key File | Scope | Key Partnerships |
|------|-----------|----------|-------|-----------------|
| **BHC** | Behavioral Health Clinician | `roles/priority-roles.md` | Mental health assessment, crisis intervention, integrated primary care-behavioral health, group therapy | CHW, PHN, SUP, DIS, MCH |
| **SUP** | Substance Use Prevention Specialist | `roles/remaining-roles.md` | Community coalitions (DFC/CADCA), youth prevention, SBIRT, harm reduction, environmental strategies | BHC, CHW, SHC, HED, POL |

### Pod 5: Maternal-Child Health

| Code | Full Title | Key File | Scope | Key Partnerships |
|------|-----------|----------|-------|-----------------|
| **MCH** | MCH Specialist | `roles/priority-roles.md` | Prenatal/postpartum care coordination, infant mortality review, home visiting, Title V, FIMR/CDMR | PHN, NUT, CHW, BHC, HDO |
| **NUT** | WIC Nutritionist / Dietitian | `roles/remaining-roles.md` | WIC certification, nutrition counseling, breastfeeding support, medical nutrition therapy, community nutrition | PHN, MCH, CHW, HED |

### Pod 6: Education

| Code | Full Title | Key File | Scope | Key Partnerships |
|------|-----------|----------|-------|-----------------|
| **HED** | Health Educator / CHES | `roles/remaining-roles.md` | Program design, workshop facilitation, materials development, CE/CME administration, health literacy | CHW, SHC, HCS, CES, PMG |
| **SHC** | School Health Coordinator | `roles/remaining-roles.md` | Local wellness policy, mandated screenings, school mental health (MTSS), chronic disease management (IHP) | HED, PHN, BHC, SUP, NUT |

### Pod 7: Environment

| Code | Full Title | Key File | Scope | Key Partnerships |
|------|-----------|----------|-------|-----------------|
| **EHS** | Environmental Health Specialist | `roles/priority-roles.md` | Food/facility inspections, lead investigations, water quality, hazmat response, vector control, land use | EPI, HDO, POL, PHN, HCS |

### Pod 8: Policy & Leadership

| Code | Full Title | Key File | Scope | Key Partnerships |
|------|-----------|----------|-------|-----------------|
| **HDO** | Health Director | `roles/hdo.md` | Department strategy, emergency authority, budget, workforce, governance, accreditation, interagency | POL, PMG, QIC, EPI, HCS |
| **POL** | Policy Analyst / Advocate | `roles/remaining-roles.md` | Legislative tracking, health impact assessment, coalition leadership, Health in All Policies (HiAP) | HDO, HCS, CES, DAT |

### Pod 9: Operations

| Code | Full Title | Key File | Scope | Key Partnerships |
|------|-----------|----------|-------|-----------------|
| **PMG** | Program Manager | `roles/priority-roles.md` | Grant management, program operations, staff supervision, evaluation, contracts, reporting | HDO, QIC, DAT, HED, all program staff |
| **QIC** | QI Coordinator | `roles/remaining-roles.md` | Performance management, PHAB accreditation, CQI (PDSA), customer/community satisfaction | HDO, PMG, DAT, all staff |
| **EPC** | Emergency Preparedness Coordinator | `roles/priority-roles.md` | Emergency operations planning, exercises, ESF-8, PHEP, SNS, Medical Reserve Corps, COOP | HDO, EPI, HCS, PHN, EHS |
| **HCS** | Health Communications Specialist | `roles/priority-roles.md` | Media relations, crisis communications, campaigns, social media, internal communications | HDO, EPI, HED, CES, POL |

---

## Key File Reference Map

| File | Roles Covered | Status |
|------|--------------|--------|
| `roles/ROLE-REGISTRY.md` | All 20 (this file) | Active |
| `roles/epi.md` | EPI (deep dive) | Planned |
| `roles/chw.md` | CHW (deep dive) | Planned |
| `roles/phn.md` | PHN (deep dive) | Planned |
| `roles/hdo.md` | HDO (deep dive) | Planned |
| `roles/priority-roles.md` | BHC, EHS, MCH, HCS, PMG, EPC | Planned |
| `roles/remaining-roles.md` | DIS, NUT, SUP, SHC, OHC, CES, QIC, DAT, POL, HED | Active |

---

## Cross-Role Handoff Rules

Handoffs occur when a task crosses pod boundaries. Every handoff must include: **who is handing off, who is receiving, what information transfers, and what the receiving role is expected to do**.

### Handoff Trigger Matrix

| Trigger Condition | Sending Role(s) | Receiving Role(s) | Handoff Content |
|-------------------|-----------------|-------------------|-----------------|
| Positive lab / reportable condition identified | PHN, provider | EPI → DIS | Case report, demographics, lab results, provider contact |
| Outbreak suspected (3+ linked cases) | EPI | HDO, EHS, HCS, PHN | Initial assessment, case count, suspected source, timeline |
| SDOH screen reveals unmet need | CHW, PHN, BHC | CHW (if not already lead) | Screening results, priority domains, consent, contact info |
| Behavioral health crisis during visit | CHW, PHN | BHC | Presenting symptoms, safety assessment, history, consent |
| Substance use disclosed during care | PHN, BHC, CHW | SUP (for prevention) or BHC (for treatment) | SBIRT results, consent, readiness assessment |
| Environmental hazard found during investigation | EHS | EPI (epi data), HCS (public notice), HDO (authority) | Hazard type, location, population at risk, timeline |
| Lead-elevated child identified | PHN, provider | EHS (home inspection), CHW (family navigation) | BLL results, address, child age, family contact |
| Prenatal patient with risk factors | PHN, provider | MCH, NUT (WIC), BHC (if behavioral health) | Gestational age, risk factors, insurance status, consent |
| Community concern escalated | CES | HDO, POL | Listening session data, community priority, affected population |
| Media inquiry / public attention | Any role | HCS (first), HDO (approval) | Topic, facts verified, timeline, spokesperson recommendation |
| Grant reporting due | PMG | DAT (data pull), program staff (narrative) | Reporting period, measures, templates, deadline |
| Quality issue identified | QIC | Relevant program staff, PMG | Performance data, deviation description, PDSA recommendation |
| Emergency event activated | EPC | HDO (authority), EPI (surveillance), HCS (comms), PHN (clinical) | Event type, ICS activation level, assigned roles |
| Policy window opens (bill introduced, regulation comment period) | POL | HDO (position), HCS (messaging), CES (community input) | Bill summary, health impact, timeline, ask |

### Handoff Protocol

1. **Initiate**: Sending role documents the trigger, assembles required information, and contacts receiving role directly (phone or secure message for urgent; email or system referral for routine).
2. **Accept**: Receiving role acknowledges within defined SLA:
   - **Emergency / crisis**: 1 hour
   - **Urgent (reportable disease, media, safety)**: 4 hours
   - **Routine (referral, data request, program coordination)**: 2 business days
3. **Transfer**: Information moves via approved channel (EHR referral, surveillance system, secure email — never unsecured text or personal email). All transfers comply with HIPAA and 42 CFR Part 2.
4. **Confirm**: Receiving role confirms receipt and expected action timeline.
5. **Close loop**: Sending role is notified of outcome or disposition. If no response within SLA, escalate to pod lead or supervisor.

### Cross-Pod Workflow References

For detailed decision trees, timelines, templates, and escalation paths for the 8 major cross-role workflows, see:

- `workflows/cross-role-workflows-expanded.md` (active)

---

## Guardrails (Always Active)

Every response, artifact, and recommendation generated through this system must comply with all 10 guardrails simultaneously. These are not optional filters — they are structural constraints.

| # | Guardrail | Operational Meaning |
|---|-----------|-------------------|
| 1 | **Evidence-based** | Cite APHA, CDC, WHO, or peer-reviewed sources. No unsupported claims. |
| 2 | **Trauma-informed** | Assume adversity. Prioritize safety, trustworthiness, choice, collaboration, empowerment. |
| 3 | **Equity lens** | Name disparities. Disaggregate data. Address root causes, not just symptoms. |
| 4 | **Culturally responsive** | Adapt to community context. No one-size-fits-all. Engage cultural brokers. |
| 5 | **Politically neutral** | Present evidence without partisan framing. Health departments serve all residents. |
| 6 | **Privacy-first** | HIPAA, 42 CFR Part 2, state confidentiality laws. Minimum necessary standard. |
| 7 | **Plain language** | 6th-grade reading level for public-facing materials. Flesch-Kincaid verified. |
| 8 | **Person-first language** | "Person with diabetes," not "diabetic." "Person experiencing homelessness," not "homeless person." |
| 9 | **Community voice** | Community members are experts in their own experience. Co-design, not prescribe. |
| 10 | **Missouri reference, nationally applicable** | Ground examples in MO (statutes, DHSS, local agencies). Framework works in any state. |

---

## Quick-Reference: All 20 Roles by Code

```
Code  Title                                Pod
----  -----                                ---
EPI   Epidemiologist                       Surveillance
DIS   Disease Intervention Specialist      Surveillance
DAT   Data Analyst / Informaticist         Surveillance
CHW   Community Health Worker              Community
CES   Community Engagement Specialist      Community
PHN   Public Health Nurse                  Clinical
OHC   Oral Health Program Coordinator      Clinical
BHC   Behavioral Health Clinician          Behavioral Health
SUP   Substance Use Prevention Specialist  Behavioral Health
MCH   MCH Specialist                       Maternal-Child Health
NUT   WIC Nutritionist / Dietitian         Maternal-Child Health
HED   Health Educator / CHES               Education
SHC   School Health Coordinator            Education
EHS   Environmental Health Specialist      Environment
HDO   Health Director                      Policy & Leadership
POL   Policy Analyst / Advocate            Policy & Leadership
PMG   Program Manager                      Operations
QIC   QI Coordinator                       Operations
EPC   Emergency Preparedness Coordinator   Operations
HCS   Health Communications Specialist     Operations
```

---

*Last updated: 2026-04-04*
*System file: Step 1 of routing loop. Loaded before role files, population files, or workflow files.*
