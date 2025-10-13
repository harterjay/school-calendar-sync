import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import CalendarSelector from './CalendarSelector';
import InputBox from './InputBox';
import EventPreview from './EventPreview';

function Dashboard({ onLogout }) {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState('');
  const [child1Text, setChild1Text] = useState('');
  const [child2Text, setChild2Text] = useState('');
  const [parsedEvents, setParsedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Child profiles (hardcoded for MVP - will be editable in Phase 2)
  const children = [
    { id: 1, name: 'Serena', grade: '3rd', teacher: 'Mrs. Bagley' },
    { id: 2, name: 'Sienna', grade: '5th', teacher: 'Mrs. Victoriano' }
  ];

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    try {
      const response = await axios.get('/api/calendar/list');
      setCalendars(response.data.calendars);

      // Auto-select primary calendar
      const primary = response.data.calendars.find(cal => cal.primary);
      if (primary) {
        setSelectedCalendar(primary.id);
      }
    } catch (error) {
      console.error('Error fetching calendars:', error);
    }
  };

  const handleParseEvents = async () => {
    setLoading(true);
    try {
      const allEvents = [];

      // Parse child 1 text
      if (child1Text.trim()) {
        const response1 = await axios.post('/api/sync/parse', {
          text: child1Text,
          childName: children[0].name
        });
        allEvents.push(...response1.data.events);
      }

      // Parse child 2 text
      if (child2Text.trim()) {
        const response2 = await axios.post('/api/sync/parse', {
          text: child2Text,
          childName: children[1].name
        });
        allEvents.push(...response2.data.events);
      }

      setParsedEvents(allEvents);
      setShowPreview(true);
    } catch (error) {
      console.error('Error parsing events:', error);
      alert('Failed to parse events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncToCalendar = async () => {
    if (!selectedCalendar) {
      alert('Please select a calendar');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/sync/create', {
        calendarId: selectedCalendar,
        events: parsedEvents.filter(e => e.selected !== false)
      });

      alert(`Successfully created ${response.data.created} events!`);

      // Clear inputs and preview
      setChild1Text('');
      setChild2Text('');
      setParsedEvents([]);
      setShowPreview(false);
    } catch (error) {
      console.error('Error syncing to calendar:', error);
      alert('Failed to sync events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEventToggle = (index) => {
    const updated = [...parsedEvents];
    updated[index].selected = !updated[index].selected;
    setParsedEvents(updated);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>School Calendar Sync</h1>
        <div className="header-actions">
          <button className="btn-secondary">Settings</button>
          <button className="btn-secondary" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <CalendarSelector
          calendars={calendars}
          selectedCalendar={selectedCalendar}
          onSelectCalendar={setSelectedCalendar}
        />

        <div className="children-input-section">
          <div className="child-column">
            <div className="child-profile-card">
              <h3>{children[0].name}</h3>
              <p>{children[0].grade} Grade - {children[0].teacher}</p>
            </div>
            <InputBox
              label={`Paste ${children[0].name}'s school update:`}
              value={child1Text}
              onChange={setChild1Text}
              onClear={() => setChild1Text('')}
            />
          </div>

          <div className="child-column">
            <div className="child-profile-card">
              <h3>{children[1].name}</h3>
              <p>{children[1].grade} Grade - {children[1].teacher}</p>
            </div>
            <InputBox
              label={`Paste ${children[1].name}'s school update:`}
              value={child2Text}
              onChange={setChild2Text}
              onClear={() => setChild2Text('')}
            />
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="btn-primary btn-large"
            onClick={handleParseEvents}
            disabled={loading || (!child1Text && !child2Text)}
          >
            {loading ? 'Parsing...' : 'Parse Events'}
          </button>
        </div>

        {showPreview && parsedEvents.length > 0 && (
          <EventPreview
            events={parsedEvents}
            onToggleEvent={handleEventToggle}
            onSync={handleSyncToCalendar}
            onCancel={() => setShowPreview(false)}
            loading={loading}
          />
        )}

        {showPreview && parsedEvents.length === 0 && (
          <div className="no-events">
            <p>No events found. Please check your input and try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
