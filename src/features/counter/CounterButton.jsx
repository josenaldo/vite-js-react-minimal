import { useDispatch } from 'react-redux'
import { ALERT_TYPES, setAlert } from '@/features/alert'

const CounterButton = ({ action, message, text, className }) => {
  const dispatch = useDispatch()

  const dispatchCounter = () => {
    dispatch(action())

    dispatch(
      setAlert({
        type: ALERT_TYPES.SUCCESS,
        message: message,
      })
    )
  }

  return (
    <button className={className} onClick={dispatchCounter}>
      {text}
    </button>
  )
}

export default CounterButton
