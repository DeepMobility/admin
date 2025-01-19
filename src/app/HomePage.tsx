'use client'

import { useRouter } from 'next/navigation'

export default function HomePage({ accounts }: any) {
  const router = useRouter()

  return (
    <div>
      <h1 className="font-bold text-xl">Dashboard</h1>

      <button type="button" onClick={() => router.push('/add-account')} className='mt-8 text-blue-500'>
        Ajouter un compte client
      </button>

      <div className="mt-8 flex flex-col gap-2">
        <div className="flex gap-4">
          <div className="w-36 font-bold">Nom</div>
          <div className="w-36 font-bold">Slug</div>
          <div className="w-36 font-bold">Host</div>
        </div>

        {accounts.map((account: any) => (
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