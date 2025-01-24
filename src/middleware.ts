import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
const publicRoutes = ['/login']
 
export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (publicRoutes.includes(path)) {
    return NextResponse.next()
  }
 
  const cookieStore = await cookies()

  if (path === "/logout") {
    cookieStore.delete('jwt_admin')

    return NextResponse.redirect(new URL('/login', request.url))
  }

  const jwt = cookieStore.get('jwt_admin')

  if (!jwt) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}