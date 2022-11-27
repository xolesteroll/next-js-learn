import React from 'react';
import {useRouter} from "next/router";

const SelectedClientProjectPage = () => {
    const router = useRouter()
    const {clientId, clientProjectId} = router.query

    return (
        <div>
            <h1>Project page for a project {clientProjectId} of a client {clientId}</h1>
        </div>
    );
};

export default SelectedClientProjectPage;