# Cross-Sector Data Standards — FHIR, SDOH Exchange, and Open Data

> Technical reference for data interoperability across health, social services, housing, and government
> For data engineers, system architects, and interoperability specialists

---

## Data Exchange Landscape

```
                         ┌─────────────────────┐
                         │   POPULATION HEALTH  │
                         │    DATA WAREHOUSE    │
                         └──────────┬──────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
    ┌────▼────┐              ┌──────▼──────┐            ┌──────▼──────┐
    │ CLINICAL│              │   SOCIAL    │            │  COMMUNITY  │
    │  DATA   │              │  SERVICES   │            │    DATA     │
    │         │              │    DATA     │            │             │
    │ HL7 FHIR│              │ HSDS/Gravity│            │ Census/CDC  │
    │ eCR/ADT │              │ 211/HMIS    │            │ PLACES/ACS  │
    └────┬────┘              └──────┬──────┘            └──────┬──────┘
         │                          │                          │
    EHR Systems              Social Service Orgs          Public APIs
    HIE/QHIN                 Referral Platforms            Data.gov
    Labs/Registries          Housing/Benefits              MICA
```

---

## FHIR R4 Implementation Guide for SDOH

### SDOH Screening (QuestionnaireResponse)

```json
{
  "resourceType": "QuestionnaireResponse",
  "status": "completed",
  "questionnaire": "http://loinc.org/q/93025-5",
  "authored": "2026-04-04T10:00:00Z",
  "subject": {
    "reference": "Patient/example"
  },
  "item": [
    {
      "linkId": "housing-status",
      "text": "What is your housing situation today?",
      "answer": [
        {
          "valueCoding": {
            "system": "http://loinc.org",
            "code": "LA30190-5",
            "display": "I have housing"
          }
        }
      ]
    },
    {
      "linkId": "food-insecurity-1",
      "text": "Within the past 12 months, you worried that food would run out",
      "answer": [
        {
          "valueCoding": {
            "system": "http://loinc.org",
            "code": "LA28397-0",
            "display": "Often true"
          }
        }
      ]
    }
  ]
}
```

### SDOH Condition (Identified Need)

```json
{
  "resourceType": "Condition",
  "clinicalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
        "code": "active"
      }
    ]
  },
  "category": [
    {
      "coding": [
        {
          "system": "http://hl7.org/fhir/us/sdoh-clinicalcare/CodeSystem/SDOHCC-CodeSystemTemporaryCodes",
          "code": "food-insecurity",
          "display": "Food Insecurity"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/sid/icd-10-cm",
        "code": "Z59.41",
        "display": "Food insecurity"
      },
      {
        "system": "http://snomed.info/sct",
        "code": "733423003",
        "display": "Food insecurity"
      }
    ]
  },
  "subject": {
    "reference": "Patient/example"
  },
  "onsetDateTime": "2026-04-04"
}
```

### SDOH Referral (ServiceRequest)

```json
{
  "resourceType": "ServiceRequest",
  "status": "active",
  "intent": "order",
  "category": [
    {
      "coding": [
        {
          "system": "http://hl7.org/fhir/us/sdoh-clinicalcare/CodeSystem/SDOHCC-CodeSystemTemporaryCodes",
          "code": "food-insecurity",
          "display": "Food Insecurity"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "467771000124109",
        "display": "Assistance with application for food program"
      }
    ]
  },
  "subject": {
    "reference": "Patient/example"
  },
  "requester": {
    "reference": "PractitionerRole/chw-example"
  },
  "performer": [
    {
      "reference": "Organization/food-bank-example"
    }
  ],
  "reasonReference": [
    {
      "reference": "Condition/food-insecurity-example"
    }
  ]
}
```

### Referral Tracking (Task)

```json
{
  "resourceType": "Task",
  "status": "completed",
  "intent": "order",
  "focus": {
    "reference": "ServiceRequest/food-referral-example"
  },
  "for": {
    "reference": "Patient/example"
  },
  "output": [
    {
      "type": {
        "coding": [
          {
            "system": "http://hl7.org/fhir/us/sdoh-clinicalcare/CodeSystem/SDOHCC-CodeSystemTemporaryCodes",
            "code": "resulting-activity",
            "display": "Resulting Activity"
          }
        ]
      },
      "valueString": "Client enrolled in SNAP. Food package distributed."
    }
  ]
}
```

---

## Gravity Project Value Sets

### SDOH Domain Mapping

