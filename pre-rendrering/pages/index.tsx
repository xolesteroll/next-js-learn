import React from 'react';

import path from 'path'
import fs from 'fs/promises'
import {GetStaticProps} from "next";
import Link from "next/link";

type ProductsProps = {
    products: [
        {
            id: string,
            title: string,
            description: string
        }
    ]
}

const HomePage = (props: ProductsProps) => {
    const {products} = props

    return (
        <ul>
            {products.map(p => <li key={p.id}>
                <Link href={`/${p.id}`}>
                    {p.title}: {p.description}
                </Link>
            </li>)}

            <li key={'user-profile'}>
                <Link href={'/user-profile'}>
                    User Profile
                </Link>
            </li>

            <li key={'last-sales'}>
                <Link href={'/last-sales'}>
                    User Profile
                </Link>
            </li>
        </ul>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const filePath = path.join(process.cwd(), 'data', 'dummyData.json')
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData.toString())

    if (!data) return {redirect: {destination: '/no-data', permanent: false}}

    if (data.products.length === 0) return {notFound: true}

    return {
        props: data,
        revalidate: 10,
        //in seconds
        // notFound: true
        //if true returns 404
        // redirect: {
        //     destination: '/some-route'
        // }
        // if we want to redirect user to another route
    }
}

export default HomePage;