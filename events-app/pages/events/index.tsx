import React, {useEffect, useState} from 'react';
import useSWR from 'swr'
import EventsList from "../../components/events/EventsList/EventsList";
import {DateFilterType, fetchAndTransformFirebaseData, getAllEvents} from "../../data/events";
import EventsSearch from "../../components/events/EventsSearch/EventsSearch";
import {useRouter} from "next/router";
import {GetStaticProps, NextPage} from "next";
import {Event} from "../../data/events";

const EventsPage: NextPage<{fetchedEvents: [Event]}> = ({fetchedEvents}) => {
    const [events, setEvents] = useState(fetchedEvents)
    const router = useRouter()

    const filterHandler = async (filterArgs: DateFilterType) => {
        const fullPath = `/events/${filterArgs.year}/${filterArgs.month}`
        await router.push(fullPath)
    }

    const fetcher = async (url: string) => {
        const data = await fetchAndTransformFirebaseData(url)

        return data
    }

    const {data, error} = useSWR('https://client-fetch-next-default-rtdb.europe-west1.firebasedatabase.app/events.json', fetcher)

    useEffect(() => {
        if (data) {
            console.log('revalidation')
            // @ts-ignore
            setEvents(data)
        }
    }, [data])

    if (error) return <p>Something went wrong</p>

    if (!data && !events && !error) return <p>Loading...</p>

    return (
        <div>
            <EventsSearch searchHandler={filterHandler} />
            <EventsList events={events}/>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const events = await fetchAndTransformFirebaseData('https://client-fetch-next-default-rtdb.europe-west1.firebasedatabase.app/events.json')
    return {
        props: {
            fetchedEvents: events
        },
        revalidate: 100
    }
}

export default EventsPage;