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

  const getPlatformUrl = (host: string) => {
    if (process.env.NODE_ENV === 'development') {
      return `http://localhost:3001`
    }

    return `https://${host}`
  }

  const getDashboardUrl = (host: string) => {
    if (process.env.NODE_ENV === 'development') {
      return `http://localhost:3003`
    }

    return `https://${host.replace('.deepmobility.com', '.dashboard.deepmobility.com')}`
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
          <div className="w-56 font-bold">Dashboard</div>
          <div className="w-36 font-bold"></div>
        </div>

        {displayedAccounts.map((account) => (
          <div key={account.id} className="flex gap-4">
            <Link
              className="w-36 cursor-pointer hover:underline"
              href={`/${account.id}`}
            >
              {account.name}
            </Link>
            <div className="w-36">{account.slug}</div>
            <div className="w-56">
              <a href={getPlatformUrl(account.host)} target="_blank" className="flex items-center gap-2 text-black hover:underline">
                {account.host}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>
              </a>
            </div>
            <div className="w-56">
              <a href={getDashboardUrl(account.host)} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black mx-auto"><path d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>
              </a>
            </div>
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