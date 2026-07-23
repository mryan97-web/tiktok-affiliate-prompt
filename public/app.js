/* === TikTok Affiliate Prompt Generator — Frontend JS === */

const state = {
  imageData: null,
  mimeType: null,
  fileName: null,
  faceImageData: null,
  faceMimeType: null,
  faceFileName: null,
  loading: false,
  apiKey: null,
};

// ===== DOM REFS =====
const $ = id => document.getElementById(id);
const uploadZone = $('uploadZone');
const fileInput = $('fileInput');
const previewImage = $('previewImage');
const uploadPlaceholder = $('uploadPlaceholder');
const btnRemove = $('btnRemove');
const faceUploadZone = $('faceUploadZone');
const faceFileInput = $('faceFileInput');
const previewFace = $('previewFace');
const facePlaceholder = $('facePlaceholder');
const btnRemoveFace = $('btnRemoveFace');
const btnGenerate = $('btnGenerate');
const loaderOverlay = $('loaderOverlay');
const outputEmpty = $('outputEmpty');
const outputResult = $('outputResult');
const outputContent = $('outputContent');
const toast = $('toast');

// ===== CHECK API HEALTH =====
async function checkAPI() {
  const statusEl = $('apiStatus');
  statusEl.textContent = '⚪ Checking...';
  
  try {
    const res = await fetch('/api/generate', { method: 'OPTIONS' });
    if (res.ok || res.status === 405) {
      statusEl.textContent = '✅ API Ready';
      statusEl.className = 'api-status online';
      state.apiKey = 'configured';
    } else {
      statusEl.textContent = '⚠️ API Issue';
      statusEl.className = 'api-status';
    }
  } catch {
    statusEl.textContent = '🔴 API Offline';
    statusEl.className = 'api-status offline';
  }
}

// ===== MAIN IMAGE UPLOAD =====
uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) handleFile(e.target.files[0]);
});

function handleFile(file) {
  if (!file.type.match(/image\/(jpeg|png|webp)/)) {
    showToast('Format gambar harus JPG, PNG, atau WEBP', 'error');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast('File terlalu besar. Maks 10MB', 'error');
    return;
  }

  state.fileName = file.name;
  state.mimeType = file.type;

  const reader = new FileReader();
  reader.onload = (e) => {
    state.imageData = e.target.result.split(',')[1];
    previewImage.src = e.target.result;
    previewImage.classList.remove('hidden');
    uploadPlaceholder.classList.add('hidden');
    btnRemove.classList.remove('hidden');
    $('faceRefCard').classList.remove('hidden');
    btnGenerate.disabled = false;
    showToast('Gambar siap! ✅', 'success');
  };
  reader.readAsDataURL(file);
}

function removeImage() {
  state.imageData = null;
  state.mimeType = null;
  state.fileName = null;
  previewImage.classList.add('hidden');
  uploadPlaceholder.classList.remove('hidden');
  btnRemove.classList.add('hidden');
  fileInput.value = '';
  $('faceRefCard').classList.add('hidden');
  removeFaceImage();
  btnGenerate.disabled = true;
}

// ===== FACE REFERENCE UPLOAD =====
faceUploadZone.addEventListener('click', () => faceFileInput.click());

faceUploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  faceUploadZone.classList.add('dragover');
});

faceUploadZone.addEventListener('dragleave', () => {
  faceUploadZone.classList.remove('dragover');
});

faceUploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  faceUploadZone.classList.remove('dragover');
  if (e.dataTransfer.files.length > 0) handleFaceFile(e.dataTransfer.files[0]);
});

faceFileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) handleFaceFile(e.target.files[0]);
});

