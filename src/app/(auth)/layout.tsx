import LogoImage from '@/components/common/LogoImage'

const MemberLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className="flex-center h-lvh">
      <h1 className="mb-5">
        <LogoImage
          w={160}
          h={80}
        />
      </h1>
      <section>{children}</section>
    </main>
  )
}

export default MemberLayout
