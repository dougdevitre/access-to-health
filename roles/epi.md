# Role: Epidemiologist (EPI)

> Pod: Surveillance | Key partnerships: DAT, DIS, EHS, PHN, HDO, HCS
> The analytical backbone of public health — turns data into action

---

## Role Summary

The epidemiologist investigates disease patterns, identifies outbreaks, analyzes health trends, and provides the evidence base for public health decision-making. Everything from daily surveillance to multi-year strategic planning depends on EPI.

**Core competencies**: Surveillance design, outbreak investigation, biostatistics, data analysis, scientific communication, GIS/spatial analysis, study design (case-control, cohort, cross-sectional)

---

## 5 Core Workflows

### Workflow 1: Daily Surveillance

**Trigger**: Every business day by 10:00 AM
**SOP**: `scripts/team-sops.md` SOP 1

| Step | Action | Tool/System | Time |
|------|--------|-------------|------|
| 1 | Check reportable disease queue | EpiTrax / state system | 15 min |
| 2 | Review syndromic surveillance | ESSENCE (ED chief complaints) | 15 min |
| 3 | Update active line lists | Excel / REDCap / database | 15 min |
| 4 | Review pending lab results | Lab information system | 10 min |
| 5 | Flag anomalies to supervisor | Email / huddle | 5 min |

**Anomaly triggers**:
- ≥2 cases with epidemiologic link → Outbreak protocol (Workflow 2)
- Single case of highly infectious disease (measles, meningitis, Ebola) → Immediate activation
- Unusual pathogen or presentation → State/CDC consultation
- Syndromic surveillance signal above baseline → Enhanced monitoring

**Output**: Daily surveillance summary (brief email or dashboard update)

---

### Workflow 2: Outbreak Investigation

**Trigger**: ≥2 epidemiologically linked cases, or 1 case of highly infectious disease
**Full protocol**: `workflows/cross-role-workflows-expanded.md` Workflow 1

**Phase 1: Detection and Verification (Hours 0-4)**
- Verify case reports (lab confirmation, clinical criteria)
- Establish preliminary case definition
- Begin line list
- Notify EPI supervisor and HDO
- Assemble investigation team (EHS, PHN, DIS, lab, HCS)

**Phase 2: Investigation (Hours 4-24)**
- Conduct case interviews (standardized questionnaire)
- Build epi curve (onset dates plotted over time)
- Calculate attack rate (if definable population)
- Collect specimens (coordinate with lab and PHN)
- Identify common exposures (time, place, person analysis)
- Request environmental assessment from EHS

**Phase 3: Analysis (Hours 12-48)**
- Descriptive epidemiology: person, place, time characterization
- Analytic epidemiology: case-control or cohort study if needed
- Hypothesis generation and testing
- GIS mapping if spatial component

**Phase 4: Control and Communication (Hours 12-72)**
- Recommend control measures (EHS implements)
- Draft SitRep for HDO (see template in `workflows/cross-role-workflows-expanded.md`)
- Support HCS in drafting public/provider communication
- Issue provider advisory if clinical guidance needed

**Phase 5: Resolution and Reporting (Variable)**
- Monitor for new cases
- Evaluate control measure effectiveness
- Write final investigation report
- Conduct after-action review (`scripts/team-sops.md` SOP 10)
- Submit case/outbreak report to state

**Key artifacts**: Line list, epi curve, investigation report, SitReps, AAR

---

### Workflow 3: Health Data Analysis and Reporting

**Trigger**: Data request, CHNA cycle, grant reporting, legislative inquiry, or routine monitoring

**Types of Analysis**:

| Type | Purpose | Methods | Output |
|------|---------|---------|--------|
| Descriptive | What is happening? | Rates, trends, demographics | Data briefs, dashboards |
| Comparative | How do we compare? | Benchmarking (state, national, HP2030) | Comparison tables, gap analysis |
| Disparity | Who is disproportionately affected? | Stratification by race, income, geography | Equity reports, disparity indices |
| Trend | Is it getting better or worse? | Time series, joinpoint regression | Trend charts, annual reports |
| Spatial | Where is it concentrated? | GIS mapping, cluster detection | Heat maps, hotspot analysis |
| Predictive | What might happen next? | Forecasting, modeling | Projections, scenario planning |

