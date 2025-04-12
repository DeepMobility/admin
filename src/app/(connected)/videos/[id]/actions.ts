'use server'

import { redirect } from 'next/navigation'
import { post } from '@/lib/httpMethods';
 
export async function editVideo(videoId: number, formData: FormData) {
  await post('edit-video', {
    videoId,
    name: formData.get('name'),
    url: formData.get('url'),
    thumbnailUrl: formData.get('thumbnailUrl'),
    description: formData.get('description'),
    duration: formData.get('duration'),
    course: formData.get('course'),
    coursePosition: formData.get('coursePosition'),
    bodyParts: formData.getAll('bodyParts'),
    exerciseTypes: formData.getAll('exerciseTypes'),
  })

  redirect('/videos')
}