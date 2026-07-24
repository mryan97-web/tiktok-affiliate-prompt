// Temporary probe: list Gemini models that look image-capable
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'no key' });

    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    const data = await listRes.json();
    const models = (data.models || []).map((m) => ({
      name: (m.name || '').replace('models/', ''),
      methods: m.supportedGenerationMethods || [],
      desc: m.description || '',
    }));

    const imageish = models.filter((m) => {
      const n = m.name.toLowerCase();
      return (
        n.includes('image') ||
        n.includes('imagen') ||
        n.includes('nano') ||
        (m.desc || '').toLowerCase().includes('image generation')
      );
    });

    // Probe a few likely image models with a tiny generate call
    const candidates = [
      ...imageish.map((m) => m.name),
      'gemini-2.5-flash-image',
      'gemini-2.5-flash-image-preview',
      'gemini-2.0-flash-preview-image-generation',
      'gemini-2.0-flash-exp-image-generation',
      'imagen-3.0-generate-002',
      'imagen-4.0-generate-001',
      'gemini-3-pro-image-preview',
      'gemini-3.1-flash-image-preview',
    ];
    const unique = [...new Set(candidates)];

    const probes = [];
    for (const id of unique.slice(0, 20)) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${id}:generateContent?key=${apiKey}`;
        const r = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'tiny red square product photo' }] }],
            generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
          }),
        });
        const t = await r.text();
        let hasImage = false;
        try {
          const j = JSON.parse(t);
          const parts = j?.candidates?.[0]?.content?.parts || [];
          hasImage = parts.some((p) => p.inlineData || p.inline_data);
        } catch {}
        probes.push({
          id,
          status: r.status,
          hasImage,
          snippet: t.slice(0, 180),
        });
      } catch (e) {
        probes.push({ id, status: 'err', error: e.message });
      }
    }

    return res.json({ success: true, imageish, probes });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
