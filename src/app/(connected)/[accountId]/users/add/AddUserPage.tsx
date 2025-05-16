'use client'

import { useRouter } from 'next/navigation'
import UserForm from '@/components/forms/UserForm'
import { addUser } from './actions'

export default function AddUserPage({ accountId }: { accountId: string }) {
  const router = useRouter()

  return (
    <div>
      <h2 className="font-semibold text-lg">Ajouter un utilisateur</h2>
      <div className='mt-8'>
        <UserForm
          accountId={accountId}
          onSubmit={async (formData: FormData) => {
            await addUser(accountId, formData)
            router.push(`/${accountId}/users`)
          }}
          onCancel={() => router.push(`/${accountId}/users`)}
        />
      </div>
    </div>
  )
} 