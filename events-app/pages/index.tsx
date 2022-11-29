import React, {FC} from 'react';
import EventsList from "../components/events/EventsList/EventsList";
import {Event} from "./../data/events"

type FeaturedEventsProps = {
    featuredEvents: [Event]
}

const HomePage: FC<FeaturedEventsProps> = ({featuredEvents}) => {
    return (
        <div>
            <EventsList events={featuredEvents} />
        </div>
    );
};

export const getStaticProps = async () => {
    const data = await fetch('https://client-fetch-next-default-rtdb.europe-west1.firebasedatabase.app/events.json')
    const eventsObj = await data.json()
    const transformedEvents = Object.keys(eventsObj).map(key => {
        return {
            id: key,
            ...eventsObj[key]
        }
    }).filter((e: Event) => e.isFeatured)

    return {
        props: {
            featuredEvents: transformedEvents
        }
    }
}

export default HomePage;