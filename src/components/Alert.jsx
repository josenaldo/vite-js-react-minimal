import React from 'react'
import PropTypes from 'prop-types'
import './Alert.css'

const ALERT_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
}

/**
 * Component that renders a message alert.
 *
 * @component
 *
 * @param {Object} props - The props object.
 * @param {Object} props.message - The message object to display.
 * @param {string} props.message.type - The type of the message (success, error, or info).
 * @param {string} props.message.content - The main content of the message.
 * @param {string} [props.message.details] - Additional details about the message.
 * @param {Object} [props.message.error] - The error object associated with the message.
 * @param {number} [props.message.error.statusCode] - The HTTP status code of the error.
 * @param {string} [props.message.error.errorMessage] - The error message.
 * @param {string} [props.message.error.errorDetails] - Additional details about the error.
 * @param {function} props.setMessage - The function to call when the alert is closed.
 *
 * @returns {JSX.Element|null} - The rendered message alert, or null if no message is provided.
 *
 * @example
 * <Alert message={{ type: 'success', content: 'The operation was successful' }} setMessage={setMessage} />
 */
const Alert = ({ message, setMessage }) => {
  const timeoutRef = React.useRef()

  React.useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setMessage(null)
    }, 10000)

    return () => clearTimeout(timeoutRef.current)
  }, [message])

  const closeAlert = () => {
    setMessage(null)
  }

  if (!message) {
    return null
  }

  return (
    <div className={`alert alert-${message.type}`} role="alert">
      <span className="close-button" onClick={closeAlert}>
        &times;
      </span>
      <p className="alert-title">{message.content}</p>
      {message.details && <p>{message.details}</p>}
      {message.error && (
        <ul className="details">
          {message.error.statusCode && (
            <li>Status code: {message.error.statusCode}</li>
          )}
          {message.error.errorMessage && (
            <li>Message Error: {message.error.errorMessage}</li>
          )}
          {message.error.errorDetails && (
            <li>Details: {message.error.errorDetails}</li>
          )}
        </ul>
      )}
    </div>
  )
}

Alert.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.oneOf(Object.values(ALERT_TYPE)).isRequired,
    content: PropTypes.string.isRequired,
    details: PropTypes.string,
    error: PropTypes.object,
  }),
  setMessage: PropTypes.func.isRequired,
}

export { ALERT_TYPE }
export default Alert
