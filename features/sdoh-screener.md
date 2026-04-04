# SDOH Screener — Screening Workflow and Tool Reference

> Three validated screening tools for Social Determinants of Health
> Workflow: Screen → Score → Match → Refer → Follow Up

---

## Tool Selection Guide

| Tool | Best For | Items | Time | Validated |
|------|----------|-------|------|-----------|
| **PRAPARE** | Comprehensive SDOH assessment in clinical settings | 21 core + 2 optional | 10-15 min | Yes (NACHC) |
| **AHC Health-Related Social Needs Screen** | CMS-aligned screening in health care settings | 10 core + 16 supplemental | 5-10 min | Yes (CMS) |
| **Quick Screen** | Rapid triage in community/outreach settings | 5 items | 2-3 min | Derived from validated tools |

### When to Use Which

```
New client in clinical setting?
  └─ YES → PRAPARE (most comprehensive, captures demographics + SDOH)

CMS-funded program or health plan requirement?
  └─ YES → AHC Screen (aligned with CMS Accountable Health Communities model)

Community outreach, home visit, or time-limited encounter?
  └─ YES → Quick Screen (rapid, low burden, still captures critical needs)

Unsure?
  └─ Start with Quick Screen → escalate to PRAPARE if ≥2 domains flagged
```

---

## PRAPARE Protocol (Protocol for Responding to and Assessing Patients' Assets, Risks, and Experiences)

### Domains and Items

**Personal Characteristics (contextual, not scored)**
1. Race
2. Ethnicity
3. Farmworker status
4. Veteran status
5. Language preference

**Family and Home**
6. Housing status (have housing / do not have housing)
7. Housing stability (worried about losing housing in next 2 months?)
8. Housing adequacy (problems with housing — bugs, mold, lead, heat, water, safety)

**Money and Resources**
9. Highest education level
10. Employment status
11. Insurance status
12. Household income (as % FPL)
13. Difficulty paying for basic needs (food, housing, medical, heating, phone)
14. Transportation (lack of reliable transportation)
15. Childcare (lack of affordable childcare impacting work/school)

**Social and Emotional Health**
16. Social integration and support (how often do you see or talk to people you care about?)
17. Stress level
18. Refugee status

**Optional / Additional**
19. Safety (feel physically/emotionally unsafe where currently live?)
20. Incarceration history
21. Domestic violence screen (HITS or similar)

### Administration Guidance

- **Setting**: Private, confidential space. Never in waiting rooms or shared areas
- **Framing**: "We ask everyone these questions because health is affected by many things beyond medical care. This helps us connect you with resources."
- **Trauma-informed**: Patient can skip any question. Do not pressure. Note refusals without judgment
- **Language**: Professional interpretation for LEP patients (not family members, not children)
- **Documentation**: In EHR using ICD-10 Z-codes where applicable (Z59 housing, Z56 employment, Z55 education, Z60 social environment)
- **Privacy**: HIPAA applies. 42 CFR Part 2 applies if substance use information is disclosed

---

## AHC Health-Related Social Needs Screening Tool

### Core Questions (10 items)

**Housing Instability**
1. What is your living situation today?
2. Think about the place you live — do you have problems with any of these? (bugs, mold, lead, inadequate heat, oven/stove not working, water leaks, none)
3. Within the past 12 months, you worried that your food would run out before you got money to buy more (often true / sometimes true / never true)

**Food Insecurity**
4. Within the past 12 months, the food you bought just didn't last and you didn't have money to get more (often true / sometimes true / never true)

**Transportation**
5. In the past 12 months, has lack of reliable transportation kept you from medical appointments, meetings, work, or getting things needed for daily living?

**Utility Needs**
6. In the past 12 months, has the electric, gas, oil, or water company threatened to shut off services in your home?

**Interpersonal Safety**
7. How often does anyone, including family and friends, physically hurt you?
8. How often does anyone, including family and friends, insult or talk down to you?
9. How often does anyone, including family and friends, threaten you with harm?
10. How often does anyone, including family and friends, scream or curse at you?

### Supplemental Questions (optional, 16 items)
- Financial strain, employment, family/community support, education, substance use, mental health, disabilities, refugee status

---

## Quick Screen (5-Item Rapid Triage)

For community outreach, home visits, and time-limited encounters.

