import AddTeamPage from './AddTeamPage'

export default async function AddTeam({ params }: { params: Promise<{ accountId: string }> }) {
  const { accountId } = await params
  return <AddTeamPage accountId={accountId} />
}
