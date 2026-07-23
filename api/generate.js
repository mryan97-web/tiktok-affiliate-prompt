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
    
    const systemPrompt = `Anda adalah asisten AI ahli dalam analisis gambar dan pembuatan prompt untuk AI gambar.
Tugas Anda: analisis gambar yang diberikan, lalu buat prompt terstruktur yang DETAIL dan LENGKAP sehingga AI gambar lain bisa MENGHASILKAN ULANG karakter/subjek yang SAMA PERSIS.

# FORMAT OUTPUT — WAJIB IKUTI STRUKTUR INI:
## 📸 Prompt Utama
[Prompt paragraf panjang yang detail — gabungan semua elemen di bawah dalam kalimat natural]

## ✨ Detail Prompt Breakdown

### 1. Gender & Demografi
### 2. Ekspresi Wajah
### 3. Pose & Gesture
### 4. Shot Type
### 5. Camera Angle
### 6. Background / Location  
### 7. Art Style
### 8. Lighting
### 9. Color Tone
### 10. Warna Dominan
### 11. Detail Pakaian & Aksesoris
### 12. Detail Rambut
### 13. Vibe / Mood / Suasana
### 14. Detail Fitur Wajah (mata, hidung, mulut, bentuk wajah, alis, rahang)

${customParams}

# RULES:
- Semua poin WAJIB diisi — jangan ada yang kosong
- Gunakan bahasa Indonesia campur English untuk istilah teknis (photography/AI terms dalam English)
- Semakin detail semakin bagus — sebut warna, tekstur, material, arah cahaya, angle lensa
- Ukuran prompt minimal 150 kata
- Untuk gender, ekspresi, pose, shot type, camera angle, background, art style, lighting — ikuti pilihan user jika ada
- Untuk Color Tone — utamakan pilihan user (Warm/Cool/Neutral/dll), deskripsikan dominasi warna
- Untuk Aspect Ratio — WAJIB **9:16 Portrait (vertical)** karena untuk TikTok. Tulis "vertical 9:16 portrait shot" di prompt utama
- Output dalam format JSON terstruktur`;

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
        maxOutputTokens: 1024
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
  if (options.clothing) parts.push(`- Pakaian: ${options.clothing}`);
  if (options.accessories) parts.push(`- Aksesoris: ${options.accessories}`);
  if (options.mood) parts.push(`- Mood/Suasana: ${options.mood}`);
  if (options.ethnicity) parts.push(`- Etnis/Kulit: ${options.ethnicity}`);
  if (options.bodyType) parts.push(`- Body Type: ${options.bodyType}`);
  if (options.age) parts.push(`- Rentang Usia: ${options.age}`);
  if (options.extraDetails) parts.push(`- Detail Tambahan: ${options.extraDetails}`);

  if (parts.length === 0) return '';

  return `\n# PILIHAN USER (WAJIB DIUTAMAKAN):\n${parts.join('\n')}`;
}
