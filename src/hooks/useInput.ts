import {useState} from 'react'

const useInput = () => {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const reset = () => {
    setValue('')
  }
  return {
    value,
    onChange: handleChange,
    reset,
  }
}

export default useInput
