'use client'

import courses from '@/lib/courses'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function VideosPage({ videos }: { videos: Array<any> }) {
  const router = useRouter()

  return (
    <div>
      <h1 className="font-bold text-xl">Videos</h1>

      <div className='mt-8'>
        <Link href="/videos/add" className='text-blue-500'>Ajouter une vidéo</Link>
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <div className="flex gap-4">
          <div className="basis-1/6 font-bold">Nom</div>
          <div className="basis-1/2 font-bold">URL</div>
          <div className="basis-1/6 font-bold">Parcours</div>
          <div className="basis-1/6 font-bold">Position</div>
        </div>

        {videos.map((video) => (
          <div key={video.id} className="flex gap-4">
            <div className="basis-1/6">{video.name}</div>
            <div className="basis-1/2">{video.url}</div>
            <div className="basis-1/6">{courses.find(course => video.courseId === course.id)?.name}</div>
            <div className="basis-1/6">{video.coursePosition}</div>
          </div>
        ))}
      </div>
    </div>
  )
}