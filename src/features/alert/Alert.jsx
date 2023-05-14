import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { removeAlert } from '@/features/alert/alert-reducer'

import './Alert.css'

/**
 * A component that displays an alert message.
 *
 * @function Alert
 * @returns {JSX.Element|null} The alert component or null if there is no alert to display.
 */
const Alert = () => {
  const dispatch = useDispatch()
  const alert = useSelector((state) => state.alert)

  const close = () => {
    dispatch(removeAlert())
  }

  if (!alert || !alert.message) {
    return null
  }

  return (
    <div className={`alert ${alert.type}`} role="alert">
      <span className="close-button" onClick={close}>
        &times;
      </span>
      <p className="alert-title">{alert.message}</p>
      {alert.details && <p>{alert.details}</p>}
      {alert.error && (
        <ul className="details">
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
  )
}

export default Alert
