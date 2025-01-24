'use server'

import { redirect } from 'next/navigation'
import { post } from '@/lib/httpMethods';
 
export async function addVideo(formData: FormData) {
  await post('add-video', {
    name: formData.get('name'),
    url: formData.get('url'),
    description: formData.get('description'),
    duration: formData.get('duration'),
    courseId: formData.get('courseId'),
    coursePosition: formData.get('coursePosition'),
  })

  redirect('/videos')
}