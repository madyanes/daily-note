import { useLoaderData } from 'react-router-dom'
import QuillEditor from './QuillEditor'

import '../styles/NewNote.css'
import { useEffect, useState } from 'react'

export default function NewNote() {
  const loaderData = useLoaderData()
  const [note, setNote] = useState('')

  useEffect(() => {
    if (loaderData) {
      setNote(loaderData.note)
    }
  }, [loaderData])

  return (
    <section id='new-note'>
      <QuillEditor existingNote={note} />
    </section>
  )
}
