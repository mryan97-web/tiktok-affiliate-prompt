/* === Generator Prompt Model — AREKA Official Store === */
/* Master Character DNA v3.0 — Premium Parfum Theme */

const $ = id => document.getElementById(id);

const state = {
  masterModel: 'AREKA_GIRL_001 — Wanita Indonesia, 25 tahun, wajah oval lembut, kulit sawo matang hangat, mata almon cokelat gelap, alis rapi melengkung natural, hidung mancung proporsional, bibir pink natural, rambut hitam panjang lurus belah samping, tinggi 160 cm, body slim feminin, ekspresi hangat ramah profesional.',
  masterStudio: 'Scene: Luxury perfume boutique, glass display counter, warm wood shelves, warm LED lighting, neat arrangement of perfume bottles, bright premium interior. Lighting: Soft commercial lighting, warm store lighting, balanced exposure, soft shadows, luxury retail atmosphere. Camera: Portrait orientation 9:16, eye-level, 85mm portrait lens look, moderate depth of field, sharp facial focus, subject centered, upper body dominant, background slightly softened. Color Grading: Premium commercial photography, warm whites, natural skin, rich wood tones, clean blacks, soft highlights, realistic saturation. Image Quality: Photorealistic, commercial advertisement, luxury retail campaign, magazine quality, ultra detailed, natural skin, 8K appearance, high dynamic range.',
  masterBrand: 'Brand banner at bottom: rounded rectangle, height 8% of image, white background, black text, yellow shopping cart icon. Text: "AREKA OFFICIAL STORE 🛒 Cek Keranjang Kuning". Minimalist typography, premium appearance. Do not overlap the subject.',
  masterPose: 'Both hands holding perfume bottle at chest level, gentle presentation gesture, head slightly tilted, warm friendly smile',
  masterProduct: '',
};

// ===== POSE SUFFIX — detail bahasa Inggris untuk prompt =====
const POSE_SUFFIX = {
  'Holding perfume bottle in right hand, bottle label facing camera, left hand resting naturally on counter, looking toward camera with warm smile': 'The model stands behind a glass display counter, holding a perfume bottle in her right hand with the bottle label facing the camera, left hand resting naturally on the counter surface, looking directly toward the camera with a warm and inviting smile.',
  'Both hands holding perfume bottle at chest level, gentle presentation gesture, head slightly tilted, warm friendly smile': 'The model holds a perfume bottle with both hands at chest level in a gentle presenting gesture, head slightly tilted to the right, warm friendly smile directed at the camera, elegant and approachable posture.',
  'Spraying perfume on wrist, eyes looking down at wrist, subtle smile, elegant gesture': 'The model is spraying perfume on her inner wrist, eyes gently looking down at her wrist, subtle satisfied smile, elegant refined gesture, wearing the perfume bottle in one hand.',
  'Holding perfume bottle near face, eyes closed, enjoying the scent, peaceful expression, bottle angled to show label': 'The model holds the perfume bottle near her cheek, eyes closed peacefully, enjoying the fragrance with a serene expression, the bottle angled slightly outward to show the label clearly, soft natural pose.',
  'Standing beside display counter, one hand holding perfume, other hand gesturing toward products, professional consultant pose': 'The model stands beside a glass perfume display counter, one hand gracefully holding a perfume bottle, the other hand gesturing toward the array of products on the counter, professional beauty consultant posture, confident yet approachable.',
  'Talking to camera while holding perfume, host-like pose, holding bottle near shoulder level, natural smile': 'The model addresses the camera like a TikTok Live host, holding the perfume bottle near shoulder level, talking with natural hand gestures, warm energetic smile, engaging and charismatic presence.',
  'Holding two perfume bottles for comparison, looking at bottles with thoughtful expression, slightly angled body': 'The model holds two different perfume bottles, one in each hand, comparing them thoughtfully, gaze directed at the bottles with a contemplative expression, body slightly angled, professional stylist evaluating products.',
  'Packing perfume order, holding wrapped box, looking up at camera with pleasant surprise, customer service vibe': 'The model holds a wrapped perfume box ready for delivery, looking up at the camera with a pleasant surprised expression, warm customer service smile, hands gently holding the package, ready-to-ship presentation.',
};

