import {FC, useContext} from 'react';

import s from './notification.module.css';
import {NotificationContext, NotificationData} from "../../../store/notification-context";

const Notification: FC<NotificationData> = (props) => {
    const notificationCtx = useContext(NotificationContext);

    const closeNotificationHandler = () => {
        notificationCtx.hideNotification()
    }

    const { title, message, status } = props;

    let statusClasses = '';

    if (status === 'success') {
        statusClasses = s.success;
    }

    if (status === 'error') {
        statusClasses = s.error;
    }

    if (status === 'pending') {
        statusClasses = s.pending;
    }

    const activeClasses = `${s.notification} ${statusClasses}`;

    return (
        <div className={activeClasses} onClick={closeNotificationHandler}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}

export default Notification;