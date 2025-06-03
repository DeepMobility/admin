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
  progress?: {
    totalPoints: number
    participantsCount: number
    usersInfo: {
      userId: string
      name: string
      points: number
      rank: number
    }[]
    teamsInfo: {
      teamId: string
      name: string
      points: number
      rank: number
      membersCount?: number
    }[]
  }
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

      {challenge.progress && (
        <div className="mb-8 p-6 bg-white shadow rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  <strong className="mr-1">{challenge.progress.totalPoints}</strong>points collectés, soit <strong className="mx-1">{(challenge.progress.totalPoints * challenge.conversionRate).toFixed(2)}</strong>€
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Objectif: <strong className="mx-1">{challenge.goalAmount.toFixed(2)}</strong> €
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {challenge.progress.participantsCount} participants
                </span>
                {challenge.type === 'team' && challenge.progress.teamsInfo.length > 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Équipe gagnante: <strong className="mx-1">{challenge.progress.teamsInfo[0].name}</strong> ({challenge.progress.teamsInfo[0].points} pts)
                  </span>
                )}
                {challenge.type === 'individual' && challenge.progress.usersInfo.length > 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Utilisateur gagnant: <strong className="mx-1">{challenge.progress.usersInfo[0].name}</strong> ({challenge.progress.usersInfo[0].points} pts)
                  </span>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col items-end">
              {(() => {
                const percent = Math.min(100, Math.round((challenge.progress.totalPoints / challenge.goalAmount) * 100));
                return (
                  <>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-blue-500 font-semibold mt-1 text-right">{percent}%</div>
                  </>
                );
              })()}
            </div>
          </div>

          {challenge.type === 'team' && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-1 text-gray-900">Classement des équipes</h4>
              <table className="min-w-full text-xs border bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1 text-left">Rang</th>
                    <th className="px-2 py-1 text-left">Équipe</th>
                    <th className="px-2 py-1 text-left">Points</th>
                    <th className="px-2 py-1 text-left">Membres</th>
                  </tr>
                </thead>
                <tbody>
                  {challenge.progress.teamsInfo.map(team => (
                    <tr key={team.teamId} className="border-t hover:bg-blue-50">
                      <td className="px-2 py-1 font-semibold text-blue-700">{team.rank}</td>
                      <td className="px-2 py-1">{team.name}</td>
                      <td className="px-2 py-1">{team.points}</td>
                      <td className="px-2 py-1">{team.membersCount ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div>
            <h4 className="font-semibold text-sm mb-1 text-gray-900">Classement des utilisateurs</h4>
            <table className="min-w-full text-xs border bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 text-left">Rang</th>
                  <th className="px-2 py-1 text-left">Utilisateur</th>
                  <th className="px-2 py-1 text-left">Points</th>
                </tr>
              </thead>
              <tbody>
                {challenge.progress.usersInfo.map(user => (
                  <tr key={user.userId} className="border-t hover:bg-blue-50">
                    <td className="px-2 py-1 font-semibold text-blue-700">{user.rank}</td>
                    <td className="px-2 py-1">{user.name}</td>
                    <td className="px-2 py-1">{user.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
