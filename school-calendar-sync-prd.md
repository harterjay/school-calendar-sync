# School Calendar Sync Tool - Product Requirements Document

## 1. Product Overview

### 1.1 Purpose
A web application that automates the process of parsing school updates (from ParentSquare or teacher emails) and syncing them to Google Calendar, eliminating duplicate events and reducing manual calendar management for parents with multiple children.

### 1.2 Target Users
- Parents with 2+ children receiving regular school communications
- Users who want to consolidate school events into their existing Google Calendar workflow

### 1.3 Success Metrics
- Time saved per week managing school calendars (target: 80% reduction)
- Accuracy of event extraction (target: 95%+)
- Zero duplicate events created
- User completes sync in under 2 minutes

---

## 2. User Stories

### Core Stories
1. As a parent, I want to paste email content from my children's teachers so that I don't have to manually type event details
2. As a parent, I want the app to detect duplicate events so that I don't clutter my calendar with repeats
3. As a parent, I want to choose which Google Calendar to sync to so that I can organize events appropriately
4. As a parent, I want the app to parse dates, times, and event types automatically so that I don't have to format anything
5. As a parent, I want to see a preview of what will be added before syncing so that I can verify accuracy

### Extended Stories
6. As a parent, I want events color-coded or categorized by child so that I can quickly identify whose event it is
7. As a parent, I want automatic reminders added to important events (tests, field trips) so that I don't forget to prepare
8. As a parent, I want to track which teacher/grade each event came from so that I have context

---

## 3. Functional Requirements

### 3.1 Input Processing

#### FR-1: Dual Input Interface
- **Requirement**: Two separate text input boxes labeled with child names
- **Details**: 
  - Input boxes should support large text (up to 10,000 characters)
  - Clear/reset button for each input box
  - Visual indication of which child's box is which
  - Ability to paste formatted text (emails preserve some structure)

#### FR-2: Child Profile Management
- **Requirement**: Store and display child information
- **Details**:
  - Child name
  - Grade level
  - Teacher name
  - Default color/category for calendar events
  - Editable in settings

#### FR-3: Text Parsing Engine
- **Requirement**: Extract structured event data from unstructured text
- **Details**:
  - Identify event types: tests, assignments, field trips, holidays, half days, conferences
  - Extract dates (various formats: "Oct 16", "10/16", "October 16", "Thursday the 16th")
  - Extract times (12-hour and 24-hour formats)
  - Extract locations
  - Extract descriptions/notes
  - Handle recurring events (e.g., "no school Mon-Wed")
  - Handle date ranges (e.g., "Nov 26-28 Thanksgiving Break")

### 3.2 Google Calendar Integration

#### FR-4: Google Calendar Authentication
- **Requirement**: OAuth 2.0 authentication with Google Calendar API
- **Details**:
  - Request minimum required scopes: `calendar.readonly` and `calendar.events`
  - Store refresh token securely
  - Handle token expiration and refresh
  - Clear session logout

#### FR-5: Calendar Selection
- **Requirement**: Display all available calendars and allow user selection
- **Details**:
  - List all calendars the user has write access to
  - Show calendar name and color
  - Allow selection of default calendar (saveable preference)
  - Support creating a new calendar specifically for school events

#### FR-6: Duplicate Detection
- **Requirement**: Check for existing events before creating new ones
- **Details**:
  - Match on: event title (fuzzy match 90%+), date, and time
  - Consider events within ±2 hours as potential duplicates
  - For all-day events, match on title and date only
  - Show user potential duplicates and allow override
  - Store unique event IDs to track what this app has created

### 3.3 Event Management

#### FR-7: Event Preview
- **Requirement**: Display parsed events before syncing
- **Details**:
  - Show all extracted events in a list/table
  - Include: title, date, time, location, description, child association
  - Allow individual event editing before sync
  - Allow selection/deselection of events to sync
  - Indicate which events are new vs. duplicates

#### FR-8: Event Creation
- **Requirement**: Create events in Google Calendar
- **Details**:
  - Map parsed data to Google Calendar event format
  - Set appropriate event types (all-day, timed)
  - Add child name to event title or description
  - Add category/color based on child or event type
  - Set default reminders:
    - Tests: 1 day before, 2 days before
    - Field trips: 2 days before, 12 hours before
    - Half days: morning of
    - Assignments: 2 days before
  - Preserve original text in description field

