# Interactive Engagement Calendar

> 52-week public health engagement calendar with health observances, actions, and role assignments
> Source data: [assets/engagement-calendar.csv](../assets/engagement-calendar.csv)

!!! tip "How to use"
    Filter by month, role, or population to find relevant health observances and plan outreach. Each entry includes suggested actions and the roles responsible.

---

<div id="calendar-controls" style="margin-bottom: 1em;">
  <label for="month-filter"><strong>Month:</strong></label>
  <select id="month-filter" onchange="filterCalendar()">
    <option value="">All Months</option>
    <option value="January">January</option>
    <option value="February">February</option>
    <option value="March">March</option>
    <option value="April">April</option>
    <option value="May">May</option>
    <option value="June">June</option>
    <option value="July">July</option>
    <option value="August">August</option>
    <option value="September">September</option>
    <option value="October">October</option>
    <option value="November">November</option>
    <option value="December">December</option>
    <option value="Year-Round">Year-Round</option>
  </select>

  <label for="role-filter" style="margin-left: 1em;"><strong>Role:</strong></label>
  <select id="role-filter" onchange="filterCalendar()">
    <option value="">All Roles</option>
    <option value="EPI">EPI — Epidemiologist</option>
    <option value="CHW">CHW — Community Health Worker</option>
    <option value="PHN">PHN — Public Health Nurse</option>
    <option value="BHC">BHC — Behavioral Health</option>
    <option value="HCS">HCS — Communications</option>
    <option value="HED">HED — Health Educator</option>
    <option value="SHC">SHC — School Health</option>
    <option value="SUP">SUP — Substance Use Prevention</option>
    <option value="DIS">DIS — Disease Intervention</option>
    <option value="NUT">NUT — Nutritionist</option>
    <option value="CES">CES — Community Engagement</option>
    <option value="EHS">EHS — Environmental Health</option>
    <option value="MCH">MCH — Maternal-Child Health</option>
    <option value="HDO">HDO — Health Director</option>
    <option value="POL">POL — Policy Analyst</option>
    <option value="DAT">DAT — Data Analyst</option>
    <option value="PMG">PMG — Program Manager</option>
    <option value="QIC">QIC — QI Coordinator</option>
  </select>
</div>

<div id="calendar-count" style="margin-bottom: 1em; color: var(--md-default-fg-color--light);"></div>

<div id="calendar-entries"></div>

<style>
.cal-entry {
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: 8px;
  padding: 1em 1.5em;
  margin: 0.75em 0;
}
.cal-entry h4 { margin: 0 0 0.5em 0; }
.cal-meta { color: var(--md-default-fg-color--light); font-size: 0.9em; margin-bottom: 0.5em; }
.cal-roles { display: inline-block; }
.cal-role {
  display: inline-block;
  background: var(--md-primary-fg-color);
  color: white;
  padding: 0.15em 0.5em;
  border-radius: 3px;
  font-size: 0.8em;
  margin: 0.15em 0.15em;
}
.cal-pop {
  display: inline-block;
  background: var(--md-accent-fg-color);
  color: white;
  padding: 0.15em 0.5em;
  border-radius: 3px;
  font-size: 0.8em;
  margin: 0.15em 0.15em;
}
</style>

