import React from 'react';

import path from 'path'
import fs from 'fs/promises'
import {GetStaticProps} from "next";

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
            {products.map(p => <li key={p.id}>{p.title}: {p.description}</li>)}
        </ul>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    console.log('RE-generating')
    const filePath = path.join(process.cwd(), 'data', 'dummyData.json')
    const jsonContent = await fs.readFile(filePath)
    const data = JSON.parse(jsonContent.toString())

    if (!data) return {redirect: {destination: '/no-data'}}

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