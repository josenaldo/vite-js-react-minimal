import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Alert from '@/components/Alert'
import { ALERT_TYPE } from '@/components/Alert'

describe('<Alert />', () => {
  let setMessage

  beforeEach(() => {
    setMessage = jest.fn()
  })

  it('should render null when message prop is null', () => {
    const { container } = render(
      <Alert message={null} setMessage={setMessage} />
    )

    expect(container.firstChild).toBeNull()
  })

  it('should render message content and type', () => {
    const message = {
      type: ALERT_TYPE.SUCCESS,
      content: 'This is a success message',
    }

    const { container } = render(
      <Alert message={message} setMessage={setMessage} />
    )

    expect(container.firstChild).not.toBeNull()
    expect(container.firstChild).toHaveClass('alert')
    expect(container.firstChild).toHaveClass(`alert-${message.type}`)
  })

  it('should calls setMessage prop when close button is clicked', async () => {
    const message = {
      type: ALERT_TYPE.INFO,
      content: 'This is an info message',
    }

    const { container } = render(
      <Alert message={message} setMessage={setMessage} />
    )

    const user = userEvent.setup()
    const button = container.querySelector('.close-button')
    await user.click(button)

    expect(setMessage).toHaveBeenCalledWith(null)
  })

  it('should render error details if error object is provided', () => {
    const message = {
      type: ALERT_TYPE.ERROR,
      content: 'This is an error message',
      error: {
        statusCode: 404,
        errorMessage: 'Page not found',
        errorDetails: 'The requested page does not exist',
      },
    }

    render(<Alert message={message} setMessage={setMessage} />)

    const content = screen.getByText(message.content)
    expect(content).toBeInTheDocument()

    const statusCode = screen.getByText(
      `Status code: ${message.error.statusCode}`
    )
    expect(statusCode).toBeInTheDocument()

    const messageError = screen.getByText(
      `Message Error: ${message.error.errorMessage}`
    )
    expect(messageError).toBeInTheDocument()

    const errorDetails = screen.getByText(
      `Details: ${message.error.errorDetails}`
    )
    expect(errorDetails).toBeInTheDocument()
  })

  it('should closes alert after 10 seconds', async () => {
    const message = {
      type: ALERT_TYPE.SUCCESS,
      content: 'This is a success message',
    }

    render(<Alert message={message} setMessage={setMessage} />)

    expect(screen.getByText(message.content)).toBeInTheDocument()

    await new Promise((resolve) => setTimeout(resolve, 10000))

    expect(setMessage).toHaveBeenCalledWith(null)
  }, 15000)
})
