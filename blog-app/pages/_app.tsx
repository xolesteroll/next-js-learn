import '../styles/globals.css'
import type {AppProps} from 'next/app'
import MainLayout from "../components/ui/MainLayout/MainLayout";
import NotificationContextProvider from "../store/notificationContext";
import Head from "next/head";

export default function App({Component, pageProps}: AppProps) {
    return (
        <NotificationContextProvider >
            <MainLayout>
                <Head >
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                </Head>
                <Component {...pageProps} />
            </MainLayout>
        </NotificationContextProvider>
    )
}
