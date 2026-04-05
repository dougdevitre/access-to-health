# Interactive SDOH Quick Screen

> 5-question rapid triage tool for community outreach and home visits
> Based on validated instruments — see [full screener documentation](../features/sdoh-screener.md)

!!! note "This is a demonstration tool"
    This interactive screen is for training and familiarization. In practice, administer screenings in a private, confidential setting with appropriate framing. See `features/sdoh-screener.md` for full protocols.

---

## Screening Introduction Script

> "We ask everyone these questions because your health is affected by many things — not just medical care. Your answers help us connect you with resources in the community. Everything you share is confidential."

---

## The 5 Questions

<div id="sdoh-screen">

<div class="screening-question" id="q1-block">
<h3>Question 1: Basic Needs</h3>
<p><strong>In the past year, have you or your family ever had to go without food, heat, or a place to sleep?</strong></p>
<button class="md-button" onclick="answer('q1', true)">Yes</button>
<button class="md-button md-button--primary" onclick="answer('q1', false)">No</button>
<p id="q1-result" class="result-text"></p>
</div>

<div class="screening-question" id="q2-block">
<h3>Question 2: Transportation</h3>
<p><strong>Do you have trouble getting to medical appointments or the pharmacy?</strong></p>
<button class="md-button" onclick="answer('q2', true)">Yes</button>
<button class="md-button md-button--primary" onclick="answer('q2', false)">No</button>
<p id="q2-result" class="result-text"></p>
</div>

<div class="screening-question" id="q3-block">
<h3>Question 3: Medication Access</h3>
<p><strong>In the past year, have you been unable to get a medication or treatment that a doctor prescribed?</strong></p>
<button class="md-button" onclick="answer('q3', true)">Yes</button>
<button class="md-button md-button--primary" onclick="answer('q3', false)">No</button>
<p id="q3-result" class="result-text"></p>
</div>

<div class="screening-question" id="q4-block">
<h3>Question 4: Safety</h3>
<p><strong>Do you feel safe where you live?</strong></p>
<button class="md-button md-button--primary" onclick="answer('q4', false)">Yes — I feel safe</button>
<button class="md-button" onclick="answer('q4', true)">No — I do not feel safe</button>
<p id="q4-result" class="result-text"></p>
</div>

<div class="screening-question" id="q5-block">
<h3>Question 5: Mental Health</h3>
<p><strong>In the past 2 weeks, have you felt down, depressed, or hopeless?</strong></p>
<button class="md-button" onclick="answer('q5', true)">Yes</button>
<button class="md-button md-button--primary" onclick="answer('q5', false)">No</button>
<p id="q5-result" class="result-text"></p>
</div>

</div>

---

<div id="results-section" style="display:none;">

## Results

<div id="risk-summary"></div>

### Flagged Domains

<div id="flagged-domains"></div>

### Recommended Next Steps

<div id="recommendations"></div>

### Follow-Up Schedule

<div id="followup"></div>

<button class="md-button md-button--primary" onclick="resetScreen()" style="margin-top: 1em;">Start Over</button>

</div>

