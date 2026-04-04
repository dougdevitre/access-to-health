# Health Tech Vendor Guide — Compliance, Interoperability, and Procurement

> For technology companies building or selling health products to government and health organizations
> What you need to know, what you need to build, and how to win procurement

---

## Market Context

### Who Buys Health Technology

| Buyer | Budget Source | Decision Maker | Procurement Process |
|-------|-------------|----------------|---------------------|
| **Local health departments** | Federal grants, local tax | Health Director + IT | RFP or small purchase (varies by amount) |
| **State health agencies** | Federal + state funds | Procurement office | Formal RFP, often statewide contract |
| **Hospitals / health systems** | Operating revenue | CIO/CMIO + clinical leads | RFP or vendor selection committee |
| **FQHCs** | HRSA grants + revenue | CEO + IT | RFP or cooperative purchasing |
| **Medicaid MCOs** | Medicaid capitation | VP of Population Health | RFP or pilot program |
| **Community organizations** | Grants + donations | Executive Director | Informal to formal depending on amount |

### What Health Departments Actually Need

| Need | Current State | Technology Opportunity |
|------|-------------|----------------------|
| **SDOH screening** | Paper forms or basic EHR modules | Integrated screening → scoring → referral → follow-up |
| **Referral management** | Phone calls and faxes | Closed-loop electronic referral with outcome tracking |
| **Community resource directory** | Outdated PDFs or spreadsheets | Real-time, verified, searchable, HSDS-compliant directory |
| **Disease surveillance** | Legacy state systems (EpiTrax, ESSENCE) | Modern, interoperable, real-time surveillance platforms |
| **Population health dashboards** | Excel or basic Tableau | Automated, equity-disaggregated, public-facing dashboards |
| **Care coordination** | Fragmented, manual tracking | Unified client record across programs with task management |
| **Communication** | Ad hoc, inconsistent | Multichannel campaign management (email, SMS, social, print) |
| **Reporting** | Manual report generation | Automated reporting from data warehouse |
| **Training** | In-person, inconsistent | LMS with competency tracking and CE credit management |

---

## Compliance Requirements (Non-Negotiable)

### HIPAA Compliance

If your product touches **any** health information:

| Requirement | What You Must Do |
|-------------|-----------------|
| **BAA** | Sign a Business Associate Agreement before accessing any PHI |
| **Encryption** | AES-256 at rest, TLS 1.2+ in transit |
| **Access controls** | Role-based access, unique user IDs, auto-logoff, MFA |
| **Audit logging** | Log all PHI access: who, when, what, why |
| **Breach notification** | Report breaches within 60 days. Have incident response plan |
| **Minimum necessary** | Only access data needed for the specific function |
| **Data retention** | Retain per HIPAA requirements (6 years for policies/procedures) |
| **Training** | HIPAA training for all staff who access PHI |

**Proving compliance**: SOC 2 Type II audit is the industry standard. HITRUST CSF certification is preferred by larger health organizations.

### 42 CFR Part 2 (Substance Use Records)

If your product may capture substance use information:
- **Stricter than HIPAA** — specific written consent required for any disclosure
- Cannot be shared with law enforcement without court order
- Consent must specify: what data, with whom, for what purpose, expiration
- Technical implementation: Separate or flagged data partitions, consent management workflow

### Section 508 / WCAG 2.1 AA (Accessibility)

**Required for any product sold to government.** Also required for products used by the public.

| Standard | Requirement |
|----------|-------------|
| Color contrast | ≥4.5:1 for normal text, ≥3:1 for large text |
| Keyboard navigation | All functions accessible without mouse |
| Screen readers | ARIA labels, semantic HTML, skip navigation |
| Forms | Labels associated with inputs, error messages clear |
| Images | Alt text on all meaningful images |
| Video/audio | Captions and transcripts |
| Zoom | Content usable at 200% zoom |
| Language | Reading level appropriate for audience |

**Testing tools**: axe DevTools, WAVE, Lighthouse, NVDA/JAWS screen reader testing

### FedRAMP / StateRAMP (Cloud)

If hosting data for government:
- **FedRAMP**: Required for federal agencies. Authorization process takes 6-18 months
- **StateRAMP**: Emerging equivalent for state/local. Faster than FedRAMP
- At minimum: Cloud hosted in US, SOC 2, encryption, incident response plan

---

## Interoperability Standards

### Must-Have Standards

| Standard | Purpose | When Required |
|----------|---------|---------------|
| **HL7 FHIR R4** | Health data exchange | Any product exchanging clinical or SDOH data |
| **SMART on FHIR** | EHR app launch and authorization | Products embedding in EHR workflows |
| **CDS Hooks** | Clinical decision support at point of care | Products providing alerts or recommendations |
| **Gravity Project** | SDOH data coding standards | Any SDOH screening, referral, or reporting |
| **USCDI** | US Core Data for Interoperability | Any ONC-certified health IT |
| **HSDS** | Human services data specification | Community resource directories |
| **HL7 eCR** | Electronic case reporting | Disease surveillance and reporting |
| **ADT** | Admit-Discharge-Transfer notifications | Care coordination, ED utilization |

### Integration Architecture

