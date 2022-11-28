import React from 'react';
import {useRouter} from "next/router";
import {ParsedUrlQuery} from "querystring";
import EventsList from "../../../components/events/EventsList/EventsList";
import {getFilteredEvents} from "../../../data/events";

const EventsFilterPage = () => {
    const router = useRouter()
    const {eventsFilter} = router.query

    if (!eventsFilter) return <p>Check url...</p>

    const searchObj = {
        year: +eventsFilter[0],
        month: +eventsFilter[1]
    }
    const filteredEvents = getFilteredEvents(searchObj)

    if (filteredEvents.length === 0) return <p style={{textAlign: 'center'}}><b>No events found...</b></p>

    return (
        <div>
            <EventsList events={filteredEvents}/>
        </div>
    );
};

export default EventsFilterPage;