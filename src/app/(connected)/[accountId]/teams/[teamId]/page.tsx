import { getTeamDetails } from './actions'
import TeamDetailsPage from './TeamDetailsPage'

export default async function EditTeam({
  params,
}: {
  params: Promise<{ accountId: string; teamId: string }>
}) {
  const { accountId, teamId } = await params
  const team = await getTeamDetails(teamId)
  return <TeamDetailsPage accountId={accountId} teamId={teamId} team={team} />
}
