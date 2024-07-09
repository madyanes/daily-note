import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Quill from 'quill'

import 'quill/dist/quill.snow.css'

import {
  addNote,
  getNoteById,
  updateNoteById,
} from '../utils/localforageHelpers'

export default function QuillEditor({ noteId }) {
  const quillRef = useRef(null)
  const quillInstance = useRef(null)
  const navigate = useNavigate()

  const handleSave = async () => {
    if (quillInstance.current) {
      const note = quillInstance.current.root.innerHTML
      let result

      if (noteId) {
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

        if (noteId) {
          const existingNote = await getNoteById(noteId)
          if (existingNote) {
            quillInstance.current.root.innerHTML = existingNote.note
          }
        }
      }
    }

    initializeQuill()
  }, [noteId])

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
  noteId: PropTypes.string,
}
