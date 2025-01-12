'use client'

import {useState} from 'react'
import Link from 'next/link'

interface Agreements {
  serviceAgreement: boolean
  privacyAgreement: boolean
  marketingAgreement: boolean
  eventNotificationAgreement: boolean
}

const SignUpAgreements = () => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)
  const [agreements, setAgreements] = useState<Agreements>({
    serviceAgreement: false,
    privacyAgreement: false,
    marketingAgreement: false,
    eventNotificationAgreement: false,
  })

  const handleAllChecked: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const allChecked = Object.values(agreements).every((value) => value)
    setIsAllChecked(!allChecked)
    setAgreements({
      serviceAgreement: !allChecked,
      privacyAgreement: !allChecked,
      marketingAgreement: !allChecked,
      eventNotificationAgreement: !allChecked,
    })
  }
  const handleAgreementChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {name, checked} = e.target
    setAgreements((prev) => {
      const updatedAgreements = {...prev, [name]: checked}
      const allChecked = Object.values(updatedAgreements).every((value) => value)
      setIsAllChecked(allChecked)
      return updatedAgreements
    })
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
            type="checkbox"
            name="serviceAgreement"
            checked={agreements.serviceAgreement}
            onChange={handleAgreementChange}
          />
          <span className="check-box-icon"></span>
          서비스 이용 약관 <span className="ml-1 text-xs text-green-600">(필수)</span>
          <Link
            href="/policy"
            className="link"></Link>
        </label>
        <label className="check-box">
          <input
            type="checkbox"
            name="privacyAgreement"
            checked={agreements.privacyAgreement}
            onChange={handleAgreementChange}
          />
          <span className="check-box-icon"></span>
          개인정보수집 및 이용 동의<span className="ml-1 text-xs text-green-600">(필수)</span>
          <Link
            href="/policy"
            className="link"></Link>
        </label>
        <label className="check-box">
          <input
            type="checkbox"
            name="marketingAgreement"
            checked={agreements.marketingAgreement}
            onChange={handleAgreementChange}
          />
          <span className="check-box-icon"></span>
          마케팅 정보 수신 동의<span className="ml-1 text-xs text-gray-400">(선택)</span>
          <Link
            href="/policy"
            className="link"></Link>
        </label>
        <label className="check-box">
          <input
            type="checkbox"
            name="eventNotificationAgreement"
            checked={agreements.eventNotificationAgreement}
            onChange={handleAgreementChange}
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
