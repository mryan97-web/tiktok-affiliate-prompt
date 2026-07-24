/* ═══════════════════════════════════════════════════════════════ */
/* PROMPT DATABASE SYSTEM — Full Implementation (FASE 1–8)    */
/* AREKA Official Store                                        */
/* ═══════════════════════════════════════════════════════════════ */

// ===================================================================
// FASE 1 — CHARACTER DNA DATABASE
// ===================================================================
const CHARACTER_DNA = {
  id: 'AREKA_GIRL_001',
  name: 'Areka Girl',
  gender: 'Perempuan',
  age: '25 tahun',
  nationality: 'Indonesia',
  ethnicity: 'Asia Tenggara (Melayu)',
  height: '160 cm',
  body: 'Slim',
  proportion: 'Feminin natural, proporsional',
  // Face
  face_shape: 'Oval lembut — Soft oval',
  jaw: 'Gentle dan refined',
  chin: 'Rounded dengan slight taper',
  cheeks: 'Softly defined cheekbones',
  forehead: 'Medium height, proporsional',
  symmetry: 'Natural dan balanced',
  skin: 'Sawo matang hangat — Warm light beige',
  skin_texture: 'Halus natural, subtle texture',
  skin_glow: 'Healthy glow — bukan plastik/porcelain',
  // Eyes
  eye_shape: 'Almond sedang — Medium almond-shaped',
  eye_size: 'Sedang, proporsional',
  eye_spacing: 'Seimbang — Balanced spacing',
  eye_color: 'Cokelat gelap — Dark brown',
  eye_expression: 'Hangat, ramah, engaged',
  eyelid: 'Soft crease, natural',
  // Brows
  brow_shape: 'Lengkung natural — Natural arch',
  brow_thickness: 'Sedang — Medium',
  brow_color: 'Hitam gelap natural',
  // Nose
  nose_shape: 'Mancung proporsional',
  nose_tip: 'Rounded',
  nose_profile: 'Lurus dengan slight slope',
  // Lips
  lip_shape: 'Medium fullness, cupid\'s bow jelas',
  lip_color: 'Pink natural',
  lip_texture: 'Lembut natural',
  // Hair
  hair_length: 'Panjang sampai bahu',
  hair_color: 'Hitam natural',
  hair_texture: 'Lurus',
  hair_style: 'Belah samping, tanpa poni',
  // Makeup
  makeup_style: 'Natural beauty — soft matte',
  makeup_blush: 'Pink soft',
  makeup_eyeliner: 'Brown natural',
  makeup_eyeshadow: 'Neutral',
  makeup_lipstick: 'Nude pink',
  // Clothing - default
  outfit: 'Minimalist fitted black short sleeve top',
  outfit_style: 'Tanpa logo, minimal jewelry',
  // Personality for prompt
  expression: 'Warm, friendly, professional smile',
  pose_natural: 'Standing behind counter, slight lean forward',
  confidence: 'Confident but approachable, expert in perfume',
};

const DNA_LOCK_RULES = [
  'Wajah oval lembut — TIDAK BOLEH BERUBAH',
  'Mata almon cokelat gelap — TIDAK BOLEH BERUBAH',
  'Kulit sawo matang hangat — TIDAK BOLEH BERUBAH',
  'Rambut hitam lurus panjang bahu — TIDAK BOLEH BERUBAH',
  'Tinggi 160 cm, slim feminine — TIDAK BOLEH BERUBAH',
  'Makeup natural beauty — TIDAK BOLEH BERUBAH',
  'Outfit black top minimalis — TIDAK BOLEH BERUBAH',
];

