'use client'

import { useRouter } from 'next/navigation'
import TeamForm from '@/components/forms/TeamForm'
import { editTeam } from './actions'

interface Team {
  id: string
  name: string
  description: string
}

export default function TeamDetailsPage({
  accountId,
  teamId,
  team,
}: {
  accountId: string
  teamId: string
  team: Team
}) {
  const router = useRouter()

  return (
    <div>
      <h2 className="font-semibold text-lg">Modifier l'équipe</h2>
      <div className='mt-8'>
        <TeamForm
          accountId={accountId}
          teamId={teamId}
          initialData={team}
          onSubmit={async (formData: FormData) => {
            await editTeam(teamId, formData)
            router.refresh()
          }}
          onCancel={() => router.push(`/${accountId}/teams`)}
        />
      </div>
    </div>
  )
} 