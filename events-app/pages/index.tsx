import React, {FC} from 'react';
import EventsList from "../components/events/EventsList/EventsList";
import {Event, fetchAndTransformFirebaseData} from "./../data/events"
import {NextPage} from "next";

type FeaturedEventsProps = {
    featuredEvents: [Event] | []
}

const HomePage: NextPage<FeaturedEventsProps> = ({featuredEvents}) => {
    if (featuredEvents.length === 0) return <p>No featured events at the moment...</p>

    return (
        <div>
            <EventsList events={featuredEvents} />
        </div>
    );
};

export const getStaticProps = async () => {
    const transformedEvents = await fetchAndTransformFirebaseData('https://client-fetch-next-default-rtdb.europe-west1.firebasedatabase.app/events.json')
    const featuredEvents = transformedEvents.filter((e: Event) => e.isFeatured)
    return {
        props: {
            featuredEvents: featuredEvents
        },
        revalidate: 100
    }
}

export default HomePage;