/* === Generator Prompt Model by Areka Official Store === */
/* LEGO Master Database System — karakter konsisten, tinggal ganti produk */

const $ = id => document.getElementById(id);

const state = {
  masterModel: 'Indonesian male, 22 years old, Southeast Asian, 172 cm, slim athletic body, neat side-part hairstyle, tan skin, clean-shaven',
  masterStudio: 'White cyclorama studio, softbox right and left, grey floor, soft diffused shadow',
  masterCamera: 'Camera directly behind, eye level, locked camera, 85mm lens, f/2.8, center composition, vertical 9:16',
  masterPose: 'One hand in pocket, relaxed',
  masterProduct: '',
};

const POSE_SUFFIX = {
  'Hands on hips, confident stance': 'The model stands with hands on hips, elbows slightly bent, fingers spread confidently, shoulders back.',
  'One hand in pocket, relaxed': 'The model stands with left hand casually in pocket, right hand relaxed at side, slight natural stance.',
  'Relaxed standing, arms at sides': 'The model stands naturally with arms relaxed at sides, weight shifted slightly to one leg for a natural look.',
  'Walking slowly forward': 'The model walks slowly forward toward camera with natural gait, slight arm swing, relaxed expression.',
  'Looking over shoulder back at camera': 'The model looks back over right shoulder toward camera, body slightly turned away, hand near pocket.',
  'Crossed arms, slight smirk': 'The model stands with arms crossed at chest, slight smirk, confident and relaxed upper body.',
  'Holding phone, looking down': 'The model holds smartphone in right hand at waist level, gaze directed down at phone screen.',
  'Adjusting collar, looking up': 'The model adjusts collar with right hand, chin slightly lifted, gaze directed slightly upward toward camera.',
};

const PRODUCTS = [
  { value: '', label: '— Pilih produk —' },
  { value: 'Black cotton oversized T-shirt', label: 'Kaos Oversized Hitam' },
  { value: 'Maroon cotton oversized T-shirt', label: 'Kaos Oversized Maroon' },
  { value: 'Cream cotton oversized T-shirt', label: 'Kaos Oversized Cream' },
  { value: 'White cotton oversized T-shirt', label: 'Kaos Oversized Putih' },
  { value: 'Navy blue cotton oversized T-shirt', label: 'Kaos Oversized Navy' },
  { value: 'Olive green cotton oversized T-shirt', label: 'Kaos Oversized Olive' },
  { value: 'Charcoal grey oversized hoodie', label: 'Hoodie Oversized Charcoal' },
  { value: 'Black oversized hoodie', label: 'Hoodie Oversized Hitam' },
  { value: 'Cream oversized hoodie', label: 'Hoodie Oversized Cream' },
  { value: 'Cargo pants black', label: 'Cargo Pants Hitam' },
  { value: 'Cargo pants army green', label: 'Cargo Pants Army Green' },
  { value: 'Blue straight jeans', label: 'Jeans Blue Straight' },
  { value: 'Black slim jeans', label: 'Jeans Black Slim' },
  { value: 'Grey sweatpants', label: 'Sweatpants Abu' },
  { value: 'Denim jacket', label: 'Denim Jacket' },
  { value: 'White sneakers', label: 'Sneakers Putih' },
];

// ===== INIT: sync DOM → state =====
function initSync() {
  state.masterModel = $('masterModel').value;
  state.masterStudio = $('masterStudio').value;
  state.masterCamera = $('masterCamera').value;
  state.masterPose = $('masterPose').value;
  state.masterProduct = $('masterProduct').value;

  $('masterModel').addEventListener('input', () => { state.masterModel = $('masterModel').value; });
  $('masterStudio').addEventListener('input', () => { state.masterStudio = $('masterStudio').value; });
  $('masterCamera').addEventListener('input', () => { state.masterCamera = $('masterCamera').value; });
  $('masterPose').addEventListener('change', () => { state.masterPose = $('masterPose').value; });
  $('masterProduct').addEventListener('change', () => { state.masterProduct = $('masterProduct').value; });
}