<script>
var calendarData = [
  {week:1,month:"January",obs:"National Birth Defects Prevention Month",action:"Folic acid messaging; prenatal referrals",roles:"PHN MCH HED",pop:"PRG"},
  {week:2,month:"January",obs:"Cervical Cancer Awareness Month",action:"Pap test reminders; HPV vaccine push",roles:"PHN HED HCS",pop:"BLK HIS"},
  {week:3,month:"January",obs:"National Mentoring Month",action:"Youth health mentoring; school partnerships",roles:"SHC HED CHW",pop:"CHD"},
  {week:4,month:"January",obs:"MLK Day of Service",action:"Community health event; health equity messaging",roles:"CES CHW HCS",pop:"BLK"},
  {week:5,month:"February",obs:"American Heart Month",action:"BP screening events; heart health education",roles:"PHN CHW HED",pop:"BLK OAD"},
  {week:6,month:"February",obs:"National Black HIV/AIDS Awareness Day (Feb 7)",action:"HIV testing events; PrEP outreach",roles:"DIS PHN CHW",pop:"BLK"},
  {week:7,month:"February",obs:"National Eating Disorders Awareness Week",action:"Screening; resource distribution",roles:"BHC HED NUT",pop:"CHD COL"},
  {week:8,month:"February",obs:"Teen Dating Violence Awareness Month",action:"School presentations; safety planning",roles:"SHC BHC HED",pop:"CHD"},
  {week:9,month:"March",obs:"National Nutrition Month",action:"Cooking demos; WIC enrollment push",roles:"NUT CHW HED",pop:"LIW HIS"},
  {week:10,month:"March",obs:"National Drug & Alcohol Facts Week",action:"Youth prevention education",roles:"SUP SHC HED",pop:"CHD"},
  {week:11,month:"March",obs:"World TB Day (Mar 24)",action:"TB awareness; screening reminders",roles:"DIS PHN EPI",pop:"IMM"},
  {week:12,month:"March",obs:"National Poison Prevention Week",action:"Child safety messaging; lead screening",roles:"EHS PHN HED",pop:"CHD"},
  {week:13,month:"April",obs:"National Minority Health Month",action:"Health equity data release; community forums",roles:"CES EPI HCS",pop:"BLK HIS NAT API"},
  {week:14,month:"April",obs:"Black Maternal Health Week (Apr 11-17)",action:"Doula promotion; maternal health campaign",roles:"MCH CHW CES",pop:"BLK PRG"},
  {week:15,month:"April",obs:"National Public Health Week",action:"Staff recognition; community awareness",roles:"HDO HCS ALL",pop:"ALL"},
  {week:16,month:"April",obs:"STD Awareness Month",action:"Free STI testing events",roles:"DIS PHN CHW",pop:"PWUD LGBT"},
  {week:17,month:"May",obs:"Mental Health Awareness Month",action:"988 promotion; stigma reduction campaign",roles:"BHC HCS HED",pop:"MHC"},
  {week:18,month:"May",obs:"National Women's Health Week",action:"Women's health screenings; resource fairs",roles:"PHN MCH CHW",pop:"PRG"},
  {week:19,month:"May",obs:"Hepatitis Awareness Month",action:"Hep B/C testing; immigrant health screening",roles:"PHN DIS CHW",pop:"IMM PWUD"},
  {week:20,month:"May",obs:"Global Health and Fitness Day",action:"Community wellness events; walking groups",roles:"HED CES CHW",pop:"ALL"},
  {week:21,month:"June",obs:"National Safety Month",action:"Injury prevention; car seat checks; water safety",roles:"EHS PHN SHC",pop:"CHD"},
  {week:22,month:"June",obs:"LGBTQ+ Pride Month",action:"Affirming care promotion; resource distribution",roles:"BHC CHW CES",pop:"LGBT"},
  {week:23,month:"June",obs:"Men's Health Month",action:"Prostate/colon screening; mental health for men",roles:"PHN HED BHC",pop:"BLK VET"},
  {week:24,month:"June",obs:"Juneteenth",action:"Community celebration; health equity focus",roles:"CES CHW HCS",pop:"BLK"},
  {week:25,month:"July",obs:"UV Safety Month; Fireworks Safety",action:"Skin cancer prevention; injury prevention",roles:"EHS HED PHN",pop:"ALL RUR"},
  {week:26,month:"July",obs:"National Minority Mental Health Awareness Month",action:"Culturally responsive MH outreach",roles:"BHC CES CHW",pop:"BLK HIS NAT"},
  {week:27,month:"July",obs:"World Hepatitis Day (Jul 28)",action:"Testing events; treatment linkage",roles:"DIS PHN CHW",pop:"PWUD IMM"},
  {week:28,month:"July",obs:"Back-to-School Prep Begins",action:"Immunization catch-up clinics; school supply drives",roles:"PHN SHC CHW",pop:"CHD LIW"},
  {week:29,month:"August",obs:"National Immunization Awareness Month",action:"Vaccination campaigns; school compliance push",roles:"PHN SHC HCS",pop:"CHD"},
  {week:30,month:"August",obs:"National Breastfeeding Month",action:"Lactation support; WIC enrollment",roles:"NUT MCH PHN",pop:"PRG"},
  {week:31,month:"August",obs:"Overdose Awareness Day (Aug 31)",action:"Naloxone distribution; memorial events",roles:"SUP CHW BHC",pop:"PWUD"},
  {week:32,month:"August",obs:"Back to School",action:"School screenings; immunization clinics; health kits",roles:"SHC PHN CHW",pop:"CHD"},
  {week:33,month:"September",obs:"Suicide Prevention Month",action:"988 campaign; gatekeeper training; safe messaging",roles:"BHC SHC HCS",pop:"MHC CHD VET"},
  {week:34,month:"September",obs:"National Recovery Month",action:"Recovery celebration; treatment access promotion",roles:"SUP BHC CES",pop:"PWUD"},
  {week:35,month:"September",obs:"National Preparedness Month",action:"Emergency preparedness education; supply kits",roles:"EPC HCS HED",pop:"ALL RUR"},
  {week:36,month:"September",obs:"Childhood Obesity Awareness Month",action:"Active living campaign; school nutrition",roles:"NUT SHC HED",pop:"CHD"},
  {week:37,month:"October",obs:"Breast Cancer Awareness Month",action:"Mammography events; Show-Me Healthy Women",roles:"PHN HCS CHW",pop:"BLK LIW"},
  {week:38,month:"October",obs:"Health Literacy Month",action:"Plain language audit; patient education materials",roles:"HED HCS CHW",pop:"LEP LIW"},
  {week:39,month:"October",obs:"Lead Poisoning Prevention Week",action:"Blood lead testing; housing inspection push",roles:"EHS PHN CHW",pop:"CHD BLK"},
  {week:40,month:"October",obs:"National Domestic Violence Awareness Month",action:"DV resources; safety planning; staff training",roles:"BHC PHN CES",pop:"PRG"},
  {week:41,month:"November",obs:"National Diabetes Month",action:"A1c screening; DPP enrollment; cooking classes",roles:"PHN NUT HED CHW",pop:"BLK HIS NAT OAD"},
  {week:42,month:"November",obs:"Prematurity Awareness Month",action:"Birth equity campaign; NICU family support",roles:"MCH PHN CHW",pop:"BLK PRG"},
  {week:43,month:"November",obs:"Great American Smokeout (3rd Thursday)",action:"Quitline promotion; cessation events",roles:"HED HCS PHN",pop:"ALL"},
  {week:44,month:"November",obs:"Native American Heritage Month",action:"Tribal health partnership; cultural events",roles:"CES CHW PHN",pop:"NAT"},
  {week:45,month:"December",obs:"World AIDS Day (Dec 1)",action:"HIV testing; treatment awareness; stigma reduction",roles:"DIS PHN CHW HCS",pop:"BLK LGBT PWUD"},
  {week:46,month:"December",obs:"Holiday Season",action:"Food drives; winter resource connections; isolation outreach",roles:"CHW CES NUT",pop:"HML OAD LIW"},
  {week:47,month:"December",obs:"Flu Season Peak",action:"Flu vaccine push; respiratory illness education",roles:"PHN SHC HCS",pop:"OAD CHD"},
  {week:48,month:"December",obs:"Year-End Reporting",action:"Annual reports; grant closeouts; data summaries",roles:"DAT PMG QIC HDO",pop:"N/A"},
  {week:49,month:"Year-Round",obs:"SDOH Screening",action:"Continuous screening at all encounters",roles:"CHW PHN ALL",pop:"ALL"},
  {week:50,month:"Year-Round",obs:"Community Advisory Board",action:"Monthly meetings; community engagement",roles:"CES HDO",pop:"ALL"},
  {week:51,month:"Year-Round",obs:"Quality Improvement",action:"Quarterly PDSA cycles; performance monitoring",roles:"QIC PMG DAT",pop:"N/A"},
  {week:52,month:"Year-Round",obs:"Workforce Development",action:"Training; CE; pipeline programs; retention",roles:"HDO PMG HED",pop:"N/A"}
];