#### FR-9: Event Metadata
- **Requirement**: Track app-created events
- **Details**:
  - Add custom extended property: `schoolCalendarSync: true`
  - Add child identifier: `childName: "Serena"`
  - Add source: `source: "teacher-email"`
  - Add creation timestamp
  - This allows filtering and bulk operations later

### 3.4 User Interface

#### FR-10: Dashboard View
- **Requirement**: Main application interface
- **Components**:
  - Child profile cards (editable)
  - Two input text areas
  - Parse button
  - Calendar selector dropdown
  - Preview pane (hidden until parsed)
  - Sync button
  - Status/progress indicator

#### FR-11: Settings Page
- **Requirement**: User preferences and configuration
- **Details**:
  - Manage child profiles (add/edit/delete)
  - Default calendar selection
  - Default reminder settings
  - Event category color preferences
  - Google account management (disconnect/reconnect)

#### FR-12: History/Log
- **Requirement**: Track sync history
- **Details**:
  - List of past syncs (date, number of events created)
  - View events created in each sync
  - Ability to undo/delete a sync batch
  - Export sync history

---

## 4. Technical Requirements

### 4.1 Architecture

#### TR-1: Technology Stack
- **Frontend**: React or Vue.js
- **Backend**: Node.js/Express or Python/Flask
- **Database**: SQLite or PostgreSQL (for user preferences, sync history)
- **Authentication**: Google OAuth 2.0
- **Hosting**: Can run locally or deploy to Vercel/Heroku

#### TR-2: API Integration
- **Google Calendar API v3**
  - Required scopes: `calendar.readonly`, `calendar.events`
  - Endpoints needed:
    - `calendarList.list` - get user's calendars
    - `events.list` - retrieve existing events
    - `events.insert` - create new events
    - `events.patch` - update existing events
    - `events.delete` - remove events

#### TR-3: Data Models

**User Profile**
```javascript
{
  userId: string,
  googleId: string,
  email: string,
  defaultCalendarId: string,
  createdAt: timestamp,
  lastSync: timestamp
}
```

**Child Profile**
```javascript
{
  childId: string,
  userId: string,
  name: string,
  grade: string,
  teacherName: string,
  color: string,
  category: string
}
```

**Sync History**
```javascript
{
  syncId: string,
  userId: string,
  syncDate: timestamp,
  childId: string,
  eventsCreated: number,
  eventIds: array<string>,
  rawInput: text
}
```

**Parsed Event (before sync)**
```javascript
{
  title: string,
  description: string,
  startDate: date,
  endDate: date,
  startTime: time (optional),
  endTime: time (optional),
  location: string (optional),
  allDay: boolean,
  childId: string,
  eventType: enum (test, assignment, fieldtrip, holiday, event),
  reminders: array<{method, minutes}>,
  isDuplicate: boolean,
  confidence: number (0-1)
}
```

### 4.2 Parsing Algorithm

#### TR-4: Event Extraction Logic
1. **Tokenization**: Split text into sentences/lines
2. **Date Detection**: 
   - Regex patterns for common date formats
   - Relative dates (e.g., "tomorrow", "next Monday", "this Thursday")
   - Month name + day
   - Handle year (default to current or next)
3. **Event Type Classification**:
   - Keywords: "test", "exam", "quiz", "assignment", "due", "field trip", "no school", "holiday", "conference"
   - Use keyword matching with priority ordering
4. **Time Extraction**:
   - 12-hour format (8:00am, 3:30pm)
   - 24-hour format (08:00, 15:30)
   - Time ranges (7:15am - 3:30pm)
5. **Context Association**:
   - Link dates with the nearest preceding event description
   - Handle multi-line event descriptions
6. **Validation**:
   - Dates should be in the future or within 30 days past
   - Times should be reasonable (school hours)
   - Flag ambiguous parses for user review

#### TR-5: NLP Enhancement (Optional/Future)
- Use lightweight NLP library (e.g., compromise.js, natural)
- Named entity recognition for locations, dates
- Sentence classification for event types

### 4.3 Duplicate Detection Algorithm

#### TR-6: Matching Strategy
1. **Exact Match**: Same title, same date, same time
2. **Fuzzy Title Match**: Levenshtein distance < 10% + same date ± 1 day
3. **Time Window**: Events within 2-hour window on same day
4. **All-Day Events**: Title match + exact date match
5. **Custom Property Check**: Query for events with `schoolCalendarSync: true` first

