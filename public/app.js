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
  face_shape: 'Oval lembut — Soft oval',
  jaw: 'Gentle dan refined',
  chin: 'Rounded dengan slight taper',
  cheeks: 'Softly defined cheekbones',
  forehead: 'Medium height, proporsional',
  symmetry: 'Natural dan balanced',
  skin: 'Sawo matang hangat — Warm light beige',
  skin_texture: 'Halus natural, subtle texture',
  skin_glow: 'Healthy glow — bukan plastik/porcelain',
  eye_shape: 'Almond sedang — Medium almond-shaped',
  eye_size: 'Sedang, proporsional',
  eye_spacing: 'Seimbang — Balanced spacing',
  eye_color: 'Cokelat gelap — Dark brown',
  eye_expression: 'Hangat, ramah, engaged',
  eyelid: 'Soft crease, natural',
  brow_shape: 'Lengkung natural — Natural arch',
  brow_thickness: 'Sedang — Medium',
  brow_color: 'Hitam gelap natural',
  nose_shape: 'Mancung proporsional',
  nose_tip: 'Rounded',
  nose_profile: 'Lurus dengan slight slope',
  lip_shape: 'Medium fullness, cupid\'s bow jelas',
  lip_color: 'Pink natural',
  lip_texture: 'Lembut natural',
  hair_length: 'Panjang sampai bahu',
  hair_color: 'Hitam natural',
  hair_texture: 'Lurus',
  hair_style: 'Belah samping, tanpa poni',
  makeup_style: 'Natural beauty — soft matte',
  makeup_blush: 'Pink soft',
  makeup_eyeliner: 'Brown natural',
  makeup_eyeshadow: 'Neutral',
  makeup_lipstick: 'Nude pink',
  outfit: 'minimalist fitted black short sleeve top',
  outfit_style: 'Tanpa logo, minimal jewelry',
  expression: 'Warm, friendly, professional smile',
  pose_natural: 'Standing behind counter, slight lean forward',
  confidence: 'Confident but approachable, expert in perfume',
};

const MALE_CHARACTER_DNA = {
  id: 'AREKA_GUY_001',
  name: 'Areka Guy',
  gender: 'Laki-laki',
  age: '27 tahun',
  nationality: 'Indonesia',
  ethnicity: 'Asia Tenggara (Melayu)',
  height: '172 cm',
  body: 'Athletic slim — atletis ramping',
  proportion: 'Proporsional, bahu bidang, postur tegap',
  face_shape: 'Tajam maskulin — Sharp masculine jawline',
  jaw: 'Defined dan tegas',
  chin: 'Strong square chin',
  cheeks: 'Defined cheekbones, subtle hollow',
  forehead: 'Medium height, proporsional',
  symmetry: 'Natural maskulin',
  skin: 'Sawo matang hangat — Warm medium tan',
  skin_texture: 'Halus natural, subtle skin texture',
  skin_glow: 'Healthy natural glow, bukan plastik',
  eye_shape: 'Almond medium — Medium almond-shaped',
  eye_size: 'Sedang, tajam',
  eye_spacing: 'Seimbang — Balanced spacing',
  eye_color: 'Cokelat gelap — Dark brown',
  eye_expression: 'Percaya diri, hangat, ramah',
  eyelid: 'Deep set, natural',
  brow_shape: 'Lurus tegas — Straight strong brow',
  brow_thickness: 'Tebal — Thick',
  brow_color: 'Hitam gelap natural',
  nose_shape: 'Mancung tegas — Sharp defined bridge',
  nose_tip: 'Slight downward, masculine',
  nose_profile: 'Lurus strong profile',
  lip_shape: 'Medium fullness, defined cupid\'s bow',
  lip_color: 'Brown natural',
  lip_texture: 'Lembut natural',
  hair_length: 'Pendek rapi — Short neat',
  hair_color: 'Hitam natural',
  hair_texture: 'Lurus agak tebal',
  hair_style: 'Rapi disisir ke samping, undercut fade',
  makeup_style: 'No makeup — natural masculine',
  makeup_blush: '',
  makeup_eyeliner: '',
  makeup_eyeshadow: '',
  makeup_lipstick: '',
  outfit: 'black plain t-shirt, denim jacket or casual streetwear',
  outfit_style: 'Casual streetwear Indonesia, minimalis',
  expression: 'Confident, friendly, warm masculine smile',
  pose_natural: 'Standing relaxed, holding product naturally',
  confidence: 'Confident and relatable, casual influencer style',
};

function getActiveCharacter(genderKey) {
  return genderKey === 'male' ? MALE_CHARACTER_DNA : CHARACTER_DNA;
}

const DNA_LOCK_RULES_FEMALE = [
  'Wajah oval lembut — TIDAK BOLEH BERUBAH',
  'Mata almon cokelat gelap — TIDAK BOLEH BERUBAH',
  'Kulit sawo matang hangat — TIDAK BOLEH BERUBAH',
  'Rambut hitam lurus panjang bahu — TIDAK BOLEH BERUBAH',
  'Tinggi 160 cm, slim feminine — TIDAK BOLEH BERUBAH',
  'Makeup natural beauty — TIDAK BOLEH BERUBAH',
  'Outfit black top minimalis — TIDAK BOLEH BERUBAH',
];

