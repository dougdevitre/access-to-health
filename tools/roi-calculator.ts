/**
 * Public Health ROI Calculator
 * Estimates return on investment for common public health interventions
 * Reference: integration/fiscal-operations.md
 */

interface InterventionProfile {
  name: string;
  category: string;
  costPerParticipant: number;
  returnPerParticipant: number;
  returnTimeframe: string;
  evidenceSource: string;
  healthcareAvoidance: number;
  productivityGain: number;
  otherSavings: number;
}

interface ROIResult {
  intervention: string;
  participants: number;
  totalCost: number;
  totalReturn: number;
  netBenefit: number;
  roiRatio: number;
  costPerQALY: number | null;
  breakEvenParticipants: number;
  paybackPeriod: string;
  summary: string;
}

/**
 * Evidence-based intervention profiles
 * Sources: CDC, RAND, USDA, ASTHO, peer-reviewed literature
 */
const INTERVENTIONS: Record<string, InterventionProfile> = {
  childhood_immunization: {
    name: "Childhood Immunization Program",
    category: "Prevention",
    costPerParticipant: 525,
    returnPerParticipant: 5723,
    returnTimeframe: "Lifetime per child",
    evidenceSource: "CDC — Economic Analysis of Childhood Immunization",
    healthcareAvoidance: 4200,
    productivityGain: 1200,
    otherSavings: 323,
  },
  wic: {
    name: "WIC Nutrition Program",
    category: "Nutrition",
    costPerParticipant: 600,
    returnPerParticipant: 1662,
    returnTimeframe: "Per participant per year",
    evidenceSource: "USDA Economic Research Service",
    healthcareAvoidance: 1200,
    productivityGain: 300,
    otherSavings: 162,
  },
  chw_program: {
    name: "Community Health Worker Program",
    category: "Care Coordination",
    costPerParticipant: 2400,
    returnPerParticipant: 5928,
    returnTimeframe: "Per client per year",
    evidenceSource: "ASTHO CHW ROI Analysis",
    healthcareAvoidance: 3800,
    productivityGain: 1500,
    otherSavings: 628,
  },
  tobacco_cessation: {
    name: "Tobacco Cessation Program",
    category: "Prevention",
    costPerParticipant: 500,
    returnPerParticipant: 630,
    returnTimeframe: "Per participant per year (increases over time)",
    evidenceSource: "CDC Office on Smoking and Health",
    healthcareAvoidance: 450,
    productivityGain: 150,
    otherSavings: 30,
  },
  lead_prevention: {
    name: "Lead Poisoning Prevention",
    category: "Environmental",
    costPerParticipant: 350,
    returnPerParticipant: 17000,
    returnTimeframe: "Lifetime per child (conservative)",
    evidenceSource: "Pew Health/HBEP — Benefits of Lead Hazard Control",
    healthcareAvoidance: 5000,
    productivityGain: 10000,
    otherSavings: 2000,
  },
  home_visiting: {
    name: "Home Visiting (Nurse-Family Partnership)",
    category: "Maternal-Child",
    costPerParticipant: 9500,
    returnPerParticipant: 54150,
    returnTimeframe: "Per family through child age 15",
    evidenceSource: "RAND Corporation — NFP Cost-Benefit Analysis",
    healthcareAvoidance: 18000,
    productivityGain: 25000,
    otherSavings: 11150,
  },
  naloxone_distribution: {
    name: "Naloxone Distribution Program",
    category: "Harm Reduction",
    costPerParticipant: 75,
    returnPerParticipant: 12450,
    returnTimeframe: "Per kit distributed (based on reversal rate)",
    evidenceSource: "ASTHO Naloxone Cost-Effectiveness Analysis",
    healthcareAvoidance: 5000,
    productivityGain: 6000,
    otherSavings: 1450,
  },
  diabetes_prevention: {
    name: "Diabetes Prevention Program (DPP)",
    category: "Chronic Disease",
    costPerParticipant: 1500,
    returnPerParticipant: 4500,
    returnTimeframe: "Per participant over 3 years",
    evidenceSource: "CDC/CMS DPP Cost-Effectiveness Analysis",
    healthcareAvoidance: 3500,
    productivityGain: 800,
    otherSavings: 200,
  },
  water_fluoridation: {
    name: "Community Water Fluoridation",
    category: "Oral Health",
    costPerParticipant: 1.5,
    returnPerParticipant: 48,
    returnTimeframe: "Per person per year",
    evidenceSource: "CDC — Water Fluoridation Cost-Effectiveness",
    healthcareAvoidance: 40,
    productivityGain: 5,
    otherSavings: 3,
  },
  school_sealants: {
    name: "School Dental Sealant Program",
    category: "Oral Health",
    costPerParticipant: 25,
    returnPerParticipant: 293,
    returnTimeframe: "Per sealed tooth",
    evidenceSource: "CDC — School Sealant Program Cost-Effectiveness",
    healthcareAvoidance: 250,
    productivityGain: 30,
    otherSavings: 13,
  },
};

