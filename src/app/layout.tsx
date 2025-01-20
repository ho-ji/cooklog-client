import type {Metadata} from 'next'
import {Noto_Sans_KR} from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '700'],
  preload: false,
})

export const metadata: Metadata = {
  title: '쿡로그',
  description: '요리 레시피 블로그 쿡로그',
  icons: {
    icon: '/favicon.ico',
  },
}

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html>
      <body className={`${notoSansKR.className} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}

export default RootLayout
