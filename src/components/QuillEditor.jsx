import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Quill from 'quill'

import 'quill/dist/quill.snow.css'

import { addNote } from '../utils/localforageHelpers'

export default function QuillEditor() {
  const quillRef = useRef(null)
  const quillInstance = useRef(null)
  const navigate = useNavigate()

  const handleSave = async () => {
    if (quillInstance.current) {
      const note = quillInstance.current.root.innerHTML
      const result = await addNote(note)

      if (result.success) {
        navigate('/')
      }
    }
  }

  useEffect(() => {
    const initializeQuill = () => {
      if (!quillInstance.current && quillRef.current) {
        quillInstance.current = new Quill(quillRef.current, { theme: 'snow' })
      }
    }

    initializeQuill()
  }, [])

  return (
    <>
      <div ref={quillRef} style={{ height: '50vh' }} />
      <button id='save-note' onClick={handleSave}>
        Save
      </button>
    </>
  )
}
