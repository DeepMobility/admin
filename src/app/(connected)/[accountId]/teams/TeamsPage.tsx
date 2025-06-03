'use client'

import { useState } from 'react'
import Link from 'next/link'
import { removeTeam } from './actions'

interface Team {
  id: string
  name: string
  description: string
}

export default function TeamsPage({ accountId, teams: initialTeams }: { accountId: string, teams: Team[] }) {
  const [teams, setTeams] = useState(initialTeams)

  const handleDelete = async (teamId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette équipe ?')) return
    await removeTeam(teamId)
    setTeams(teams.filter(team => team.id !== teamId))
  }

  return (
    <div>
      <h2 className="font-semibold text-lg">Équipes</h2>

      <div className='mt-8'>
        <Link
          href={`/${accountId}/teams/add`}
          className='text-blue-500 hover:underline'
        >
          Ajouter une équipe
        </Link>
      </div>

      <div className='mt-8 flex flex-col gap-4'>
        {teams.map((team) => (
          <div key={team.id} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {team.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{team.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href={`/${accountId}/teams/${team.id}`}
                className="text-blue-600 hover:text-blue-900"
              >
                Modifier
              </Link>
              <button
                onClick={() => handleDelete(team.id)}
                className="text-red-600 hover:text-red-900"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
        {teams.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Aucune équipe trouvée. Cliquez sur "Ajouter une équipe" pour en créer une.
          </div>
        )}
      </div>
    </div>
  )
}
