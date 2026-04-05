# Interactive ROI Calculator

> Estimate return on investment for public health interventions
> Evidence-based profiles from CDC, RAND, USDA, and ASTHO — see [fiscal operations](../integration/fiscal-operations.md)

!!! info "For budget hearings, grant applications, and advocacy"
    Use these numbers to make the financial case for public health funding. Every figure is sourced from published research.

---

## Calculate ROI

<div id="roi-calculator">
  <label for="intervention"><strong>Intervention:</strong></label>
  <select id="intervention" onchange="calculateROI()" style="margin-bottom: 0.5em; padding: 0.4em;">
    <option value="childhood_immunization">Childhood Immunization Program</option>
    <option value="wic">WIC Nutrition Program</option>
    <option value="chw_program" selected>Community Health Worker Program</option>
    <option value="tobacco_cessation">Tobacco Cessation Program</option>
    <option value="lead_prevention">Lead Poisoning Prevention</option>
    <option value="home_visiting">Home Visiting (Nurse-Family Partnership)</option>
    <option value="naloxone_distribution">Naloxone Distribution Program</option>
    <option value="diabetes_prevention">Diabetes Prevention Program (DPP)</option>
    <option value="water_fluoridation">Community Water Fluoridation</option>
    <option value="school_sealants">School Dental Sealant Program</option>
  </select>

  <br/>
  <label for="participants"><strong>Number of participants:</strong></label>
  <input type="number" id="participants" value="100" min="1" max="1000000" onchange="calculateROI()" oninput="calculateROI()" style="padding: 0.4em; width: 120px;">

  <br/><br/>
  <button class="md-button md-button--primary" onclick="calculateROI()">Calculate</button>
</div>

---

<div id="roi-results" style="margin-top: 1em;"></div>

<style>
.roi-card {
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: 8px;
  padding: 1.5em;
  margin: 1em 0;
}
.roi-big-number {
  font-size: 2em;
  font-weight: bold;
  color: var(--md-primary-fg-color);
}
.roi-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
  margin: 1em 0;
}
@media (max-width: 600px) {
  .roi-grid { grid-template-columns: 1fr; }
}
</style>

<script>
var interventions = {
  childhood_immunization: { name: "Childhood Immunization Program", cat: "Prevention", cost: 525, ret: 5723, source: "CDC — Economic Analysis of Childhood Immunization", health: 4200, prod: 1200, other: 323, timeframe: "Lifetime per child" },
  wic: { name: "WIC Nutrition Program", cat: "Nutrition", cost: 600, ret: 1662, source: "USDA Economic Research Service", health: 1200, prod: 300, other: 162, timeframe: "Per participant per year" },
  chw_program: { name: "Community Health Worker Program", cat: "Care Coordination", cost: 2400, ret: 5928, source: "ASTHO CHW ROI Analysis", health: 3800, prod: 1500, other: 628, timeframe: "Per client per year" },
  tobacco_cessation: { name: "Tobacco Cessation Program", cat: "Prevention", cost: 500, ret: 630, source: "CDC Office on Smoking and Health", health: 450, prod: 150, other: 30, timeframe: "Per participant per year" },
  lead_prevention: { name: "Lead Poisoning Prevention", cat: "Environmental", cost: 350, ret: 17000, source: "Pew Health/HBEP — Benefits of Lead Hazard Control", health: 5000, prod: 10000, other: 2000, timeframe: "Lifetime per child" },
  home_visiting: { name: "Home Visiting (NFP)", cat: "Maternal-Child", cost: 9500, ret: 54150, source: "RAND Corporation — NFP Cost-Benefit Analysis", health: 18000, prod: 25000, other: 11150, timeframe: "Per family through child age 15" },
  naloxone_distribution: { name: "Naloxone Distribution", cat: "Harm Reduction", cost: 75, ret: 12450, source: "ASTHO Naloxone Cost-Effectiveness Analysis", health: 5000, prod: 6000, other: 1450, timeframe: "Per kit (based on reversal rate)" },
  diabetes_prevention: { name: "Diabetes Prevention Program", cat: "Chronic Disease", cost: 1500, ret: 4500, source: "CDC/CMS DPP Cost-Effectiveness Analysis", health: 3500, prod: 800, other: 200, timeframe: "Per participant over 3 years" },
  water_fluoridation: { name: "Community Water Fluoridation", cat: "Oral Health", cost: 1.50, ret: 48, source: "CDC — Water Fluoridation Cost-Effectiveness", health: 40, prod: 5, other: 3, timeframe: "Per person per year" },
  school_sealants: { name: "School Dental Sealant Program", cat: "Oral Health", cost: 25, ret: 293, source: "CDC — School Sealant Program Cost-Effectiveness", health: 250, prod: 30, other: 13, timeframe: "Per sealed tooth" }
};

function fmt(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function calculateROI() {
  var key = document.getElementById('intervention').value;
  var n = parseInt(document.getElementById('participants').value) || 0;
  var i = interventions[key];
  if (!i || n <= 0) return;

  var totalCost = i.cost * n;
  var totalReturn = i.ret * n;
  var netBenefit = totalReturn - totalCost;
  var ratio = (totalReturn / totalCost).toFixed(2);

  document.getElementById('roi-results').innerHTML =
    '<div class="roi-card">' +
    '<h3>' + i.name + '</h3>' +
    '<p class="roi-big-number">' + ratio + ':1 ROI</p>' +
    '<p>Every $1 invested returns $' + ratio + ' in community value</p>' +
    '<div class="roi-grid">' +
    '<div><strong>Total Investment</strong><br/>' + fmt(totalCost) + '<br/><small>' + n.toLocaleString() + ' participants × ' + fmt(i.cost) + '</small></div>' +
    '<div><strong>Total Return</strong><br/>' + fmt(totalReturn) + '<br/><small>' + fmt(i.health * n) + ' healthcare + ' + fmt(i.prod * n) + ' productivity</small></div>' +
    '<div><strong>Net Benefit</strong><br/>' + fmt(netBenefit) + '</div>' +
    '<div><strong>Timeframe</strong><br/>' + i.timeframe + '</div>' +
    '</div>' +
    '<p><strong>Evidence:</strong> ' + i.source + '</p>' +
    '<hr/>' +
    '<h4>Budget Hearing Talking Point</h4>' +
    '<blockquote>"We are requesting ' + fmt(totalCost) + ' to serve ' + n.toLocaleString() + ' participants through our ' + i.name + '. ' +
    'This investment returns ' + fmt(totalReturn) + ' in healthcare cost avoidance, productivity gains, and community value — a ' + ratio + ':1 return. ' +
    'Without it, these costs shift to emergency departments, lost productivity, and preventable suffering."</blockquote>' +
    '</div>';
}

calculateROI();
</script>
