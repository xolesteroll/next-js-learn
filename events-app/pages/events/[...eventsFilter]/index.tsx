import React from 'react';
import {useRouter} from "next/router";
import EventsList from "../../../components/events/EventsList/EventsList";
import {fetchAndTransformFirebaseData} from "../../../data/events";
import EventsResultsTitle from "../../../components/events/EventsResultsTitle/EventsResultsTitle";
import {GetServerSideProps, NextPage} from "next";
import {Event} from "../../../data/events";
import ErrorAlert from "../../../components/ui/ErrorAlert/ErrorAlert";
import Button from "../../../components/ui/Button/Button";

type FilterPageProps = {
    filteredEvents: [Event] | [],
    year: number,
    month: number
}

const EventsFilterPage: NextPage<FilterPageProps> = ({filteredEvents, year, month}) => {
    const router = useRouter()
    const {eventsFilter} = router.query

    if (isNaN(year) || isNaN(month) || eventsFilter?.length !== 2) {
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

    const date = new Date(year, month - 1)

    return (
        <>
            <EventsResultsTitle date={date}/>
            <EventsList events={filteredEvents}/>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {params} = ctx

    if (params && params.eventsFilter) {
        const year = +params.eventsFilter[0]
        const month = +params.eventsFilter[1]

        const events = await fetchAndTransformFirebaseData('https://client-fetch-next-default-rtdb.europe-west1.firebasedatabase.app/events.json')
        const filteredEvents = events.filter(e => {
            const eventDate = new Date(e.date);
            return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
        })

        return {
            props: {
                filteredEvents,
                year,
                month
            }
        }
    }

    return {
        notFound: true
    }


}

export default EventsFilterPage;