<style>
.screening-question {
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: 8px;
  padding: 1em 1.5em;
  margin: 1em 0;
}
.screening-question button {
  margin: 0.5em 0.5em 0 0;
}
.result-text {
  margin-top: 0.5em;
  font-weight: bold;
}
.risk-none { color: #4caf50; }
.risk-low { color: #8bc34a; }
.risk-moderate { color: #ff9800; }
.risk-high { color: #f44336; }
.risk-critical { color: #b71c1c; font-weight: bold; }
.domain-card {
  border-left: 4px solid var(--md-primary-fg-color);
  padding: 0.75em 1em;
  margin: 0.75em 0;
  background: var(--md-code-bg-color);
  border-radius: 0 4px 4px 0;
}
</style>

<script>
var responses = {};
var domainMap = {
  q1: { domain: 'Food / Housing / Utilities', severity: 'high', score: 2, tier: 'short_term',
        action: 'SNAP application assistance, food pantry referral, utility assistance (LIHEAP)' },
  q2: { domain: 'Transportation', severity: 'moderate', score: 1, tier: 'short_term',
        action: 'Medicaid NEMT, bus pass, volunteer driver program' },
  q3: { domain: 'Healthcare Access', severity: 'high', score: 2, tier: 'short_term',
        action: 'FQHC enrollment, prescription assistance programs, Medicaid/marketplace application' },
  q4: { domain: 'Safety', severity: 'critical', score: 3, tier: 'emergency',
        action: 'DV Hotline: 1-800-799-7233 (24/7). Safety planning. Legal aid referral.' },
  q5: { domain: 'Mental Health', severity: 'high', score: 2, tier: 'short_term',
        action: '988 Suicide & Crisis Lifeline (call or text). Behavioral health referral. Counseling.' }
};

function answer(qid, flagged) {
  responses[qid] = flagged;
  var el = document.getElementById(qid + '-result');
  if (flagged) {
    el.textContent = '⚠ Flagged — ' + domainMap[qid].domain;
    el.className = 'result-text risk-' + domainMap[qid].severity;
  } else {
    el.textContent = '✓ No concern identified';
    el.className = 'result-text risk-none';
  }
  // Disable buttons after answering
  var block = document.getElementById(qid + '-block');
  var buttons = block.querySelectorAll('button');
  buttons.forEach(function(b) { b.disabled = true; b.style.opacity = '0.5'; });

  if (Object.keys(responses).length === 5) {
    showResults();
  }
}

function showResults() {
  var totalScore = 0;
  var flagged = [];
  for (var qid in responses) {
    if (responses[qid]) {
      totalScore += domainMap[qid].score;
      flagged.push(domainMap[qid]);
    }
  }

  var riskLevel, riskClass, followDays;
  if (totalScore === 0) { riskLevel = 'None'; riskClass = 'risk-none'; followDays = 365; }
  else if (totalScore <= 3) { riskLevel = 'Low'; riskClass = 'risk-low'; followDays = 90; }
  else if (totalScore <= 7) { riskLevel = 'Moderate'; riskClass = 'risk-moderate'; followDays = 30; }
  else if (totalScore <= 12) { riskLevel = 'High'; riskClass = 'risk-high'; followDays = 7; }
  else { riskLevel = 'Critical'; riskClass = 'risk-critical'; followDays = 1; }

  document.getElementById('risk-summary').innerHTML =
    '<p>Risk Score: <strong>' + totalScore + '</strong> — ' +
    'Risk Level: <strong class="' + riskClass + '">' + riskLevel + '</strong></p>' +
    (totalScore >= 6 ? '<p><em>≥3 domains flagged — comprehensive PRAPARE screening recommended.</em></p>' : '');

  if (flagged.length === 0) {
    document.getElementById('flagged-domains').innerHTML =
      '<p class="risk-none">No SDOH needs identified at this time. Rescreen at next visit or in 12 months.</p>';
    document.getElementById('recommendations').innerHTML = '';
  } else {
    var domainsHtml = '';
    var recsHtml = '';
    flagged.forEach(function(d) {
      domainsHtml += '<div class="domain-card"><strong>' + d.domain +
        '</strong> — Severity: ' + d.severity + ' (score: ' + d.score + ')</div>';
      recsHtml += '<div class="domain-card"><strong>[' + d.tier.replace('_', '-') + '] ' +
        d.domain + '</strong><br/>' + d.action + '</div>';
    });
    document.getElementById('flagged-domains').innerHTML = domainsHtml;
    document.getElementById('recommendations').innerHTML = recsHtml;
  }

  document.getElementById('followup').innerHTML =
    '<p>Schedule follow-up in <strong>' + followDays + ' day' + (followDays !== 1 ? 's' : '') +
    '</strong> per risk level protocol.</p>';

  document.getElementById('results-section').style.display = 'block';
  document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
}

function resetScreen() {
  responses = {};
  ['q1','q2','q3','q4','q5'].forEach(function(qid) {
    document.getElementById(qid + '-result').textContent = '';
    document.getElementById(qid + '-result').className = 'result-text';
    var block = document.getElementById(qid + '-block');
    block.querySelectorAll('button').forEach(function(b) { b.disabled = false; b.style.opacity = '1'; });
  });
  document.getElementById('results-section').style.display = 'none';
  document.getElementById('sdoh-screen').scrollIntoView({ behavior: 'smooth' });
}
</script>
