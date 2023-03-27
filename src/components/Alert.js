import React from 'react'
import PropTypes from 'prop-types'
import './Alert.css'

const ALERT_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
}

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
    <div className={`alert alert-${message.type}`}>
      <span className="close-btn" onClick={closeAlert}>
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
