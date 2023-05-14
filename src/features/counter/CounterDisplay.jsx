import { useSelector } from 'react-redux'

const CounterDisplay = () => {
  const counter = useSelector((state) => state.counter)

  return <div className="count">{counter ? counter : 0}</div>
}

export default CounterDisplay
