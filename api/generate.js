// Gemini Vision API — Image → Detailed Prompt Generator
// TikTok Affiliate — Generate konsisten karakter dari gambar

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { image, mimeType, faceImage, faceMimeType, options, model } = req.body;
    if (!image) return res.status(400).json({ error: 'Image required' });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Gemini API key not configured' });

    // Build system prompt dari dropdown user
    const customParams = buildCustomParams(options || {});
    
    const systemPrompt = `Anda adalah asisten AI ahli untuk AREKA OFFICIAL STORE — buat prompt gambar parfum untuk TikTok Affiliate.

Tugas Anda: analisis gambar yang diberikan, lalu buat:
1. **Prompt Gambar** untuk AI Image Generator (Midjourney, Stable Diffusion, Dall-E, Gemini, Leonardo AI)
2. **Prompt Video** untuk AI Video Generator (Gemini Video, Veo 3, Runway, Kling, Pika, Sora)

# MASTER CHARACTER DNA — AREKA_GIRL_001 (WAJIB DIIKUTI)
Karakter ini HARUS digunakan di semua prompt. JANGAN UBAH fitur berikut:
- Wanita Indonesia, 25 tahun
- Wajah oval lembut, rahang gentle, dagu rounded
- Kulit sawo matang hangat (warm light beige Indonesian complexion)
- Mata almon cokelat gelap, ekspresi hangat ramah
- Alis gelap kehitaman, tebal sedang, lengkungan natural
- Hidung mancung proporsional, ujung rounded
- Bibir pink natural, medium fullness, cupid's bow jelas
- Rambut hitam natural, panjang lurus sampai bahu, belah samping, tanpa poni
- Makeup natural beauty: soft matte, blush pink, brown eyeliner, neutral eyeshadow, nude pink lipstick
- Tinggi 160 cm, body slim, proporsi feminin natural
- Pakaian: minimalist fitted black short sleeve top, tanpa logo, minimal jewelry

# SCENE (tetap)
Luxury perfume boutique, glass display counter, warm wood shelves, warm LED lighting, neat perfume bottle arrangement, bright premium interior.

# FORMAT OUTPUT — WAJIB:
## 📸 Prompt Gambar
[Paragraf panjang dalam bahasa Inggris — prompt siap copy paste. Minimal 200 kata. Include: AREKA_GIRL_001 character description, scene description, lighting, camera 9:16 portrait 85mm, brand banner AREKA OFFICIAL STORE di bawah]

### ✨ Detail Breakdown
Detail deskripsi karakter, scene, produk, pose dalam format naratif.

## 🎬 Prompt Video
[Short cinematic prompt bahasa Inggris untuk TikTok, 9:16, 5-10 detik]

# RULES:
- **WAJIB** gunakan AREKA_GIRL_001 sebagai karakter — jangan ganti dengan orang lain
- Produk parfum HARUS dipegang/ditampilkan di frame
- Output PARAGRAF (bukan JSON)
- Prompt gambar minimal 200 kata
- Aspect ratio WAJIB 9:16 vertical portrait
- Sertakan "AREKA OFFICIAL STORE 🛒 Cek Keranjang Kuning" banner di prompt
- Gaya: luxury commercial, warm premium, photorealistic, 8K
- Jangan tambah item pakaian yang tidak terlihat di gambar
- NEGATIVE PROMPT: different person, plastic skin, anime, cartoon, extra fingers, watermark, logo, low resolution

${customParams}`;

    // Build parts array — main image always
    const parts = [
      { text: systemPrompt },
      {
        inline_data: {
          mime_type: mimeType || 'image/jpeg',
          data: image
        }
      }
    ];

    // If face reference image is provided, add as second image
    if (faceImage) {
      parts.push({
        text: "Referensi detail wajah/kepala — analisis fitur wajah secara detail: bentuk wajah, mata, hidung, mulut, alis, rahang, struktur tulang wajah, kulit, dan detail lainnya. Gunakan informasi ini untuk memperkaya bagian 'Detail Fitur Wajah' dan detail rambut pada output."
      });
      parts.push({
        inline_data: {
          mime_type: faceMimeType || 'image/jpeg',
          data: faceImage
        }
      });
    }

    const payload = {
      contents: [{ parts }],
      generationConfig: {
        temperature: 0.4,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048
      }
    };

    // Determine model from request (frontend selector) or default
    const selectedModel = model || 'gemini-3.5-flash-lite';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      console.error('Gemini error:', err);
      return res.status(502).json({ error: 'Gemini API error', detail: err });
    }

    const data = await geminiRes.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Parse JSON from response
    let parsed;
    try {
      // Coba extract JSON dari markdown
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[1]);
      } else {
        // Fallback: parse markdown saja
        parsed = { raw: text };
      }
    } catch {
      parsed = { raw: text };
    }

    res.json({
      success: true,
      prompt: parsed,
      raw: text,
      usage: data?.usageMetadata || {}
    });

  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).json({ error: err.message });
  }
}

function buildCustomParams(options) {
  const parts = [];
  if (options.gender) parts.push(`- Gender: ${options.gender}`);
  if (options.expression) parts.push(`- Ekspresi: ${options.expression}`);
  if (options.pose) parts.push(`- Pose: ${options.pose}`);
  if (options.shotType) parts.push(`- Shot Type: ${options.shotType}`);
  if (options.cameraAngle) parts.push(`- Camera Angle: ${options.cameraAngle}`);
  if (options.background) parts.push(`- Background/Lokasi: ${options.background}`);
  if (options.artStyle) parts.push(`- Art Style: ${options.artStyle}`);
  if (options.lighting) parts.push(`- Lighting: ${options.lighting}`);
  if (options.colorTone) parts.push(`- Color Tone: ${options.colorTone}`);
  if (options.hairStyle) parts.push(`- Gaya Rambut: ${options.hairStyle}`);
  if (options.clothing) parts.push(`- Pakaian Atasan: ${options.clothing}`);
  if (options.bottoms) parts.push(`- Bawahan: ${options.bottoms}`);
  if (options.accessories) parts.push(`- Aksesoris: ${options.accessories}`);
  if (options.mood) parts.push(`- Mood/Suasana: ${options.mood}`);
  if (options.activity) parts.push(`- Aktivitas/Adegan: ${options.activity}`);
  if (options.timeOfDay) parts.push(`- Waktu: ${options.timeOfDay}`);
  if (options.ethnicity) parts.push(`- Etnis/Kulit: ${options.ethnicity}`);
  if (options.bodyType) parts.push(`- Body Type: ${options.bodyType}`);
  if (options.age) parts.push(`- Rentang Usia: ${options.age}`);
  if (options.extraDetails) parts.push(`- Detail Tambahan: ${options.extraDetails}`);

  if (parts.length === 0) return '';

  return `\n# PILIHAN USER (WAJIB DIUTAMAKAN):\n${parts.join('\n')}`;
}
