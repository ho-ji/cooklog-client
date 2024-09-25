import LogoImage from '@/components/common/LogoImage'

const MemberLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex-center flex-col min-h-screen">
      <main className="flex-center flex-col mt-auto h-full min-h-fit pb-5">
        <h1 className="mb-5">
          <LogoImage
            w={160}
            h={80}
          />
        </h1>
        <section className="w-80">{children}</section>
      </main>
      <footer className="text-sm mt-auto mb-3 text-gray-400">©2024 장예지. All rights reserved.</footer>
    </div>
  )
}

export default MemberLayout
