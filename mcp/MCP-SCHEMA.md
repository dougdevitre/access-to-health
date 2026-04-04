# MCP Tool Schemas — Model Context Protocol Integration

> 10 tool definitions for AI-assisted public health operations
> Compatible with Claude MCP server specification

---

## Tool 1: sdoh_screen

**Description**: Administer SDOH screening and generate risk score with resource recommendations.

```json
{
  "name": "sdoh_screen",
  "description": "Administer SDOH screening using PRAPARE, AHC, or Quick Screen tool. Returns risk score and domain-specific resource recommendations.",
  "input_schema": {
    "type": "object",
    "properties": {
      "tool": {
        "type": "string",
        "enum": ["prapare", "ahc", "quick_screen"],
        "description": "Screening tool to administer"
      },
      "client_id": {
        "type": "string",
        "description": "Client identifier (optional — for linking to records)"
      },
      "responses": {
        "type": "object",
        "description": "Key-value pairs of question IDs and responses"
      }
    },
    "required": ["tool", "responses"]
  },
  "output": {
    "risk_score": "integer",
    "risk_level": "string (none|low|moderate|high|critical)",
    "domains_flagged": "array of domain names",
    "recommendations": "array of {domain, tier, resources[]}"
  }
}
```

---

## Tool 2: resource_lookup

**Description**: Look up resources by SDOH domain, tier, and geography.

```json
{
  "name": "resource_lookup",
  "description": "Find community resources by SDOH domain, urgency tier, and location. Returns resource name, contact, eligibility, and hours.",
  "input_schema": {
    "type": "object",
    "properties": {
      "domain": {
        "type": "string",
        "enum": ["housing", "food", "income", "healthcare", "education", "safety", "transportation", "utilities", "childcare"]
      },
      "tier": {
        "type": "string",
        "enum": ["emergency", "short_term", "long_term"]
      },
      "zip_code": {
        "type": "string",
        "description": "5-digit ZIP code for location-based results"
      },
      "language": {
        "type": "string",
        "default": "en",
        "description": "ISO 639-1 language code for language-accessible resources"
      }
    },
    "required": ["domain", "tier"]
  }
}
```

---

## Tool 3: role_router

**Description**: Identify the appropriate public health role based on user description.

```json
{
  "name": "role_router",
  "description": "Route a user to the appropriate public health role and load role-specific workflows. Uses keyword matching and context analysis.",
  "input_schema": {
    "type": "object",
    "properties": {
      "user_description": {
        "type": "string",
        "description": "User's description of their role, title, or work activities"
      }
    },
    "required": ["user_description"]
  },
  "output": {
    "role_code": "string (3-letter code)",
    "role_name": "string",
    "pod": "string",
    "workflow_file": "string (path to role file)",
    "confidence": "number (0-1)"
  }
}
```

---

## Tool 4: population_context

**Description**: Load population-specific health context, disparities, and engagement guidance.

```json
{
  "name": "population_context",
  "description": "Load health context for a specific population including disparities, cultural considerations, engagement strategies, and screening adaptations.",
  "input_schema": {
    "type": "object",
    "properties": {
      "population_code": {
        "type": "string",
        "description": "3-letter population code (e.g., BLK, HIS, PRG, HML)"
      },
      "population_description": {
        "type": "string",
        "description": "Free-text description if code unknown — system will match"
      }
    }
  },
  "output": {
    "population_code": "string",
    "population_name": "string",
    "health_profile": "object",
    "cultural_considerations": "object",
    "engagement_strategies": "object",
    "screening_adaptations": "object",
    "deep_dive_available": "boolean",
    "deep_dive_path": "string"
  }
}
```

---

## Tool 5: report_generator

**Description**: Generate a reporting artifact from a template with provided data.

```json
{
  "name": "report_generator",
  "description": "Generate a reporting artifact from the template library. Fills template with provided data and applies formatting standards.",
  "input_schema": {
    "type": "object",
    "properties": {
      "template": {
        "type": "string",
        "enum": ["weekly_surveillance", "outbreak_report", "director_monthly", "program_quarterly", "board_packet", "grant_progress", "community_profile", "chna_summary", "trend_analysis", "qi_storyboard"],
        "description": "Template type from artifacts/reporting-templates.md"
      },
      "data": {
        "type": "object",
        "description": "Key-value pairs to populate the template"
      },
      "format": {
        "type": "string",
        "enum": ["markdown", "plain_text", "html"],
        "default": "markdown"
      }
    },
    "required": ["template", "data"]
  }
}
```

---

## Tool 6: campaign_builder

**Description**: Generate a health communication campaign plan.