// ===================================================================
// FASE 4 — SCENE DATABASE
// ===================================================================
const SCENES = {
  luxury_store: {
    label: 'Luxury Perfume Store',
    desc: 'Luxury perfume boutique, warm wood shelves, glass display counter, neat perfume bottle arrangement, bright premium retail interior, elegant chandelier, marble flooring',
    elements: ['glass display counter', 'warm wood shelves', 'perfume bottles on shelves', 'cashier counter', 'warm LED lighting', 'featured product display', 'decorative flowers'],
  },
  luxury_store_night: {
    label: 'Luxury Perfume Store — Night',
    desc: 'Luxury perfume boutique at night, warm ambient lighting, glass display counter glowing, dimmed retail lights, elegant atmosphere, city lights visible through window',
    elements: ['glass display counter', 'warm wood shelves', 'ambient night lighting', 'city night view', 'featured product display'],
  },
  luxury_store_morning: {
    label: 'Luxury Perfume Store — Morning',
    desc: 'Luxury perfume boutique in the morning, natural light streaming through window, fresh and bright interior, warm wood shelves, glass display counter, neat perfume arrangement',
    elements: ['glass display counter', 'warm wood shelves', 'natural morning light', 'fresh atmosphere', 'featured product display'],
  },
  luxury_store_evening: {
    label: 'Luxury Perfume Store — Evening',
    desc: 'Luxury perfume boutique in the evening, warm golden hour light, cozy premium atmosphere, glass display counter, warm wood shelves, elegant retail interior',
    elements: ['glass display counter', 'warm wood shelves', 'golden hour light', 'cozy atmosphere', 'featured product display'],
  },
  boutique_interior: {
    label: 'Boutique Interior — Premium',
    desc: 'High-end boutique interior, minimalist luxury design, warm beige walls, elegant display shelves, soft ambient lighting, premium retail atmosphere',
    elements: ['elegant display shelves', 'minimalist luxury design', 'warm beige walls', 'soft ambient lighting', 'premium atmosphere'],
  },
  counter_display: {
    label: 'Counter Display — Close Up',
    desc: 'Close up at perfume counter, glass display case with products inside, warm retail lighting, products neatly arranged, elegant countertop',
    elements: ['glass display case', 'products inside case', 'countertop display', 'warm retail lighting', 'neat arrangement'],
  },
  outdoor_garden: {
    label: 'Outdoor Garden — Event',
    desc: 'Luxury outdoor garden event, elegant florals, string lights overhead, marble tables with perfume displays, evening ambiance, garden party setting',
    elements: ['elegant florals', 'string lights', 'marble tables', 'perfume displays', 'garden party', 'evening ambiance'],
  },
  packing_table: {
    label: 'Packing Table — Behind Scene',
    desc: 'Behind the scenes at packing table, gift boxes stacked, ribbons and tissue paper, warm lighting, organized workspace, branded packaging materials',
    elements: ['packing table', 'gift boxes', 'ribbons', 'tissue paper', 'branded packaging', 'organized workspace'],
  },
  living_room: {
    label: 'Living Room — Casual',
    desc: 'Elegant living room interior, luxury sofa, coffee table with perfume, warm home lighting, cozy premium residential setting',
    elements: ['luxury sofa', 'coffee table', 'home decor', 'warm lighting', 'cozy setting'],
  },
  studio: {
    label: 'Studio Photography — Clean',
    desc: 'Professional photography studio, clean white background, soft diffused lighting, minimalist setup, focus on subject and product',
    elements: ['clean background', 'soft diffused lighting', 'minimalist setup', 'professional studio', 'focus on subject'],
  },
};

// ===================================================================
// FASE 5 — PRODUCT DATABASE
// ===================================================================
const PRODUCTS = {
  parfum_arab: { label: 'Arabic Perfume', desc: 'Luxury Arabic perfume in an ornate glass bottle, gold accents, amber-colored liquid, premium label, elegant cap' },
  parfum_floral: { label: 'Floral Perfume', desc: 'Floral perfume in a crystal clear bottle, light pink liquid, delicate floral label, silver cap, feminine design' },
  parfum_musk: { label: 'Musk Perfume', desc: 'Premium musk perfume, dark amber glass bottle, gold foil label, wooden cap, luxurious packaging' },
  parfum_oudh: { label: 'Oudh Perfume', desc: 'Exclusive oudh perfume, black glass bottle, gold calligraphy label, heavy premium feel, magnetic cap' },
  parfum_fresh: { label: 'Fresh Perfume', desc: 'Fresh daily perfume, light blue transparent bottle, silver label, minimalist design, sporty cap' },
  body_splash: { label: 'Body Splash', desc: 'Refreshing body splash, large transparent bottle with spray nozzle, colorful liquid, fun label design' },
  gift_set: { label: 'Gift Set', desc: 'Premium gift set box, contains 3 perfume vials, elegant packaging, ribbon bow, branded gift box' },
  miniset: { label: 'Mini Set', desc: 'Travel mini perfume set, 5 small vials in a branded case, organized display, compact packaging' },
};

// ===================================================================
// FASE 3 — MARKETING / ROLE DATABASE
// ===================================================================
const MARKETING = {
  beauty_advisor: {
    label: 'Beauty Advisor',
    desc: 'Professional beauty advisor, helpful and knowledgeable, warm smile, recommends products personally, expert in fragrance, approachable demeanor',
    traits: ['ramah', 'profesional', 'percaya diri', 'sopan', 'elegan', 'meyakinkan', 'antusias', 'mudah didekati'],
  },
  perfume_consultant: {
    label: 'Perfume Consultant',
    desc: 'Expert perfume consultant, explains fragrance notes, longevity and sillage, sophisticated and elegant, detailed product knowledge',
    traits: ['ahli', 'sophisticated', 'detail-oriented', 'elegant', 'trustworthy'],
  },
  tiktok_creator: {
    label: 'TikTok Affiliate Creator',
    desc: 'Trendy TikTok affiliate creator, energetic and engaging, natural and personal style, direct to camera, relatable approach',
    traits: ['energik', 'engaging', 'natural', 'personal', 'relatable', 'trendy'],
  },
  luxury_sales: {
    label: 'Luxury Store Sales',
    desc: 'High-end luxury store sales consultant, exclusive service, premium attitude, refined manner, white glove service',
    traits: ['eksklusif', 'premium', 'refined', 'professional', 'white glove'],
  },
  fragrance_specialist: {
    label: 'Fragrance Specialist',
    desc: 'Dedicated fragrance specialist, deep perfume knowledge, passionate about scents, technical yet approachable, expert recommendations',
    traits: ['spesialis', 'passionate', 'technical', 'approachable', 'expert'],
  },
  customer_assistant: {
    label: 'Customer Assistant',
    desc: 'Friendly customer assistant, always ready to help, patient listener, solution-oriented, warm and welcoming',
    traits: ['ramah', 'membantu', 'sabar', 'solutif', 'welcoming'],
  },
};