**Equity requirement** (Guardrail #3): ALL data must be disaggregated by race, ethnicity, income, and geography. Present overall rates AND stratified rates. Name structural causes of disparities.

**Data sources** (Missouri): MICA, EpiTrax, ESSENCE, vital statistics, BRFSS, PLACES, cancer registry, hospital discharge data, ACS/Census. See `references/missouri-public-health.md` and `assets/data-reference.md`.

**Key artifacts**: Data briefs, trend analyses, CHNA data profiles, dashboards, data visualizations

---

### Workflow 4: Community Health Needs Assessment (CHNA) — Data Lead

**Trigger**: 3-year CHNA cycle or strategic planning
**Full protocol**: `workflows/cross-role-workflows-expanded.md` Workflow 2

**EPI responsibilities**:
- Compile quantitative health data (Months 2-4):
  - Vital statistics (mortality, natality)
  - Disease surveillance data
  - Behavioral risk factors (BRFSS)
  - Census-tract level estimates (PLACES)
  - Hospital utilization data
  - Program data (screening rates, immunization coverage)
- Analyze by race, ethnicity, income, ZIP code, census tract
- Identify trends (5-10 year where available)
- Compare to state, national, and Healthy People 2030 targets
- Integrate quantitative findings with community engagement data (from CES)
- Co-lead analysis phase with CES (Months 6-8)
- Support priority-setting with evidence
- Write technical data sections of CHNA report

**Key partnerships**: DAT (dashboard and visualization), CES (community engagement), PMG (project management)

---

### Workflow 5: Grant and Program Evaluation Support

**Trigger**: Grant application, program evaluation, or performance monitoring

**Grant support**:
- Provide needs assessment data for grant narratives
- Design evaluation plans (process and outcome measures)
- Calculate baseline measures
- Define data collection methods and instruments
- Analyze program data for progress reports

**Evaluation support**:
- Design logic models (with PMG)
- Select appropriate study designs
- Develop data collection instruments (surveys, abstraction tools)
- Conduct statistical analysis
- Interpret findings and develop recommendations
- Write evaluation reports

**Key artifacts**: Evaluation plans, data collection instruments, statistical reports, grant data sections

---

## Essential Tools and Skills

| Tool | Purpose | Skill Level |
|------|---------|-------------|
| SAS / R / Stata | Statistical analysis | Advanced |
| Excel | Data management, basic analysis | Advanced |
| ArcGIS / QGIS | Spatial analysis, mapping | Intermediate |
| REDCap | Data capture and management | Intermediate |
| Tableau / Power BI | Data visualization, dashboards | Intermediate |
| EpiTrax | Disease surveillance | Advanced |
| ESSENCE | Syndromic surveillance | Intermediate |
| EpiInfo | Outbreak investigation, rapid analysis | Intermediate |

---

## Key Partnerships

| Partner Role | Interaction |
|-------------|-------------|
| **DAT** | Dashboard development, data quality, ETL, visualization |
| **DIS** | Contact tracing data, partner notification outcomes |
| **EHS** | Environmental data during outbreaks, inspection data |
| **PHN** | Clinical data, specimen collection, immunization data |
| **HDO** | Strategic direction, emergency authority, communication approval |
| **HCS** | Data translation for public/media, messaging accuracy |
| **PMG** | Grant evaluation design, performance measures |
| **QIC** | Performance measurement, quality improvement data |
| **CES** | CHNA community engagement integration |

---

## Reporting Obligations

| Report | Frequency | Submitted To |
|--------|-----------|-------------|
| Reportable disease cases | As received (within 24 hrs for urgent) | State epidemiology |
| Outbreak reports | Per event | State + CDC if applicable |
| Weekly surveillance summary | Weekly | Internal (HDO, team) |
| CHNA data profiles | Every 3 years | Public + partners |
| Grant performance measures | Per grant schedule | Funders |
| Annual disease summary | Annually | State, board, public |
| Data requests | As received | Internal/external requestors |
