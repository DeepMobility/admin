'use client'

import courses from '@/lib/courses'
import Link from 'next/link'
import { removeVideo } from './actions'
import { useState } from 'react'

export default function VideosPage({ videos }: { videos: Array<any> }) {
  const [ displayedVideos, setDisplayedVideos ] = useState(videos)

  const deleteVideo = async (videoId: number) => {
    await removeVideo(videoId)

    setDisplayedVideos(
      displayedVideos.filter(video => video.id !== videoId)
    );
  }

  return (
    <div>
      <h1 className="font-bold text-xl">Videos</h1>

      <div className='mt-8'>
        <Link href="/videos/add" className='text-blue-500'>Ajouter une vidéo</Link>
      </div>

      <div className='mt-8 flex flex-col gap-10'>
        {courses.map((course) => (
          <div key={course.value}>
            <div className='tex-xl font-bold'>{course.label}</div>

            <div className="mt-3 flex flex-col gap-2">
              <div className="flex gap-8">
                <div className="font-bold w-[200px]">Nom</div>
                <div className="font-bold flex-1">URL</div>
                <div className="font-bold w-[200px]">Parcours</div>
                <div className="font-bold w-[100px]">Position</div>
                <div className='w-[100px]'></div>
              </div>

              {displayedVideos.filter(video => video.course === course.value).map((video) => (
                <div key={video.id} className="flex gap-8">
                  <Link
                    className='w-[200px] cursor-pointer hover:underline'
                    href={`/videos/${video.id}`}
                  >
                    {video.name}
                  </Link>
                  <div className='flex-1'>{video.url}</div>
                  <div className='w-[200px]'>{courses.find(course => video.course === course.value)?.label}</div>
                  <div className='w-[100px]'>{video.coursePosition}</div>
                  <button type="button" onClick={() => deleteVideo(video.id)}
                    className='w-[100px] text-red-600 hover:underline'>
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}