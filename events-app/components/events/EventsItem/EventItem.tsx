import React, {FC} from 'react';
import {Event} from "../../../data/events";
import Link from "next/link";

import s from "./EventItem.module.css"
import Button from "../../ui/Button/Button";
import DateIcon from "../../icons/DateIcon";
import AddressIcon from "../../icons/AddressIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

const EventItem: FC<Event> = (event: Event) => {
    const {id, date, image, location, title} = event
    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    const formattedAddress = location.replace(', ', '\n')
    const exploreUrl = `/events/${id}`

    return (
        <li className={s.item}>
            <img src={image} alt={title} style={{maxWidth: '200px'}}/>
            <div className={s.content}>
                <div className={s.summary}>
                    <h2>{title}</h2>
                    <div className={s.date}>
                        <DateIcon/>
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={s.address}>
                        <AddressIcon/>
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={s.actions}>
                    <Button url={exploreUrl}>
                        <span>Explore </span>
                        <span className={s.icon}><ArrowRightIcon/></span>
                    </Button>
                </div>
            </div>
        </li>
    );
};

export default EventItem;