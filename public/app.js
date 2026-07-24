/* FASE 1 — Fondasi Prompt Database */
/* Pure dokumentasi — navigasi modul */

// ===== NAVIGASI =====
function showModule(mod) {
  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => {
    if (b.textContent.includes('Character') && mod === 'dna') b.classList.add('active');
    if (b.textContent.includes('Identity') && mod === 'lock') b.classList.add('active');
    if (b.textContent.includes('Prompt') && mod === 'assembly') b.classList.add('active');
  });

  // Update views
  document.querySelectorAll('.doc-view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + mod).classList.add('active');

  // Update left panel highlight
  document.querySelectorAll('.modul-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.modul-card[data-module="' + mod + '"]').forEach(c => c.classList.add('active'));

  // Update footer info
  const names = { dna: 'MODUL 1 — Character DNA', lock: 'MODUL 2 — Identity Lock', assembly: 'MODUL 3 — Prompt Assembly' };
  document.getElementById('docInfo').textContent = 'Menampilkan: ' + (names[mod] || mod);
}

// ===== KLIK KIRI =====
document.querySelectorAll('.modul-card').forEach(card => {
  card.addEventListener('click', function() {
    const mod = this.dataset.module;
    if (mod && !this.classList.contains('disabled')) showModule(mod);
  });
});

// ===== COPY MODUL =====
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

// ===== COPY =====
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

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 2000);
}

// ===== INIT =====
// Default view
showModule('dna');