// ===== PRODUCTS — Perfume Varian =====
const PRODUCTS = [
  { value: '', label: '— Pilih parfum —' },
  { value: 'AREKA Signature Eau de Parfum 50ml — botol kaca transparan dengan aksen emas, cairan bening, label putih dengan logo AREKA hitam', label: 'AREKA Signature EDP — Emas' },
  { value: 'AREKA Bloom Eau de Toilette 100ml — botol kaca pink pastel, tutup silver, label putih minimalis', label: 'AREKA Bloom EDT — Pink' },
  { value: 'AREKA Noir Eau de Parfum 50ml — botol kaca hitam pekat doff, aksen rose gold, label hitam dengan tulisan gold', label: 'AREKA Noir EDP — Hitam' },
  { value: 'AREKA Ocean Eau de Toilette 75ml — botol kaca biru gradient, tutup silver, label putih', label: 'AREKA Ocean EDT — Biru' },
  { value: 'AREKA Velvet Eau de Parfum 30ml — botol kaca ungu transparan, tutup gold, label krem', label: 'AREKA Velvet EDP — Ungu' },
  { value: 'AREKA Amber Eau de Parfum 100ml — botol kaca cokelat amber, tutup kayu, label krem vintage', label: 'AREKA Amber EDP — Cokelat' },
  { value: 'AREKA Rose Eau de Toilette 50ml — botol kaca bening dengan stiker bunga mawar, tutup rose gold', label: 'AREKA Rose EDT — Mawar' },
  { value: 'AREKA White Musk Eau de Parfum 75ml — botol putih susu doff, aksen chrome, label putih timbul', label: 'AREKA White Musk EDP — Putih' },
  { value: 'AREKA Leather Eau de Parfum 50ml — botol kotak hitam dengan sleeve kulit sintetis, label gold', label: 'AREKA Leather EDP — Kulit' },
  { value: 'AREKA Citrus Eau de Toilette 100ml — botol kaca kuning transparan, tutup putih, label warna cerah', label: 'AREKA Citrus EDT — Kuning' },
  { value: 'AREKA Oud Royale Eau de Parfum 30ml — botol kaca hitam hexagonal, aksen emas 24K, label eksklusif', label: 'AREKA Oud Royale EDP — Eksklusif' },
];

// ===== NEGATIVE PROMPT =====
const NEGATIVE_PROMPT = 'Different person, different face, different ethnicity, child, teenager, elderly, masculine appearance, heavy makeup, anime, cartoon, illustration, CGI, plastic skin, unnatural smile, crossed eyes, extra fingers, missing fingers, extra arms, extra legs, blur, noise, low resolution, watermark, logo, random text, poor anatomy, overexposed, underexposed, oversaturated, messy background, distorted perfume bottle, incorrect perspective, poor composition, unrealistic reflections.';

// ===== INIT: sync DOM → state =====
function initSync() {
  state.masterModel = $('masterModel').value;
  state.masterStudio = $('masterStudio').value;
  state.masterBrand = $('masterBrand').value;
  state.masterPose = $('masterPose').value;
  state.masterProduct = $('masterProduct').value;

  $('masterModel').addEventListener('input', () => { state.masterModel = $('masterModel').value; });
  $('masterStudio').addEventListener('input', () => { state.masterStudio = $('masterStudio').value; });
  $('masterBrand').addEventListener('input', () => { state.masterBrand = $('masterBrand').value; });
  $('masterPose').addEventListener('change', () => { state.masterPose = $('masterPose').value; });
  $('masterProduct').addEventListener('change', () => { state.masterProduct = $('masterProduct').value; });
}

// ===== BUILD PROMPT — 3 Layer LEGO =====
function buildFullPrompt() {
  const { masterModel, masterStudio, masterBrand, masterPose, masterProduct } = state;
  if (!masterProduct) return '';

  const poseDetail = POSE_SUFFIX[masterPose] || masterPose;

  // === LAYER 1: Character DNA ===
  const layerDNA = `[CHARACTER DNA — LOCKED]
${masterModel}`;

  // === LAYER 2: Style Engine ===
  const layerStyle = `[STYLE ENGINE — LOCKED]
${masterStudio}. Pose: ${poseDetail}. Product in frame: ${masterProduct}.`;

  // === LAYER 3: Brand Layer ===
  const layerBrand = `[BRAND LAYER — LOCKED]
${masterBrand}`;

  // === FULL IMAGE PROMPT (paragraf panjang — siap copy paste) ===
  const fullPrompt = `Photorealistic commercial portrait photo of an Indonesian female beauty consultant, 25 years old, soft oval face, warm light beige Indonesian skin complexion, medium almond-shaped dark brown eyes with warm friendly expression, soft natural arch dark brown eyebrows, straight nose bridge with rounded tip, natural pink medium fullness lips with defined cupid's bow showing a friendly warm smile, long straight natural black hair with soft side part, below shoulders, healthy shine. Slim feminine body type, 160 cm tall, elegant posture, relaxed shoulders, natural feminine proportions.

${poseDetail}

Holding a ${masterProduct}.

${masterStudio}

${masterBrand}

${NEGATIVE_PROMPT}`;

  return {
    fullPrompt,
    layerDNA,
    layerStyle,
    layerBrand,
    product: masterProduct,
    pose: masterPose,
  };
}

