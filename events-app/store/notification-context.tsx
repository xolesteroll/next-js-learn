import {createContext, PropsWithChildren, useEffect, useState} from "react";
import {act} from "react-dom/test-utils";

export type NotificationData = {
    title: string | undefined
    message: string | undefined,
    status: string | undefined
}

type NotificationContextType = {
    notification: null | NotificationData,
    showNotification: (notificationData: NotificationData) => void,
    hideNotification: () => void
}


export const NotificationContext = createContext<NotificationContextType>({
    notification: null,
    showNotification: (notificationData: NotificationData) => {
    },
    hideNotification: () => {
    }
})

const NotificationContextProvider = (props: PropsWithChildren) => {
    const [activeNotification, setActiveNotification] = useState<NotificationData | null>(null)

    useEffect(() => {
        if (activeNotification && activeNotification?.status !== 'pending') {
            const turnOffNotificationTimeout = setTimeout(() => {
                setActiveNotification(null)
            }, 3000)

            return () => {
                clearTimeout(turnOffNotificationTimeout)
            }
        }

    }, [activeNotification])

    const showNotificationHandler = (notificationData: NotificationData) => {
        setActiveNotification(notificationData)
    }

    const hideNotificationHandler  = () => {
        setActiveNotification(null)
    }

    const contextValue = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    return (
        <NotificationContext.Provider value={contextValue}>
            {props.children}
        </NotificationContext.Provider>
    )
}


export default NotificationContextProvider

