import { generateCampaign } from "../campaign-generator";

describe("Campaign Generator", () => {
  describe("generateCampaign", () => {
    it("generates a campaign plan with required fields", () => {
      const plan = generateCampaign({
        topic: "childhood immunization",
        audience: "parents of children ages 0-5",
        geography: "St. Louis County",
        duration: "3 months",
      });

      expect(plan.title).toContain("childhood immunization");
      expect(plan.goal).toContain("parents of children ages 0-5");
      expect(plan.goal).toContain("St. Louis County");
      expect(plan.audience.primary).toBe("parents of children ages 0-5");
      expect(plan.channels.length).toBeGreaterThan(0);
      expect(plan.timeline.length).toBe(4); // Planning, Soft Launch, Full Launch, Evaluation
      expect(plan.metrics.length).toBeGreaterThanOrEqual(4);
      expect(plan.guardrailChecklist.length).toBe(10);
    });

    it("uses specified channels when provided", () => {
      const plan = generateCampaign({
        topic: "naloxone awareness",
        audience: "community members",
        geography: "Missouri",
        duration: "6 months",
        channels: ["email", "media"],
      });

      expect(plan.channels.length).toBe(2);
      expect(plan.channels[0].channel).toContain("Email");
      expect(plan.channels[1].channel).toContain("Media");
    });

    it("includes equity considerations for specified populations", () => {
      const plan = generateCampaign({
        topic: "diabetes prevention",
        audience: "adults with prediabetes",
        geography: "North St. Louis",
        duration: "1 year",
        equityPopulations: ["BLK", "HIS"],
      });

      const considerations = plan.equityConsiderations.join(" ");
      expect(considerations).toContain("Black churches");
      expect(considerations).toContain("promotora");
      expect(considerations).toContain("immigration status");
    });

    it("includes equity considerations for rural populations", () => {
      const plan = generateCampaign({
        topic: "telehealth access",
        audience: "rural residents",
        geography: "Southern Missouri",
        duration: "6 months",
        equityPopulations: ["RUR"],
      });

      const considerations = plan.equityConsiderations.join(" ");
      expect(considerations).toContain("broadband");
      expect(considerations).toContain("transportation");
    });

    it("includes equity considerations for LGBTQ+ populations", () => {
      const plan = generateCampaign({
        topic: "mental health",
        audience: "LGBTQ+ youth",
        geography: "Kansas City",
        duration: "3 months",
        equityPopulations: ["LGBT"],
      });

      const considerations = plan.equityConsiderations.join(" ");
      expect(considerations).toContain("affirming");
    });

    it("defaults to 3 channels when none specified", () => {
      const plan = generateCampaign({
        topic: "flu vaccination",
        audience: "older adults",
        geography: "Jackson County",
        duration: "2 months",
      });

      expect(plan.channels.length).toBe(3);
    });

    it("always includes base equity considerations", () => {
      const plan = generateCampaign({
        topic: "lead testing",
        audience: "parents",
        geography: "St. Louis City",
        duration: "1 month",
      });

      const considerations = plan.equityConsiderations.join(" ");
      expect(considerations).toContain("languages");
      expect(considerations).toContain("accessible");
      expect(considerations).toContain("compensated");
    });

    it("includes all 10 guardrails in checklist", () => {
      const plan = generateCampaign({
        topic: "test",
        audience: "test",
        geography: "test",
        duration: "test",
      });

      expect(plan.guardrailChecklist).toContainEqual(
        expect.stringContaining("Evidence-based")
      );
      expect(plan.guardrailChecklist).toContainEqual(
        expect.stringContaining("Trauma-informed")
      );
      expect(plan.guardrailChecklist).toContainEqual(
        expect.stringContaining("Equity lens")
      );
      expect(plan.guardrailChecklist).toContainEqual(
        expect.stringContaining("Privacy-first")
      );
      expect(plan.guardrailChecklist).toContainEqual(
        expect.stringContaining("Person-first")
      );
    });
  });
});
