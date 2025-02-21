'use client'

import Link from 'next/link'
import { removeAccount } from './actions'
import { useState } from 'react'

export default function HomePage({ accounts }: { accounts: Array<any> }) {
  const [ displayedAccounts, setDisplayedAccounts ] = useState(accounts)

  const deleteAccount = async (accountId: number) => {
    await removeAccount(accountId)

    setDisplayedAccounts(
      displayedAccounts.filter(account => account.id !== accountId)
    );
  }

  return (
    <div>
      <h1 className="font-bold text-xl">Dashboard</h1>

      <div className='mt-8'>
        <Link href="/add-account" className='text-blue-500'>Ajouter un compte client</Link>
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <div className="flex gap-4">
          <div className="w-36 font-bold">Nom</div>
          <div className="w-36 font-bold">Slug</div>
          <div className="w-56 font-bold">Host</div>
          <div className="w-36 font-bold"></div>
        </div>

        {displayedAccounts.map((account) => (
          <div key={account.id} className="flex gap-4">
            <div className="w-36">{account.name}</div>
            <div className="w-36">{account.slug}</div>
            <div className="w-56">{account.host}</div>
            <button type="button" onClick={() => deleteAccount(account.id)}
              className='w-36 text-red-600 hover:underline'>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}