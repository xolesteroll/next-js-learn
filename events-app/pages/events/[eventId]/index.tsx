import React from 'react';
import {useRouter} from "next/router";
import {getEventById} from "../../../data/events";
import EventSummary from "../../../components/events/EventDetail/EventSummary/EventSummary";
import EventLogistics from "../../../components/events/EventDetail/EventLogistics/EventLogistics";
import EventContent from "../../../components/events/EventDetail/EventContent/EventContent";

const EventDetails = () => {
    const router = useRouter()
    const {eventId} = router.query
    const event = getEventById(eventId)

    if (!event) {
        return <p>No event found!</p>
    }

    return (
        <>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
            <EventContent >
                <p>{event.description}</p>
            </EventContent>
        </>
    );
};

export default EventDetails;