// ===== BUILD PROMPT (LEGO style) =====
function buildImagePrompt() {
  const { masterModel, masterStudio, masterCamera, masterPose, masterProduct } = state;
  if (!masterProduct) return '';

  const poseDetail = POSE_SUFFIX[masterPose] || '';
  const product = masterProduct;

  return [
    `A full-length portrait photo of a ${masterModel}.`,
    poseDetail,
    `Wearing: ${product}.`,
    `Studio: ${masterStudio}. Camera: ${masterCamera}.`,
    `Soft natural studio lighting, clean commercial fashion look, high detail, 4k, product photography style for TikTok shop.`
  ].join(' ');
}

function buildVideoPromptUniversal() {
  const { masterModel, masterStudio, masterCamera, masterPose, masterProduct } = state;
  if (!masterProduct) return '';

  const poseDesc = POSE_SUFFIX[masterPose] || masterPose;

  return [
    `Use the uploaded image as the first frame and visual reference.`,
    `Keep exactly the same model identity: ${masterModel}.`,
    `Keep exactly the same studio and lighting: ${masterStudio}.`,
    `Keep exactly the same camera and framing: ${masterCamera}.`,
    `Keep exactly the same pose: ${poseDesc}`,
    `The model wears: ${masterProduct}.`,
    `Only the clothing is different from the reference image. Everything else must remain identical.`,
    `Slow cinematic movement, soft focus breathing, 5 seconds, smooth loop, 9:16 vertical, TikTok format.`
  ].join('\n');
}

function buildVideoPromptVeo() {
  const { masterModel, masterStudio, masterCamera, masterPose, masterProduct } = state;
  if (!masterProduct) return '';

  const poseDesc = POSE_SUFFIX[masterPose] || masterPose;

  return [
    `Frame 0 (reference): uploaded image of Indonesian male model in ${masterProduct}.`,
    `Frame 1-24 (0-2s): ${poseDesc}. Camera locked at eye level, 85mm f/2.8, center composition. The model wears ${masterProduct} on a white cyclorama studio with softbox lighting.`,
    `Frame 25-48 (2-4s): slow subtle breathing motion — chest rises naturally, slight micro-movement in shoulders and arms.`,
    `Frame 49-60 (4-5s): hold pose with micro-expression — slight natural eye blink.`,
    `Consistent: same model, same studio, same lighting, same camera position, same framing. Only the ${masterProduct} remains as the product focus.`,
    `9:16 vertical, 5 seconds, loop-ready, photorealistic, studio product showcase style.`
  ].join('\n');
}

// ===== GENERATE =====
function generatePrompt() {
  const btn = $('btnGenerate');

  if (!state.masterProduct) {
    showToast('Pilih produk dulu!');
    return;
  }

  btn.disabled = true;

  // Buat semua prompt lokal (instant — no API needed)
  const imagePrompt = buildImagePrompt();
  const videoUniversal = buildVideoPromptUniversal();
  const videoVeo = buildVideoPromptVeo();

  renderResult({
    imagePrompt,
    videoUniversal,
    videoVeo,
    product: state.masterProduct,
    pose: state.masterPose,
    model: state.masterModel,
    raw: '',
    usage: {}
  });

  showToast('Prompt siap! ✅', 'success');
  btn.disabled = false;
}

