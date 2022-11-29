import React from 'react';
import {useRouter} from "next/router";
import EventsList from "../../../components/events/EventsList/EventsList";
import {getFilteredEvents} from "../../../data/events";
import EventsResultsTitle from "../../../components/events/EventsResultsTitle/EventsResultsTitle";
import Button from "../../../components/ui/Button/Button";
import ErrorAlert from "../../../components/ui/ErrorAlert/ErrorAlert";

const EventsFilterPage = () => {
    const router = useRouter()
    const {eventsFilter} = router.query

    if (!eventsFilter) return <p className="center">Loading...</p>

    const searchObj = {
        year: +eventsFilter[0],
        month: +eventsFilter[1]
    }

    if (isNaN(searchObj.year) || isNaN(searchObj.month) || eventsFilter?.length !== 2) {
        return (
                <div className="center">
                    <ErrorAlert>
                        <p><b>Check Url...(format : /year/month)</b></p>
                    </ErrorAlert>
                    <Button url={'/events'}>
                        Go back to all events
                    </Button>
                </div>
        )
    }

    const filteredEvents = getFilteredEvents(searchObj)

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <div className="center">
                <ErrorAlert>
                    <p><b>No events found...</b></p>
                </ErrorAlert>
                <Button url={'/events'}>
                    Go back to all events
                </Button>
            </div>
        )

    }

    const date = new Date(searchObj.year, searchObj.month - 1)

    return (
        <>
            <EventsResultsTitle date={date}/>
            <EventsList events={filteredEvents}/>
        </>
    );
};

export default EventsFilterPage;