import { scoreScreening, scoreQuickScreen } from "../sdoh-score";

describe("SDOH Risk Scoring", () => {
  describe("scoreQuickScreen", () => {
    it("returns 'none' risk for all-negative responses", () => {
      const result = scoreQuickScreen({
        foodHousingUtilities: false,
        transportation: false,
        medication: false,
        safety: true, // feels safe = not flagged
        depression: false,
      });
      expect(result.riskLevel).toBe("none");
      expect(result.totalScore).toBe(0);
      expect(result.recommendations).toHaveLength(0);
      expect(result.followUpDays).toBe(365);
    });

    it("flags food domain when foodHousingUtilities is true", () => {
      const result = scoreQuickScreen({
        foodHousingUtilities: true,
        transportation: false,
        medication: false,
        safety: true,
        depression: false,
      });
      expect(result.domains.some((d) => d.domain === "food" && d.flagged)).toBe(
        true
      );
      expect(result.riskLevel).toBe("low");
    });

    it("flags safety as critical when person does NOT feel safe", () => {
      const result = scoreQuickScreen({
        foodHousingUtilities: false,
        transportation: false,
        medication: false,
        safety: false, // does NOT feel safe
        depression: false,
      });
      const safetyDomain = result.domains.find((d) => d.domain === "safety");
      expect(safetyDomain?.flagged).toBe(true);
      expect(safetyDomain?.severity).toBe("critical");
      expect(safetyDomain?.score).toBe(3);
    });

    it("returns critical risk for multiple flagged domains", () => {
      const result = scoreQuickScreen({
        foodHousingUtilities: true,
        transportation: true,
        medication: true,
        safety: false, // critical
        depression: true,
      });
      expect(result.riskLevel).toBe("high");
      expect(result.followUpDays).toBe(7);
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it("generates emergency tier recommendation for safety", () => {
      const result = scoreQuickScreen({
        foodHousingUtilities: false,
        transportation: false,
        medication: false,
        safety: false,
        depression: false,
      });
      const safetyRec = result.recommendations.find(
        (r) => r.domain === "safety"
      );
      expect(safetyRec?.tier).toBe("emergency");
      expect(safetyRec?.action).toContain("DV hotline");
    });

    it("generates short_term recommendation for food insecurity", () => {
      const result = scoreQuickScreen({
        foodHousingUtilities: true,
        transportation: false,
        medication: false,
        safety: true,
        depression: false,
      });
      const foodRec = result.recommendations.find((r) => r.domain === "food");
      expect(foodRec?.tier).toBe("short_term");
      expect(foodRec?.action).toContain("SNAP");
    });

    it("sets correct follow-up schedule by risk level", () => {
      // Low risk = 90 days
      const low = scoreQuickScreen({
        foodHousingUtilities: true,
        transportation: false,
        medication: false,
        safety: true,
        depression: false,
      });
      expect(low.followUpDays).toBe(90);

      // Moderate risk = 30 days
      const moderate = scoreQuickScreen({
        foodHousingUtilities: true,
        transportation: true,
        medication: true,
        safety: true,
        depression: false,
      });
      expect(moderate.followUpDays).toBe(30);
    });
  });

  describe("scoreScreening", () => {
    it("calculates correct total score from domain results", () => {
      const result = scoreScreening("prapare", [
        { domain: "housing", flagged: true, severity: "critical", score: 3 },
        { domain: "food", flagged: true, severity: "high", score: 2 },
        { domain: "income", flagged: false, severity: "none", score: 0 },
      ]);
      expect(result.totalScore).toBe(5);
      expect(result.riskLevel).toBe("moderate");
      expect(result.tool).toBe("prapare");
    });

    it("returns critical risk level for score >= 13", () => {
      const result = scoreScreening("prapare", [
        { domain: "housing", flagged: true, severity: "critical", score: 3 },
        { domain: "food", flagged: true, severity: "critical", score: 3 },
        { domain: "safety", flagged: true, severity: "critical", score: 3 },
        { domain: "income", flagged: true, severity: "high", score: 2 },
        { domain: "healthcare", flagged: true, severity: "high", score: 2 },
      ]);
      expect(result.totalScore).toBe(13);
      expect(result.riskLevel).toBe("critical");
      expect(result.followUpDays).toBe(1);
    });
  });
});
