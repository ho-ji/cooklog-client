'use client'

import {verifyEmailAPI} from '@/api/user'
import useInput from '@/hooks/useInput'
import {emailValidator} from '@/utils/validators'
import Image from 'next/image'
import React, {useEffect, useRef, useState} from 'react'

const SignUpForm = () => {
  const [isCustomInput, setIsCustomInput] = useState<boolean>(false)
  const [emailId, setEmailId] = useState<string>('')
  const password = useInput()
  const confirmPassword = useInput()
  const [domain, setDomain] = useState<string>('')
  const [emailVerification, setEmailVerification] = useState<'idle' | 'loading' | 'error' | 'progressing' | 'success'>('idle')
  const [emailTimer, setEmailTimer] = useState<number>(180)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const emailVerificationCode = useInput()

  const handleEmailIdChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    resetIdle()
    setEmailId(e.target.value)
  }

  const handleDomainChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (e) => {
    resetIdle()
    if (e.target.value === '직접입력') {
      setIsCustomInput(true)
      setDomain('')
      return
    }
    setDomain(e.target.value)
  }

  const clearDomain: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsCustomInput(false)
    resetIdle()
    setDomain('')
  }

  const verifyEmail = async () => {
    setEmailVerification('loading')
    // const result = await verifyEmailAPI(`${emailId.value}@${domain}`)
    setEmailVerification('progressing')
    emailTimerStart()
  }

  const reverifyEmail = async () => {
    clearInterval(intervalRef.current!)
    //  const result = await verifyEmailAPI(`${emailId.value}@${domain}`)
    emailTimerStart()
  }

  const emailTimerStart = () => {
    setEmailTimer(180)
    intervalRef.current = setInterval(() => {
      setEmailTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          intervalRef.current = null
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const resetIdle = (): void => {
    if (emailVerification !== 'idle') {
      setEmailVerification('idle')
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current!)
        intervalRef.current = null
      }
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current)
    }
  }, [])

  const isEmailValid: boolean = emailValidator(emailId, domain)

  return (
    <form className="flex flex-col [&_label]:mb-2 [&_label]:inline-block">
      <div className="relative">
        <label htmlFor="email-username">이메일</label>
        <div className="flex items-center">
          <input
            type=" text"
            maxLength={64}
            className="input w-32"
            id="email-username"
            value={emailId}
            onChange={handleEmailIdChange}
          />
          <span className="text-gray-400 p-1">@</span>
          {!isCustomInput ? (
            <div className="select w-full">
              <label className="sr-only">이메일 도메일 선택하기</label>
              <select
                onChange={handleDomainChange}
                defaultValue="default">
                <option
                  disabled
                  value="default">
                  선택해주세요
                </option>
                <option>naver.com</option>
                <option>hanmail.net</option>
                <option>daum.net</option>
                <option>gmail.com</option>
                <option>직접입력</option>
              </select>
            </div>
          ) : (
            <>
              <input
                type="text"
                className="input w-full pr-6"
                placeholder="입력해주세요"
                onChange={handleDomainChange}
              />
              <button
                className="absolute right-1"
                type="button"
                onClick={clearDomain}>
                <Image
                  src="/images/delete.svg"
                  alt="x"
                  width={20}
                  height={20}
                />
              </button>
            </>
          )}
        </div>
        {emailVerification === 'idle' && (
          <button
            type="button"
            className={`w-full my-3 ${isEmailValid ? 'button-primary-invert' : 'button-primary-disable'}`}
            onClick={verifyEmail}>
            이메일 인증하기
          </button>
        )}
        {emailVerification === 'loading' && (
          <div className="w-full my-3 button-primary-disable">
            <Image
              src="/images/loading.gif"
              alt="loading"
              width={24}
              height={24}
              className="mx-auto"
            />
          </div>
        )}
        {emailVerification === 'progressing' && (
          <>
            <div className="w-full my-3 button-primary-disable text-center">이메일 인증하기</div>
            <section className="bg-gray-50 p-3 my-5">
              <label
                className="text-sm"
                htmlFor="email-verification-code">
                이메일 인증코드
              </label>
              <div className={`flex items-center input ${emailTimer <= 0 && 'border border-red-500'}`}>
                <input
                  type="text"
                  className="focus:outline-none mr-auto w-2/3"
                  placeholder="인증코드를 입력해주세요"
                  maxLength={6}
                  id="email-verification-code"
                  onChange={emailVerificationCode.handleChange}
                />
                <span className="text-sm text-red-500 ">
                  {' '}
                  {`${Math.floor(emailTimer / 60)
                    .toString()
                    .padStart(2, '0')}:${(emailTimer % 60).toString().padStart(2, '0')}`}
                </span>
                <button
                  type="button"
                  className={`text-sm px-2 ${emailVerificationCode.value && emailTimer > 0 ? 'text-green-600 font-semibold' : 'text-gray-500 font-normal'}`}
                  disabled={emailTimer <= 0}>
                  확인
                </button>
              </div>
              {emailTimer <= 0 && <p className="text-xs text-red-500 mt-1">{`다시 인증하려면 '이메일 재전송'을 눌러주세요.`}</p>}
              <div className="text-xs flex items-middle mt-2 gap-0.5 text-gray-500">
                <Image
                  src="/images/info.svg"
                  alt="i"
                  width={15}
                  height={15}
                />
                <p>이메일을 받지 못하셨나요?</p>
                <button
                  type="button"
                  className="underline"
                  onClick={reverifyEmail}>
                  이메일 재전송
                </button>
              </div>
            </section>
          </>
        )}
      </div>
      <label>비밀번호</label>
      <input
        className="input"
        value={password.value}
        onChange={password.handleChange}
      />
      <label>비밀번호 확인</label>
      <input
        className="input"
        value={confirmPassword.value}
        onChange={confirmPassword.handleChange}
      />
      <button className="button-primary">회원가입</button>
    </form>
  )
}

export default SignUpForm
