'use server'

import { post } from '@/lib/httpMethods'

export async function addTeam(accountId: string, formData: FormData) {
  await post('add-team', {
    accountId,
    name: formData.get('name'),
    description: formData.get('description')
  })
}
