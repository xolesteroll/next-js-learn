import {createContext, FC, PropsWithChildren, useContext, useEffect, useState} from "react";
import {NotificationType, NotificationContextType} from "../types/notifications";

export const NotificationContext = createContext<NotificationContextType>({
    notification: null,
    showNotification: (notificationData: NotificationType) => {
    },
    hideNotification: () => {
    }
})

const NotificationContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [notificationData, setNotificationData] = useState<NotificationType | null>(null)

    useEffect(() => {
        if (notificationData && notificationData.status !== "pending") {
            const notificationTimeout = setTimeout(() => {
                setNotificationData(null)
            }, 3000)

            return () => clearTimeout(notificationTimeout)
        }
    })

    const showNotificationHandler = (notificationData: NotificationType) => {
        setNotificationData(notificationData)
    }

    const hideNotificationHandler = () => {
        setNotificationData(null)
    }

    const contextValue = {
        notification: notificationData,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }


    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationContextProvider
