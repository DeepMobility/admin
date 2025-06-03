'use client'

import { useRouter } from 'next/navigation'
import TeamForm from '@/components/forms/TeamForm'
import { addTeam } from './actions'

export default function AddUserPage({ accountId }: { accountId: string }) {
  const router = useRouter()

  return (
    <div>
      <h2 className="font-semibold text-lg">Ajouter une équipe</h2>
      <div className='mt-8'>
        <TeamForm
          accountId={accountId}
          onSubmit={async (formData: FormData) => {
            await addTeam(accountId, formData)
            router.push(`/${accountId}/teams`)
          }}
          onCancel={() => router.push(`/${accountId}/teams`)}
        />
      </div>
    </div>
  )
} 