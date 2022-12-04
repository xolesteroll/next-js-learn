import React, {FC, PropsWithChildren, useContext} from 'react';
import MainHeader from "../MainHeader/MainHeader";
import Notification from "../../ui/Notification/Notification";
import NotificationContextProvider, {NotificationContext} from "../../../store/notification-context";

const MainLayout: FC<PropsWithChildren> = ({children}) => {
    const notificationCtx = useContext(NotificationContext)

    const title = notificationCtx.notification?.title
    const message = notificationCtx.notification?.message
    const status = notificationCtx.notification?.status

    return (
        <>
            <MainHeader/>
            <main>
                {children}
                {notificationCtx.notification && <Notification title={title} message={message} status={status}/>}
            </main>
        </>

    );
};

export default MainLayout;