'use server'

import { redirect } from 'next/navigation'
import { get, post } from '@/lib/httpMethods'

export async function getChallengeDetails(challengeId: string) {
  const response = await get(`get-challenge-details/${challengeId}`)
  return response
}

export async function editChallenge(challengeId: string, formData: FormData) {
  return post('edit-challenge', {
    challengeId,
    title: formData.get('title'),
    description: formData.get('description'),
    associationName: formData.get('associationName'),
    associationLogoUrl: formData.get('associationLogoUrl'),
    goalAmount: formData.get('goalAmount'),
    conversionRate: formData.get('conversionRate'),
    status: formData.get('status'),
    type: formData.get('type'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate')
  })
}

export async function removeChallenge(accountId: string, challengeId: string) {
  await post('remove-challenge', { challengeId })
  redirect(`/${accountId}/challenges`)
} 