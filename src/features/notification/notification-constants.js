/**
 * The available types of notifications.
 *
 * @constant {Object} NotificationTypes
 * @property {string} SUCCESS - The success notification type.
 * @property {string} INFO - The info notification type.
 * @property {string} WARNING - The warning notification type.
 * @property {string} ERROR - The error notification type.
 */
export const NOTIFICATION_TYPES = {
  SUCCESS: 'notification-success',
  INFO: 'notification-info',
  WARNING: 'notification-warning',
  ERROR: 'notification-error',
}

/**
 * The initial state for the notification slice when there is no notification to display.
 *
 * @constant {Object} NoNotificationState
 * @property {string} type - The type of the notification (e.g. 'success', 'info', 'warning', 'error').
 * @property {string} message - The message to display in the notification.
 * @property {string} details - Optional details to display in the notification.
 * @property {Error} error - Optional error object to include in the notification.
 * @property {number} timeoutId - Optional ID of the timeout for the notification.
 */
export const NO_NOTIFICATION_STATE = {
  type: null,
  message: null,
  details: null,
  error: null,
  timeoutId: null,
}

/**
 * The default timeout in seconds for notifications.
 *
 * @constant {number} NOTIFICATION_TIMEOUT
 */
export const NOTIFICATION_TIMEOUT = 5

/**
 * The default timeout in seconds for error notifications.
 *
 * @constant {number} ERROR_NOTIFICATION_TIMEOUT
 */
export const ERROR_NOTIFICATION_TIMEOUT = 15
