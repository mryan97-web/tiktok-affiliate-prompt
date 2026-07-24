// Generate final ad image from prompt (+ optional product reference image)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const {
      prompt,
      negative,
      productImage,
      productMimeType,
      aspectRatio = '9:16',
    } = req.body || {};

    if (!prompt) return res.status(400).json({ error: 'Prompt required' });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Gemini API key not configured' });

    const fullPrompt = [
      prompt,
      negative ? `Avoid: ${negative}` : '',
      productImage
        ? 'Use the attached product photo as the EXACT product reference. Match bottle shape, color, liquid, cap, and label style as closely as possible. Do not invent a different perfume bottle.'
        : '',
      'Photorealistic commercial photography. Keep the same consistent woman AREKA_GIRL_001. Natural anatomy, clean hands, readable product label facing camera when visible.',
    ].filter(Boolean).join('\n\n');

    const parts = [{ text: fullPrompt }];
    if (productImage) {
      parts.push({
        inline_data: {
          mime_type: productMimeType || 'image/jpeg',
          data: productImage,
        },
      });
    }

    const models = [
      'gemini-2.0-flash-preview-image-generation',
      'gemini-2.0-flash-exp-image-generation',
      'gemini-2.5-flash-image',
      'gemini-2.0-flash-exp',
    ];

    let lastErr = '';
    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const payload = {
          contents: [{ parts }],
          generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
            temperature: 0.7,
          },
        };

        // Some models accept imageConfig; ignore if rejected by model
        if (aspectRatio) {
          payload.generationConfig.imageConfig = { aspectRatio };
        }

        const geminiRes = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const raw = await geminiRes.text();
        if (!geminiRes.ok) {
          lastErr = raw;
          // retry without imageConfig if aspect ratio unsupported
          if (raw.includes('imageConfig') || raw.includes('aspectRatio')) {
            delete payload.generationConfig.imageConfig;
            const retryRes = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
            const retryRaw = await retryRes.text();
            if (!retryRes.ok) {
              lastErr = retryRaw;
              continue;
            }
            const retryData = JSON.parse(retryRaw);
            const image = extractImage(retryData);
            if (image) {
              return res.json({
                success: true,
                model,
                mimeType: image.mimeType,
                imageBase64: image.data,
                text: extractText(retryData),
              });
            }
            lastErr = 'No image in response';
            continue;
          }
          continue;
        }

        const data = JSON.parse(raw);
        const image = extractImage(data);
        if (image) {
          return res.json({
            success: true,
            model,
            mimeType: image.mimeType,
            imageBase64: image.data,
            text: extractText(data),
          });
        }
        lastErr = 'No image in response: ' + raw.slice(0, 400);
      } catch (e) {
        lastErr = e.message;
      }
    }

    return res.status(502).json({
      error: 'Image generation failed',
      detail: lastErr,
      hint: 'Gemini image model may be unavailable on this API key. Prompt is still ready to copy.',
    });
  } catch (err) {
    console.error('image-generate error:', err);
    return res.status(500).json({ error: err.message });
  }
}

function extractImage(data) {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  for (const p of parts) {
    const inline = p.inlineData || p.inline_data;
    if (inline?.data) {
      return {
        data: inline.data,
        mimeType: inline.mimeType || inline.mime_type || 'image/png',
      };
    }
  }
  return null;
}

function extractText(data) {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  return parts.map((p) => p.text || '').filter(Boolean).join('\n').trim();
}
