import React from 'react';
import {
    getEventById,
    getEventsParamsArray,
    getFeaturedEvents
} from "../../../data/events";
import EventSummary from "../../../components/events/EventDetail/EventSummary/EventSummary";
import EventLogistics from "../../../components/events/EventDetail/EventLogistics/EventLogistics";
import EventContent from "../../../components/events/EventDetail/EventContent/EventContent";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {Event} from "../../../data/events";
import ErrorAlert from "../../../components/ui/ErrorAlert/ErrorAlert";
import Button from "../../../components/ui/Button/Button";
import Head from "next/head";
import Comments from "../../../components/input/Comments/Comments";


const EventDetails: NextPage<{event: Event | undefined}> = (props) => {
    const event = props.event

    if (!event) {
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

    return (
        <>
            <Head>
                <title>
                    {event.title}
                </title>
                <meta name="description" content={event.description}/>
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
            <EventContent >
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id} />
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const featuredEventsParams = await getEventsParamsArray(getFeaturedEvents)

    return {
        paths: featuredEventsParams,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const {params} = ctx

    if (params) {
        const singleEvent = await getEventById(params?.eventId)

        return {
            props: {
                // used this fix because of serializing error on undefined value
                event: singleEvent ? singleEvent : null
            }
        }
    }

    return {notFound: true}
}

export default EventDetails;