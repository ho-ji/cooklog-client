'use client'

import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'

import {signInAPI} from '@/api/user'
import {emailValidator, passwordValidator} from '@/utils/validators'

interface SignInInfo {
  email: string
  password: string
}

const SignInForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {errors},
    clearErrors,
    setError,
  } = useForm<SignInInfo>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<SignInInfo> = async (data) => {
    if (loading) return
    try {
      setLoading(true)
      const res = await signInAPI(data.email, data.password)
      if (res.success) {
        const {accessToken, uid} = res.data
        localStorage.setItem('uid', uid)
        router.push('/')
        return
      }
      setError('email', {message: '이메일 혹은 비밀번호가 맞지 않습니다. 다시 확인해 주세요.'})
    } catch (error) {
      setError('email', {message: '일시적인 오류로 로그인을 할 수 없습니다. 잠시 후 다시 시도해 주세요.'})
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input
          {...register('email', {
            required: '이메일을 입력해주세요.',
            validate: (value) => emailValidator(value) || '이메일을 정확하게 입력해주세요.',
            onChange: () => clearErrors(['email', 'password']),
          })}
          type="text"
          placeholder="아이디"
          className="input w-full"
        />
      </label>
      <label>
        <input
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            validate: (value) => passwordValidator(value) || '입력한 비밀번호가 올바르지 않습니다.',
            onChange: () => clearErrors(['email', 'password']),
          })}
          type="password"
          placeholder="비밀번호"
          className="input w-full"
        />
      </label>
      {errors && <p className="text-red-500 text-sm">{errors.email?.message || errors.password?.message}</p>}
      <button
        className={`button-primary ${loading && 'button-primary-disable'}`}
        disabled={loading}>
        {loading ? <div className="spinner mx-auto"></div> : '로그인'}
      </button>
    </form>
  )
}

export default SignInForm
