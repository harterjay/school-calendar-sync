# School Calendar Sync Tool

A web application that automates the process of parsing school updates (from ParentSquare or teacher emails) and syncing them to Google Calendar, eliminating duplicate events and reducing manual calendar management for parents with multiple children.

## Features

- Parse school communications and extract event details automatically
- Detect and prevent duplicate calendar events
- Support for multiple children with separate input areas
- Preview events before syncing to calendar
- Automatic event type detection (tests, field trips, holidays, etc.)
- Smart reminder settings based on event type
- Google Calendar integration with OAuth authentication

## Project Structure

```
kids-activities/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Dashboard.js
│   │   │   ├── CalendarSelector.js
│   │   │   ├── InputBox.js
│   │   │   └── EventPreview.js
│   │   ├── services/        # API services (future)
│   │   ├── utils/           # Utility functions (future)
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── backend/                  # Node.js/Express backend
│   ├── routes/              # API routes
│   │   ├── auth.js         # Google OAuth authentication
│   │   ├── calendar.js     # Calendar operations
│   │   └── sync.js         # Event parsing and syncing
│   ├── services/            # Business logic
│   │   ├── parser.js       # Text parsing service
│   │   └── duplicateDetector.js
│   ├── models/              # Data models (future)
│   ├── server.js
│   └── package.json
├── .env.example             # Environment variables template
├── .gitignore
├── school-calendar-sync-prd.md  # Product Requirements Document
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Cloud Console account
- Google Calendar API credentials

## Setup Instructions

### 1. Google Cloud Console Setup

Before running the application, you need to set up Google Calendar API access:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:5000/api/auth/callback`
   - Click "Create"
5. Download the credentials JSON or copy the Client ID and Client Secret

### 2. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Google OAuth credentials:
   ```
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/callback
   PORT=5000
   ```

### 3. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

### 4. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000` and automatically open in your browser

## Usage

1. **Sign in with Google**: Click the "Sign in with Google" button and authorize the application to access your Google Calendar

2. **Select Calendar**: Choose which Google Calendar you want to sync events to from the dropdown

3. **Paste School Updates**:
   - Paste email or ParentSquare content into the appropriate text box for each child
   - The parser will automatically detect dates, times, and event types

4. **Parse Events**: Click "Parse Events" to extract structured event information

5. **Review Preview**:
   - Review the extracted events in the preview pane
   - Uncheck any events you don't want to sync
   - Verify event details are correct

6. **Sync to Calendar**: Click "Sync X Events to Calendar" to create the events in your Google Calendar

## Current Features (MVP - Phase 1)

- ✅ Google OAuth authentication
- ✅ Calendar selection and listing
- ✅ Text parsing for dates and events
- ✅ Event preview with details
- ✅ Create events in Google Calendar
- ✅ Basic duplicate detection
- ✅ Support for two children profiles
- ✅ Event type detection (test, field trip, holiday, etc.)
- ✅ Automatic reminder settings by event type

## Upcoming Features (Phase 2+)

- [ ] Enhanced duplicate detection with fuzzy matching
- [ ] Editable child profiles in settings
- [ ] Sync history and undo functionality
- [ ] Advanced date parsing (recurring events, date ranges)
- [ ] Manual event editing before sync
- [ ] Event color coding by child
- [ ] Email integration (automatic fetching)
- [ ] Database storage for user preferences

## Technology Stack

### Frontend
- React 18
- Axios (HTTP client)
- date-fns (date formatting)

### Backend
- Node.js
- Express
- Google APIs (googleapis)
- chrono-node (natural language date parsing)
- fuzzball (string matching for duplicate detection)
- SQLite (database - future phase)

## Troubleshooting

### "Not authenticated" errors
- Make sure you've completed the Google Sign-In flow
- Check that your OAuth credentials are correctly set in `.env`
- Verify the redirect URI matches in both `.env` and Google Cloud Console

### Events not parsing correctly
- Ensure dates are in recognizable formats (e.g., "Oct 16", "10/16/2025")
- Check that the text contains clear date and event information
- The parser works best with structured text from emails

### Calendar not loading
- Verify your Google account has access to at least one calendar
- Check browser console for API errors
- Ensure the Calendar API is enabled in Google Cloud Console

## Development

### Running Tests
```bash
# Backend tests (future)
cd backend
npm test

# Frontend tests (future)
cd frontend
npm test
```

### Building for Production
```bash
# Frontend build
cd frontend
npm run build

# Backend (no build needed, runs directly)
cd backend
npm start
```

## Contributing

This is a personal project, but suggestions and improvements are welcome! Please review the [PRD document](school-calendar-sync-prd.md) for full feature specifications.

## License

MIT

## Support

For issues or questions, please refer to the PRD document or create an issue in the repository.

---

**Note**: This is currently in MVP phase. Some features from the PRD are still in development. See the PRD document for the complete feature roadmap.
