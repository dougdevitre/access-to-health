/**
 * SDOH Risk Scoring Tool
 * Calculates composite risk score from screening responses
 * Reference: features/sdoh-screener.md
 */

type Domain =
  | "housing"
  | "food"
  | "income"
  | "healthcare"
  | "education"
  | "safety"
  | "transportation"
  | "utilities"
  | "childcare";

type Severity = "critical" | "high" | "moderate" | "none";
type RiskLevel = "none" | "low" | "moderate" | "high" | "critical";
type ScreeningTool = "prapare" | "ahc" | "quick_screen";

interface DomainResult {
  domain: Domain;
  flagged: boolean;
  severity: Severity;
  score: number;
}

interface ScreeningResult {
  tool: ScreeningTool;
  domains: DomainResult[];
  totalScore: number;
  riskLevel: RiskLevel;
  followUpDays: number;
  recommendations: Recommendation[];
}

interface Recommendation {
  domain: Domain;
  tier: "emergency" | "short_term" | "long_term";
  action: string;
}

const SEVERITY_SCORES: Record<Severity, number> = {
  critical: 3,
  high: 2,
  moderate: 1,
  none: 0,
};

/**
 * Calculate risk level from total score
 * 0: No current SDOH needs
 * 1-3: Low risk
 * 4-7: Moderate risk
 * 8-12: High risk
 * 13+: Critical
 */
function getRiskLevel(totalScore: number): RiskLevel {
  if (totalScore === 0) return "none";
  if (totalScore <= 3) return "low";
  if (totalScore <= 7) return "moderate";
  if (totalScore <= 12) return "high";
  return "critical";
}

/**
 * Determine follow-up schedule based on risk level
 * Returns number of days until follow-up
 */
function getFollowUpDays(riskLevel: RiskLevel): number {
  switch (riskLevel) {
    case "none":
      return 365;
    case "low":
      return 90;
    case "moderate":
      return 30;
    case "high":
      return 7;
    case "critical":
      return 1; // 24-48 hours
  }
}

/**
 * Map flagged domains to resource tier recommendations
 */
function getRecommendations(domains: DomainResult[]): Recommendation[] {
  const recommendations: Recommendation[] = [];

  for (const domain of domains) {
    if (!domain.flagged) continue;

    const tier =
      domain.severity === "critical"
        ? "emergency"
        : domain.severity === "high"
          ? "short_term"
          : "long_term";

    const actions: Record<Domain, Record<string, string>> = {
      housing: {
        emergency: "Emergency shelter referral via 211 or Coordinated Entry",
        short_term: "Rapid rehousing or rental assistance application",
        long_term: "Housing Choice Voucher or permanent supportive housing",
      },
      food: {
        emergency: "Food pantry referral or emergency food box",
        short_term: "SNAP application assistance",
        long_term: "Community garden, cooking classes, Double Up Food Bucks",
      },
      income: {
        emergency: "Emergency financial assistance",
        short_term: "TANF application, job training referral",
        long_term: "Career development, financial coaching",
      },
      healthcare: {
        emergency: "FQHC or ED referral",
        short_term: "Medicaid or marketplace enrollment",
        long_term: "Primary care medical home linkage",
      },
      education: {
        emergency: "School enrollment assistance (McKinney-Vento)",
        short_term: "GED or ESL class referral",
        long_term: "College access or vocational training",
      },
      safety: {
        emergency: "DV hotline (1-800-799-7233) or 911",
        short_term: "Protective order assistance, legal aid",
        long_term: "Counseling, support groups, permanent housing",
      },
      transportation: {
        emergency: "Taxi voucher or ride share",
        short_term: "Medicaid NEMT or bus pass",
        long_term: "Vehicle assistance program",
      },
      utilities: {
        emergency: "LIHEAP emergency assistance",
        short_term: "Budget billing, arrearage management",
        long_term: "Weatherization program",
      },
      childcare: {
        emergency: "Emergency childcare or crisis nursery",
        short_term: "Child care subsidy application",
        long_term: "Head Start enrollment or quality childcare placement",
      },
    };

    recommendations.push({
      domain: domain.domain,
      tier,
      action: actions[domain.domain][tier],
    });
  }

  return recommendations;
}

/**
 * Score a completed SDOH screening
 */
export function scoreScreening(
  tool: ScreeningTool,
  domainResults: DomainResult[]
): ScreeningResult {
  const totalScore = domainResults.reduce(
    (sum, d) => sum + SEVERITY_SCORES[d.severity],
    0
  );

  const riskLevel = getRiskLevel(totalScore);
  const followUpDays = getFollowUpDays(riskLevel);
  const recommendations = getRecommendations(domainResults);

  return {
    tool,
    domains: domainResults,
    totalScore,
    riskLevel,
    followUpDays,
    recommendations,
  };
}

/**
 * Quick Screen scoring (5-item rapid triage)
 * Returns domain results based on yes/no responses
 */
export function scoreQuickScreen(responses: {
  foodHousingUtilities: boolean;
  transportation: boolean;
  medication: boolean;
  safety: boolean;
  depression: boolean;
}): ScreeningResult {
  const domains: DomainResult[] = [
    {
      domain: "food",
      flagged: responses.foodHousingUtilities,
      severity: responses.foodHousingUtilities ? "high" : "none",
      score: responses.foodHousingUtilities ? 2 : 0,
    },
    {
      domain: "transportation",
      flagged: responses.transportation,
      severity: responses.transportation ? "moderate" : "none",
      score: responses.transportation ? 1 : 0,
    },
    {
      domain: "healthcare",
      flagged: responses.medication,
      severity: responses.medication ? "high" : "none",
      score: responses.medication ? 2 : 0,
    },
    {
      domain: "safety",
      flagged: !responses.safety, // "Do you feel safe?" — No = flagged
      severity: !responses.safety ? "critical" : "none",
      score: !responses.safety ? 3 : 0,
    },
  ];

  // Depression screening is a behavioral health flag, not SDOH domain
  // but we include it in the score
  if (responses.depression) {
    domains.push({
      domain: "healthcare",
      flagged: true,
      severity: "high",
      score: 2,
    });
  }

  return scoreScreening("quick_screen", domains);
}

// Example usage
if (require.main === module) {
  const result = scoreQuickScreen({
    foodHousingUtilities: true,
    transportation: true,
    medication: false,
    safety: true, // feels safe
    depression: true,
  });

  console.log("Risk Level:", result.riskLevel);
  console.log("Total Score:", result.totalScore);
  console.log("Follow-up in:", result.followUpDays, "days");
  console.log("Recommendations:");
  for (const rec of result.recommendations) {
    console.log(`  [${rec.tier}] ${rec.domain}: ${rec.action}`);
  }
}
