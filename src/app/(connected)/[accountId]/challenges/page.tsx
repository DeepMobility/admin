import { getAccountChallenges } from './actions'
import ChallengesPage from './ChallengesPage'

export default async function({
  params,
}: {
  params: Promise<{ accountId: string }>
}) {
  const { accountId } = await params
  const challenges = await getAccountChallenges(accountId)

  return <ChallengesPage accountId={accountId} challenges={challenges} />
} 