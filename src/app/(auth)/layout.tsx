import LogoImage from '@/components/common/LogoImage'
import Image from 'next/image'
import Link from 'next/link'

const MemberLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex-center flex-col h-screen">
      <header className="w-full px-4 py-1 flex items-center justify-between gap-4">
        <h1>
          <LogoImage
            w={80}
            h={40}
          />
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
      <main className="flex-1 flex-center flex-col min-h-fit py-7">
        <section className="w-80">{children}</section>
      </main>
      <footer className="text-sm mb-3 text-gray-400">©2025 장예지. All rights reserved.</footer>
    </div>
  )
}

export default MemberLayout
