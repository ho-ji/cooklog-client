'use client'

import Image from 'next/image'
import React, {useEffect, useRef, useState} from 'react'
import {useFormContext} from 'react-hook-form'

import {emailValidator, verificationCodeValidator} from '@/utils/validators'
import {checkVerificationCodeAPI, sendVerificationCodeAPI, verifyEmailAPI} from '@/api/user'
import {StatusType} from './SignUpForm'

type CodeErrorType = 'invalid' | 'expired' | 'incorrect'
const codeErrorMessage: Record<CodeErrorType, string> = {
  invalid: '6자리 숫자로 된 인증번호를 입력해주세요.',
  expired: `다시 인증하려면 '이메일 재전송'을 눌러주세요.`,
  incorrect: '인증번호가 잘못되었습니다. 다시 입력해주세요.',
}

interface StatusProps {
  status: StatusType
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>
}

const SignUpEmailVerification = ({status, setStatus}: StatusProps) => {
  const {
    register,
    getValues,
    setValue,
    resetField,
    formState: {errors},
    setError,
    clearErrors,
  } = useFormContext()
  const [isCustomInput, setIsCustomInput] = useState<boolean>(false)
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
  const [emailTimer, setEmailTimer] = useState<number>(180)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [codeError, setCodeError] = useState<CodeErrorType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleEmailIdChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    resetIdle()
    clearErrors('emailId')
    setIsEmailValid(emailValidator(e.target.value, getValues('domain')))
  }

  const handleDomainChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (e) => {
    resetIdle()
    clearErrors('emailId')
    if (e.target.value === '직접입력') {
      setIsCustomInput(true)
      setIsEmailValid(false)
      setValue('domain', '')
      return
    }
    setIsEmailValid(emailValidator(getValues('emailId'), e.target.value))
  }

  const clearDomain: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsCustomInput(false)
    clearErrors('emailId')
    setIsEmailValid(false)
    resetIdle()
    resetField('domain')
  }

  const verifyEmail: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (!isEmailValid || status !== 'idle') return
    setStatus('loading')
    try {
      const res = await verifyEmailAPI(`${getValues('emailId')}@${getValues('domain')}`)
      if (res.data) {
        setError('emailId', {message: '이미 가입된 이메일입니다.'}, {shouldFocus: true})
        setStatus('idle')
        return
      }
      setStatus('progressing')
      emailTimerStart()
      await sendVerificationCodeAPI(`${getValues('emailId')}@${getValues('domain')}`)
    } catch (error) {
      setError('emailId', {message: '잠시 후 다시 시도해주세요.'}, {shouldFocus: false})
      setStatus('idle')
      console.error(error)
    }
  }

  const reverifyEmail: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      if (loading) return
      setLoading(true)
      resetTimer()
      setVerificationCode('')
      setCodeError(null)
      await sendVerificationCodeAPI(`${getValues('emailId')}@${getValues('domain')}`)
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
      const res = await checkVerificationCodeAPI(`${getValues('emailId')}@${getValues('domain')}`, verificationCode)
      if (res.success && res.data) {
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
          {...register('emailId', {
            onChange: handleEmailIdChange,
            disabled: status === 'success',
          })}
          placeholder="이메일"
          className={`input w-32 ${errors.emailId && 'input-error'}`}
          id="email-username"
        />
        <span className="text-gray-400 p-1">@</span>
        {!isCustomInput ? (
          <div className={`select w-full ${errors.emailId && '[&>select]:input-error'}`}>
            <label className="sr-only">이메일 도메인 선택하기</label>
            <select
              {...register('domain', {
                onChange: handleDomainChange,
                disabled: status === 'success',
              })}>
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
              {...register('domain', {
                onChange: handleDomainChange,
                disabled: status === 'success',
              })}
              type="text"
              className={`input w-full pr-6 ${errors.emailId && 'input-error'}`}
              placeholder="입력해주세요"
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
      {errors.emailId && <p className="text-sm text-red-500 mt-2">{`${errors.emailId.message}`}</p>}
      <button
        type="button"
        className={`mt-2 ${isEmailValid && status !== 'progressing' ? (status === 'success' ? 'button-primary-disable' : 'button-primary-invert') : 'button-primary-disable'}`}
        onClick={verifyEmail}>
        {status === 'loading' ? <div className="spinner mx-auto"></div> : status === 'success' ? '인증완료' : '이메일 인증하기'}
      </button>
      {status === 'progressing' && (
        <>
          <section className="bg-gray-50 p-3 mt-5 relative">
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
            {loading && (
              <div className="absolute size-full top-0 left-0 flex items-center justify-center">
                <span className="spinner absolute"></span>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}

export default SignUpEmailVerification
