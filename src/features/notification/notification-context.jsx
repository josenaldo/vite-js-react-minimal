import { createContext, useContext } from 'react'

import {
  NOTIFICATION_TYPES,
  NO_NOTIFICATION_STATE,
  handleAxiosError,
  NOTIFICATION_TIMEOUT,
  ERROR_NOTIFICATION_TIMEOUT,
} from '@/features/notification'

/**
 * The context object for the notification state.
 *
 * @typedef {Object} NotificationContextObject
 */
const NotificationContext = createContext(NO_NOTIFICATION_STATE)
export default NotificationContext

/**
 * The reducer function for the notification state.
 *
 * @function notificationReducer
 * @param {Object} state - The current state of the notification.
 * @param {Object} action - The action object to apply to the state.
 * @param {string} action.type - The type of the action.
 * @param {Object} action.payload - The payload of the action.
 * @param {string} action.payload.type - The type of the notification (e.g. 'info', 'warning', 'error').
 * @param {string} action.payload.message - The message to display in the notification.
 * @param {string} action.payload.details - Optional details to display in the notification.
 * @param {Error} action.payload.error - Optional error object to include in the notification.
 * @param {number} action.payload.timeoutId - Optional ID of the timeout for the notification.
 * @returns {Object} The new state of the notification.
 */
export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'notification/setNotification':
      return {
        type: action.payload.type,
        message: action.payload.message,
        details: action.payload.details,
        error: action.payload.error,
        timeoutId: action.payload.timeoutId,
      }
    case 'notification/setErrorNotification':
      return {
        type: action.payload.type,
        message: action.payload.message,
        details: action.payload.details,
        error: action.payload.error,
        timeoutId: action.payload.timeoutId,
      }
    case 'notification/removeNotification':
      return NO_NOTIFICATION_STATE
    default:
      return state
  }
}

/**
 * A hook that returns the current notification state from the notification context.
 *
 * @function useNotificationValue
 * @returns {Object} The current notification state from the notification context.
 * @throws {Error} If used outside of an NotificationContextProvider.
 */
export const useNotificationValue = () => {
  const context = useContext(NotificationContext)

  return context.notification
}

/**
 * A hook that returns the dispatch function from the notification context.
 *
 * @function useNotificationDispatch
 * @returns {Function} The dispatch function from the notification context.
 */
export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)

  return context.dispatch
}

/**
 * A hook that returns the dispatch function from the notification context.
 *
 * @function useNotificationDispatch
 * @returns {Function} The dispatch function from the notification context.
 * @throws {Error} If used outside of an NotificationContextProvider.
 */
export const useSetNotification = () => {
  const dispatch = useNotificationDispatch()
  const notificationValue = useNotificationValue()

  const setNotification = ({
    type,
    message,
    details,
    timeoutInSeconds = NOTIFICATION_TIMEOUT,
  }) => {
    if (notificationValue.timeoutId) {
      clearTimeout(notificationValue.timeoutId)
    }

    const timeoutId = setTimeout(() => {
      dispatch({ type: 'notification/removeNotification' })
    }, timeoutInSeconds * 1000)

    return {
      type: 'notification/setNotification',
      payload: {
        type,
        message,
        details,
        error: null,
        timeoutId,
      },
    }
  }

  return setNotification
}

/**
 * A hook that returns the setErrorNotification function, which can be used to
 * set an error notification.
 *
 * @function useSetErrorNotification
 * @returns {Function} The setErrorNotification function.
 */
export const useSetErrorNotification = () => {
  const dispatch = useNotificationDispatch()
  const notificationValue = useNotificationValue()

  const setErrorNotification = ({
    error,
    message,
    details,
    timeoutInSeconds = ERROR_NOTIFICATION_TIMEOUT,
  }) => {
    if (notificationValue.timeoutId) {
      clearTimeout(notificationValue.timeoutId)
    }

    const timeoutId = setTimeout(() => {
      dispatch({ type: 'notification/removeNotification' })
    }, timeoutInSeconds * 1000)

    const payload = handleAxiosError(error, message, details)

    payload.type = NOTIFICATION_TYPES.ERROR
    payload.timeoutId = timeoutId

    return {
      type: 'notification/setNotification',
      payload: payload,
    }
  }

  return setErrorNotification
}

/**
 * Returns an action object to remove the current notification from the notification state.
 *
 * @function removeNotification
 * @returns {Object} An action object to remove the current notification.
 */
export const removeNotification = () => {
  return {
    type: 'notification/removeNotification',
  }
}

/**
 * A hook that returns the `removeNotification` function, which can be used to remove the current notification from the notification state.
 *
 * @function useRemoveNotification
 * @returns {Function} The `removeNotification` function.
 */
export const useRemoveNotification = () => {
  return removeNotification
}
