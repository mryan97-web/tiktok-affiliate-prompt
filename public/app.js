/* === TikTok Affiliate Prompt Generator — Frontend JS === */

const state = {
  imageData: null,
  mimeType: null,
  fileName: null,
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

// ===== UPLOAD HANDLERS =====
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
  const files = e.dataTransfer.files;
  if (files.length > 0) handleFile(files[0]);
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
    state.imageData = e.target.result.split(',')[1]; // base64 tanpa header
    previewImage.src = e.target.result;
    previewImage.classList.remove('hidden');
    uploadPlaceholder.classList.add('hidden');
    btnRemove.classList.remove('hidden');
    btnGenerate.disabled = false;
    showToast('Gambar siap! Atur detail lalu Generate', 'success');
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
  previewImage.src = '';
  fileInput.value = '';
  btnGenerate.disabled = true;
}

// ===== DROPDOWN HELPERS =====
function getOptions() {
  const selectors = [
    'gender', 'ethnicity', 'age', 'bodyType', 'expression', 'pose',
    'shotType', 'cameraAngle', 'background', 'artStyle', 'lighting',
    'hairStyle', 'mood', 'clothing', 'accessories', 'hairColor'
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
        options: getOptions()
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
  
  let html = '';

  if (prompt.raw) {
    // Fallback: tampilkan raw markdown
    html = `<div class="prompt-main">${escapeHtml(prompt.raw)}</div>`;
  } else {
    // Structured prompt utama
    const mainPrompt = prompt['📸 Prompt Utama'] || prompt.mainPrompt || '';
    
    if (mainPrompt) {
      html += `<div class="prompt-main">${escapeHtml(mainPrompt)}</div>`;
    }

    // Detail sections
    const sections = [
      '1. Gender & Demografi',
      '2. Ekspresi Wajah',
      '3. Pose & Gesture',
      '4. Shot Type',
      '5. Camera Angle',
      '6. Background / Location',
      '7. Art Style',
      '8. Lighting',
      '9. Warna Dominan',
      '10. Detail Pakaian & Aksesoris',
      '11. Detail Rambut',
      '12. Vibe / Mood / Suasana'
    ];

    for (const section of sections) {
      const content = prompt[section];
      if (content) {
        html += `
          <div class="prompt-section">
            <h4>${escapeHtml(section)}</h4>
            <p>${escapeHtml(typeof content === 'string' ? content : JSON.stringify(content, null, 2))}</p>
          </div>
        `;
      }
    }
  }

  // Raw toggle
  if (raw && raw !== JSON.stringify(prompt, null, 2)) {
    html += `
      <div class="raw-toggle" onclick="toggleRaw(this)">
        📄 Lihat response mentah
      </div>
      <div class="raw-toggle hidden" style="display:none">
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
  if (next && next.classList.contains('raw-toggle')) {
    next.style.display = next.style.display === 'none' ? 'block' : 'none';
    el.textContent = el.textContent.includes('Lihat') ? '🙈 Sembunyikan raw' : '📄 Lihat response mentah';
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

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  // Ctrl+Enter = Generate
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    generatePrompt();
  }
  // Escape = close loader
  if (e.key === 'Escape' && !loaderOverlay.classList.contains('hidden')) {
    // Cannot cancel API call, but hide loader
    loaderOverlay.classList.add('hidden');
  }
});

// ===== INIT =====
checkAPI();
