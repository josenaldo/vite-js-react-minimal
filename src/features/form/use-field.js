import { useState } from 'react'

const useField = (type, name, label) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }

  return {
    value,
    reset,
    input: {
      name,
      type,
      value,
      onChange,
    },
    label: {
      htmlFor: name,
      children: label ? label : name,
    },
  }
}

export default useField
