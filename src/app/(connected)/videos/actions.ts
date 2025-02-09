'use server'

import { post } from '@/lib/httpMethods';
 
export async function removeVideo(videoId: number) {
  return post('remove-video', { videoId })
}