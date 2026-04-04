# Developer Integration Guide

> For engineers building health technology, civic tech, social services platforms, and community resource tools
> Data standards, API patterns, integration architecture, and compliance requirements

---

## Who This Is For

- **Health tech startups** building SDOH screening, referral, or care coordination platforms
- **Civic tech developers** building community resource directories, 211 systems, or constituent tools
- **Government IT teams** modernizing health department systems
- **EHR/EMR vendors** integrating social determinants into clinical workflows
- **Data engineers** building population health data pipelines
- **Mobile/web developers** building community-facing health apps

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                  USER LAYER                      │
│  Community members, CHWs, clinicians, planners   │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│              APPLICATION LAYER                    │
│  Screening tools, resource directories,           │
│  care coordination, reporting dashboards          │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│              INTEGRATION LAYER                    │
│  HL7 FHIR R4, SDOH data exchange, MCP tools,    │
│  Gravity Project standards, API gateway           │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│                DATA LAYER                         │
│  SDOH screening data, referral tracking,          │
│  population health, community resources           │
│  Schema: schemas/sdoh-data-model.json             │
└─────────────────────────────────────────────────┘
```

---

## Data Standards

### HL7 FHIR R4 (Required for health data interoperability)

SDOH data should be exchanged using **FHIR R4** resources aligned with the **Gravity Project** value sets.

| SDOH Domain | FHIR Resource | Code System |
|-------------|--------------|-------------|
| Screening responses | `QuestionnaireResponse` | LOINC (PRAPARE: 93025-5, AHC: 96777-8) |
| Conditions identified | `Condition` | ICD-10-CM Z-codes (Z59, Z56, Z55, Z60) |
| Goals | `Goal` | SNOMED CT |
| Referrals | `ServiceRequest` | SNOMED CT + Gravity SDOH value sets |
| Referral outcomes | `Task` | Gravity Project task codes |
| Consent | `Consent` | FHIR Consent resource |

**Gravity Project** (thegravityproject.net): The national standard for SDOH data exchange. Use Gravity-aligned value sets for all SDOH coding.

See `schemas/fhir-sdoh-mapping.json` for the full FHIR resource mapping.

### ICD-10 Z-Codes for SDOH

```
Z55   — Problems related to education and literacy
Z56   — Problems related to employment and unemployment
Z57   — Occupational exposure to risk factors
Z59   — Problems related to housing and economic circumstances
Z59.0 — Homelessness
Z59.1 — Inadequate housing
Z59.41— Food insecurity
Z59.5 — Extreme poverty
Z59.6 — Low income
Z59.82— Transportation insecurity
Z60   — Problems related to social environment
Z62   — Problems related to upbringing
Z63   — Problems related to primary support group
Z65   — Problems related to other psychosocial circumstances
```

### Open Data Standards

For community resource directories and public data:
- **HSDS (Human Services Data Specification)**: Open Referral standard for service directory data
- **211 LA taxonomy**: Standard classification for social services
- **Census ACS**: Demographic and socioeconomic data by geography
- **CDC PLACES**: Census-tract level health estimates (API available)
- **County Health Rankings**: County-level health data (downloadable)

---

## Integration Patterns

### Pattern 1: SDOH Screening → EHR Integration

```
Client encounter
    │
    ▼
┌─────────────────┐    FHIR QuestionnaireResponse
│ Screening Tool   │──────────────────────────────►┌──────────┐
│ (PRAPARE/AHC)    │                                │   EHR    │
└────────┬────────┘    FHIR Condition (Z-codes)     │ (Epic,   │
         │          ──────────────────────────────►  │  Cerner, │
         ▼                                          │  etc.)   │
┌─────────────────┐    FHIR ServiceRequest          └──────────┘
│ Risk Scoring     │──────────────────────────────►
│ (tools/sdoh-     │    FHIR Task (referral status)
│  score.ts)       │◄──────────────────────────────
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Resource Match   │──── Closed-loop referral tracking
��� (resource-       │
│  navigator.md)   │
└─────────────────┘
```

**Key requirements**:
- SMART on FHIR launch context for EHR embedding
- OAuth 2.0 authorization
- Bulk FHIR for population-level data extraction
- CDS Hooks for clinical decision support at point of care

### Pattern 2: Community Resource Directory API

```
Resource Directory API (HSDS-compliant)

GET /resources
  ?domain=housing
  &tier=emergency
  &zip=63101
  &language=es

Response:
{
  "resources": [
    {
      "id": "res-001",
      "name": "St. Patrick Center",
      "description": "Emergency shelter and housing services",
      "phone": "314-802-0700",
      "address": "800 N Tucker Blvd, St. Louis, MO 63101",
      "hours": "24/7 intake",
      "eligibility": "Adults experiencing homelessness",
      "languages": ["en", "es"],
      "sdoh_domain": "housing",
      "tier": "emergency",
      "last_verified": "2026-01-15",
      "accepts_referrals": true,
      "referral_method": "phone"
    }
  ],
  "total": 12,
  "updated": "2026-04-04"
}
```

**Maintenance**: Resources must be verified quarterly. Include `last_verified` timestamp. Flag resources not verified in >90 days.

### Pattern 3: Population Health Dashboard

```
Data pipeline:

