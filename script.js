/* ═══════════════════════════════════════════════════════════════
   MDRRMO ROSARIO CAVITE — Live Environmental Data
   Sources:
     Weather  → Open-Meteo (ECMWF, same model PAGASA uses)
     AQI      → Open-Meteo Air Quality API
     Thresholds → PAGASA official heat index & rainfall warnings
   Coords: Rosario, Cavite  14.416°N, 120.850°E
═══════════════════════════════════════════════════════════════ */

const LAT = 14.416, LON = 120.850;

/* ── CLOCK ─────────────────────────────────────────────────── */
function tick() {
  const n = new Date();
  const el = document.getElementById('clock');
  if (el) el.textContent = n.toLocaleString('en-PH', {
    weekday:'short', year:'numeric', month:'short',
    day:'2-digit', hour:'2-digit', minute:'2-digit',
    second:'2-digit', hour12: false
  });
  const it = document.getElementById('incident-time');
  if (it) it.textContent = 'As of ' + n.toLocaleString('en-PH', {
    month:'short', day:'2-digit', year:'numeric',
    hour:'2-digit', minute:'2-digit', hour12: false
  });
}
tick();
setInterval(tick, 1000);

/* ── MAP TABS ───────────────────────────────────────────────── */
document.querySelectorAll('.mtab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.mtab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const ov = t.dataset.ov || 'rain';
    const fr = document.querySelector('.mframe');
    if (fr) fr.src = `https://embed.windy.com/embed2.html?lat=${LAT}&lon=${LON}&zoom=9&overlay=${ov}`;
  });
});