```javascript
function isDuplicate(newEvent, existingEvents) {
  for (event of existingEvents) {
    // Check date overlap
    if (!datesOverlap(newEvent.date, event.date)) continue;
    
    // Check title similarity
    const similarity = calculateSimilarity(newEvent.title, event.title);
    if (similarity > 0.85) {
      // Check time proximity (if not all-day)
      if (newEvent.allDay || event.allDay) return true;
      if (timeWithinWindow(newEvent.time, event.time, 120)) {
        return true;
      }
    }
  }
  return false;
}
```

---

## 5. UI/UX Specifications

### 5.1 Wireframe Descriptions

#### Main Dashboard
```
┌────────────────────────────────────────────────┐
│  School Calendar Sync        [Settings] [Logout]│
├────────────────────────────────────────────────┤
│                                                 │
│  Selected Calendar: [Family Calendar ▼]        │
│                                                 │
│  ┌──────────────────┐  ┌──────────────────┐   │
│  │  Serena (3rd)    │  │  Sienna (5th)    │   │
│  │  Mrs. Bagley     │  │  Mrs. Victoriano │   │
│  └──────────────────┘  └──────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐  │
│  │ Paste Serena's school update:           │  │
│  │                                          │  │
│  │ [Large text area - 500px height]        │  │
│  │                                          │  │
│  └─────────────────────────────────────────┘  │
│                                    [Clear]      │
│                                                 │
│  ┌─────────────────────────────────────────┐  │
│  │ Paste Sienna's school update:           │  │
│  │                                          │  │
│  │ [Large text area - 500px height]        │  │
│  │                                          │  │
│  └─────────────────────────────────────────┘  │
│                                    [Clear]      │
│                                                 │
│              [Parse Events]                     │
│                                                 │
│  ┌─────────────────────────────────────────┐  │
│  │ Preview (appears after parsing)         │  │
│  │ ✓ Serena - Math Test (Oct 16, 8:00am)  │  │
│  │ ✓ Sienna - Field Trip (Oct 17, 7:15am) │  │
│  │ ⚠ Duplicate? - No School (Oct 13)       │  │
│  │   [Keep] [Skip]                          │  │
│  └─────────────────────────────────────────┘  │
│                                                 │
│         [Cancel]  [Sync to Calendar]           │
└────────────────────────────────────────────────┘
```

### 5.2 Interaction Flow

1. **Initial Load**:
   - Check if user is authenticated → if not, show Google Sign-In button
   - Load child profiles
   - Load calendar list and set default selection

2. **Input & Parse**:
   - User pastes text into one or both input boxes
   - Click "Parse Events"
   - Show loading spinner
   - Display parsed events in preview pane
   - Highlight potential duplicates in yellow/orange
   - Show event count: "Found 12 new events, 3 possible duplicates"

3. **Review & Edit**:
   - User can click on any event to edit details
   - User can uncheck events they don't want to sync
   - For duplicates, user can click "Keep" or "Skip"

4. **Sync**:
   - Click "Sync to Calendar"
   - Show progress bar with current event being created
   - On completion, show success message with count
   - Option to "View in Google Calendar" (opens new tab)
   - Clear input boxes automatically

5. **Error Handling**:
   - Parse errors: Show which parts couldn't be parsed, allow manual input
   - API errors: Show user-friendly message, allow retry
   - Authentication errors: Prompt re-authentication

### 5.3 Responsive Design
- Desktop-first (primary use case)
- Responsive down to tablet (768px)
- Mobile: Show one input box at a time with tabs

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Parse typical email (2000 chars) in < 1 second
- Sync up to 50 events in < 10 seconds
- Initial load time < 2 seconds

### 6.2 Security
- Store OAuth tokens encrypted
- Use HTTPS for all API calls
- Implement CSRF protection
- No storing of sensitive email content long-term (only sync history metadata)

### 6.3 Reliability
- Handle API rate limits gracefully (retry with exponential backoff)
- Validate all dates before sending to Google Calendar
- Log errors for debugging
- Graceful degradation if parsing fails (allow manual input)

### 6.4 Usability
- Zero-configuration for basic use case
- Inline help tooltips for key features
- Clear error messages with actionable next steps
- Undo capability for recent syncs

---

## 7. Future Enhancements (Phase 2)