CDC PLACES API ──┐
BRFSS data ────��─┤
Vital statistics ─┤──► ETL ──► Data Warehouse ──► Dashboard
Census ACS ──────┤              │                  (Tableau/
Program data ────┘              │                   Power BI/
                                ▼                   R Shiny)
                          De-identification
                          (HIPAA Safe Harbor)
                                │
                                ▼
                          Public dashboard
                          (WCAG 2.1 AA accessible)
```

**Equity requirement**: Every visualization must support disaggregation by race, ethnicity, income, and geography. This is not optional — it's Guardrail #3.

### Pattern 4: Closed-Loop Referral System

```
Screening ──► Risk Score ──► Resource Match ──► Referral Sent
                                                     │
                                                     ▼
                                              Receiving Org
                                              Accepts/Declines
                                                     │
                                                     ▼
                                              Service Delivered
                                                     │
                                                     ▼
Follow-up ◄── Outcome Recorded ◄── Status Updated ──┘
```

**Closed-loop tracking** means you know whether the referral was completed and the need was met — not just that a phone number was given. This requires:
- Bidirectional data exchange with receiving organizations
- Standardized status codes (pending, connected, completed, declined, lost to follow-up)
- Automated follow-up triggers based on status and timeframe
- Schema: `schemas/sdoh-data-model.json` (referrals and follow_ups tables)

---

## Compliance Requirements

### HIPAA (Health Insurance Portability and Accountability Act)

| Requirement | What It Means for Developers |
|-------------|------------------------------|
| **Minimum necessary** | Only access/transmit data needed for the specific purpose |
| **Access controls** | Role-based access, unique user IDs, automatic logoff |
| **Audit logs** | Log all access to PHI (who, when, what) |
| **Encryption** | At rest (AES-256) and in transit (TLS 1.2+) |
| **BAA** | Business Associate Agreement required with any vendor handling PHI |
| **Breach notification** | Report breaches within 60 days (see `artifacts/reporting-templates.md` Section 6.1) |
| **De-identification** | Safe Harbor method for public data (see `schemas/sdoh-data-model.json`) |

### 42 CFR Part 2 (Substance Use Records)

**Stricter than HIPAA.** If your system captures ANY substance use information during SDOH screening:
- Cannot share without specific written consent (more restrictive than HIPAA consent)
- Cannot be used in legal proceedings without court order
- Consent must specify: what data, with whom, for what purpose, expiration
- Applies to ALL records that identify someone as having a substance use disorder

### Accessibility (Section 508 / WCAG 2.1 AA)

All public-facing tools must meet:
- Color contrast ≥4.5:1 for text
- Keyboard navigable (no mouse-only interactions)
- Screen reader compatible (ARIA labels, semantic HTML)
- Alt text on all images
- Captions on all video/audio
- 200% zoom without loss of content
- No content that flashes >3 times per second

### Data Privacy for Community Resource Tools

Even non-clinical tools need privacy protections:
- Don't track users without consent
- Don't sell or share user data with third parties
- Provide clear privacy policy in plain language
- Allow data deletion requests
- Don't require personal information for resource lookups
- Be transparent about what you collect and why

---

## MCP Tool Integration

This project defines 10 MCP (Model Context Protocol) tools for AI integration. See `mcp/MCP-SCHEMA.md` for full schemas.

```typescript
// Example: Using the sdoh_screen MCP tool
const result = await mcpClient.call("sdoh_screen", {
  tool: "quick_screen",
  responses: {
    foodHousingUtilities: true,
    transportation: false,
    medication: true,
    safety: true,
    depression: false
  }
});

// result.risk_level: "moderate"
// result.domains_flagged: ["food", "healthcare"]
// result.recommendations: [...]
```

---

## Getting Started (for Developers)

1. **Read** `SKILL.md` — understand the core routing loop
2. **Study** `schemas/sdoh-data-model.json` — the data model
3. **Review** `mcp/MCP-SCHEMA.md` — the AI tool interface
4. **Implement** screening using `features/sdoh-screener.md` questions and `tools/sdoh-score.ts` scoring
5. **Build** resource matching using `features/resource-navigator.md` structure
6. **Test** against `evals/EVAL-SUITE.md` — especially Category 5 (safety and privacy)
7. **Comply** with HIPAA, 42 CFR Part 2, and WCAG 2.1 AA from day one (not retrofitted)

### Developer Tools in This Repo
- `tools/sdoh-score.ts` — TypeScript SDOH risk scoring algorithm
- `tools/campaign-generator.ts` — Campaign planning engine
- `tools/apha-fetcher.js` — APHA evidence reference lookup
- `schemas/sdoh-data-model.json` — HIPAA-ready 5-table data model
- `schemas/fhir-sdoh-mapping.json` — FHIR R4 resource mapping
