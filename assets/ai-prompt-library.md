# AI Prompt Library — 42 Production Prompts

> Ready-to-use prompts organized by function
> Each prompt enforces the 10 guardrails and generates actionable output

---

## Role Routing (Prompts 1-5)

### Prompt 1: Role Identification
```
Given the following user description, identify the most appropriate public health role from the 20-role registry. Return the 3-letter role code, full title, pod assignment, and confidence level. If ambiguous, return top 2 matches with reasoning.

User description: {input}

Reference: roles/ROLE-REGISTRY.md
```

### Prompt 2: Pod Activation
```
The user is a {role_code} ({role_name}) in the {pod} pod. Load their primary workflows and identify which cross-role partners they work with most frequently. Present their top 3 daily workflows and available slash commands.
```

### Prompt 3: Multi-Role User
```
The user describes multiple responsibilities: {input}. Identify the primary and secondary roles. Recommend which role's workflows to load first, with option to switch.
```

### Prompt 4: New Staff Orientation
```
Generate a "first week" guide for a new {role_code}. Include: key systems to learn, partnerships to build, SOPs to review, and immediate workflows. Reference the role file and relevant SOPs.
```

### Prompt 5: Role Handoff
```
A {from_role} needs to hand off to {to_role} for {reason}. Generate the handoff protocol: what information to transfer, who initiates, documentation requirements, and follow-up responsibility.
```

---

## Population Context (Prompts 6-12)

### Prompt 6: Population Profile Load
```
Load the health context for {population_code} population. Include: top 3 health disparities, structural drivers, engagement strategies, and screening adaptations. Frame structurally — no individual blame.
```

### Prompt 7: Intersectional Context
```
The client/community is {population_1} AND {population_2}. Load both contexts. Identify where they compound (heightened risk areas) and specific considerations for this intersection.
```

### Prompt 8: Cultural Adaptation
```
Adapt the following health message for {population}: {message}. Consider cultural values, trusted messengers, preferred communication styles, and potential sensitivities. Maintain accuracy.
```

### Prompt 9: Trust Assessment
```
Assess likely trust barriers for {population} engaging with {service}. Reference historical context if relevant. Recommend trust-building strategies using the local proxy model and HEAR framework.
```

### Prompt 10: Community Engagement Plan
```
Design a community engagement plan for {population} around {topic}. Include: trusted messengers, settings, timing, compensation, accessibility, language, and feedback loop.
```

### Prompt 11: Disparity Data Presentation
```
Present the following disparity data for a {audience} audience: {data}. Frame structurally. Name root causes. Include what is being done to address it. Follow data storytelling framework (3-act structure).
```

### Prompt 12: Population-Specific Screening
```
Recommend SDOH screening adaptations for {population}. Which tool is best? What framing language should be used? What cultural considerations apply? What resources should be pre-loaded?
```

---

## Workflow Execution (Prompts 13-20)

### Prompt 13: Outbreak Decision Tree
```
Given the following scenario: {scenario}. Navigate the outbreak response decision tree. Determine: activation level, responsible roles, immediate actions, timeline, and communication plan.
```

### Prompt 14: SitRep Generation
```
Generate SitRep #{number} for the {condition} investigation at {location}. Include: case counts (confirmed/probable/suspect), epi summary, control measures, next steps, and decisions needed.
```

### Prompt 15: CHNA Planning
```
Generate a 12-month CHNA work plan. Include: quantitative data sources, community engagement methods (meeting minimum standards), analysis approach, priority-setting process, and CHIP development timeline.
```

### Prompt 16: Crisis Communication Draft
```
Draft a {type} communication for the following situation: {scenario}. Type options: media holding statement, parent letter, provider advisory, community notification, staff notification. Apply safe messaging if applicable.
```

### Prompt 17: Investigation Launch
```
Launch a {type} investigation for: {scenario}. Generate: team composition, initial actions, documentation checklist, communication plan, escalation criteria, and timeline.
```

### Prompt 18: Cross-Role Coordination
```
For workflow {workflow_number}, we are at step {step}. Generate the coordination tasks: which roles are active, what each should be doing right now, what communication is needed, and what's next.
```

### Prompt 19: Escalation Assessment
```
Assess whether the following situation requires escalation: {scenario}. Reference escalation criteria from relevant workflow. If yes, to whom and by when. If no, what monitoring is appropriate.
```

### Prompt 20: After-Action Review Facilitation
```
Generate AAR facilitation questions for: {event_description}. Structure: What was planned? What happened? What went well? What needs improvement? What are the corrective actions?
```

---

## Artifact Generation (Prompts 21-30)

