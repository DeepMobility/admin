'use client'

import { useState } from 'react'
import Form from 'next/form'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  gender: string
  birthYear: number,
  password?: string
  hasDashboardAccess?: boolean
}

interface UserFormProps {
  accountId?: string
  userId?: string
  initialData?: Partial<User>
  onSubmit: (formData: FormData) => Promise<void>
  onCancel?: () => void
}

export default function UserForm({
  accountId,
  userId,
  initialData = {},
  onSubmit,
  onCancel
}: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasDashboardAccess, setHasDashboardAccess] = useState(initialData.hasDashboardAccess || false)
  
  const isEditMode = !!userId

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true)
      await onSubmit(formData)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {isEditMode ? 'Modifier l\'utilisateur' : 'Créer un utilisateur'}
      </h2>

      <Form
        action={handleSubmit}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={initialData.email}
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        {!isEditMode && (
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="font-medium">Prénom</label>
            <input
              type="text"
              name="firstName"
              defaultValue={initialData.firstName}
              required
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="font-medium">Nom</label>
            <input
              type="text"
              name="lastName"
              defaultValue={initialData.lastName}
              required
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="gender" className="font-medium">Sexe</label>
            <select
              name="gender"
              defaultValue={initialData.gender}
              required
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="man">Masculin</option>
              <option value="woman">Féminin</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="birthYear" className="font-medium">Année de naissance</label>
            <input
              type="number"
              name="birthYear"
              defaultValue={initialData.birthYear || ''}
              required
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-md border border-blue-200">
          <input
            type="checkbox"
            id="hasDashboardAccess"
            name="hasDashboardAccess"
            checked={hasDashboardAccess}
            onChange={(e) => setHasDashboardAccess(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <div className="flex-1">
            <label htmlFor="hasDashboardAccess" className="font-medium text-gray-900 cursor-pointer">
              Accès au dashboard
            </label>
            <p className="text-sm text-gray-600 mt-1">
              Permet à cet utilisateur d'accéder au tableau de bord des statistiques de l'entreprise
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isEditMode ? 'Modifier' : 'Ajouter'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-600 hover:text-gray-900"
            >
              Annuler
            </button>
          )}
        </div>
      </Form>
    </div>
  )
} 