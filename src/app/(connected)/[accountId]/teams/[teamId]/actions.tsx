import { post, get } from "@/lib/httpMethods"

export async function getTeamDetails(teamId: string) {
  return await get(`get-team-details/${teamId}`)
}

export async function editTeam(teamId: string, formData: FormData) {
  const members = formData.getAll('members[]')
  await post(`edit-team`, {
    teamId,
    name: formData.get('name'),
    description: formData.get('description'),
    members
  })
}

export async function removeTeam(teamId: string) {
  await post(`remove-team`, {
    teamId,
  })
}