# Data Schemas

HIPAA-ready data models for Social Determinants of Health screening, referral, and outcome tracking.

## SDOH Data Model

A 5-table relational model designed for HIPAA compliance with built-in de-identification support.

| Table | Description |
|-------|-------------|
| **clients** | Client demographic and contact information (PHI protected) |
| **screenings** | SDOH screening events linking client, tool, date, and screener |
| **referrals** | Referrals generated from screening results with warm handoff tracking |
| **follow_ups** | Follow-up contacts after referral with connection and outcome status |
| **staff** | Staff who administer screenings, make referrals, and conduct follow-ups |

**Source:** [`sdoh-data-model.json`](https://github.com/dougdevitre/access-to-health/blob/main/schemas/sdoh-data-model.json)

### Privacy by Design

- Every field is tagged with `phi: true/false` for HIPAA compliance
- UUIDs used as identifiers (never SSN or MRN)
- Age derived from DOB and marked safe for aggregate reporting
- Race and ethnicity fields support multiple selections for accurate disaggregation

## FHIR R4 SDOH Mapping

Maps Access to Health SDOH domains to HL7 FHIR R4 resources, Gravity Project value sets, and standard code systems.

| Domain | LOINC | ICD-10 Codes | Gravity Code |
|--------|-------|--------------|--------------|
| Housing Instability | 71802-3 | Z59.0, Z59.1, Z59.81 | housing-instability |
| Food Insecurity | 88122-7 | Z59.41, Z59.48 | food-insecurity |
| Financial Strain | 76513-1 | Z59.5, Z59.6, Z59.7 | financial-strain |
| Transportation Insecurity | 93031-3 | Z59.82 | transportation-insecurity |
| Education Access | 82589-3 | Z55.0-Z55.4 | education-access |
| Interpersonal Safety | 97027-7 | Z63.0, T74-T76 | interpersonal-safety |
| Healthcare Access | 93030-5 | Z75.1, Z75.3, Z75.4 | healthcare-access |
| Utility Insecurity | 93033-9 | Z59.89 | utility-insecurity |
| Childcare Access | 89555-7 | Z62.21, Z62.29 | childcare-access |

Each domain maps to 5 FHIR R4 resource types: QuestionnaireResponse (screening), Condition, Goal, ServiceRequest (referral), and Task (tracking).

**Source:** [`fhir-sdoh-mapping.json`](https://github.com/dougdevitre/access-to-health/blob/main/schemas/fhir-sdoh-mapping.json)

**Reference:** [HL7 FHIR US SDOH Clinical Care](http://hl7.org/fhir/us/sdoh-clinicalcare/)

## Related

- [Cross-Sector Data Standards](../integration/cross-sector-data-standards.md) — Interoperability requirements and open data APIs
- [Developer Guide](../integration/developer-guide.md) — Architecture, FHIR R4, SMART on FHIR
- [SDOH Screener](../features/sdoh-screener.md) — Screening tool that uses these schemas
