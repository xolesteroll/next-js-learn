import React from 'react';
import {useRouter} from "next/router";

const PortfolioDetailsPage = () => {
    const router = useRouter()
    const {portfolioId} = router.query
    console.log(router.query)

    return (
        <div>
            Portfolio project page {portfolioId}
        </div>
    );
};

export default PortfolioDetailsPage;