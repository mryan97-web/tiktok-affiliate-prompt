// Gemini Model Checker — cek model aktif & support generateContent
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Gemini API key not configured' });

    // Target models yang mau dicek
    const targetModels = [
      'gemini-3.5-flash-lite',
      'gemini-3.5-flash',
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-2.0-flash-lite',
      'gemini-3-pro-preview',
      'gemini-3-flash-preview',
    ];

    // Fetch list model dari Gemini
    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (!listRes.ok) {
      // Fallback: cek satu-satu pake lightweight ping
      return await checkOneByOne(apiKey, targetModels, res);
    }

    const listData = await listRes.json();
    const availableModels = (listData.models || []).map(m => m.name.replace('models/', ''));

    // Filter target yang ada di list
    const result = targetModels.map(name => ({
      id: name,
      active: availableModels.includes(name)
    }));

    // Double check: coba panggil generateContent dengan prompt kosong
    // untuk model yang aktif di list
    const checked = await Promise.all(result.map(async (m) => {
      if (!m.active) return m;
      try {
        const testRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${m.id}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: 'Hi' }]
              }],
              generationConfig: { maxOutputTokens: 10 }
            })
          }
        );
        return { ...m, active: testRes.ok };
      } catch {
        return { ...m, active: false };
      }
    }));

    res.json({ success: true, models: checked });
  } catch (err) {
    console.error('Models check error:', err);
    res.status(500).json({ error: err.message });
  }
}

async function checkOneByOne(apiKey, models, res) {
  const checked = await Promise.all(models.map(async (name) => {
    try {
      const testRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${name}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Hi' }] }],
            generationConfig: { maxOutputTokens: 10 }
          })
        }
      );
      return { id: name, active: testRes.ok };
    } catch {
      return { id: name, active: false };
    }
  }));
  res.json({ success: true, models: checked });
}
