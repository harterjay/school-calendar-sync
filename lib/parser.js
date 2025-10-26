const Anthropic = require('@anthropic-ai/sdk');

class Parser {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async parseText(text, childName = '') {
    if (!text || typeof text !== 'string') {
      return [];
    }

    try {
      const prompt = this.buildPrompt(text, childName);

      const message = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      // Parse Claude's response
      const responseText = message.content[0].text;
      const events = this.parseClaudeResponse(responseText, childName);

      return events;
    } catch (error) {
      console.error('Error calling Claude API:', error);
      // Fallback to empty array if API fails
      return [];
    }
  }

  buildPrompt(text, childName) {
    const today = new Date().toISOString().split('T')[0];

    return `You are a school calendar event extraction assistant. Your job is to parse school communications and extract ONLY actual calendar events.

Today's date: ${today}

Instructions:
1. Extract ONLY actual events that belong on a calendar (tests, assignments, field trips, holidays, conferences, performances, etc.)
2. IGNORE general reminders, instructions, or informational text that aren't specific events
3. Create concise, clear event titles (e.g., "Math Test Ch. 5" not "Don't forget we have a math test on chapter 5")
4. Extract the date and time if mentioned
5. Identify the event type from: test, assignment, fieldtrip, holiday, halfday, conference, performance, event
6. If no specific time is mentioned, assume it's an all-day event

Input text:
${text}

Respond with a JSON array of events. Each event must have:
- title: string (concise, clear event name)
- date: string (YYYY-MM-DD format, infer year if not specified - use ${new Date().getFullYear()} or next year if date has passed)
- time: string or null (HH:MM format in 24-hour time, null if all-day)
- endTime: string or null (HH:MM format, null if not specified)
- eventType: string (one of: test, assignment, fieldtrip, holiday, halfday, conference, performance, event)
- description: string (brief description with any important details)
- isAllDay: boolean

Example output:
[
  {
    "title": "Math Test",
    "date": "2025-10-20",
    "time": "08:00",
    "endTime": null,
    "eventType": "test",
    "description": "Chapter 5 test on fractions",
    "isAllDay": false
  },
  {
    "title": "Science Field Trip",
    "date": "2025-10-25",
    "time": null,
    "endTime": null,
    "eventType": "fieldtrip",
    "description": "Visit to Natural History Museum, bring lunch",
    "isAllDay": true
  }
]

If there are no valid calendar events in the text, return an empty array: []

IMPORTANT: Respond with ONLY the JSON array, no additional text or explanation.`;
  }

  parseClaudeResponse(responseText, childName) {
    try {
      // Extract JSON from response (in case Claude adds any extra text)
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.warn('No JSON array found in Claude response');
        return [];
      }

      const claudeEvents = JSON.parse(jsonMatch[0]);

      // Transform Claude's format to our internal format
      return claudeEvents.map(event => {
        const reminders = this.getRemindersForEventType(event.eventType);

        // Parse date and time in local timezone (avoid UTC midnight issues)
        const [year, month, day] = event.date.split('-').map(Number);
        const eventDate = new Date(year, month - 1, day); // month is 0-indexed
        let startDateTime = null;
        let endDateTime = null;

        if (event.time && !event.isAllDay) {
          const [hours, minutes] = event.time.split(':');
          const startDate = new Date(year, month - 1, day, parseInt(hours), parseInt(minutes), 0, 0);
          startDateTime = startDate.toISOString();

          if (event.endTime) {
            const [endHours, endMinutes] = event.endTime.split(':');
            const endDate = new Date(year, month - 1, day, parseInt(endHours), parseInt(endMinutes), 0, 0);
            endDateTime = endDate.toISOString();
          } else {
            // Default 1 hour duration if no end time
            const endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + 1);
            endDateTime = endDate.toISOString();
          }
        }

        // Add child name to title if not already present
        let title = event.title;
        if (childName && !title.toLowerCase().includes(childName.toLowerCase())) {
          title = `${childName} - ${title}`;
        }

        return {
          title: title,
          description: event.description,
          startDate: this.formatDate(eventDate),
          endDate: this.formatDate(eventDate),
          allDay: event.isAllDay,
          childName: childName,
          eventType: event.eventType,
          reminders: reminders,
          confidence: 0.95, // High confidence since Claude is pretty accurate
          startDateTime: startDateTime,
          endDateTime: endDateTime
        };
      });
    } catch (error) {
      console.error('Error parsing Claude response:', error);
      return [];
    }
  }

  getRemindersForEventType(eventType) {
    const reminderMap = {
      test: [
        { method: 'popup', minutes: 24 * 60 }, // 1 day before
        { method: 'popup', minutes: 48 * 60 }  // 2 days before
      ],
      assignment: [
        { method: 'popup', minutes: 48 * 60 }  // 2 days before
      ],
      fieldtrip: [
        { method: 'popup', minutes: 48 * 60 }, // 2 days before
        { method: 'popup', minutes: 12 * 60 }  // 12 hours before
      ],
      halfday: [
        { method: 'popup', minutes: 60 }       // Morning of
      ],
      conference: [
        { method: 'popup', minutes: 24 * 60 }  // 1 day before
      ],
      performance: [
        { method: 'popup', minutes: 24 * 60 }, // 1 day before
        { method: 'popup', minutes: 2 * 60 }   // 2 hours before
      ],
      holiday: [
        { method: 'popup', minutes: 24 * 60 }  // 1 day before
      ]
    };

    return reminderMap[eventType] || [{ method: 'popup', minutes: 24 * 60 }];
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

module.exports = new Parser();
