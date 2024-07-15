import { useLoaderData } from 'react-router-dom'
import QuillEditor from './QuillEditor'

import '../styles/NewNote.css'
import { useState } from 'react'

export default function NewNote() {
  const loaderData = useLoaderData() || ''
  const [note] = useState(loaderData)

  return (
    <section id='new-note'>
      <QuillEditor existingNote={note || {}} />
    </section>
  )
}
