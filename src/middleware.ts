import {NextResponse} from 'next/server'
import {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const referer = request.headers.get('referer')
  if (url.pathname === '/signup/success') {
    if (!referer || !referer.includes('/signup')) {
      return NextResponse.redirect(new URL('/signup', request.url))
    }
  }
}
