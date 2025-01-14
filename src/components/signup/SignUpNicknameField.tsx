'use client'

import {useState} from 'react'
import {useFormContext} from 'react-hook-form'

import {nicknameValidator} from '@/utils/validators'
import {verifyNicknameAPI} from '@/api/user'

const SignUpNicknameField = () => {
  const {
    register,
    getValues,
    setError,
    formState: {errors},
  } = useFormContext()
  const [isChange, setIsChange] = useState<boolean>(false)

  const handleNicknameChange: React.ChangeEventHandler<HTMLInputElement> = () => setIsChange(true)

  const verifyNickname: React.FocusEventHandler<HTMLInputElement> = async () => {
    if (!isChange) return
    try {
      const res = await verifyNicknameAPI(getValues('nickname'))
      setIsChange(false)
      if (res.data) {
        setError('nickname', {type: 'duplicate', message: '이미 사용 중인 닉네임입니다.'})
        return
      }
    } catch (error) {
      setError('nickname', {type: 'retry', message: '잠시 후 다시 시도해주세요.'})
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col">
      <label>닉네임</label>
      <p className="text-xs mb-2 text-gray-500">2~20자리의 닉네임을 입력해주세요.(변경 가능)</p>
      <input
        {...register('nickname', {
          required: '닉네임을 입력해주세요.',
          onChange: handleNicknameChange,
          onBlur: verifyNickname,
          validate: {
            short: (value) => value.length !== 1 || '2자 이상 입력해주세요.',
            invalid: (value) => nicknameValidator(value) || '2~20자의 한글, 영문, 숫자의 조합으로 입력해주세요.',
          },
        })}
        className={`input ${errors.nickname && 'input-error'}`}
        maxLength={20}
        placeholder="닉네임 입력"
      />
      {errors.nickname && <p className="text-xs text-red-500 mt-1">{`${errors.nickname?.message}`}</p>}
    </div>
  )
}

export default SignUpNicknameField
