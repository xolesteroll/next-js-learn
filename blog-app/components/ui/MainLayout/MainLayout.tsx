import React, {FC, PropsWithChildren, useContext} from 'react';
import MainNavigation from "../MainNavigation/MainNavigation";
import Notification from "../Notification/Notification";
import {NotificationContext} from "../../../store/notificationContext";

const MainLayout: FC<PropsWithChildren> = (props) => {
    const notificationCtx = useContext(NotificationContext)

    return (
        <>
            <MainNavigation/>
            <main>
                {props.children}
            </main>
            {
                notificationCtx.notification && <Notification  {...notificationCtx.notification}/>
            }
        </>
    );
};

export default MainLayout;