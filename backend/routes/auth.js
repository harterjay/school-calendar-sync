const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const { kv } = require('@vercel/kv');

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Session configuration
const SESSION_PREFIX = 'session:';
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days in seconds

// Generate auth URL
router.get('/google', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.events'
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });

  res.redirect(authUrl);
});

// OAuth callback
router.get('/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Generate secure session ID
    const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Store session in Vercel KV with TTL
    await kv.set(`${SESSION_PREFIX}${sessionId}`, JSON.stringify(tokens), {
      ex: SESSION_TTL
    });

    // Redirect to frontend with session
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}?session=${sessionId}`);
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).send('Authentication failed');
  }
});

// Check auth status
router.get('/status', async (req, res) => {
  const sessionId = req.headers['x-session-id'];

  if (!sessionId) {
    return res.json({ authenticated: false });
  }

  try {
    const tokens = await kv.get(`${SESSION_PREFIX}${sessionId}`);
    res.json({ authenticated: !!tokens });
  } catch (error) {
    console.error('Error checking session:', error);
    res.json({ authenticated: false });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  const sessionId = req.headers['x-session-id'];

  if (sessionId) {
    try {
      await kv.del(`${SESSION_PREFIX}${sessionId}`);
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  }

  res.json({ success: true });
});

// Middleware to get authenticated client
router.getAuthClient = async (sessionId) => {
  if (!sessionId) {
    return null;
  }

  try {
    const tokensJson = await kv.get(`${SESSION_PREFIX}${sessionId}`);
    if (!tokensJson) {
      return null;
    }

    const tokens = typeof tokensJson === 'string' ? JSON.parse(tokensJson) : tokensJson;

    const client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    client.setCredentials(tokens);
    return client;
  } catch (error) {
    console.error('Error getting auth client:', error);
    return null;
  }
};

module.exports = router;
