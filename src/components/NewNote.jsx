import QuillEditor from './QuillEditor'

import '../styles/NewNote.css'

export default function NewNote() {
  return (
    <section id='new-note'>
      <QuillEditor />
      <button id='save-note'>Save</button>
    </section>
  )
}
