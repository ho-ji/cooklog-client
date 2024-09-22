import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default MainLayout
