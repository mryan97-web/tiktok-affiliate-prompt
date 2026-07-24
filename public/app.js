/* Prompt Database System — All FASE 1-6 */
/* Navigasi modul + Utility */

// ===== SWITCH PANEL =====
function switchPanel(panelId) {
  document.querySelectorAll('.fase-tab').forEach(t => t.classList.remove('active'));
  const tab = document.querySelector(`.fase-tab[data-panel="${panelId}"]`);
  if (tab) tab.classList.add('active');

  document.querySelectorAll('.panel-group').forEach(p => p.classList.remove('active-panel'));
  const panel = document.querySelector(`.panel-group[data-panel="${panelId}"]`);
  if (panel) panel.classList.add('active-panel');

  const firstModule = document.querySelector(`.panel-group[data-panel="${panelId}"] .modul-card:not(.disabled)`);
  if (firstModule && firstModule.dataset.module) {
    showModule(firstModule.dataset.module);
  }

  const labels = {
    fase1: 'FASE 1 — Fondasi Prompt Database',
    fase2: 'FASE 2 — Visual Engine',
    fase3: 'FASE 3 — Marketing Engine',
    fase4: 'FASE 4 — Scene Engine',
    fase5: 'FASE 5 — Brand & Product Engine',
    fase6: 'FASE 6 — Automation Engine',
  };
  const subs = {
    fase1: 'Character DNA · Identity Lock · Prompt Assembly',
    fase2: 'Camera · Lens · Lighting · Color · Composition · Quality · Consistency · Presets',
    fase3: 'Role · Personality · Interaction · Presentation · Gesture · Expression · Body Language · Psychology · Trust · TikTok · Conversion · CTA · Shop · Social · Consistency',
    fase4: 'Scene Library · Default Store · Store Environment · Activity · Product Interaction · Customer Scene · Product Category · Time · Mood · Seasonal · Variation · Props · Consistency · Templates · Output',
    fase5: 'Brand Identity · Product Database · Product Display · Hierarchy · Placement · Banner · Typography · Color System · Campaign · Social Commerce · CTA · Consistency · Templates · Output',
    fase6: 'Assembly Engine · Request Analyzer · Module Selector · Priority Engine · Conflict Detector · Optimizer · Enhancer · Negative Builder · Validator · Default Engine · Multi Platform · Template Engine · Formatter · Automation Rules · Workflow Engine · Output',
  };
  document.getElementById('infoBar').querySelector('strong').textContent = labels[panelId] || panelId;
  document.getElementById('infoText').textContent = subs[panelId] || '';
}

