import React from 'react';
import { format, parseISO } from 'date-fns';
import './EventPreview.css';

function EventPreview({ events, onToggleEvent, onSync, onCancel, loading }) {
  const formatEventDate = (event) => {
    try {
      if (event.allDay) {
        return format(parseISO(event.startDate), 'MMM dd, yyyy');
      } else {
        return format(parseISO(event.startDateTime), 'MMM dd, yyyy h:mm a');
      }
    } catch (error) {
      return event.startDate || 'Invalid date';
    }
  };

  const getEventTypeLabel = (type) => {
    const labels = {
      test: 'Test',
      assignment: 'Assignment',
      fieldtrip: 'Field Trip',
      holiday: 'Holiday',
      halfday: 'Half Day',
      conference: 'Conference',
      event: 'Event'
    };
    return labels[type] || 'Event';
  };

  const selectedCount = events.filter(e => e.selected !== false).length;

  return (
    <div className="event-preview">
      <div className="preview-header">
        <h2>Preview Events</h2>
        <p>Found {events.length} events - {selectedCount} selected</p>
      </div>

      <div className="event-list">
        {events.map((event, index) => (
          <div
            key={index}
            className={`event-item ${event.selected === false ? 'deselected' : ''}`}
          >
            <input
              type="checkbox"
              checked={event.selected !== false}
              onChange={() => onToggleEvent(index)}
              className="event-checkbox"
            />
            <div className="event-details">
              <div className="event-title">
                <strong>{event.title}</strong>
                <span className="event-type-badge">{getEventTypeLabel(event.eventType)}</span>
              </div>
              <div className="event-meta">
                <span className="event-child">{event.childName}</span>
                <span className="event-date">{formatEventDate(event)}</span>
              </div>
              {event.description && (
                <div className="event-description">{event.description.substring(0, 100)}...</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="preview-actions">
        <button className="btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button
          className="btn-primary"
          onClick={onSync}
          disabled={loading || selectedCount === 0}
        >
          {loading ? 'Syncing...' : `Sync ${selectedCount} Events to Calendar`}
        </button>
      </div>
    </div>
  );
}

export default EventPreview;
