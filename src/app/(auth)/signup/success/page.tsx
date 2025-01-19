'use client'

import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'

const SignUpSuccess = () => {
  const [timeLeft, setTimeLeft] = useState<number>(3)
  const router = useRouter()

  useEffect(() => {
    if (timeLeft <= 0) {
      router.replace('/signin')
      return
    }
    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [router, timeLeft])

  return (
    <section className="text-center">
      <svg
        className="mx-auto mb-3"
        width="64px"
        height="64px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g
          id="SVGRepo_bgCarrier"
          stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <rect
            width="24"
            height="24"
            fill="white"></rect>{' '}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L12.0243 14.3899C11.4586 14.9556 10.5414 14.9556 9.97568 14.3899L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z"
            fill="#16a34a"></path>{' '}
        </g>
      </svg>
      <p className="font-bold text-xl mb-3">회원가입 완료!</p>
      <p>쿡로그의 회원이 되신 것을 환영합니다</p>
      <p>맛있는 이야기를 함께 나눠요</p>
      <p className="mt-1">
        <span className=" text-green-600 font-bold underline">{`${timeLeft}초`}</span> 후 로그인 페이지로 이동합니다
      </p>
    </section>
  )
}

export default SignUpSuccess
