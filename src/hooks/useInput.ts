import React, {useState} from 'react'

const useInput = (): {
  value: string
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  reset: () => void
} => {
  const [value, setValue] = useState<string>('')

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }
  const reset = () => {
    setValue('')
  }
  return {
    value,
    handleChange,
    reset,
  }
}

export default useInput
