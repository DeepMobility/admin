import { getAccountTeams } from './actions'
import TeamsPage from './TeamsPage'

export default async function({
  params,
}: {
  params: Promise<{ accountId: string }>
}) {
  const { accountId } = await params
  const teams = await getAccountTeams(accountId)

  return <TeamsPage accountId={accountId} teams={teams} />
}
