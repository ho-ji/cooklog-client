'use client'

import Image from 'next/image'
import {useEffect, useRef, useState} from 'react'

import {emailValidator} from '@/utils/validators'
import useInput from '@/hooks/useInput'

const SignUpEmailVerification = () => {
  const [isCustomInput, setIsCustomInput] = useState<boolean>(false)
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
  const [emailId, setEmailId] = useState<string>('')
  const [domain, setDomain] = useState<string>('')
  const [emailVerification, setEmailVerification] = useState<'idle' | 'loading' | 'error' | 'progressing' | 'success'>('idle')
  const [emailTimer, setEmailTimer] = useState<number>(180)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const emailVerificationCode = useInput()

  const handleEmailIdChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    resetIdle()
    setIsEmailValid(emailValidator(e.target.value, domain))
    setEmailId(e.target.value)
  }

  const handleDomainChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (e) => {
    resetIdle()
    if (e.target.value === '직접입력') {
      setIsCustomInput(true)
      setIsEmailValid(false)
      setDomain('')
      return
    }
    setIsEmailValid(emailValidator(emailId, e.target.value))
    setDomain(e.target.value)
  }

  const clearDomain: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsCustomInput(false)
    setIsEmailValid(false)
    resetIdle()
    setDomain('')
  }

  const verifyEmail = async (): Promise<void> => {
    if (!isEmailValid || emailVerification !== 'idle') return
    setEmailVerification('loading')
    // const result = await verifyEmailAPI(`${emailId.value}@${domain}`)
    //TODO 이메일 주소 중복 setEmailVerification('error')
    setEmailVerification('progressing')
    emailTimerStart()
  }

  const reverifyEmail = async (): Promise<void> => {
    resetTimer()
    //  const result = await verifyEmailAPI(`${emailId.value}@${domain}`)
    emailTimerStart()
  }

  const emailTimerStart = (): void => {
    setEmailTimer(180)
    intervalRef.current = setInterval(() => {
      setEmailTimer((prev) => {
        if (prev <= 1) {
          resetTimer()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const resetTimer = (): void => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current!)
      intervalRef.current = null
    }
  }

  const resetIdle = (): void => {
    if (emailVerification !== 'idle') {
      setEmailVerification('idle')
      resetTimer()
    }
  }

  useEffect(() => {
    return () => resetTimer()
  }, [])

  return (
    <div className="relative flex flex-col">
      <label htmlFor="email-username">이메일</label>
      <div className="flex items-center">
        <input
          type=" text"
          maxLength={64}
          className={`input w-32 ${emailVerification === 'error' && 'input-error'}`}
          id="email-username"
          value={emailId}
          onChange={handleEmailIdChange}
        />
        <span className="text-gray-400 p-1">@</span>
        {!isCustomInput ? (
          <div className={`select w-full ${emailVerification === 'error' && '[&>select]:input-error'}`}>
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
      {emailVerification === 'error' && <p className="text-sm text-red-500 mt-2">이미 가입된 이메일입니다.</p>}
      <button
        type="button"
        className={`mt-2 ${isEmailValid && emailVerification !== 'progressing' ? 'button-primary-invert' : 'button-primary-disable'}`}
        onClick={verifyEmail}>
        {emailVerification === 'loading' ? (
          <Image
            src="/images/loading.gif"
            alt="loading"
            width={24}
            height={24}
            className="mx-auto"
          />
        ) : emailVerification === 'success' ? (
          '인증완료'
        ) : (
          '이메일 인증하기'
        )}
      </button>
      {emailVerification === 'progressing' && (
        <>
          <section className="bg-gray-50 p-3 mt-5">
            <label
              className="text-sm"
              htmlFor="email-verification-code">
              이메일 인증코드
            </label>
            <div className={`flex items-center input ${emailTimer <= 0 && 'input-error'}`}>
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
                style={{width: '15px', height: '15px'}}
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
  )
}

export default SignUpEmailVerification
