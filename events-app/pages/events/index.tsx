import React from 'react';
import EventsList from "../../components/events/EventsList/EventsList";
import {getAllEvents} from "../../data/events";

const EventsPage = () => {
    const events = getAllEvents()

    return (
        <div>
            <EventsList events={events}/>
        </div>
    );
};

export default EventsPage;