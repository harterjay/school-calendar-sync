import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { google } from 'googleapis';
const duplicateDetector = require('@/lib/services/duplicateDetector');

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { calendarId, events } = await request.json();

    if (!calendarId || !events || !Array.isArray(events)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Set up Google Calendar API client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const createdEvents = [];
    const errors = [];

    // Check for duplicates first
    const existingEvents = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      timeMax: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
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
          requestBody: calendarEvent
        });

        createdEvents.push(response.data);
      } catch (error: any) {
        console.error('Error creating event:', error);
        errors.push({
          event: event.title,
          error: error.message
        });
      }
    }

    return NextResponse.json({
      success: true,
      created: createdEvents.length,
      events: createdEvents,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('Error creating events:', error);
    return NextResponse.json(
      { error: 'Failed to create events' },
      { status: 500 }
    );
  }
}
