import {
  calculateROI,
  compareInterventions,
  budgetHearingSummary,
} from "../roi-calculator";

describe("ROI Calculator", () => {
  describe("calculateROI", () => {
    it("calculates CHW program ROI correctly", () => {
      const result = calculateROI("chw_program", 100);
      expect(result.intervention).toBe("Community Health Worker Program");
      expect(result.participants).toBe(100);
      expect(result.totalCost).toBe(240000);
      expect(result.totalReturn).toBe(592800);
      expect(result.netBenefit).toBe(352800);
      expect(result.roiRatio).toBe(2.47);
    });

    it("calculates childhood immunization ROI correctly", () => {
      const result = calculateROI("childhood_immunization", 1000);
      expect(result.totalCost).toBe(525000);
      expect(result.totalReturn).toBe(5723000);
      expect(result.roiRatio).toBe(10.9);
    });

    it("accepts custom annual program cost", () => {
      const result = calculateROI("chw_program", 50, 150000);
      expect(result.totalCost).toBe(150000);
      expect(result.totalReturn).toBe(50 * 5928);
    });

    it("throws for unknown intervention", () => {
      expect(() => calculateROI("nonexistent", 100)).toThrow(
        "Unknown intervention"
      );
    });

    it("calculates breakeven participants", () => {
      const result = calculateROI("tobacco_cessation", 100);
      // Cost per participant: $500, return per participant: $630
      // Breakeven with $50,000 total cost: 50000 / 630 = 80
      expect(result.breakEvenParticipants).toBe(80);
    });

    it("includes payback period from evidence source", () => {
      const result = calculateROI("home_visiting", 50);
      expect(result.paybackPeriod).toContain("child age 15");
    });

    it("generates meaningful summary text", () => {
      const result = calculateROI("naloxone_distribution", 500);
      expect(result.summary).toContain("Naloxone Distribution Program");
      expect(result.summary).toContain("500 participants");
      expect(result.summary).toContain("$");
    });
  });

  describe("compareInterventions", () => {
    it("returns all interventions sorted by ROI ratio", () => {
      const results = compareInterventions(100000);
      expect(results.length).toBeGreaterThan(0);

      // Should be sorted descending by ROI
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].roiRatio).toBeGreaterThanOrEqual(
          results[i].roiRatio
        );
      }
    });

    it("calculates affordable participants based on budget", () => {
      const results = compareInterventions(50000);
      const chw = results.find(
        (r) => r.intervention === "Community Health Worker Program"
      );
      // $50,000 / $2,400 per participant = 20
      expect(chw?.participantsAffordable).toBe(20);
    });

    it("naloxone has highest ROI ratio", () => {
      const results = compareInterventions(100000);
      // Naloxone: $12,450 return per $75 cost = 166:1
      expect(results[0].intervention).toContain("Naloxone");
    });
  });

  describe("budgetHearingSummary", () => {
    it("generates formatted markdown summary", () => {
      const summary = budgetHearingSummary("diabetes_prevention", 200);
      expect(summary).toContain("## Diabetes Prevention Program");
      expect(summary).toContain("**Request**");
      expect(summary).toContain("**Return**");
      expect(summary).toContain("**ROI**");
      expect(summary).toContain("**Evidence**");
      expect(summary).toContain("200 participants");
    });
  });
});
