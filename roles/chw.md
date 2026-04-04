# Role: Community Health Worker (CHW)

> Pod: Community | Key partnerships: CES, PHN, BHC, NUT, HED, all roles
> The bridge between health systems and communities — trusted, culturally connected, essential

---

## Role Summary

Community health workers are frontline public health professionals who share lived experience, language, and culture with the communities they serve. They navigate systems, conduct screenings, provide health education, and build the trust that makes everything else possible.

**Core competencies**: SDOH screening, resource navigation, motivational interviewing, health education, home visiting, care coordination, cultural mediation, community organizing

**Certification**: Missouri CHW certification (or equivalent state credential). Many states now support Medicaid billing for CHW services.

---

## 5 Core Workflows

### Workflow 1: SDOH Screening and Navigation

**Trigger**: Every new client encounter and at regular intervals
**SOP**: `scripts/team-sops.md` SOP 2

| Step | Action | Time |
|------|--------|------|
| 1 | Build rapport — introduce yourself, explain your role, ask about their day | 5 min |
| 2 | Frame screening: "We ask everyone these questions because health is about more than medical care" | 1 min |
| 3 | Administer screening (Quick Screen for outreach; PRAPARE for clinical) | 5-15 min |
| 4 | Score and identify flagged domains | 2 min |
| 5 | Discuss results with client: "It looks like [domain] is something we can help with" | 5 min |
| 6 | Warm handoff to resource (call together, introduce, confirm) | 10-15 min |
| 7 | Document screening, referrals, and follow-up dates | 5 min |

**Tools**: `features/sdoh-screener.md`, `features/resource-navigator.md`

**Critical principle**: Warm handoff, not cold referral. Don't hand someone a phone number — call together, introduce by name, confirm appointment. Cold referrals have <30% completion. Warm handoffs achieve >70%.

**Follow-up schedule**:
- Critical risk: 24-48 hours
- High risk: 7 days
- Moderate risk: 30 days
- Low risk: 90 days

---

### Workflow 2: Home Visiting

**Trigger**: Enrolled in home visiting program (NFP, PAT, HFA) or high-risk referral

**Pre-visit**:
- Review client file (last visit notes, pending referrals, upcoming appointments)
- Prepare materials (screening tools, educational handouts, resource lists)
- Confirm visit time with client (text or call day before)
- Safety check: Is the neighborhood safe? Is the home environment safe? Buddy system if needed

**During visit**:
1. Check in: "How have things been since we last talked?" (5 min)
2. Follow up on prior referrals: "Were you able to connect with [resource]?" (5 min)
3. Address immediate needs first (food, safety, housing before health education)
4. Conduct scheduled activity (screening, education, care coordination) (20-30 min)
5. Assess environment (safety, child development, lead risk, food availability) (ongoing)
6. Plan next steps and next visit (5 min)
7. Leave resource materials and contact information

**Post-visit**:
- Document visit (within 24 hours)
- Make any referral calls
- Update care plan
- Debrief with supervisor if concerns arose

**Safety protocol**: Tell supervisor where you're going. Check in when you arrive and leave. Trust your instincts — if something feels unsafe, leave. Never enter a home where active violence is occurring. Call 911 if needed.

---

### Workflow 3: Care Coordination

**Trigger**: Client has multiple needs requiring coordination across providers and services

**Activities**:
- Maintain client care plan with all active services, appointments, and goals
- Coordinate between medical providers, behavioral health, social services, schools, housing
- Accompany clients to appointments (especially first visits, complex visits, language barriers)
- Translate between systems and clients (not just language — cultural interpretation)
- Track appointment attendance and follow-up
- Identify and address barriers (transportation, childcare, cost, fear, language)
- Advocate for client within systems ("My client needs X because Y")

**Documentation**: Care coordination log — date, activity, outcome, next step

**Caseload**: Typical CHW caseload is 50-100 active clients. Adjust based on intensity of needs (high-acuity clients may require weekly contact).

---

### Workflow 4: Health Education and Outreach

**Trigger**: Community event, group education, or individual health education need

