import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ALERT_TYPES, removeAlert } from '@/features/alert'

import styles from './Alert.module.css'

/**
 * A component that displays an alert message.
 *
 * @function Alert
 * @returns {JSX.Element|null} The alert component or null if there is no alert to display.
 */

const alertStyleMap = {
  [ALERT_TYPES.ERROR]: styles.alertError,
  [ALERT_TYPES.WARNING]: styles.alertWarning,
  [ALERT_TYPES.SUCCESS]: styles.alertSuccess,
  [ALERT_TYPES.INFO]: styles.alertInfo,
}

const Alert = () => {
  const dispatch = useDispatch()
  const alert = useSelector((state) => state.alert)

  const close = () => {
    dispatch(removeAlert())
  }

  if (!alert || !alert.message) {
    return null
  }

  const selectAlertType = (type) => {
    const alertType = alertStyleMap[type]

    return alertType
  }

  return (
    <div className="container">
      <div
        className={`${styles.alert} ${selectAlertType(alert.type)}`}
        role="alert"
      >
        <span className={styles.closeButton} onClick={close}>
          &times;
        </span>
        <p className={styles.alertTitle}>{alert.message}</p>
        {alert.details && <p>{alert.details}</p>}
        {alert.error && (
          <ul className={styles.details}>
            {alert.error.statusCode && (
              <li>Status code: {alert.error.statusCode}</li>
            )}
            {alert.error.errorMessage && (
              <li>Message Error: {alert.error.errorMessage}</li>
            )}
            {alert.error.errorDetails && (
              <li>Details: {alert.error.errorDetails}</li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Alert
