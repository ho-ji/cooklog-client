import Link from 'next/link'
import SearchInput from './SearchInput'
import Image from 'next/image'

const Header = () => {
  return (
    <header className=" px-4 py-2 flex-center gap-4">
      <h1>
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Cook Log"
            width={100}
            height={87}
            priority
          />
        </Link>
      </h1>
      <SearchInput />
      <nav className="ml-auto divider">
        <Link
          href="/signin"
          className="font-bold align-baseline">
          로그인
        </Link>
        <Link
          href="/signup"
          className="font-bold align-baseline">
          회원가입
        </Link>
      </nav>
      <Link
        href="/write-recipe"
        className="button-primary">
        글쓰기
      </Link>
    </header>
  )
}

export default Header
