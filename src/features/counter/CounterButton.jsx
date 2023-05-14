import { useDispatch } from 'react-redux'
import { ALERT_TYPES, setAlert } from '@/features/alert'

const alertStyleMap = {
  [ALERT_TYPES.ERROR]: 'danger',
  [ALERT_TYPES.WARNING]: 'warning',
  [ALERT_TYPES.SUCCESS]: 'success',
  [ALERT_TYPES.INFO]: 'info',
}

const CounterButton = ({
  action,
  message,
  details,
  text,
  type = ALERT_TYPES.SUCCESS,
}) => {
  const dispatch = useDispatch()

  const dispatchCounter = () => {
    dispatch(action())

    dispatch(
      setAlert({
        type: type,
        message: message,
        timeoutInSeconds: 20,
        details: details,
      })
    )
  }

  return (
    <button className={alertStyleMap[type]} onClick={dispatchCounter}>
      {text}
    </button>
  )
}

export default CounterButton
