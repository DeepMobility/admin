'use server'

import { post } from '@/lib/httpMethods'

export async function addUser(accountId: string, formData: FormData) {
  await post('add-user', {
    accountId,
    email: formData.get('email'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    gender: formData.get('gender'),
    birthYear: formData.get('birthYear'),
    password: formData.get('password'),
    hasDashboardAccess: formData.get('hasDashboardAccess') === 'on'
  })
}
