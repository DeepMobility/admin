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
  hasDashboardAccess?: boolean
}

export default function UsersPage({ accountId, users: initialUsers }: { accountId: string, users: User[] }) {
  const [users, setUsers] = useState(initialUsers)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const requestDelete = (user: User) => {
    setDeleteError(null)
    setUserToDelete(user)
  }

  const cancelDelete = () => {
    if (isDeleting) return
    setDeleteError(null)
    setUserToDelete(null)
  }

  const confirmDelete = async () => {
    if (!userToDelete) return

    try {
      setIsDeleting(true)
      setDeleteError(null)
      await removeUser(userToDelete.id)
      setUsers(currentUsers => currentUsers.filter(user => user.id !== userToDelete.id))
      setUserToDelete(null)
    } catch (error) {
      console.error('Error deleting user:', error)
      setDeleteError("La suppression de l'utilisateur a échoué. Réessayez.")
    } finally {
      setIsDeleting(false)
    }
  }

  const userToDeleteName = userToDelete
    ? `${userToDelete.firstName} ${userToDelete.lastName}`.trim()
    : ''

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
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                {user.hasDashboardAccess && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Dashboard
                  </span>
                )}
              </div>
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
                onClick={() => requestDelete(user)}
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

      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Fermer la confirmation"
            className="absolute inset-0 cursor-default bg-black/50"
            onClick={cancelDelete}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-user-title"
            aria-describedby="delete-user-description"
            className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
          >
            <h3 id="delete-user-title" className="text-lg font-semibold text-gray-900">
              Supprimer l'utilisateur ?
            </h3>
            <p id="delete-user-description" className="mt-3 text-sm text-gray-600">
              Cette action supprimera {userToDeleteName || userToDelete.email} de ce compte.
            </p>
            <p className="mt-2 text-sm text-gray-500">{userToDelete.email}</p>

            {deleteError && (
              <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {deleteError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelDelete}
                disabled={isDeleting}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