function handleFaceFile(file) {
  if (!file.type.match(/image\/(jpeg|png|webp)/)) {
    showToast('Format gambar harus JPG, PNG, atau WEBP', 'error');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast('File terlalu besar. Maks 10MB', 'error');
    return;
  }

  state.faceFileName = file.name;
  state.faceMimeType = file.type;

  const reader = new FileReader();
  reader.onload = (e) => {
    state.faceImageData = e.target.result.split(',')[1];
    previewFace.src = e.target.result;
    previewFace.classList.remove('hidden');
    facePlaceholder.classList.add('hidden');
    btnRemoveFace.classList.remove('hidden');
    showToast('Face reference siap! ✅', 'success');
  };
  reader.readAsDataURL(file);
}

function removeFaceImage() {
  state.faceImageData = null;
  state.faceMimeType = null;
  state.faceFileName = null;
  previewFace.classList.add('hidden');
  facePlaceholder.classList.remove('hidden');
  btnRemoveFace.classList.add('hidden');
  previewFace.src = '';
  faceFileInput.value = '';
}

// ===== DROPDOWN HELPERS =====
function getOptions() {
  const selectors = [
    'gender', 'ethnicity', 'age', 'bodyType', 'expression', 'pose',
    'shotType', 'cameraAngle', 'background', 'artStyle', 'lighting',
    'colorTone', 'aspectRatio', 'hairStyle', 'mood', 'clothing', 'accessories', 'hairColor'
  ];
  const options = {};
  selectors.forEach(id => {
    const val = $(id).value;
    if (val) options[id] = val;
  });
  const extra = $('extraDetails').value.trim();
  if (extra) options.extraDetails = extra;
  return options;
}

function resetAll() {
  document.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
  $('extraDetails').value = '';
  removeFaceImage();
  showToast('Semua opsi direset', 'success');
}

