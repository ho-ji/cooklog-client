'use client'

import {useState} from 'react'
import Link from 'next/link'
import {useFormContext} from 'react-hook-form'

const Agreements = [
  {name: 'serviceAgreement', label: '서비스 이용 약관', link: '/policy', required: true},
  {name: 'privacyAgreement', label: '개인정보수집 및 이용 동의', link: '/policy', required: true},
  {name: 'marketingAgreement', label: '마케팅 정보 수신 동의', link: '/policy', required: false},
  {name: 'eventNotificationAgreement', label: '이벤트 알림 수신 동의', link: '/policy', required: false},
]

const SignUpAgreements = () => {
  const {register, getValues, setValue} = useFormContext()
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)

  const handleAllChecked: React.ChangeEventHandler<HTMLInputElement> = () => {
    const allChecked = Agreements.every((agreement) => getValues(agreement.name))
    setIsAllChecked(!allChecked)
    Agreements.forEach((v) => setValue(v.name, !allChecked))
  }
  const handleAgreementChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    const allChecked = Agreements.every((agreement) => getValues(agreement.name))
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
        {Agreements.map((agreement) => (
          <label
            key={agreement.name}
            className="check-box">
            <input
              {...register(agreement.name, {
                onChange: handleAgreementChange,
                validate: (value) => !agreement.required || value,
              })}
              type="checkbox"
            />
            <span className="check-box-icon"></span>
            {agreement.label}
            {agreement.required ? <span className="ml-1 text-xs text-green-600">(필수)</span> : <span className="ml-1 text-xs text-gray-400">(선택)</span>}
            <Link
              href={agreement.link}
              className="link"></Link>
          </label>
        ))}
      </div>
    </div>
  )
}
export default SignUpAgreements
