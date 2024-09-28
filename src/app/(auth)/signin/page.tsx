import {Metadata} from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '로그인 | 요리레시피 공유, 쿡로그',
  description: '쿡로그 로그인',
}

const SignIn = () => (
  <>
    <h2 className="text-xl font-bold text-center mb-5">로그인</h2>
    <form className="flex flex-col gap-4">
      <label
        htmlFor="signInId"
        className="sr-only">
        아이디
      </label>
      <input
        type="text"
        id="signInId"
        placeholder="아이디"
        className="input w-full"></input>
      <label
        htmlFor="signInPassword"
        className="sr-only">
        비밀번호
      </label>
      <input
        type="password"
        id="signInPassword"
        placeholder="비밀번호"
        className="input w-full"></input>
      <button className="button-primary">로그인</button>
    </form>
    <nav className="mt-3 text-sm text-gray-500 flex justify-center divider">
      <Link href="findidpw">아이디찾기</Link>
      <Link href="findidpw">비밀번호찾기</Link>
      <Link href="signup">회원가입</Link>
    </nav>
  </>
)

export default SignIn
