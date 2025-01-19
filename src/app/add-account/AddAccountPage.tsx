'use client'

import Form from 'next/form'
import { addAccount } from './actions'

export default function AddAccountPage() {
  return (
    <div className="flex h-screen">
      <Form action={addAccount} className="flex flex-col w-[300px] m-auto gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" className="border-black border-2"/>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name">Slug</label>
          <input type="text" name="slug" className="border-black border-2"/>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name">Host</label>
          <input type="text" name="host" className="border-black border-2"/>
        </div>
        
        <button type="submit">Ajouter</button>
      </Form>
    </div>
  )
}