/**
 * Campaign Generator
 * AI-assisted health campaign planning engine
 * Reference: messaging/campaign-builder.md
 */

interface CampaignInput {
  topic: string;
  audience: string;
  geography: string;
  duration: string;
  channels?: string[];
  equityPopulations?: string[];
  budget?: string;
}

interface KeyMessage {
  primary: string;
  supporting: string[];
  callToAction: string;
}

interface ChannelPlan {
  channel: string;
  frequency: string;
  contentTypes: string[];
  notes: string;
}

interface CampaignPlan {
  title: string;
  goal: string;
  audience: AudienceSegment;
  keyMessages: KeyMessage;
  channels: ChannelPlan[];
  equityConsiderations: string[];
  timeline: TimelinePhase[];
  metrics: Metric[];
  guardrailChecklist: string[];
}

interface AudienceSegment {
  primary: string;
  secondary: string;
  demographics: string;
  currentBehavior: string;
  barriers: string[];
  motivators: string[];
}

interface TimelinePhase {
  phase: string;
  duration: string;
  activities: string[];
}

interface Metric {
  name: string;
  target: string;
  dataSource: string;
}

/**
 * Generate a campaign plan from input parameters
 */
export function generateCampaign(input: CampaignInput): CampaignPlan {
  const channels = input.channels || [
    "social_media",
    "community_events",
    "print",
  ];

  const channelPlans: ChannelPlan[] = channels.map((ch) =>
    getChannelPlan(ch, input.audience)
  );

  const equityConsiderations = getEquityConsiderations(
    input.equityPopulations || []
  );

  return {
    title: `${input.topic} Campaign — ${input.geography}`,
    goal: `Increase awareness and action on ${input.topic} among ${input.audience} in ${input.geography} over ${input.duration}`,
    audience: {
      primary: input.audience,
      secondary: "Partners, providers, community leaders",
      demographics: `[Define based on ${input.geography} data]`,
      currentBehavior: "[Assess through formative research]",
      barriers: [
        "Access barriers (cost, transportation, language)",
        "Knowledge gaps",
        "Trust in health institutions",
        "Competing priorities",
      ],
      motivators: [
        "Family health and safety",
        "Community well-being",
        "Trusted messenger endorsement",
        "Removing barriers (free, convenient, confidential)",
      ],
    },
    keyMessages: {
      primary: `[1 clear message about ${input.topic} — plain language, 6th grade]`,
      supporting: [
        "[Local data point that makes it real]",
        "[What you can do — specific, actionable]",
        "[Where to get help — phone, location, hours]",
      ],
      callToAction:
        "[ONE thing the audience should do — call, visit, sign up, share]",
    },
    channels: channelPlans,
    equityConsiderations,
    timeline: [
      {
        phase: "Planning",
        duration: "Weeks 1-4",
        activities: [
          "Formative research (audience analysis, existing messaging review)",
          "Partner engagement and buy-in",
          "Message development and testing",
          "Material production",
          "Staff/volunteer training",
        ],
      },
      {
        phase: "Soft Launch",
        duration: "Weeks 5-6",
        activities: [
          "Pilot with small audience segment",
          "Collect feedback",
          "Adjust messaging and materials",
        ],
      },
      {
        phase: "Full Launch",
        duration: `Weeks 7 through ${input.duration}`,
        activities: [
          "Deploy across all channels",
          "Community events and outreach",
          "Partner amplification",
          "Paid promotion (if budget allows)",
          "Media engagement (press release, interviews)",
        ],
      },
      {
        phase: "Evaluation",
        duration: "Final 2 weeks + 30 days post",
        activities: [
          "Collect outcome data",
          "Analyze reach, engagement, behavior change",
          "Community feedback",
          "Report to stakeholders",
          "Lessons learned for next campaign",
        ],
      },
    ],
    metrics: [
      {
        name: "Reach",
        target: "[# people exposed to messaging]",
        dataSource: "Social media analytics, event attendance, distribution counts",
      },
      {
        name: "Engagement",
        target: "[# interactions — clicks, shares, calls, sign-ups]",
        dataSource: "Analytics, call logs, sign-up forms",
      },
      {
        name: "Behavior change",
        target: "[# people who took desired action]",
        dataSource: "Program data, surveys, screening counts",
      },
      {
        name: "Equity",
        target: "Reach proportional to population demographics",
        dataSource: "Demographic data from events, surveys, program records",
      },
    ],
    guardrailChecklist: [
      "✅ Evidence-based: Claims supported by APHA, CDC, WHO, or peer-reviewed sources",
      "✅ Trauma-informed: No blame, shame, or stigmatizing language",
      "✅ Equity lens: Structural framing, not individual blame",
      "✅ Culturally responsive: Adapted for target populations",
      "✅ Politically neutral: Health outcomes, not partisan positions",
      "✅ Privacy-first: No PHI in any public materials",
      "✅ Plain language: 6th-grade reading level for public-facing content",
      "✅ Person-first: 'Person with...' not condition-first labels",
      "✅ Community voice: Community input in design and messaging",
      "✅ Bilingual: Spanish version available for public materials",
    ],
  };
}