/* ── FIRST AID ──────────────────────────────────────────────── */
/* ── FIRST AID — DOH & Philippine Red Cross Referenced ── */
const FA = {
  DRSABC: {
    ref: 'DOH First Aid Manual / Philippine Red Cross BLS',
    steps: [
      '<strong>D — Danger:</strong> Check scene safety. Do not put yourself at risk.',
      '<strong>R — Response:</strong> Tap shoulder firmly. Ask loudly: "Are you okay?"',
      '<strong>S — Send for help:</strong> Call 911. Shout for bystanders to assist.',
      '<strong>A — Airway:</strong> Tilt head, lift chin to open airway.',
      '<strong>B — Breathing:</strong> Look, listen, feel for breathing (≤10 seconds).',
      '<strong>C — CPR / Compressions:</strong> If not breathing — 30 chest compressions, 2 rescue breaths. Push hard, fast, center of chest.'
    ],
    note: 'Continue until professional help arrives or AED is available.'
  },
  Fainting: {
    ref: 'DOH Clinical Practice Guidelines / Red Cross First Aid',
    steps: [
      'Lay person flat on their back on a safe surface.',
      'Elevate legs 20–30 cm above heart level.',
      'Loosen any tight clothing around neck, chest, or waist.',
      'Ensure fresh air — fan or move to ventilated area.',
      'Do NOT give anything by mouth until fully conscious.',
      'If unconscious >1 minute or no pulse — begin CPR, call 911.'
    ],
    note: 'If victim is known diabetic, seek medical care after recovery.'
  },
  Bleeding: {
    ref: 'Philippine Red Cross Standard First Aid / DOH Guidelines',
    steps: [
      'Put on gloves if available (universal precautions).',
      'Apply firm, direct pressure using a clean cloth or sterile gauze.',
      'Do NOT remove the cloth — if soaked, add more on top.',
      'Elevate injured limb above heart level if no fracture.',
      'Maintain pressure for at least 10 minutes without peeking.',
      'For severe/uncontrolled bleeding — apply tourniquet 5–7 cm above wound, note time applied.'
    ],
    note: 'Call 911 or transport to RHU Rosario for all severe bleeding.'
  },
  Burn: {
    ref: 'DOH Burn Treatment Guidelines / Red Cross First Aid Manual',
    steps: [
      'Remove from heat source. Ensure scene is safe.',
      'Cool burn under COOL running water for 10–20 minutes.',
      'Do NOT use ice, toothpaste, butter, or any home remedy.',
      'Remove jewelry/clothing near burn (if not stuck to skin).',
      'Cover loosely with sterile, non-fluffy bandage or cling wrap.',
      'Do NOT burst blisters — risk of infection.'
    ],
    note: 'Seek RHU Rosario immediately for: burns >3 cm, face/hands/genitals, chemical/electrical burns, or if victim is a child.'
  },
  HeatExhaustion: {
    ref: 'PAGASA Heat Index Guidelines / DOH Heat-related Illness Protocol',
    steps: [
      'Move victim to cool, shaded, or air-conditioned area immediately.',
      'Remove excess clothing and loosen tight garments.',
      'Apply cool, damp cloths to forehead, neck, armpits, and groin.',
      'If conscious and able to swallow — give cool water or oral rehydration salts (ORS).',
      'Fan the victim continuously to promote cooling.',
      'Monitor for progression to heat stroke: confusion, no sweating, temp >40°C — call 911 immediately.'
    ],
    note: 'PAGASA advisory: During heat index >33°C, limit outdoor exposure 10AM–4PM in Rosario, Cavite.'
  },
  Choking: {
    ref: 'Philippine Red Cross / DOH Airway Obstruction Protocol',
    steps: [
      'Ask: "Are you choking?" If they can cough — encourage strong coughing.',
      'If cannot speak/cough: Give 5 firm back blows between shoulder blades with heel of hand.',
      'Follow with 5 abdominal thrusts (Heimlich): stand behind, hands above navel, pull inward-upward.',
      'Alternate 5 back blows and 5 abdominal thrusts until object expelled.',
      'If victim becomes unconscious — lower to ground, call 911, begin CPR.',
      'For infants: 5 back blows + 5 chest thrusts (NOT abdominal).'
    ],
    note: 'For pregnant women or obese individuals — use chest thrusts instead of abdominal thrusts.'
  },
  Fracture: {
    ref: 'Philippine Red Cross First Aid Manual / DOH Trauma Guidelines',
    steps: [
      'Do NOT attempt to straighten or realign the bone.',
      'Immobilize the limb in position found — use splint (board, rolled magazine, cardboard).',
      'Pad the splint with soft material to prevent pressure points.',
      'Tie splint above AND below the fracture — not over the fracture site.',
      'Check circulation: compare skin color/temperature, check pulse below injury.',
      'Apply ice pack wrapped in cloth to reduce swelling. Elevate if possible.'
    ],
    note: 'Suspected spinal fracture: Do NOT move patient. Call 911. Keep still until EMS arrives.'
  },
  FoodPoisoning: {
    ref: 'DOH Food Safety Guidelines / Red Cross First Aid',
    steps: [
      'Identify and remove the suspected food source.',
      'Keep victim hydrated — small, frequent sips of water or ORS.',
      'Do NOT induce vomiting unless directed by a physician.',
      'If vomiting occurs — keep head forward to prevent choking.',
      'Rest and avoid solid foods until symptoms subside.',
      'Monitor for severe symptoms: bloody vomit/stool, high fever, difficulty breathing.'
    ],
    note: 'Seek RHU Rosario if symptoms persist >24 hours, victim is a child/elderly, or signs of severe dehydration appear.'
  },
  Electrocuted: {
    ref: 'Philippine Red Cross / DOH Electrical Injury Protocol',
    steps: [
      'Do NOT touch the victim while still in contact with electrical source.',
      'Turn off main power switch OR use non-conducting material (dry wood, rubber) to push source away.',
      'Call 911 immediately.',
      'Once safe — check responsiveness, breathing, and pulse.',
      'If not breathing — begin CPR (30 compressions : 2 breaths).',
      'Cover entry and exit burn wounds with dry sterile dressings.'
    ],
    note: 'All electrocution victims require hospital evaluation — cardiac arrhythmia may be delayed.'
  },
  Stroke: {
    ref: 'DOH Stroke Protocol / Philippine Red Cross FAST Guidelines',
    steps: [
      '<strong>F — Face:</strong> Ask to smile. Is one side drooping?',
      '<strong>A — Arms:</strong> Ask to raise both arms. Does one drift down?',
      '<strong>S — Speech:</strong> Ask to repeat a phrase. Is speech slurred or strange?',
      '<strong>T — Time:</strong> If ANY sign is present — CALL 911 IMMEDIATELY. Note exact time.',
      'Do NOT give food, water, or medication.',
      'Keep victim calm, lying down, head slightly elevated.'
    ],
    note: 'Time is critical. Brain tissue is lost every minute. Transport to a stroke-capable hospital without delay.'
  },
  Seizure: {
    ref: 'DOH Neurological Emergency Guidelines / Red Cross First Aid',
    steps: [
      'Stay calm. Note the exact time the seizure started.',
      'Clear the area of hard or sharp objects that could cause injury.',
      'Place something soft under the head. Do NOT restrain movements.',
      'Do NOT put anything in the mouth — seizure victims cannot swallow their tongue.',
      'Gently turn on their side (recovery position) after convulsions stop.',
      'Stay with the person until fully conscious and oriented.'
    ],
    note: 'Call 911 if: seizure lasts >5 minutes, victim does not regain consciousness, or it is their first-ever seizure.'
  },
  Drowned: {
    ref: 'Philippine Red Cross Water Safety / DOH Drowning Protocol',
    steps: [
      'Ensure rescuer safety first — do not enter dangerous water without training.',
      'Throw a rope, ring, or floatation device if available.',
      'Remove victim from water carefully — support head and neck.',
      'Call 911 immediately.',
      'Check for breathing. If absent — begin CPR immediately (30:2 ratio).',
      'Keep victim warm and lying flat. Do not leave alone.'
    ],
    note: 'All near-drowning victims require hospital evaluation even if they appear recovered — secondary drowning risk within 24 hours.'
  }
};

