'use server'

import { get, post } from '@/lib/httpMethods'

export async function getAccountTeams(accountId: string) {
  return await get(`get-account-teams/${accountId}`)
}

export async function removeTeam(teamId: string) {
  await post(`remove-team`, {
    teamId
  })
}
