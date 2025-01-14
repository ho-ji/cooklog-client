'use client'

import {useState} from 'react'
import {useFormContext} from 'react-hook-form'

import {passwordValidator} from '@/utils/validators'

const SignUpPasswordFields = () => {
  const {
    register,
    formState: {errors},
    watch,
  } = useFormContext()
  const password = watch('password')

  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="password">비밀번호</label>
        <p className="text-xs mb-2 text-gray-500">8~16자리의 영문, 숫자, 특수문자 조합으로 입력해주세요.</p>
        <input
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            validate: (value) => passwordValidator(value) || '비밀번호가 조건에 맞지 않습니다.',
          })}
          className={`input ${errors.password && 'input-error'}`}
          type="password"
          placeholder="비밀번호"
          maxLength={16}
          id="password"
        />
        {errors.password && <p className="text-xs text-red-500 mt-1">{`${errors.password.message}`}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input
          {...register('confirmPassword', {
            required: '비밀번호를 다시 입력해주세요.',
            validate: (value) => password === value || '비밀번호가 일치하지 않습니다.',
          })}
          className={`input ${errors.confirmPassword && 'input-error'}`}
          type="password"
          placeholder="비밀번호 확인"
          maxLength={16}
          id="confirm-password"
        />
        {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{`${errors.confirmPassword.message}`}</p>}
      </div>
    </>
  )
}

export default SignUpPasswordFields
