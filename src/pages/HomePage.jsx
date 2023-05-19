import { Counter } from '@/features/counter'
import { Togglable } from '@/features/ui'

const HomePage = () => {
  return (
    <div>
      <h2>Counter</h2>
      <Togglable buttonLabel="Open">
        <Counter />
      </Togglable>
    </div>
  )
}

export default HomePage
