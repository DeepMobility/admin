'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HomePage({ accounts }: { accounts: Array<any> }) {
  const router = useRouter()

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
          <div className="w-36 font-bold">Host</div>
        </div>

        {accounts.map((account) => (
          <div key={account.id} className="flex gap-4">
            <div className="w-36">{account.name}</div>
            <div className="w-36">{account.slug}</div>
            <div className="w-36">{account.host}</div>
          </div>
        ))}
      </div>
    </div>
  )
}