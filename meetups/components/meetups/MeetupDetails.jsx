import React from 'react';

import s from './MeetupDetails.module.css'

const MeetupDetails = ({image, title, address, description}) => {
    return (
        <>
            <img className={s.image} src={image} alt=""/>
            <h1>{title}</h1>
            <address>{address}</address>
            <p>{description}</p>
        </>
    );
};

export default MeetupDetails;
