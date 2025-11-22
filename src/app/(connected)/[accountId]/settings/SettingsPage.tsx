'use client'

import { useActionState, useState } from 'react'
import Form from 'next/form'
import { saveAccountSettings } from './actions'

export default function({ account }: { account: any }) {
  const [allowedDomains, setAllowedDomains] = useState(account.allowedDomains.join(','))
  const [state, formAction, pending] = useActionState(saveAccountSettings, {
    success: false,
    errorMessage: '',
    successMessage: ''
  })

  return (
    <div>
      <h2 className="font-semibold text-lg">Paramètres</h2>

      <div className='mt-8'>
        <Form action={formAction}>
          <div className='flex flex-col gap-2'>
            <label htmlFor='allowed-domains'>Domaines autorisés</label>
            <input 
              type='text' 
              id='allowed-domains' 
              name='allowed-domains' 
              value={allowedDomains}
              onChange={(e) => setAllowedDomains(e.target.value)}
              disabled={pending}
            />
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