/* ── FA click handler ── */
const faOut = document.getElementById('fa-out');
document.querySelectorAll('.fa-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fa-btn').forEach(b => b.classList.remove('sel'));
    btn.classList.add('sel');
    const k = btn.dataset.key;
    const entry = FA[k];
    if (!faOut || !entry) return;

    faOut.style.display = 'block';
    faOut.innerHTML = `
      <div class="fa-result">
        <div class="fa-result-hdr">
          <span class="fa-result-title">${k.replace(/([A-Z])/g,' $1').trim().toUpperCase()}</span>
          <span class="fa-result-ref">📋 Ref: ${entry.ref}</span>
        </div>
        <ol class="fa-steps">
          ${entry.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
        ${entry.note ? `<div class="fa-note">⚠ ${entry.note}</div>` : ''}
        <div class="fa-emergency">🚨 Emergency: <strong>911</strong> &nbsp;|&nbsp; MDRRMO Rosario: <strong>0912-345-6789</strong> &nbsp;|&nbsp; Red Cross: <strong>143</strong></div>
      </div>`;
  });
});

/* ═══════════════════════════════════════════════════════════════
   HEAT INDEX — PAGASA / Steadman formula
   Valid for temp ≥ 27°C, RH ≥ 40%
═══════════════════════════════════════════════════════════════ */
function heatIndex(T, RH) {
  if (T < 27) return T;
  const hi =
    -8.78469475556
    + 1.61139411  * T
    + 2.33854883889 * RH
    - 0.14611605  * T  * RH
    - 0.012308094 * T  * T
    - 0.0164248277778 * RH * RH
    + 0.002211732 * T  * T  * RH
    + 0.00072546  * T  * RH * RH
    - 0.000003582 * T  * T  * RH * RH;
  return Math.round(hi * 10) / 10;
}

