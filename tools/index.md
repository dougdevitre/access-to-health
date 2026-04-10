# Developer Tools

TypeScript and JavaScript tools for SDOH scoring, ROI calculation, campaign generation, and data validation.

## Available Tools

| Tool | Language | Description |
|------|----------|-------------|
| **SDOH Scorer** | TypeScript | Score SDOH screening responses, calculate risk levels, generate referral priorities |
| **ROI Calculator** | TypeScript | Calculate return on investment for public health interventions, compare programs, generate budget hearing summaries |
| **Campaign Generator** | TypeScript | Generate targeted outreach campaigns based on population and health topic |
| **APHA Fetcher** | JavaScript | Search, retrieve, and list topics from the APHA knowledge base |
| **API Server** | TypeScript | REST API server exposing tools as HTTP endpoints |
| **Link Validator** | TypeScript | Validate cross-references and links across project files |

## Quick Start

```bash
# Install dependencies
npm install

# Run SDOH scoring
npm run sdoh-score

# Run ROI calculator
npm run roi

# Run APHA reference lookup
npm run apha

# Run all tests
npm test

# TypeScript compile
npm run build
```

## Programmatic Usage

```typescript
import {
  scoreQuickScreen,
  scoreScreening,
  calculateROI,
  compareInterventions,
  budgetHearingSummary,
  generateCampaign
} from "access-to-health/tools";
```

## SDOH Scorer

Scores screening responses across 9 SDOH domains (housing, food, income, transportation, education, safety, healthcare, utilities, childcare). Returns risk levels and referral priorities.

**Source:** [`sdoh-score.ts`](https://github.com/dougdevitre/access-to-health/blob/main/tools/sdoh-score.ts)

## ROI Calculator

Calculates return on investment for public health interventions with support for:

- Single intervention ROI analysis
- Side-by-side program comparison
- Budget hearing summary generation with fiscal year projections

**Source:** [`roi-calculator.ts`](https://github.com/dougdevitre/access-to-health/blob/main/tools/roi-calculator.ts)

## Campaign Generator

Generates targeted outreach campaigns with messaging adapted by population, health topic, and communication channel.

**Source:** [`campaign-generator.ts`](https://github.com/dougdevitre/access-to-health/blob/main/tools/campaign-generator.ts)

## Testing

All tools have Jest tests in the `__tests__/` directory.

```bash
npm test
```

## Related

- [Developer Guide](../integration/developer-guide.md) — Architecture and API documentation
- [Data Schemas](../schemas/index.md) — SDOH data model and FHIR mappings
- [MCP Tool Schemas](../mcp/MCP-SCHEMA.md) — AI tool interface definitions
- [Interactive Tools](../interactive/sdoh-quick-screen.md) — Browser-based tool interfaces