const DNA_LOCK_RULES_MALE = [
  'Rahang tajam maskulin — TIDAK BOLEH BERUBAH',
  'Mata almon cokelat gelap — TIDAK BOLEH BERUBAH',
  'Kulit sawo matang hangat — TIDAK BOLEH BERUBAH',
  'Rambut hitam pendek rapi, undercut fade — TIDAK BOLEH BERUBAH',
  'Tinggi 172 cm, athletic slim — TIDAK BOLEH BERUBAH',
  'No makeup, natural masculine — TIDAK BOLEH BERUBAH',
  'Postur tegap, bahu bidang — TIDAK BOLEH BERUBAH',
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
  // ===== NEW SCENES FOR KAOS + VIDEO =====
  cafe_interior: {
    label: 'Cafe — Indoor Casual',
    desc: 'Modern casual cafe interior, warm wooden tables, coffee cups, soft indoor lighting, comfortable chairs, cozy Indonesian cafe atmosphere, brick wall background',
    elements: ['wooden tables', 'coffee cups', 'cafe chairs', 'warm indoor lighting', 'brick wall', 'casual atmosphere'],
  },
  outdoor_street: {
    label: 'Outdoor Street — Urban Walk',
    desc: 'Urban street in Indonesian city, pedestrian walkway, modern buildings, natural daylight, trees along sidewalk, casual outdoor atmosphere, bright natural lighting',
    elements: ['pedestrian walkway', 'modern buildings', 'natural daylight', 'street trees', 'urban atmosphere'],
  },
  outdoor_mall: {
    label: 'Outdoor Mall — Plaza',
    desc: 'Modern outdoor shopping mall plaza, open area, fountains, stores around, natural daylight, casual hangout vibe, Indonesian urban mall atmosphere',
    elements: ['mall plaza', 'fountains', 'stores', 'open area', 'natural daylight'],
  },
  studio_indoor: {
    label: 'Studio Indoor — Minimalist',
    desc: 'Minimalist indoor studio, plain light gray wall, smooth concrete floor, clean modern vibe, soft artificial lighting, focus on model and product',
    elements: ['light gray wall', 'concrete floor', 'minimalist', 'soft artificial lighting', 'clean modern vibe'],
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
  // ===== NEW PRODUCTS: KAOS / APPAREL =====
  kaos_oversized: { label: 'Kaos Oversized — Casual', desc: 'Oversized cotton t-shirt, relaxed fit, comfortable streetwear style, solid color or simple graphic print, casual Indonesian fashion' },
  kaos_polos: { label: 'Kaos Polos — Basic', desc: 'Plain cotton t-shirt, regular fit, clean look, solid neutral color (black, white, cream), minimalistic everyday wear' },
  kaos_sablon: { label: 'Kaos Sablon — Graphic', desc: 'Graphic print t-shirt, bold design on front, trendy street style, comfortable cotton material, casual wear for young adults' },
  jaket_denim: { label: 'Jaket Denim — Streetwear', desc: 'Classic denim jacket, dark blue wash, button front, chest pockets, stylish outer layer, Indonesian streetwear staple' },
  jaket_hoodie: { label: 'Hoodie — Sweater', desc: 'Comfortable cotton hoodie, kangaroo pocket, drawstring hood, relaxed oversized fit, casual warm layer' },
  kemeja_flannel: { label: 'Kemeja Flannel — Casual', desc: 'Casual flannel shirt, red-black plaid pattern, button-down, rolled-up sleeves, relaxed masculine style' },
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
// FASE 2 — CAMERA, SHOT, LIGHTING, COMPOSITION DATABASE
// ===================================================================
const CAMERAS = {
  '9_16_portrait': { label: '9:16 Portrait', ar: '9:16', orient: 'Portrait', platform: 'TikTok' },
  '1_1_square': { label: '1:1 Square', ar: '1:1', orient: 'Square', platform: 'Instagram' },
  '16_9_landscape': { label: '16:9 Landscape', ar: '16:9', orient: 'Landscape', platform: 'Website' },
  '4_5_portrait': { label: '4:5 Portrait', ar: '4:5', orient: 'Portrait', platform: 'Marketplace' },
  '2_3_portrait': { label: '2:3 Portrait', ar: '2:3', orient: 'Portrait', platform: 'Pinterest' },
};

// Camera framing / angle — independent from aspect ratio
const CAMERA_SHOTS = {
  medium_closeup: { label: 'Medium Close Up', desc: 'Medium close-up, eye level, 85mm, face and product clearly visible' },
  closeup_product: { label: 'Close Up Produk', desc: 'Close-up on perfume bottle and hands, 85mm, product label sharp and readable' },
  medium_shot: { label: 'Medium Shot', desc: 'Medium shot from waist up, eye level, 50mm, full upper body with product' },
  cowboy_shot: { label: 'Cowboy Shot', desc: 'Cowboy shot from mid-thigh up, eye level, 50mm, body language visible' },
  over_shoulder: { label: 'Over Shoulder', desc: 'Slight over-the-shoulder angle toward product display, natural retail POV' },
  high_angle: { label: 'High Angle', desc: 'Slight high angle looking down, 35mm, elegant top-down retail composition' },
  low_angle: { label: 'Low Angle', desc: 'Slight low angle looking up, 35mm, confident premium presence' },
  side_profile: { label: 'Side Profile', desc: 'Three-quarter side angle, 50mm, elegant profile with product in hand' },
  top_down: { label: 'Top Down / Flat Lay', desc: 'Top-down flat lay angle focusing on hands and perfume bottle on counter' },
  selfie_pov: { label: 'Selfie / POV', desc: 'Selfie-style front camera POV, arm-length distance, natural TikTok framing' },
  from_behind: { label: 'From Behind — Back View', desc: 'Shot from behind the subject, back facing camera, natural candid perspective, focus on silhouette and outfit' },
  locked_from_behind: { label: '🔒 Locked From Behind — Static', desc: 'Camera locked on subject from behind, steady static shot, subject remains with back to camera throughout, no camera movement, focus on back details and silhouette, professional fashion back-view' },
  front_to_back_tracking: { label: 'Front to Back — Tracking Follow', desc: 'Camera tracks subject from front as they walk past, following the turn to back view, continuous tracking shot, outfit seen from front transitioning to back' },
};

const LIGHTINGS = {
  warm_led: { label: 'Warm LED Retail', desc: 'Warm LED retail lighting, soft fill light from 45° key, 30° opposite fill, 135° rim backlight, no harsh shadows, skin tone natural warm' },
  soft_diffused: { label: 'Soft Diffused Studio', desc: 'Soft diffused studio lighting, large softbox 45° key, fill 30°, even illumination, no shadows, clean professional look' },
  golden_hour: { label: 'Golden Hour', desc: 'Warm golden hour light, sunset warm tone, dramatic soft shadows, warm amber glow, natural warm complexion' },
  natural_window: { label: 'Natural Window', desc: 'Natural window light, soft indirect daylight, cool fill from sky, warm bounce from interior, natural fresh look' },
  ring_light: { label: 'Ring Light Beauty', desc: 'Ring light frontal flat lighting, even illumination, minimal shadows, beauty portrait style, soft even skin tone' },
  mood_ambient: { label: 'Mood Ambient', desc: 'Mood ambient lighting, dramatic chiaroscuro, warm accent lights, deep shadows, mysterious premium atmosphere' },
};

// ===================================================================
// POSE / ACTIVITY / GESTURE DATABASE
// ===================================================================
const POSES = {
  hold_chest: {
    label: 'Memegang Parfum (Depan Dada)',
    desc: 'standing behind counter, holding perfume bottle naturally in right hand at chest level, relaxed grip, label facing camera, slight lean forward, warm professional smile',
  },
  lift_shoulder: {
    label: 'Mengangkat Parfum (Setinggi Bahu)',
    desc: 'lifting perfume bottle to shoulder height with elegant slow motion, bottle body held gently, label facing camera, proud confident expression',
  },
  point_label: {
    label: 'Menunjuk Label Parfum',
    desc: 'holding perfume bottle in one hand while index finger of other hand points at the bottle label, guiding attention to product details, informative expression',
  },
  point_product: {
    label: 'Menunjuk Parfum ke Kamera',
    desc: 'pointing perfume bottle toward camera with open inviting gesture, presenting product clearly, label facing camera, friendly recommendation pose',
  },
  open_cap: {
    label: 'Membuka Tutup Botol',
    desc: 'opening the perfume bottle cap carefully with both hands, one hand holding bottle body, other hand removing cap, focused elegant movement, label still visible',
  },
  close_cap: {
    label: 'Menutup Tutup Botol',
    desc: 'placing the cap back onto the perfume bottle carefully with both hands, precise elegant motion, bottle held steady, professional retail handling',
  },
  spray_air: {
    label: 'Menyemprot Parfum ke Udara',
    desc: 'spraying perfume into the air with one hand, nozzle pressed gently, fine mist visible, other hand supporting bottle base, elegant demonstration pose',
  },
  spray_wrist: {
    label: 'Menyemprot ke Pergelangan Tangan',
    desc: 'spraying perfume onto inner wrist, bottle nozzle close to wrist, elegant fragrance testing pose, soft smile, natural product demo',
  },
  spray_tester: {
    label: 'Menyemprot ke Kertas Tester',
    desc: 'spraying perfume onto a paper tester strip held in the other hand, bottle nozzle aimed at strip, professional fragrance consultation pose',
  },
  open_box: {
    label: 'Membuka Kemasan / Box',
    desc: 'opening perfume packaging box with both hands, revealing bottle inside, careful unboxing pose, excited but professional expression',
  },
  compare_two: {
    label: 'Membandingkan 2 Parfum',
    desc: 'holding two perfume bottles side by side at equal height, balanced composition, comparing products for customer recommendation',
  },
  offer_customer: {
    label: 'Menawarkan ke Pelanggan',
    desc: 'offering perfume bottle toward viewer with open palm presentation, welcoming body language, as if recommending to customer',
  },
  hand_over: {
    label: 'Menyerahkan Parfum',
    desc: 'handing perfume bottle forward politely with both hands, respectful retail gesture, warm smile, customer service pose',
  },
  shelf_pick: {
    label: 'Mengambil dari Rak',
    desc: 'reaching to take perfume bottle from wooden shelf display, natural retail activity, body slightly turned toward shelf, product selected carefully',
  },
  shelf_place: {
    label: 'Menata ke Etalase',
    desc: 'placing perfume bottle neatly onto glass display counter or shelf, careful product styling pose, organized retail activity',
  },
  gift_wrap: {
    label: 'Membungkus Gift Set',
    desc: 'wrapping perfume gift set with ribbon and tissue paper on packing table, both hands active, behind-the-scenes retail activity',
  },
  explain_notes: {
    label: 'Menjelaskan Aroma / Notes',
    desc: 'holding perfume near chest while other hand gestures explaining fragrance notes, informative expression, consultant teaching pose',
  },
  smell_cap: {
    label: 'Mencium Aroma dari Tutup',
    desc: 'holding open perfume cap near nose to smell fragrance, eyes softly closed or looking aside, elegant sensory moment, bottle still in other hand',
  },
  show_size: {
    label: 'Menunjukkan Ukuran Botol',
    desc: 'presenting perfume bottle size clearly between fingers, travel-size or full-size comparison vibe, product scale visible to camera',
  },
  live_tiktok: {
    label: 'Live TikTok / Review',
    desc: 'talking to camera while holding perfume bottle near face, energetic TikTok live style, engaging expression, product always visible',
  },
  counter_lean: {
    label: 'Bersandar di Counter (Default)',
    desc: 'standing behind glass display counter with slight lean forward, hands resting near perfume bottle on counter, natural beauty advisor stance',
  },
  invite_look: {
    label: 'Mengajak Melihat Produk',
    desc: 'open palm gesture inviting viewer to look at perfume bottle on counter, friendly welcoming pose, product as visual focus',
  },
  // ===== NEW POSES: KAOS + VIDEO INFLUENCER =====
  stand_hold_shirt: {
    label: 'Berdiri — Pegang Kaos (Depan)',
    desc: 'standing upright holding a folded t-shirt in both hands at chest level, presenting the shirt to camera, relaxed confident stance, warm smile, casual influencer style',
  },
  stand_hold_shirt_side: {
    label: 'Berdiri — Pegang Kaos (Samping)',
    desc: 'standing with body angled slightly, holding a t-shirt draped over one shoulder, looking back slightly toward camera, casual street style pose',
  },
  sit_hold_shirt: {
    label: 'Duduk — Pegang Kaos',
    desc: 'sitting casually on a chair or sofa, holding a folded t-shirt on lap with one hand, relaxed posture, natural conversation pose, lifestyle influencer',
  },
  sit_coffee_shirt: {
    label: 'Duduk di Cafe — Kaos di Meja',
    desc: 'sitting at cafe table with a coffee cup, folded t-shirt placed on table next to coffee, casual lifestyle scene, relaxed influencer vibe',
  },
  stand_hold_product: {
    label: 'Berdiri — Pegang Produk',
    desc: 'standing upright holding product naturally in one hand at chest level, presenting to camera, relaxed confident stance, warm masculine or feminine smile',
  },
  sit_hold_product: {
    label: 'Duduk — Pegang Produk',
    desc: 'sitting casually while holding product in both hands, relaxed presentation pose, natural product showcase, lifestyle influencer style',
  },
  walk_carry_shirt: {
    label: 'Jalan — Bawa Kaos (Urban)',
    desc: 'walking naturally on urban street while carrying a folded t-shirt under arm or in hand, casual candid street style, dynamic outdoor pose',
  },
  lean_wall_shirt: {
    label: 'Bersandar di Tembok — Pegang Kaos',
    desc: 'leaning casually against a wall, one hand holding a t-shirt draped over shoulder, relaxed street style pose, confident casual vibe',
  },
  hands_up_shirt: {
    label: 'Tangan Terangkat — Tunjuk Kaos',
    desc: 'one hand raised pointing at own t-shirt being worn, streetwear showcase, confident energetic pose, as if saying "check this out"',
  },
  show_tag: {
    label: 'Menunjukkan Label/Detail Kaos',
    desc: 'holding the collar or tag of a t-shirt to show detail, one hand holding fabric, close attention to product quality, informative influencer pose',
  },
  // ===== NEW: MEMAKAI KAOS + FRONT TO BACK =====
  wear_shirt_front: {
    label: 'Memakai Kaos — Dari Depan',
    desc: 'standing and wearing the t-shirt, looking down at the shirt adjusting the collar or fabric, showing how it fits on body, natural mirror self-check pose, front facing camera',
  },
  wear_shirt_side: {
    label: 'Memakai Kaos — Dari Samping',
    desc: 'standing and wearing the t-shirt, body angled slightly to side, one hand touching or adjusting the sleeve or hem, showing side fit and silhouette, natural style check',
  },
  wear_shirt_turn: {
    label: 'Memakai Kaos — Depan ke Belakang (Turn)',
    desc: 'starting front facing wearing the t-shirt, then slowly turning body to show back view, dynamic rotation movement, one hand adjusting collar while turning, showcasing full outfit from all angles',
  },
  wear_shirt_collar: {
    label: 'Memakai Kaos — Tarik Kerah',
    desc: 'wearing the t-shirt while pulling the collar forward slightly with one finger, showing neckline and fabric texture, relaxed casual pose, confident expression',
  },
  wear_shirt_tug: {
    label: 'Memakai Kaos — Tarik Bawah',
    desc: 'wearing the t-shirt and tugging at the hem or bottom edge lightly, showing fit and length, casual fitting room style pose',
  },
  wear_shirt_back: {
    label: 'Memakai Kaos — Pemandangan Belakang',
    desc: 'wearing the t-shirt with back fully facing camera, looking over shoulder slightly, hands in pockets or resting at sides, showcasing back design and fit',
  },
  wear_shirt_adjust: {
    label: 'Memakai Kaos — Menyesuaikan (From Behind)',
    desc: 'wearing the t-shirt seen from behind, both hands adjusting the collar or shoulders, natural movement, candid getting-ready style shot',
  },
  front_to_back_turn_slow: {
    label: 'Putaran Depan ke Belakang — Slow Motion',
    desc: 'slow motion rotation from front view to back view, starting facing camera then turning 180 degrees to show back, hands naturally at sides, fluid graceful movement, outfit visible from both sides',
  },
  front_to_back_walk: {
    label: 'Berjalan Depan ke Belakang — Walk Past',
    desc: 'walking toward camera from front then passing by and continuing with back to camera, dynamic movement shot, outfit seen from front then back in one continuous motion',
  },
  front_to_back_pose: {
    label: 'Pose Depan lalu Balik ke Belakang',
    desc: 'posing briefly facing camera then turning around to show back, one hand in pocket during turn, confident model walkway pose, showcasing full apparel',
  },
  walk_away: {
    label: 'Berjalan Menjauh — From Behind',
    desc: 'walking away from camera, back facing camera, looking over shoulder slightly, dynamic candid street style, urban fashion shot',
  },
  sit_back_view: {
    label: 'Duduk Punggung — From Behind',
    desc: 'sitting with back facing camera at cafe, slight head turn to side, candid lifestyle shot showing outfit from behind, natural atmosphere',
  },
  stand_back_view: {
    label: 'Berdiri Punggung — From Behind',
    desc: 'standing with back fully facing camera, looking at phone or over shoulder, casual back view shot showing outfit and silhouette',
  },
  hold_shirt_over_shoulder: {
    label: 'Kaos Disampirkan di Bahu',
    desc: 't-shirt casually draped over one shoulder while walking, seen from behind or three-quarter angle, urban street style influencer',
  },
  // ===== NEW: TIKTOK PARGOY / JOGET DANCE =====
  pargoy_body_roll: {
    label: '🕺 Pargoy — Body Roll sambil Tunjuk Kaos',
    desc: 'TikTok-style body roll dance, one hand sliding down body to point at own t-shirt, confident pargoy moves, showing off shirt fit while dancing, energetic TikTok dancer vibe',
  },
  pargoy_walk_dance: {
    label: '🕺 Pargoy — Jalan Joget (Walk Dance)',
    desc: 'walking while dancing to camera, TikTok signature walk-dance move, gesturing at own shirt while walking, playful energetic movement showcasing apparel in motion',
  },
  pargoy_spin_show: {
    label: '🕺 Pargoy — Spin Putar Nunjukin Kaos',
    desc: 'dancing spin rotation to show t-shirt from all angles, one hand pointing at shirt mid-spin, ending with back to camera pose, dynamic TikTok dance move',
  },
  pargoy_hand_gesture: {
    label: '🕺 Pargoy — Gerakan Tangan TikTok',
    desc: 'TikTok famous hand gesture dance, pointing at own outfit repeatedly with rhythm, head nodding to beat, wearing the branded t-shirt, engaging energetic street dance vibe',
  },
  pargoy_bounce_show: {
    label: '🕺 Pargoy — Bounce sambil Tarik Kaos',
    desc: 'bouncy dance motion while pulling at the hem or front of own t-shirt to show fit, rhythm movement, streetwear vibe, engaging with camera through dance',
  },
  pargoy_front_to_back: {
    label: '🕺 Pargoy — Depan ke Belakang Sambil Joget',
    desc: 'joget from front then spin to back while dancing, showing t-shirt from front and back views in one continuous dance move, hands up moving to rhythm, TikTok trending dance style',
  },
  pargoy_stop_pose: {
    label: '🕺 Pargoy — Dance lalu Pose (TikTok Signature)',
    desc: 'TikTok signature stop pose: sharp dance moves then freezing in a confident stance with hands pointing at own shirt at the end, transition from high energy dance to model pose',
  },
  pargoy_duet_style: {
    label: '🕺 Pargoy — Duet Style (Mirror Dance)',
    desc: 'TikTok duet-style dance, acting as if doing mirror challenge, showing off t-shirt while dancing, pointing at own shirt and giving thumbs up, engaging energetic performance',
  },
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
  no_brand: { label: 'Tanpa Brand / No Text', banner: '', cta: '', noText: true },
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
// NEGATIVE PROMPT DATABASE (clean, no filler)
// ===================================================================
const NEGATIVE_PROMPT_BASE = [
  'plastic skin', 'cartoon', 'anime', 'distorted face', 'distorted hands',
  'extra fingers', 'missing fingers', 'bad anatomy', 'deformed',
  'blurry', 'low quality', 'oversaturated', 'unrealistic lighting',
  'watermark', 'logo text', 'extra limbs', 'mannequin', 'cgi',
  'illustration', 'painting', 'sketch', 'amateur snapshot',
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
// CLEANUP HELPERS
// ===================================================================
function cleanText(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:])/g, '$1')
    .replace(/([,.;:])\1+/g, '$1')
    .replace(/(,\s*)+/g, ', ')
    .replace(/(\.\s*)+/g, '. ')
    .replace(/\s+—\s+/g, ' — ')
    .trim()
    .replace(/^[.,;\s]+|[.,;\s]+$/g, '');
}

function dedupeWords(text) {
  const seen = new Set();
  return cleanText(text)
    .split(' ')
    .filter((w) => {
      const key = w.toLowerCase().replace(/[.,;:]+$/g, '');
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join(' ');
}

function joinParts(parts) {
  return cleanText(parts.filter(Boolean).join('. ')) + '.';
}

function trimByWords(text, maxWords) {
  const words = cleanText(text).split(' ').filter(Boolean);
  if (words.length <= maxWords) return words.join(' ');
  return words.slice(0, maxWords).join(' ');
}

// ===================================================================
// PROMPT ASSEMBLER ENGINE (FASE 6 + 8) — CLEAN VERSION
// ===================================================================

/** Compact subject — dynamic by gender */
function buildSubjectCompact(gender) {
  const d = getActiveCharacter(gender);
  const female = `same consistent woman AREKA_GIRL_001, Indonesian beauty advisor, 25 years old, warm light beige skin, soft oval face, dark brown almond eyes, long straight black shoulder-length hair, natural soft makeup, slim feminine figure, wearing ${d.outfit}`;
  const male = `same consistent man AREKA_GUY_001, Indonesian young man, 27 years old, warm medium tan skin, sharp masculine face, strong jawline, dark brown almond eyes, short neat black hair undercut fade, athletic slim build, wearing ${d.outfit}`;
  return gender === 'male' ? male : female;
}

/** Short subject for keyword models */
function buildSubjectShort(gender) {
  const d = getActiveCharacter(gender);
  if (gender === 'male') {
    return `Indonesian young man AREKA_GUY_001, 27yo, warm tan skin, sharp jawline, dark brown eyes, short black hair undercut, athletic build, ${d.outfit}`;
  }
  return `Indonesian female AREKA_GIRL_001, 25yo, warm beige skin, oval face, dark brown almond eyes, long black hair, natural makeup, black fitted top`;
}

/** Scene only — no element dump (desc already complete) */
function buildScene(sceneKey) {
  const s = SCENES[sceneKey] || SCENES.luxury_store;
  return cleanText(s.desc);
}

/** Marketing as short role, not trait dump */
function buildMarketing(mktKey) {
  const m = MARKETING[mktKey] || MARKETING.beauty_advisor;
  return cleanText(m.desc.split(',')[0]);
}

function buildCamera(camKey, shotKey) {
  const c = CAMERAS[camKey] || CAMERAS['9_16_portrait'];
  const s = CAMERA_SHOTS[shotKey] || CAMERA_SHOTS.medium_closeup;
  return `${s.desc}, ${c.ar} ${c.orient.toLowerCase()} for ${c.platform}`;
}

function buildLighting(lgtKey) {
  const l = LIGHTINGS[lgtKey] || LIGHTINGS.warm_led;
  // take first clause only — avoid overlong light recipes
  return cleanText(l.desc.split(',').slice(0, 3).join(','));
}

function buildComposition(brdKey, fromBehind) {
  const behind = fromBehind ? ', subject seen from behind, back and shoulders fill frame, head turned slightly showing profile, natural candid framing' : '';
  if (brdKey === 'no_brand') {
    return `subject fills about 65% of frame, face in upper third${behind}, product held naturally with label facing camera, clean commercial composition, no banner, no text overlay`;
  }
  return `subject fills about 65% of frame, face in upper third${behind}, product held naturally with label facing camera, brand banner only at bottom 8%, clean commercial composition`;
}

function buildBrand(brdKey) {
  if (brdKey === 'no_brand') return '';
  const b = BRANDS[brdKey] || BRANDS.areka_default;
  return cleanText(b.banner);
}

function buildQuality() {
  return 'photorealistic commercial photography, luxury retail aesthetic, natural skin texture, sharp focus, magazine quality';
}

function buildPose(poseKey) {
  const p = POSES[poseKey] || POSES.hold_chest;
  return cleanText(p.desc);
}

function buildNegativePrompt(noBrand) {
  const base = [...new Set([...NEGATIVE_PROMPT_BASE, ...QUALITY_NEVER.map((q) => q.replace(/^No\s+/i, '').toLowerCase())])];
  if (noBrand) {
    base.push('text', 'words', 'letters', 'caption', 'subtitle', 'banner text', 'logo', 'watermark', 'typography', 'signage');
  }
  return [...new Set(base)].join(', ');
}

function buildNaturalPrompt(parts) {
  const withFromBehind = parts.fromBehind ? ', viewed from behind, back facing camera' : '';
  return joinParts([
    parts.subject + withFromBehind,
    `working as ${parts.marketing}`,
    `in ${parts.scene}`,
    parts.pose,
    parts.product ? `featuring ${parts.product}` : null,
    parts.custom ? parts.custom : null,
    parts.camera,
    parts.lighting,
    parts.composition,
    parts.brand ? `subtle brand banner text: ${parts.brand}` : (parts.noBrand ? 'no text, no logo, no watermark, no banner, no writing on image' : null),
    parts.quality,
  ]);
}

function buildKeywordPrompt(parts) {
  return cleanText([
    parts.subjectShort,
    parts.scene.split(',')[0],
    parts.pose.split(',')[0],
    parts.product ? parts.product.split(',')[0] : '',
    parts.lighting.split(',')[0],
    parts.camera.split(',')[0],
    parts.custom || '',
    'photorealistic, commercial quality',
  ].filter(Boolean).join(', '));
}

function buildMidjourneyPrompt(parts, model) {
  const body = [
    parts.subjectShort,
    parts.scene.split(',')[0].toLowerCase(),
    parts.pose.split(',')[0].toLowerCase(),
    parts.product ? parts.product.split(',')[0].toLowerCase() : '',
    parts.lighting.split(',')[0].toLowerCase(),
    parts.custom || '',
  ].filter(Boolean).join(' -- ');
  return cleanText(body + ' ' + (model.suffix || ''));
}

function buildSdxlPrompt(parts) {
  return cleanText([
    'masterpiece, best quality',
    parts.subjectShort,
    `(${parts.scene.split(',')[0].toLowerCase()}:1.2)`,
    `(${parts.pose.split(',')[0].toLowerCase()}:1.3)`,
    parts.product ? `(${parts.product.split(',')[0].toLowerCase()}:1.2)` : '',
    `(${parts.lighting.split(',')[0].toLowerCase()}:1.2)`,
    parts.camera.split(',')[0],
    parts.custom || '',
    'photorealistic, commercial photography, 8k',
  ].filter(Boolean).join(', '));
}

function buildIdeogramPrompt(parts) {
  return joinParts([
    parts.subjectShort + ' at luxury perfume store',
    parts.pose.split(',')[0],
    parts.product ? parts.product.split(',')[0].toLowerCase() : null,
    parts.lighting.split(',')[0],
    parts.brand || (parts.noBrand ? 'no text no logo' : null),
    parts.custom || '',
    'photorealistic commercial style',
  ]);
}

// ===================================================================
// CHARACTER CONSISTENCY LOCK — compact DNA block utk Google Flow / Kling / Runway
// Copas ke tiap prompt biar subjek konsisten
// ===================================================================
let CHAR_SEED = Math.floor(Math.random() * 99999);

function generateNewSeed() {
  CHAR_SEED = Math.floor(Math.random() * 99999);
  return CHAR_SEED;
}

function buildCharacterLock(gender, includeFace) {
  const dna = gender === 'male' ? MALE_CHARACTER_DNA : CHARACTER_DNA;
  const propsDNA = gender === 'male' ? DNA_LOCK_RULES_MALE : DNA_LOCK_RULES_FEMALE;

  let block = `[CHARACTER IDENTITY — DO NOT CHANGE]
`;
  block += `Character: ${dna.name} (${dna.nationality})
`;
  block += `Seed: ${CHAR_SEED} — GUNAKAN SEED INI UNTUK MENJAGA KONSISTENSI WAJAH
`;
  block += `Gender: ${dna.gender}
`;
  block += `Age: ${dna.age}
`;
  block += `Ethnicity: ${dna.ethnicity}
`;
  block += `Skin: ${dna.skin}, ${dna.skin_texture}, ${dna.skin_glow}
`;
  block += `Face: ${dna.face_shape}, ${dna.jaw}, ${dna.chin}, ${dna.cheeks}
`;
  block += `Eyes: ${dna.eye_shape}, ${dna.eye_size}, ${dna.eye_color}, ${dna.eye_expression}
`;
  block += `Nose: ${dna.nose_shape}, ${dna.nose_tip}, ${dna.nose_profile}
`;
  block += `Lips: ${dna.lip_shape}, ${dna.lip_color}
`;
  block += `Hair: ${dna.hair_length} ${dna.hair_color} ${dna.hair_texture}, ${dna.hair_style}
`;
  block += `Height-Body: ${dna.height}, ${dna.body}, ${dna.proportion}
`;
  block += `Outfit: ${dna.outfit}, ${dna.outfit_style}
`;
  if (includeFace) {
    block += `Brows: ${dna.brow_shape}, ${dna.brow_thickness}, ${dna.brow_color}
`;
    block += `Makeup: ${dna.makeup_style}${dna.gender === 'Perempuan' ? `, blush ${dna.makeup_blush}, eyeliner ${dna.makeup_eyeliner}, lipstick ${dna.makeup_lipstick}` : ''}
`;
  }
  block += `[END CHARACTER IDENTITY]
`;
  return block;
}

// ===================================================================
// VIDEO PROMPT BUILDER — untuk AI video generation
// ===================================================================
function buildVideoPrompt(parts) {
  const isMale = parts.gender === 'male';
  const genderText = isMale ? 'Indonesian young man AREKA_GUY_001' : 'Indonesian woman AREKA_GIRL_001';
  const poseText = parts.pose.split(',')[0].toLowerCase();
  const sceneText = parts.scene.split(',')[0].toLowerCase();
  const productText = parts.product ? parts.product.split(',')[0].toLowerCase() : 'product';
  const behindText = parts.fromBehind ? ', seen from behind, back facing camera' : '';

  const base = [
    `[Video Prompt]`,
    buildCharacterLock(isMale ? 'male' : 'female', true),
    `${genderText}${behindText} acting as a confident TikTok affiliate influencer,`,
    `location: ${sceneText},`,
    `action: ${poseText},`,
    `showcasing product: ${productText},`,
    `style: natural candid influencer video, dynamic movement, casual Indonesian street style,`,
    parts.custom ? parts.custom : null,
    `lighting: ${parts.lighting.split(',')[0].toLowerCase()},`,
    `shot type: ${parts.camera.split(',')[0].toLowerCase()},`,
    `aspect ratio: 9:16 vertical for TikTok/Reels/Shorts,`,
    `quality: 4K cinematic, 24fps, shallow depth of field,`,
    `mood: confident, relatable, energetic but natural, like a real Indonesian influencer making content,`,
    `movement: gentle natural movement, slight camera sway, breathing room, casual walk or turn as appropriate,`,
    `text overlay: none, no text overlay, no watermark, no logo, no link in bio, clean screen`,
  ];

  let prompt = base.filter(Boolean).join('\n');

  // ===== HARD TEXT & LANGUAGE RULES — ABSOLUTE, WAJIB DIIKUTI =====
  prompt += `\n[ABSOLUTE RULES — VIOLATION WILL RUIN THE OUTPUT]
- CRITICAL: NO TEXT ON SCREEN AT ALL. Zero text, zero writing, zero letters, zero captions, zero subtitles, zero labels, zero watermark, zero logo, zero banner, zero "link in bio", zero "shop now", zero overlay of any kind. The entire video frame must be PURE VIDEO only — no graphic elements, no text overlays, no floating text, no bottom bars, no top bars, no brand marks, no call-to-action text.
- CRITICAL: LANGUAGE MUST BE BAHASA INDONESIA ONLY. The model/subject must speak in Bahasa Indonesia. NO ENGLISH SPEECH. NO ENGLISH TEXT. If you show any text or English in this video, the output is REJECTED.
- The video must look like a raw clean TikTok video: just the model, the product, and the background. Nothing else on screen. No text badges, no stickers, no subtitles, no animated text, no brand logo.
- DO NOT add text even if you think it looks good. Clean screen always.`;

  // Add influencer personality based on marketing role
  if (parts.marketing && parts.marketing.toLowerCase().includes('tiktok')) {
    prompt += `\nenergy: high energy TikTok style, direct yet casual, engaging, modern young audience vibe`;
  } else if (parts.marketing && parts.marketing.toLowerCase().includes('luxury')) {
    prompt += `\nenergy: premium sophisticated elegance, refined movement, luxury influencer aesthetic`;
  } else {
    prompt += `\nenergy: natural friendly influencer style, relatable and authentic, warm personality`;
  }

  // Add product-specific video behavior
  if (productText.includes('kaos') || productText.includes('shirt') || productText.includes('jaket') || productText.includes('hoodie') || productText.includes('kemeja')) {
    prompt += `\nproduct interaction: model touches and adjusts the fabric naturally, shows fit and texture, holds it up to camera, demonstrates comfort and style`;
  } else if (productText.includes('parfum') || productText.includes('perfume') || productText.includes('body splash')) {
    prompt += `\nproduct interaction: model holds the bottle delicately, sprays gently, gestures to show the fragrance, elegant product handling`;
  }

  // Indonesian dialogue/narration — spoken by the model, target audience Indonesia
  // Gunakan custom description dari productSceneDesc klo ada, klo nggak pakai generik
  const sceneDesc = document.getElementById('gen-scene-desc')?.value?.trim() || '';
  const narLines = sceneDesc.split('\n').filter(l => l.trim());
  if (narLines[0]) {
    prompt += `\nDIALOGUE (Bahasa Indonesia WAJIB — model mengucapkan): "${narLines[0]}"`;
    if (narLines[1]) {
      prompt += `\nDIALOGUE (Bahasa Indonesia WAJIB — model mengucapkan): "${narLines[1]}"`;
    }
  } else {
    prompt += `\nDIALOGUE LANGUAGE: WAJIB Bahasa Indonesia. Model harus berbicara dalam Bahasa Indonesia, TIDAK BOLEH Bahasa Inggris. Model mempromosikan produk secara natural dengan gaya TikTok influencer Indonesia — spontan, tidak perlu script. Contoh dialog yang boleh: "Hai guys coba lihat nih produknya", "Ini dia yang lagi viral", "Langganan gua dari dulu", "Gas beli sekarang". TIDAK BOLEH ADA KATA "CHECK LINK IN BIO" atau bahasa Inggris apapun dalam dialog.`;
  }

  // Special handling for "memakai kaos" pose (wearing the shirt)
  const poseKeyLower = (parts.pose || '').toLowerCase();
  if (poseKeyLower.includes('wear_shirt') || poseKeyLower.includes('memakai')) {
    prompt += `\nwear interaction: model is already wearing the product (t-shirt/apparel), demonstrates fit on body, touches fabric to show texture and comfort, natural body movement to showcase how it looks when worn`;
  }

  // Special handling for front-to-back turn poses
  if (poseKeyLower.includes('front_to_back') || poseKeyLower.includes('wear_shirt_turn')) {
    prompt += `\ncamera technique: dynamic rotation shot starting from front view, model slowly turns body 180 degrees revealing back view, continuous smooth motion, outfit visible from every angle in one take`;
  }

  // Locked from behind shot
  const shotKeyLower = (parts.camera || '').toLowerCase();
  if (shotKeyLower.includes('locked_from_behind') || shotKeyLower.includes('locked from behind')) {
    prompt += `\ncamera: completely static locked shot, no camera movement, subject remains with back fully facing camera throughout the entire video, focus on back silhouette and outfit details, professional fashion back-view cinematography`;
  }

  // TikTok Pargoy — dance mode override
  if (poseKeyLower.includes('pargoy')) {
    prompt += `\nmovement: FULL DANCE MODE. Model performs energetic TikTok dance (joget pargoy), dynamic body movement, grooving to music rhythm, sharp and fluid dance moves, TikTok-style choreography, continuous motion throughout the video, dance moves that showcase the outfit naturally`
      + `\nenergy: MAXIMUM ENERGY, high energy TikTok influencer, playful and confident, engaging dance to camera, like viral TikTok fashion content`
      + `\ncamera: dynamic handheld style, slight movement following the dancer, TikTok videography vibe`
      + `\nmood: fun, energetic, youthful, viral TikTok fashion content, outfit reveal through dance`
      + `\nsound: sync to trending TikTok audio beat, dance choreography matching rhythm`;
  }
  // Specific pargoy pose overrides
  if (poseKeyLower.includes('pargoy_spin')) {
    prompt += `\nspin: model does a full dancing spin/rotation to show the t-shirt from all directions, one hand pointing at shirt during spin, playful finish`;
  }
  if (poseKeyLower.includes('pargoy_front_to_back')) {
    prompt += `\ntransition: dance from front then spin to back while continuing to move, continuous 180-degree turn during dance, shirt visible from both sides in one fluid motion`;
  }
  if (poseKeyLower.includes('pargoy_stop')) {
    prompt += `\ndance structure: sharp energetic dance moves ending with a sudden freeze pose, hands pointing at own outfit in final still frame, TikTok signature stop-challenge style`;
  }
  if (poseKeyLower.includes('pargoy_bounce')) {
    prompt += `\nbounce: rhythmic bouncing movement while pulling and adjusting own t-shirt to show fit, hands touching fabric in sync with body movement`;
  }
  if (poseKeyLower.includes('pargoy_hand_gesture')) {
    prompt += `\ngesture: iconic TikTok hand gesture dance, hands moving rhythmically pointing at own outfit repeatedly, head nodding to beat, streetwear fashion dance style`;
  }

  return prompt;
}

// ===================================================================
// 4-SCENE CAMPAIGN BUILDER — untuk promosi produk bertahap
// ===================================================================
function build4ScenePrompt(parts, productDesc) {
  const isMale = parts.gender === 'male';
  const genderText = isMale ? 'AREKA_GUY_001 (Pria Indonesia)' : 'AREKA_GIRL_001 (Wanita Indonesia)';
  const product = parts.product ? parts.product.split(',')[0].toLowerCase() : 'produk';
  const roomDesc = parts.scene;
  const lighting = parts.lighting.split(',')[0].toLowerCase();
  const shot = parts.camera.split(',')[0].toLowerCase();

  const lowerDesc = (productDesc || '').toLowerCase();
  const isApparel = product.includes('kaos') || product.includes('shirt') || product.includes('jaket') ||
                    product.includes('hoodie') || product.includes('kemeja') ||
                    lowerDesc.includes('kain') || lowerDesc.includes('bahan') || lowerDesc.includes('cotton') ||
                    lowerDesc.includes('fabric') || lowerDesc.includes('fit');
  const isPerfume = product.includes('parfum') || product.includes('perfume') || product.includes('body splash') ||
                    lowerDesc.includes('aroma') || lowerDesc.includes('fragrance') || lowerDesc.includes('wangi') ||
                    lowerDesc.includes('note') || lowerDesc.includes('botol') || lowerDesc.includes('bottle');

  let scentNotes = productDesc || '';
  let materialText = '';
  const lines = (productDesc || '').split('\n').filter(l => l.trim());
  if (lines.length > 1) {
    scentNotes = lines.slice(0, 2).join('. ');
    materialText = lines.slice(2).join('. ');
  }

  // Multi-image: get front + back descriptions
  const frontDesc = UPLOADED_IMAGES[0]?.description || '';
  const backDesc = UPLOADED_IMAGES[1]?.description || '';
  const multiImageNote = frontDesc && backDesc
    ? `\nReferensi Produk: Tampak Depan — ${frontDesc}\nReferensi Produk: Tampak Belakang — ${backDesc}`
    : '';

  const introAction = isPerfume
    ? 'Berdiri memegang botol parfum di tangan, memperkenalkan ke kamera dengan senyum ramah.'
    : 'Berdiri memegang kaos/apparel di tangan, menunjukkan produk ke kamera dengan senyum ramah.';

  const detailAction = isPerfume
    ? 'Close-up pada botol parfum, tangan memegang botol dengan hati-hati, menunjuk label dan detail botol.'
    : 'Close-up pada kain kaos, tangan memegang dan meraba tekstur kain, menunjukkan detail jahitan dan print.';

  const demoAction = isPerfume
    ? 'Menyemprot parfum ke pergelangan tangan atau kertas tester, mencium aroma dengan ekspresi menikmati.'
    : 'Memakai kaos, menunjukkan fit di badan, merapikan kerah dan lengan, berpose depan-belakang.';

  const demoCam = isPerfume
    ? 'Medium close-up, fokus ke tangan menyemprot dan ekspresi wajah'
    : 'Full body, rotasi depan ke belakang, sudut dinamis, nunjukin fit kaos';

  const scene2Desc = isPerfume
    ? 'Detail botol, label, warna cairan, tutup'
    : 'Detail kain, jahitan, print/grafis, tekstur, bahan';

  const scene3Desc = isPerfume
    ? `Catatan Aroma: "${scentNotes}" — ekspresi puas dan elegan saat mencium`
    : `Bahan & Fit: "${scentNotes}" — model bergerak natural nunjukin fit`;

  // Dialog — ambil dari deskripsi produk yang di-paste user
  // Kalo kosong, dialog line gak ditampilkan
  const scentLines = (productDesc || '').split('\n').filter(l => l.trim());
  const dialog1 = scentLines[0] ? `Dialog: "${scentLines[0]}"` : '';
  const dialog2 = scentLines[1] ? `Dialog: "${scentLines[1]}"` : (scentLines[0] ? `Dialog: "${scentLines[0]}"` : '');
  const dialog3 = scentLines[2] ? `Dialog: "${scentLines[2]}"` : '';
  const dialog4 = scentLines[3] ? `Dialog: "${scentLines[3]}"` : (scentLines[0] ? `Dialog: "Link di bio guys — checkout sekarang!"` : '');

  const scenes = [];
  const charLock = buildCharacterLock(isMale ? 'male' : 'female', false);
  const rulesBlock = `[ABSOLUTE TEXT RULES]
- NO TEXT ON SCREEN AT ALL. Zero captions, zero subtitles, zero watermark, zero logo, zero banner, zero "link in bio", zero "shop now", zero overlay of any kind. ONLY the character, product, and background are allowed.
- NO ENGLISH. Language must be 100% Bahasa Indonesia. If any text or English appears in this scene, the entire output is REJECTED.
- Clean screen: no text badges, no stickers, no animated text, no brand logo, no bottom/top bars.
[END RULES]`;
  const platformTip = `IMPORTANT: Generate ALL 4 scenes using the SAME Seed (${CHAR_SEED}) for consistent character appearance. Use Character Reference Image if supported.\n${rulesBlock}`;

  scenes.push(`=== SCENE 1: PERKENALAN ===
${charLock}
${platformTip}
Karakter: ${genderText}
Aksi: ${introAction}
${dialog1}
Lokasi: ${roomDesc}
Kamera: ${shot}, tampak depan, full body sampai pinggang
Pencahayaan: ${lighting}
Fokus Produk: Menunjukkan ${product} secara keseluruhan
Gaya: Kasual estetik, vibe influencer`);

  scenes.push(`=== SCENE 2: DETAIL PRODUK ===
Karakter: ${genderText}
Aksi: ${detailAction}
${dialog2}
Lokasi: Sama seperti Scene 1, framing lebih dekat
Kamera: Close-up pada tangan dan produk, produk mengisi 60% frame
Pencahayaan: Soft natural, fokus ke detail produk
Fokus Produk: ${scene2Desc}
Gaya: Estetik fotografi produk, gerakan tangan pelan`);

  if (isApparel) {
    const pargoyDialog = scentLines[2] || scentLines[1] || '';
    const pargoyLine = pargoyDialog ? `Dialog: "${pargoyDialog}"` : '';
    scenes.push(`=== SCENE 3: PARGOY TIKTOK — DANCE SHOWCASE ===
Karakter: ${genderText}
Aksi: TikTok pargoy dance sambil pamerin kaos yang dipakai — body roll, joget energik, tangan nunjuk kaos sendiri
${pargoyLine}
Lokasi: ${roomDesc}
Kamera: Dynamic handheld gaya TikTok, wide to medium shot, ngikutin gerakan dance
Pencahayaan: ${lighting}, tone terang energik
Fokus Produk: ${scentNotes} — kaos keliatan dinamis pas dipakai gerak
Gaya: HIGH ENERGY konten fashion TikTok, vibe viral dance challenge
Gerakan: Full koreografi dance, spin putar nunjukin kaos dari semua sudut, bounce, stop pose
Musik: Sync ke beat TikTok trending
Tagar: #OOTD #FashionTikTok #Pargoy #FYP #Kaos`);

    scenes.push(`=== SCENE 4: AJAKAN BELI (CTA) ===
Karakter: ${genderText}
Aksi: Dance pose lalu berhenti di akhir, tatap kamera sambil senyum, tunjuk kaos
${dialog4}
Lokasi: ${roomDesc}
Kamera: Eye level, langsung ke kamera engaging
Pencahayaan: ${lighting}, tone terang percaya diri
Fokus Produk: ${product} — ${scentNotes}
Gaya: High conversion, CTA fun energik`);
  } else {
    scenes.push(`=== SCENE 3: DEMO / INTERAKSI ===
Karakter: ${genderText}
Aksi: ${demoAction}
${dialog3}
Lokasi: ${roomDesc}
Kamera: ${demoCam}
Pencahayaan: ${lighting}
Fokus Produk: ${scene3Desc}
Gaya: Konten lifestyle influencer, vibe natural candid`);

    scenes.push(`=== SCENE 4: AJAKAN BELI (CTA) ===
Karakter: ${genderText}
Aksi: Berdiri percaya diri, produk di tangan, tatap kamera, ajak beli
${dialog4}
Lokasi: ${roomDesc}
Kamera: ${shot}, eye level, langsung ke kamera engaging
Pencahayaan: ${lighting}, tone terang percaya diri
Fokus Produk: Final showcase ${product} — ${scentNotes}
Gaya: High conversion, direct engagement, CTA hangat ramah`);
  }

  // Append multi-image notes to appropriate scenes
  if (multiImageNote) {
    scenes[0] += multiImageNote;
    scenes[2] += multiImageNote;
  }

  return scenes.join('\n\n');
}

// ===================================================================
// PRODUCT UPLOAD STATE — MULTI-IMAGE
// ===================================================================
let UPLOADED_IMAGES = []; // [{base64, mimeType, dataUrl, description, label}, ...]
let UPLOADED_PRODUCT = null; // backward compat

function onProductModeChange() {
  const key = document.getElementById('gen-product')?.value;
  const box = document.getElementById('productUploadBox');
  if (!box) return;
  if (key === 'upload_custom') box.classList.remove('hidden');
  else box.classList.add('hidden');
}

function setProductStatus(msg, isError) {
  const el = document.getElementById('productDescStatus');
  if (!el) return;
  el.textContent = msg || '';
  el.style.color = isError ? '#dc2626' : '';
}

async function onProductFileSelected(event) {
  const files = Array.from(event.target.files || []).slice(0, 5); // max 5
  if (!files.length) return;
  const invalid = files.find(f => !f.type.startsWith('image/'));
  if (invalid) {
    setProductStatus('File harus gambar (JPG/PNG/WebP)', true);
    return;
  }
  const oversized = files.find(f => f.size > 8 * 1024 * 1024);
  if (oversized) {
    setProductStatus('Max 8MB per gambar — kompres dulu', true);
    return;
  }

  setProductStatus('⏳ Membaca ' + files.length + ' gambar...');
  try {
    const loaded = [];
    for (const file of files) {
      const dataUrl = await readFileAsDataURL(file);
      const base64 = dataUrl.split(',')[1];
      const mimeType = file.type || 'image/jpeg';
      const label = files.length > 1
        ? (loaded.length === 0 ? 'Depan' : loaded.length === 1 ? 'Belakang' : `Angle ${loaded.length + 1}`)
        : 'Produk';
      loaded.push({ base64, mimeType, dataUrl, description: '', label, category: 'unknown' });
    }

    UPLOADED_IMAGES = loaded;
    UPLOADED_PRODUCT = loaded[0] || null;
    renderUploadedImages();

    // Analyze all images
    setProductStatus('🤖 AI menganalisis ' + loaded.length + ' produk...');
    const results = [];
    for (let i = 0; i < loaded.length; i++) {
      try {
        const res = await fetch('/api/product-analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: loaded[i].base64, mimeType: loaded[i].mimeType }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          loaded[i].description = data.description || '';
          loaded[i].category = data.category || 'unknown';
          results.push(`${loaded[i].label}: ${data.description}`);
        }
      } catch (e) {
        results.push(`${loaded[i].label}: (gagal分析)`);
      }
    }

    // Update global descriptions
    const allDesc = results.join('\n\n');
    const descEl = document.getElementById('gen-product-desc');
    if (descEl) descEl.value = allDesc;

    // Update preview grid labels
    renderUploadedImages();
    setProductStatus(`✅ ${loaded.length} produk siap dipakai di prompt`);
  } catch (err) {
    console.error(err);
    setProductStatus('⚠️ Upload error: ' + err.message, true);
  }
}

function renderUploadedImages() {
  const grid = document.getElementById('productPreviewGrid');
  if (!grid) return;
  if (!UPLOADED_IMAGES.length) { grid.classList.add('hidden'); grid.innerHTML = ''; return; }
  grid.classList.remove('hidden');
  grid.innerHTML = UPLOADED_IMAGES.map((img, i) => `
    <div class="product-preview-item">
      <img src="${img.dataUrl}" class="product-preview" alt="${img.label}">
      <div class="product-preview-label">${img.label}</div>
    </div>
  `).join('');
}

function clearProductUpload() {
  UPLOADED_IMAGES = [];
  UPLOADED_PRODUCT = null;
  const fileEl = document.getElementById('gen-product-file');
  const descEl = document.getElementById('gen-product-desc');
  const grid = document.getElementById('productPreviewGrid');
  if (fileEl) fileEl.value = '';
  if (descEl) descEl.value = '';
  if (grid) { grid.innerHTML = ''; grid.classList.add('hidden'); }
  setProductStatus('');
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Gagal baca file'));
    reader.readAsDataURL(file);
  });
}

function getCustomProductDescription() {
  const typed = document.getElementById('gen-product-desc')?.value?.trim() || '';
  if (typed) return typed;
  // Combine all uploaded image descriptions
  const descs = UPLOADED_IMAGES.map(img => img.description).filter(Boolean);
  if (descs.length) return descs.join('\n\n');
  return UPLOADED_PRODUCT?.description || '';
}

function buildProduct(prodKey) {
  if (prodKey === 'upload_custom') {
    const desc = getCustomProductDescription();
    return cleanText(desc || 'exact product from uploaded photo, realistic detail, label facing camera');
  }
  const p = PRODUCTS[prodKey];
  return p ? cleanText(p.desc) : '';
}

/** Detect product category from key */
function detectProductCategory(prodKey) {
  if (prodKey === 'upload_custom') {
    if (UPLOADED_IMAGES[0]?.category && UPLOADED_IMAGES[0].category !== 'unknown') {
      return UPLOADED_IMAGES[0].category;
    }
    if (UPLOADED_PRODUCT?.category && UPLOADED_PRODUCT.category !== 'unknown') {
      return UPLOADED_PRODUCT.category;
    }
    return 'unknown';
  }
  const apparel = ['kaos_', 'jaket_', 'kemeja_', 'hoodie_'];
  for (const p of apparel) {
    if (prodKey.startsWith(p)) return 'apparel';
  }
  return 'perfume';
}

// ===================================================================
// LAST GENERATED (for copy)
// ===================================================================
let LAST_PROMPT = '';
let LAST_NEGATIVE = '';
let LAST_FULL = '';
let LAST_IMAGE_DATAURL = '';

function copyPromptOnly() {
  // Always include negative — penting untuk image gen
  if (!LAST_PROMPT) return showToast('⚠️ Generate dulu');
  const text = LAST_NEGATIVE
    ? `${LAST_PROMPT}\n\nNegative prompt: ${LAST_NEGATIVE}`
    : LAST_PROMPT;
  copyText(text);
}

function copyNegativeOnly() {
  if (!LAST_NEGATIVE) return showToast('⚠️ Generate dulu');
  copyText(LAST_NEGATIVE);
}

function copyFullOutput() {
  // Same clean payload: prompt + negative, no model/style chrome
  if (!LAST_PROMPT) return showToast('⚠️ Generate dulu');
  const clean = LAST_NEGATIVE
    ? `${LAST_PROMPT}\n\nNegative prompt: ${LAST_NEGATIVE}`
    : LAST_PROMPT;
  copyText(clean);
}

function downloadLastImage() {
  if (!LAST_IMAGE_DATAURL) return showToast('⚠️ Belum ada gambar');
  const a = document.createElement('a');
  a.href = LAST_IMAGE_DATAURL;
  a.download = `areka-product-${Date.now()}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('⬇️ Gambar diunduh');
}

function buildCopyBar() {
  return `<div class="gen-copy-bar">
    <button class="gen-copy-btn primary" onclick="copyPromptOnly()">📋 Salin Prompt + Negative</button>
    <button class="gen-copy-btn" onclick="copyNegativeOnly()">🚫 Salin Negative Saja</button>
    ${LAST_IMAGE_DATAURL ? '<button class="gen-copy-btn" onclick="downloadLastImage()">⬇️ Unduh Gambar</button>' : ''}
  </div>`;
}

// ===================================================================
// MAIN GENERATOR — FASE 8 FINAL OUTPUT
// ===================================================================
async function generatePrompt() {
  const btn = document.querySelector('.gen-generate-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏳ Generating...';
  }

  try {
    // 1. INPUT COLLECTOR
    const character = document.getElementById('gen-character').value;
    const gender = document.getElementById('gen-gender')?.value || 'female';
    const sceneKey = document.getElementById('gen-scene').value;
    const prodKey = document.getElementById('gen-product').value;
    const mktKey = document.getElementById('gen-marketing').value;
    const poseKey = document.getElementById('gen-pose').value;
    const camKey = document.getElementById('gen-camera').value;
    const shotKey = document.getElementById('gen-shot').value;
    const lgtKey = document.getElementById('gen-lighting').value;
    const brdKey = document.getElementById('gen-brand').value;
    const modelKey = document.getElementById('gen-model').value;
    const lengthKey = document.getElementById('gen-length').value;
    const templateKey = document.getElementById('gen-template').value;
    const customReq = document.getElementById('gen-custom').value.trim();
    const autoImage = document.getElementById('gen-auto-image')?.checked !== false;
    const outputType = document.getElementById('gen-output-type')?.value || 'image';
    const videoLength = document.getElementById('gen-video-length')?.value || '15';
    const productSceneDesc = document.getElementById('gen-scene-desc')?.value?.trim() || '';

    if (prodKey === 'upload_custom' && !getCustomProductDescription() && !UPLOADED_IMAGES.length) {
      showToast('⚠️ Upload foto produk dulu (min 1)');
      return;
    }

    // sync typed description into upload state
    if (prodKey === 'upload_custom') {
      const allDesc = getCustomProductDescription();
      UPLOADED_IMAGES.forEach(img => { img.description = allDesc; });
      if (UPLOADED_PRODUCT) UPLOADED_PRODUCT.description = allDesc;
    }

    // 2. STATE + VALIDATION
    const state = { character, scene: sceneKey, product: prodKey, marketing: mktKey, camera: camKey, lighting: lgtKey, brand: brdKey, pose: poseKey, shot: shotKey };
    const validation = validatePrompt(state);

    // 3. CLEAN PARTS — no DNA dump, no identity lock spam
    // From-behind ONLY from SHOT selection — NOT from pose key.
    // Poses like front_to_back or wear_shirt_back describe the ACTION,
    // not the camera position. Camera position is controlled by shot selection only.
    const isFromBehind = shotKey === 'from_behind' || shotKey === 'locked_from_behind' || shotKey === 'front_to_back_tracking';
    const parts = {
      gender: gender,
      subject: buildSubjectCompact(gender),
      subjectShort: buildSubjectShort(gender),
      scene: buildScene(sceneKey),
      marketing: buildMarketing(mktKey),
      product: buildProduct(prodKey),
      pose: buildPose(poseKey),
      camera: buildCamera(camKey, isFromBehind ? 'from_behind' : shotKey),
      lighting: buildLighting(lgtKey),
      composition: buildComposition(brdKey, isFromBehind),
      brand: buildBrand(brdKey),
      noBrand: brdKey === 'no_brand',
      quality: buildQuality(),
      custom: customReq || '',
      negative: buildNegativePrompt(brdKey === 'no_brand'),
      fromBehind: isFromBehind,
      outputType: outputType,
      videoLength: videoLength,
    };

    // 4. MODEL CONFIG + LENGTH
    const modelConf = MODEL_CONFIG[modelKey] || MODEL_CONFIG.gpt;
    const wordCaps = {
      ultra_short: 30,
      short: 55,
      medium: 110,
      long: 180,
      ultra_long: 260,
    };
    let maxWords = wordCaps.medium;
    if (lengthKey !== 'auto') {
      maxWords = wordCaps[lengthKey] || wordCaps.medium;
    } else {
      maxWords = Math.max(40, Math.round(modelConf.max_tokens * 0.85));
    }

    // 5. BUILD CLEAN PROMPT PER MODEL
    let mainPrompt = '';
    let videoPrompt = '';
    let scene4Prompt = '';

    if (outputType === '4scene') {
      // 4-Scene Campaign
      scene4Prompt = build4ScenePrompt(parts, productSceneDesc);
      mainPrompt = buildNaturalPrompt(parts);
    } else if (outputType === 'video') {
      // Video mode: build image prompt + video prompt
      const imgParts = { ...parts, gender };
      if (modelKey === 'flux') {
        mainPrompt = buildKeywordPrompt(imgParts);
      } else {
        mainPrompt = buildNaturalPrompt(imgParts);
      }
      videoPrompt = buildVideoPrompt(parts);
    } else {
      if (modelKey === 'flux') {
        mainPrompt = buildKeywordPrompt(parts);
      } else if (modelKey === 'midjourney') {
        mainPrompt = buildMidjourneyPrompt(parts, modelConf);
      } else if (modelKey === 'sdxl') {
        mainPrompt = buildSdxlPrompt(parts);
      } else if (modelKey === 'ideogram') {
        mainPrompt = buildIdeogramPrompt(parts);
      } else {
        // gpt / imagen / default — natural clean paragraph
        mainPrompt = buildNaturalPrompt(parts);
      }
    }

    // 6. FINAL CLEAN + LENGTH TRIM
    mainPrompt = cleanText(mainPrompt);
    if (modelKey !== 'midjourney') {
      mainPrompt = trimByWords(mainPrompt, maxWords);
    }

    // 7. BUILD FINAL OUTPUT FORMAT
    const outputEl = document.getElementById('genOutput');
    const modelLabel = modelConf.label;
    const ar = CAMERAS[camKey] ? CAMERAS[camKey].ar : '9:16';
    const qualityLabel = 'Ultra Realistic';
    const status = validation.valid ? '✅ READY TO GENERATE' : '⚠️ PERLU REVISI';
    const score = validation.score;

    let html = '';

    // Store for copy buttons — pure text only, no labels/metadata
    LAST_PROMPT = outputType === '4scene' ? scene4Prompt : (outputType === 'video' && videoPrompt ? videoPrompt : mainPrompt);
    LAST_NEGATIVE = parts.negative;
    LAST_FULL = parts.negative ? `${LAST_PROMPT}\n\n${parts.negative}` : LAST_PROMPT;
    LAST_IMAGE_DATAURL = '';

    if (outputType === '4scene') {
      // 4-SCENE CAMPAIGN OUTPUT
      const genderLabel = gender === 'male' ? '👤 AREKA_GUY_001 (Pria)' : '👩 AREKA_GIRL_001 (Wanita)';
      const prodLabel = document.getElementById('gen-product')?.options?.[document.getElementById('gen-product')?.selectedIndex]?.text || productSceneDesc?.split('\n')[0] || 'Product';
      html = `<div class="gen-output-ready">
      <div class="gen-section" style="border:2px solid #8b5cf6;border-radius:8px;padding:12px;margin-bottom:8px;background:rgba(139,92,246,0.04);">
        <span class="gen-section-label" style="color:#8b5cf6;font-size:14px;">🎬 4-SCENE CAMPAIGN — ${genderLabel}</span>
        <div class="gen-section-sub-label" style="font-size:10px;color:var(--text-sec);margin-bottom:8px;">
          ${prodLabel} | Scene: 1 (Intro) → 2 (Detail) → 3 (Demo) → 4 (CTA)
        </div>
        <div class="gen-prompt-text" style="font-size:12px;white-space:pre-wrap;font-family:var(--mono);background:#f8f5f0;padding:12px;border-radius:6px;">${escapeHtml(scene4Prompt)}</div>
      </div>
      <hr class="gen-section-divider">
      <div class="gen-section">
        <span class="gen-section-label">📷 REFERENCE IMAGE PROMPT</span>
        <div class="gen-prompt-text">${mainPrompt}</div>
      </div>
      <hr class="gen-section-divider">
      <div class="gen-section"><span class="gen-section-label">🚫 NEGATIVE</span><div class="gen-prompt-text">${parts.negative}</div></div>
      <hr class="gen-section-divider">
      <div class="gen-section gen-meta-only" style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:10px;">
        <span><strong>Output:</strong> 🎬 4-Scene Campaign</span>
        <span><strong>Gender:</strong> ${genderLabel}</span>
        <span><strong>Location:</strong> ${sceneKey}</span>
        <span><strong>Scene count:</strong> 4 scenes</span>
        <span><strong>Aspect Ratio:</strong> ${ar}</span>
        <span><strong>Status:</strong> ✅ Siap Dicopy</span>
      </div>
      <hr class="gen-section-divider">
      <div class="gen-section" style="font-size:11px;color:var(--text-sec);">
        💡 <strong>Cara pakai:</strong> Copy semua → paste di ChatGPT/Gemini sebagai instruksi video. Atau paste tiap Scene satu-satu ke AI image/video generator.
      </div>
    </div>`;
    } else if (outputType === 'video') {
      // VIDEO MODE OUTPUT
      const genderLabel = gender === 'male' ? '👤 AREKA_GUY_001 (Pria)' : '👩 AREKA_GIRL_001 (Wanita)';
      html = `<div class="gen-output-ready">
      <div class="gen-section" style="border:2px solid #6366f1;border-radius:8px;padding:12px;margin-bottom:8px;background:rgba(99,102,241,0.04);">
        <span class="gen-section-label" style="color:#6366f1">🎬 VIDEO PROMPT — ${genderLabel}</span>
        <div class="gen-section-sub-label" style="font-size:10px;color:var(--text-sec);margin-bottom:8px;">
          Untuk Flow · Gemini Video · Kling · Runway · Pika · Sora · Hailuo
          ${videoLength ? `| Durasi: ~${videoLength} detik` : ''}
        </div>
        <div class="gen-prompt-text" style="font-size:13px;white-space:pre-wrap;">${escapeHtml(videoPrompt)}</div>
      </div>
      <hr class="gen-section-divider">
      <div class="gen-section">
        <span class="gen-section-label">📷 REFERENCE IMAGE PROMPT</span>
        <div class="gen-prompt-text">${mainPrompt}</div>
      </div>
      <hr class="gen-section-divider">
      <div class="gen-section"><span class="gen-section-label">🚫 NEGATIVE</span><div class="gen-prompt-text">${parts.negative}</div></div>
      <hr class="gen-section-divider">
      <div class="gen-section gen-meta-only" style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:10px;">
        <span><strong>Output:</strong> 🎬 Video</span>
        <span><strong>Gender:</strong> ${genderLabel}</span>
        <span><strong>Scene:</strong> ${sceneKey}</span>
        <span><strong>Pose:</strong> ${poseKey}</span>
        <span><strong>Aspect Ratio:</strong> ${ar}</span>
        <span><strong>Status:</strong> ${status}</span>
      </div>
    </div>`;
    } else if (templateKey === 'prompt_only') {
      html = `<div class="gen-output-ready"><div class="gen-section"><span class="gen-section-label">PROMPT</span><div class="gen-prompt-text">${mainPrompt}</div></div></div>`;
    } else if (templateKey === 'prompt_negative') {
      html = `<div class="gen-output-ready">
      <div class="gen-section"><span class="gen-section-label">PROMPT</span><div class="gen-prompt-text">${mainPrompt}</div></div>
      <hr class="gen-section-divider">
      <div class="gen-section"><span class="gen-section-label">NEGATIVE</span><div class="gen-prompt-text">${parts.negative}</div></div>
    </div>`;
    } else if (templateKey === 'json') {
      const jsonOut = JSON.stringify({ prompt: mainPrompt, negative_prompt: parts.negative }, null, 2);
      LAST_PROMPT = mainPrompt;
      LAST_NEGATIVE = parts.negative;
      LAST_FULL = jsonOut;
      html = `<div class="gen-output-ready"><pre class="gen-prompt-text">${jsonOut}</pre></div>`;
    } else if (templateKey === 'markdown') {
      const mdOut = `${mainPrompt}\n\n${parts.negative}`;
      LAST_FULL = mdOut;
      html = `<div class="gen-output-ready"><pre class="gen-prompt-text">${mdOut}</pre></div>`;
    } else if (templateKey === 'api') {
      const payload = { prompt: mainPrompt, negative_prompt: parts.negative, model: modelKey, aspect_ratio: ar, quality: 'ultra_realistic', style: modelConf.style, width: 1080, height: ar === '9:16' ? 1920 : ar === '1:1' ? 1080 : ar === '4:5' ? 1350 : 1080 };
      const apiOut = JSON.stringify(payload, null, 2);
      LAST_FULL = apiOut;
      html = `<div class="gen-output-ready"><pre class="gen-prompt-text">${apiOut}</pre></div>`;
    } else {
      html = `<div class="gen-output-ready">
      <div class="gen-section"><span class="gen-section-label">PROMPT</span><div class="gen-prompt-text">${mainPrompt}</div></div>
      <hr class="gen-section-divider">
      <div class="gen-section"><span class="gen-section-label">NEGATIVE</span><div class="gen-prompt-text">${parts.negative}</div></div>
      <hr class="gen-section-divider">
      <div class="gen-section gen-meta-only" style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:10px;">
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

    // product source note
    if (prodKey === 'upload_custom') {
      html += `<div class="gen-status-line ok">📦 Produk: dari upload / deskripsi custom</div>`;
    }

    outputEl.innerHTML = buildCopyBar() + html + `<div id="genImageSlot"></div>`;

    // 8. AUTO IMAGE GENERATE
    if (autoImage) {
      await generateImageFromPrompt({
        prompt: mainPrompt,
        negative: parts.negative,
        aspectRatio: ar,
        productImages: prodKey === 'upload_custom' ? UPLOADED_IMAGES : null,
        productImage: prodKey === 'upload_custom' ? UPLOADED_PRODUCT : null,
      });
    } else {
      showToast('✅ Prompt siap — salin & generate di AI image tool');
    }
  } catch (err) {
    console.error(err);
    showToast('❌ Error: ' + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = '⚡ GENERATE PROMPT + GAMBAR';
    }
  }
}