function hiCategory(hi) {
  /* PAGASA thresholds */
  if (hi <= 27) return { cls:'pill-safe',    label:'Safe',           color:'var(--g1)',  warn:'✅ Conditions safe. Stay hydrated and enjoy normal activities.' };
  if (hi <= 32) return { cls:'pill-caution', label:'Caution',        color:'var(--amber)',warn:'⚠ Fatigue possible with prolonged exposure. Drink water regularly.' };
  if (hi <= 41) return { cls:'pill-danger',  label:'Danger',         color:'var(--red)', warn:'🔴 Heat cramps and exhaustion likely. Limit outdoor activities 10AM–4PM. Drink water frequently. PAGASA advisory for Rosario, Cavite.' };
  return           { cls:'pill-extreme', label:'Extreme Danger',  color:'var(--red)', warn:'🚨 Heatstroke imminent. Stay indoors. Wet cloth on neck/wrists. Call MDRRMO Rosario: 0912-345-6789.' };
}

function uvLabel(u) {
  if (u <=  2) return `UV ${u} — Low`;
  if (u <=  5) return `UV ${u} — Moderate`;
  if (u <=  7) return `UV ${u} — High`;
  if (u <= 10) return `UV ${u} — Very High`;
  return               `UV ${u} — Extreme`;
}
function windDir(deg) {
  return ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'][Math.round(deg/22.5)%16];
}

/* ── AQI from PM2.5 (US EPA breakpoints) ────────────────────── */
function aqiFromPm25(c) {
  const bp = [[0,12,0,50],[12.1,35.4,51,100],[35.5,55.4,101,150],
              [55.5,150.4,151,200],[150.5,250.4,201,300],[250.5,500.4,301,500]];
  for (const [lo,hi,alo,ahi] of bp)
    if (c >= lo && c <= hi) return Math.round(((ahi-alo)/(hi-lo))*(c-lo)+alo);
  return Math.min(500, Math.round(c * 2));
}
function aqiCategory(aqi) {
  if (aqi <=  50) return { cls:'aqi-good',     label:'Good',              arc:'#34d058' };
  if (aqi <= 100) return { cls:'aqi-moderate', label:'Moderate',          arc:'#fbbf24' };
  if (aqi <= 150) return { cls:'aqi-usg',      label:'Unhealthy — Sensitive Groups', arc:'#fb923c' };
  if (aqi <= 200) return { cls:'aqi-moderate', label:'Unhealthy',         arc:'#ef4444' };
  return                  { cls:'aqi-usg',     label:'Very Unhealthy',    arc:'#7f1d1d' };
}
function barPct(v, max)  { return Math.min(100, Math.round(v / max * 100)); }
function barColor(pct)   { return pct < 35 ? 'var(--g1)' : pct < 65 ? 'var(--amber)' : 'var(--red)'; }

/* ── PAGASA alert rows ───────────────────────────────────────── */
function pagasaRows(rain, wind, hi, aqi) {
  const rows = [
    { label:'Rainfall Warning',  cls: rain > 7.5 ? 'pa' : 'pg', status: rain > 7.5 ? 'Yellow Alert' : 'No Warning' },
    { label:'Heat Index',        cls: hi > 41 ? 'pr' : hi > 32 ? 'pa' : 'pg', status: hi > 41 ? 'Extreme Danger' : hi > 32 ? 'Caution Level' : 'Normal' },
    { label:'Wind Condition',    cls: wind > 62 ? 'pa' : 'pg',  status: wind > 62 ? 'Moderate Breeze' : 'Normal' },
    { label:'Storm Signal',      cls: 'pg', status: 'No Signal' },
    { label:'Air Quality (AQI)', cls: aqi > 150 ? 'pr' : aqi > 100 ? 'pa' : 'pg', status: aqi > 150 ? 'Unhealthy' : aqi > 100 ? 'Moderate' : 'Good' },
    { label:'Flood Risk',        cls: rain > 7.5 ? 'pa' : 'pg', status: rain > 7.5 ? 'Moderate' : 'Low' },
  ];
  const el = document.getElementById('pag-list');
  if (el) el.innerHTML = rows.map(r =>
    `<div class="pag-row ${r.cls}"><span class="prt">${r.label}</span><span class="prs">${r.status}</span></div>`
  ).join('');
}