// ===================================================================
// FASE 2 — CAMERA, LIGHTING, COMPOSITION DATABASE
// ===================================================================
const CAMERAS = {
  '9_16_portrait': { label: '9:16 Portrait', ar: '9:16', orient: 'Portrait', distance: 'Medium Close Up', height: 'Eye Level', lens: '85mm', platform: 'TikTok' },
  '1_1_square': { label: '1:1 Square', ar: '1:1', orient: 'Square', distance: 'Medium Shot', height: 'Eye Level', lens: '50mm', platform: 'Instagram' },
  '16_9_landscape': { label: '16:9 Landscape', ar: '16:9', orient: 'Landscape', distance: 'Medium Long Shot', height: 'Eye Level', lens: '35mm', platform: 'Website' },
  '4_5_portrait': { label: '4:5 Portrait', ar: '4:5', orient: 'Portrait', distance: 'Medium Close Up', height: 'Eye Level', lens: '85mm', platform: 'Marketplace' },
  '2_3_portrait': { label: '2:3 Portrait', ar: '2:3', orient: 'Portrait', distance: 'Medium Shot', height: 'Slight High Angle', lens: '50mm', platform: 'Pinterest' },
};

const LIGHTINGS = {
  warm_led: { label: 'Warm LED Retail', desc: 'Warm LED retail lighting, soft fill light from 45° key, 30° opposite fill, 135° rim backlight, no harsh shadows, skin tone natural warm' },
  soft_diffused: { label: 'Soft Diffused Studio', desc: 'Soft diffused studio lighting, large softbox 45° key, fill 30°, even illumination, no shadows, clean professional look' },
  golden_hour: { label: 'Golden Hour', desc: 'Warm golden hour light, sunset warm tone, dramatic soft shadows, warm amber glow, natural warm complexion' },
  natural_window: { label: 'Natural Window', desc: 'Natural window light, soft indirect daylight, cool fill from sky, warm bounce from interior, natural fresh look' },
  ring_light: { label: 'Ring Light Beauty', desc: 'Ring light frontal flat lighting, even illumination, minimal shadows, beauty portrait style, soft even skin tone' },
  mood_ambient: { label: 'Mood Ambient', desc: 'Mood ambient lighting, dramatic chiaroscuro, warm accent lights, deep shadows, mysterious premium atmosphere' },
};

const COMPOSITION = {
  character_frame: '~65% frame',
  face_position: '1/3 atas frame',
  product_position: 'Dipegang natural, label menghadap kamera',
  banner_position: 'HANYA bawah — 8% tinggi frame',
  banner_safe: 'Tidak overlap karakter atau produk',
  safe_area: '10% dari tepi — antisipasi cropping platform',
  visual_hierarchy: 'Karakter (utama) > Produk (kedua) > Banner (pendukung) > Background (penguat scene)',
};

const QUALITY = [
  'Photorealistic', 'Commercial Photography', 'Magazine Quality', 'Luxury Retail',
  'Ultra Detailed', 'Natural Skin Texture', 'Realistic Reflections', 'HDR',
  '8K Appearance', 'Professional Color', 'Balanced Exposure', 'Sharp Focus',
  'Realistic Glass', 'Realistic Perfume Bottle', 'Natural Finger Anatomy',
];

const QUALITY_NEVER = [
  'No plastic skin', 'No cartoon', 'No anime', 'No excessive HDR',
  'No oversaturated', 'No noise', 'No blur', 'No distorted anatomy',
  'No unnatural lighting', 'No unrealistic proportions',
];

// ===================================================================
// FASE 5 — BRAND DATABASE
// ===================================================================
const BRANDS = {
  areka_default: { label: 'AREKA OFFICIAL STORE', banner: 'AREKA OFFICIAL STORE 🛒 Cek Keranjang Kuning', cta: '🛒 Cek Keranjang Kuning' },
  areka_flashsale: { label: 'AREKA FLASH SALE', banner: '🔴 AREKA FLASH SALE — DISKON 50% 🏃', cta: '🔴 Beli Sekarang — Flash Sale!' },
  areka_new: { label: 'AREKA NEW ARRIVAL', banner: '✨ AREKA NEW ARRIVAL — Parfum Terbaru ✨', cta: '✨ Lihat Produk Baru' },
  areka_bestseller: { label: 'AREKA BEST SELLER', banner: '🏆 AREKA BEST SELLER — Favorit Pelanggan 🏆', cta: '🏆 Pesan Best Seller' },
  areka_gift: { label: 'AREKA GIFT RECOMMENDATION', banner: '🎁 AREKA GIFT SET — Hadiah Spesial 🎁', cta: '🎁 Rekomendasi Hadiah' },
};

