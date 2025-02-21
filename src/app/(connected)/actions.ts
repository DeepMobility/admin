'use server'

import { post } from '@/lib/httpMethods';

export async function removeAccount(accountId: number) {
  return post('remove-account', { accountId })
}