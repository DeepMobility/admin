'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ChallengeForm from '@/components/forms/ChallengeForm'
import { editChallenge, removeChallenge } from './actions'

interface Challenge {
  id: string
  title: string
  description: string
  associationName: string
  associationLogoUrl?: string
  goalAmount: number
  conversionRate: number
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  type: 'individual' | 'team'
  startDate: string
  endDate: string
}

export default function ChallengeDetailsPage({ 
  challenge,
  accountId 
}: { 
  challenge: Challenge
  accountId: string
}) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce défi ?')) return
    
    try {
      setIsDeleting(true)
      await removeChallenge(accountId, challenge.id)
    } catch (error) {
      console.error('Error deleting challenge:', error)
      setIsDeleting(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-semibold text-lg">Détails du défi</h2>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
        >
          {isDeleting ? 'Suppression...' : 'Supprimer le défi'}
        </button>
      </div>

      <ChallengeForm
        accountId={accountId}
        challengeId={challenge.id}
        initialData={{
          title: challenge.title,
          description: challenge.description,
          associationName: challenge.associationName,
          associationLogoUrl: challenge.associationLogoUrl,
          goalAmount: challenge.goalAmount,
          conversionRate: challenge.conversionRate,
          status: challenge.status,
          type: challenge.type,
          startDate: challenge.startDate,
          endDate: challenge.endDate
        }}
        onSubmit={async (formData: FormData) => {
          await editChallenge(challenge.id, formData);
          router.refresh();
        }}
        onCancel={() => router.back()}
      />
    </div>
  )
}
