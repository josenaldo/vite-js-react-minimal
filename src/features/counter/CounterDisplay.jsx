import { useSelector } from 'react-redux'
import styles from './CounterDisplay.module.css'

const CounterDisplay = () => {
  const counter = useSelector((state) => state.counter)

  return <div className={styles.count}>{counter ? counter : 0}</div>
}

export default CounterDisplay
