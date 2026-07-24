// Analyze uploaded product photo → English product description for prompt assembly
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

    const systemPrompt = `You analyze product photos for perfume / fragrance affiliate ads.
Return ONLY a single English product description line for AI image generation.
Focus on: bottle shape, glass color, liquid color, cap style, label style, packaging, materials, size feel.
Do NOT invent brand names unless clearly visible on the product.
Do NOT describe people, faces, hands, rooms, or lifestyle scenes.
Max 45 words. No markdown. No quotes. No prefix labels.`;

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

    return res.json({
      success: true,
      description: text,
      model: usedModel,
    });
  } catch (err) {
    console.error('product-analyze error:', err);
    return res.status(500).json({ error: err.message });
  }
}
