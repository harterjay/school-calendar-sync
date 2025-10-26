import React from 'react';
import './CalendarSelector.css';

function CalendarSelector({ calendars, selectedCalendar, onSelectCalendar }) {
  return (
    <div className="calendar-selector">
      <label htmlFor="calendar-select">Selected Calendar:</label>
      <select
        id="calendar-select"
        value={selectedCalendar}
        onChange={(e) => onSelectCalendar(e.target.value)}
        className="calendar-dropdown"
      >
        <option value="">-- Select a calendar --</option>
        {calendars.map(calendar => (
          <option key={calendar.id} value={calendar.id}>
            {calendar.summary} {calendar.primary ? '(Primary)' : ''}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CalendarSelector;
