'use server'

import { get, post } from '@/lib/httpMethods'

export async function getAccountUsers(accountId: string) {
  return await get(`get-account-users/${accountId}`)
}

export async function removeUser(userId: string) {
  await post(`remove-user`, {
    userId
  })
}
