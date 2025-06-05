'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Form from 'next/form'

interface ChallengeFormProps {
  accountId?: string
  challengeId?: string
  initialData?: {
    title?: string
    description?: string
    status?: string
    type?: 'individual' | 'team'
    associationName?: string
    associationLogoUrl?: string
    goalAmount?: number
    conversionRate?: number
    startDate?: string
    endDate?: string
  }
  onSubmit: (formData: FormData) => Promise<void>
  onCancel?: () => void
}

export default function ChallengeForm({
  accountId,
  challengeId,
  initialData = {},
  onSubmit,
  onCancel
}: ChallengeFormProps) {
  const router = useRouter()
  const isEditMode = !!challengeId

  const [title, setTitle] = useState(initialData.title || '')
  const [description, setDescription] = useState(initialData.description || '')
  const [associationName, setAssociationName] = useState(initialData.associationName || '')
  const [associationLogoUrl, setAssociationLogoUrl] = useState(initialData.associationLogoUrl || '')
  const [goalAmount, setGoalAmount] = useState(initialData.goalAmount?.toString() || '')
  const [conversionRate, setConversionRate] = useState(initialData.conversionRate?.toString() || '')
  const [startDate, setStartDate] = useState(initialData.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '')
  const [endDate, setEndDate] = useState(initialData.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '')
  const [type, setType] = useState<'individual' | 'team'>(initialData.type || 'individual')
  const [status, setStatus] = useState<string>(initialData.status || 'pending')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.set('title', title)
    formData.set('description', description)
    formData.set('associationName', associationName)
    formData.set('associationLogoUrl', associationLogoUrl)
    formData.set('goalAmount', goalAmount)
    formData.set('conversionRate', conversionRate)
    formData.set('startDate', startDate)
    formData.set('endDate', endDate)
    formData.set('type', type)
    formData.set('status', status)
    if (accountId) formData.set('accountId', accountId)

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
        {isEditMode ? 'Modifier le défi' : 'Créer un défi'}
      </h2>
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium">Titre</label>
          <input 
            type="text" 
            name="title" 
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2" 
            required 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-medium">Description</label>
          <textarea 
            name="description" 
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 min-h-[100px]" 
            required 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="associationName" className="font-medium">Nom de l'association</label>
            <input 
              type="text" 
              name="associationName" 
              id="associationName"
              value={associationName}
              onChange={e => setAssociationName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2" 
              required 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="associationLogoUrl" className="font-medium">URL du logo de l'association</label>
            <input 
              type="text" 
              name="associationLogoUrl" 
              id="associationLogoUrl"
              value={associationLogoUrl}
              onChange={e => setAssociationLogoUrl(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="goalAmount" className="font-medium">Montant de l'objectif (en €)</label>
            <input 
              type="number" 
              name="goalAmount" 
              id="goalAmount"
              value={goalAmount}
              onChange={e => setGoalAmount(e.target.value)}
              step="0.01"
              min="0"
              className="border border-gray-300 rounded-md px-3 py-2" 
              required 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="conversionRate" className="font-medium">Taux de conversion (1 point = x€)</label>
            <input 
              type="number" 
              name="conversionRate" 
              id="conversionRate"
              value={conversionRate}
              onChange={e => setConversionRate(e.target.value)}
              step="0.01"
              min="0"
              className="border border-gray-300 rounded-md px-3 py-2" 
              required 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="startDate" className="font-medium">Date de début</label>
            <input 
              type="date" 
              name="startDate" 
              id="startDate"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="endDate" className="font-medium">Date de fin</label>
            <input 
              type="date" 
              name="endDate" 
              id="endDate"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="type" className="font-medium">Type de défi</label>
            <select 
              name="type" 
              id="type"
              value={type}
              onChange={e => setType(e.target.value as 'individual' | 'team')}
              className="border border-gray-300 rounded-md px-3 py-2" 
              required
            >
              <option value="individual">Individuel</option>
              <option value="team">Equipe</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="font-medium">Statut</label>
            <select 
              name="status" 
              id="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2" 
              required
            >
              <option value="pending">En attente</option>
              <option value="active">En cours</option>
              <option value="completed">Terminé</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>
        </div>
        {accountId && <input type="hidden" name="accountId" value={accountId} />}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel || (() => router.back())}
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
            ) : isEditMode ? 'Modifier le défi' : 'Créer le défi'}
          </button>
        </div>
      </form>
    </div>
  )
}