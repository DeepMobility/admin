'use client'

import { FormEvent, useState } from 'react'

interface TeamFormProps {
  accountId: string
  teamId?: string
  onSubmit: (formData: FormData) => Promise<void>
  onCancel: () => void
  initialData?: {
    name: string
    description: string
  }
}

export default function TeamForm({ 
  accountId,
  teamId,
  onSubmit, 
  onCancel, 
  initialData = {
    name: '',
    description: ''
  }
}: TeamFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = !!teamId

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      const formData = new FormData(e.currentTarget)
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
        {isEditMode ? 'Modifier l\'équipe' : 'Créer une équipe'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">Nom de l'équipe</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            defaultValue={initialData?.name}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-medium">Description</label>
          <textarea
            name="description"
            id="description"
            rows={3}
            defaultValue={initialData?.description}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <span className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                Chargement
              </span>
            ) : isEditMode ? 'Modifier l\'équipe' : 'Créer l\'équipe'}
          </button>
        </div>
      </form>
    </div>
  )
}
