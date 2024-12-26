'use client'

import SignUpEmailVerification from './SignUpEmailVerification'
import SignUpPasswordFields from './SignUpPasswordFields'
import SignUpNicknameField from './SignUpNicknameField'

const SignUpForm = () => {
  return (
    <form className="flex flex-col gap-5 [&_label]:mb-1 [&_label]:inline-block">
      <SignUpEmailVerification />
      <SignUpPasswordFields />
      <SignUpNicknameField />
      <button className="button-primary">회원가입</button>
    </form>
  )
}

export default SignUpForm