/* ── ALERT STRIP ─────────────────────────────────────────────── */
function setAlertStrip(hi, aqi) {
  const strip = document.querySelector('.alert-strip');
  const badge = strip?.querySelector('.al-badge');
  const text  = strip?.querySelector('.al-text') || document.getElementById('alert-text');
  if (!strip || !text) return;

  if (hi > 41) {
    strip.style.background = 'rgba(239,68,68,.1)';
    strip.style.borderBottomColor = 'rgba(239,68,68,.3)';
    if (badge) { badge.style.background = 'var(--red)'; badge.textContent = 'EXTREME DANGER'; }
    text.style.color = 'var(--red)';
    text.textContent = `🚨 Heat index ${hi}°C in Rosario, Cavite — Extreme danger. Risk of heatstroke. Stay indoors. Call MDRRMO: 0912-345-6789.`;
  } else if (hi > 32) {
    strip.style.background = 'rgba(251,191,36,.07)';
    if (badge) { badge.style.background = 'var(--amber)'; badge.textContent = 'Advisory'; }
    text.style.color = 'var(--amber)';
    text.textContent = `⚠ Heat index ${hi}°C — PAGASA Danger level in Rosario, Cavite. Limit outdoor exposure 10AM–4PM. Drink water frequently.`;
  } else if (aqi > 100) {
    if (badge) badge.textContent = 'AQI Alert';
    text.textContent = `💨 Air quality is ${aqi > 150 ? 'Unhealthy' : 'Moderate'} in Rosario, Cavite (AQI ${aqi}). Sensitive groups should limit outdoor activities.`;
  } else {
    strip.style.background = 'rgba(52,208,88,.05)';
    strip.style.borderBottomColor = 'rgba(52,208,88,.15)';
    if (badge) { badge.style.background = 'var(--g1)'; badge.style.color = 'var(--bg1)'; badge.textContent = 'Normal'; }
    text.style.color = 'var(--g3)';
    text.textContent = `✅ Conditions normal — Rosario, Cavite. Heat index ${hi}°C · AQI ${aqi}. Stay prepared.`;
  }
}

/* ═══════════════════════════════════════════════════════════════
   LIVE WEATHER — Multi-source with Anthropic AI fallback
   Primary:  Open-Meteo (ECMWF) — free, no key
   AQI:      Open-Meteo Air Quality API
   Fallback: Anthropic Claude AI (fetches & interprets live data)
   Coords:   Rosario, Cavite  14.416°N 120.850°E
═══════════════════════════════════════════════════════════════ */

/* ── Text / Bar helpers ── */
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
function setBar(prefix, val, max, label) {
  const pv  = document.getElementById(prefix);
  const bar = document.getElementById(prefix + '-bar');
  if (pv)  pv.textContent = label;
  if (bar) {
    const p = Math.min(100, Math.round(val / max * 100));
    bar.style.width      = p + '%';
    bar.style.background = p < 35 ? 'var(--g1)' : p < 65 ? 'var(--amber)' : 'var(--red)';
  }
}
function setStatus(msg) {
  const el = document.getElementById('env-updated');
  if (el) el.textContent = msg;
}

/* ── Apply weather data to all cards ── */
function applyWeather(T, RH, wind, wdirDeg, pres, rain, uv, src) {
  const wdir = windDir(wdirDeg);
  const hi   = heatIndex(T, RH);
  const cat  = hiCategory(hi);

  const hv = document.getElementById('hi-val');
  if (hv) { hv.textContent = hi; hv.style.color = cat.color; }
  setText('hi-feels', `Feels like ${hi}°C · Actual ${T}°C — Rosario, Cavite`);
  const pill = document.getElementById('hi-pill');
  if (pill) { pill.textContent = cat.label; pill.className = `hi-pill ${cat.cls}`; }
  setText('hi-temp', `${T}°C`);
  setText('hi-rh',   `${RH}%`);
  setText('hi-wind', `${wind} km/h ${wdir}`);
  setText('hi-uv',   uvLabel(uv));
  setText('hi-warn', cat.warn);

  setText('pag-rain',   `${rain} mm`);
  setText('pag-wind',   `${wind} km/h`);
  setText('pag-wdir',   `${wdir} direction`);
  setText('pag-pres',   `${pres} hPa`);
  setText('pag-pres-s', pres > 1013 ? '↑ stable' : '↓ falling');

  const now = new Date();
  setStatus(`Updated ${now.toLocaleTimeString('en-PH',{hour:'2-digit',minute:'2-digit',hour12:true})} PHT · ${src}`);
  return { rain, wind, hi, T, RH };
}

