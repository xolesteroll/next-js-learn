import React from 'react';
import {getFeaturedEvents} from "../data/events";
import EventsList from "../components/events/EventsList/EventsList";

const HomePage = () => {
    const featuredEvents = getFeaturedEvents()

    return (
        <div>
            <EventsList events={featuredEvents} />
        </div>
    );
};

export default HomePage;