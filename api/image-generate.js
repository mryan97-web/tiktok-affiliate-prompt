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

    const attempts = [];

    // 1) Gemini native image models (generateContent + responseModalities IMAGE)
    // Ordered: cheapest/lightest first to reduce 429 risk
    const geminiImageModels = [
      'gemini-3.1-flash-lite-image',
      'gemini-2.5-flash-image',
      'gemini-3.1-flash-image',
      'gemini-3.1-flash-image-preview',
      'gemini-3-pro-image',
      'gemini-3-pro-image-preview',
      'nano-banana-pro-preview',
    ];

    for (const model of geminiImageModels) {
      const result = await tryGeminiImageModel({
        apiKey,
        model,
        fullPrompt,
        productImage,
        productMimeType,
        aspectRatio,
      });
      attempts.push({ model, ...result.meta });
      if (result.ok) {
        return res.json({
          success: true,
          model,
          mimeType: result.image.mimeType,
          imageBase64: result.image.data,
          text: result.text || '',
          attempts,
        });
      }
      // if hard not-found, skip; if quota, still try next lighter/heavier
    }

    // 2) Imagen predict API (text-only; no product reference image)
    if (!productImage) {
      const imagenModels = [
        'imagen-4.0-fast-generate-001',
        'imagen-4.0-generate-001',
      ];
      for (const model of imagenModels) {
        const result = await tryImagenPredict({
          apiKey,
          model,
          prompt: fullPrompt,
          aspectRatio,
        });
        attempts.push({ model, ...result.meta });
        if (result.ok) {
          return res.json({
            success: true,
            model,
            mimeType: result.image.mimeType,
            imageBase64: result.image.data,
            text: '',
            attempts,
          });
        }
      }
    }

    const quotaHit = attempts.some((a) => a.status === 429);
    const detail = attempts
      .map((a) => `${a.model}:${a.status}${a.msg ? `(${a.msg})` : ''}`)
      .join(' | ');

    return res.status(502).json({
      error: quotaHit
        ? 'Quota image Gemini habis (429). Prompt tetap bisa disalin.'
        : 'Image generation failed',
      detail,
      attempts,
      hint: quotaHit
        ? 'Tunggu reset quota harian / naikkan billing Google AI Studio, atau uncheck auto-generate dan generate di Gemini/ChatGPT manual pakai prompt yang sudah disalin.'
        : 'Cek model image + API key Google AI Studio.',
    });
  } catch (err) {
    console.error('image-generate error:', err);
    return res.status(500).json({ error: err.message });
  }
}

async function tryGeminiImageModel({
  apiKey,
  model,
  fullPrompt,
  productImage,
  productMimeType,
  aspectRatio,
}) {
  try {
    const parts = [{ text: fullPrompt }];
    if (productImage) {
      parts.push({
        inline_data: {
          mime_type: productMimeType || 'image/jpeg',
          data: productImage,
        },
      });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts }],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    };

    // Only attach imageConfig when aspect ratio is common-supported
    const ar = normalizeAspect(aspectRatio);
    if (ar) payload.generationConfig.imageConfig = { aspectRatio: ar };

    let geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    let raw = await geminiRes.text();

    // Retry without imageConfig if rejected
    if (!geminiRes.ok && (raw.includes('imageConfig') || raw.includes('aspectRatio'))) {
      delete payload.generationConfig.imageConfig;
      geminiRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      raw = await geminiRes.text();
    }

    if (!geminiRes.ok) {
      return {
        ok: false,
        meta: {
          status: geminiRes.status,
          msg: shortErr(raw),
        },
      };
    }

    const data = JSON.parse(raw);
    const image = extractImage(data);
    if (!image) {
      return {
        ok: false,
        meta: {
          status: 200,
          msg: 'no_image_in_response',
        },
      };
    }

    return {
      ok: true,
      image,
      text: extractText(data),
      meta: { status: 200, msg: 'ok' },
    };
  } catch (e) {
    return { ok: false, meta: { status: 'err', msg: e.message } };
  }
}

async function tryImagenPredict({ apiKey, model, prompt, aspectRatio }) {
  try {
    // Imagen uses :predict not :generateContent
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict?key=${apiKey}`;
    const ar = normalizeAspect(aspectRatio) || '9:16';
    const payload = {
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: ar,
      },
    };
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const raw = await r.text();
    if (!r.ok) {
      return { ok: false, meta: { status: r.status, msg: shortErr(raw) } };
    }
    const data = JSON.parse(raw);
    const pred = data?.predictions?.[0] || {};
    const b64 = pred.bytesBase64Encoded || pred.image?.bytesBase64Encoded;
    if (!b64) {
      return { ok: false, meta: { status: 200, msg: 'no_image_in_response' } };
    }
    return {
      ok: true,
      image: {
        data: b64,
        mimeType: pred.mimeType || 'image/png',
      },
      meta: { status: 200, msg: 'ok' },
    };
  } catch (e) {
    return { ok: false, meta: { status: 'err', msg: e.message } };
  }
}

function normalizeAspect(ar) {
  if (!ar) return null;
  const allowed = new Set(['1:1', '3:4', '4:3', '9:16', '16:9']);
  return allowed.has(ar) ? ar : null;
}

function shortErr(raw) {
  try {
    const j = JSON.parse(raw);
    const msg = j?.error?.message || raw;
    return String(msg).slice(0, 120);
  } catch {
    return String(raw || '').slice(0, 120);
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
