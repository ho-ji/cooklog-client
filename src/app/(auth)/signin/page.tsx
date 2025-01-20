import {Metadata} from 'next'
import Link from 'next/link'

import SignInForm from '@/components/signin/SignInForm'

export const metadata: Metadata = {
  title: '로그인 | 요리레시피 공유, 쿡로그',
  description: '쿡로그 로그인',
}

const SignIn = () => (
  <>
    <h2 className="text-2xl font-bold mb-5 text-center">로그인</h2>
    <SignInForm />
    <nav className="mt-3 text-sm text-gray-500 flex justify-center divider">
      <Link href="findidpw">아이디찾기</Link>
      <Link href="findidpw">비밀번호찾기</Link>
      <Link href="signup">회원가입</Link>
    </nav>
  </>
)

export default SignIn
