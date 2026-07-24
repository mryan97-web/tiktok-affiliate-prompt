/* === Prompt Database — FASE 1 === */
/* AREKA Official Store — Fondasi Karakter */

const $ = id => document.getElementById(id);

// ===== STATE =====
const state = {
  // Identitas Dasar
  charId: 'AREKA_GIRL_001',
  charName: 'Areka Girl',
  charGender: 'Perempuan',
  charAge: '25 tahun',
  charNation: 'Indonesia',
  charEthnic: 'Asia Tenggara (Melayu)',
  charHeight: '160 cm',
  charBodyShape: 'Slim',
  charBodyProp: 'Feminin natural, proporsional',

  // Wajah
  faceShape: 'Oval lembut',
  faceJaw: 'Gentle, refined',
  faceChin: 'Rounded dengan slight taper',
  faceCheeks: 'Softly defined',
  faceForehead: 'Medium height, proporsional',
  faceSymmetry: 'Natural dan balanced',
  faceSkinColor: 'Sawo matang hangat (warm light beige)',
  faceSkinTex: 'Halus natural, subtle texture',
  faceSkinGlow: 'Healthy glow, natural',

  // Mata
  eyeShape: 'Almond sedang',
  eyeSize: 'Sedang, proporsional',
  eyeDist: 'Seimbang (balanced)',
  eyeColor: 'Cokelat gelap (dark brown)',
  eyeExpr: 'Hangat, ramah, engaged',
  eyeLid: 'Soft crease, natural',
  eyeLashes: 'Defined natural, tidak exaggerated',

  // Alis
  browShape: 'Soft natural arch',
  browThick: 'Medium',
  browColor: 'Dark brown to black',

  // Hidung
  noseBridge: 'Straight bridge',
  noseDorsum: 'Lurus proporsional',
  noseTip: 'Rounded',
  noseWidth: 'Small to medium',

  // Bibir
  lipShape: "Cupid's bow terdefinisi",
  lipFull: 'Medium fullness',
  lipColor: 'Natural pink',
  lipSmile: 'Friendly, gigi atas sedikit terlihat',

  // Rambut
  hairColor: 'Hitam natural',
  hairLength: 'Panjang, below shoulders',
  hairTex: 'Lurus (straight)',
  hairPart: 'Soft side part',
  hairShine: 'Healthy shine',

  // Makeup
  muFoundation: 'Soft matte',
  muBlush: 'Light pink',
  muEyeshadow: 'Neutral, soft',
  muEyeliner: 'Brown, natural',
  muLipstick: 'Nude pink',

  // Tubuh
  bodyShoulders: 'Relaxed, proporsional',
  bodyNeck: 'Proporsional, elegan',
  bodyArms: 'Natural, 5 jari, kuku bersih',
  bodyLegs: 'Proporsional, tidak terlihat di frame',

  // Outfit
  outfitTop: 'Minimalist fitted black short sleeve top',
  outfitBottom: '— (tidak terlihat, upper body framing)',
  outfitShoes: '— (tidak terlihat)',
  outfitAcc: 'Minimal jewelry',

  // Karakter Visual
  charVisual: 'Ramah, profesional, elegan, dapat dipercaya, hangat, premium, modern, ceria, approachable, feminine',
};

// ===== TOGGLE SECTION =====
function toggleSection(id) {
  const el = document.getElementById(id);
  el.classList.toggle('collapsed');
}

