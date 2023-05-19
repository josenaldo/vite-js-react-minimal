import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'

import {
  NOTIFICATION_TYPES,
  useNotificationValue,
  useNotificationDispatch,
  useRemoveNotification,
} from '@/features/notification'

import styles from './Notification.module.css'

/**
 * A component that displays an notification message.
 *
 * @function Notification
 * @returns {JSX.Element|null} The notification component or null if there is no notification to display.
 */
const notificationStyleMap = {
  [NOTIFICATION_TYPES.ERROR]: styles.notificationError,
  [NOTIFICATION_TYPES.WARNING]: styles.notificationWarning,
  [NOTIFICATION_TYPES.SUCCESS]: styles.notificationSuccess,
  [NOTIFICATION_TYPES.INFO]: styles.notificationInfo,
}

const Notification = () => {
  const dispatch = useNotificationDispatch()
  const notification = useNotificationValue()

  const removeNotification = useRemoveNotification()

  const close = () => {
    dispatch(removeNotification())
  }

  if (!notification || !notification.message) {
    return null
  }

  const selectNotificationType = (type) => {
    const notificationType = notificationStyleMap[type]
    return notificationType
  }

  return (
    <div
      className={`${styles.notification} ${selectNotificationType(
        notification.type
      )}`}
      role="notification"
    >
      <span className={styles.closeButton} onClick={close}>
        &times;
      </span>

      <p className={styles.notificationTitle}>{notification.message}</p>

      {notification.details && <p>{notification.details}</p>}
      {notification.error && (
        <ul className={styles.details}>
          {notification.error.statusCode && (
            <li>Status code: {notification.error.statusCode}</li>
          )}
          {notification.error.errorMessage && (
            <li>Message Error: {notification.error.errorMessage}</li>
          )}
          {notification.error.errorDetails && (
            <li>Details: {notification.error.errorDetails}</li>
          )}
        </ul>
      )}
    </div>
  )
}

export default Notification