// ===================================================================
// MODEL CONFIGURATIONS (FASE 8 — Model Optimization)
// ===================================================================
const MODEL_CONFIG = {
  gpt: {
    label: 'GPT Image',
    style: 'Natural paragraph, descriptive, flowing',
    max_tokens: 250,
    prefix: '',
    suffix: '',
    format_instructions: 'Write in natural English paragraph. Be descriptive about the scene, lighting, and details.',
  },
  flux: {
    label: 'FLUX',
    style: 'Short keyword, direct',
    max_tokens: 75,
    prefix: '',
    suffix: '',
    format_instructions: 'Use short keyword-based prompt. Subject + scene + style + quality. No filler words.',
  },
  midjourney: {
    label: 'Midjourney',
    style: 'Artistic cinematic',
    max_tokens: 80,
    prefix: '',
    suffix: ' --ar 9:16 --v 6 --style raw --s 250',
    format_instructions: 'Artistic cinematic style. Use descriptive creative words. Include --ar, --v, --s parameters at end.',
  },
  sdxl: {
    label: 'Stable Diffusion XL',
    style: 'Structured weighted',
    max_tokens: 150,
    prefix: '',
    suffix: '',
    format_instructions: 'Use structured format: subject description, then scene, then lighting, then style. Use weighted keywords.',
  },
  ideogram: {
    label: 'Ideogram',
    style: 'Short text-friendly',
    max_tokens: 80,
    prefix: '',
    suffix: '',
    format_instructions: 'Short prompt. Typography-friendly. Text in image supported. Clear subject and style.',
  },
  imagen: {
    label: 'Imagen',
    style: 'Natural language safe',
    max_tokens: 200,
    prefix: '',
    suffix: '',
    format_instructions: 'Natural language, safe and realistic. Detailed product and scene description. No harmful content.',
  },
};

// ===================================================================
// LENGTH CONFIG
// ===================================================================
const LENGTH_CONFIG = {
  ultra_short: { mult: 0.25, desc: 'Ultra Short (~25 token)' },
  short: { mult: 0.5, desc: 'Short (~50 token)' },
  medium: { mult: 1.0, desc: 'Medium (~100 token)' },
  long: { mult: 2.0, desc: 'Long (~200 token)' },
  ultra_long: { mult: 3.0, desc: 'Ultra Long (~300+ token)' },
};

// ===================================================================
// NEGATIVE PROMPT DATABASE (built from all FASEs)
// ===================================================================
const NEGATIVE_PROMPT_BASE = [
  'No plastic skin', 'No cartoon style', 'No anime', 'No distorted face',
  'No distorted hands', 'No extra fingers', 'No missing fingers',
  'No bad anatomy', 'No disfigured', 'No ugly', 'No deformed',
  'No mutation', 'No mutated hands', 'No poorly drawn face',
  'No poorly drawn hands', 'No blurry', 'No low quality', 'No low resolution',
  'No worst quality', 'No normal quality', 'No grainy', 'No noisy',
  'No dark spots', 'No overexposed', 'No underexposed', 'No oversaturated',
  'No high contrast', 'No unnatural colors', 'No unrealistic lighting',
  'No watermark', 'No text watermark', 'No signature', 'No logo',
  'No extra limbs', 'No cloned face', 'No malformed limbs',
  'No cross-eyed', 'No uneven eyes', 'No asymmetrical features',
  'No dirty lens', 'No dust spots', 'No lens flare (unless intentional)',
  'No 3D render', 'No CGI looking', 'No digital art looking',
  'No illustration', 'No painting', 'No sketch', 'No drawing',
  'No amateur', 'No snapshot looking', 'No quick snap',
  'No Instagram filter', 'No beauty filter effect',
  'No mannequin', 'No mannequin hands', 'No mannequin face',
  'No mannequin looking', 'No unnatural skin texture',
];

// ===================================================================
// VALIDATION ENGINE (FASE 7)
// ===================================================================
function validatePrompt(state) {
  const issues = [];
  if (!state.character) issues.push('Character DNA tidak ditemukan');
  if (!state.scene) issues.push('Scene tidak ditemukan');
  if (!state.product) issues.push('Product tidak ditemukan');
  if (!state.marketing) issues.push('Marketing style tidak ditemukan');
  if (!state.camera) issues.push('Camera tidak ditemukan');
  if (!state.lighting) issues.push('Lighting tidak ditemukan');
  if (!state.brand) issues.push('Brand tidak ditemukan');
  return {
    valid: issues.length === 0,
    issues,
    score: Math.max(0, 100 - issues.length * 15),
  };
}

