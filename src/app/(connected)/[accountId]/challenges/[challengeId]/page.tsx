import { getChallengeDetails } from './actions'
import ChallengeDetailsPage from './ChallengeDetailsPage'
import { notFound } from 'next/navigation'

export default async function({
  params,
}: {
  params: Promise<{ accountId: string; challengeId: string }>
}) {
  try {
    const { accountId, challengeId } = await params
    const challenge = await getChallengeDetails(challengeId)
    
    if (!challenge) {
      notFound()
    }

    return (
      <ChallengeDetailsPage 
        challenge={challenge}
        accountId={accountId}
      />
    )
  } catch (error) {
    console.error('Error loading challenge:', error)
    notFound()
  }
}
