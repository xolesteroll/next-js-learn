import React, {FC, useEffect, useState} from 'react';
import useSWR from "swr";

type Sale = {
    id?: string,
    username?: string,
    volume?: number
}

const LastSalesPage: FC<{ sales: [Sale] }> = (props) => {
    const [sales, setSales] = useState<[Sale] | []>(props.sales)
    const fetcher = (url: string) => {
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                const transformedSales = Object.keys(data).map((key) => {
                        return {
                            id: key,
                            ...data[key]
                        }
                    }
                )
                return transformedSales
            })
    }

    const {
        data,
        error
    } = useSWR('https://client-fetch-next-default-rtdb.europe-west1.firebasedatabase.app/sales.json', fetcher)

    useEffect(() => {
        if (data && !sales) {
            // @ts-ignore
            setSales(data)
        }
    }, [data, sales])

    if (error) return <p>Something went wrong</p>

    if (!data && !error && !sales && !error) return <p>Loading...</p>


    return (
        <ul>
            {
                sales.map(s =>
                    <li key={s.id}>
                        <h3>{s.username}</h3>
                        <h5>{s.volume}</h5>
                    </li>
                )
            }
        </ul>
    );
};

export const getStaticProps = async () => {
    const data = await fetch('https://client-fetch-next-default-rtdb.europe-west1.firebasedatabase.app/sales.json')
    const sales = await data.json()
    const transformedSales = Object.keys(sales).map((key) => {
            return {
                id: key,
                ...sales[key]
            }
        }
    )

    return {
        props: {
            sales: transformedSales
        }
    }
}

export default LastSalesPage;