// ===================================================================
// PROMPT ASSEMBLER ENGINE (FASE 6 + 8)
// ===================================================================

/** Build the DNA description string */
function buildDNA() {
  const d = CHARACTER_DNA;
  return [
    `AREKA_GIRL_001, ${d.gender} ${d.age}, ${d.nationality}`,
    `Wajah: ${d.face_shape}, rahang ${d.jaw}, dagu ${d.chin}`,
    `Kulit: ${d.skin}, ${d.skin_texture}, ${d.skin_glow}`,
    `Mata: ${d.eye_shape}, ${d.eye_color}, ${d.eye_expression}`,
    `Alis: ${d.brow_shape}, ${d.brow_thickness}, ${d.brow_color}`,
    `Hidung: ${d.nose_shape}, ujung ${d.nose_tip}`,
    `Bibir: ${d.lip_shape}, ${d.lip_color}`,
    `Rambut: ${d.hair_color} ${d.hair_texture}, ${d.hair_length}, ${d.hair_style}`,
    `Makeup: ${d.makeup_style}, ${d.makeup_lipstick}, ${d.makeup_blush}`,
    `Tubuh: ${d.height}, ${d.body}, ${d.proportion}`,
    `Outfit: ${d.outfit}, ${d.outfit_style}`,
    `Ekspresi: ${d.expression}`,
  ];
}

/** Build identity lock description */
function buildIdentityLock() {
  return DNA_LOCK_RULES.join('. ');
}

/** Build scene description */
function buildScene(sceneKey) {
  const s = SCENES[sceneKey];
  if (!s) return SCENES.luxury_store.desc;
  return s.desc + '. ' + s.elements.slice(0, 4).join(', ') + '.';
}

/** Build marketing description */
function buildMarketing(mktKey) {
  const m = MARKETING[mktKey];
  if (!m) return MARKETING.beauty_advisor.desc;
  return m.desc + '. ' + m.traits.join(', ') + '.';
}

/** Build product description */
function buildProduct(prodKey) {
  const p = PRODUCTS[prodKey];
  if (!p) return PRODUCTS.parfum_arab.desc;
  return p.desc;
}

/** Build camera description */
function buildCamera(camKey) {
  const c = CAMERAS[camKey];
  if (!c) return CAMERAS['9_16_portrait'].label;
  return `${c.label} — ${c.distance}, ${c.height}, ${c.lens}, ${c.orient} ${c.ar}, platform ${c.platform}`;
}

/** Build lighting description */
function buildLighting(lgtKey) {
  const l = LIGHTINGS[lgtKey];
  if (!l) return LIGHTINGS.warm_led.desc;
  return l.desc;
}

/** Build composition description */
function buildComposition() {
  const c = COMPOSITION;
  return `Karakter ${c.character_frame}, wajah di ${c.face_position}. ${c.product_position}. Banner: ${c.banner_position}. ${c.banner_safe}. ${c.safe_area}. Visual hierarchy: ${c.visual_hierarchy}.`;
}

/** Build brand description */
function buildBrand(brdKey) {
  const b = BRANDS[brdKey];
  if (!b) return BRANDS.areka_default.banner;
  return `${b.banner}. CTA: ${b.cta}`;
}

/** Build quality description */
function buildQuality() {
  return QUALITY.slice(0, 8).join(', ') + '.';
}

/** Build quality never / negative */
function buildQualityNever() {
  return QUALITY_NEVER.join(', ') + '.';
}

/** Build full negative prompt */
function buildNegativePrompt() {
  // Deduplicate
  const all = [...new Set([...NEGATIVE_PROMPT_BASE, ...QUALITY_NEVER])];
  return all.join(', ');
}

