import AddChallengePage from './AddChallengePage'

export default async function({
  params,
}: {
  params: Promise<{ accountId: string }>
}) {
  const { accountId } = await params

  return <AddChallengePage accountId={accountId} />
}