// ===== GENERATE =====
function generatePrompt() {
  const btn = $('btnGenerate');

  if (!state.masterProduct) {
    showToast('Pilih parfum dulu! 🌸');
    return;
  }

  btn.disabled = true;

  const result = buildFullPrompt();
  renderResult(result);

  showToast('Prompt parfum siap! ✅', 'success');
  btn.disabled = false;
}

// ===== RENDER =====
function renderResult(data) {
  const out = $('outputArea');
  const footer = $('outputFooter');
  const tokenCount = $('tokenCount');

  const full = data.fullPrompt || '';
  const layerDNA = data.layerDNA || '';
  const layerStyle = data.layerStyle || '';
  const layerBrand = data.layerBrand || '';
  const product = data.product || state.masterProduct;
  const pose = data.pose || state.masterPose;

  const productLabel = PRODUCTS.find(p => p.value === product)?.label || product;
  const poseLabel = [...document.getElementById('masterPose').options].find(o => o.value === pose)?.label || pose;

  let html = '';

  // Ringkasan
  html += `
    <div class="output-section">
      <div class="output-section-header">
        <span>📋 Ringkasan Rakitan</span>
      </div>
      <table class="output-summary-table">
        <tr><td>👩 Karakter</td><td>AREKA_GIRL_001</td></tr>
        <tr><td>🌸 Parfum</td><td>${escapeHtml(productLabel)}</td></tr>
        <tr><td>🧘 Pose</td><td>${escapeHtml(poseLabel)}</td></tr>
      </table>
      <div style="margin-top:10px;display:flex;gap:5px;flex-wrap:wrap;">
        <span class="layer-tag dna">🧬 Character DNA</span>
        <span class="layer-tag style">🎨 Style Engine</span>
        <span class="layer-tag brand">🏷️ Brand Layer</span>
      </div>
    </div>
  `;

  // FULL PROMPT (siap copy)
  html += `
    <div class="output-section">
      <div class="output-section-header">
        <span><span class="output-section-icon">📸</span> Full Prompt — Siap Copy</span>
        <button class="copy-btn" data-prompt="${escapeAttr(full)}">📋 Salin</button>
      </div>
      <div class="output-text">${escapeHtml(full)}</div>
      <div class="output-video-badges">
        <span>🌸 Midjourney</span>
        <span>🌺 Stable Diffusion</span>
        <span>✨ Dall-E</span>
        <span>🧠 Gemini Image</span>
        <span>🎨 Leonardo AI</span>
      </div>
    </div>
  `;

  // Layer 1: Character DNA
  html += `
    <div class="output-section">
      <div class="output-section-header">
        <span><span class="output-section-icon">🧬</span> Layer 1 — Character DNA</span>
        <button class="copy-btn" data-prompt="${escapeAttr(layerDNA)}">📋 Salin</button>
      </div>
      <div class="output-text">${escapeHtml(layerDNA)}</div>
      <div class="output-video-badges">
        <span>🔒 LOCKED - Tidak berubah</span>
      </div>
    </div>
  `;

  // Layer 2: Style Engine
  html += `
    <div class="output-section">
      <div class="output-section-header">
        <span><span class="output-section-icon">🎨</span> Layer 2 — Style Engine</span>
        <button class="copy-btn" data-prompt="${escapeAttr(layerStyle)}">📋 Salin</button>
      </div>
      <div class="output-text">${escapeHtml(layerStyle)}</div>
      <div class="output-video-badges">
        <span>🔒 LOCKED - Scene + Lighting + Camera + Grading</span>
      </div>
    </div>
  `;

  // Layer 3: Brand Layer
  html += `
    <div class="output-section">
      <div class="output-section-header">
        <span><span class="output-section-icon">🏷️</span> Layer 3 — Brand Layer</span>
        <button class="copy-btn" data-prompt="${escapeAttr(layerBrand)}">📋 Salin</button>
      </div>
      <div class="output-text">${escapeHtml(layerBrand)}</div>
      <div class="output-video-badges">
        <span>🔒 LOCKED - Banner AREKA Official Store</span>
      </div>
    </div>
  `;

  out.innerHTML = html;

  // Count tokens roughly
  const totalChars = full.length + layerDNA.length + layerStyle.length + layerBrand.length;
  tokenCount.textContent = `~${Math.round(totalChars / 4)} tokens | ${totalChars.toLocaleString()} karakter`;
  footer.classList.remove('hidden');
}

