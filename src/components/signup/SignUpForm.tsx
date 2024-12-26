'use client'

import SignUpEmailVerification from './SignUpEmailVerification'
import React, {useState} from 'react'
import {nicknameValidator, passwordValidator} from '@/utils/validators'

const SignUpForm = () => {
  const [password, setPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false)
  const [nickname, setNickname] = useState<string>('')
  const [nicknameError, setNicknameError] = useState<boolean>(false)
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState<boolean>(false)

  const handlePassswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
    if (passwordError) setPasswordError(!passwordValidator(e.target.value))
  }

  const verifyPassword: React.FocusEventHandler<HTMLInputElement> = () => setPasswordError(!passwordValidator(password))

  const handleConfirmPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setConfirmPassword(e.target.value)
    if (confirmPasswordError) setConfirmPasswordError(e.target.value === '' || password !== e.target.value)
  }

  const verifyConfirmPassword: React.FocusEventHandler<HTMLInputElement> = () => setConfirmPasswordError(confirmPassword === '' || password !== confirmPassword)

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
    <form className="flex flex-col gap-5 [&_label]:mb-1 [&_label]:inline-block">
      <SignUpEmailVerification />
      <div className="flex flex-col">
        <label htmlFor="password">비밀번호</label>
        <p className="text-xs mb-2 text-gray-500">8~16자리의 영문, 숫자, 특수문자 조합으로 입력해주세요.</p>
        <input
          className={`input ${passwordError && 'input-error'}`}
          value={password}
          onChange={handlePassswordChange}
          onBlur={verifyPassword}
          type="password"
          placeholder="비밀번호"
          maxLength={16}
          id="password"
        />
        {passwordError && <p className="text-xs text-red-500 mt-1">{password === '' ? '비밀번호를 입력해주세요.' : '비밀번호가 조건에 맞지 않습니다.'}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input
          className={`input ${confirmPasswordError && 'input-error'}`}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={verifyConfirmPassword}
          type="password"
          placeholder="비밀번호 확인"
          maxLength={16}
          id="confirm-password"
        />
        {confirmPasswordError && <p className="text-xs text-red-500 mt-1">{confirmPassword === '' ? '비밀번호를 다시 입력해주세요.' : '비밀번호가 일치하지 않습니다.'}</p>}
      </div>
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
        {nicknameError && <p className="text-xs text-red-500 mt-1">{nickname === '' ? '닉네임을 입력해주세요.' : nickname.length < 2 ? '2자 이상 입력해주세요.' : '이미 사용 중인 닉네임입니다.'}</p>}
        {isNicknameDuplicate && <p className="text-xs text-red-500 mt-1">이미 사용 중인 닉네임입니다.</p>}
      </div>
      <button className="button-primary">회원가입</button>
    </form>
  )
}

export default SignUpForm