// ===== BUILD CHARACTER DNA (Output Layer) =====
function buildCharacterDNA() {
  return `## 🧬 Character DNA

### Identitas Dasar
- **Character ID:** ${state.charId}
- **Nama Internal:** ${state.charName}
- **Gender:** ${state.charGender}
- **Umur:** ${state.charAge}
- **Kebangsaan:** ${state.charNation}
- **Etnis:** ${state.charEthnic}
- **Tinggi Badan:** ${state.charHeight}
- **Bentuk Tubuh:** ${state.charBodyShape}
- **Proporsi Tubuh:** ${state.charBodyProp}

### Wajah
- **Bentuk Wajah:** ${state.faceShape}
- **Rahang:** ${state.faceJaw}
- **Dagu:** ${state.faceChin}
- **Pipi:** ${state.faceCheeks}
- **Dahi:** ${state.faceForehead}
- **Simetri:** ${state.faceSymmetry}
- **Warna Kulit:** ${state.faceSkinColor}
- **Tekstur Kulit:** ${state.faceSkinTex}
- **Kilau Kulit:** ${state.faceSkinGlow}

### Mata
- **Bentuk:** ${state.eyeShape}
- **Ukuran:** ${state.eyeSize}
- **Jarak:** ${state.eyeDist}
- **Warna:** ${state.eyeColor}
- **Ekspresi:** ${state.eyeExpr}
- **Kelopak:** ${state.eyeLid}
- **Bulu Mata:** ${state.eyeLashes}

### Alis
- **Bentuk:** ${state.browShape}
- **Ketebalan:** ${state.browThick}
- **Warna:** ${state.browColor}

### Hidung
- **Pangkal:** ${state.noseBridge}
- **Batang:** ${state.noseDorsum}
- **Ujung:** ${state.noseTip}
- **Lebar:** ${state.noseWidth}

### Bibir
- **Bentuk:** ${state.lipShape}
- **Ketebalan:** ${state.lipFull}
- **Warna Alami:** ${state.lipColor}
- **Senyuman:** ${state.lipSmile}

### Rambut
- **Warna:** ${state.hairColor}
- **Panjang:** ${state.hairLength}
- **Tekstur:** ${state.hairTex}
- **Belahan:** ${state.hairPart}
- **Kilau:** ${state.hairShine}

### Makeup (Natural Beauty)
- **Foundation:** ${state.muFoundation}
- **Blush:** ${state.muBlush}
- **Eyeshadow:** ${state.muEyeshadow}
- **Eyeliner:** ${state.muEyeliner}
- **Lipstick:** ${state.muLipstick}

### Tubuh
- **Bahu:** ${state.bodyShoulders}
- **Leher:** ${state.bodyNeck}
- **Tangan:** ${state.bodyArms}
- **Kaki:** ${state.bodyLegs}

### Outfit Default
- **Atasan:** ${state.outfitTop}
- **Bawahan:** ${state.outfitBottom}
- **Sepatu:** ${state.outfitShoes}
- **Aksesori:** ${state.outfitAcc}

### Karakter Visual
${state.charVisual}`;
}

// ===== BUILD IDENTITY LOCK =====
function buildIdentityLock() {
  return `## 🔒 Identity Lock

### ATURAN — Atribut yang TIDAK BOLEH Berubah:
| Kategori | Atribut | Alasan |
|----------|---------|--------|
| Wajah | Bentuk wajah, rahang, dagu, pipi, simetri, warna kulit, tekstur kulit, kilau kulit | Identitas visual utama — perubahan akan membuat karakter berbeda orang |
| Mata | Bentuk, ukuran, jarak, warna, kelopak, bulu mata | Jendela jiwa — perubahan drastis mengubah persepsi karakter |
| Alis | Bentuk, ketebalan, warna | Mengubah ekspresi dasar dan struktur wajah |
| Hidung | Pangkal, batang, ujung, lebar | Fitur yang sangat identik dengan wajah seseorang |
| Bibir | Bentuk, ketebalan, warna alami, senyuman | Senyuman adalah signature karakter |
| Rambut | Warna, panjang, tekstur, belahan, kilau | Bagian besar dari identitas visual karakter |
| Makeup | Foundation, blush, eyeshadow, eyeliner, lipstick | Natural beauty look — konsisten dengan karakter |
| Tubuh | Tinggi, bentuk tubuh, proporsi, bahu, leher | Proporsi fisik yang tidak berubah |

### ATURAN — Atribut yang BOLEH Berubah:
| Kategori | Atribut | Alasan |
|----------|---------|--------|
| Outfit | Atasan, bawahan, sepatu, aksesori | Berubah sesuai produk/kampanye — tidak mempengaruhi identitas wajah |
| Pose | Pose tubuh, gestur, posisi tangan | Berubah sesuai konteks iklan tanpa mengubah karakter |
| Ekspresi Ringan | Mood, intensitas senyum, arah pandang | Variasi natural tanpa mengubah identitas |

⚠️ **Identity Lock WAJIB diterapkan SEBELUM modul lain (Scene, Pose, Product, Camera, Lighting, Branding).**`;
}

