import React, {FC} from 'react';
import {GetStaticPaths, GetStaticProps} from "next";
import path from "path";
import fs from "fs/promises";

type Product = {
    id: string,
    title: string,
    description: string
}

type SingleProductProps = {
    singleProduct: Product
}

const ProductDetailPage: FC<SingleProductProps> = ({singleProduct}) => {
    if (!singleProduct) return <p>Loading...</p>

    const {title, description} = singleProduct

    return (
        <>
            <h1>{title}</h1>
            <p>{description}</p>
        </>
    );
};

const getProducts = async () => {
    const filePath = path.join(process.cwd(), 'data', 'dummyData.json')
    const jsonData = await fs.readFile(filePath)
    const {products} = JSON.parse(jsonData.toString())

    return products
}

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await getProducts()

    const paramsArr = products.map((p: Product) => {
        return {
            params: {
                pid: p.id
            }
        }
    })

    return {
        paths: paramsArr,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {params} = context
    const productId = params?.pid
    const products = await getProducts()
    const singleProduct = products.find((p: Product) => p.id === productId)

    if(!singleProduct) return {notFound: true}

    return {
        props: {
            singleProduct
        }
    }
}

export default ProductDetailPage;