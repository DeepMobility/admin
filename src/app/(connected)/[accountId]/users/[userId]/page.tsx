import { getUserDetails } from './actions'
import UserDetailsPage from './UserDetailsPage'

export default async function EditUser({
  params,
}: {
  params: Promise<{ accountId: string; userId: string }>
}) {
  const { accountId, userId } = await params
  const user = await getUserDetails(userId)
  return <UserDetailsPage accountId={accountId} userId={userId} user={user} />
}
