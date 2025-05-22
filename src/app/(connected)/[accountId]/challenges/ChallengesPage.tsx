'use client'

import { useState } from 'react'
import Link from 'next/link'
import { removeChallenge } from './actions'

interface Challenge {
  id: string
  title: string
  description: string
  associationName: string
  goalAmount: number
  conversionRate: number
  status: 'pending' | 'active' | 'completed' | 'cancelled',
  type: 'individual' | 'team',
  startDate: Date
  endDate: Date,
  progress: {
    totalPoints: number;
  }
}

export default function ChallengesPage({ accountId, challenges: initialChallenges }: { accountId: string, challenges: Challenge[] }) {
  const [challenges, setChallenges] = useState(initialChallenges)

  const handleDelete = async (challengeId: string) => {
    if (!confirm('Are you sure you want to delete this challenge?')) return
    await removeChallenge(challengeId)
    setChallenges(challenges.filter(c => c.id !== challengeId))
  }

  return (
    <div>
      <h2 className="font-semibold text-lg">Défis solidaires</h2>

      <div className='mt-8'>
        <Link
          href={`/${accountId}/challenges/add`}
          className='text-blue-500 hover:underline'
        >
          Ajouter un défi
        </Link>
      </div>

      <div className='mt-8 flex flex-col gap-4'>
        {challenges.map((challenge) => (
          <div key={challenge.id} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">{challenge.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{challenge.description}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  <strong className="mr-1">{challenge.progress.totalPoints}</strong>points collectés
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Objectif: <strong className="mx-1">{challenge.goalAmount}</strong> points
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  challenge.status === 'active' ? 'bg-green-100 text-green-800' :
                  challenge.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {challenge.status}
                </span>
              </div>

              <div className="mt-3">
                {(() => {
                  const percent = Math.min(100, Math.round((challenge.progress.totalPoints / challenge.goalAmount) * 100));
                  return (
                    <div className="md:w-1/2 w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  );
                })()}
                <div className="text-xs text-blue-500 font-semibold mt-1">{Math.min(100, Math.round((challenge.progress.totalPoints / challenge.goalAmount) * 100))}%</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href={`/${accountId}/challenges/${challenge.id}`}
                className="text-blue-600 hover:text-blue-900"
              >
                Modifier
              </Link>
              <button
                onClick={() => handleDelete(challenge.id)}
                className="text-red-600 hover:text-red-900"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
        {challenges.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Aucun défi trouvé. Cliquez sur "Ajouter un défi" pour en créer un.
          </div>
        )}
      </div>
    </div>
  )
} 