import { useLoaderData } from 'react-router-dom'
import QuillEditor from './QuillEditor'

import '../styles/NewNote.css'

export default function NewNote() {
  const { note } = useLoaderData()

  return (
    <section id='new-note'>
      <QuillEditor existingNote={note} />
    </section>
  )
}
