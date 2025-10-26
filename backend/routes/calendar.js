const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const authRoutes = require('./auth');

// Get list of calendars
router.get('/list', async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'];
    const authClient = await authRoutes.getAuthClient(sessionId);

    if (!authClient) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const calendar = google.calendar({ version: 'v3', auth: authClient });
    const response = await calendar.calendarList.list();

    const calendars = response.data.items.map(cal => ({
      id: cal.id,
      summary: cal.summary,
      backgroundColor: cal.backgroundColor,
      primary: cal.primary || false
    }));

    res.json({ calendars });
  } catch (error) {
    console.error('Error fetching calendars:', error);
    res.status(500).json({ error: 'Failed to fetch calendars' });
  }
});

// Get events from a calendar (for duplicate detection)
router.get('/events/:calendarId', async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'];
    const authClient = await authRoutes.getAuthClient(sessionId);

    if (!authClient) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { calendarId } = req.params;
    const { timeMin, timeMax } = req.query;

    const calendar = google.calendar({ version: 'v3', auth: authClient });
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: timeMin || new Date().toISOString(),
      timeMax: timeMax,
      singleEvents: true,
      orderBy: 'startTime'
    });

    res.json({ events: response.data.items });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

module.exports = router;
