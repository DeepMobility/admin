'use server'

import { redirect } from 'next/navigation'
import { post } from '@/lib/httpMethods';
 
export async function addVideo(formData: FormData) {
  await post('add-video', {
    name: formData.get('name'),
    url: formData.get('url'),
    thumbnailUrl: formData.get('thumbnailUrl'),
    description: formData.get('description'),
    duration: formData.get('duration'),
    course: formData.get('course'),
    coursePosition: formData.get('coursePosition'),
    bodyParts: formData.getAll('bodyParts'),
    injuryTypes: formData.getAll('injuryTypes'),
  })

  redirect('/videos')
}