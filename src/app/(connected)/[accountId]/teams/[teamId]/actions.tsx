import { post, get } from "@/lib/httpMethods"

export async function getTeamDetails(teamId: string) {
  return await get(`get-team-details/${teamId}`)
}

export async function editTeam(teamId: string, formData: FormData) {
  await post(`edit-team`, {
    teamId,
    name: formData.get('name'),
    description: formData.get('description'),
  })
}

export async function removeTeam(teamId: string) {
  await post(`remove-team`, {
    teamId,
  })
}