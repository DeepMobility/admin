'use client'

import { useRouter } from 'next/navigation'
import UserForm from '@/components/forms/UserForm'
import { editUser } from './actions'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export default function UserDetailsPage({
  accountId,
  userId,
  user,
}: {
  accountId: string
  userId: string
  user: User
}) {
  const router = useRouter()

  return (
    <div>
      <h2 className="font-semibold text-lg">Modifier l'utilisateur</h2>
      <div className='mt-8'>
        <UserForm
          accountId={accountId}
          userId={userId}
          initialData={user}
          onSubmit={async (formData: FormData) => {
            await editUser(userId, formData)
            router.push(`/${accountId}/users`)
          }}
          onCancel={() => router.push(`/${accountId}/users`)}
        />
      </div>
    </div>
  )
} 