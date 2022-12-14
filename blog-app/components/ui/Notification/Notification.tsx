import classes from './Notification.module.css';
import {FC} from "react";
import {NotificationType} from "../../../types/notifications";
import { createPortal } from 'react-dom'

const Notification: FC<NotificationType> = (props) => {
  const { title, message, status } = props;
  const notificationWrapper = document.getElementById('notifications') as Element | DocumentFragment

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return createPortal((
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  ), notificationWrapper);
}

export default Notification;
