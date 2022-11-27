import React, {FC} from 'react';
import {Event} from "../../../data/events";
import EventItem from "../EventsItem/EventItem";

import s from "./EventsList.module.css"

interface EventsProps {
    events: Event[]
}

const EventsList: FC<EventsProps> = ({events}: EventsProps) => {
    return (
        <ul className={s.list}>
            {events.map((event: Event) =>
                <EventItem key={event.id} {...event} />
            )}
        </ul>
    );
};

export default EventsList;