| # | Question | Domain | Positive Response |
|---|----------|--------|-------------------|
| 1 | In the past year, have you or your family ever had to go without food, heat, or a place to sleep? | Food / Housing / Utilities | Yes |
| 2 | Do you have trouble getting to medical appointments or the pharmacy? | Transportation | Yes |
| 3 | In the past year, have you been unable to get a medication or treatment that a doctor prescribed? | Healthcare access | Yes |
| 4 | Do you feel safe where you live? | Safety | No |
| 5 | In the past 2 weeks, have you felt down, depressed, or hopeless? | Mental health | Yes |

**Scoring**: ≥1 positive → proceed to resource matching. ≥3 positive → comprehensive PRAPARE recommended.

---

## Risk Scoring Algorithm

```
For each domain flagged positive:
  Assign severity:
    CRITICAL (immediate safety risk) → Score 3
    HIGH (basic need unmet) → Score 2
    MODERATE (at risk) → Score 1

  Total SDOH Risk Score = Sum of all domain scores

  Risk Level:
    0       → No current SDOH needs identified
    1-3     → Low risk → Provide resource information
    4-7     → Moderate risk → Active referral + 30-day follow-up
    8-12    → High risk → Warm handoff + 7-day follow-up + care coordination
    13+     → Critical → Same-day intervention + supervisor notification
```

### Domain-to-Resource Mapping

| Domain | Tier 1: Emergency | Tier 2: Short-Term | Tier 3: Long-Term |
|--------|-------------------|--------------------|--------------------|
| **Housing** | Emergency shelter, hotel voucher, DV shelter | Transitional housing, rapid rehousing | Section 8, LIHTC, supportive housing |
| **Food** | Food pantry, emergency food box, soup kitchen | SNAP application, WIC enrollment | Community garden, cooking classes, Double Up |
| **Income** | Emergency financial assistance, utility assistance | TANF, unemployment, job training | Career development, education, EITC |
| **Healthcare** | ED, urgent care, crisis line | FQHC enrollment, Medicaid application | Primary care home, health insurance marketplace |
| **Education** | GED testing information | Adult education, ESL classes | College access, vocational training |
| **Safety** | DV hotline (1-800-799-7233), 911, shelter | Safety planning, legal aid, protective order | Counseling, support groups, permanent housing |
| **Transportation** | Taxi voucher, ride share, EMS | Medicaid transportation benefit, bus pass | Vehicle assistance program, route advocacy |
| **Utilities** | LIHEAP emergency, utility company hardship | Weatherization program, budget billing | Energy efficiency upgrades, solar programs |
| **Childcare** | Emergency childcare, respite care | Child care subsidy application, Head Start | Quality childcare, after-school programs |

---

## Follow-Up Protocol

| Risk Level | Follow-Up Schedule | Method | Responsible |
|------------|-------------------|--------|-------------|
| Low | 90 days | Phone or next visit | CHW |
| Moderate | 30 days | Phone call | CHW |
| High | 7 days | Phone or home visit | CHW + PHN |
| Critical | 24-48 hours | In-person or phone | CHW + supervisor |

### Follow-Up Documentation
- Was referral completed? (connected / attempted / declined / unable)
- Barrier to completion (if applicable)
- Current status of identified need
- New needs identified
- Next follow-up date

---

## Documentation and Coding

### ICD-10 Z-Codes for SDOH
| Domain | Z-Code | Description |
|--------|--------|-------------|
| Housing | Z59.0 | Homelessness |
| Housing | Z59.1 | Inadequate housing |
| Food | Z59.41 | Food insecurity |
| Income | Z59.5 | Extreme poverty |
| Income | Z59.6 | Low income |
| Employment | Z56.0 | Unemployment |
| Education | Z55.0 | Illiteracy and low-level literacy |
| Transportation | Z59.82 | Transportation insecurity |
| Safety | Z63.0 | Problems in relationship with spouse/partner |
| Social | Z60.2 | Problems related to living alone |

### Privacy Requirements
- All screening results are part of the medical/client record
- HIPAA protections apply to all SDOH data
- 42 CFR Part 2 applies if substance use is disclosed during screening
- Do NOT share individual screening results with outside agencies without written consent
- Aggregate, de-identified data may be used for program evaluation and reporting
