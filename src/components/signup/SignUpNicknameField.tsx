'use client'

import {useState} from 'react'

import {nicknameValidator} from '@/utils/validators'
import {verifyNicknameAPI} from '@/api/user'

interface Props {
  setSignUpNickname: (nickname: string) => void
}

type ErrorType = 'empty' | 'short' | 'invalid' | 'duplicate'
const errorMessage: Record<ErrorType, string> = {
  empty: '닉네임을 입력해주세요.',
  short: '2자 이상 입력해주세요.',
  invalid: '2~20자의 한글, 영문, 숫자의 조합으로 입력해주세요.',
  duplicate: '이미 사용 중인 닉네임입니다.',
}

const SignUpNicknameField = ({setSignUpNickname}: Props) => {
  const [nickname, setNickname] = useState<string>('')
  const [nicknameError, setNicknameError] = useState<ErrorType | null>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleNicknameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSignUpNickname('')
    const inputValue = e.target.value
    setNickname(inputValue)
    if (!isFocused) return
    const error = inputValue.length === 0 ? 'empty' : inputValue.length < 2 ? 'short' : !nicknameValidator(inputValue) ? 'invalid' : null
    setNicknameError(error)
  }

  const verifyNickname: React.FocusEventHandler<HTMLInputElement> = async () => {
    setIsFocused(true)
    if (nicknameError) return
    try {
      const res = await verifyNicknameAPI(nickname)
      if (res.data) {
        setNicknameError('duplicate')
        return
      }
      setSignUpNickname(nickname)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col">
      <label>닉네임</label>
      <p className="text-xs mb-2 text-gray-500">2~20자리의 닉네임을 입력해주세요.(변경 가능)</p>
      <input
        className={`input ${nicknameError && 'input-error'}`}
        value={nickname}
        maxLength={20}
        onChange={handleNicknameChange}
        onBlur={verifyNickname}
        placeholder="닉네임 입력"
      />
      {nicknameError && <p className="text-xs text-red-500 mt-1">{errorMessage[nicknameError]}</p>}
    </div>
  )
}

export default SignUpNicknameField