// ===== BUILD PROMPT ASSEMBLY =====
function buildPromptAssembly() {
  return `## ⚡ Prompt Assembly — Urutan Penyusunan

\`\`\`
📨 User Request
    ↓
📋 System Rules
    ↓
🧬 [MODUL 1] Character DNA ✅
    ↓
🔒 [MODUL 2] Identity Lock ✅
    ↓
🎬 [MODUL 3] Scene Module (FASE 2)
    ↓
📦 [MODUL 4] Product Module (FASE 2)
    ↓
🧘 [MODUL 5] Pose Module (FASE 2)
    ↓
📷 [MODUL 6] Camera Module (FASE 3)
    ↓
💡 [MODUL 7] Lighting Module (FASE 3)
    ↓
🏷️ [MODUL 8] Branding Module (FASE 4)
    ↓
🚫 Negative Prompt
    ↓
✅ FINAL PROMPT
\`\`\`

### Dependency Graph
- **Character DNA** ← wajib sebelum Scene, Product, Pose
- **Identity Lock** ← wajib diterapkan sebelum Pose & Product
- **Scene Module** ← butuh Character DNA untuk konteks
- **Product Module** ← butuh Pose + Identity Lock
- **Prompt Assembly** ← tahap akhir, menggabungkan semua modul

### Catatan
FASE 1 hanya mencakup:
1. **Character DNA** — identitas karakter permanen ✅
2. **Identity Lock** — proteksi perubahan karakter ✅
3. **Prompt Assembly** — sistem penyusunan prompt ✅

Modul Scene, Product, Pose, Camera, Lighting, dan Branding akan dibangun di fase terpisah.`;
}

// ===== ASSEMBLE =====
function assemblePrompt() {
  const btn = $('btnGenerate');
  btn.disabled = true;

  const dna = buildCharacterDNA();
  const lock = buildIdentityLock();
  const assembly = buildPromptAssembly();

  renderResult({ dna, lock, assembly });

  showToast('Prompt FASE 1 siap! ✅');
  btn.disabled = false;
}

// ===== RENDER =====
function renderResult(data) {
  const out = $('outputArea');
  const footer = $('outputFooter');
  const tokenCount = $('tokenCount');

  let html = '';

  // Ringkasan
  html += `
    <div class="output-section">
      <div class="output-section-header">
        <span>📋 Ringkasan</span>
      </div>
      <div class="output-content">
        <table class="output-summary-table">
          <tr><td>Character ID</td><td>${state.charId}</td></tr>
          <tr><td>Nama</td><td>${state.charName}</td></tr>
          <tr><td>Gender / Umur</td><td>${state.charGender}, ${state.charAge}</td></tr>
          <tr><td>Tinggi / Body</td><td>${state.charHeight}, ${state.charBodyShape}</td></tr>
        </table>
        <div class="output-tags">
          <span>🧬 Character DNA</span>
          <span>🔒 Identity Lock</span>
          <span>⚡ Prompt Assembly</span>
          <span>📌 FASE 1</span>
        </div>
      </div>
    </div>
  `;

  // Character DNA
  html += `
    <div class="output-section">
      <div class="output-section-header">
        <span>🧬 MODUL 1 — Character DNA</span>
        <button class="copy-btn" onclick="copyText(renderDna())">📋 Salin</button>
      </div>
      <div class="output-content">
        <div class="output-text">${escapeHtml(data.dna)}</div>
      </div>
    </div>
  `;

  // Identity Lock
  html += `
    <div class="output-section">
      <div class="output-section-header">
        <span>🔒 MODUL 2 — Identity Lock</span>
        <button class="copy-btn" onclick="copyText(renderLock())">📋 Salin</button>
      </div>
      <div class="output-content">
        <div class="output-text">${escapeHtml(data.lock)}</div>
      </div>
    </div>
  `;

  // Prompt Assembly
  html += `
    <div class="output-section">
      <div class="output-section-header">
        <span>⚡ MODUL 3 — Prompt Assembly</span>
        <button class="copy-btn" onclick="copyText(renderAssembly())">📋 Salin</button>
      </div>
      <div class="output-content">
        <div class="output-text">${escapeHtml(data.assembly)}</div>
      </div>
    </div>
  `;

  out.innerHTML = html;

  const totalChars = data.dna.length + data.lock.length + data.assembly.length;
  tokenCount.textContent = `~${Math.round(totalChars / 4)} tokens · ${totalChars.toLocaleString()} chars`;
  footer.classList.remove('hidden');
}

function renderDna() { return buildCharacterDNA(); }
function renderLock() { return buildIdentityLock(); }
function renderAssembly() { return buildPromptAssembly(); }

// ===== COPY ALL =====
function copyAll() {
  const text = buildCharacterDNA() + '\n\n' + buildIdentityLock() + '\n\n' + buildPromptAssembly();
  copyText(text);
}

// ===== COPY =====
function copyText(text) {
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
  const t = $('toast');
  t.textContent = msg;
  t.className = 'toast';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 2500);
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

// ===== INIT =====
checkAPI();
