import Image from 'next/image'
import Link from 'next/link'
import SearchInput from './SearchInput'

const Header = () => {
  return (
    <header className=" px-4 py-2 flex-center gap-4">
      <h1 className="mr-5">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Cook Log"
            width={120}
            height={60}
            priority
          />
        </Link>
      </h1>
      <SearchInput />
      <nav className="ml-auto divide-x ">
        <Link
          href="/signin"
          className="px-3 font-bold align-baseline">
          로그인
        </Link>
        <Link
          href="/signup"
          className="px-3 font-bold align-baseline">
          회원가입
        </Link>
      </nav>
      <Link
        href="/signup"
        className="button-primary">
        글쓰기
      </Link>
    </header>
  )
}

export default Header
