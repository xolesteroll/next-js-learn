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

export const getStaticProps = async () => {
    const data = await fetch('https://client-fetch-next-default-rtdb.europe-west1.firebasedatabase.app/events.json')
    const eventsObj = await data.json()
    const transformedEvents = Object.keys(eventsObj).map(key => {
        return {
            id: key,
            ...eventsObj[key]
        }
    }).filter(e => e.featured)

    return {
        props: {
            events: transformedEvents
        }
    }
}

export default HomePage;