// ===== GENERATE PROMPT =====
async function generatePrompt() {
  if (!state.imageData) {
    showToast('Upload gambar dulu!', 'error');
    return;
  }

  if (btnGenerate.classList.contains('loading')) return;

  // Animate button
  btnGenerate.classList.add('loading');
  btnGenerate.innerHTML = `
    <div class="spinner" style="width:16px;height:16px;border-width:2px;"></div>
    Menganalisis...
  `;
  
  loaderOverlay.classList.remove('hidden');
  outputEmpty.classList.add('hidden');
  outputResult.classList.add('hidden');
  outputResult.innerHTML = '';

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: state.imageData,
        mimeType: state.mimeType,
        faceImage: state.faceImageData,
        faceMimeType: state.faceMimeType,
        options: getOptions(),
        model: $('modelSelect').value
      })
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'Gagal generate');
    }

    renderResult(data);
    showToast('Prompt berhasil di-generate! ✅', 'success');

  } catch (err) {
    showToast('Error: ' + err.message, 'error');
    outputEmpty.classList.remove('hidden');
  } finally {
    btnGenerate.classList.remove('loading');
    btnGenerate.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
      Generate Prompt
    `;
    loaderOverlay.classList.add('hidden');
  }
}

// ===== RENDER RESULT =====
function renderResult(data) {
  const prompt = data.prompt || {};
  const raw = data.raw || '';
  const breakdown = prompt.detail_prompt_breakdown || {};
  const mainPrompt = prompt.prompt_utama || '';

  let html = '';

  // Main prompt
  if (mainPrompt) {
    html += `<div class="prompt-main">${escapeHtml(mainPrompt)}</div>`;
  }

  // Map Indonesian snake_case -> display labels
  const sectionMap = [
    { key: 'gender_dan_demografi', label: '1. Gender & Demografi' },
    { key: 'ekspresi_wajah', label: '2. Ekspresi Wajah' },
    { key: 'pose_dan_gesture', label: '3. Pose & Gesture' },
    { key: 'shot_type', label: '4. Shot Type' },
    { key: 'camera_angle', label: '5. Camera Angle' },
    { key: 'background_location', label: '6. Background / Location' },
    { key: 'art_style', label: '7. Art Style' },
    { key: 'lighting', label: '8. Lighting' },
    { key: 'color_tone', label: '9. Color Tone' },
    { key: 'warna_dominan', label: '10. Warna Dominan' },
    { key: 'detail_pakaian_dan_aksesoris', label: '11. Detail Pakaian & Aksesoris' },
    { key: 'detail_rambut', label: '12. Detail Rambut' },
    { key: 'vibe_mood_suasana', label: '13. Vibe / Mood / Suasana' },
    { key: 'detail_fitur_wajah', label: '14. Detail Fitur Wajah' },
  ];

  for (const { key, label } of sectionMap) {
    const content = breakdown[key] || prompt[key];
    if (content && content !== 'N/A' && !content.startsWith('Tidak ada')) {
      html += `
        <div class="prompt-section">
          <h4>${escapeHtml(label)}</h4>
          <p>${escapeHtml(typeof content === 'string' ? content : JSON.stringify(content, null, 2))}</p>
        </div>
      `;
    }
  }

  // Raw toggle
  if (raw) {
    html += `
      <div class="raw-toggle" onclick="toggleRaw(this)">
        📄 Lihat response mentah
      </div>
      <div class="raw-content" style="display:none">
        <pre style="font-size:11px;color:var(--text-muted);text-align:left;white-space:pre-wrap;max-height:300px;overflow-y:auto;">${escapeHtml(raw)}</pre>
      </div>
    `;
  }

  // Token usage
  if (data.usage) {
    const usage = data.usage;
    $('tokenCount').textContent = `Tokens: ${usage.promptTokenCount || '?'} in → ${usage.candidatesTokenCount || '?'} out`;
    $('outputFooter').classList.remove('hidden');
  }

  outputResult.innerHTML = html;
  outputResult.classList.remove('hidden');
}

function toggleRaw(el) {
  const next = el.nextElementSibling;
  if (next && next.classList.contains('raw-content')) {
    const isHidden = next.style.display === 'none';
    next.style.display = isHidden ? 'block' : 'none';
    el.textContent = isHidden ? '🙈 Sembunyikan raw' : '📄 Lihat response mentah';
  }
}

// ===== COPY & EXPORT =====
function copyPrompt() {
  const text = extractText();
  if (!text) {
    showToast('Belum ada prompt untuk di-copy', 'error');
    return;
  }
  
  navigator.clipboard.writeText(text).then(() => {
    showToast('Prompt berhasil di-copy! 📋', 'success');
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast('Prompt di-copy! 📋', 'success');
  });
}

function exportPrompt(e) {
  if (e) e.preventDefault();
  const text = extractText();
  if (!text) {
    showToast('Belum ada prompt untuk di-export', 'error');
    return;
  }

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `prompt-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Prompt di-export! 💾', 'success');
}

function extractText() {
  const main = outputResult.querySelector('.prompt-main');
  if (main) return main.textContent.trim();

  // Fallback: collect all sections
  const sections = outputResult.querySelectorAll('.prompt-section');
  let text = '';
  sections.forEach(s => {
    const h4 = s.querySelector('h4');
    const p = s.querySelector('p');
    if (h4 && p) text += `${h4.textContent}: ${p.textContent}\n`;
  });
  return text.trim();
}

// ===== UTILITY =====
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(msg, type = 'success') {
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  toast.classList.remove('hidden');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ===== MODEL SELECTOR (update active indicator) =====
const modelSelect = $('modelSelect');
const modelStatus = $('modelStatus');

modelSelect.addEventListener('change', () => {
  const val = modelSelect.value;
  const label = modelSelect.options[modelSelect.selectedIndex].text;
  modelStatus.innerHTML = `<span class="dot-active"></span> ${val} — Aktif`;
  showToast(`Model diganti: ${label}`, 'success');
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  // Ctrl+Enter = Generate
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    generatePrompt();
  }
  // Escape = close loader
  if (e.key === 'Escape' && !loaderOverlay.classList.contains('hidden')) {
    loaderOverlay.classList.add('hidden');
  }
});

// ===== INIT =====
checkAPI();
