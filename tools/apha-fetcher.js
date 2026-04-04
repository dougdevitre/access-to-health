/**
 * APHA Fetcher — PDF Ingestion and Reference Lookup
 * Fetches APHA topic pages and policy statements for evidence-based content
 * Reference: references/apha-url-index.md
 *
 * Usage:
 *   node apha-fetcher.js --topic "maternal health"
 *   node apha-fetcher.js --list-topics
 *   node apha-fetcher.js --search "harm reduction"
 */

const APHA_BASE = "https://apha.org";

/**
 * APHA Topic Area Index
 * Maps topic keywords to APHA URL paths and key evidence summaries
 */
const TOPIC_INDEX = {
  "health-equity": {
    path: "/topics-and-issues/health-equity",
    keywords: ["equity", "disparities", "social justice", "SDOH"],
    summary:
      "Health equity is a core APHA value. Disparities driven by structural factors, not individual behavior.",
  },
  "racism-and-health": {
    path: "/topics-and-issues/racism-and-health",
    keywords: ["racism", "structural racism", "racial disparities", "anti-racist"],
    summary:
      "Racism is a public health crisis. Structural racism operates through all social systems.",
  },
  "maternal-and-child-health": {
    path: "/topics-and-issues/maternal-and-child-health",
    keywords: [
      "maternal", "pregnancy", "infant", "child health", "birth",
      "prenatal", "postpartum", "doula", "midwife",
    ],
    summary:
      "US maternal mortality highest among wealthy nations. Black women die at 3-4x rate. Doula care reduces disparities.",
  },
  "substance-use": {
    path: "/topics-and-issues/alcohol-tobacco-and-other-drugs",
    keywords: [
      "substance use", "opioid", "overdose", "harm reduction",
      "naloxone", "syringe", "MAT", "recovery",
    ],
    summary:
      "SUDs are treatable health conditions. Harm reduction saves lives. Criminalization worsens outcomes.",
  },
  "mental-health": {
    path: "/topics-and-issues/mental-health",
    keywords: ["mental health", "depression", "anxiety", "suicide", "988", "crisis"],
    summary:
      "1 in 5 adults experience mental illness. Only 46% receive treatment. Parity is a right.",
  },
  "gun-violence": {
    path: "/topics-and-issues/gun-violence",
    keywords: ["gun", "firearm", "violence", "shooting"],
    summary:
      "Gun violence is a public health emergency. Firearms are leading cause of death for children.",
  },
  "climate-change": {
    path: "/topics-and-issues/climate-change",
    keywords: ["climate", "heat", "air quality", "environmental"],
    summary:
      "Climate change is the greatest public health threat. Disproportionate impact on vulnerable populations.",
  },
  "tobacco": {
    path: "/topics-and-issues/tobacco-control",
    keywords: ["tobacco", "smoking", "e-cigarette", "vaping", "cessation"],
    summary:
      "Tobacco kills 480,000 annually. Comprehensive control works. E-cigarettes are not safe for youth.",
  },
  "immunization": {
    path: "/topics-and-issues/immunization",
    keywords: ["vaccine", "immunization", "hesitancy", "anti-vax"],
    summary:
      "Vaccines are safe and effective. Hesitancy driven by misinformation and distrust, not ideology alone.",
  },
  "food-and-nutrition": {
    path: "/topics-and-issues/food-and-nutrition",
    keywords: ["food", "nutrition", "hunger", "SNAP", "WIC", "food desert"],
    summary:
      "44 million Americans food insecure. SNAP reduces food insecurity by 30%. Access is a right.",
  },
  "housing": {
    path: "/topics-and-issues/housing",
    keywords: ["housing", "homelessness", "lead", "eviction"],
    summary:
      "Housing is a social determinant. Homelessness is a public health crisis. Housing First works.",
  },
  "environmental-health": {
    path: "/topics-and-issues/environmental-health",
    keywords: ["environment", "pollution", "water", "air", "lead", "EJ"],
    summary:
      "Environmental hazards unequally distributed. Environmental justice is health justice.",
  },
  "health-workforce": {
    path: "/topics-and-issues/health-workforce",
    keywords: ["workforce", "staffing", "burnout", "CHW", "pipeline"],
    summary:
      "PH workforce declined 20% since 2008. 80,000 worker shortage. CHW integration improves outcomes.",
  },
  "chronic-disease": {
    path: "/topics-and-issues/chronic-disease",
    keywords: ["diabetes", "heart disease", "obesity", "hypertension", "cancer"],
    summary:
      "Chronic diseases are leading causes of death. Upstream prevention more effective than downstream treatment.",
  },
  "infectious-disease": {
    path: "/topics-and-issues/communicable-disease",
    keywords: ["infectious", "outbreak", "surveillance", "antimicrobial"],
    summary:
      "Surveillance and rapid response are core PH functions. Global health security requires investment.",
  },
  "emergency-preparedness": {
    path: "/topics-and-issues/emergency-preparedness",
    keywords: ["emergency", "preparedness", "disaster", "resilience"],
    summary:
      "All-hazards approach. Health equity in disaster response. Community resilience is key.",
  },
  "oral-health": {
    path: "/topics-and-issues/oral-health",
    keywords: ["dental", "oral", "fluoride", "sealant"],
    summary:
      "Dental care is healthcare. Fluoridation is safe and effective. Expand Medicaid dental benefits.",
  },
  "reproductive-health": {
    path: "/topics-and-issues/reproductive-health",
    keywords: ["reproductive", "contraception", "family planning"],
    summary: "Comprehensive reproductive healthcare access is a human right.",
  },
  "lgbtq-health": {
    path: "/topics-and-issues/lgbtq-health",
    keywords: ["LGBTQ", "transgender", "sexual orientation", "gender identity"],
    summary:
      "Discrimination drives disparities. Affirming care is standard of care.",
  },
  disability: {
    path: "/topics-and-issues/disability",
    keywords: ["disability", "ADA", "accessibility", "inclusion"],
    summary:
      "Accessible healthcare, inclusive design, secondary condition prevention.",
  },
  "immigrant-health": {
    path: "/topics-and-issues/immigrant-health",
    keywords: ["immigrant", "refugee", "undocumented", "asylum"],
    summary:
      "Healthcare access regardless of status. Public charge rules harm health.",
  },
  incarceration: {
    path: "/topics-and-issues/incarceration",
    keywords: ["incarceration", "prison", "jail", "reentry", "criminal justice"],
    summary:
      "Mass incarceration is a PH crisis. Healthcare continuity at reentry is essential.",
  },
  "occupational-health": {
    path: "/topics-and-issues/occupational-health",
    keywords: ["worker", "occupational", "workplace", "OSHA"],
    summary:
      "Worker safety protections, hazard prevention, paid sick leave.",
  },
};

