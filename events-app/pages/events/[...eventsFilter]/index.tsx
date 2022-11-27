import React from 'react';
import {useRouter} from "next/router";
import {ParsedUrlQuery} from "querystring";

const EventsFilterPage = () => {
    const router = useRouter()
    const {eventsFilter}: ParsedUrlQuery = router.query
    const isQuery = !!eventsFilter

    return (
        <div>
            {isQuery ?
                <h1>
                    Events filter
                    by: {eventsFilter[0]} year and {eventsFilter[1]} month
                </h1> :
                <h1>
                    No filters query specified
                </h1>
            }

        </div>
    );
};

export default EventsFilterPage;