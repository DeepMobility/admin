import { getAccountUsers } from './actions'
import UsersPage from './UsersPage'

export default async function({
  params,
}: {
  params: Promise<{ accountId: string }>
}) {
  const { accountId } = await params
  const users = await getAccountUsers(accountId)

  return <UsersPage accountId={accountId} users={users} />
}