// ===== RENDER =====
function renderResult(data) {
  const out = $('outputArea');
  const footer = $('outputFooter');
  const tokenCount = $('tokenCount');

  const imgPrompt = data.imagePrompt || '';
  const vidUniversal = data.videoUniversal || '';
  const vidVeo = data.videoVeo || '';
  const product = data.product || state.masterProduct;
  const pose = data.pose || state.masterPose;
  const model = data.model || state.masterModel;

  let html = '';

  // Summary table
  html += `
    <div class="output-section">
      <div class="output-section-header">
        <span>📋 Ringkasan Rakitan</span>
      </div>
      <table class="output-summary-table">
        <tr><td>Model</td><td>${escapeHtml(model)}</td></tr>
        <tr><td>Produk</td><td>${escapeHtml(product)}</td></tr>
        <tr><td>Pose</td><td>${escapeHtml(pose)}</td></tr>
      </table>
    </div>
  `;

  // Image prompt
  if (imgPrompt) {
    html += `
      <div class="output-section">
        <div class="output-section-header">
          <span><span class="output-section-icon">📸</span> Prompt Gambar</span>
          <button class="copy-btn" onclick="copyText(${JSON.stringify(imgPrompt)})">📋 Salin</button>
        </div>
        <div class="output-text">${escapeHtml(imgPrompt)}</div>
        <div class="output-video-badges">
          <span>🎨 Midjourney</span>
          <span>🖼️ Stable Diffusion</span>
          <span>🤖 Dall-E</span>
          <span>🧠 Gemini Image</span>
        </div>
      </div>
    `;
  }

  // Video universal
  if (vidUniversal) {
    html += `
      <div class="output-section">
        <div class="output-section-header">
          <span><span class="output-section-icon">🎬</span> Prompt Video — Universal</span>
          <button class="copy-btn" onclick="copyText(${JSON.stringify(vidUniversal)})">📋 Salin</button>
        </div>
        <div class="output-text">${escapeHtml(vidUniversal)}</div>
        <div class="output-video-badges">
          <span>🎬 Runway</span>
          <span>📽️ Kling</span>
          <span>✨ Pika</span>
          <span>🌟 Sora</span>
          <span>🧠 Gemini Video</span>
        </div>
      </div>
    `;
  }

  // Video Veo 3
  if (vidVeo) {
    html += `
      <div class="output-section">
        <div class="output-section-header">
          <span><span class="output-section-icon">🎥</span> Prompt Video — Gemini & Veo 3</span>
          <button class="copy-btn" onclick="copyText(${JSON.stringify(vidVeo)})">📋 Salin</button>
        </div>
        <div class="output-text">${escapeHtml(vidVeo)}</div>
        <div class="output-video-badges">
          <span>🎥 Veo 3</span>
          <span>🧠 Gemini Video</span>
        </div>
      </div>
    `;
  }

  // Raw
  if (data.raw) {
    html += `
      <div class="output-section">
        <div class="output-section-header">
          <span>📄 Response Mentah</span>
        </div>
        <div class="output-text" style="font-size:11px;color:var(--text-muted);max-height:200px;overflow-y:auto;">${escapeHtml(data.raw)}</div>
      </div>
    `;
  }

  out.innerHTML = html;

  if (data.usage && data.usage.promptTokenCount) {
    tokenCount.textContent = `Tokens: ${data.usage.promptTokenCount || '?'} in → ${data.usage.candidatesTokenCount || '?'} out`;
  } else {
    tokenCount.textContent = 'Tokens: N/A (local build)';
  }
  footer.classList.remove('hidden');
}

// ===== COPY ALL =====
function copyAll() {
  const parts = [];
  const sections = document.querySelectorAll('.output-section');
  sections.forEach(sec => {
    const header = sec.querySelector('.output-section-header span');
    const text = sec.querySelector('.output-text');
    if (header && text) {
      parts.push(header.textContent.trim() + '\n' + text.textContent.trim());
    }
  });
  const full = parts.join('\n\n---\n\n');
  copyText(full);
}

// ===== MANAGE PRODUCTS =====
function manageProducts() {
  const sel = $('masterProduct');
  const currentVal = sel.value;
  const newLabel = prompt('Tambah produk baru (contoh: Pink oversized T-shirt):');
  if (newLabel && newLabel.trim()) {
    const opt = document.createElement('option');
    opt.value = newLabel.trim();
    opt.textContent = newLabel.trim();
    sel.appendChild(opt);
    sel.value = newLabel.trim();
    state.masterProduct = newLabel.trim();
    showToast(`Produk "${newLabel.trim()}" ditambahkan ✅`);
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
  // Skip API check — render all models as active immediately
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

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); generatePrompt(); }
  if (e.key === 'Escape') { $('loaderOverlay').classList.add('hidden'); }
});

// ===== INIT =====
initSync();
checkAPI();
loadModels();
