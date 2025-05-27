'use client'

import { useState } from 'react'
import Link from 'next/link'
import { removeUser } from './actions'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export default function UsersPage({ accountId, users: initialUsers }: { accountId: string, users: User[] }) {
  const [users, setUsers] = useState(initialUsers)

  const handleDelete = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return
    await removeUser(userId)
    setUsers(users.filter(user => user.id !== userId))
  }

  return (
    <div>
      <h2 className="font-semibold text-lg">Utilisateurs</h2>

      <div className='mt-8'>
        <Link
          href={`/${accountId}/users/add`}
          className='text-blue-500 hover:underline'
        >
          Ajouter un utilisateur
        </Link>
      </div>

      <div className='mt-8 flex flex-col gap-4'>
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href={`/${accountId}/users/${user.id}`}
                className="text-blue-600 hover:text-blue-900"
              >
                Modifier
              </Link>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-600 hover:text-red-900"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Aucun utilisateur trouvé. Cliquez sur "Ajouter un utilisateur" pour en créer un.
          </div>
        )}
      </div>
    </div>
  )
}
