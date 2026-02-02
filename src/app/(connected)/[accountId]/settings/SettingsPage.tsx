'use client'

import { useActionState } from 'react'
import Form from 'next/form'
import { saveAccountSettings, SettingsState } from './actions'

export default function({ account }: { account: any }) {
  const initialState: SettingsState = {
    success: false,
    errorMessage: '',
    successMessage: '',
    values: null
  }

  const [state, formAction, pending] = useActionState(saveAccountSettings, initialState)

  const allowedDomains = state.values?.allowedDomains ?? account.allowedDomains.join(',')
  const webinarsEnabled = state.values?.webinarsEnabled ?? account.configuration?.webinarsEnabled ?? false

  return (
    <div>
      <h2 className="font-semibold text-lg">Paramètres</h2>

      <div className='mt-8'>
        <Form action={formAction}>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='allowed-domains'>Domaines autorisés</label>
              <input 
                key={`allowed-domains-${allowedDomains}`}
                type='text' 
                id='allowed-domains' 
                name='allowed-domains' 
                defaultValue={allowedDomains}
                disabled={pending}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <span className='font-medium'>Fonctionnalités</span>
              <label className='flex items-center gap-3 cursor-pointer'>
                <input 
                  key={`webinars-enabled-${webinarsEnabled}`}
                  type='checkbox' 
                  name='webinars-enabled' 
                  defaultChecked={webinarsEnabled}
                  disabled={pending}
                  className='w-5 h-5 accent-blue-500'
                />
                <span>Activer les webinaires</span>
              </label>
              <p className='text-sm text-gray-500'>
                Permet aux administrateurs du dashboard client de configurer et diffuser des webinaires Teams.
              </p>
            </div>
          </div>

          <input type='hidden' name='accountId' value={account.id} />
          <button 
            type='submit'
            className='absolute bottom-10 right-10 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
            disabled={pending}
          >
            {pending ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </Form>
      </div>

      {state.errorMessage && (
        <div className='text-red-500'>{state.errorMessage}</div>
      )}

      {state.successMessage && (
        <div className='text-green-500'>{state.successMessage}</div>
      )}
    </div>
  )
}