function filterCalendar() {
  var month = document.getElementById('month-filter').value;
  var role = document.getElementById('role-filter').value;

  var filtered = calendarData.filter(function(e) {
    var monthMatch = !month || e.month === month;
    var roleMatch = !role || e.roles.indexOf(role) !== -1;
    return monthMatch && roleMatch;
  });

  document.getElementById('calendar-count').textContent =
    'Showing ' + filtered.length + ' of ' + calendarData.length + ' entries';

  var html = '';
  filtered.forEach(function(e) {
    var rolesBadges = e.roles.split(' ').map(function(r) {
      return '<span class="cal-role">' + r + '</span>';
    }).join(' ');
    var popBadges = e.pop.split(' ').map(function(p) {
      return '<span class="cal-pop">' + p + '</span>';
    }).join(' ');

    html += '<div class="cal-entry">' +
      '<h4>' + e.obs + '</h4>' +
      '<div class="cal-meta">Week ' + e.week + ' — ' + e.month + '</div>' +
      '<p><strong>Actions:</strong> ' + e.action + '</p>' +
      '<p><strong>Roles:</strong> ' + rolesBadges + '</p>' +
      '<p><strong>Populations:</strong> ' + popBadges + '</p>' +
      '</div>';
  });

  document.getElementById('calendar-entries').innerHTML = html || '<p>No entries match your filters.</p>';
}

// Initialize
filterCalendar();
</script>
