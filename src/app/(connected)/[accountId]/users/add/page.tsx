import AddUserPage from './AddUserPage'

export default async function AddUser({ params }: { params: Promise<{ accountId: string }> }) {
  const { accountId } = await params
  return <AddUserPage accountId={accountId} />
}