async function generateImageFromPrompt({ prompt, negative, aspectRatio, productImage, productImages }) {
  const slot = document.getElementById('genImageSlot');
  if (slot) {
    const count = productImages?.length || (productImage ? 1 : 0);
    slot.innerHTML = `<div class="gen-status-line">🖼️ Generating gambar dengan ${count} produk referensi...</div>`;
  }

  try {
    const body = {
      prompt,
      negative,
      aspectRatio: aspectRatio || '9:16',
      productCategory: detectProductCategory(document.getElementById('gen-product')?.value || 'perfume'),
    };
    // Send multiple images if available
    if (productImages?.length) {
      body.productImages = productImages.map(img => ({
        image: img.base64,
        mimeType: img.mimeType || 'image/jpeg',
        label: img.label || 'produk',
      }));
    } else if (productImage?.base64) {
      body.productImage = productImage.base64;
      body.productMimeType = productImage.mimeType || 'image/jpeg';
    }

    const res = await fetch('/api/image-generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!res.ok || !data.success || !data.imageBase64) {
      const errMsg = data.error || data.detail || 'unknown';
      const hint = data.hint || '';
      if (slot) {
        slot.innerHTML = `<div class="gen-status-line err">⚠️ Generate gambar gagal: ${escapeHtml(errMsg)}${hint ? `<br><small>${escapeHtml(hint)}</small>` : ''}<br><small>Prompt + Negative tetap siap disalin di atas.</small></div>`;
      }
      showToast(String(errMsg).includes('429') || String(errMsg).toLowerCase().includes('quota')
        ? '⚠️ Quota image Gemini habis — prompt tetap OK'
        : '⚠️ Prompt OK, gambar gagal');
      return;
    }

    LAST_IMAGE_DATAURL = `data:${data.mimeType || 'image/png'};base64,${data.imageBase64}`;
    if (slot) {
      slot.innerHTML = `
        <div class="gen-result-image-wrap">
          <div class="gen-section-label">GENERATED IMAGE</div>
          <img class="gen-result-image" src="${LAST_IMAGE_DATAURL}" alt="Generated ad image">
          <div class="gen-image-actions">
            <button class="gen-copy-btn primary" onclick="downloadLastImage()">⬇️ Unduh Gambar</button>
            <button class="gen-copy-btn" onclick="copyPromptOnly()">📋 Salin Prompt + Negative</button>
          </div>
          <div class="gen-status-line ok">✅ Model: ${escapeHtml(data.model || 'gemini-image')}</div>
        </div>`;
    }
    // refresh copy bar with download button
    const bar = document.querySelector('.gen-copy-bar');
    if (bar) bar.outerHTML = buildCopyBar();
    showToast('✅ Prompt + gambar siap');
  } catch (err) {
    if (slot) {
      slot.innerHTML = `<div class="gen-status-line err">⚠️ Generate gambar error: ${escapeHtml(err.message)}</div>`;
    }
    showToast('⚠️ Prompt OK, gambar error');
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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
// GENDER + OUTPUT TYPE HANDLERS
// ===================================================================
function updatePoseByGender() {
  const gender = document.getElementById('gen-gender')?.value || 'female';
  const characterSelect = document.getElementById('gen-character');
  if (characterSelect) {
    characterSelect.value = gender === 'male' ? 'areka_guy' : 'areka_girl';
  }
  // Toast not needed, silent update
}

function onOutputTypeChange() {
  const type = document.getElementById('gen-output-type')?.value || 'image';
  const videoLen = document.getElementById('gen-video-length');
  const sceneDescBox = document.getElementById('gen-scene-desc-box');
  if (videoLen) {
    videoLen.style.display = type === 'video' ? 'inline-block' : 'none';
  }
  if (sceneDescBox) {
    sceneDescBox.style.display = type === '4scene' ? 'block' : 'none';
  }
  const generateBtn = document.querySelector('.gen-generate-btn');
  if (generateBtn) {
    if (type === 'video') generateBtn.textContent = '🎬 GENERATE VIDEO PROMPT';
    else if (type === '4scene') generateBtn.textContent = '🎬 GENERATE 4-SCENE CAMPAIGN';
    else generateBtn.textContent = '⚡ GENERATE PROMPT + GAMBAR';
  }
}

// Handle seed from user input
function updateSeedFromInput() {
  const seedInput = document.getElementById('gen-char-seed');
  if (seedInput) {
    const val = parseInt(seedInput.value);
    if (!isNaN(val) && val >= 0) {
      CHAR_SEED = val;
    }
  }
}

function onNewSeedClick() {
  generateNewSeed();
  const seedInput = document.getElementById('gen-char-seed');
  if (seedInput) {
    seedInput.value = CHAR_SEED;
  }
}

// ===================================================================
// INIT
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Default to generator view
  switchPanel('generator');
  onProductModeChange();
  updatePoseByGender();
  onOutputTypeChange();

  // Seed controls
  const newSeedBtn = document.getElementById('gen-new-seed');
  if (newSeedBtn) newSeedBtn.addEventListener('click', onNewSeedClick);
  const seedInput = document.getElementById('gen-char-seed');
  if (seedInput) seedInput.addEventListener('change', updateSeedFromInput);
});
