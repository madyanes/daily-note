import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import Quill from 'quill'

import 'quill/dist/quill.snow.css'

import { addNote, updateNoteById } from '../utils/localforageHelpers'

export default function QuillEditor({ existingNote }) {
  const quillRef = useRef(null)
  const quillInstance = useRef(null)
  const navigate = useNavigate()
  const { noteId } = useParams()

  const handleSave = async () => {
    if (quillInstance.current) {
      const note = quillInstance.current.root.innerHTML
      let result

      if (existingNote.note) {
        result = await updateNoteById(noteId, note)
      } else {
        result = await addNote(note)
      }

      if (result.success) {
        navigate('/')
      }
    }
  }

  useEffect(() => {
    const initializeQuill = async () => {
      if (!quillInstance.current && quillRef.current) {
        quillInstance.current = new Quill(quillRef.current, { theme: 'snow' })

        if (existingNote.note) {
          quillInstance.current.root.innerHTML = existingNote.note
        }
      }
    }

    initializeQuill()
  }, [existingNote])

  return (
    <>
      <div ref={quillRef} style={{ height: '50vh' }} />
      <button id='save-note' onClick={handleSave}>
        Save
      </button>
    </>
  )
}

QuillEditor.propTypes = {
  existingNote: PropTypes.shape({
    note: PropTypes.string,
  }),
}
