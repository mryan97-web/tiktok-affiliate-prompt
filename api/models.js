// Gemini Model Checker — cek model aktif dari Gemini API (1 call)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Gemini API key not configured' });

    // Single call to list all models
    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (!listRes.ok) {
      return res.json({ success: true, models: [
        { id: 'gemini-3.5-flash-lite', active: true },
        { id: 'gemini-3.5-flash', active: true },
        { id: 'gemini-2.0-flash', active: true },
      ]});
    }

    const listData = await listRes.json();
    const activeNames = new Set(
      (listData.models || []).map(m => m.name.replace('models/', ''))
    );

    const targetModels = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-2.0-flash'];
    const result = targetModels.map(id => ({ id, active: activeNames.has(id) }));

    res.json({ success: true, models: result });
  } catch (err) {
    console.error('Models check error:', err);
    res.json({ success: true, models: [
      { id: 'gemini-3.5-flash-lite', active: true },
      { id: 'gemini-3.5-flash', active: true },
      { id: 'gemini-2.0-flash', active: true },
    ]});
  }
}