**Community outreach settings**:
- Community events and health fairs
- Faith community health ministries
- Schools and childcare centers
- Housing sites and shelters
- Laundromats, barbershops, grocery stores
- WIC offices and FQHC waiting rooms
- Parks, recreation centers, and community centers

**Education delivery**:
- Use plain language (6th-grade reading level)
- Interactive > lecture (demonstrations, Q&A, activities)
- Culturally adapted (language, examples, imagery)
- Focus on 3 messages max per session
- Use teach-back to verify understanding
- Provide take-home materials and resource lists
- Bilingual delivery when possible (`bilingual/spanish-layer.md`)

**Outreach documentation**: Outreach log (date, location, # contacts, screenings completed, referrals made, materials distributed)

---

### Workflow 5: Enrollment Assistance

**Trigger**: Client needs help enrolling in benefits or services

**Common enrollments**:

| Program | Eligibility | Where to Apply |
|---------|-------------|---------------|
| Medicaid (MO HealthNet) | ≤138% FPL (adults), ≤300% FPL (children/pregnant) | DSS/FSD office or online |
| SNAP (food stamps) | ≤130% FPL gross income | DSS/FSD office or online |
| WIC | Pregnant, postpartum, infants, children ≤5; income ≤185% FPL | Local WIC office (health department) |
| Marketplace insurance | Not Medicaid eligible; open enrollment or qualifying event | healthcare.gov |
| LIHEAP (utility assistance) | ≤135% FPL or SNAP/TANF recipient | Community Action Agency |
| Head Start / Early Head Start | ≤100% FPL; ages 0-5 | Local Head Start program |
| Free/Reduced Lunch | ≤130% FPL (free), ≤185% FPL (reduced) | School district |
| Social Security (SSI/SSDI) | Disability + income/asset limits | SSA office or ssa.gov |

**Process**:
1. Assess eligibility (income, household size, status)
2. Help gather documents (ID, income verification, residency)
3. Complete application together (in-person or online)
4. Submit and track
5. Follow up on determination
6. Appeal if denied (connect with legal aid if needed)

**Immigration note**: Clarify public charge rules. SNAP, WIC, Medicaid (emergency/children/pregnant), CHIP, and public health services do NOT affect immigration status under current guidance. Always check current policy. See `bilingual/spanish-layer.md`.

---

## Essential Skills

| Skill | Application |
|-------|-------------|
| **Motivational interviewing** | Supporting behavior change without judgment |
| **Trauma-informed care** | Recognizing trauma, avoiding re-traumatization |
| **Cultural mediation** | Bridging between community culture and health systems |
| **Active listening** | Building trust, understanding needs |
| **De-escalation** | Managing crisis moments, emotional distress |
| **Boundary setting** | Maintaining professional boundaries while being personable |
| **Self-care** | Preventing compassion fatigue and burnout |

---

## Key Partnerships

| Partner Role | Interaction |
|-------------|-------------|
| **CES** | Community engagement, advisory boards, outreach coordination |
| **PHN** | Clinical referrals, immunization, chronic disease management |
| **BHC** | Behavioral health referrals, crisis support |
| **NUT** | WIC enrollment, nutrition referrals |
| **HED** | Co-facilitate education sessions, materials development |
| **DIS** | Support contact tracing, patient navigation for STI/HIV |
| **MCH** | Home visiting, prenatal/postpartum support |
| **EPI** | Provide community-level data, support CHNA engagement |

---

## Supervision and Support

**CHW supervision is essential** — not optional. CHWs encounter trauma, poverty, violence, and systemic failure daily.

- **Weekly individual supervision**: Case review, emotional support, skill development
- **Monthly group supervision**: Peer support, shared learning, case consultation
- **Ongoing training**: Motivational interviewing, trauma-informed care, new resources, self-care
- **Caseload monitoring**: Supervisor monitors caseload size and complexity
- **EAP access**: Employee Assistance Program for personal mental health support
- **Compassion fatigue prevention**: Regular check-ins, workload management, time off