| Domain | LOINC Panel | ICD-10 | SNOMED CT |
|--------|------------|--------|-----------|
| Food insecurity | 88122-7 | Z59.41 | 733423003 |
| Housing instability | 71802-3 | Z59.0, Z59.1 | 32911000 |
| Transportation insecurity | 93030-5 | Z59.82 | 551781000124108 |
| Financial strain | 76513-1 | Z59.5, Z59.6, Z59.7 | 454061000124102 |
| Employment | 67875-5 | Z56.0 | 73438004 |
| Education | 82589-3 | Z55.0 | 105421008 |
| Social isolation | 93029-7 | Z60.2 | 422587007 |
| Intimate partner violence | 76499-3 | Z63.0 | 706893006 |
| Stress | 93038-8 | Z73.3 | 73595000 |
| Veteran status | 93033-9 | — | 309845004 |

### Code System URIs

```
LOINC:    http://loinc.org
ICD-10-CM: http://hl7.org/fhir/sid/icd-10-cm
SNOMED CT: http://snomed.info/sct
Gravity:   http://hl7.org/fhir/us/sdoh-clinicalcare/CodeSystem/SDOHCC-CodeSystemTemporaryCodes
CPT:       http://www.ama-assn.org/go/cpt
HCPCS:     https://www.cms.gov/Medicare/Coding/HCPCSReleaseCodeSets
```

---

## Open Data APIs

### Public Health Data APIs

| Source | API | Base URL | Auth | Format |
|--------|-----|----------|------|--------|
| **CDC PLACES** | REST | `https://data.cdc.gov/resource/cwsq-ngmh.json` | App token (free) | JSON |
| **Census ACS** | REST | `https://api.census.gov/data/[year]/acs/acs5` | API key (free) | JSON |
| **CDC WONDER** | SOAP/REST | Via data request system | None for queries | XML/text |
| **County Health Rankings** | Download | `countyhealthrankings.org/explore-health-rankings/rankings-data-documentation` | None | CSV/Excel |
| **BRFSS** | Download | `cdc.gov/brfss/annual_data/annual_data.htm` | None | SAS/ASCII |
| **FDA Open** | REST | `https://api.fda.gov/` | API key (free) | JSON |
| **CMS Data** | REST | `https://data.cms.gov/` | None | JSON/CSV |

### Example: CDC PLACES API Query

```bash
# Get diabetes prevalence for census tracts in St. Louis County (FIPS 29189)
curl "https://data.cdc.gov/resource/cwsq-ngmh.json?\
$where=countyfips='29189' AND measureid='DIABETES'&\
$limit=100&\
$$app_token=YOUR_TOKEN"
```

### Example: Census ACS API Query

```bash
# Get poverty rate by race for Missouri counties
curl "https://api.census.gov/data/2023/acs/acs5?\
get=NAME,B17001_002E,B17001_001E&\
for=county:*&\
in=state:29&\
key=YOUR_KEY"
```

---

## Data Sharing Agreements

### Template for Cross-Sector Data Sharing

```
DATA SHARING AGREEMENT

Between: [Health Department] and [Partner Agency]
Purpose: [Specific use — e.g., "Linking housing code violation data with
         childhood blood lead levels to identify high-risk properties"]

DATA ELEMENTS SHARED
  From [Health Dept]: [Specific fields, de-identification level]
  From [Partner]:     [Specific fields]
  Linking method:     [Address match, probabilistic, deterministic]

PRIVACY PROTECTIONS
  HIPAA:          [Applicable / Not applicable — explain]
  42 CFR Part 2:  [Applicable / Not applicable]
  De-identification: [Method — Safe Harbor, Expert Determination, or Limited Data Set]
  Access controls:    [Who has access, how access is managed]
  Storage:           [Where, how long, encryption]
  Destruction:       [When and how data will be destroyed]

PERMITTED USES
  [Specific analyses, reports, or dashboards authorized]
  [Explicitly: NO use for law enforcement, immigration, individual identification]

DURATION: [Start] to [End], renewable by mutual agreement
TERMINATION: Either party may terminate with [30] days written notice

IRB: [Required / Not required / Exempt — explain]

SIGNATURES
________________________  ________________________
[Health Dept Official]     [Partner Official]
Date: ___________         Date: ___________
```

---

## De-Identification Standards

### HIPAA Safe Harbor Method (18 Identifiers to Remove)

1. Names
2. Geographic data smaller than state (except first 3 digits of ZIP if population ≥20,000)
3. Dates (except year) related to individual (birth, admission, discharge, death)
4. Phone numbers
5. Fax numbers
6. Email addresses
7. Social Security numbers
8. Medical record numbers
9. Health plan beneficiary numbers
10. Account numbers
11. Certificate/license numbers
12. Vehicle identifiers and serial numbers
13. Device identifiers and serial numbers
14. Web URLs
15. IP addresses
16. Biometric identifiers
17. Full-face photographs
18. Any other unique identifying number

### Additional Suppression Rules
- Suppress cells with count <5 in aggregate tables (prevents re-identification)
- Suppress complementary cells that would allow back-calculation
- Age ≥90 → report as "90+"
- Consider k-anonymity (k≥5) for linked datasets
