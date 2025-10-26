const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const authRoutes = require('./auth');
const parserService = require('../services/parser');
const duplicateDetector = require('../services/duplicateDetector');

// Parse text input
router.post('/parse', async (req, res) => {
  try {
    const { text, childName } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text input is required' });
    }

    const events = await parserService.parseText(text, childName);

    res.json({
      success: true,
      events,
      count: events.length
    });
  } catch (error) {
    console.error('Error parsing text:', error);
    res.status(500).json({ error: 'Failed to parse text' });
  }
});

// Check for duplicates without creating events
router.post('/check-duplicates', async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'];
    const authClient = authRoutes.getAuthClient(sessionId);

    if (!authClient) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { calendarId, events } = req.body;

    if (!calendarId || !events || !Array.isArray(events)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    const calendar = google.calendar({ version: 'v3', auth: authClient });

    // Fetch existing events from the calendar
    const existingEvents = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      timeMax: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year ahead
      singleEvents: true
    });

    // Check each event for duplicates and add isDuplicate flag
    const eventsWithDuplicateStatus = events.map(event => {
      const isDuplicate = duplicateDetector.checkDuplicate(
        event,
        existingEvents.data.items
      );

      return {
        ...event,
        isDuplicate
      };
    });

    res.json({
      success: true,
      events: eventsWithDuplicateStatus,
      duplicateCount: eventsWithDuplicateStatus.filter(e => e.isDuplicate).length
    });
  } catch (error) {
    console.error('Error checking duplicates:', error);
    res.status(500).json({ error: 'Failed to check duplicates' });
  }
});

// Create events in calendar
router.post('/create', async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'];
    const authClient = authRoutes.getAuthClient(sessionId);

    if (!authClient) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { calendarId, events } = req.body;

    if (!calendarId || !events || !Array.isArray(events)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    const calendar = google.calendar({ version: 'v3', auth: authClient });
    const createdEvents = [];
    const errors = [];

    // Check for duplicates first
    const existingEvents = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      timeMax: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year ahead
      singleEvents: true
    });

    for (const event of events) {
      try {
        // Check for duplicates
        const isDuplicate = duplicateDetector.checkDuplicate(
          event,
          existingEvents.data.items
        );

        if (isDuplicate && !event.forceCreate) {
          errors.push({
            event: event.title,
            error: 'Duplicate event detected'
          });
          continue;
        }

        // Format event for Google Calendar API
        const calendarEvent = {
          summary: event.title,
          description: event.description || '',
          location: event.location || '',
          start: event.allDay
            ? { date: event.startDate }
            : { dateTime: event.startDateTime, timeZone: 'America/New_York' },
          end: event.allDay
            ? { date: event.endDate }
            : { dateTime: event.endDateTime, timeZone: 'America/New_York' },
          reminders: {
            useDefault: false,
            overrides: event.reminders || []
          },
          extendedProperties: {
            private: {
              schoolCalendarSync: 'true',
              childName: event.childName || '',
              eventType: event.eventType || 'event'
            }
          }
        };

        const response = await calendar.events.insert({
          calendarId: calendarId,
          resource: calendarEvent
        });

        createdEvents.push(response.data);
      } catch (error) {
        console.error('Error creating event:', error);
        errors.push({
          event: event.title,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      created: createdEvents.length,
      events: createdEvents,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('Error creating events:', error);
    res.status(500).json({ error: 'Failed to create events' });
  }
});

module.exports = router;
