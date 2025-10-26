const fuzzball = require('fuzzball');

class DuplicateDetector {
  checkDuplicate(newEvent, existingEvents) {
    for (const existingEvent of existingEvents) {
      if (this.isDuplicateEvent(newEvent, existingEvent)) {
        return true;
      }
    }
    return false;
  }

  isDuplicateEvent(event1, event2) {
    // Check if dates overlap
    if (!this.datesOverlap(event1, event2)) {
      return false;
    }

    // Check title similarity using fuzzy matching
    const title1 = (event1.title || event1.summary || '').toLowerCase();
    const title2 = (event2.summary || event2.title || '').toLowerCase();

    const similarity = fuzzball.ratio(title1, title2);

    // If titles are very similar (>85% match)
    if (similarity > 85) {
      // For all-day events, date match + title match is enough
      if (event1.allDay || this.isAllDayEvent(event2)) {
        return true;
      }

      // For timed events, check if times are within 2-hour window
      if (this.timeWithinWindow(event1, event2, 120)) {
        return true;
      }
    }

    return false;
  }

  datesOverlap(event1, event2) {
    const start1 = this.getStartDate(event1);
    const start2 = this.getStartDate(event2);

    if (!start1 || !start2) {
      return false;
    }

    // Check if dates are within 1 day of each other
    const diffInMs = Math.abs(start1.getTime() - start2.getTime());
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays <= 1;
  }

  timeWithinWindow(event1, event2, minutesWindow) {
    const time1 = this.getStartTime(event1);
    const time2 = this.getStartTime(event2);

    if (!time1 || !time2) {
      return false;
    }

    const diffInMs = Math.abs(time1.getTime() - time2.getTime());
    const diffInMinutes = diffInMs / (1000 * 60);

    return diffInMinutes <= minutesWindow;
  }

  getStartDate(event) {
    if (event.startDate) {
      return new Date(event.startDate);
    }
    if (event.startDateTime) {
      return new Date(event.startDateTime);
    }
    if (event.start) {
      if (event.start.date) {
        return new Date(event.start.date);
      }
      if (event.start.dateTime) {
        return new Date(event.start.dateTime);
      }
    }
    return null;
  }

  getStartTime(event) {
    if (event.startDateTime) {
      return new Date(event.startDateTime);
    }
    if (event.start && event.start.dateTime) {
      return new Date(event.start.dateTime);
    }
    return null;
  }

  isAllDayEvent(event) {
    if (event.allDay !== undefined) {
      return event.allDay;
    }
    // Google Calendar all-day events use 'date' instead of 'dateTime'
    if (event.start) {
      return event.start.date !== undefined && event.start.dateTime === undefined;
    }
    return false;
  }
}

module.exports = new DuplicateDetector();
