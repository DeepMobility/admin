'use client'

import Form from 'next/form'
import { editVideo } from './actions'
import courses from '@/lib/courses'
import painfulBodyParts from '@/lib/painfulBodyParts'
import exerciseTypes from '@/lib/exerciseTypes'

export default function({ video }: { video: any }) {

  const edit = (formdata: FormData) => {
    return editVideo(video.id, formdata)
  }

  return (
    <div>
      <h1 className="font-bold text-xl">Modifier la vidéo {video.name}</h1>

      <Form action={edit} className="mt-8 gap-6">
        <div className='flex gap-40'>
          <div className='flex flex-col gap-6 w-[300px]'>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" className="border-black border-2" defaultValue={video.name}/>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="url">URL</label>
              <input type="text" name="url" className="border-black border-2" defaultValue={video.url}/>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="thumbnailUrl">URL de la vignette</label>
              <input type="text" name="thumbnailUrl" className="border-black border-2" defaultValue={video.thumbnailUrl}/>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <input type="textarea" name="description" className="border-black border-2" defaultValue={video.description}/>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="duration">Durée en secondes</label>
              <input type="number" name="duration" className="border-black border-2" defaultValue={video.duration}/>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="course">Parcours</label>
              <select name="course" defaultValue={video.course}>
                <option value=""></option>
                {courses.map((course) => (
                  <option key={course.value} value={course.value}>
                    {course.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="coursePosition">Position dans le parcours</label>
              <input type="number" name="coursePosition" className="border-black border-2" defaultValue={video.coursePosition}/>
            </div>
          </div>
          
          <div className='flex flex-col gap-6 w-[300px]'>
            <div className="flex flex-col gap-2">
              <div>Endroit du corps</div>

              {painfulBodyParts.map((bodyPart) => (
                <div key={bodyPart.value} className="flex gap-2">
                  <input
                    type="checkbox" name="bodyParts" value={bodyPart.value} id={bodyPart.value}
                    defaultChecked={video.bodyParts.includes(bodyPart.value)}
                  />
                  <label htmlFor={bodyPart.value}>{bodyPart.label}</label>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <div>Type de blessure</div>

              {exerciseTypes.map((exerciseType) => (
                <div key={exerciseType.value} className="flex gap-2">
                  <input
                    type="checkbox" name="exerciseTypes" value={exerciseType.value} id={exerciseType.value}
                    defaultChecked={video.exerciseTypes.includes(exerciseType.value)}
                  />
                  <label htmlFor={exerciseType.value}>{exerciseType.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        
        <button type="submit" className='mt-8 p-2 bg-blue-600 text-white'>Enregistrer</button>
      </Form>
    </div>
  )
}