// ===================================================================
// MAIN GENERATOR — FASE 8 FINAL OUTPUT
// ===================================================================
function generatePrompt() {
  // 1. INPUT COLLECTOR — read all selections
  const character = document.getElementById('gen-character').value;
  const sceneKey = document.getElementById('gen-scene').value;
  const prodKey = document.getElementById('gen-product').value;
  const mktKey = document.getElementById('gen-marketing').value;
  const camKey = document.getElementById('gen-camera').value;
  const lgtKey = document.getElementById('gen-lighting').value;
  const brdKey = document.getElementById('gen-brand').value;
  const modelKey = document.getElementById('gen-model').value;
  const lengthKey = document.getElementById('gen-length').value;
  const templateKey = document.getElementById('gen-template').value;
  const customReq = document.getElementById('gen-custom').value.trim();

  // 2. ASSEMBLE all parts
  const state = { character, scene: sceneKey, product: prodKey, marketing: mktKey, camera: camKey, lighting: lgtKey, brand: brdKey };

  // 3. VALIDATION (FASE 7)
  const validation = validatePrompt(state);

  // 4. BUILD EACH SECTION
  const parts = {
    system: 'AI Image Generation for AREKA OFFICIAL STORE — Commercial Perfume Photography',
    dna: buildDNA().join('; '),
    identity: buildIdentityLock(),
    scene: buildScene(sceneKey),
    marketing: buildMarketing(mktKey),
    product: buildProduct(prodKey),
    pose: CHARACTER_DNA.pose_natural,
    camera: buildCamera(camKey),
    lighting: buildLighting(lgtKey),
    composition: buildComposition(),
    brand: buildBrand(brdKey),
    quality: buildQuality(),
    custom: customReq || undefined,
    negative: buildNegativePrompt(),
  };

  // 5. LENGTH ADJUSTMENT
  const modelConf = MODEL_CONFIG[modelKey] || MODEL_CONFIG.gpt;
  let lengthMult = 1.0;
  if (lengthKey !== 'auto') {
    lengthMult = (LENGTH_CONFIG[lengthKey] || LENGTH_CONFIG.medium).mult;
  } else {
    // Auto based on model
    lengthMult = modelConf.max_tokens / 100;
  }

  // 6. BUILD PROMPT TEXT based on model style
  let mainPrompt = '';
  const model = modelConf;

  if (modelKey === 'gpt' || modelKey === 'imagen') {
    // Natural paragraph style
    mainPrompt = parts.dna + '. ';
    mainPrompt += 'She is ' + parts.identity.toLowerCase() + '. ';
    mainPrompt += 'Scene: ' + parts.scene + ' ';
    mainPrompt += 'She works as ' + parts.marketing + ' ';
    mainPrompt += 'She is holding a ' + parts.product + '. ';
    mainPrompt += parts.pose + '. ';
    mainPrompt += 'Camera: ' + parts.camera + '. ';
    mainPrompt += 'Lighting: ' + parts.lighting + '. ';
    mainPrompt += 'Composition: ' + parts.composition + ' ';
    mainPrompt += 'Brand signage: ' + parts.brand + '. ';
    mainPrompt += 'Quality: ' + parts.quality + ' ';
    mainPrompt += 'Professional commercial perfume photography, luxury retail aesthetic.';
    if (parts.custom) mainPrompt += ' ' + parts.custom + '.';
  } else if (modelKey === 'flux') {
    // Short keyword style
    mainPrompt = 'Indonesian female beauty advisor, 25yo, warm light beige skin, almond dark brown eyes, oval face, long black hair. ';
    mainPrompt += parts.scene.split('.')[0] + '. ';
    mainPrompt += 'Holding ' + parts.product.toLowerCase() + '. ';
    mainPrompt += parts.pose + '. ';
    mainPrompt += parts.lighting.split(',')[0] + '. ';
    mainPrompt += parts.camera.split('—')[0].trim() + '. ';
    mainPrompt += 'Photorealistic, commercial quality. ';
    if (parts.custom) mainPrompt += parts.custom + '.';
  } else if (modelKey === 'midjourney') {
    // Artistic cinematic style
    mainPrompt = 'Indonesian beauty advisor, 25 years old, warm skin tone, elegant oval face, long black hair, almond eyes, natural makeup -- ';
    mainPrompt += 'working at luxury perfume store, ' + parts.scene.split(',')[0].toLowerCase() + ' -- ';
    mainPrompt += 'holding ' + parts.product.toLowerCase() + ' -- ';
    mainPrompt += parts.pose + ' -- ';
    mainPrompt += parts.lighting.split(',')[0].toLowerCase() + ' -- ';
    mainPrompt += model.suffix;
    if (parts.custom) mainPrompt += ' -- ' + parts.custom;
  } else if (modelKey === 'sdxl') {
    // Structured weighted
    mainPrompt = 'masterpiece, best quality, ';
    mainPrompt += '1girl, indonesian, 25yo, warm skin, oval face, long black hair, almond eyes, natural makeup, black top, ';
    mainPrompt += '(luxury perfume store:1.2), ' + parts.scene.split(',')[0].toLowerCase() + ', ';
    mainPrompt += '(holding ' + parts.product.toLowerCase() + ':1.3), ';
    mainPrompt += parts.pose + ', ';
    mainPrompt += '(' + parts.lighting.split(',')[0].toLowerCase() + ':1.2), ';
    mainPrompt += parts.camera.split('—')[0].trim() + ', ';
    mainPrompt += 'photorealistic, commercial photography, 8k, ';
    if (parts.custom) mainPrompt += parts.custom + ', ';
    mainPrompt += 'negative: ' + parts.negative.slice(0, 200);
  } else if (modelKey === 'ideogram') {
    // Short text-friendly
    mainPrompt = 'Indonesian beauty advisor at luxury perfume store. ';
    mainPrompt += 'Holding ' + parts.product.toLowerCase() + '. ';
    mainPrompt += parts.pose + '. ';
    mainPrompt += parts.lighting.split(',')[0] + '. ';
    mainPrompt += 'Photorealistic style. ';
    mainPrompt += parts.brand + ' ';
    if (parts.custom) mainPrompt += parts.custom + ' ';
    mainPrompt += 'AREKA OFFICIAL STORE';
  }

  // 7. APPLY LENGTH TRIMMING
  if (lengthMult < 1.0) {
    const words = mainPrompt.split(' ');
    const targetLen = Math.max(20, Math.floor(words.length * lengthMult));
    mainPrompt = words.slice(0, targetLen).join(' ');
  } else if (lengthMult > 1.5) {
    // For ultra long, add more detail
    mainPrompt += ' ' + parts.dna + ' ' + parts.scene + ' ' + parts.composition;
  }

  // 8. BUILD FINAL OUTPUT FORMAT
  const outputEl = document.getElementById('genOutput');

  const modelLabel = modelConf.label;
  const ar = CAMERAS[camKey] ? CAMERAS[camKey].ar : '9:16';
  const qualityLabel = 'Ultra Realistic';
  const status = validation.valid ? '✅ READY TO GENERATE' : '⚠️ PERLU REVISI';
  const score = validation.score;

  let html = '';

  if (templateKey === 'prompt_only') {
    html = `<div class="gen-output-ready"><div class="gen-section"><span class="gen-section-label">FINAL PROMPT</span>${mainPrompt}</div></div>`;
  } else if (templateKey === 'prompt_negative') {
    html = `<div class="gen-output-ready">
      <div class="gen-section"><span class="gen-section-label">FINAL PROMPT</span>${mainPrompt}</div>
      <hr class="gen-section-divider">
      <div class="gen-section"><span class="gen-section-label">NEGATIVE PROMPT</span>${parts.negative}</div>
    </div>`;
  } else if (templateKey === 'json') {
    html = `<div class="gen-output-ready">${JSON.stringify({ prompt: mainPrompt, negative_prompt: parts.negative, model: modelLabel, style: modelConf.style, aspect_ratio: ar, quality: qualityLabel, status: status }, null, 2)}</div>`;
  } else if (templateKey === 'markdown') {
    html = `<div class="gen-output-ready">
### Final Prompt
${mainPrompt}

### Negative Prompt
${parts.negative}

### Metadata
- Model: ${modelLabel}
- Aspect Ratio: ${ar}
- Quality: ${qualityLabel}
- Status: ${status}
</div>`;
  } else if (templateKey === 'api') {
    const payload = { prompt: mainPrompt, negative_prompt: parts.negative, model: modelKey, aspect_ratio: ar, quality: 'ultra_realistic', style: modelConf.style, width: 1080, height: ar === '9:16' ? 1920 : ar === '1:1' ? 1080 : ar === '4:5' ? 1350 : 1080 };
    html = `<div class="gen-output-ready">${JSON.stringify(payload, null, 2)}</div>`;
  } else {
    // Full template (default)
    html = `<div class="gen-output-ready">
      <div class="gen-section"><span class="gen-section-label">FINAL PROMPT</span>${mainPrompt}</div>
      <hr class="gen-section-divider">
      <div class="gen-section"><span class="gen-section-label">NEGATIVE PROMPT</span>${parts.negative}</div>
      <hr class="gen-section-divider">
      <div class="gen-section" style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:10px;">
        <span><strong>Model:</strong> ${modelLabel}</span>
        <span><strong>Style:</strong> ${modelConf.style}</span>
        <span><strong>Aspect Ratio:</strong> ${ar}</span>
        <span><strong>Quality:</strong> ${qualityLabel}</span>
        <span><strong>Status:</strong> ${status}</span>
        <span><strong>Quality Score:</strong> ${score}/100</span>
      </div>
      ${!validation.valid ? `<hr class="gen-section-divider"><div class="gen-section" style="color:#e53e3e;"><strong>⚠️ Issues:</strong> ${validation.issues.join(', ')}</div>` : ''}
    </div>`;
  }

  outputEl.innerHTML = html;
}


