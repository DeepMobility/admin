'use server'

import { redirect } from 'next/navigation'
import { post } from '@/lib/httpMethods';
 
export async function addAccount(formData: FormData) {
  await post('add-account', {
    name: formData.get('name'),
    slug: formData.get('slug'),
    host: formData.get('host'),
  })

  redirect('/')
}