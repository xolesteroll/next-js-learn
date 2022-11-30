import React from 'react';
import {useRouter} from "next/router";
import {fetchAndTransformFirebaseData, getEventById} from "../../../data/events";
import EventSummary from "../../../components/events/EventDetail/EventSummary/EventSummary";
import EventLogistics from "../../../components/events/EventDetail/EventLogistics/EventLogistics";
import EventContent from "../../../components/events/EventDetail/EventContent/EventContent";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {Event} from "../../../data/events";


const EventDetails: NextPage<{event: Event}> = (props) => {
    const event = props.event

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

export const getStaticPaths: GetStaticPaths = async () => {
    const transformedData = await fetchAndTransformFirebaseData('https://client-fetch-next-default-rtdb.europe-west1.firebasedatabase.app/events.json')
    const paramsArr = transformedData.map(e => {
        return {
            params: {
                eventId: e.id
            }
        }
    })

    return {
        paths: paramsArr,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const {params} = ctx

    const transformedData = await fetchAndTransformFirebaseData('https://client-fetch-next-default-rtdb.europe-west1.firebasedatabase.app/events.json')
    const event = transformedData.find(e => e.id === params?.eventId)

    if (!event) return {notFound: true}

    return {
        props: {
            event
        }
    }
}

export default EventDetails;