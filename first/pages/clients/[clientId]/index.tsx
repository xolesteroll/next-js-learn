import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link";

const ClientProjectsPage = () => {
    const router = useRouter()
    const {clientId} = router.query

    return (
        <div>
            <h1>Projects of the client {clientId}</h1>

        </div>
    );
};

export default ClientProjectsPage;