### 7.1 Advanced Features
- **Automatic Email Fetching**: Connect to Gmail API and auto-import from specific senders
- **Recurring Event Detection**: Handle "every Monday" or "weekly" patterns
- **Smart Suggestions**: Learn from user corrections to improve parsing
- **Multi-family Support**: Share calendar with co-parent or caregiver
- **Mobile App**: Native iOS/Android app with push notifications
- **Assignment Tracking**: Track completion status of homework/projects
- **Integration with Task Apps**: Sync assignments to Todoist, Things, etc.

### 7.2 AI/ML Improvements
- Fine-tune a small LLM for better event extraction
- Use GPT-4 API for complex parsing cases
- Learn from user edits to improve future parses

### 7.3 Analytics
- Dashboard showing: tests per week, busiest days, assignment load
- Report generation: "This month's school events summary"

---

## 8. Implementation Phases

### Phase 1 (MVP - Week 1-2)
- Google OAuth authentication
- Basic text parsing (dates, simple event types)
- Manual calendar selection
- Create events (no duplicate detection)
- Simple preview UI

### Phase 2 (Week 3)
- Duplicate detection algorithm
- Enhanced parsing (times, locations, complex formats)
- Child profile management
- Improved UI with preview and editing

### Phase 3 (Week 4)
- Sync history and undo
- Settings page
- Reminder customization
- Polish and bug fixes

---

## 9. Testing Requirements

### 9.1 Test Cases

**Parsing Tests**:
- Various date formats
- Time extraction (with/without times)
- Multi-day events
- Edge cases (leap years, month boundaries)
- Malformed input

**Duplicate Detection Tests**:
- Exact duplicates
- Similar titles with typos
- Same event different times
- False positives

**Integration Tests**:
- Google Calendar API authentication flow
- Event creation with all fields
- Batch event creation
- Error handling (network issues, API limits)

**User Acceptance Tests**:
- Complete workflow from paste to sync
- Editing events before sync
- Handling duplicates
- Settings management

---

## 10. Success Criteria

### Launch Criteria
✓ User can authenticate with Google Calendar
✓ User can paste text and get parsed events with 90%+ accuracy
✓ User can sync events to selected calendar
✓ Duplicate detection prevents > 95% of duplicates
✓ Zero data loss during sync process
✓ Intuitive UI requiring no documentation for basic use

### Metrics to Track Post-Launch
- Time saved per sync session
- Parse accuracy rate
- Duplicate detection accuracy
- User retention (weekly active users)
- Error rate
- Average events synced per session

---

## 11. Technical Considerations for Claude Code

### Recommended File Structure
```
school-calendar-sync/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChildProfile.jsx
│   │   │   ├── InputBox.jsx
│   │   │   ├── EventPreview.jsx
│   │   │   ├── CalendarSelector.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   ├── googleAuth.js
│   │   │   ├── calendarApi.js
│   │   │   └── parser.js
│   │   ├── utils/
│   │   │   ├── dateParser.js
│   │   │   ├── duplicateDetector.js
│   │   │   └── eventFormatter.js
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── calendar.js
│   │   └── sync.js
│   ├── services/
│   │   ├── googleCalendar.js
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Child.js
│   │   └── SyncHistory.js
│   └── server.js
├── .env.example
└── README.md
```

### Key Libraries to Use
- **Frontend**: React, Axios, date-fns or moment.js
- **Backend**: Express, googleapis, dotenv
- **Database**: Prisma ORM or Sequelize
- **Parsing**: chrono-node (date parsing), compromise (NLP)
- **String matching**: fuzzball (Levenshtein distance)

### Google Calendar API Setup Steps
1. Create project in Google Cloud Console
2. Enable Google Calendar API
3. Create OAuth 2.0 credentials
4. Set authorized redirect URIs
5. Download credentials JSON
6. Store client ID/secret in environment variables

---

## 12. Open Questions & Decisions Needed

1. **Storage**: Should we store raw email text for re-parsing, or only parsed events?
2. **Privacy**: Should we offer a "no-storage" mode that doesn't save sync history?
3. **Pricing**: Free for personal use? Charge for advanced features?
4. **Deployment**: Local-only tool or hosted web app?
5. **Browser Extension**: Would a Chrome extension for direct ParentSquare integration be valuable?

---

**Document Version**: 1.0  
**Last Updated**: October 12, 2025  
**Owner**: Parent User  
**Status**: Ready for Development