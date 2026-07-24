/* Prompt Database System — FASE 1 + 2 */
/* Navigasi modul + Utility */

// ===== SWITCH PANEL =====
function switchPanel(panelId) {
  // Tab buttons
  document.querySelectorAll('.fase-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.fase-tab[data-panel="${panelId}"]`).classList.add('active');

  // Panel groups
  document.querySelectorAll('.panel-group').forEach(p => p.classList.remove('active-panel'));
  document.querySelector(`.panel-group[data-panel="${panelId}"]`).classList.add('active-panel');

  // Show first module in that panel
  const firstModule = document.querySelector(`.panel-group[data-panel="${panelId}"] .modul-card:not(.disabled)`);
  if (firstModule && firstModule.dataset.module) {
    showModule(firstModule.dataset.module);
  }

  // Info bar
  const labels = {
    fase1: 'FASE 1 — Fondasi Prompt Database',
    fase2: 'FASE 2 — Visual Engine',
    fase3: 'FASE 3 (Coming Soon)',
    fase4: 'FASE 4 (Coming Soon)',
  };
  const subs = {
    fase1: 'Character DNA · Identity Lock · Prompt Assembly',
    fase2: 'Camera · Lens · Lighting · Color Grading · Composition · Image Quality · Consistency · Presets',
  };
  document.getElementById('infoBar').querySelector('strong').textContent = labels[panelId] || panelId;
  document.getElementById('infoText').textContent = subs[panelId] || '';
}

// ===== SHOW MODULE =====
function showModule(mod) {
  // Update cards
  document.querySelectorAll('.modul-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll(`.modul-card[data-module="${mod}"]`).forEach(c => c.classList.add('active'));

  // Update views
  document.querySelectorAll('.doc-view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById('view-' + mod);
  if (view) view.classList.add('active');

  // Update footer
  const names = {
    dna: 'MODUL 1 — Character DNA',
    lock: 'MODUL 2 — Identity Lock',
    assembly: 'MODUL 3 — Prompt Assembly',
    camera: 'MODUL 4 — Camera Engine',
    lens: 'MODUL 5 — Lens Engine',
    lighting: 'MODUL 6 — Lighting Engine',
    color: 'MODUL 7 — Color Grading Engine',
    composition: 'MODUL 8 — Composition Engine',
    quality: 'MODUL 9 — Image Quality Engine',
    consistency: 'MODUL 10 — Visual Consistency Rules',
    presets: 'MODUL 11 — Visual Presets',
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
showModule('dna');
