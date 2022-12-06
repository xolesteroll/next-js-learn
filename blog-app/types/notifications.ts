export type NotificationType = {
    title: string,
    message: string,
    status: string
}

export type NotificationContextType = {
    notification: NotificationType | null,
    showNotification: (notificationData: NotificationType) => void,
    hideNotification: () => void
}