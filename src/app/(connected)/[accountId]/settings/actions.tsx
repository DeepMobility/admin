'use server'

import { post } from '@/lib/httpMethods';

export async function saveAccountSettings(
  _state: {
    success: boolean
    errorMessage: string
    successMessage: string
  },
  formData: FormData
) {
  try {
    await post('save-account-settings', {
      accountId: formData.get('accountId'),
      allowedDomains: formData.get('allowed-domains')
    })

    console.log('Save account settings success');

    return {
      success: true,
      errorMessage: '',
      successMessage: 'Paramètres enregistrés avec succès'
    }
  } catch (error) {
    console.error('Save account settings error:', error)
    return {
      success: false,
      errorMessage: 'Une erreur est survenue lors de la sauvegarde des paramètres',
      successMessage: ''
    }
  }
}