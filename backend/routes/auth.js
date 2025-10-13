const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Store for session tokens (in production, use Redis or database)
const sessions = new Map();

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

    // Generate session ID (in production, use secure session management)
    const sessionId = Date.now().toString();
    sessions.set(sessionId, tokens);

    // Redirect to frontend with session
    res.redirect(`http://localhost:3000?session=${sessionId}`);
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).send('Authentication failed');
  }
});

// Check auth status
router.get('/status', (req, res) => {
  const sessionId = req.headers['x-session-id'];

  if (!sessionId || !sessions.has(sessionId)) {
    return res.json({ authenticated: false });
  }

  res.json({ authenticated: true });
});

// Logout
router.post('/logout', (req, res) => {
  const sessionId = req.headers['x-session-id'];

  if (sessionId && sessions.has(sessionId)) {
    sessions.delete(sessionId);
  }

  res.json({ success: true });
});

// Middleware to get authenticated client
router.getAuthClient = (sessionId) => {
  const tokens = sessions.get(sessionId);
  if (!tokens) {
    return null;
  }

  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  client.setCredentials(tokens);
  return client;
};

module.exports = router;
