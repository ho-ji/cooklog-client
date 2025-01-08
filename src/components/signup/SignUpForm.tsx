'use client'

import React, {useState} from 'react'
import {useRouter} from 'next/navigation'

import SignUpEmailVerification from './SignUpEmailVerification'
import SignUpPasswordFields from './SignUpPasswordFields'
import SignUpNicknameField from './SignUpNicknameField'
import {signUpAPI} from '@/api/user'
import SignUpAgreements from './SignUpAgreements'

export interface Agreements {
  serviceAgreement: boolean
  privacyAgreement: boolean
  marketingAgreement: boolean
  eventNotificationAgreement: boolean
}

export interface UserInfo {
  email: string
  password: string
  nickname: string
  marketingAgreement: boolean
  eventNotificationAgreement: boolean
}

const SignUpForm = () => {
  const [signUpEmail, setSignUpEmail] = useState<string>('')
  const [signUpPassword, setSignUpPassword] = useState<string>('')
  const [signUpNickname, setSignUpNickname] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [agreements, setAgreements] = useState<Agreements>({
    serviceAgreement: false,
    privacyAgreement: false,
    marketingAgreement: false,
    eventNotificationAgreement: false,
  })
  const router = useRouter()

  const signUp: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (loading) false
    try {
      setLoading(true)
      const res = await signUpAPI({
        email: signUpEmail,
        password: signUpPassword,
        nickname: signUpNickname,
        marketingAgreement: agreements.marketingAgreement,
        eventNotificationAgreement: agreements.eventNotificationAgreement,
      })
      if (res.success) {
        router.push('/signup/success')
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="flex flex-col gap-5 [&>div>label]:mb-2 [&>div>label]:inline-block"
      onSubmit={signUp}>
      <SignUpEmailVerification setSignUpEmail={setSignUpEmail} />
      <SignUpPasswordFields setSignUpPassword={setSignUpPassword} />
      <SignUpNicknameField setSignUpNickname={setSignUpNickname} />
      <SignUpAgreements
        agreements={agreements}
        setAgreements={setAgreements}
      />
      <button
        className="button-primary disabled:button-primary-disable"
        disabled={signUpEmail === '' || signUpPassword === '' || signUpNickname === '' || !agreements.serviceAgreement || !agreements.privacyAgreement}>
        {loading ? <div className="spinner mx-auto"></div> : '회원가입'}
      </button>
    </form>
  )
}

export default SignUpForm
