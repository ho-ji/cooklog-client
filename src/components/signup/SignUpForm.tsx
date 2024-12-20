'use client'

import useInput from '@/hooks/useInput'
import SignUpEmailVerification from './SignUpEmailVerification'
import React, {useState} from 'react'
import {passwordValidator} from '@/utils/validators'

const SignUpForm = () => {
  const password = useInput()
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const confirmPassword = useInput()
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false)

  const verifyPassword: React.FocusEventHandler<HTMLInputElement> = () => {
    setPasswordError(!passwordValidator(password.value))
  }
  const verifyConfirmPassword: React.FocusEventHandler<HTMLInputElement> = () => setConfirmPasswordError(confirmPassword.value === '' || password.value !== confirmPassword.value)

  return (
    <form className="flex flex-col gap-5 [&_label]:mb-1 [&_label]:inline-block">
      <SignUpEmailVerification />
      <div className="flex flex-col">
        <label htmlFor="password">비밀번호</label>
        <p className="text-xs mb-2 text-gray-500">8~16자리의 영문, 숫자, 특수문자 조합으로 입력해주세요.</p>
        <input
          className={`input ${passwordError && 'input-error'}`}
          value={password.value}
          onChange={password.handleChange}
          onBlur={verifyPassword}
          type="password"
          placeholder="비밀번호"
          maxLength={16}
          id="password"
        />
        {passwordError && <p className="text-xs text-red-500 mt-1">{password.value === '' ? '비밀번호를 입력해주세요.' : '비밀번호가 조건에 맞지 않습니다.'}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input
          className={`input ${confirmPasswordError && 'input-error'}`}
          value={confirmPassword.value}
          onChange={confirmPassword.handleChange}
          onBlur={verifyConfirmPassword}
          type="password"
          placeholder="비밀번호 확인"
          maxLength={16}
          id="confirm-password"
        />
        {confirmPasswordError && <p className="text-xs text-red-500 mt-1">{confirmPassword.value === '' ? '비밀번호를 다시 입력해주세요.' : '비밀번호가 일치하지 않습니다.'}</p>}
      </div>
      <button className="button-primary">회원가입</button>
    </form>
  )
}

export default SignUpForm