```json
{
  "name": "campaign_builder",
  "description": "Build a health communication campaign with audience segmentation, key messages, channel strategy, timeline, and evaluation metrics.",
  "input_schema": {
    "type": "object",
    "properties": {
      "topic": {
        "type": "string",
        "description": "Health topic or behavior to address"
      },
      "audience": {
        "type": "string",
        "description": "Primary target audience"
      },
      "geography": {
        "type": "string",
        "description": "Geographic scope"
      },
      "duration": {
        "type": "string",
        "description": "Campaign duration (e.g., '3 months', '1 year')"
      },
      "channels": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Preferred channels (social, print, radio, community, etc.)"
      },
      "equity_populations": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Populations requiring specific equity considerations"
      }
    },
    "required": ["topic", "audience"]
  }
}
```

---

## Tool 7: workflow_executor

**Description**: Execute a cross-role workflow with decision tree navigation.

```json
{
  "name": "workflow_executor",
  "description": "Navigate a cross-role workflow decision tree, identify responsible roles, and generate action items with timeline.",
  "input_schema": {
    "type": "object",
    "properties": {
      "workflow": {
        "type": "string",
        "enum": ["outbreak_response", "chna", "maternal_mortality_review", "substance_crisis", "environmental_justice", "immigrant_refugee", "phab_accreditation", "suicide_cluster"],
        "description": "Workflow to execute"
      },
      "scenario": {
        "type": "string",
        "description": "Description of the current situation for decision tree navigation"
      },
      "current_step": {
        "type": "string",
        "description": "Current position in the workflow (for resuming)"
      }
    },
    "required": ["workflow", "scenario"]
  }
}
```

---

## Tool 8: equity_check

**Description**: Review content for equity, plain language, and trauma-informed standards.

```json
{
  "name": "equity_check",
  "description": "Analyze content against the 10 guardrails: evidence-based, trauma-informed, equity lens, culturally responsive, politically neutral, privacy-first, plain language, person-first, community voice, Missouri reference.",
  "input_schema": {
    "type": "object",
    "properties": {
      "content": {
        "type": "string",
        "description": "Text content to review"
      },
      "audience": {
        "type": "string",
        "enum": ["public", "provider", "leadership", "media", "internal"],
        "description": "Intended audience (affects reading level and framing expectations)"
      },
      "check_types": {
        "type": "array",
        "items": {
          "type": "string",
          "enum": ["reading_level", "person_first", "equity_framing", "trauma_informed", "evidence_cited", "privacy", "plain_language", "all"]
        },
        "default": ["all"]
      }
    },
    "required": ["content"]
  }
}
```

---

## Tool 9: translate_content

**Description**: Generate bilingual health content (English/Spanish).

```json
{
  "name": "translate_content",
  "description": "Generate culturally adapted bilingual health content. Not direct translation — culturally appropriate adaptation with health literacy standards.",
  "input_schema": {
    "type": "object",
    "properties": {
      "content": {
        "type": "string",
        "description": "English content to adapt"
      },
      "target_language": {
        "type": "string",
        "default": "es",
        "description": "Target language (ISO 639-1)"
      },
      "content_type": {
        "type": "string",
        "enum": ["screening_script", "resource_info", "social_media", "flyer", "letter", "presentation"],
        "description": "Type of content (affects adaptation approach)"
      }
    },
    "required": ["content"]
  }
}
```

---

## Tool 10: data_query

**Description**: Query public health data for indicators, trends, and comparisons.

```json
{
  "name": "data_query",
  "description": "Query health data for a specific indicator, geography, and time period. Returns values with comparisons to state, national, and Healthy People 2030 targets.",
  "input_schema": {
    "type": "object",
    "properties": {
      "indicator": {
        "type": "string",
        "description": "Health indicator (e.g., 'infant_mortality', 'diabetes_prevalence', 'vaccination_rate')"
      },
      "geography": {
        "type": "string",
        "description": "Geographic unit (state, county FIPS, ZIP, census tract)"
      },
      "time_period": {
        "type": "string",
        "description": "Year or year range (e.g., '2023', '2019-2023')"
      },
      "disaggregate_by": {
        "type": "array",
        "items": {
          "type": "string",
          "enum": ["race_ethnicity", "age", "sex", "income", "geography", "insurance"]
        },
        "description": "Dimensions for equity disaggregation"
      }
    },
    "required": ["indicator"]
  }
}
```

---

## Integration Map

```
User Input
    │
    ├─ Role identification → role_router → Load workflows
    ├─ Population context  → population_context → Load guidance
    ├─ SDOH screening      → sdoh_screen → resource_lookup → referral
    ├─ Report generation   → report_generator → equity_check
    ├─ Campaign creation   → campaign_builder → translate_content
    ├─ Workflow execution   → workflow_executor → role handoffs
    ├─ Data request        → data_query → report_generator
    └─ Content review      → equity_check → translate_content
```
