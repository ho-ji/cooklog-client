'use client'

import {useState} from 'react'

import {passwordValidator} from '@/utils/validators'

interface Props {
  setSignUpPassword: (password: string) => void
}

const SignUpPasswordFields = ({setSignUpPassword}: Props) => {
  const [password, setPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<null | boolean>(null)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<null | boolean>(null)

  const handlePassswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
    if (passwordError !== null) setPasswordError(!passwordValidator(e.target.value))
  }

  const verifyPassword: React.FocusEventHandler<HTMLInputElement> = () => {
    setPasswordError(!passwordValidator(password))
    setSignUpPassword('')
  }

  const handleConfirmPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setConfirmPassword(e.target.value)
    if (confirmPasswordError !== null) setConfirmPasswordError(e.target.value === '' || password !== e.target.value)
  }

  const verifyConfirmPassword: React.FocusEventHandler<HTMLInputElement> = () => {
    setConfirmPasswordError(confirmPassword === '' || password !== confirmPassword)
    if (!passwordError && password === confirmPassword) setSignUpPassword(password)
    else setSignUpPassword('')
  }

  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="password">비밀번호</label>
        <p className="text-xs mb-2 text-gray-500">8~16자리의 영문, 숫자, 특수문자 조합으로 입력해주세요.</p>
        <input
          className={`input ${passwordError && 'input-error'}`}
          value={password}
          onChange={handlePassswordChange}
          onBlur={verifyPassword}
          type="password"
          placeholder="비밀번호"
          maxLength={16}
          id="password"
        />
        {passwordError && <p className="text-xs text-red-500 mt-1">{password === '' ? '비밀번호를 입력해주세요.' : '비밀번호가 조건에 맞지 않습니다.'}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input
          className={`input ${confirmPasswordError && 'input-error'}`}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={verifyConfirmPassword}
          type="password"
          placeholder="비밀번호 확인"
          maxLength={16}
          id="confirm-password"
        />
        {confirmPasswordError && <p className="text-xs text-red-500 mt-1">{confirmPassword === '' ? '비밀번호를 다시 입력해주세요.' : '비밀번호가 일치하지 않습니다.'}</p>}
      </div>
    </>
  )
}

export default SignUpPasswordFields