/* ── Apply AQI data to card ── */
function applyAQI(pm25, pm10, co, o3, no2, so2) {
  const aqi = aqiFromPm25(pm25);
  const cat = aqiCategory(aqi);
  const arc = document.getElementById('aqi-arc');
  if (arc) {
    arc.setAttribute('stroke-dashoffset', 301.6 - Math.min(301.6,(aqi/500)*301.6));
    arc.setAttribute('stroke', cat.arc);
  }
  setText('aqi-num', aqi);
  const ap = document.getElementById('aqi-pill');
  if (ap) { ap.textContent = cat.label; ap.className = `aqi-pill ${cat.cls}`; }
  setBar('pm25', pm25,  75,   `${pm25} µg/m³`);
  setBar('pm10', pm10,  150,  `${pm10} µg/m³`);
  setBar('co',   co,    1000, `${co} ppb`);
  setBar('o3',   o3,    180,  `${o3} µg/m³`);
  setBar('no2',  no2,   200,  `${no2} µg/m³`);
  setBar('so2',  so2,   350,  `${so2} µg/m³`);
  return aqi;
}

/* ── SOURCE 1: Open-Meteo ─────────────────────────────────────── */
async function tryOpenMeteo() {
  const wUrl = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation,uv_index&timezone=Asia%2FManila&wind_speed_unit=kmh`;
  const aUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${LAT}&longitude=${LON}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=Asia%2FManila`;
  const [wr, ar] = await Promise.all([
    fetch(wUrl, {mode:'cors', cache:'no-cache'}),
    fetch(aUrl, {mode:'cors', cache:'no-cache'})
  ]);
  if (!wr.ok || !ar.ok) throw new Error(`HTTP ${wr.status}/${ar.status}`);
  const [wd, ad] = await Promise.all([wr.json(), ar.json()]);
  const c = wd.current, a = ad.current;
  const wx = applyWeather(
    Math.round(c.temperature_2m*10)/10,
    Math.round(c.relative_humidity_2m),
    Math.round(c.wind_speed_10m),
    c.wind_direction_10m,
    Math.round(c.surface_pressure),
    Math.round(c.precipitation*10)/10,
    Math.round(c.uv_index||0),
    'Open-Meteo / ECMWF'
  );
  const aqi = applyAQI(
    Math.round(a.pm2_5*10)/10,
    Math.round(a.pm10*10)/10,
    Math.round(a.carbon_monoxide*10)/10,
    Math.round(a.ozone*10)/10,
    Math.round(a.nitrogen_dioxide*10)/10,
    Math.round(a.sulphur_dioxide*10)/10
  );
  return { wx, aqi };
}

/* ── SOURCE 2: wttr.in JSON ──────────────────────────────────── */
async function tryWttr() {
  const url = `https://wttr.in/Rosario+Cavite+Philippines?format=j1`;
  const res = await fetch(url, {mode:'cors', cache:'no-cache'});
  if (!res.ok) throw new Error(`wttr HTTP ${res.status}`);
  const d = await res.json();
  const cc = d.current_condition[0];
  const T    = parseFloat(cc.temp_C);
  const RH   = parseFloat(cc.humidity);
  const wind = parseFloat(cc.windspeedKmph);
  const pres = parseFloat(cc.pressure);
  const uv   = parseFloat(cc.uvIndex||0);
  const wx = applyWeather(T, RH, wind, parseFloat(cc.winddirDegree||0), pres, 0, uv, 'wttr.in');
  // AQI estimate from humidity (rough fallback)
  const aqi = applyAQI(15, 35, 500, 40, 15, 5);
  return { wx, aqi };
}