function getChannelPlan(channel: string, audience: string): ChannelPlan {
  const plans: Record<string, ChannelPlan> = {
    social_media: {
      channel: "Social Media (Facebook, Instagram, X)",
      frequency: "3-5 posts/week per platform",
      contentTypes: [
        "Infographics",
        "Short videos (<60s)",
        "Testimonials (with consent)",
        "Event promotions",
        "Resource sharing",
      ],
      notes:
        "Facebook for 35+, Instagram for 18-34, X for media/policy. Always include image. Bilingual posts.",
    },
    community_events: {
      channel: "Community Events and Outreach",
      frequency: "2-4 events per month",
      contentTypes: [
        "Health fairs",
        "Screening events",
        "Charlas/workshops",
        "Partner events (churches, schools, businesses)",
      ],
      notes:
        "Prioritize locations where target audience already gathers. Provide food, childcare, interpretation.",
    },
    print: {
      channel: "Print Materials",
      frequency: "Produce at launch, refresh quarterly",
      contentTypes: [
        "Flyers",
        "Posters",
        "Fact sheets",
        "Rack cards",
        "Bilingual materials",
      ],
      notes:
        "6th-grade reading level. Distribute at clinics, WIC, schools, laundromats, libraries, churches.",
    },
    email: {
      channel: "Email",
      frequency: "Biweekly during campaign",
      contentTypes: [
        "Newsletter features",
        "Event reminders",
        "Resource spotlights",
        "Action alerts",
      ],
      notes: "Segment by audience. Subject lines under 50 characters. One CTA per email.",
    },
    media: {
      channel: "Earned Media",
      frequency: "Press release at launch + key milestones",
      contentTypes: [
        "Press releases",
        "Op-eds",
        "Radio interviews",
        "TV segments",
        "Letters to the editor",
      ],
      notes: "Prepare spokesperson with talking points. Offer local data and human interest angles.",
    },
    partner: {
      channel: "Partner Amplification",
      frequency: "Ongoing",
      contentTypes: [
        "Co-branded materials",
        "Shared social media posts",
        "Joint events",
        "Newsletter mentions",
      ],
      notes:
        "Provide partners with ready-to-share content. Make it easy for them to amplify.",
    },
  };

  return plans[channel] || plans["social_media"];
}

function getEquityConsiderations(populations: string[]): string[] {
  const considerations: string[] = [
    "Materials available in top 3 community languages",
    "Events accessible (ADA, transit, childcare, interpretation)",
    "Community members compensated for advisory input",
    "Imagery reflects community demographics (not stock photos)",
    "Messaging reviewed by community members before launch",
  ];

  const populationSpecific: Record<string, string[]> = {
    BLK: [
      "Partner with Black churches, barbershops, and community organizations",
      "Address historical trust issues — sustained action, not just messaging",
      "Name structural racism as a driver of health disparities",
    ],
    HIS: [
      "Use promotora model for outreach",
      "Clarify: Services available regardless of immigration status",
      "Culturally adapted (not just translated) Spanish content",
    ],
    RUR: [
      "Account for distance and transportation barriers",
      "Partner with farm bureaus, churches, and local businesses",
      "Consider broadband limitations for digital channels",
    ],
    LGBT: [
      "Use affirming language and imagery",
      "Partner with LGBTQ+ community centers and Pride organizations",
      "Ensure safe spaces for participation",
    ],
  };

  for (const pop of populations) {
    if (populationSpecific[pop]) {
      considerations.push(...populationSpecific[pop]);
    }
  }

  return considerations;
}
