import '../styles/globals.css'
import type {AppProps} from 'next/app'
import MainLayout from "../components/ui/MainLayout/MainLayout";
import NotificationContextProvider from "../store/notificationContext";

export default function App({Component, pageProps}: AppProps) {
    return (
        <NotificationContextProvider >
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </NotificationContextProvider>
    )
}
