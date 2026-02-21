'use server'

import { post } from '@/lib/httpMethods';

export interface SettingsState {
  success: boolean
  errorMessage: string
  successMessage: string
  values: {
    allowedDomains: string
    webinarsEnabled: boolean
    onboardingVideoUrl: string
  } | null
}

export async function saveAccountSettings(
  _state: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const accountId = formData.get('accountId') as string;
  const allowedDomains = formData.get('allowed-domains') as string;
  const webinarsEnabled = formData.get('webinars-enabled') === 'on';
  const onboardingVideoUrl = (formData.get('onboarding-video-url') as string) || '';

  const values = { allowedDomains, webinarsEnabled, onboardingVideoUrl };

  try {
    const response = await post('save-account-settings', {
      accountId,
      allowedDomains,
      configuration: {
        webinarsEnabled,
        onboardingVideoUrl
      }
    });

    if (response?.statusCode && response.statusCode >= 400) {
      return {
        success: false,
        errorMessage: `Erreur API: ${response.statusCode}`,
        successMessage: '',
        values
      }
    }

    return {
      success: true,
      errorMessage: '',
      successMessage: 'Paramètres enregistrés avec succès',
      values
    }
  } catch (error) {
    return {
      success: false,
      errorMessage: 'Une erreur est survenue lors de la sauvegarde des paramètres',
      successMessage: '',
      values
    }
  }
}