```
Your Product
    │
    ├── FHIR R4 API ──────► EHR Systems (Epic, Cerner, Athena)
    │                        SMART on FHIR launch context
    │
    ├── HSDS API ─────��───► Resource Directories (211, Findhelp, Unite Us)
    │
    ├── HL7 eCR ──────────► Disease Surveillance (state EpiTrax, CDC)
    │
    ├── ADT feeds ────────► HIE (Health Information Exchange)
    │
    ├── REST/GraphQL ─────��� State Immunization Registry (IIS)
    │
    ├── Flat file/SFTP ───► Legacy state systems (Medicaid, vital records)
    │
    └── OAuth 2.0 / SAML ─► Identity management (SSO)
```

---

## Procurement Guide

### How Health Departments Buy Technology

| Purchase Amount | Process | Timeline |
|----------------|---------|----------|
| <$5,000 | Direct purchase (P-card or PO) | Days |
| $5,000-$25,000 | 3 quotes minimum | 2-4 weeks |
| $25,000-$100,000 | Informal RFP or competitive quotes | 4-8 weeks |
| >$100,000 | Formal RFP through procurement | 3-6 months |
| >$250,000 | Formal RFP + board/council approval | 4-9 months |

### How to Win a Health Department RFP

**Do**:
- Show you understand public health workflows (reference this repo)
- Demonstrate HIPAA and 42 CFR Part 2 compliance (SOC 2 report)
- Show FHIR interoperability (not "we can build it" — show it working)
- Provide references from similar-size health departments
- Include implementation timeline with milestones
- Address data migration from legacy systems
- Show equity features (disaggregation, plain language, multilingual, accessible)
- Price transparently (no hidden fees, clear per-user or per-module pricing)
- Offer a pilot or proof of concept

**Don't**:
- Oversell AI/ML without explaining the training data, bias testing, and human oversight
- Claim "HIPAA compliant" without a SOC 2 or equivalent certification
- Ignore accessibility (government buyers are required to verify 508 compliance)
- Require internet access for field-based tools (CHWs work in homes and shelters)
- Lock in data (provide data export in standard formats)
- Require multi-year contracts without out clauses

### Pricing Models That Work for Government

| Model | Pros | Cons | Best For |
|-------|------|------|----------|
| **Per user/month** | Predictable, scalable | Can get expensive with large teams | Small-medium departments |
| **Per module** | Pay for what you use | Complexity in budgeting | Departments wanting specific features |
| **Site license** | Unlimited users, simple | May overpay if small | Large departments |
| **Tiered (small/med/large)** | Simple pricing | May not fit exactly | Broad market |
| **Grant-funded pilot** | Low risk for buyer | Revenue uncertainty for vendor | New products, new relationships |

---

## Product Requirements Checklist

### Core Features for SDOH Platforms

- [ ] **Screening**: PRAPARE, AHC, Quick Screen (validated instruments, not custom)
- [ ] **Scoring**: Automated risk scoring per `features/sdoh-screener.md` algorithm
- [ ] **Resource matching**: Domain × tier × geography matching per `features/resource-navigator.md`
- [ ] **Referral**: Electronic referral with consent management
- [ ] **Closed-loop tracking**: Know whether referral was completed and need was met
- [ ] **Follow-up**: Automated follow-up scheduling per risk level
- [ ] **Reporting**: Aggregate data with equity disaggregation
- [ ] **Interoperability**: FHIR R4 + Gravity Project for data exchange
- [ ] **Accessibility**: WCAG 2.1 AA compliant
- [ ] **Multilingual**: English + Spanish minimum, extensible
- [ ] **Offline capable**: Works without internet for field-based screening
- [ ] **Privacy**: HIPAA + 42 CFR Part 2 compliant from architecture level
- [ ] **Data export**: Standard formats (CSV, FHIR, JSON) — no vendor lock-in
- [ ] **Equity dashboard**: Disaggregation by race, ethnicity, income, geography by default

### AI/ML Product Requirements

If your product uses AI/ML:
- [ ] Training data documented and bias-tested
- [ ] Model outputs explainable (not black box)
- [ ] Human oversight for clinical or safety-critical decisions
- [ ] Performance tested across racial, ethnic, and socioeconomic groups
- [ ] No algorithmic bias that worsens health disparities
- [ ] Consent for data use in model training
- [ ] Regular model retraining and performance monitoring
- [ ] Clear documentation of limitations and failure modes

---

## Partnership Opportunities

### How Tech Companies Can Partner with Health Departments

| Model | Description | Example |
|-------|------------|---------|
| **Pilot program** | Free or reduced-cost pilot in exchange for case study | 6-month pilot of SDOH screening platform |
| **Grant partnership** | Health dept applies for grant, vendor provides technology | CDC grant funds licensing for surveillance tool |
| **In-kind contribution** | Donate technology or services | Dashboard development for community health data |
| **Co-development** | Build together based on health dept's domain expertise | Custom workflow tool designed with frontline staff |
| **Research partnership** | Academic evaluation of technology impact | University evaluates tool's effect on referral completion |

**Key principle**: Technology should serve the community, not extract from it. Health departments will not partner with companies that sell community data, create vendor lock-in, or build products without community input.
