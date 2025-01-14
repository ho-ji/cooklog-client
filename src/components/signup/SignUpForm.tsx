'use client'

import React, {useState} from 'react'
import {useRouter} from 'next/navigation'

import SignUpEmailVerification from './SignUpEmailVerification'
import SignUpPasswordFields from './SignUpPasswordFields'
import SignUpNicknameField from './SignUpNicknameField'
import {signUpAPI} from '@/api/user'
import SignUpAgreements from './SignUpAgreements'
import {FormProvider, useForm} from 'react-hook-form'

interface BaseUserInfo {
  email: string
  password: string
  nickname: string
  marketingAgreement: boolean
  eventNotificationAgreement: boolean
}
interface UserInputData extends BaseUserInfo {
  emailId: string
  domain: string
}

export interface UserInfo extends BaseUserInfo {
  email: string
}

export type StatusType = 'idle' | 'loading' | 'progressing' | 'success'

const SignUpForm = () => {
  const methods = useForm<UserInputData>({
    mode: 'onTouched',
    shouldFocusError: false,
    defaultValues: {
      emailId: '',
      domain: 'default',
      password: '',
      nickname: '',
      marketingAgreement: false,
      eventNotificationAgreement: false,
    },
  })
  const [status, setStatus] = useState<StatusType>('idle')
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const signUp = async (data: UserInputData) => {
    if (status !== 'success') return
    if (loading) false
    try {
      setLoading(true)
      const res = await signUpAPI({
        email: `${data.emailId}@${data.domain}`,
        password: data.password,
        nickname: data.nickname,
        marketingAgreement: data.marketingAgreement,
        eventNotificationAgreement: data.eventNotificationAgreement,
      })
      if (res.success) {
        router.push('/signup/success')
      }
      if (res.data?.nickname) {
        methods.setError('emailId', {message: '이미 사용 중인 닉네임입니다.'}, {shouldFocus: true})
        methods.resetField('nickname')
      }
      if (res.data?.email) {
        methods.setError('emailId', {message: '이미 가입된 이메일입니다.'}, {shouldFocus: true})
        methods.resetField('emailId')
        methods.resetField('domain')
        setStatus('idle')
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-5 [&>div>label]:mb-2 [&>div>label]:inline-block"
        onSubmit={methods.handleSubmit(signUp)}>
        <SignUpEmailVerification
          status={status}
          setStatus={setStatus}
        />
        <SignUpPasswordFields />
        <SignUpNicknameField />
        <SignUpAgreements />
        <button className="button-primary disabled:button-primary-disable">{loading ? <div className="spinner mx-auto"></div> : '회원가입'}</button>
      </form>
    </FormProvider>
  )
}

export default SignUpForm
