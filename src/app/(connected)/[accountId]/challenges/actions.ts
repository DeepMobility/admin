'use server'

import { get, post } from '@/lib/httpMethods';

export async function getAccountChallenges(accountId: string) {
  const response = await get(`get-account-challenges/${accountId}`)
  return Array.isArray(response) ? response : []
}

export async function removeChallenge(challengeId: string) {
  return post('remove-challenge', { challengeId })
} 