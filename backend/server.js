require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('api online'));

/**
 * POST /api/measurement
 * Body: { senseBoxId, sensorId, value }
 * Proxies to: POST https://api.opensensemap.org/boxes/:senseBoxId/data/:sensorId
 */
app.post('/api/measurement', async (req, res) => {
  const { senseBoxId, sensorId, value } = req.body;

  if (!senseBoxId || !sensorId || value === undefined || value === null) {
    return res.status(400).json({ error: 'senseBoxId, sensorId, and value are required' });
  }

  const url = `https://api.opensensemap.org/boxes/${senseBoxId}/data/${sensorId}`;

  const headers = { 'Content-Type': 'application/json' };
  if (process.env.SENSEBOX_TOKEN) {
    headers['Authorization'] = process.env.SENSEBOX_TOKEN;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ value: String(value) }),
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
