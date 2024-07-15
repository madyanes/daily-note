import { useLoaderData, useParams } from 'react-router-dom'
import QuillEditor from './QuillEditor'

import '../styles/NewNote.css'

export default function NewNote() {
  const note = useLoaderData() || ''
  const { noteId } = useParams()

  return (
    // Ketika membuka Quill editor untuk edit catatan, kemudian langsung membuka Quill editor untuk membuat catatan baru,
    // isi dari catatan sebelumnya termuat di Quill editor untuk catatan baru.
    // Masalah tsb bisa diatasi dengan menambahkan properti `key`.
    <section id='new-note' key={noteId || ''}>
      <QuillEditor existingNote={note || {}} />
    </section>
  )
}
