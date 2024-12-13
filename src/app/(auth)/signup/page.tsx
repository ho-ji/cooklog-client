import SignUpForm from '@/components/signup/SignUpForm'
import {Metadata} from 'next'

export const metadata: Metadata = {
  title: '회원가입 | 요리레시피 공유, 쿡로그',
  description: '쿡로그 회원가입',
}

const SignUp = () => (
  <>
    <h2 className="text-lg font-bold text-center mb-5">회원가입</h2>
    <SignUpForm />
  </>
)

export default SignUp