// ===================================================================
// SWITCH PANEL — Extended
// ===================================================================
function switchPanel(panelId) {
  document.querySelectorAll('.fase-tab').forEach(t => t.classList.remove('active'));
  const tab = document.querySelector(`.fase-tab[data-panel="${panelId}"]`);
  if (tab) tab.classList.add('active');

  document.querySelectorAll('.panel-group').forEach(p => p.classList.remove('active-panel'));
  const panel = document.querySelector(`.panel-group[data-panel="${panelId}"]`);
  if (panel) panel.classList.add('active-panel');

  // For generator panel, show generator view
  if (panelId === 'generator') {
    showModule('generator');
    const infoBar = document.getElementById('infoBar');
    if (infoBar) {
      infoBar.querySelector('strong').textContent = '⚡ AI Prompt Generator';
      infoBar.querySelector('#infoText').textContent = '103 modul · 8 FASE · 48 langkah otomatis';
    }
    return;
  }

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
    fase7: 'FASE 7 — Quality Assurance Engine',
    fase8: 'FASE 8 — Final Generator Engine',
  };
  const subs = {
    fase1: 'Character DNA · Identity Lock · Prompt Assembly',
    fase2: 'Camera · Lens · Lighting · Color · Composition · Quality · Consistency · Presets',
    fase3: 'Role · Personality · Interaction · Presentation · Gesture · Expression · Body Language · Psychology · Trust · TikTok · Conversion · CTA · Shop · Social · Consistency',
    fase4: 'Scene Library · Default Store · Store Environment · Activity · Product Interaction · Customer Scene · Product Category · Time · Mood · Seasonal · Variation · Props · Consistency · Templates · Output',
    fase5: 'Brand Identity · Product Database · Product Display · Hierarchy · Placement · Banner · Typography · Color System · Campaign · Social Commerce · CTA · Consistency · Templates · Output',
    fase6: 'Assembly Engine · Request Analyzer · Module Selector · Priority Engine · Conflict Detector · Optimizer · Enhancer · Negative Builder · Validator · Default Engine · Multi Platform · Template Engine · Formatter · Automation Rules · Workflow Engine · Output',
    fase7: 'Prompt Validator · Consistency Engine · Conflict Detection · Redundancy Remover · Optimizer · Scene Validator · Product Validator · Character Validator · Camera Validator · Lighting Validator · Composition Validator · Brand Validator · Quality Score · AI Compatibility · Failsafe · Output Report · Final Quality Rules',
    fase8: 'Input Collector · Prompt Merger · Prompt Formatter · Enhancement Engine · Style Format · Model Optimization · Output Template · Prompt Length · Final Validation · Multi Output · Prompt Version · Final Prompt · Export Engine · Final Output · Engine Rules',
  };
  const infoBar = document.getElementById('infoBar');
  if (infoBar) {
    infoBar.querySelector('strong').textContent = labels[panelId] || panelId;
    infoBar.querySelector('#infoText').textContent = subs[panelId] || '';
  }
}

