import '../styles/globals.css'
import type {AppProps} from 'next/app'
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Head from "next/head";

export default function App({Component, pageProps}: AppProps) {
    return (
        <MainLayout>
            <Head>
                <title>
                    Next Events App
                </title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Component {...pageProps} />
        </MainLayout>
    );
}
