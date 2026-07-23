// Gemini Model Checker — cek model aktif + quota real-time
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Gemini API key not configured' });

    const targetModels = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-2.0-flash'];

    // Step 1: listModels — cek model terdaftar
    let registered = new Set();
    try {
      const listRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (listRes.ok) {
        const listData = await listRes.json();
        (listData.models || []).forEach(m => registered.add(m.name.replace('models/', '')));
      }
    } catch {}

    // Step 2: ping real — cek quota & status realtime (parallel)
    const results = await Promise.all(targetModels.map(async (id) => {
      const listed = registered.has(id);
      let pingStatus = 'untested';
      let quotaOk = false;

      try {
        const pingRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${id}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: 'Hi' }] }],
              generationConfig: { maxOutputTokens: 5 }
            })
          }
        );

        if (pingRes.ok) {
          pingStatus = 'active';
          quotaOk = true;
        } else if (pingRes.status === 429) {
          pingStatus = 'quota_exhausted';
          quotaOk = false;
        } else if (pingRes.status === 404) {
          pingStatus = 'not_found';
          quotaOk = false;
        } else {
          pingStatus = 'error';
          quotaOk = false;
        }
      } catch {
        pingStatus = 'unreachable';
      }

      // Final status
      let status;
      if (pingStatus === 'active') status = 'active';
      else if (pingStatus === 'quota_exhausted') status = 'quota_exhausted';
      else if (listed) status = 'listed_no_quota';
      else status = 'unavailable';

      return { id, status, listed, pingStatus, quotaOk };
    }));

    res.json({ success: true, models: results });
  } catch (err) {
    console.error('Models check error:', err);
    res.status(500).json({ error: err.message });
  }
}
