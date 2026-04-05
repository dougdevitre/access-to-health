/**
 * Access to Health — Developer Tools
 *
 * Entry point for programmatic use of the public health toolkit.
 *
 * Usage:
 *   import { scoreQuickScreen, calculateROI, generateCampaign } from 'access-to-health/tools';
 */

export { scoreScreening, scoreQuickScreen } from "./sdoh-score";
export { calculateROI, compareInterventions, budgetHearingSummary } from "./roi-calculator";
export { generateCampaign } from "./campaign-generator";
// apha-fetcher is JS — import via require in consuming code:
//   const { searchTopics, getTopic, listTopics } = require('./apha-fetcher');
