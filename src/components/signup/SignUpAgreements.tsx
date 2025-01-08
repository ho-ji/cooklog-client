'use client'

import {useState} from 'react'
import {Agreements} from './SignUpForm'

interface Props {
  agreements: Agreements
  setAgreements: React.Dispatch<React.SetStateAction<Agreements>>
}

const SignUpAgreements = ({agreements, setAgreements}: Props) => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)

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
      <div className="flex flex-col p-3 border border-gray-300">
        <div className="flex">
          <label>
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={handleAllChecked}
            />
            전체동의
          </label>
        </div>
        <div className="flex">
          <label>
            <input
              type="checkbox"
              name="serviceAgreement"
              checked={agreements.serviceAgreement}
              onChange={handleAgreementChange}
            />
            서비스 이용 약관
          </label>
        </div>
        <div className="flex">
          <label>
            <input
              type="checkbox"
              name="privacyAgreement"
              checked={agreements.privacyAgreement}
              onChange={handleAgreementChange}
            />
            개인정보수집 및 이용 동의
          </label>
        </div>
        <div className="flex">
          <label>
            <input
              type="checkbox"
              name="marketingAgreement"
              checked={agreements.marketingAgreement}
              onChange={handleAgreementChange}
            />
            마케팅 정보 수신 동의
          </label>
        </div>
        <div className="flex">
          <label>
            <input
              type="checkbox"
              name="eventNotificationAgreement"
              checked={agreements.eventNotificationAgreement}
              onChange={handleAgreementChange}
            />
            이벤트 알림 수신 동의
          </label>
        </div>
      </div>
    </div>
  )
}
export default SignUpAgreements
