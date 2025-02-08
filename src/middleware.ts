import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const cookieStore = await cookies()

  if (path === "/logout") {
    cookieStore.delete('jwt_admin')

    return NextResponse.redirect(new URL('/login', request.url))
  }

  const jwt = cookieStore.get('jwt_admin')

  if (!jwt?.value) {
    if (path.startsWith('/login')) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if (path.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}