import React from 'react';
import {getFeaturedEvents} from "../data/events";
import EventsList from "../components/events/EventsList/EventsList";
import EventsSearch from "../components/events/EventsSearch/EventsSearch";

const HomePage = () => {
    const featuredEvents = getFeaturedEvents()

    return (
        <div>
            <EventsList events={featuredEvents} />
        </div>
    );
};

export default HomePage;