/**
 * Calculate ROI for a given intervention and number of participants
 */
export function calculateROI(
  interventionKey: string,
  participants: number,
  annualProgramCost?: number
): ROIResult {
  const intervention = INTERVENTIONS[interventionKey];
  if (!intervention) {
    throw new Error(
      `Unknown intervention: ${interventionKey}. Available: ${Object.keys(INTERVENTIONS).join(", ")}`
    );
  }

  const totalCost =
    annualProgramCost || intervention.costPerParticipant * participants;
  const totalReturn = intervention.returnPerParticipant * participants;
  const netBenefit = totalReturn - totalCost;
  const roiRatio = totalReturn / totalCost;
  const breakEvenParticipants = Math.ceil(
    totalCost / intervention.returnPerParticipant
  );

  return {
    intervention: intervention.name,
    participants,
    totalCost,
    totalReturn,
    netBenefit,
    roiRatio: Math.round(roiRatio * 100) / 100,
    costPerQALY: null, // Would require QALY estimation per intervention
    breakEvenParticipants,
    paybackPeriod: intervention.returnTimeframe,
    summary: `For every $1 invested in ${intervention.name}, the community saves $${roiRatio.toFixed(2)}. With ${participants} participants, the net benefit is $${netBenefit.toLocaleString()}.`,
  };
}

/**
 * Compare ROI across multiple interventions
 */
export function compareInterventions(
  budget: number
): Array<ROIResult & { participantsAffordable: number }> {
  const results = Object.entries(INTERVENTIONS).map(([key, intervention]) => {
    const affordableParticipants = Math.floor(
      budget / intervention.costPerParticipant
    );
    const roi = calculateROI(key, affordableParticipants, budget);
    return {
      ...roi,
      participantsAffordable: affordableParticipants,
    };
  });

  return results.sort((a, b) => b.roiRatio - a.roiRatio);
}

/**
 * Generate a budget hearing summary
 */
export function budgetHearingSummary(
  interventionKey: string,
  participants: number
): string {
  const roi = calculateROI(interventionKey, participants);
  const intervention = INTERVENTIONS[interventionKey];

  return `
## ${intervention.name} — Investment Summary

**Request**: $${roi.totalCost.toLocaleString()} to serve ${participants} participants

**Return**: $${roi.totalReturn.toLocaleString()} in community value
- Healthcare costs avoided: $${(intervention.healthcareAvoidance * participants).toLocaleString()}
- Productivity gained: $${(intervention.productivityGain * participants).toLocaleString()}
- Other savings: $${(intervention.otherSavings * participants).toLocaleString()}

**ROI**: ${roi.roiRatio}:1 — every dollar invested returns $${roi.roiRatio.toFixed(2)}

**Net benefit**: $${roi.netBenefit.toLocaleString()}

**Evidence**: ${intervention.evidenceSource}

**Bottom line**: This investment pays for itself ${roi.roiRatio > 2 ? "many times over" : "and then some"}. Without it, these costs shift to emergency departments, lost productivity, and preventable suffering.
`.trim();
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes("--list")) {
    console.log("\nAvailable interventions:\n");
    for (const [key, i] of Object.entries(INTERVENTIONS)) {
      console.log(`  ${key}`);
      console.log(`    ${i.name} (${i.category})`);
      console.log(
        `    Cost: $${i.costPerParticipant}/participant → Return: $${i.returnPerParticipant}`
      );
      console.log(`    Source: ${i.evidenceSource}\n`);
    }
  } else if (args.includes("--compare")) {
    const budget = parseInt(args[args.indexOf("--compare") + 1]) || 100000;
    console.log(`\nComparing interventions with $${budget.toLocaleString()} budget:\n`);
    const results = compareInterventions(budget);
    for (const r of results) {
      console.log(`  ${r.intervention}`);
      console.log(`    ROI: ${r.roiRatio}:1 | Participants: ${r.participantsAffordable} | Net: $${r.netBenefit.toLocaleString()}`);
    }
  } else if (args.length >= 2) {
    const key = args[0];
    const participants = parseInt(args[1]);
    try {
      console.log(budgetHearingSummary(key, participants));
    } catch (e: any) {
      console.error(e.message);
    }
  } else {
    console.log("Public Health ROI Calculator\n");
    console.log("Usage:");
    console.log("  npx ts-node roi-calculator.ts --list                    List interventions");
    console.log("  npx ts-node roi-calculator.ts --compare 100000          Compare with budget");
    console.log("  npx ts-node roi-calculator.ts chw_program 200           Calculate ROI");
  }
}
