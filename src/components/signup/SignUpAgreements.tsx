'use client'

import {useState} from 'react'
import Link from 'next/link'
import {useForm} from 'react-hook-form'

const SignUpAgreements = () => {
  const {register, getValues, setValue} = useForm()
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)

  const handleAllChecked: React.ChangeEventHandler<HTMLInputElement> = () => {
    const agreements = getValues()
    const allChecked = Object.values(agreements).every((value) => value)
    setIsAllChecked(!allChecked)
    Object.keys(agreements).forEach((key) => {
      setValue(key, !allChecked)
    })
  }
  const handleAgreementChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    const allChecked = Object.values(getValues()).every((value) => value)
    setIsAllChecked(allChecked)
  }

  return (
    <div className="flex flex-col">
      <label>약관동의</label>
      <div className="flex gap-2 flex-col p-3 border border-gray-300 rounded-md">
        <label className="check-box">
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={handleAllChecked}
          />
          <span className="check-box-icon"></span>
          전체동의
          <span className="ml-1 text-xs text-gray-400">선택항목에 대한 동의포함</span>
        </label>
        <hr className="my-1"></hr>
        <label className="check-box">
          <input
            {...register('serviceAgreement', {
              onChange: handleAgreementChange,
              validate: (value) => value,
            })}
            type="checkbox"
          />
          <span className="check-box-icon"></span>
          서비스 이용 약관 <span className="ml-1 text-xs text-green-600">(필수)</span>
          <Link
            href="/policy"
            className="link"></Link>
        </label>
        <label className="check-box">
          <input
            {...register('privacyAgreement', {
              onChange: handleAgreementChange,
              validate: (value) => value,
            })}
            type="checkbox"
          />
          <span className="check-box-icon"></span>
          개인정보수집 및 이용 동의<span className="ml-1 text-xs text-green-600">(필수)</span>
          <Link
            href="/policy"
            className="link"></Link>
        </label>
        <label className="check-box">
          <input
            {...register('marketingAgreement', {
              onChange: handleAgreementChange,
            })}
            type="checkbox"
          />
          <span className="check-box-icon"></span>
          마케팅 정보 수신 동의<span className="ml-1 text-xs text-gray-400">(선택)</span>
          <Link
            href="/policy"
            className="link"></Link>
        </label>
        <label className="check-box">
          <input
            {...register('eventNotificationAgreement', {
              onChange: handleAgreementChange,
            })}
            type="checkbox"
          />
          <span className="check-box-icon"></span>
          이벤트 알림 수신 동의<span className="ml-1 text-xs text-gray-400">(선택)</span>
          <Link
            href="/policy"
            className="link"></Link>
        </label>
      </div>
    </div>
  )
}
export default SignUpAgreements