### Prompt 21: Report Generation
```
Generate a {report_type} report for {period}. Populate with: {data}. Apply formatting standards. Ensure equity disaggregation. Include interpretation, not just numbers.
```

### Prompt 22: Board Presentation
```
Create a board presentation (max {max_slides} slides) on {topic}. One idea per slide. Every chart needs a 1-sentence interpretation. State what you need from the board upfront.
```

### Prompt 23: Grant Narrative
```
Write the {section} section of a grant narrative for {funder}. Topic: {topic}. Include local data, equity framing, evidence base, and community voice. Follow federal format unless funder-specific.
```

### Prompt 24: Policy Brief
```
Write a policy brief on {topic}. Position: {support/oppose/neutral}. Include: issue statement, who's affected (equity lens), evidence (2-3 key data points), what works, recommendation, and cost-benefit.
```

### Prompt 25: Community Material
```
Create a {type} for {audience} about {topic}. Reading level: 6th grade. Bilingual: {yes/no}. Include: key messages (max 3), action item, contact info. No jargon. Person-first language.
```

### Prompt 26: Newsletter
```
Draft a community newsletter for {period}. Include: director letter (2-3 sentences, warm), health tip, local data point, upcoming events, free resources, community voice, and contact info.
```

### Prompt 27: Social Media Post
```
Generate a social media post about {topic} for {platform}. Include: message (platform-appropriate length), hashtags, alt text for image, bilingual version if public-facing. No jargon.
```

### Prompt 28: Email Sequence
```
Generate email #{number} in the {sequence_name} sequence. Follow the sequence template in messaging/email-sequences.md. Warm, actionable, brief.
```

### Prompt 29: MOU Draft
```
Draft an MOU between {organization_1} and {organization_2} for {purpose}. Include: scope, duration, roles/responsibilities, data sharing, communication, funding, and termination.
```

### Prompt 30: QI Storyboard
```
Generate a QI storyboard for: Aim: {aim}. Baseline: {baseline}. Intervention: {intervention}. Results: {results}. Include: fishbone, PDSA cycle documentation, run chart description, lessons learned.
```

---

## Communication (Prompts 31-37)

### Prompt 31: Media Response
```
Prepare a response to the following media inquiry: {inquiry}. Include: key messages (3), supporting data, anticipated follow-up questions with answers, and bridging statements.
```

### Prompt 32: Testimony
```
Write {written/oral} testimony for {committee} regarding {bill/topic}. Position: {support/oppose/amend}. Include: local data, human impact, specific ask, and closing.
```

### Prompt 33: Talking Points
```
Generate talking points for {audience} on {topic}. Include: 3 key messages, supporting data for each, anticipated pushback with responses, and one-line summary.
```

### Prompt 34: Crisis Social Media
```
Generate a social media response for the following crisis: {scenario}. Follow the crisis communication protocol: acknowledge, inform, empathize, update timeline. No speculation.
```

### Prompt 35: Misinformation Response
```
Counter the following health misinformation: {claim}. Use the Truth Sandwich: lead with fact, warn about myth (briefly), explain the fallacy, restate the fact. Do NOT amplify the myth.
```

### Prompt 36: Bilingual Adaptation
```
Adapt the following content to Spanish: {content}. Culturally adapt (not just translate). Use professional health terminology. Match reading level. Reference bilingual/spanish-layer.md.
```

### Prompt 37: Data Storytelling
```
Turn this data into a story for {audience}: {data}. Follow the 3-act structure: Hook (what's happening), Context (why), Path Forward (what to do). End with one specific action.
```

---

## Analysis and Planning (Prompts 38-42)

### Prompt 38: Health Equity Audit
```
Audit the following content/program/policy for health equity: {input}. Check: data disaggregation, structural framing, person-first language, community voice, cultural responsiveness. Return findings and recommendations.
```

### Prompt 39: SDOH Risk Summary
```
Summarize SDOH screening results for {client/population}: {results}. Prioritize domains by severity. Generate resource recommendations by tier. Schedule follow-up.
```

### Prompt 40: Trend Analysis
```
Analyze the following health trend: {indicator} in {geography} from {start_year} to {end_year}. Include: direction, magnitude, significance, disparities, comparisons (state, national, HP2030), interpretation, and recommended actions.
```

### Prompt 41: Program Evaluation Design
```
Design an evaluation plan for {program_name}. Type: {process/outcome/impact}. Include: evaluation questions, indicators, data sources, methods, timeline, and how findings will be used for improvement.
```

### Prompt 42: Workforce Capacity Assessment
```
Assess workforce capacity for {program/initiative}. Current staff: {staff}. Need: {description}. Identify gaps, recommend solutions (hiring, training, partnership, technology), and estimate timeline.
```
