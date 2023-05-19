import { useReducer } from 'react'
import {
  NotificationContext,
  notificationReducer,
  NO_NOTIFICATION_STATE,
} from '@/features/notification'

/**
 * A provider component that wraps its children with an notification context.
 *
 * @function NotificationContextProvider
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The child elements to wrap with the notification context.
 * @returns {JSX.Element} The notification context provider component.
 */
export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(
    notificationReducer,
    NO_NOTIFICATION_STATE
  )

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}
