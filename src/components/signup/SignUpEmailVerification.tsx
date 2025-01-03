'use client'

import Image from 'next/image'
import {useEffect, useRef, useState} from 'react'

import {emailValidator, verificationCodeValidator} from '@/utils/validators'
import {checkVerificationCodeAPI, sendVerificationCodeAPI, verifyEmailAPI} from '@/api/user'

interface Props {
  setSignUpEmail: (email: string) => void
}

type StatusType = 'idle' | 'loading' | 'error' | 'progressing' | 'success'
type CodeErrorType = 'invalid' | 'expired' | 'incorrect'
const codeErrorMessage: Record<CodeErrorType, string> = {
  invalid: '6자리 숫자로 된 인증번호를 입력해주세요.',
  expired: `다시 인증하려면 '이메일 재전송'을 눌러주세요.`,
  incorrect: '인증번호가 잘못되었습니다. 다시 입력해주세요.',
}

const SignUpEmailVerification = ({setSignUpEmail}: Props) => {
  const [isCustomInput, setIsCustomInput] = useState<boolean>(false)
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
  const [emailId, setEmailId] = useState<string>('')
  const [domain, setDomain] = useState<string>('')
  const [status, setStatus] = useState<StatusType>('idle')
  const [emailTimer, setEmailTimer] = useState<number>(180)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [codeError, setCodeError] = useState<CodeErrorType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

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
    if (!isEmailValid || status !== 'idle') return
    setStatus('loading')

    try {
      const res = await verifyEmailAPI(`${emailId}@${domain}`)
      if (res.data) {
        setStatus('error')
        return
      }
      setStatus('progressing')
      emailTimerStart()
      await sendVerificationCodeAPI(`${emailId}@${domain}`)
    } catch (error) {
      console.error(error)
    }
  }

  const reverifyEmail = async (): Promise<void> => {
    try {
      if (loading) return
      setLoading(true)
      resetTimer()
      setVerificationCode('')
      setCodeError(null)
      await sendVerificationCodeAPI(`${emailId}@${domain}`)
      emailTimerStart()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerificationCodeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setVerificationCode(e.target.value)
    if (codeError !== 'expired') setCodeError(null)
  }

  const checkVerificationCode: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (loading) return
    if (!verificationCodeValidator(verificationCode)) {
      setCodeError('invalid')
      return
    }
    try {
      setLoading(true)
      const res = await checkVerificationCodeAPI(`${emailId}@${domain}`, verificationCode)
      if (res.success && res.data) {
        setSignUpEmail(`${emailId}@${domain}`)
        setStatus('success')
        return
      }
      if (!res.success) setCodeError('expired')
      else setCodeError('incorrect')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const emailTimerStart = (): void => {
    setEmailTimer(180)
    intervalRef.current = setInterval(() => {
      setEmailTimer((prev) => {
        if (prev <= 1) {
          resetTimer()
          setCodeError('expired')
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
    if (status !== 'idle') {
      setStatus('idle')
      resetTimer()
      setVerificationCode('')
      setCodeError(null)
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
          placeholder="이메일"
          className={`input w-32 ${status === 'error' && 'input-error'}`}
          id="email-username"
          value={emailId}
          onChange={handleEmailIdChange}
          disabled={status === 'success'}
        />
        <span className="text-gray-400 p-1">@</span>
        {!isCustomInput ? (
          <div className={`select w-full ${status === 'error' && '[&>select]:input-error'}`}>
            <label className="sr-only">이메일 도메일 선택하기</label>
            <select
              onChange={handleDomainChange}
              defaultValue="default"
              disabled={status === 'success'}>
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
      {status === 'error' && <p className="text-sm text-red-500 mt-2">이미 가입된 이메일입니다.</p>}
      <button
        type="button"
        className={`mt-2 ${isEmailValid && status !== 'progressing' ? (status === 'success' ? 'button-primary-disable' : 'button-primary-invert') : 'button-primary-disable'}`}
        onClick={verifyEmail}>
        {status === 'loading' ? <div className="spinner mx-auto"></div> : status === 'success' ? '인증완료' : '이메일 인증하기'}
      </button>
      {status === 'progressing' && (
        <>
          <section className="bg-gray-50 p-3 mt-5">
            <label
              className="text-sm"
              htmlFor="verification-code">
              이메일 인증코드
            </label>
            <div className={`flex items-center input ${codeError && 'input-error'}`}>
              <input
                type="text"
                className="focus:outline-none mr-auto w-2/3"
                placeholder="인증코드를 입력해주세요"
                value={verificationCode}
                maxLength={6}
                id="verification-code"
                onChange={handleVerificationCodeChange}
              />
              <span className="text-sm text-red-500 ">
                {`${Math.floor(emailTimer / 60)
                  .toString()
                  .padStart(2, '0')}:${(emailTimer % 60).toString().padStart(2, '0')}`}
              </span>
              <button
                type="button"
                onClick={checkVerificationCode}
                className={`text-sm px-2 ${!codeError && verificationCode ? 'text-green-600 font-semibold' : 'text-gray-500 font-normal'}`}
                disabled={!!codeError}>
                확인
              </button>
            </div>
            {codeError && <p className="text-xs text-red-500 mt-1">{codeErrorMessage[codeError]}</p>}
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
