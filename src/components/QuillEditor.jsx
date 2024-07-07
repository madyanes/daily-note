import { useEffect, useRef } from 'react'
import Quill from 'quill'

import 'quill/dist/quill.snow.css'

import { notesStore } from '../utils/dbConfig'

export default function QuillEditor() {
  const quillRef = useRef(null)
  const quillInstance = useRef(null)
  const noteStoreRef = useRef(null)

  const handleSave = async () => {
    if (quillInstance.current) {
      const key = `note_${Date.now()}`
      const note = quillInstance.current.root.innerHTML
      const metadata = {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const data = { note, metadata }

      try {
        await noteStoreRef.current.setItem(key, data)
      } catch (error) {
        console.error(
          `Error saving note to ${notesStore.storeName} store. Error: ${error}`
        )
      }
    }
  }

  useEffect(() => {
    const initializeQuill = () => {
      if (!quillInstance.current && quillRef.current) {
        quillInstance.current = new Quill(quillRef.current, { theme: 'snow' })
      }
    }

    const initializeStores = () => {
      if (!noteStoreRef.current) {
        noteStoreRef.current = notesStore
      }
    }

    initializeQuill()
    initializeStores()
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
