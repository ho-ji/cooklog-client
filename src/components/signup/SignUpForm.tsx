'use client'

import SignUpEmailVerification from './SignUpEmailVerification'
import SignUpPasswordFields from './SignUpPasswordFields'
import SignUpNicknameField from './SignUpNicknameField'
import React, {useState} from 'react'

const SignUpForm = () => {
  const [signUpEmail, setSignUpEmail] = useState<string>('')
  const [signUpPassword, setSignUpPassword] = useState<string>('')
  const [signUpNickname, setSignUpNickname] = useState<string>('')

  const signUp: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    <form
      className="flex flex-col gap-5 [&_label]:mb-1 [&_label]:inline-block"
      onSubmit={signUp}>
      <SignUpEmailVerification setSignUpEmail={setSignUpEmail} />
      <SignUpPasswordFields setSignUpPassword={setSignUpPassword} />
      <SignUpNicknameField setSignUpNickname={setSignUpNickname} />
      <button
        className="button-primary disabled:button-primary-disable"
        disabled={!signUpEmail && !signUpPassword && !signUpNickname}>
        회원가입
      </button>
    </form>
  )
}

export default SignUpForm
