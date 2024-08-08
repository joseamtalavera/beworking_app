import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const BookingCalendar = () => {
    const [events, setEvents] = useState([
        {
            title: 'Meeting with John',
            start: new Date(2023, 6, 1, 10, 0),
            end: new Date(2023, 6, 1, 12, 0),
            resourceId: 'a',
        },
        {
            title: 'Lunch with Sarah',
            start: new Date(2023, 6, 2, 12, 0),
            end: new Date(2023, 6, 2, 14, 0),
            resourceId: 'b',
        },
        {
            title: 'Conference',
            start: new Date(2023, 6, 3, 8, 0),
            end: new Date(2023, 6, 3, 18, 0),
            resourceId: 'c',
        },
    ]);

    const resources = [
        { resourceId: 'a', resourceTitle: 'Room A' },
        { resourceId: 'b', resourceTitle: 'Room B' },
        { resourceId: 'c', resourceTitle: 'Room C' },
    ];

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                views={[Views.DAY, Views.WEEK, Views.MONTH, Views.AGENDA]}
                defaultView={Views.DAY}
                step={60}
                timeslots={1}
                min={new Date(2023, 6, 3, 7, 0)}
                max={new Date(2023, 6, 3, 23, 59)}
                resources={resources}
                resourceIdAccessor="resourceId"
                resourceTitleAccessor="resourceTitle"
                selectable
            />
        </div>
    );
};

export default BookingCalendar;