// ===================================================================
// SHOW MODULE — Extended with all up to 103
// ===================================================================
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
    // FASE 7
    promptValidator7: 'MODUL 72 — Prompt Validator (QA)',
    consistencyEngine: 'MODUL 73 — Consistency Engine',
    conflictDetection: 'MODUL 74 — Conflict Detection Engine',
    redundancy: 'MODUL 75 — Redundancy Remover',
    optimizer7: 'MODUL 76 — Prompt Optimizer (QA)',
    sceneValidator: 'MODUL 77 — Scene Validator',
    productValidator: 'MODUL 78 — Product Validator',
    characterValidator: 'MODUL 79 — Character Validator',
    cameraValidator: 'MODUL 80 — Camera Validator',
    lightingValidator: 'MODUL 81 — Lighting Validator',
    compositionValidator: 'MODUL 82 — Composition Validator',
    brandValidator: 'MODUL 83 — Brand Validator',
    qualityScore: 'MODUL 84 — Quality Score Engine',
    aiCompatibility: 'MODUL 85 — AI Compatibility Engine',
    failsafe: 'MODUL 86 — Failsafe Engine',
    outputReport: 'MODUL 87 — Output Report Engine',
    qualityRules: 'MODUL 88 — Final Quality Rules',
    // FASE 8
    inputCollector: 'MODUL 89 — Input Collector Engine',
    promptMerger: 'MODUL 90 — Prompt Merger Engine',
    promptFormatter: 'MODUL 91 — Prompt Formatter Engine',
    promptEnhancer8: 'MODUL 92 — Prompt Enhancement Engine',
    styleFormat: 'MODUL 93 — Style Format Engine',
    modelOptimization: 'MODUL 94 — Model Optimization Engine',
    outputTemplate: 'MODUL 95 — Output Template Engine',
    promptLength: 'MODUL 96 — Prompt Length Engine',
    finalValidation: 'MODUL 97 — Final Validation Engine',
    multiOutput: 'MODUL 98 — Multi Output Engine',
    promptVersion: 'MODUL 99 — Prompt Version Engine',
    finalPromptGen: 'MODUL 100 — Final Prompt Engine',
    exportEngine: 'MODUL 101 — Export Engine',
    finalOutputFormat: 'MODUL 102 — Final Output Format',
    engineRules8: 'MODUL 103 — Final Prompt Engine Rules',
    // GENERATOR
    generator: '⚡ AI Prompt Generator',
  };
  document.getElementById('docInfo').textContent = 'Menampilkan: ' + (names[mod] || mod);
}

// ===================================================================
// COPY UTILITIES
// ===================================================================
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

// ===================================================================
// INIT
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Default to generator view
  switchPanel('generator');
});
