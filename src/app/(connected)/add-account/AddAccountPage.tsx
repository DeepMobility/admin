'use client'

import Form from 'next/form'
import { addAccount } from './actions'

export default function AddAccountPage() {
  return (
    <div>
      <h1 className="font-bold text-xl">Ajouter un compte client</h1>

      <Form action={addAccount} className="mt-8 flex flex-col w-[300px] gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" className="border-black border-2"/>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="slug">Slug</label>
          <input type="text" name="slug" className="border-black border-2"/>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="host">Host</label>
          <input type="text" name="host" className="border-black border-2"/>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="logoUrl">Logo Url</label>
          <input type="text" name="logoUrl" className="border-black border-2"/>
        </div>
        
        <button type="submit">Ajouter</button>
      </Form>
    </div>
  )
}