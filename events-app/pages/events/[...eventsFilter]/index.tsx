import React from 'react';
import EventsList from "../../../components/events/EventsList/EventsList";
import {getEventsByDate} from "../../../data/events";
import EventsResultsTitle from "../../../components/events/EventsResultsTitle/EventsResultsTitle";
import {GetServerSideProps, NextPage} from "next";
import {Event} from "../../../data/events";
import ErrorAlert from "../../../components/ui/ErrorAlert/ErrorAlert";
import Button from "../../../components/ui/Button/Button";

type FilterPageProps = {
    filteredEvents: [Event] | [],
    year: number,
    month: number,
    hasError?: boolean
}

const EventsFilterPage: NextPage<FilterPageProps> = (props) => {
   const {filteredEvents, year, month} = props

    if (props.hasError) {
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

        if (isNaN(year) || isNaN(month) || params.eventsFilter.length !== 2) {
            return {
                props: {
                    filteredEvents: null,
                    year: null,
                    month: null,
                    hasError: true
                }
            }
        }

        const filteredEvents = await getEventsByDate(year, month)

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