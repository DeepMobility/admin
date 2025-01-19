'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { unauthenticatedPost } from '@/lib/httpMethods';
 
export async function login(formData: FormData) {
  const data = await unauthenticatedPost('login', {
    email: formData.get('email'),
    password: formData.get('password'),
  })

  const cookieStore = await cookies()

  cookieStore.set('jwt', data.jwt, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })

  redirect('/')
}