// ===== COPY ALL =====
function copyAll() {
  const sections = document.querySelectorAll('.output-section');
  let text = '';
  sections.forEach(sec => {
    const header = sec.querySelector('.output-section-header span');
    const content = sec.querySelector('.output-text');
    if (header && content) {
      text += '=== ' + header.textContent.trim() + ' ===\n\n' + content.textContent.trim() + '\n\n';
    }
  });
  copyText(text);
}

// ===== MANAGE PRODUCTS =====
function manageProducts() {
  const sel = $('masterProduct');
  const newLabel = prompt('Tambah varian parfum baru (contoh: AREKA Vanilla EDT 50ml — botol putih susu, label gold):');
  if (newLabel && newLabel.trim()) {
    const opt = document.createElement('option');
    opt.value = newLabel.trim();
    opt.textContent = newLabel.trim();
    sel.appendChild(opt);
    sel.value = newLabel.trim();
    state.masterProduct = newLabel.trim();
    showToast(`Parfum "${newLabel.trim()}" ditambahkan ✅`);
  }
}

// ===== MODEL SELECTOR =====
const modelSelect = $('modelSelect');
const modelStatus = $('modelStatus');
const MODEL_OPTIONS = [
  { value: 'gemini-3.5-flash-lite', label: '⚡ Gemini 3.5 Flash Lite', recommended: true },
  { value: 'gemini-3.5-flash', label: '✨ Gemini 3.5 Flash' },
  { value: 'gemini-2.5-flash', label: '🔥 Gemini 2.5 Flash' },
  { value: 'gemini-2.0-flash', label: '⚡ Gemini 2.0 Flash' },
  { value: 'gemini-2.0-flash-lite', label: '🪶 Gemini 2.0 Flash Lite' },
  { value: 'gemini-3-pro-preview', label: '🧪 Gemini 3 Pro Preview' },
  { value: 'gemini-3-flash-preview', label: '🧪 Gemini 3 Flash Preview' },
];

async function loadModels() {
  renderStaticModels();
}

function renderStaticModels() {
  modelSelect.innerHTML = '';
  MODEL_OPTIONS.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label + (opt.recommended ? ' ✅' : '');
    modelSelect.appendChild(option);
  });
  modelSelect.value = 'gemini-3.5-flash-lite';
  updateModelStatus({ status: 'active', pingStatus: 'active' });
}

function updateModelStatus(info) {
  const selected = modelSelect.value;
  const opt = MODEL_OPTIONS.find(o => o.value === selected);
  const label = opt ? opt.label : selected;
  if (!info) { modelStatus.innerHTML = `<span class="dot-active"></span> <span class="model-status-text">${selected} — Aktif</span>`; return; }
  let dot, text;
  if (info.status === 'active') { dot = '<span class="dot-active"></span>'; text = 'Aktif ✅ — Siap pakai'; }
  else if (info.status === 'quota_exhausted') { dot = '<span class="dot-warning"></span>'; text = 'Kuota harian habis ⏳'; }
  else { dot = '<span class="dot-offline"></span>'; text = 'Tidak tersedia ❌'; }
  modelStatus.innerHTML = `${dot} <span class="model-status-text">${label} — ${text}</span>`;
}

modelSelect.addEventListener('change', () => {
  fetch('/api/models').then(r => r.json()).then(data => {
    if (data.success) { updateModelStatus(data.models.find(m => m.id === modelSelect.value)); }
  }).catch(() => {});
});

// ===== COPY HELPER =====
function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => { showToast('✅ Copied!'); }).catch(() => fallbackCopy(text));
  } else { fallbackCopy(text); }
}
function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
  document.body.appendChild(ta); ta.select(); document.execCommand('copy');
  document.body.removeChild(ta); showToast('✅ Copied!');
}

// ===== TOAST =====
function showToast(msg, type) {
  const t = $('toast');
  t.textContent = msg;
  t.className = 'toast';
  if (type === 'error') t.style.borderColor = 'var(--danger)';
  else t.style.borderColor = 'var(--accent)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 3000);
}

// ===== CHECK API =====
async function checkAPI() {
  const status = $('apiStatus');
  try {
    const res = await fetch('/api/models');
    if (res.ok) { status.textContent = '🟢 Online'; status.className = 'api-status online'; }
    else { status.textContent = '🔴 Offline'; status.className = 'api-status offline'; }
  } catch {
    status.textContent = '🔴 Offline'; status.className = 'api-status offline';
  }
}

// ===== ESCAPE =====
function escapeHtml(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '&#10;');
}

// ===== CLIPBOARD via data-prompt =====
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.copy-btn');
  if (btn && btn.dataset.prompt) {
    copyText(btn.dataset.prompt);
  }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); generatePrompt(); }
  if (e.key === 'Escape') { $('loaderOverlay').classList.add('hidden'); }
});

// ===== INIT =====
initSync();
checkAPI();
loadModels();
