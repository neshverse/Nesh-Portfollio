import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Manually load .env.local since dotenv is not a dependency
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '.env.local');

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["'](.*)["']$/, '$1'); // Remove quotes
      process.env[key] = value;
    }
  });
  console.log('Loaded environment variables from .env.local');
} else {
  console.warn('Warning: .env.local file not found');
}

const PORT = process.env.PORT || 3001;


// Serve static files from the build directory
const distPath = path.resolve(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

app.post('/api/generateText', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Server missing GEMINI_API_KEY' });

  const { promptText, history = [] } = req.body;
  if (!promptText) return res.status(400).json({ error: 'Missing promptText' });

  // Use Gemini 2.0 Flash Experimental (Latest)
  const model = 'gemini-2.0-flash-exp';
  console.log('API Request for model:', model); // DEBUG LOG
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  try {
    // Construct payload for generateContent
    // If history is provided, we should format it correctly.
    // However, for simplicity and statelessness, we might just append context + prompt
    // Ideally user sends full history. Let's assume 'history' is array of {role, parts: [{text}]}.

    // Check if the user sent a specific structure or just text.
    // The service layer will send { promptText, history }

    // We need to inject the system instruction if it's not already there.
    // But allow the frontend to manage context if possible, OR inject it here.
    // Let's stick effectively to what the service sends.

    const contents = [...history];
    // Add the new user message if not already in history (it usually isn't in 'history' param from some clients)
    // But let's look at how we'll implement the service. Service will send everything needed.
    // Wait, the service sends `sendChatMessage(userMsg.text, history)` where history includes the new message?
    // Let's look at previous AIChat.tsx:
    // It constructed history from messages list.

    // Valid payload for generateContent:
    // { contents: [ { role: 'user'|'model', parts: [{text: ...}] } ], systemInstruction: ... }

    const payload = {
      contents: [
        ...history,
        { role: 'user', parts: [{ text: promptText }] }
      ]
    };

    // If we want system instruction, we can add it. 
    // Ideally we pass it from frontend or define it here.
    // Let's define it here or accept it from body. Let's accept it from body or default.
    if (req.body.systemInstruction) {
      payload.systemInstruction = { parts: [{ text: req.body.systemInstruction }] };
    }

    const r = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await r.json();

    if (data.error) {
      throw new Error(data.error.message || 'Gemini API Error');
    }

    // Extraction for generateContent
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      throw new Error('No content in response');
    }

    res.json({ text: responseText });
  } catch (err) {
    console.error('Proxy error:', err);

    // Check for Rate Limit / Quota error
    if (err.message.includes('Quota exceeded') || err.message.includes('429')) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please wait a minute and try again.' });
    }

    res.status(500).json({ error: err?.message || 'unknown error' });
  }
});

// Handle React routing, return all requests to React app
// This must be AFTER API routes
if (fs.existsSync(distPath)) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`API proxy listening on port ${PORT}`);
});