// ===== SHOW MODULE =====
function showModule(mod) {
  document.querySelectorAll('.modul-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll(`.modul-card[data-module="${mod}"]`).forEach(c => c.classList.add('active'));

  document.querySelectorAll('.doc-view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById('view-' + mod);
  if (view) view.classList.add('active');

  const names = {
    // FASE 1
    dna: 'MODUL 1 — Character DNA',
    lock: 'MODUL 2 — Identity Lock',
    assembly: 'MODUL 3 — Prompt Assembly',
    // FASE 2
    camera: 'MODUL 4 — Camera Engine',
    lens: 'MODUL 5 — Lens Engine',
    lighting: 'MODUL 6 — Lighting Engine',
    color: 'MODUL 7 — Color Grading Engine',
    composition: 'MODUL 8 — Composition Engine',
    quality: 'MODUL 9 — Image Quality Engine',
    consistency: 'MODUL 10 — Visual Consistency Rules',
    presets: 'MODUL 11 — Visual Presets',
    // FASE 3
    role: 'MODUL 12 — Role Engine',
    personality: 'MODUL 13 — Sales Personality Engine',
    interaction: 'MODUL 14 — Customer Interaction Engine',
    presentation: 'MODUL 15 — Product Presentation Engine',
    gesture: 'MODUL 16 — Hand Gesture Engine',
    expression: 'MODUL 17 — Facial Expression Engine',
    bodylang: 'MODUL 18 — Body Language Engine',
    psychology: 'MODUL 19 — Sales Psychology Engine',
    trust: 'MODUL 20 — Trust Engine',
    tiktok: 'MODUL 21 — TikTok Affiliate Engine',
    conversion: 'MODUL 22 — Conversion Engine',
    cta: 'MODUL 23 — Call To Action Engine',
    shop: 'MODUL 24 — Shop Environment Experience',
    social: 'MODUL 25 — Social Commerce Style',
    mconsistency: 'MODUL 26 — Marketing Consistency Rules',
    // FASE 4
    scene: 'MODUL 27 — Scene Library',
    defaultScene: 'MODUL 28 — Default Store Scene',
    environment: 'MODUL 29 — Store Environment Engine',
    activity: 'MODUL 30 — Activity Engine',
    productInt: 'MODUL 31 — Product Interaction Engine',
    customerScene: 'MODUL 32 — Customer Scene Engine',
    category: 'MODUL 33 — Product Category Engine',
    time: 'MODUL 34 — Time Engine',
    mood: 'MODUL 35 — Mood Engine',
    seasonal: 'MODUL 36 — Seasonal Engine',
    variation: 'MODUL 37 — Scene Variation Engine',
    props: 'MODUL 38 — Props Engine',
    sceneConsistency: 'MODUL 39 — Scene Consistency Rules',
    templates: 'MODUL 40 — Scene Template Library',
    outputEngine: 'MODUL 41 — Output Engine',
    // FASE 5
    brand: 'MODUL 42 — Brand Identity Engine',
    productDB: 'MODUL 43 — Product Database Engine',
    productDisplay: 'MODUL 44 — Product Display Engine',
    hierarchy: 'MODUL 45 — Product Hierarchy Engine',
    placement: 'MODUL 46 — Product Placement Engine',
    banner: 'MODUL 47 — Promotional Banner Engine',
    typography: 'MODUL 48 — Typography Engine',
    colorSystem: 'MODUL 49 — Color System Engine',
    campaign: 'MODUL 50 — Campaign Engine',
    socialCommerce: 'MODUL 51 — Social Commerce Engine',
    ctaEngine: 'MODUL 52 — CTA Engine',
    brandConsistency: 'MODUL 53 — Brand Consistency Rules',
    productTemplates: 'MODUL 54 — Product Template Library',
    brandOutput: 'MODUL 55 — Output Engine',
    // FASE 6
    assemblyEngine: 'MODUL 56 — Prompt Assembly Engine',
    requestAnalyzer: 'MODUL 57 — Request Analyzer',
    moduleSelector: 'MODUL 58 — Module Selector',
    priorityEngine: 'MODUL 59 — Module Priority Engine',
    conflictDetector: 'MODUL 60 — Conflict Detector',
    promptOptimizer: 'MODUL 61 — Prompt Optimizer',
    promptEnhancer: 'MODUL 62 — Prompt Enhancer',
    negativeBuilder: 'MODUL 63 — Negative Prompt Builder',
    promptValidator: 'MODUL 64 — Prompt Validator',
    defaultEngine: 'MODUL 65 — Automatic Default Engine',
    multiPlatform: 'MODUL 66 — Multi Platform Engine',
    promptTemplateEngine: 'MODUL 67 — Prompt Template Engine',
    finalFormatter: 'MODUL 68 — Final Prompt Formatter',
    automationRules: 'MODUL 69 — Automation Rules',
    workflowEngine: 'MODUL 70 — Workflow Engine',
    automationOutput: 'MODUL 71 — Output Engine',
  };
  document.getElementById('docInfo').textContent = 'Menampilkan: ' + (names[mod] || mod);
}

// ===== COPY =====
function copyModule(mod) {
  const view = document.getElementById('view-' + mod);
  const text = view ? view.textContent.trim() : '';
  copyText(text);
}

function copyVisible() {
  const active = document.querySelector('.doc-view.active');
  const text = active ? active.textContent.trim() : '';
  copyText(text);
}

function copyText(text) {
  if (!text) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast('✅ Tersalin!')).catch(() => fallbackCopy(text));
  } else { fallbackCopy(text); }
}
function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
  document.body.appendChild(ta); ta.select(); document.execCommand('copy');
  document.body.removeChild(ta); showToast('✅ Tersalin!');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 2000);
}

// ===== INIT =====
showModule('assemblyEngine');
