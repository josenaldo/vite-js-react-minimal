import { NOTIFICATION_TYPES } from '@/features/notification'

export const HTTP_STATUS = {
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
}

export const ERROR_CODES = {
  NETWORK_ERROR: 'ERR_NETWORK',
  CANCELED: 'ERR_CANCELED',
}

export const createErrorDetails = (statusCode, errorMessage, errorDetails) => {
  let details = {}

  if (statusCode) {
    details.statusCode = statusCode
  }

  if (errorMessage) {
    details.errorMessage = errorMessage
  }

  if (errorDetails) {
    details.errorDetails = errorDetails
  }

  return details
}

export const handleAxiosError = (error, message, details = null) => {
  if (error === null) {
    return {
      type: NOTIFICATION_TYPES.ERROR,
      message: message,
      error: {
        messageError: 'Error is null',
      },
    }
  }

  const response = error?.response
  const request = error?.request
  const statusCode = response?.status

  let errorMessage = null
  let errorDetails = null

  if (response) {
    errorDetails = error.response.data.error

    if (statusCode === HTTP_STATUS.NOT_FOUND) {
      errorMessage = 'The requested resource does not exist or has been deleted'
    } else if (statusCode === HTTP_STATUS.UNAUTHORIZED) {
      errorMessage = 'Please login to access this resource'
    } else {
      errorMessage = error.message
    }
  } else if (request) {
    if (error.code === ERROR_CODES.NETWORK_ERROR) {
      errorMessage = 'Connection problems. Please try again.'
    } else if (error.code === ERROR_CODES.CANCELED) {
      errorMessage = 'Connection canceled. Please try again.'
    } else {
      errorMessage = error.message
    }
  } else {
    errorMessage = error.message
  }

  const errorObject = createErrorDetails(statusCode, errorMessage, errorDetails)

  return {
    type: NOTIFICATION_TYPES.ERROR,
    message: message,
    details: details,
    error: errorObject,
  }
}
