'use client'

import { useRouter } from 'next/navigation'
import ChallengeForm from '@/components/forms/ChallengeForm'
import { addChallenge } from './actions'

export default function AddChallengePage({ accountId }: { accountId: string }) {
  const router = useRouter()

  return (
    <div>
      <h2 className="font-semibold text-lg">Ajouter un défi</h2>
      <div className='mt-8'>
        <ChallengeForm
          accountId={accountId}
          onSubmit={async (formData: FormData) => {
            await addChallenge(accountId, formData)
            router.push(`/${accountId}/challenges`)
          }}
        />
      </div>
    </div>
  )
}
