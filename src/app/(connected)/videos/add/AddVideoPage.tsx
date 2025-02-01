'use client'

import Form from 'next/form'
import { addVideo } from './actions'
import courses from '@/lib/courses'

export default function AddVideoPage() {
  return (
    <div>
      <h1 className="font-bold text-xl">Ajouter une vidéo</h1>

      <Form action={addVideo} className="mt-8 flex flex-col w-[300px] gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" className="border-black border-2"/>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="url">URL</label>
          <input type="text" name="url" className="border-black border-2" required/>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="thumbnailUrl">URL de la vignette</label>
          <input type="text" name="thumbnailUrl" className="border-black border-2"/>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input type="textarea" name="description" className="border-black border-2"/>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="duration">Durée en secondes</label>
          <input type="number" name="duration" className="border-black border-2"/>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="course">Parcours</label>
          <select name="course">
            <option value=""></option>
            {courses.map((course) => (
              <option key={course.value} value={course.value}>{course.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="coursePosition">Position dans le parcours</label>
          <input type="number" name="coursePosition" className="border-black border-2"/>
        </div>
        
        <button type="submit">Ajouter</button>
      </Form>
    </div>
  )
}