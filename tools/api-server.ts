/**
 * Access to Health — REST API Server
 *
 * Lightweight HTTP server exposing the SDOH screening, ROI calculation,
 * and campaign generation tools as REST endpoints.
 *
 * Usage:
 *   npx ts-node tools/api-server.ts [port]
 *   Default port: 3000
 *
 * Endpoints:
 *   POST /api/screen    — SDOH Quick Screen scoring
 *   POST /api/roi       — ROI calculation
 *   POST /api/campaign  — Campaign plan generation
 *   GET  /api/apha      — APHA topic search
 *   GET  /api/health    — Health check
 */

import * as http from "http";
import { scoreQuickScreen, scoreScreening } from "./sdoh-score";
import { calculateROI, compareInterventions } from "./roi-calculator";
import { generateCampaign } from "./campaign-generator";

const PORT = parseInt(process.argv[2] || "3000");

function parseBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
  });
}

function json(res: http.ServerResponse, data: unknown, status = 200): void {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data, null, 2));
}

function error(
  res: http.ServerResponse,
  message: string,
  status = 400
): void {
  json(res, { error: message }, status);
}

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  const url = new URL(req.url || "/", `http://localhost:${PORT}`);
  const path = url.pathname;

  try {
    // Health check
    if (path === "/api/health" && req.method === "GET") {
      json(res, {
        status: "ok",
        service: "access-to-health-api",
        version: "3.2.0",
        endpoints: [
          "POST /api/screen",
          "POST /api/roi",
          "POST /api/campaign",
          "GET /api/apha?q=query",
          "GET /api/roi/compare?budget=100000",
          "GET /api/roi/list",
        ],
      });
      return;
    }

    // SDOH Quick Screen
    if (path === "/api/screen" && req.method === "POST") {
      const body = JSON.parse(await parseBody(req));

      if (body.tool === "quick_screen" || !body.tool) {
        const result = scoreQuickScreen({
          foodHousingUtilities: !!body.foodHousingUtilities,
          transportation: !!body.transportation,
          medication: !!body.medication,
          safety: body.safety !== false, // default to safe
          depression: !!body.depression,
        });
        json(res, result);
      } else if (body.tool === "prapare" || body.tool === "ahc") {
        if (!body.domains || !Array.isArray(body.domains)) {
          error(res, "domains array required for PRAPARE/AHC screening");
          return;
        }
        const result = scoreScreening(body.tool, body.domains);
        json(res, result);
      } else {
        error(res, "Invalid tool. Use: quick_screen, prapare, ahc");
      }
      return;
    }

    // ROI Calculator
    if (path === "/api/roi" && req.method === "POST") {
      const body = JSON.parse(await parseBody(req));
      if (!body.intervention || !body.participants) {
        error(res, "intervention and participants required");
        return;
      }
      const result = calculateROI(
        body.intervention,
        body.participants,
        body.programCost
      );
      json(res, result);
      return;
    }

    // ROI Compare
    if (path === "/api/roi/compare" && req.method === "GET") {
      const budget = parseInt(url.searchParams.get("budget") || "100000");
      const result = compareInterventions(budget);
      json(res, result);
      return;
    }

    // ROI List interventions
    if (path === "/api/roi/list" && req.method === "GET") {
      const result = compareInterventions(100000).map((r) => ({
        key: r.intervention
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "_")
          .replace(/_+$/, ""),
        name: r.intervention,
        roiRatio: r.roiRatio,
      }));
      json(res, result);
      return;
    }

    // Campaign Generator
    if (path === "/api/campaign" && req.method === "POST") {
      const body = JSON.parse(await parseBody(req));
      if (!body.topic || !body.audience) {
        error(res, "topic and audience required");
        return;
      }
      const result = generateCampaign({
        topic: body.topic,
        audience: body.audience,
        geography: body.geography || "National",
        duration: body.duration || "3 months",
        channels: body.channels,
        equityPopulations: body.equityPopulations,
      });
      json(res, result);
      return;
    }

    // APHA Search
    if (path === "/api/apha" && req.method === "GET") {
      const query = url.searchParams.get("q");
      if (!query) {
        error(res, "q parameter required (search query)");
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { searchTopics } = require("./apha-fetcher");
      const result = searchTopics(query);
      json(res, result);
      return;
    }

    // Not found
    error(res, `Not found: ${req.method} ${path}`, 404);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal server error";
    error(res, message, 500);
  }
});

server.listen(PORT, () => {
  console.log(`Access to Health API running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log();
  console.log("Endpoints:");
  console.log("  POST /api/screen     — SDOH Quick Screen");
  console.log("  POST /api/roi        — ROI calculation");
  console.log("  POST /api/campaign   — Campaign generation");
  console.log("  GET  /api/apha?q=... — APHA topic search");
  console.log("  GET  /api/roi/compare?budget=N — Compare interventions");
  console.log("  GET  /api/roi/list   — List all interventions");
});
