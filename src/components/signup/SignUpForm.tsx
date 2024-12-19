'use client'

import useInput from '@/hooks/useInput'
import SignUpEmailVerification from './SignUpEmailVerification'

const SignUpForm = () => {
  const password = useInput()
  const confirmPassword = useInput()

  return (
    <form className="flex flex-col gap-5 [&_label]:mb-1 [&_label]:inline-block">
      <SignUpEmailVerification />
      <div className="flex flex-col">
        <label htmlFor="password">비밀번호</label>
        <p className="text-xs mb-2 text-gray-500">영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</p>
        <input
          className="input"
          value={password.value}
          onChange={password.handleChange}
          type="password"
          placeholder="비밀번호"
          id="password"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input
          className="input"
          value={confirmPassword.value}
          onChange={confirmPassword.handleChange}
          type="password"
          placeholder="비밀번호 확인"
          id="confirm-password"
        />
      </div>
      <button className="button-primary">회원가입</button>
    </form>
  )
}

export default SignUpForm
