'use client'

import {verifyEmailAPI} from '@/api/user'
import useInput from '@/hooks/useInput'
import {emailValidator} from '@/utils/validators'
import Image from 'next/image'
import React, {useEffect, useRef, useState} from 'react'

const SignUpForm = () => {
  const [isCustomInput, setIsCustomInput] = useState(false)
  const [emailId, setEmailId] = useState('')
  const password = useInput()
  const confirmPassword = useInput()
  const [domain, setDomain] = useState('')
  const [emailVerification, setEmailVerification] = useState<'idle' | 'loading' | 'error' | 'progressing' | 'success'>('idle')
  const [emailTimer, setEmailTimer] = useState<number>(180)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

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
              <div className="flex items-center input">
                <input
                  type="text"
                  className="focus:outline-none mr-auto w-2/3"
                  placeholder="인증코드를 입력해주세요"
                  maxLength={6}
                  id="email-verification-code"
                />
                <span className="text-sm text-red-500 font-bold">
                  {' '}
                  {`${Math.floor(emailTimer / 60)
                    .toString()
                    .padStart(2, '0')}:${(emailTimer % 60).toString().padStart(2, '0')}`}
                </span>
                <button
                  type="button"
                  className="text-sm px-2 ">
                  확인
                </button>
              </div>
            </section>
          </>
        )}
      </div>
      <label>비밀번호</label>
      <input
        className="input"
        onChange={password.handleChange}
      />
      <label>비밀번호 확인</label>
      <input
        className="input"
        onChange={confirmPassword.handleChange}
      />
      <button className="button-primary">회원가입</button>
    </form>
  )
}

export default SignUpForm
