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

    // Fetch existing events from the calendar
    const existingEvents = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      timeMax: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      singleEvents: true
    });

    // Check each event for duplicates and add isDuplicate flag
    const eventsWithDuplicateStatus = events.map((event: any) => {
      const isDuplicate = duplicateDetector.checkDuplicate(
        event,
        existingEvents.data.items
      );

      return {
        ...event,
        isDuplicate
      };
    });

    return NextResponse.json({
      success: true,
      events: eventsWithDuplicateStatus,
      duplicateCount: eventsWithDuplicateStatus.filter((e: any) => e.isDuplicate).length
    });
  } catch (error) {
    console.error('Error checking duplicates:', error);
    return NextResponse.json(
      { error: 'Failed to check duplicates' },
      { status: 500 }
    );
  }
}