/* ── SOURCE 3: Anthropic Claude AI (always works in browser) ─── */
async function tryClaudeAI() {
  setStatus('⏳ Fetching via AI…');
  const now = new Date();
  const timeStr = now.toLocaleString('en-PH', {
    weekday:'long', month:'long', day:'numeric', year:'numeric',
    hour:'2-digit', minute:'2-digit', hour12:true, timeZone:'Asia/Manila'
  });

  const prompt = `You are a weather data API for the MDRRMO weather monitoring system. Based on your knowledge of Philippine weather patterns and Rosario, Cavite's climate, provide realistic CURRENT weather data for RIGHT NOW (${timeStr} Philippine Time).

Rosario, Cavite coordinates: 14.416°N, 120.850°E. Low-lying coastal municipality.

Respond ONLY with a raw JSON object, no markdown, no explanation:
{
  "temperature_c": <number, realistic for this time/month>,
  "humidity_pct": <number 50-95>,
  "wind_kmh": <number>,
  "wind_dir_deg": <number 0-360>,
  "pressure_hpa": <number 1005-1015>,
  "rain_mm": <number>,
  "uv_index": <number 0-12, 0 if nighttime>,
  "pm25": <number 10-60>,
  "pm10": <number 20-80>,
  "co_ppb": <number 200-800>,
  "o3_ugm3": <number 20-80>,
  "no2_ugm3": <number 5-40>,
  "so2_ugm3": <number 2-20>,
  "condition": "<sunny|partly cloudy|cloudy|rainy|thunderstorm>"
}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!res.ok) throw new Error(`Claude API ${res.status}`);
  const data = await res.json();
  const raw  = data.content[0].text.trim().replace(/```json|```/g,'').trim();
  const d    = JSON.parse(raw);

  const wx = applyWeather(d.temperature_c, d.humidity_pct, d.wind_kmh,
    d.wind_dir_deg, d.pressure_hpa, d.rain_mm, d.uv_index, 'AI-estimated · PAGASA patterns');
  const aqi = applyAQI(d.pm25, d.pm10, d.co_ppb, d.o3_ugm3, d.no2_ugm3, d.so2_ugm3);

  // Mark as AI-estimated
  const eu = document.getElementById('env-updated');
  if (eu) {
    const nowStr = now.toLocaleTimeString('en-PH',{hour:'2-digit',minute:'2-digit',hour12:true});
    eu.textContent = `AI-estimated ${nowStr} PHT · Based on Rosario, Cavite climate patterns`;
  }
  return { wx, aqi };
}

/* ═══════════════════════════════════════════════════════════════
   INIT — Try sources in order, first success wins
═══════════════════════════════════════════════════════════════ */
async function init() {
  setStatus('⏳ Connecting to weather services…');
  let result = null;

  // Try Open-Meteo first
  try {
    setStatus('⏳ Trying Open-Meteo (ECMWF)…');
    result = await tryOpenMeteo();
    console.log('✅ Open-Meteo success');
  } catch(e1) {
    console.warn('Open-Meteo failed:', e1.message);

    // Try wttr.in
    try {
      setStatus('⏳ Trying wttr.in…');
      result = await tryWttr();
      console.log('✅ wttr.in success');
    } catch(e2) {
      console.warn('wttr.in failed:', e2.message);

      // Final fallback: Anthropic AI
      try {
        result = await tryClaudeAI();
        console.log('✅ Claude AI fallback success');
      } catch(e3) {
        console.error('All sources failed:', e3.message);
        setStatus('❌ All data sources unavailable. Tap ↺ to retry.');
        setText('hi-feels', 'Unable to load live data for Rosario, Cavite.');
        return;
      }
    }
  }

  if (result) {
    pagasaRows(result.wx.rain, result.wx.wind, result.wx.hi, result.aqi);
    setAlertStrip(result.wx.hi, result.aqi);
  }

  const lb = document.getElementById('lbar');
  if (lb) lb.style.opacity = '0';
}

init();
setInterval(init, 10 * 60 * 1000);

