import React from 'react';
import EventsList from "../../components/events/EventsList/EventsList";
import {DateFilterType, getAllEvents, getFilteredEvents} from "../../data/events";
import EventsSearch from "../../components/events/EventsSearch/EventsSearch";
import {useRouter} from "next/router";

const EventsPage = () => {
    const events = getAllEvents()
    const router = useRouter()
    const filterHandler = (filterArgs: DateFilterType) => {
        const fullPath = `/events/${filterArgs.year}/${filterArgs.month}`
        router.push(fullPath)
    }

    return (
        <div>
            <EventsSearch searchHandler={filterHandler} />
            <EventsList events={events}/>
        </div>
    );
};

export default EventsPage;