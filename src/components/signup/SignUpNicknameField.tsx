'use client'

import {useState} from 'react'

import {nicknameValidator} from '@/utils/validators'

const SignUpNicknameField = () => {
  const [nickname, setNickname] = useState<string>('')
  const [nicknameError, setNicknameError] = useState<boolean>(false)
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState<boolean>(false)

  const handleNicknameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value)
    setIsNicknameDuplicate(false)
    setNicknameError(!nicknameValidator(e.target.value))
  }

  const verifyNickname: React.FocusEventHandler<HTMLInputElement> = async () => {
    if (nicknameError) return
    // const isDuplicate = await verifyNicknameAPI(nickname.value)
    // if(isDuplicate) setIsNicknameDuplicate(true)
  }
  return (
    <div className="flex flex-col">
      <label>닉네임</label>
      <p className="text-xs mb-2 text-gray-500">2~20자리의 닉네임을 입력해주세요.(변경 가능)</p>
      <input
        className={`input ${(nicknameError || isNicknameDuplicate) && 'input-error'}`}
        value={nickname}
        onChange={handleNicknameChange}
        onBlur={verifyNickname}
        placeholder="닉네임 입력"
      />
      {nicknameError && (
        <p className="text-xs text-red-500 mt-1">{nickname === '' ? '닉네임을 입력해주세요.' : nickname.length < 2 ? '2자 이상 입력해주세요.' : '2~20자의 한글,영문,숫자의 조합으로 입력해주세요.'}</p>
      )}
      {isNicknameDuplicate && <p className="text-xs text-red-500 mt-1">이미 사용 중인 닉네임입니다.</p>}
    </div>
  )
}

export default SignUpNicknameField
