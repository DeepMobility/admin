'use server'

import { redirect } from 'next/navigation'
import { post } from '@/lib/httpMethods';

export async function addChallenge(accountId: string, formData: FormData) {
  await post('add-challenge', {
    accountId,
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

  redirect(`/${accountId}/challenges`)
}