/**
 * Search topics by keyword
 */
function searchTopics(query) {
  const queryLower = query.toLowerCase();
  const results = [];

  for (const [key, topic] of Object.entries(TOPIC_INDEX)) {
    const matchesKeyword = topic.keywords.some((kw) =>
      kw.toLowerCase().includes(queryLower)
    );
    const matchesKey = key.includes(queryLower);
    const matchesSummary = topic.summary.toLowerCase().includes(queryLower);

    if (matchesKeyword || matchesKey || matchesSummary) {
      results.push({
        topic: key,
        url: `${APHA_BASE}${topic.path}`,
        summary: topic.summary,
        relevance: matchesKeyword ? "high" : matchesKey ? "medium" : "low",
      });
    }
  }

  return results.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.relevance] - order[b.relevance];
  });
}

/**
 * Get topic details by key
 */
function getTopic(topicKey) {
  const topic = TOPIC_INDEX[topicKey];
  if (!topic) {
    return { error: `Topic '${topicKey}' not found. Use --list-topics to see available topics.` };
  }
  return {
    topic: topicKey,
    url: `${APHA_BASE}${topic.path}`,
    keywords: topic.keywords,
    summary: topic.summary,
  };
}

/**
 * List all available topics
 */
function listTopics() {
  return Object.entries(TOPIC_INDEX).map(([key, topic]) => ({
    topic: key,
    keywords: topic.keywords.slice(0, 3).join(", "),
    summary: topic.summary.substring(0, 80) + "...",
  }));
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes("--list-topics")) {
    const topics = listTopics();
    console.log("\nAPHA Topic Areas:\n");
    for (const t of topics) {
      console.log(`  ${t.topic}`);
      console.log(`    Keywords: ${t.keywords}`);
      console.log(`    ${t.summary}\n`);
    }
  } else if (args.includes("--search")) {
    const query = args[args.indexOf("--search") + 1];
    if (!query) {
      console.error("Usage: node apha-fetcher.js --search <query>");
      process.exit(1);
    }
    const results = searchTopics(query);
    console.log(`\nSearch results for "${query}":\n`);
    for (const r of results) {
      console.log(`  [${r.relevance}] ${r.topic}`);
      console.log(`    URL: ${r.url}`);
      console.log(`    ${r.summary}\n`);
    }
    if (results.length === 0) {
      console.log("  No results found.");
    }
  } else if (args.includes("--topic")) {
    const topicKey = args[args.indexOf("--topic") + 1];
    const result = getTopic(topicKey);
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log("APHA Fetcher — Reference lookup for evidence-based content\n");
    console.log("Usage:");
    console.log("  node apha-fetcher.js --list-topics          List all APHA topic areas");
    console.log('  node apha-fetcher.js --search "query"        Search topics by keyword');
    console.log('  node apha-fetcher.js --topic "topic-key"     Get details for a topic');
  }
}

module.exports = { searchTopics, getTopic, listTopics, TOPIC_INDEX };
