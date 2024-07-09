import { useParams } from 'react-router-dom'

import QuillEditor from './QuillEditor'

import '../styles/NewNote.css'

export default function NewNote() {
  const { noteId } = useParams()

  return (
    <section id='new-note'>
      <QuillEditor noteId={noteId} />
    </section>
  )
}
