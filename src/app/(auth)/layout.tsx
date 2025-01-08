import Image from 'next/image'
import Link from 'next/link'

const MemberLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex items-center flex-col h-screen">
      <header className="w-full px-4 py-1 flex items-center justify-between gap-4">
        <h1>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Cook Log"
              width={80}
              height={70}
              priority
            />
          </Link>
        </h1>
        <Link
          href="/"
          className="flex-center gap-1">
          <Image
            src="/images/home.svg"
            alt="/"
            width={15}
            height={15}></Image>
          <span className="text-sm">쿡로그 홈</span>
        </Link>
      </header>
      <main className="flex-1 flex-center flex-col py-7 ">
        <section className="w-80">{children}</section>
      </main>
      <footer className="text-sm pb-3 text-gray-400">©2025 장예지. All rights reserved.</footer>
    </div>
  )
}

export default MemberLayout
