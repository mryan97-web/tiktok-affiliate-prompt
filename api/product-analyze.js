// Analyze uploaded product photo → product description for prompt
// Auto-detects: apparel (kaos/jaket/hoodie) vs perfume vs other
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { image, mimeType } = req.body || {};
    if (!image) return res.status(400).json({ error: 'Image required' });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Gemini API key not configured' });

    const systemPrompt = `You analyze ANY product photo for AI image generation ads.
First, identify what TYPE of product this is (apparel/kaos, perfume, skincare, etc).

If it's APPAREL (t-shirt, kaos, hoodie, jaket, kemeja, tank top, etc):
Return ONLY a single English description line about: fabric type, color, neckline style (crew neck/v-neck/oxford), sleeve type (short/long/raglan), fit (oversized/regular/slim), any print/text/graphic design on it, texture, hem style. Max 45 words.

If it's PERFUME / FRAGRANCE:
Return ONLY a single English description line about: bottle shape, glass color, liquid color, cap style, label style, packaging. Max 45 words.

If it's OTHER (skincare, accessories, etc):
Return ONLY a single English description line describing: shape, color, material, packaging, size feel. Max 45 words.

Do NOT mention people, hands, rooms, or backgrounds. Do NOT invent brand names unless clearly visible. No markdown. No quotes. No prefix labels. Max 45 words.`;

    const models = [
      'gemini-2.0-flash',
      'gemini-2.0-flash-lite',
      'gemini-2.5-flash',
      'gemini-3.5-flash-lite',
    ];

    let text = '';
    let usedModel = '';
    let lastErr = '';

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const geminiRes = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: systemPrompt },
                {
                  inline_data: {
                    mime_type: mimeType || 'image/jpeg',
                    data: image,
                  },
                },
              ],
            }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 180,
            },
          }),
        });

        if (!geminiRes.ok) {
          lastErr = await geminiRes.text();
          continue;
        }

        const data = await geminiRes.json();
        text = (data?.candidates?.[0]?.content?.parts || [])
          .map((p) => p.text || '')
          .join(' ')
          .trim();
        if (text) {
          usedModel = model;
          break;
        }
      } catch (e) {
        lastErr = e.message;
      }
    }

    if (!text) {
      return res.status(502).json({ error: 'Product analysis failed', detail: lastErr });
    }

    // cleanup model fluff
    text = text
      .replace(/^["'`]+|["'`]+$/g, '')
      .replace(/^(product description|description)\s*[:\-]\s*/i, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Detect product category from description
    const lower = text.toLowerCase();
    let category = 'other';
    if (lower.includes('shirt') || lower.includes('t-shirt') || lower.includes('kaos') ||
        lower.includes('hoodie') || lower.includes('jaket') || lower.includes('jacket') ||
        lower.includes('kemeja') || lower.includes('apparel') || lower.includes('fabric') ||
        lower.includes('neckline') || lower.includes('sleeve') || lower.includes('oversized') ||
        lower.includes('cotton') || lower.includes('polyester')) {
      category = 'apparel';
    } else if (lower.includes('bottle') || lower.includes('perfume') || lower.includes('fragrance') ||
               lower.includes('parfum') || lower.includes('glass') || lower.includes('liquid') ||
               lower.includes('cap') || lower.includes('spray')) {
      category = 'perfume';
    }

    return res.json({
      success: true,
      description: text,
      category: category,
      model: usedModel,
    });
  } catch (err) {
    console.error('product-analyze error:', err);
    return res.status(500).json({ error: err.message });
  }
}
